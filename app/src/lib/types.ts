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
}

export interface Meeting {
  id: string
  date: string
  title: string
  notes?: string
}

export interface Company {
  id: string
  name: string
  type: 'portfolio' | 'rejected' | 'sourced'
  oneLiner: string
  sector: string
  stage: string
  location: string
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
  memo?: string
  meetings?: Meeting[]
  dealStage?: Stage
  outcome?: string
}

export interface Founder {
  id: string
  name: string
  companyId: string
  role: string
  background: string
  score: number
  justification: string
  signals: string[]
}

export type OutreachStatus = 'draft' | 'pending_approval' | 'sent' | 'replied' | 'awaiting_slot' | 'event_created'

export interface OutreachMessage {
  id: string
  direction: 'outbound' | 'inbound'
  sentAt: string
  body: string
}

export interface OutreachSlot {
  id: string
  label: string
  startAt: string
  endAt: string
}

export interface OutreachRecord {
  id: string
  companyId: string
  contact: {
    name: string
    role: string
    email: string
    source: string
    confidence: number
    verified: boolean
  }
  status: OutreachStatus
  subject: string
  body: string
  personalizationFacts: string[]
  thread: OutreachMessage[]
  offeredSlots: OutreachSlot[]
  event?: { title: string; startAt: string; calendar: string }
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
  stages: string[]
  sectors: string[]
  geographies: string[]
  partners: { name: string; focus: string; leans: string }[]
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
