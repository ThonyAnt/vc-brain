import { z } from "zod";

export const FeedbackAction = z.enum([
  "advance",
  "pass",
  "override_recommendation",
  "increase_concern",
  "decrease_concern",
  "mark_rationale_correct",
  "mark_rationale_incorrect",
  "invested",
  "company_succeeded",
  "company_underperformed",
]);
export type FeedbackActionType = z.infer<typeof FeedbackAction>;

export const InvestorFeedbackSchema = z.object({
  action: FeedbackAction,
  companyId: z.string(),
  originalRecommendation: z.string().optional(),
  rationale: z.string().default(""),
  /** Criterion the feedback most bears on, if known. */
  criterionId: z.string().optional(),
  learningRate: z.number().min(0).max(1).default(0.1),
});
export type InvestorFeedback = z.infer<typeof InvestorFeedbackSchema>;

export const CriterionWeightChangeSchema = z.object({
  criterionId: z.string(),
  criterionName: z.string(),
  oldWeight: z.number(),
  newWeight: z.number(),
});
export type CriterionWeightChange = z.infer<typeof CriterionWeightChangeSchema>;

export const LearningResultSchema = z.object({
  changedCriteria: z.array(CriterionWeightChangeSchema).default([]),
  changedRankings: z
    .array(z.object({ companyId: z.string(), oldRank: z.number(), newRank: z.number() }))
    .default([]),
  whatTheFundLearned: z.string(),
});
export type LearningResult = z.infer<typeof LearningResultSchema>;
