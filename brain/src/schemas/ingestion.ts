import { z } from "zod";
import { CompanyAttributesSchema, CompanyStage } from "./company.js";

/**
 * LLM extraction of a past investment memo into structured fund memory.
 * The raw memo text is retained separately; this captures the matchable fields.
 */
export const MemoExtractionSchema = z.object({
  companyName: z.string(),
  decision: z.enum(["invested", "rejected", "passed"]),
  date: z.string().optional(),
  rationale: z.string().default(""),
  identifiedMoat: z.string().default(""),
  /** 2-3 load-bearing factors, as short matchable tags. */
  decisionDrivers: z.array(z.string()).default([]),
  outcome: z.enum(["succeeded", "failed", "active", "unknown"]).default("unknown"),
  sector: z.string().optional(),
  stage: CompanyStage.optional(),
  geography: z.string().optional(),
  checkSize: z.number().optional(),
  /** Normalized similarity attributes for the subject company. */
  attributes: CompanyAttributesSchema,
});
export type MemoExtraction = z.infer<typeof MemoExtractionSchema>;
