import { z } from "zod";

/**
 * Normalized similarity attributes. These describe *what kind of company*
 * something is — never its quality, traction, or investment attractiveness.
 * Only these fields feed the company-similarity computation (graph position).
 */
export const CompanyAttributesSchema = z.object({
  /** Industry hierarchy, root -> leaf, e.g. ["Healthcare","Infrastructure","Clinical documentation"]. */
  industryPath: z.array(z.string()).default([]),
  /** Product-category hierarchy, root -> leaf, e.g. ["Software","Workflow application"]. */
  productCategoryPath: z.array(z.string()).default([]),
  /** Multi-label: who buys/uses (segment, buyer role, regulated-ness). */
  targetCustomers: z.array(z.string()).default([]),
  /** Multi-label: how the product works (no quality judgement). */
  technicalApproaches: z.array(z.string()).default([]),
  /** Multi-label: founder background types (not quality). */
  founderArchetypes: z.array(z.string()).default([]),
  /** Multi-label: how the company changes an existing market/workflow. */
  disruptionMechanisms: z.array(z.string()).default([]),
  /** Multi-label: structural operating requirements (FDA-regulated, pure-software, ...). */
  regulatoryLabels: z.array(z.string()).default([]),
  /** Single categorical: how it earns revenue. */
  businessModel: z.string().default(""),
  /** Single categorical: how it acquires customers. */
  goToMarket: z.string().default(""),
  /** Single categorical: operational model (pure software, manufacturing-dependent, ...). */
  operationalModel: z.string().default(""),
  /** Free text -> embedded for the "problem being solved" dimension. */
  problemStatement: z.string().default(""),
  /** Free text (kept for memos/UI; not directly weighted). */
  productDescription: z.string().default(""),
});
export type CompanyAttributes = z.infer<typeof CompanyAttributesSchema>;

export const FounderSchema = z.object({
  name: z.string(),
  role: z.string().default(""),
  background: z.string().default(""),
  linkedin: z.string().optional(),
});
export type Founder = z.infer<typeof FounderSchema>;

/** Business metrics — used by financial diligence, NOT by similarity. */
export const CompanyMetricsSchema = z.object({
  arr: z.number().optional(),
  arrGrowthRate: z.number().optional(),
  churnRate: z.number().optional(),
  nrr: z.number().optional(),
  grossMargin: z.number().optional(),
  monthlyBurn: z.number().optional(),
  runwayMonths: z.number().optional(),
  customers: z.number().optional(),
  cac: z.number().optional(),
});
export type CompanyMetrics = z.infer<typeof CompanyMetricsSchema>;

export const CompanyStage = z.enum([
  "pre_seed",
  "seed",
  "series_a",
  "series_b",
  "series_c_plus",
  "growth",
]);

export const CompanyStatus = z.enum([
  "sourced",
  "contacted",
  "meeting_scheduled",
  "in_diligence",
  "invested",
  "passed",
]);

/** Where a company sits in the fund's history, for analogue retrieval. */
export const HistoricalStatus = z.enum([
  "portfolio", // currently invested
  "invested",
  "rejected", // reviewed and declined
  "passed", // did not pursue
  "external", // never in the fund's pipeline (competitor/market)
]);

export const OutcomeSchema = z.enum(["succeeded", "failed", "active", "unknown"]);

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(""),
  attributes: CompanyAttributesSchema,
  founders: z.array(FounderSchema).default([]),
  stage: CompanyStage.optional(),
  geography: z.string().optional(),
  sector: z.string().optional(),
  round: z.string().optional(),
  checkSizeSought: z.number().optional(),
  valuation: z.number().optional(),
  metrics: CompanyMetricsSchema.optional(),
  competitors: z.array(z.string()).default([]),
  status: CompanyStatus.default("sourced"),
  historicalStatus: HistoricalStatus.default("external"),
  outcome: OutcomeSchema.default("unknown"),
  /** Narrative on how the outcome played out (for reasoning nodes). */
  outcomeNarrative: z.string().optional(),
  /** Memo IDs / source references backing this record. */
  sourceRefs: z.array(z.string()).default([]),
});
export type Company = z.infer<typeof CompanySchema>;
