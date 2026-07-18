/**
 * Write the committed sample seed dataset from the fixtures.
 *   npx tsx src/scripts/writeSeed.ts
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SeedBundleSchema } from "../store/bundle.js";
import { saveBundle } from "../store/jsonStore.js";
import * as fx from "../fixtures/sample.js";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "../../data/seed.sample.json");

const bundle = SeedBundleSchema.parse({
  mandate: "Find the best seed-stage healthcare AI company for this fund.",
  fundProfile: fx.fundProfile,
  historicalMemos: fx.historicalMemos,
  portfolioCompanies: fx.portfolioCompanies,
  rejectedDeals: fx.rejectedDeals,
  candidateUniverse: fx.candidateUniverse,
  competitors: fx.competitors,
});

await saveBundle(outPath, bundle);
console.log(
  `Wrote ${outPath}\n  ${bundle.portfolioCompanies.length} portfolio, ` +
    `${bundle.rejectedDeals.length} rejected, ${bundle.candidateUniverse.length} candidates, ` +
    `${bundle.historicalMemos.length} memos.`,
);
