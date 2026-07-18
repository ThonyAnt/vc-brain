import type { Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import { type RankedCandidate, type ScoutResult } from "../schemas/sourcing.js";
import { rankCandidates } from "../tools/fundfit.js";
import type { EmbeddingMap } from "../tools/similarity.js";
import type { AgentDeps } from "./types.js";
import { ScoutEnrichmentSchema } from "./types.js";
import { describeCompany, describeMany } from "./util.js";

const SYSTEM = `You are the Market Scout. Deterministic scoring already ranked the
semifinalists (fund-fit + similarity to winners/rejections). Your job: pick ~3 finalists
and write conviction-driven, specific reasons each candidate should advance or be rejected,
plus unresolved risks. Compare to the fund's actual winners and rejected deals — never generic.`;

export interface MarketScoutInput {
  mandate: string;
  fundProfile: FundProfile;
  candidateUniverse: Company[];
  positiveHistory: Company[];
  rejectedHistory: Company[];
  competitors?: Company[];
  embeddings?: EmbeddingMap;
  semifinalistCount?: number;
  finalistCount?: number;
}

/**
 * Market Scout: deterministic ranking (hard filters + sourcing score) first,
 * then LLM enrichment to choose finalists and author non-generic rationale.
 */
export async function marketScoutAgent(
  input: MarketScoutInput,
  deps: AgentDeps,
): Promise<ScoutResult> {
  const semiN = input.semifinalistCount ?? 10;
  const finalN = input.finalistCount ?? 3;

  const ranked = rankCandidates({
    candidates: input.candidateUniverse,
    fundProfile: input.fundProfile,
    positiveHistory: input.positiveHistory,
    rejectedHistory: input.rejectedHistory,
    competitors: input.competitors,
    embeddings: input.embeddings,
  });

  const survivors = ranked.filter((r) => !r.eliminationReason);
  const semifinalists = survivors.slice(0, semiN);
  const byId = new Map(input.candidateUniverse.map((c) => [c.id, c]));
  const semiCompanies = semifinalists
    .map((r) => byId.get(r.companyId))
    .filter((c): c is Company => Boolean(c));

  const scored = semifinalists
    .map(
      (r) =>
        `${describeCompany(byId.get(r.companyId)!)}\n    scores: sourcing=${r.totalScore.toFixed(
          3,
        )}, fundFit=${r.fundFitScore?.toFixed(2)}, simWinners=${r.similarityToWinners?.toFixed(
          2,
        )}, closestWinner=${r.closestWinnerId}, closestRejected=${r.closestRejectedDealId}`,
    )
    .join("\n");

  const enrichment = await deps.llm.generateStructured({
    schema: ScoutEnrichmentSchema,
    schemaName: "ScoutEnrichment",
    system: SYSTEM,
    prompt:
      `Mandate: ${input.mandate}\n` +
      `Fund thesis: ${input.fundProfile.thesisSummary}\n\n` +
      `Winners:\n${describeMany(input.positiveHistory)}\n\n` +
      `Rejected:\n${describeMany(input.rejectedHistory)}\n\n` +
      `Ranked semifinalists:\n${scored}\n\n` +
      `Choose up to ${finalN} finalistIds and enrich each semifinalist.`,
  });

  const enrichmentById = new Map(enrichment.enrichments.map((e) => [e.companyId, e]));
  const enriched: RankedCandidate[] = ranked.map((r) => {
    const e = enrichmentById.get(r.companyId);
    if (!e) return r;
    return {
      ...r,
      reasonsToAdvance: e.reasonsToAdvance,
      reasonsToReject: e.reasonsToReject,
      unresolvedRisks: e.unresolvedRisks,
    };
  });

  // Trust deterministic ordering; keep only valid finalist ids, fall back to top-N.
  const semiIds = new Set(semiCompanies.map((c) => c.id));
  let finalistIds = enrichment.finalistIds.filter((id) => semiIds.has(id)).slice(0, finalN);
  if (finalistIds.length === 0) finalistIds = semifinalists.slice(0, finalN).map((r) => r.companyId);

  return {
    ranked: enriched,
    semifinalistIds: semifinalists.map((r) => r.companyId),
    finalistIds,
  };
}
