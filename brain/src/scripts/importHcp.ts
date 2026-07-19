/**
 * Import the HCP research set as the demo seed bundle:
 *   - 100 researched companies (research/generated/HCP_100_Companies.json)
 *     validated against CompanySchema -> candidateUniverse
 *   - the 10 reference investment memos (Mem0, Sekai, ...) ingested via the
 *     live LLM -> HistoricalMemo + portfolio companies (the fund's history)
 *   - fundProfilerAgent run over that history -> the HCP fund profile
 *
 * Writes brain/data/seed.hcp.json. One-time (re)import; costs ~11 LLM calls.
 *
 *   VC_BRAIN_OPENAI_MODEL=gpt-4o node --env-file=../.env \
 *     node_modules/.bin/tsx src/scripts/importHcp.ts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CompanySchema, type Company } from "../schemas/company.js";
import { normalizeUsd } from "../tools/fundfit.js";
import { OpenAILLMClient } from "../llm/openai.js";
import { ingestMemoText } from "../tools/ingestHistory.js";
import { fundProfilerAgent } from "../agents/fundProfiler.js";
import { SeedBundleSchema } from "../store/bundle.js";
import { saveBundle } from "../store/jsonStore.js";

const here = dirname(fileURLToPath(import.meta.url));
const COMPANIES = join(here, "../../../research/generated/HCP_100_Companies.json");
const MEMOS = join(here, "../../../research/HCP_10_Investment_Memos_2026-07-18.md");
const OUT = join(here, "../../data/seed.hcp.json");

const MANDATE =
  "Find the best seed or Series A software/AI company for a $1.0–2.5M initial check, " +
  "underwritten to HCP's standard: bottom-up revenue build, explicit assumptions, " +
  "founder-market fit, and a defensible moat.";

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY required (memo ingestion + fund profiling are live LLM steps).");
  process.exit(1);
}
const llm = new OpenAILLMClient({ model: process.env.VC_BRAIN_OPENAI_MODEL ?? "gpt-4o" });

// --- 1. Candidate universe: validate all 100 (Zod strips extra graphMetrics) ---
// Monetary units normalized to dollars: research batches mixed "2.5" (millions)
// with "2500000".
const raw = JSON.parse(readFileSync(COMPANIES, "utf8")) as unknown[];
const candidateUniverse: Company[] = raw.map((c) => {
  const parsed = CompanySchema.parse(c);
  if (parsed.checkSizeSought != null) parsed.checkSizeSought = normalizeUsd(parsed.checkSizeSought);
  if (parsed.valuation != null) parsed.valuation = normalizeUsd(parsed.valuation);
  return parsed;
});
console.log(`• ${candidateUniverse.length} candidates validated`);

// --- 2. Fund history: split the reference doc into 10 memos, ingest live ---
// The doc's own summary table grades each memo: Pursue -> portfolio (positive
// precedent), Price-sensitive -> rejected (declined at price, negative
// precedent), Diligence -> still-open candidate (joins the universe
// in_diligence). Deterministic — the LLM extracts content, not the decision.
const doc = readFileSync(MEMOS, "utf8");
const tableRec = new Map<string, string>();
for (const row of doc.matchAll(/^\|\s*\d+\s*\|\s*([^|]+?)\s*\|(?:[^|]*\|){4}\s*([^|]+?)\s*\|$/gm)) {
  tableRec.set(row[1]!.toLowerCase(), row[2]!.toLowerCase());
}
const recFor = (name: string): string =>
  tableRec.get(name.toLowerCase()) ??
  [...tableRec.entries()].find(([k]) => name.toLowerCase().includes(k) || k.includes(name.toLowerCase()))?.[1] ??
  "pursue";

const sections = doc.split(/^## (?=\d+\. )/m).slice(1); // drop preamble
if (sections.length !== 10) {
  console.warn(`warning: expected 10 memo sections, found ${sections.length}`);
}
console.log(`• ingesting ${sections.length} reference memos (live LLM)...`);
const ingested = await Promise.all(
  sections.map((text) =>
    ingestMemoText(`## ${text}`.trim(), llm, { source: "HCP_10_Investment_Memos_2026-07-18.md" }),
  ),
);

const historicalMemos: (typeof ingested)[number]["memo"][] = [];
const portfolioCompanies: Company[] = [];
const rejectedDeals: Company[] = [];
const diligenceCandidates: Company[] = [];
for (const { memo, company } of ingested) {
  const rec = recFor(company.name);
  if (rec.startsWith("pursue")) {
    historicalMemos.push({ ...memo, decision: "invested" });
    portfolioCompanies.push({
      ...company,
      historicalStatus: "portfolio",
      status: "invested",
      outcome: "active",
    });
    console.log(`   ${company.name}: pursue -> portfolio`);
  } else if (rec.startsWith("diligence")) {
    // No decision yet — a live candidate already in diligence, memo kept as context.
    historicalMemos.push({ ...memo, decision: "passed" });
    diligenceCandidates.push({
      ...company,
      historicalStatus: "external",
      status: "in_diligence",
      outcome: "unknown",
    });
    console.log(`   ${company.name}: diligence -> candidate (in_diligence)`);
  } else {
    // "Price-sensitive" and anything else declined -> negative precedent.
    historicalMemos.push({
      ...memo,
      decision: "rejected",
      rationale: memo.rationale || "Declined at the proposed valuation (price-sensitive).",
    });
    rejectedDeals.push({
      ...company,
      historicalStatus: "rejected",
      status: "passed",
      outcome: "unknown",
    });
    console.log(`   ${company.name}: ${rec} -> rejected`);
  }
}
candidateUniverse.push(...diligenceCandidates);

// --- 3. Fund profile: learn HCP's thesis from its own memos ---
console.log("• running fund profiler over the ingested history...");
const fundProfile = await fundProfilerAgent(
  { mandate: MANDATE, historicalMemos, portfolioCompanies, rejectedDeals },
  { llm },
);
console.log(`   thesis: ${fundProfile.thesisSummary.slice(0, 100)}...`);

// --- 4. Assemble + write ---
const bundle = SeedBundleSchema.parse({
  mandate: MANDATE,
  fundProfile,
  historicalMemos,
  portfolioCompanies,
  rejectedDeals,
  candidateUniverse,
  competitors: [],
});
await saveBundle(OUT, bundle);
console.log(
  `\nWrote ${OUT}\n  ${bundle.portfolioCompanies.length} portfolio, ` +
    `${bundle.rejectedDeals.length} rejected, ${bundle.candidateUniverse.length} candidates ` +
    `(incl. ${diligenceCandidates.length} in diligence), ${bundle.historicalMemos.length} memos, ` +
    `${bundle.fundProfile?.criteria.length ?? 0} criteria.`,
);
