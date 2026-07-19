import type { Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import type { RankedCandidate } from "../schemas/sourcing.js";
import {
  computeFundFit,
  computeSourcingScore,
  effectivePreferences,
  type FundFitResult,
} from "../fundfit/compute.js";
import { companySimilarity, type EmbeddingMap } from "./similarity.js";

/** `compute_fund_fit` — learned-preference fit (recommendations, not position). */
export function fundFit(company: Company, profile: FundProfile): FundFitResult {
  return computeFundFit(company.attributes, profile.attributePreferences);
}

function maxSimilarity(
  target: Company,
  pool: Company[],
  emb?: EmbeddingMap,
): { score: number; id?: string } {
  let best = 0;
  let bestId: string | undefined;
  for (const c of pool) {
    const s = companySimilarity(target, c, emb).overall;
    if (s > best) {
      best = s;
      bestId = c.id;
    }
  }
  return { score: best, id: bestId };
}

export interface RankInput {
  candidates: Company[];
  fundProfile: FundProfile;
  /** Successful/invested history to pull toward. */
  positiveHistory: Company[];
  /** Rejected history to push away from. */
  rejectedHistory: Company[];
  /** External competitors for closest-competitor labelling. */
  competitors?: Company[];
  embeddings?: EmbeddingMap;
}

/**
 * Normalize a USD amount that may have been written in millions ("2.5") instead
 * of dollars ("2500000") — LLM extraction and imported datasets mix both. No
 * real check/valuation is under $100k, so smaller values are read as millions.
 */
export function normalizeUsd(n: number): number {
  return n > 0 && n < 100_000 ? n * 1_000_000 : n;
}

function passesHardFilters(c: Company, profile: FundProfile): string | undefined {
  if (profile.stages.length && c.stage && !profile.stages.includes(c.stage)) {
    return `stage ${c.stage} not in fund's preferred stages`;
  }
  // Geography is intentionally NOT a hard filter: it's free-text and
  // LLM-extracted ("US" vs "United States" vs "North America"), so an exact
  // mismatch must not silently eliminate every candidate. Treated as a soft signal.
  if (c.checkSizeSought != null) {
    // Units normalized on BOTH sides: the profiler has emitted {min:1, max:2.5}
    // (millions) while candidates carry dollar amounts — comparing raw values
    // once eliminated 101/103 candidates.
    const min = normalizeUsd(profile.checkSize.min);
    const max = normalizeUsd(profile.checkSize.max);
    const sought = normalizeUsd(c.checkSizeSought);
    if (sought < min * 0.5 || sought > max * 2) {
      return `check size ${sought} incompatible with fund range`;
    }
  }
  return undefined;
}

/**
 * `rank_candidates` — deterministic ranking. Hard filters eliminate, then the
 * sourcing score (fund fit + similarity to positive/rejected history) orders
 * the rest. LLM-authored reasons are layered on by the Market Scout agent.
 */
export function rankCandidates(input: RankInput): RankedCandidate[] {
  const { fundProfile, positiveHistory, rejectedHistory, competitors = [], embeddings } = input;

  // History-derived preferences (merged with any non-zero learned ones) so
  // fund-fit is meaningful even when the LLM's attributePreferences are empty.
  const prefs = effectivePreferences(
    fundProfile.attributePreferences,
    positiveHistory.map((c) => c.attributes),
    rejectedHistory.map((c) => c.attributes),
  );

  const ranked: RankedCandidate[] = input.candidates.map((c) => {
    const elimination = passesHardFilters(c, fundProfile);
    const fit = computeFundFit(c.attributes, prefs);
    const pos = maxSimilarity(c, positiveHistory, embeddings);
    const rej = maxSimilarity(c, rejectedHistory, embeddings);
    const comp = maxSimilarity(c, competitors, embeddings);

    const sourcing = computeSourcingScore(
      {
        similarityToPositive: pos.score,
        similarityToRejected: rej.score,
        thesisMatch: fit.score,
      },
      fundProfile.sourcingCoefficients,
    );

    return {
      companyId: c.id,
      totalScore: elimination ? -Infinity : sourcing,
      criterionScores: {},
      fundFitScore: fit.score,
      similarityToWinners: pos.score,
      similarityToRejected: rej.score,
      closestWinnerId: pos.id,
      closestRejectedDealId: rej.id,
      closestCompetitorId: comp.id,
      reasonsToAdvance: [],
      reasonsToReject: [],
      unresolvedRisks: [],
      eliminationReason: elimination,
    } satisfies RankedCandidate;
  });

  ranked.sort((a, b) => b.totalScore - a.totalScore);
  // Normalize -Infinity display score back to 0 for eliminated candidates.
  for (const r of ranked) if (r.totalScore === -Infinity) r.totalScore = 0;
  return ranked;
}
