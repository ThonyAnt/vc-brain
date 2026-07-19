export type NodeType = 'portfolio' | 'rejected' | 'sourced' | 'founder' | 'market' | 'criterion'

export type Stage = 'Sourced' | 'Outreach' | 'Meeting' | 'Diligence' | 'IC' | 'Decision'

export interface GraphNode {
  id: string
  type: NodeType
  label: string
  score?: number
  position?: [number, number, number]
}

export interface GraphEdge {
  source: string
  target: string
  kind: 'similarity' | 'competition' | 'market' | 'founder' | 'precedent' | 'risk'
  weight: number
}

export type CriteriaWeights = Record<string, number>

export interface FundGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  weights: CriteriaWeights
}

export interface Analogue {
  companyId: string
  kind: 'portfolio' | 'rejected'
  note: string
}

export interface Competitor {
  name: string
  kind: 'direct' | 'adjacent' | 'incumbent' | 'emerging'
  note: string
}

export interface SaasModel {
  arr: number
  customers?: number
  growthPct: number
  churnPct: number
  nrrPct: number
  grossMarginPct: number
  cac: number
  cacPaybackMonths: number
  burnMonthly: number
  runwayMonths: number
  valuation: number
  checkSize: number
  exitMultiple: number
  yearsToExit: number
  /** Fields backfilled with stage-scaled HCP assumptions (not company data). */
  estimatedFields?: string[]
}

export interface Meeting {
  id: string
  date: string
  title: string
  notes?: string
}

/**
 * Per-company components behind the displayed fund-fit score (all 0..1):
 * sourcing_score = w₊·similarityToWinners − w₋·similarityToRejected + wₜ·thesisMatch,
 * then cohort-scaled to 30–95 for display. Weights re-learn from feedback.
 */
export interface FitBreakdown {
  thesisMatch: number
  similarityToWinners: number
  similarityToRejected: number
  closestWinner?: string
  closestRejected?: string
  /** Present when a hard filter (stage / check size) knocked the company out. */
  eliminationReason?: string
}

/** Per-dimension similarity of a sourced company vs its closest precedents (all 0..1). */
export interface SimilarityFingerprint {
  winner?: string
  rejected?: string
  dims: { key: string; label: string; vsWinner?: number; vsRejected?: number }[]
}

export interface Company {
  id: string
  name: string
  type: 'portfolio' | 'rejected' | 'sourced'
  oneLiner: string
  sector: string
  stage: string
  location: string
  /** Favicon-service logo derived from the company website at sourcing time. */
  logoUrl?: string
  /** Structured HQ coordinates from sourcing; preferred over city-name lookup. */
  hqLatLng?: { lat: number; lng: number }
  raising?: string
  fitScore: number
  summary: string
  founderIds: string[]
  analogues: Analogue[]
  whySurfaced?: string[]
  risks: string[]
  diligenceQuestions: string[]
  reasonsToInvest: string[]
  reasonsToPass: string[]
  competitors: Competitor[]
  model?: SaasModel
  /** Score components behind fitScore, when the company was ranked by the brain. */
  fitBreakdown?: FitBreakdown
  /** 10-dimension similarity vs closest winner/rejected, for the radar. */
  fingerprint?: SimilarityFingerprint
  memo?: string
  meetings?: Meeting[]
  dealStage?: Stage
  outcome?: string
}

export interface Founder {
  id: string
  name: string
  /** Absent for standalone prospects sourced by the founder scout. */
  companyId?: string
  /** Display-only company name when the scout found one but it isn't in the universe. */
  company?: string
  role: string
  background: string
  score: number
  justification: string
  signals: string[]
  linkedin?: string
  /** Public source URLs the scout assembled the profile from. */
  sources?: string[]
  confidence?: 'low' | 'medium' | 'high'
}

export interface ExecutionItem {
  id: string
  kind: 'call' | 'outreach' | 'schedule' | 'memo'
  title: string
  due: string
  companyId?: string
}

export interface FundProfile {
  name: string
  thesis: string
  checkSize: string
  /** Structured check size (USD), present when loaded from the live brain API. */
  checkSizeMin?: number
  checkSizeMax?: number
  stages: string[]
  sectors: string[]
  geographies: string[]
  partners: { name: string; focus: string; leans: string }[]
}

/** A partial edit to the fund profile; mirrors the brain's FundProfilePatch. */
export interface FundProfilePatch {
  thesis?: string
  checkSizeMin?: number
  checkSizeMax?: number
  stages?: string[]
  sectors?: string[]
  geographies?: string[]
  weights?: CriteriaWeights
}

/** The editable slice the brain returns from GET/POST /api/fund. */
export interface FundProfileView {
  thesis: string
  checkSizeMin: number
  checkSizeMax: number
  stages: string[]
  sectors: string[]
  geographies: string[]
  weights: CriteriaWeights
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface FeedbackInput {
  entityId: string
  action: 'agree' | 'disagree' | 'investigate' | 'pass' | 'save' | 'outreach'
  justification?: string
}

export interface FeedbackResult {
  weights: CriteriaWeights
  changedNodeIds: string[]
  note: string
}
