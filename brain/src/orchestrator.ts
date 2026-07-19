import type { VCBrainState, WorkflowStage } from "./state.js";
import type { Company } from "./schemas/company.js";
import type { CandidateDiligence } from "./schemas/diligence.js";
import type { PartnerOpinion } from "./schemas/committee.js";
import type { InvestorFeedback } from "./schemas/feedback.js";
import type { LLMClient } from "./llm/client.js";
import type { SearchClient } from "./search/client.js";
import { CompanyIndex, findNearestCompanies, type EmbeddingMap } from "./tools/similarity.js";
import { buildMarketLandscape } from "./tools/landscape.js";
import { labelClustersWithLLM } from "./tools/labelClusters.js";
import { discoverCompanies } from "./tools/discover.js";
import { emitGraphEvent } from "./tools/events.js";
import {
  fundProfilerAgent,
  marketScoutAgent,
  technicalDiligenceAgent,
  commercialDiligenceAgent,
  financialDiligenceAgent,
  riskAgent,
  partnerReviewAgent,
  investmentCommitteeAgent,
  memoAgent,
  learningAgent,
} from "./agents/index.js";

export interface OrchestratorOptions {
  llm: LLMClient;
  /** External competitors used for landscape + closest-competitor labelling. */
  competitors?: Company[];
  maxRetries?: number;
  /** Deterministic clock for tests. */
  now?: () => number;
  /** Skip embedding step (pure text-fallback similarity). */
  useEmbeddings?: boolean;
  /** Web-search client for live discovery. Required when `discover` is set. */
  search?: SearchClient;
  /** Discover real companies from the web and add them to the candidate universe. */
  discover?: boolean | { queries?: string[]; limit?: number; resultsPerQuery?: number };
  /** Observe real agent execution for streamed UIs. */
  onAgentEvent?: (event: AgentExecutionEvent) => void | Promise<void>;
}

export interface AgentExecutionEvent {
  agent: string;
  status: "started" | "completed" | "failed";
  error?: string;
}

async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  label: string,
  onAgentEvent?: OrchestratorOptions["onAgentEvent"],
): Promise<T> {
  await onAgentEvent?.({ agent: label, status: "started" });
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      await onAgentEvent?.({ agent: label, status: "completed" });
      return result;
    } catch (e) {
      lastErr = e;
    }
  }
  await onAgentEvent?.({ agent: label, status: "failed", error: String(lastErr) });
  throw new Error(`Agent '${label}' failed after ${retries + 1} attempt(s): ${String(lastErr)}`);
}

async function buildEmbeddingMap(companies: Company[], llm: LLMClient): Promise<EmbeddingMap> {
  const texts = companies.map((c) => c.attributes.problemStatement || c.description || c.name);
  const vectors = await llm.embed(texts);
  const map: EmbeddingMap = new Map();
  companies.forEach((c, i) => {
    const v = vectors[i];
    if (v) map.set(c.id, { problem: v });
  });
  return map;
}

/**
 * Runs the full investment pipeline over the shared state. The orchestrator
 * owns sequencing, parallelism, validation/retries, and event emission — agents
 * never call one another.
 */
export async function runPipeline(
  state: VCBrainState,
  opts: OrchestratorOptions,
): Promise<VCBrainState> {
  const { llm } = opts;
  const retries = opts.maxRetries ?? 1;
  const now = opts.now ?? Date.now;
  const competitors = opts.competitors ?? [];

  const emit = (stage: WorkflowStage, eventType: string, nodeIds?: string[], payload?: unknown) =>
    emitGraphEvent(state, { stage, eventType, nodeIds, payload, timestamp: now() });

  // Index every known company for lookups + analogues.
  const allCompanies = [
    ...state.candidateUniverse,
    ...state.portfolioCompanies,
    ...state.rejectedDeals,
    ...competitors,
  ];
  const index = new CompanyIndex(allCompanies);
  const historyPool = [...state.portfolioCompanies, ...state.rejectedDeals, ...competitors];

  // --- 1. Profiling ---
  state.fundProfile = await withRetry(
    () =>
      fundProfilerAgent(
        {
          mandate: state.mandate,
          historicalMemos: state.historicalMemos,
          portfolioCompanies: state.portfolioCompanies,
          rejectedDeals: state.rejectedDeals,
        },
        { llm },
      ),
    retries,
    "fundProfiler",
    opts.onAgentEvent,
  );
  emit("profiling", "fund_profile_ready", [], { criteria: state.fundProfile.criteria.length });

  // --- 2. Sourcing ---
  // Optional live discovery: pull real companies from the web into the universe
  // BEFORE embeddings/ranking so discovered companies are scored and placed too.
  if (opts.discover) {
    if (!opts.search) {
      throw new Error("runPipeline: `discover` is set but no `search` client was provided");
    }
    const search = opts.search;
    const cfg = typeof opts.discover === "object" ? opts.discover : {};
    const discovered = await withRetry(
      () =>
        discoverCompanies(
          {
            mandate: state.mandate,
            fundProfile: state.fundProfile,
            queries: cfg.queries,
            limit: cfg.limit ?? 15,
            resultsPerQuery: cfg.resultsPerQuery,
            excludeNames: allCompanies.map((c) => c.name),
          },
          { search, llm },
        ),
      retries,
      "discovery",
      opts.onAgentEvent,
    );
    for (const c of discovered) {
      state.candidateUniverse.push(c);
      allCompanies.push(c);
      index.add(c);
    }
    emit("sourcing", "candidates_discovered", discovered.map((c) => c.id), {
      count: discovered.length,
      names: discovered.map((c) => c.name),
    });
  }

  const embeddings =
    opts.useEmbeddings === false ? undefined : await buildEmbeddingMap(allCompanies, llm);

  emit("sourcing", "candidate_universe_loaded", state.candidateUniverse.map((c) => c.id));
  let landscape = buildMarketLandscape([...state.candidateUniverse, ...historyPool], {
    embeddings,
  });
  /* modal auto-labels usually collapse to the industry — let the LLM name the
     shared strategic shape instead (falls back to auto-labels on failure) */
  landscape = await labelClustersWithLLM(landscape, [...state.candidateUniverse, ...historyPool], llm);
  emit("sourcing", "market_landscape_built", undefined, landscape);

  const scout = await withRetry(
    () =>
      marketScoutAgent(
        {
          mandate: state.mandate,
          fundProfile: state.fundProfile!,
          candidateUniverse: state.candidateUniverse,
          positiveHistory: state.portfolioCompanies,
          rejectedHistory: state.rejectedDeals,
          competitors,
          embeddings,
        },
        { llm },
      ),
    retries,
    "marketScout",
    opts.onAgentEvent,
  );
  state.sourcedCandidates = scout.ranked;
  emit("sourcing", "semifinalists_selected", scout.semifinalistIds);
  emit("sourcing", "finalists_selected", scout.finalistIds);

  let finalists = scout.finalistIds
    .map((id) => index.get(id))
    .filter((c): c is Company => Boolean(c));
  // Hard filters can wipe the shortlist; fall back to top ranked / universe so
  // diligence → IC → memo still run on real discovered companies.
  if (finalists.length === 0 && state.candidateUniverse.length > 0) {
    const rankedIds = (state.sourcedCandidates ?? [])
      .filter((candidate) => Number.isFinite(candidate.totalScore) && candidate.totalScore !== -Infinity)
      .slice(0, 3)
      .map((candidate) => candidate.companyId);
    finalists = rankedIds
      .map((id) => index.get(id))
      .filter((c): c is Company => Boolean(c));
    if (finalists.length === 0) {
      finalists = state.candidateUniverse.slice(0, Math.min(3, state.candidateUniverse.length));
    }
    emit("sourcing", "finalists_selected", finalists.map((company) => company.id), {
      fallback: true,
    });
  }
  state.finalists = finalists;

  // --- 3. Diligence (per finalist; specialists run in parallel) ---
  const diligence: Record<string, CandidateDiligence> = {};
  for (const company of finalists) {
    const analogues = findNearestCompanies(company, historyPool, { k: 3, embeddings }).map((n) =>
      index.get(n.companyId),
    );
    const analogueCompanies = analogues.filter((c): c is Company => Boolean(c));
    const dilInput = { company, fundProfile: state.fundProfile, analogues: analogueCompanies };

    const [technical, commercial, financial] = await Promise.all([
      withRetry(() => technicalDiligenceAgent(dilInput, { llm }), retries, "technicalDiligence", opts.onAgentEvent),
      withRetry(() => commercialDiligenceAgent(dilInput, { llm }), retries, "commercialDiligence", opts.onAgentEvent),
      withRetry(() => financialDiligenceAgent(dilInput, { llm }), retries, "financialDiligence", opts.onAgentEvent),
    ]);
    const risk = await withRetry(
      () => riskAgent({ ...dilInput, technical, commercial, financial }, { llm }),
      retries,
      "risk",
      opts.onAgentEvent,
    );
    diligence[company.id] = { companyId: company.id, technical, commercial, financial, risk };
    emit("diligence", "diligence_complete", [company.id]);
  }
  state.diligence = diligence;

  // --- 4. Partner review (each partner over all finalists) ---
  const partnerOpinions: Record<string, PartnerOpinion[]> = {};
  for (const partner of state.fundProfile.partnerProfiles) {
    const opinions = await withRetry(
      () =>
        partnerReviewAgent(
          { partner, finalists, diligence, fundProfile: state.fundProfile! },
          { llm },
        ),
      retries,
      `partner:${partner.id}`,
      opts.onAgentEvent,
    );
    partnerOpinions[partner.id] = opinions;
    for (const o of opinions) {
      emit("partner_review", "partner_vote", [o.companyId], { partnerId: partner.id, vote: o.vote });
    }
  }
  state.partnerOpinions = partnerOpinions;

  // --- 5. Committee ---
  state.committeeDecision = await withRetry(
    () =>
      investmentCommitteeAgent(
        { finalists, partnerOpinions, fundProfile: state.fundProfile! },
        { llm },
      ),
    retries,
    "committee",
    opts.onAgentEvent,
  );
  emit("committee", "recommendation_produced", [state.committeeDecision.recommendedCompanyId], {
    confidence: state.committeeDecision.confidence,
  });

  // --- 6. Memo (for the recommended company) ---
  const recommended =
    finalists.find((c) => c.id === state.committeeDecision!.recommendedCompanyId) ?? finalists[0];
  if (recommended) {
    const analogues = findNearestCompanies(recommended, historyPool, { k: 3, embeddings })
      .map((n) => index.get(n.companyId))
      .filter((c): c is Company => Boolean(c));
    const { memo, scenarios } = await withRetry(
      () =>
        memoAgent(
          {
            company: recommended,
            fundProfile: state.fundProfile!,
            diligence: diligence[recommended.id]!,
            analogues,
            partnerOpinions: Object.values(partnerOpinions).flat().filter((o) => o.companyId === recommended.id),
            committee: state.committeeDecision!,
          },
          { llm },
        ),
      retries,
      "memo",
      opts.onAgentEvent,
    );
    state.investmentMemo = memo;
    state.financialScenarios = scenarios;
    emit("memo", "memo_generated", [recommended.id], { scenarios });
  }

  return state;
}

/**
 * Apply investor feedback: interpret it, update criterion weights, rerank, and
 * emit a learning pulse. Runs after a pipeline; requires an existing fundProfile.
 */
export async function applyFeedback(
  state: VCBrainState,
  feedback: InvestorFeedback,
  opts: OrchestratorOptions,
): Promise<VCBrainState> {
  if (!state.fundProfile) throw new Error("applyFeedback: state has no fundProfile yet");
  const now = opts.now ?? Date.now;
  const competitors = opts.competitors ?? [];
  const embeddings =
    opts.useEmbeddings === false
      ? undefined
      : await buildEmbeddingMap(
          [...state.candidateUniverse, ...state.portfolioCompanies, ...state.rejectedDeals, ...competitors],
          opts.llm,
        );

  const rankingBefore = state.sourcedCandidates?.map((r) => r.companyId);
  const { learningResult, updatedFundProfile } = await withRetry(
    () =>
      learningAgent(
        {
          feedback,
          fundProfile: state.fundProfile!,
          candidateUniverse: state.candidateUniverse,
          positiveHistory: state.portfolioCompanies,
          rejectedHistory: state.rejectedDeals,
          competitors,
          embeddings,
          rankingBefore,
        },
        { llm: opts.llm },
      ),
    opts.maxRetries ?? 1,
    "learning",
    opts.onAgentEvent,
  );

  state.feedback = feedback;
  state.learningResult = learningResult;
  state.updatedFundProfile = updatedFundProfile;
  emitGraphEvent(state, {
    stage: "learning",
    eventType: "fund_preferences_updated",
    nodeIds: [feedback.companyId],
    payload: {
      changedCriteria: learningResult.changedCriteria,
      whatTheFundLearned: learningResult.whatTheFundLearned,
    },
    timestamp: now(),
  });
  return state;
}
