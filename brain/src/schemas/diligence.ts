import { z } from "zod";
import { WeightRecord } from "./common.js";

/** Reference to a historical company used as an analogue. */
export const AnalogueReferenceSchema = z.object({
  companyId: z.string(),
  relation: z.enum([
    "closest_winner",
    "closest_success",
    "closest_rejected",
    "closest_passed",
    "closest_competitor",
    "closest_adjacent",
  ]),
  similarity: z.number().min(0).max(1),
  /** Dimension-level similarity breakdown. */
  dimensionScores: WeightRecord.default({}),
  keySimilarities: z.array(z.string()).default([]),
  keyDifferences: z.array(z.string()).default([]),
  whyItMatters: z.string().default(""),
});
export type AnalogueReference = z.infer<typeof AnalogueReferenceSchema>;

export const TechnicalAnalysisSchema = z.object({
  moatScore: z.number().min(0).max(1),
  feasibilityScore: z.number().min(0).max(1),
  founderTechnicalScore: z.number().min(0).max(1),
  keyStrengths: z.array(z.string()).default([]),
  keyRisks: z.array(z.string()).default([]),
  diligenceQuestions: z.array(z.string()).default([]),
  historicalAnalogues: z.array(AnalogueReferenceSchema).default([]),
});
export type TechnicalAnalysis = z.infer<typeof TechnicalAnalysisSchema>;

export const CommercialAnalysisSchema = z.object({
  marketScore: z.number().min(0).max(1),
  urgencyScore: z.number().min(0).max(1),
  competitiveIntensity: z.number().min(0).max(1),
  distributionScore: z.number().min(0).max(1),
  pricingPowerScore: z.number().min(0).max(1),
  scalabilityScore: z.number().min(0).max(1),
  keyStrengths: z.array(z.string()).default([]),
  keyRisks: z.array(z.string()).default([]),
  portfolioSynergies: z.array(z.string()).default([]),
  portfolioConflicts: z.array(z.string()).default([]),
  diligenceQuestions: z.array(z.string()).default([]),
});
export type CommercialAnalysis = z.infer<typeof CommercialAnalysisSchema>;

/** Financial assumptions the LLM proposes; math is computed deterministically. */
export const FinancialAssumptionsSchema = z.object({
  investmentAmount: z.number(),
  entryValuation: z.number(),
  initialOwnership: z.number().min(0).max(1),
  projectedArr: z.number(),
  exitMultiple: z.number(),
  dilutionFactor: z.number().min(0).max(1),
  yearsToExit: z.number().positive(),
});
export type FinancialAssumptions = z.infer<typeof FinancialAssumptionsSchema>;

export const FinancialAnalysisSchema = z.object({
  revenueQualityScore: z.number().min(0).max(1),
  capitalEfficiencyScore: z.number().min(0).max(1),
  assumptions: FinancialAssumptionsSchema,
  keyStrengths: z.array(z.string()).default([]),
  keyRisks: z.array(z.string()).default([]),
  diligenceQuestions: z.array(z.string()).default([]),
});
export type FinancialAnalysis = z.infer<typeof FinancialAnalysisSchema>;

export const RiskAnalysisSchema = z.object({
  criticalRisks: z.array(z.string()).default([]),
  unsupportedClaims: z.array(z.string()).default([]),
  contradictions: z.array(z.string()).default([]),
  missingInformation: z.array(z.string()).default([]),
  highValueQuestions: z.array(z.string()).default([]),
});
export type RiskAnalysis = z.infer<typeof RiskAnalysisSchema>;

/** All diligence for a single candidate. */
export const CandidateDiligenceSchema = z.object({
  companyId: z.string(),
  technical: TechnicalAnalysisSchema,
  commercial: CommercialAnalysisSchema,
  financial: FinancialAnalysisSchema,
  risk: RiskAnalysisSchema.optional(),
});
export type CandidateDiligence = z.infer<typeof CandidateDiligenceSchema>;
