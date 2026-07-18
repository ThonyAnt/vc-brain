/**
 * Seed a golden demo run: load the seed bundle, run the full pipeline, and save
 * the resulting VCBrainState so the demo can replay it instantly/offline.
 *
 *   npx tsx src/scripts/seedDemo.ts                 # mock (offline)
 *   VC_BRAIN_LLM=openai node --env-file=../.env \
 *     node_modules/.bin/tsx src/scripts/seedDemo.ts # live
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { loadBundle } from "../store/jsonStore.js";
import { stateFromBundle } from "../store/bundle.js";
import { saveSnapshot } from "../store/snapshot.js";
import { runPipeline } from "../orchestrator.js";
import { MockLLMClient } from "../llm/mock.js";
import { OpenAILLMClient } from "../llm/openai.js";
import type { LLMClient } from "../llm/client.js";
import { mockAgentOptions } from "../fixtures/mockAgents.js";

const here = dirname(fileURLToPath(import.meta.url));
const seedPath = join(here, "../../data/seed.sample.json");
const outPath = join(here, "../../data/demo.snapshot.json");

function makeLLM(): LLMClient {
  if (process.env.VC_BRAIN_LLM === "openai") return new OpenAILLMClient({ model: process.env.VC_BRAIN_OPENAI_MODEL });
  return new MockLLMClient(mockAgentOptions);
}

const bundle = await loadBundle(seedPath);
const state = stateFromBundle(bundle);
// Re-run profiling too, so the snapshot reflects the full pipeline.
delete state.fundProfile;

await runPipeline(state, { llm: makeLLM(), competitors: bundle.competitors });
await saveSnapshot(outPath, state);

console.log(
  `Golden snapshot written to ${outPath}\n  recommendation: ${state.committeeDecision?.recommendedCompanyId}, ` +
    `${state.events.length} events.`,
);
