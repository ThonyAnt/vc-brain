import { z } from "zod";

export const PartnerVote = z.enum(["strong_yes", "yes", "uncertain", "no"]);
export type PartnerVoteType = z.infer<typeof PartnerVote>;

export const PartnerOpinionSchema = z.object({
  partnerId: z.string(),
  companyId: z.string(),
  vote: PartnerVote,
  confidence: z.number().min(0).max(1),
  thesis: z.string(),
  topEvidence: z.array(z.string()).default([]),
  biggestConcern: z.string().default(""),
  evidenceThatWouldChangeVote: z.array(z.string()).default([]),
});
export type PartnerOpinion = z.infer<typeof PartnerOpinionSchema>;

export const CommitteeDecisionSchema = z.object({
  rankedFinalistIds: z.array(z.string()),
  recommendedCompanyId: z.string(),
  confidence: z.number().min(0).max(1),
  recommendedCheckSize: z.number(),
  centralDisagreement: z.string(),
  strongestBullCase: z.string(),
  strongestBearCase: z.string(),
  unresolvedDiligence: z.array(z.string()).default([]),
  rationale: z.string(),
});
export type CommitteeDecision = z.infer<typeof CommitteeDecisionSchema>;
