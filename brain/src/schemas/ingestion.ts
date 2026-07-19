import { z } from "zod";
import { CompanyAttributesSchema, CompanyStage } from "./company.js";

/**
 * LLM extraction of a past investment memo into structured fund memory.
 * The raw memo text is retained separately; this captures the matchable fields.
 */
/**
 * Real memos use their own verdict vocabulary ("Pursue", "Diligence",
 * "Price-sensitive"); map common synonyms onto the canonical decision enum so
 * extraction doesn't fail on a faithful echo of the source.
 */
const DecisionFromText = z.preprocess((v) => {
  const s = String(v).trim().toLowerCase();
  if (s.startsWith("invest") || s.startsWith("pursue") || s === "yes") return "invested";
  if (s.startsWith("reject") || s.startsWith("decline") || s.includes("price-sensitive") || s === "no")
    return "rejected";
  if (s.startsWith("pass") || s.includes("diligence") || s.includes("uncertain")) return "passed";
  return v; // anything unrecognized still fails validation loudly
}, z.enum(["invested", "rejected", "passed"]));

export const MemoExtractionSchema = z.object({
  companyName: z.string(),
  decision: DecisionFromText,
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
