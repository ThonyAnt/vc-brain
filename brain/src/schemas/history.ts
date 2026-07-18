import { z } from "zod";

/** A past investment memo the fund brain learns from. */
export const HistoricalMemoSchema = z.object({
  id: z.string(),
  companyId: z.string().optional(),
  companyName: z.string(),
  decision: z.enum(["invested", "rejected", "passed"]),
  date: z.string().optional(),
  /** Full memo text (ingested by the profiler). */
  text: z.string(),
  /** Extracted rationale for the yes/no. */
  rationale: z.string().optional(),
  /** What the fund believed was defensible. */
  identifiedMoat: z.string().optional(),
  /** The 2-3 most load-bearing factors, as matchable tags. */
  decisionDrivers: z.array(z.string()).default([]),
  outcome: z.enum(["succeeded", "failed", "active", "unknown"]).default("unknown"),
});
export type HistoricalMemo = z.infer<typeof HistoricalMemoSchema>;
