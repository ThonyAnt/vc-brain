import { z } from "zod";

/** A memo claim tied back to graph node IDs so the UI can highlight sources. */
export const MemoClaimSchema = z.object({
  text: z.string(),
  sourceNodeIds: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.5),
});
export type MemoClaim = z.infer<typeof MemoClaimSchema>;

export const InvestmentMemoSchema = z.object({
  companyId: z.string(),
  executiveSummary: z.string(),
  companyOverview: z.string(),
  investmentThesis: z.string(),
  whyNow: z.string(),
  historicalAnalogues: z.array(MemoClaimSchema).default([]),
  marketAndCompetition: z.string(),
  technicalMoat: z.string(),
  businessModel: z.string(),
  financialScenarios: z.string(),
  reasonsToInvest: z.array(MemoClaimSchema).default([]),
  reasonsToPass: z.array(MemoClaimSchema).default([]),
  keyRisks: z.array(z.string()).default([]),
  openDiligenceQuestions: z.array(z.string()).default([]),
  committeeDisagreement: z.string().default(""),
  recommendation: z.string(),
});
export type InvestmentMemo = z.infer<typeof InvestmentMemoSchema>;
