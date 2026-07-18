import type { Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import type { InvestorFeedback, LearningResult, CriterionWeightChange } from "../schemas/feedback.js";
import { rankCandidates } from "../tools/fundfit.js";
import type { EmbeddingMap } from "../tools/similarity.js";
import type { AgentDeps } from "./types.js";
import { LearningInterpretationSchema } from "./types.js";
import { clamp } from "./util.js";

const SYSTEM = `You interpret an investor's feedback into a single criterion weight adjustment.
Pick the criterionId most implicated, a feedbackDirection in [-1,1] (positive = weight it MORE),
a confidence, and a one-sentence explanation of what the fund now believes. Deterministic code
applies the actual weight change — you only interpret.`;

export interface LearningInput {
  feedback: InvestorFeedback;
  fundProfile: FundProfile;
  candidateUniverse: Company[];
  positiveHistory: Company[];
  rejectedHistory: Company[];
  competitors?: Company[];
  embeddings?: EmbeddingMap;
  /** Prior ranking order (company IDs) to diff against. */
  rankingBefore?: string[];
}

function normalizeWeights(criteria: FundProfile["criteria"]): void {
  const total = criteria.reduce((s, c) => s + c.weight, 0);
  if (total > 0) for (const c of criteria) c.weight = c.weight / total;
}

/**
 * Feedback-learning: the LLM interprets the feedback, deterministic code updates
 * the criterion weight (updatedWeight = w + lr·direction·confidence), renormalizes,
 * and reranks the universe so the graph and recommendations visibly shift.
 */
export async function learningAgent(
  input: LearningInput,
  deps: AgentDeps,
): Promise<{ learningResult: LearningResult; updatedFundProfile: FundProfile }> {
  const { feedback, fundProfile } = input;

  const interp = await deps.llm.generateStructured({
    schema: LearningInterpretationSchema,
    schemaName: "LearningInterpretation",
    system: SYSTEM,
    prompt:
      `Fund criteria: ${fundProfile.criteria.map((c) => `${c.id}(${c.name}, w=${c.weight.toFixed(2)})`).join(", ")}\n\n` +
      `Feedback: action=${feedback.action}, company=${feedback.companyId}, ` +
      `rationale="${feedback.rationale}"${feedback.criterionId ? `, criterion=${feedback.criterionId}` : ""}\n\n` +
      `Interpret it.`,
  });

  const updated: FundProfile = structuredClone(fundProfile);
  const changes: CriterionWeightChange[] = [];
  const crit = updated.criteria.find((c) => c.id === (feedback.criterionId ?? interp.criterionId));
  if (crit) {
    const oldWeight = crit.weight;
    crit.weight = clamp(oldWeight + feedback.learningRate * interp.feedbackDirection * interp.confidence);
    normalizeWeights(updated.criteria);
    changes.push({
      criterionId: crit.id,
      criterionName: crit.name,
      oldWeight,
      newWeight: crit.weight,
    });
  }

  // Rerank before/after to expose ranking movement.
  const rankArgs = {
    candidates: input.candidateUniverse,
    positiveHistory: input.positiveHistory,
    rejectedHistory: input.rejectedHistory,
    competitors: input.competitors,
    embeddings: input.embeddings,
  };
  const before =
    input.rankingBefore ??
    rankCandidates({ ...rankArgs, fundProfile }).map((r) => r.companyId);
  const after = rankCandidates({ ...rankArgs, fundProfile: updated }).map((r) => r.companyId);
  const changedRankings = after
    .map((id, newRank) => ({ companyId: id, oldRank: before.indexOf(id), newRank }))
    .filter((c) => c.oldRank !== c.newRank);

  return {
    learningResult: {
      changedCriteria: changes,
      changedRankings,
      whatTheFundLearned: interp.whatTheFundLearned,
    },
    updatedFundProfile: updated,
  };
}
