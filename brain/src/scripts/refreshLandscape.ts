/**
 * Recompute the market landscape inside the existing app snapshot without
 * re-running the (paid) LLM pipeline: loads snapshot.json, rebuilds the
 * landscape with the current clustering, and replaces the
 * `market_landscape_built` event payload in place.
 *
 * When OPENAI_API_KEY is set, clusters are named by the LLM (shared strategic
 * shape); otherwise the deterministic modal auto-labels stay.
 *
 *   npx tsx src/scripts/refreshLandscape.ts
 *   node --env-file=../.env node_modules/.bin/tsx src/scripts/refreshLandscape.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildMarketLandscape } from "../tools/landscape.js";
import { broadenClusterLabels, labelClustersWithLLM } from "../tools/labelClusters.js";
import { OpenAILLMClient } from "../llm/openai.js";
import type { VCBrainState } from "../state.js";
import type { Company } from "../schemas/company.js";

const here = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT = resolve(here, "../../../app/src/lib/brain/snapshot.json");

const state = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as VCBrainState & { competitors?: Company[] };
const companies = [
  ...state.candidateUniverse,
  ...state.portfolioCompanies,
  ...state.rejectedDeals,
  ...(state.competitors ?? []),
];

// Offline: no embeddings — the problem dimension falls back to token overlap.
let landscape = buildMarketLandscape(companies, {});

if (process.env.OPENAI_API_KEY) {
  landscape = await labelClustersWithLLM(landscape, companies, new OpenAILLMClient({}));
  console.log("Cluster labels: LLM-named (modal auto-labels as fallback)");
} else {
  landscape = broadenClusterLabels(landscape, companies);
  console.log("Cluster labels: modal auto-labels (set OPENAI_API_KEY for LLM naming)");
}

const event = state.events.find((e) => e.eventType === "market_landscape_built");
if (!event) throw new Error("snapshot has no market_landscape_built event");
event.payload = landscape;

writeFileSync(SNAPSHOT, JSON.stringify(state, null, 2) + "\n");
console.log(`Refreshed landscape in ${SNAPSHOT}`);
console.log(`  ${landscape.clusters.length} clusters:`);
for (const cl of landscape.clusters) {
  console.log(`   - ${cl.label} (${cl.memberIds.length})`);
}
