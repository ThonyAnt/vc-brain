import type { CompanyAttributes } from "../schemas/company.js";
import type { AttributePreferences } from "../schemas/fundProfile.js";

const norm = (s: string) => s.trim().toLowerCase();

/**
 * Flatten company attributes into "<dimension>:<value>" keys that fund-fit
 * preferences are keyed on. Categorical + multi-label dimensions only; free
 * text and hierarchy leaves are added as their own keys.
 */
export function attributeKeys(attrs: CompanyAttributes): string[] {
  const keys: string[] = [];
  const multi: Array<[string, string[]]> = [
    ["targetCustomers", attrs.targetCustomers],
    ["technicalApproaches", attrs.technicalApproaches],
    ["founderArchetypes", attrs.founderArchetypes],
    ["disruptionMechanisms", attrs.disruptionMechanisms],
    ["regulatoryLabels", attrs.regulatoryLabels],
  ];
  for (const [dim, values] of multi) {
    for (const v of values) if (v) keys.push(`${dim}:${norm(v)}`);
  }
  const single: Array<[string, string]> = [
    ["businessModel", attrs.businessModel],
    ["goToMarket", attrs.goToMarket],
    ["operationalModel", attrs.operationalModel],
  ];
  for (const [dim, v] of single) if (v) keys.push(`${dim}:${norm(v)}`);

  // Leaf of each hierarchy is a matchable value too.
  const industryLeaf = attrs.industryPath.at(-1);
  if (industryLeaf) keys.push(`industry:${norm(industryLeaf)}`);
  const productLeaf = attrs.productCategoryPath.at(-1);
  if (productLeaf) keys.push(`product:${norm(productLeaf)}`);

  return keys;
}

export interface FundFitResult {
  /** Raw sum of matched preference weights (can be negative). */
  raw: number;
  /** Bounded score in (0,1) via logistic(raw); 0.5 == neutral. */
  score: number;
  positiveMatches: string[];
  negativeMatches: string[];
}

const logistic = (x: number) => 1 / (1 + Math.exp(-x));

/**
 * Fund fit = Σ preference_weight(attribute_value). Independent of company
 * similarity — drives which companies the fund is likely to pursue.
 */
export function computeFundFit(
  attrs: CompanyAttributes,
  preferences: AttributePreferences,
): FundFitResult {
  const keys = attributeKeys(attrs);
  let raw = 0;
  const positiveMatches: string[] = [];
  const negativeMatches: string[] = [];
  for (const key of keys) {
    const w = preferences[key];
    if (w === undefined) continue;
    raw += w;
    if (w >= 0) positiveMatches.push(key);
    else negativeMatches.push(key);
  }
  return { raw, score: logistic(raw), positiveMatches, negativeMatches };
}

export interface SourcingCoefficients {
  positiveHistory: number;
  rejectedHistory: number;
  thesisMatch: number;
}

export const DEFAULT_SOURCING_COEFFICIENTS: SourcingCoefficients = {
  positiveHistory: 0.45,
  rejectedHistory: 0.2,
  thesisMatch: 0.35,
};

/**
 * sourcing_score = 0.45·sim_to_positive − 0.20·sim_to_rejected + 0.35·thesis_match
 * Coefficients updatable by the feedback-learning agent.
 */
export function computeSourcingScore(
  input: {
    similarityToPositive: number;
    similarityToRejected: number;
    thesisMatch: number;
  },
  coefficients: SourcingCoefficients = DEFAULT_SOURCING_COEFFICIENTS,
): number {
  return (
    coefficients.positiveHistory * input.similarityToPositive -
    coefficients.rejectedHistory * input.similarityToRejected +
    coefficients.thesisMatch * input.thesisMatch
  );
}
