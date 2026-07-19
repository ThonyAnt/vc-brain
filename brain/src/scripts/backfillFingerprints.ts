/**
 * Backfill per-dimension similarity fingerprints into the app snapshot.
 *
 * The ranker's raw per-dimension scores are exact-match Jaccards over
 * independently LLM-extracted labels, so cross-company vocab rarely collides
 * ("Freight brokers" vs "3PLs" scores 0) and most display fingerprints
 * collapsed to an industry-only needle. For DISPLAY we compute a semantic
 * fingerprint instead: per dimension, max(exact-match score, scaled embedding
 * cosine of the dimension's label text). Exact matches still win when vocab
 * agrees; embeddings fill in true-but-differently-worded similarity.
 * These are display similarities — the ranking math is untouched.
 *
 *   node --env-file=../.env node_modules/.bin/tsx src/scripts/backfillFingerprints.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { companySimilarity } from "../tools/similarity.js";
import { OpenAILLMClient } from "../llm/openai.js";
import type { VCBrainState } from "../state.js";
import type { Company } from "../schemas/company.js";

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY required (embeddings power the semantic fingerprint)");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT = resolve(here, "../../../app/src/lib/brain/snapshot.json");

const state = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as VCBrainState & { competitors?: Company[] };
const all: Company[] = [
  ...state.candidateUniverse,
  ...state.portfolioCompanies,
  ...state.rejectedDeals,
  ...(state.competitors ?? []),
];
const byId = new Map(all.map((c) => [c.id, c]));

type Attrs = Company["attributes"];
const DIM_TEXT: Record<string, (x: Attrs) => string> = {
  industry: (x) => (x.industryPath ?? []).join(" > "),
  problem: (x) => x.problemStatement ?? "",
  customer: (x) => (x.targetCustomers ?? []).join(", "),
  product: (x) => (x.productCategoryPath ?? []).join(" > ") || x.productDescription || "",
  technical: (x) => (x.technicalApproaches ?? []).join(", "),
  businessModel: (x) => x.businessModel ?? "",
  goToMarket: (x) => x.goToMarket ?? "",
  founder: (x) => (x.founderArchetypes ?? []).join(", "),
  disruption: (x) => (x.disruptionMechanisms ?? []).join(", "),
  regulatory: (x) => (x.regulatoryLabels ?? []).join(", "),
};
const DIMS = Object.keys(DIM_TEXT);

const ranked = state.sourcedCandidates ?? [];
const involved = new Set<string>();
for (const r of ranked) {
  if (!byId.has(r.companyId)) continue;
  involved.add(r.companyId);
  if (r.closestWinnerId && byId.has(r.closestWinnerId)) involved.add(r.closestWinnerId);
  if (r.closestRejectedDealId && byId.has(r.closestRejectedDealId)) involved.add(r.closestRejectedDealId);
}
const companies = [...involved].map((id) => byId.get(id)!);

/* embed every distinct non-empty dimension text once */
const textIndex = new Map<string, number>();
const texts: string[] = [];
const keyFor = (id: string, dim: string) => `${id}|${dim}`;
const textOf = new Map<string, string>();
for (const c of companies) {
  for (const dim of DIMS) {
    const t = DIM_TEXT[dim]!(c.attributes).trim();
    if (!t) continue;
    textOf.set(keyFor(c.id, dim), t);
    if (!textIndex.has(t)) {
      textIndex.set(t, texts.length);
      texts.push(t);
    }
  }
}

const llm = new OpenAILLMClient({});
console.log(`Embedding ${texts.length} distinct dimension texts…`);
const vectors: number[][] = [];
for (let i = 0; i < texts.length; i += 512) {
  vectors.push(...(await llm.embed(texts.slice(i, i + 512))));
}

function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    dot += a[i]! * b[i]!;
    na += a[i]! * a[i]!;
    nb += b[i]! * b[i]!;
  }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

/* short-label cosines run high at baseline; rescale so unrelated ≈ 0 */
const scaled = (cos: number) => Math.max(0, Math.min(1, (cos - 0.25) / 0.6));

function semanticDim(aId: string, bId: string, dim: string): number | undefined {
  const ta = textOf.get(keyFor(aId, dim));
  const tb = textOf.get(keyFor(bId, dim));
  if (!ta || !tb) return undefined;
  const va = vectors[textIndex.get(ta)!];
  const vb = vectors[textIndex.get(tb)!];
  if (!va || !vb) return undefined;
  return scaled(cosine(va, vb));
}

function fingerprint(a: Company, b: Company): Record<string, number> {
  const exact = companySimilarity(a, b).dimensions as Record<string, number>;
  const out: Record<string, number> = {};
  for (const dim of DIMS) {
    const sem = semanticDim(a.id, b.id, dim) ?? 0;
    out[dim] = Number(Math.max(exact[dim] ?? 0, sem).toFixed(3));
  }
  return out;
}

type RankedWithDims = (typeof ranked)[number] & {
  dimensionsVsWinner?: Record<string, number>;
  dimensionsVsRejected?: Record<string, number>;
};

let filled = 0;
let nonzeroDims = 0;
let pairs = 0;
for (const r of ranked as RankedWithDims[]) {
  const cand = byId.get(r.companyId);
  if (!cand) continue;
  const winner = r.closestWinnerId ? byId.get(r.closestWinnerId) : undefined;
  const rejected = r.closestRejectedDealId ? byId.get(r.closestRejectedDealId) : undefined;
  try {
    if (winner) {
      r.dimensionsVsWinner = fingerprint(cand, winner);
      pairs++;
      nonzeroDims += Object.values(r.dimensionsVsWinner).filter((v) => v > 0.05).length;
    }
    if (rejected) {
      r.dimensionsVsRejected = fingerprint(cand, rejected);
      pairs++;
      nonzeroDims += Object.values(r.dimensionsVsRejected).filter((v) => v > 0.05).length;
    }
    filled++;
  } catch (e) {
    console.warn(`skip ${r.companyId}: ${String(e)}`);
  }
}

writeFileSync(SNAPSHOT, JSON.stringify(state, null, 2) + "\n");
console.log(`Backfilled fingerprints for ${filled} candidates (${pairs} pairs).`);
console.log(`Average non-zero dimensions per pair: ${(nonzeroDims / Math.max(pairs, 1)).toFixed(1)} / 10`);
