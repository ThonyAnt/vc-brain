import { z } from "zod";

/** A candidate ranked by the Market Scout agent. */
export const RankedCandidateSchema = z.object({
  companyId: z.string(),
  totalScore: z.number(),
  criterionScores: z.record(z.string(), z.number()).default({}),
  fundFitScore: z.number().optional(),
  similarityToWinners: z.number().optional(),
  similarityToRejected: z.number().optional(),
  closestWinnerId: z.string().optional(),
  closestRejectedDealId: z.string().optional(),
  closestCompetitorId: z.string().optional(),
  reasonsToAdvance: z.array(z.string()).default([]),
  reasonsToReject: z.array(z.string()).default([]),
  unresolvedRisks: z.array(z.string()).default([]),
  /** Deterministic elimination reason if hard-filtered out. */
  eliminationReason: z.string().optional(),
});
export type RankedCandidate = z.infer<typeof RankedCandidateSchema>;

export const ScoutResultSchema = z.object({
  ranked: z.array(RankedCandidateSchema),
  semifinalistIds: z.array(z.string()),
  finalistIds: z.array(z.string()),
});
export type ScoutResult = z.infer<typeof ScoutResultSchema>;
