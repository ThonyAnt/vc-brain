import { z } from "zod";
import { CompanyStage } from "./company.js";
import { WeightRecord } from "./common.js";

/** A single learned, weighted investment criterion. */
export const FundCriterionSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** Relative importance in [0,1]; weights across criteria are normalized. */
  weight: z.number().min(0).max(1),
  positiveSignals: z.array(z.string()).default([]),
  negativeSignals: z.array(z.string()).default([]),
  /** Memo IDs that support this criterion. */
  supportingMemoIds: z.array(z.string()).default([]),
});
export type FundCriterion = z.infer<typeof FundCriterionSchema>;

/** Per-partner tendencies for the partner-simulation agents. */
export const PartnerProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** e.g. "technical", "commercial", "financial". */
  archetype: z.string(),
  priorities: z.array(z.string()).default([]),
  /** Attribute-value -> preference weight, learned tendencies. */
  biases: WeightRecord.default({}),
});
export type PartnerProfile = z.infer<typeof PartnerProfileSchema>;

/**
 * Learned preferences for specific attribute values, keyed by
 * "<dimension>:<value>" -> weight. Drives fund-fit, NOT similarity.
 */
export const AttributePreferencesSchema = WeightRecord;
export type AttributePreferences = z.infer<typeof AttributePreferencesSchema>;

export const FundProfileSchema = z.object({
  thesisSummary: z.string(),
  stages: z.array(CompanyStage).default([]),
  sectors: z.array(z.string()).default([]),
  geographies: z.array(z.string()).default([]),
  checkSize: z.object({ min: z.number(), max: z.number() }),
  ownershipTarget: z.number().optional(),
  criteria: z.array(FundCriterionSchema).default([]),
  attributePreferences: AttributePreferencesSchema.default({}),
  archetypes: z.object({
    successful: z.array(z.string()).default([]),
    rejected: z.array(z.string()).default([]),
  }),
  recurringReasonsToInvest: z.array(z.string()).default([]),
  recurringReasonsToPass: z.array(z.string()).default([]),
  partnerProfiles: z.array(PartnerProfileSchema).default([]),
  /** Sourcing-score coefficients; updatable by the learning agent. */
  sourcingCoefficients: z
    .object({
      positiveHistory: z.number().default(0.45),
      rejectedHistory: z.number().default(0.2),
      thesisMatch: z.number().default(0.35),
    })
    .default({ positiveHistory: 0.45, rejectedHistory: 0.2, thesisMatch: 0.35 }),
});
export type FundProfile = z.infer<typeof FundProfileSchema>;

/** Graph-friendly relationship emitted by the profiler. */
export const FundRelationshipSchema = z.object({
  sourceId: z.string(),
  targetId: z.string(),
  relationship: z.string(),
  strength: z.number().min(0).max(1),
});
export type FundRelationship = z.infer<typeof FundRelationshipSchema>;
