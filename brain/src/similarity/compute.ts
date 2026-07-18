import type { CompanyAttributes } from "../schemas/company.js";
import { jaccard, cosine, categoricalSimilarity, textTokenJaccard } from "./metrics.js";
import { hierarchicalSimilarity } from "./taxonomy.js";

export type SimilarityDimension =
  | "industry"
  | "problem"
  | "customer"
  | "product"
  | "technical"
  | "businessModel"
  | "goToMarket"
  | "founder"
  | "disruption"
  | "regulatory";

export type SimilarityWeights = Record<SimilarityDimension, number>;

/** Default dimension weights (sum to 1.0). Similarity != fund fit. */
export const DEFAULT_SIMILARITY_WEIGHTS: SimilarityWeights = {
  industry: 0.18,
  problem: 0.15,
  customer: 0.12,
  product: 0.1,
  technical: 0.1,
  businessModel: 0.08,
  goToMarket: 0.08,
  founder: 0.07,
  disruption: 0.07,
  regulatory: 0.05,
};

/** Per-dimension embeddings for free-text fields (optional). */
export interface DimensionEmbeddings {
  problem?: number[];
}

export interface SimilarityResult {
  overall: number;
  dimensions: Record<SimilarityDimension, number>;
  sharedAttributes: string[];
  keyDifferences: string[];
}

export interface SimilarityOptions {
  weights?: Partial<SimilarityWeights>;
  embeddings?: { a: DimensionEmbeddings; b: DimensionEmbeddings };
}

function sharedLabels(a: string[], b: string[]): string[] {
  const sb = new Set(b.map((s) => s.toLowerCase()));
  return a.filter((x) => sb.has(x.toLowerCase()));
}

function onlyIn(a: string[], b: string[]): string[] {
  const sb = new Set(b.map((s) => s.toLowerCase()));
  return a.filter((x) => !sb.has(x.toLowerCase()));
}

/**
 * Company-to-company similarity in [0,1]. Describes what *kind* of company
 * something is — never quality, traction, or investment attractiveness.
 * Drives graph position, clusters, and analogue retrieval only.
 */
export function computeCompanySimilarity(
  a: CompanyAttributes,
  b: CompanyAttributes,
  opts: SimilarityOptions = {},
): SimilarityResult {
  const w: SimilarityWeights = { ...DEFAULT_SIMILARITY_WEIGHTS, ...opts.weights };

  const problem =
    opts.embeddings?.a.problem && opts.embeddings?.b.problem
      ? cosine(opts.embeddings.a.problem, opts.embeddings.b.problem)
      : textTokenJaccard(a.problemStatement, b.problemStatement);

  const dimensions: Record<SimilarityDimension, number> = {
    industry: hierarchicalSimilarity(a.industryPath, b.industryPath),
    problem,
    customer: jaccard(a.targetCustomers, b.targetCustomers),
    product: hierarchicalSimilarity(a.productCategoryPath, b.productCategoryPath),
    technical: jaccard(a.technicalApproaches, b.technicalApproaches),
    businessModel: categoricalSimilarity(a.businessModel, b.businessModel),
    goToMarket: categoricalSimilarity(a.goToMarket, b.goToMarket),
    founder: jaccard(a.founderArchetypes, b.founderArchetypes),
    disruption: jaccard(a.disruptionMechanisms, b.disruptionMechanisms),
    regulatory: jaccard(a.regulatoryLabels, b.regulatoryLabels),
  };

  const weightSum = Object.values(w).reduce((x, y) => x + y, 0) || 1;
  let overall = 0;
  for (const key of Object.keys(dimensions) as SimilarityDimension[]) {
    overall += (w[key] / weightSum) * dimensions[key];
  }

  const shared = [
    ...sharedLabels(a.targetCustomers, b.targetCustomers),
    ...sharedLabels(a.technicalApproaches, b.technicalApproaches),
    ...sharedLabels(a.founderArchetypes, b.founderArchetypes),
    ...sharedLabels(a.disruptionMechanisms, b.disruptionMechanisms),
    ...sharedLabels(a.regulatoryLabels, b.regulatoryLabels),
  ];
  const diffs = [
    ...onlyIn(a.technicalApproaches, b.technicalApproaches),
    ...onlyIn(a.disruptionMechanisms, b.disruptionMechanisms),
    ...onlyIn(a.regulatoryLabels, b.regulatoryLabels),
  ];

  return {
    overall: Math.max(0, Math.min(1, overall)),
    dimensions,
    sharedAttributes: shared,
    keyDifferences: diffs,
  };
}
