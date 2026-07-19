/**
 * Recompute the market landscape inside the existing app snapshot without
 * re-running the (paid) LLM pipeline: loads snapshot.json, rebuilds the
 * landscape with the current clustering, and replaces the
 * `market_landscape_built` event payload in place.
 *
 *   npx tsx src/scripts/refreshLandscape.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildMarketLandscape } from "../tools/landscape.js";
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
const landscape = buildMarketLandscape(companies, {});

const event = state.events.find((e) => e.eventType === "market_landscape_built");
if (!event) throw new Error("snapshot has no market_landscape_built event");
event.payload = landscape;

writeFileSync(SNAPSHOT, JSON.stringify(state, null, 2) + "\n");
console.log(`Refreshed landscape in ${SNAPSHOT}`);
console.log(`  ${landscape.clusters.length} clusters:`);
for (const cl of landscape.clusters) {
  console.log(`   - ${cl.label} (${cl.memberIds.length})`);
}
