import type { Company } from "./schemas/company.js";
import type { FundProfile } from "./schemas/fundProfile.js";
import type { HistoricalMemo } from "./schemas/history.js";
import type { RankedCandidate } from "./schemas/sourcing.js";
import type { CandidateDiligence } from "./schemas/diligence.js";
import type { PartnerOpinion, CommitteeDecision } from "./schemas/committee.js";
import type { InvestmentMemo } from "./schemas/memo.js";
import type { InvestorFeedback, LearningResult } from "./schemas/feedback.js";
import type { ScenarioSet } from "./finance/scenarios.js";

export type WorkflowStage =
  | "profiling"
  | "sourcing"
  | "diligence"
  | "partner_review"
  | "committee"
  | "memo"
  | "learning";

/** A structured event the orchestrator emits for the 3D graph to react to. */
export interface WorkflowEvent {
  id: string;
  stage: WorkflowStage;
  eventType: string;
  timestamp: number;
  /** Graph node IDs this event touches (for highlight/pulse/fly-to). */
  nodeIds?: string[];
  payload: unknown;
}

/**
 * Single central state object every agent reads from and writes to.
 * The orchestrator owns mutation; agents return typed outputs that the
 * orchestrator validates and merges here.
 */
export interface VCBrainState {
  // Inputs
  mandate: string;
  historicalMemos: HistoricalMemo[];
  portfolioCompanies: Company[];
  rejectedDeals: Company[];
  candidateUniverse: Company[];

  // Progressively filled outputs
  fundProfile?: FundProfile;
  sourcedCandidates?: RankedCandidate[];
  finalists?: Company[];
  diligence?: Record<string, CandidateDiligence>;
  partnerOpinions?: Record<string, PartnerOpinion[]>;
  committeeDecision?: CommitteeDecision;
  investmentMemo?: InvestmentMemo;
  /** Deterministic bull/base/bear returns for the recommended company. */
  financialScenarios?: ScenarioSet;

  feedback?: InvestorFeedback;
  learningResult?: LearningResult;
  updatedFundProfile?: FundProfile;

  events: WorkflowEvent[];
}

export function createInitialState(input: {
  mandate: string;
  historicalMemos?: HistoricalMemo[];
  portfolioCompanies?: Company[];
  rejectedDeals?: Company[];
  candidateUniverse?: Company[];
}): VCBrainState {
  return {
    mandate: input.mandate,
    historicalMemos: input.historicalMemos ?? [],
    portfolioCompanies: input.portfolioCompanies ?? [],
    rejectedDeals: input.rejectedDeals ?? [],
    candidateUniverse: input.candidateUniverse ?? [],
    events: [],
  };
}
