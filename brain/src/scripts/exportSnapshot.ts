/**
 * Export a deterministic brain snapshot (offline, mock LLM) as JSON for the UI
 * to consume. The app's api client adapts this into its own view types.
 *
 *   npx tsx src/scripts/exportSnapshot.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInitialState } from "../state.js";
import { runPipeline } from "../orchestrator.js";
import { MockLLMClient } from "../llm/mock.js";
import { mockAgentOptions } from "../fixtures/mockAgents.js";
import * as fx from "../fixtures/sample.js";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "../../../app/src/lib/brain/snapshot.json");

async function main() {
  const state = createInitialState({
    mandate: "Find the best seed-stage healthcare AI company for this fund.",
    historicalMemos: fx.historicalMemos,
    portfolioCompanies: fx.portfolioCompanies,
    rejectedDeals: fx.rejectedDeals,
    candidateUniverse: fx.candidateUniverse,
  });

  await runPipeline(state, {
    llm: new MockLLMClient(mockAgentOptions),
    competitors: fx.competitors,
    now: (() => {
      let t = 0;
      return () => ++t;
    })(),
  });

  // Also carry the competitor set so the UI can render the full universe.
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
