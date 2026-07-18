import { z } from "zod";
import type { LLMClient } from "../llm/client.js";
import { PartnerOpinionSchema } from "../schemas/committee.js";

/** Shared dependencies every agent receives. */
export interface AgentDeps {
  llm: LLMClient;
}

/** Scout LLM enrichment layered on top of deterministic ranking. */
export const ScoutEnrichmentSchema = z.object({
  finalistIds: z.array(z.string()),
  enrichments: z.array(
    z.object({
      companyId: z.string(),
      reasonsToAdvance: z.array(z.string()).default([]),
      reasonsToReject: z.array(z.string()).default([]),
      unresolvedRisks: z.array(z.string()).default([]),
    }),
  ),
});
export type ScoutEnrichment = z.infer<typeof ScoutEnrichmentSchema>;

/** A partner returns one opinion per finalist; wrap the array for structured output. */
export const PartnerOpinionSetSchema = z.object({
  opinions: z.array(PartnerOpinionSchema),
});
export type PartnerOpinionSet = z.infer<typeof PartnerOpinionSetSchema>;

/** Learning agent interprets feedback; deterministic code applies the weight change. */
export const LearningInterpretationSchema = z.object({
  criterionId: z.string(),
  /** -1 (weaken) .. +1 (strengthen). */
  feedbackDirection: z.number().min(-1).max(1),
  confidence: z.number().min(0).max(1).default(0.7),
  whatTheFundLearned: z.string(),
});
export type LearningInterpretation = z.infer<typeof LearningInterpretationSchema>;
