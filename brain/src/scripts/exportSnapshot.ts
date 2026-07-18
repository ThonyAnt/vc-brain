/**
 * Export a deterministic brain snapshot as JSON for the UI to consume.
 *
 * Offline (default, free):
 *   npm run snapshot
 * Live real AI (OpenAI + Tavily web discovery) — costs a few cents:
 *   npm run snapshot:live
 *
 * Model defaults to gpt-4o-mini (cheap). Override with VC_BRAIN_OPENAI_MODEL.
 * Discovery is capped (VC_BRAIN_DISCOVER_LIMIT, default 8) to bound cost.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInitialState } from "../state.js";
import { runPipeline } from "../orchestrator.js";
import { MockLLMClient } from "../llm/mock.js";
import { OpenAILLMClient } from "../llm/openai.js";
import type { LLMClient } from "../llm/client.js";
import { MockSearchClient } from "../search/mock.js";
import { TavilySearchClient } from "../search/tavily.js";
import type { SearchClient } from "../search/client.js";
import { mockAgentOptions, mockSearchResults } from "../fixtures/mockAgents.js";
import * as fx from "../fixtures/sample.js";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "../../../app/src/lib/brain/snapshot.json");

const useOpenAI = process.env.VC_BRAIN_LLM === "openai";
const useDiscover = process.env.VC_BRAIN_DISCOVER === "1";
const discoverLimit = Number(process.env.VC_BRAIN_DISCOVER_LIMIT ?? "8");

function makeLLM(): LLMClient {
  if (useOpenAI) {
    // gpt-4o-mini keeps a full ~27-call pipeline run down to a few cents.
    const model = process.env.VC_BRAIN_OPENAI_MODEL ?? "gpt-4o-mini";
    console.log(`• LLM: OpenAI (${model})`);
    return new OpenAILLMClient({ model });
  }
  console.log("• LLM: mock (offline, free)");
  return new MockLLMClient(mockAgentOptions);
}

function makeSearch(): SearchClient {
  if (useOpenAI && useDiscover && process.env.TAVILY_API_KEY) {
    console.log(`• Search: Tavily (live web discovery, limit ${discoverLimit})`);
    return new TavilySearchClient();
  }
  console.log("• Search: mock results");
  return new MockSearchClient(mockSearchResults);
}

async function main() {
  const state = createInitialState({
    mandate: "Find the best seed-stage healthcare AI company for this fund.",
    historicalMemos: fx.historicalMemos,
    portfolioCompanies: fx.portfolioCompanies,
    rejectedDeals: fx.rejectedDeals,
    candidateUniverse: fx.candidateUniverse,
  });

  const discoverOn = useDiscover || !useOpenAI ? useDiscover : false;
  await runPipeline(state, {
    llm: makeLLM(),
    competitors: fx.competitors,
    ...(discoverOn ? { search: makeSearch(), discover: { limit: discoverLimit } } : {}),
  });

  const snapshot = { ...state, competitors: fx.competitors };
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2));
  console.log(`Wrote snapshot: ${OUT}`);
  console.log(
    `  fundProfile=${!!state.fundProfile} candidates=${state.candidateUniverse.length} ` +
      `finalists=${state.finalists?.length} memo=${!!state.investmentMemo} events=${state.events.length}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
