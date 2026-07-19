/*
 * Adapter: maps a deterministic brain snapshot (VCBrainState JSON, produced by
 * `brain/src/scripts/exportSnapshot.ts`) into the app's view types. The api
 * client serves these — nothing in the UI knows the data came from the brain.
 *
 * The brain and the app were designed independently, so this is a lossy,
 * defensive mapping: fields the brain produces are mapped; the rest get sensible
 * defaults so every page renders.
 */
import type {
  Analogue,
  Company,
  Competitor,
  CriteriaWeights,
  ExecutionItem,
  Founder,
  FundGraph,
  FundProfile,
  GraphEdge,
  GraphNode,
  SaasModel,
  Stage,
} from '../types'

/* ---- Loose shapes for the brain snapshot (only fields we read) ---- */
interface BrainCompany {
  id: string
  name: string
  description?: string
  attributes?: { industryPath?: string[]; founderArchetypes?: string[] }
  founders?: { name: string; role?: string; background?: string }[]
  stage?: string
  status?: string
  geography?: string
  website?: string
  logoUrl?: string
  hqCity?: string
  hqLat?: number
  hqLng?: number
  sector?: string
  checkSizeSought?: number
  valuation?: number
  metrics?: {
    arr?: number
    arrGrowthRate?: number
    churnRate?: number
    nrr?: number
    grossMargin?: number
    monthlyBurn?: number
    runwayMonths?: number
    cac?: number
  }
  competitors?: string[]
  historicalStatus?: string
  outcomeNarrative?: string
}
interface BrainRanked {
  companyId: string
  totalScore?: number
  fundFitScore?: number
  closestWinnerId?: string
  closestRejectedDealId?: string
  closestCompetitorId?: string
  reasonsToAdvance?: string[]
  reasonsToReject?: string[]
  unresolvedRisks?: string[]
  eliminationReason?: string
}
interface BrainMemoClaim {
  text: string
}
interface BrainMemo {
  companyId: string
  companyOverview?: string
  executiveSummary?: string
  investmentThesis?: string
  whyNow?: string
  marketAndCompetition?: string
  technicalMoat?: string
  businessModel?: string
  reasonsToInvest?: BrainMemoClaim[]
  reasonsToPass?: BrainMemoClaim[]
  keyRisks?: string[]
  openDiligenceQuestions?: string[]
  committeeDisagreement?: string
  recommendation?: string
}
interface BrainDiligence {
  technical?: { founderTechnicalScore?: number }
  commercial?: { diligenceQuestions?: string[] }
  financial?: { assumptions?: Record<string, number> }
  risk?: { criticalRisks?: string[]; highValueQuestions?: string[] }
}
interface BrainLandscapeNode {
  id: string
  clusterId: number
}
interface BrainLandscapeEdge {
  source: string
  target: string
  weight: number
  type: string
}
interface BrainCluster {
  id: number
  label: string
}
interface BrainEvent {
  eventType: string
  payload?: unknown
}
export interface BrainSnapshot {
  portfolioCompanies: BrainCompany[]
  rejectedDeals: BrainCompany[]
  candidateUniverse: BrainCompany[]
  competitors?: BrainCompany[]
  fundProfile?: {
    thesisSummary?: string
    stages?: string[]
    sectors?: string[]
    geographies?: string[]
    checkSize?: { min: number; max: number }
    criteria?: { name: string; weight: number }[]
    partnerProfiles?: { name: string; archetype?: string; priorities?: string[] }[]
  }
  sourcedCandidates?: BrainRanked[]
  finalists?: BrainCompany[]
  diligence?: Record<string, BrainDiligence>
  committeeDecision?: { recommendedCompanyId?: string }
  investmentMemo?: BrainMemo
  events?: BrainEvent[]
}

const usd = (n: number | undefined, digits = 1) =>
  n === undefined ? '—' : `$${(n / 1_000_000).toFixed(digits)}M`
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s)

/** Reject extraction placeholders like "Co-Founder Name" / "Unknown". */
function isRealFounderName(n: string | undefined): boolean {
  if (!n || n.trim().length < 3) return false
  return !/\b(name|unknown|founder|co-founder|n\/a|tbd|unnamed)\b/i.test(n)
}

function appType(hs: string | undefined): Company['type'] {
  if (hs === 'portfolio') return 'portfolio'
  if (hs === 'rejected') return 'rejected'
  return 'sourced'
}

export interface AdaptedData {
  companies: Company[]
  founders: Founder[]
  fundProfile: FundProfile
  weights: CriteriaWeights
  graph: FundGraph
  executionQueue: ExecutionItem[]
}

export function adaptSnapshot(snap: BrainSnapshot): AdaptedData {
  const universe: BrainCompany[] = [
    ...snap.candidateUniverse,
    ...snap.portfolioCompanies,
    ...snap.rejectedDeals,
    ...(snap.competitors ?? []),
  ]
  // Dedupe by id (a company can appear as both candidate and competitor).
  const byId = new Map<string, BrainCompany>()
  for (const c of universe) if (!byId.has(c.id)) byId.set(c.id, c)
  const all = [...byId.values()]
  const nameOf = (id?: string) => (id ? byId.get(id)?.name ?? id : undefined)

  const ranked = new Map((snap.sourcedCandidates ?? []).map((r) => [r.companyId, r]))
  const diligence = snap.diligence ?? {}
  const memo = snap.investmentMemo
  const recId = snap.committeeDecision?.recommendedCompanyId

  /* ---- display fit: cohort-scaled sourcing score (mirrors brain's
   * displayFitScore in tools/fundfit.ts). Raw fund-fit collapses to ~50 for
   * most candidates; the sourcing score differentiates continuously. */
  const aliveScores = (snap.sourcedCandidates ?? []).map((r) => r.totalScore ?? 0).filter((s) => s > 0)
  const scoreLo = aliveScores.length ? Math.min(...aliveScores) : 0
  const scoreHi = aliveScores.length ? Math.max(...aliveScores) : 0
  const displayFit = (totalScore: number | undefined): number | undefined => {
    if (totalScore === undefined) return undefined
    if (totalScore <= 0) return 35 // eliminated / off-thesis
    if (scoreHi - scoreLo < 1e-9) return 70
    const t = (totalScore - scoreLo) / (scoreHi - scoreLo)
    return Math.round(Math.max(30, Math.min(95, 45 + t * 50)))
  }

  /* ---- deal-stage board: recommendation -> IC, finalists/in-diligence ->
   * Diligence, then the next best-ranked sourced companies fill Sourced.
   * Everything else stays off the pipeline board (103 rows would drown it). */
  const finalistIds = new Set((snap.finalists ?? []).map((f) => f.id))
  const topSourcedIds = new Set(
    (snap.sourcedCandidates ?? [])
      .filter((r) => !r.eliminationReason && !finalistIds.has(r.companyId) && r.companyId !== recId)
      .slice(0, 20)
      .map((r) => r.companyId),
  )
  const dealStageFor = (c: BrainCompany, type: Company['type']): Stage | undefined => {
    if (type !== 'sourced') return undefined
    if (c.id === recId) return 'IC'
    if (finalistIds.has(c.id) || c.status === 'in_diligence') return 'Diligence'
    if (c.status === 'meeting_scheduled') return 'Meeting'
    if (c.status === 'contacted') return 'Outreach'
    if (topSourcedIds.has(c.id)) return 'Sourced'
    return undefined
  }

  /* ---- weights (fund criteria) ---- */
  const weights: CriteriaWeights = {}
  for (const c of snap.fundProfile?.criteria ?? []) weights[c.name] = Number(c.weight.toFixed(2))

  /* ---- founders (synthesize ids; brain founders are embedded, unkeyed) ----
   * Web-discovered companies often come back with a placeholder founder name
   * ("Co-Founder Name") when the source snippet has none — drop those rather
   * than show junk rows. Score varies by diligence, else by fund-fit. */
  const founders: Founder[] = []
  for (const c of all) {
    const r = ranked.get(c.id)
    c.founders?.forEach((f, i) => {
      if (!isRealFounderName(f.name)) return
      const techScore = diligence[c.id]?.technical?.founderTechnicalScore
      const score =
        techScore !== undefined
          ? Math.round(techScore * 100)
          : displayFit(r?.totalScore) ?? 68
      founders.push({
        id: `f-${c.id}-${i}`,
        name: f.name,
        companyId: c.id,
        role: f.role ?? 'Founder',
        background: f.background ?? '',
        score,
        justification: f.background ?? 'Founder profile from sourcing.',
        signals: c.attributes?.founderArchetypes ?? [],
      })
    })
  }
  const founderIdsOf = (id: string) => founders.filter((f) => f.companyId === id).map((f) => f.id)

  /* ---- companies ---- */
  const companies: Company[] = all.map((c) => {
    const r = ranked.get(c.id)
    const isRec = c.id === recId
    const type = appType(c.historicalStatus)
    const fit =
      displayFit(r?.totalScore) ??
      (r?.fundFitScore !== undefined
        ? Math.round(r.fundFitScore * 100)
        : type === 'portfolio'
          ? 88
          : type === 'rejected'
            ? 42
            : 70)

    const analogues: Analogue[] = []
    if (r?.closestWinnerId && byId.has(r.closestWinnerId))
      analogues.push({ companyId: r.closestWinnerId, kind: 'portfolio', note: `Resembles prior winner ${nameOf(r.closestWinnerId)}.` })
    if (r?.closestRejectedDealId && byId.has(r.closestRejectedDealId))
      analogues.push({ companyId: r.closestRejectedDealId, kind: 'rejected', note: `Echoes passed deal ${nameOf(r.closestRejectedDealId)}.` })

    const competitors: Competitor[] = []
    if (r?.closestCompetitorId)
      competitors.push({ name: nameOf(r.closestCompetitorId) ?? r.closestCompetitorId, kind: 'direct', note: 'Closest external competitor by similarity.' })
    for (const cn of c.competitors ?? []) competitors.push({ name: nameOf(cn) ?? cn, kind: 'adjacent', note: 'Adjacent player.' })

    const dil = diligence[c.id]
    const a = dil?.financial?.assumptions
    const m = c.metrics
    const model: SaasModel | undefined =
      m || a
        ? {
            arr: m?.arr ?? a?.projectedArr ?? 0,
            growthPct: Math.round((m?.arrGrowthRate ?? 1.2) * 100),
            churnPct: Math.round((m?.churnRate ?? 0.06) * 100),
            nrrPct: Math.round((m?.nrr ?? 1.1) * 100),
            grossMarginPct: Math.round((m?.grossMargin ?? 0.72) * 100),
            cac: m?.cac ?? 15_000,
            cacPaybackMonths: 14,
            burnMonthly: m?.monthlyBurn ?? 250_000,
            runwayMonths: m?.runwayMonths ?? 18,
            valuation: c.valuation ?? a?.entryValuation ?? 0,
            checkSize: a?.investmentAmount ?? c.checkSizeSought ?? 0,
            exitMultiple: a?.exitMultiple ?? 8,
            yearsToExit: a?.yearsToExit ?? 6,
          }
        : undefined

    const risks = isRec && memo?.keyRisks?.length ? memo.keyRisks : dil?.risk?.criticalRisks ?? r?.unresolvedRisks ?? []
    const diligenceQuestions =
      isRec && memo?.openDiligenceQuestions?.length
        ? memo.openDiligenceQuestions
        : dil?.risk?.highValueQuestions ?? dil?.commercial?.diligenceQuestions ?? []
    const reasonsToInvest =
      isRec && memo?.reasonsToInvest?.length ? memo.reasonsToInvest.map((x) => x.text) : r?.reasonsToAdvance ?? []
    const reasonsToPass =
      isRec && memo?.reasonsToPass?.length ? memo.reasonsToPass.map((x) => x.text) : r?.reasonsToReject ?? []

    return {
      id: c.id,
      name: c.name,
      type,
      dealStage: dealStageFor(c, type),
      oneLiner: c.description ?? '',
      sector: c.sector ?? c.attributes?.industryPath?.[0] ?? 'Software',
      stage: cap(c.stage ?? 'seed'),
      location: c.hqCity ?? c.geography ?? '—',
      logoUrl: c.logoUrl,
      hqLatLng: c.hqLat != null && c.hqLng != null ? { lat: c.hqLat, lng: c.hqLng } : undefined,
      raising: c.checkSizeSought ? `${usd(c.checkSizeSought)} round` : undefined,
      fitScore: fit,
      summary: (isRec && memo?.companyOverview) || c.description || '',
      founderIds: founderIdsOf(c.id),
      analogues,
      whySurfaced: r?.reasonsToAdvance,
      risks,
      diligenceQuestions,
      reasonsToInvest,
      reasonsToPass,
      competitors,
      model,
      memo: isRec ? buildMemoText(memo, c.name) : undefined,
      outcome: c.outcomeNarrative ?? (type === 'portfolio' ? 'Portfolio company' : undefined),
    }
  })

  /* ---- fund profile ---- */
  const fp = snap.fundProfile
  const fundProfile: FundProfile = {
    name: 'Meridian Ventures',
    thesis: fp?.thesisSummary ?? '',
    checkSize: fp?.checkSize ? `${usd(fp.checkSize.min, 0)} – ${usd(fp.checkSize.max, 0)} initial` : '—',
    stages: (fp?.stages ?? ['seed']).map(cap),
    sectors: fp?.sectors ?? [],
    geographies: fp?.geographies ?? [],
    partners: (fp?.partnerProfiles ?? []).map((p) => ({
      name: p.name,
      focus: p.priorities?.length ? p.priorities.join(', ') : cap(p.archetype ?? ''),
      leans: cap(p.archetype ?? ''),
    })),
  }

  /* ---- graph (markets = sector families; positions computed by BrainCanvas) ----
   * The brain's landscape clustering fragments fine-grained sectors ("Enterprise
   * AI / Sales Agents" vs "/ Legal Drafting") into dozens of clusters, so group
   * by the sector's family prefix instead and keep the top families as markets. */
  const familyOf = (c: Company): string => {
    const fam = c.sector.split(/[/,(]/)[0].replace(/\s+and\s+.*$/i, '').trim()
    return fam || 'Software'
  }
  const familyCounts = new Map<string, number>()
  for (const c of companies) familyCounts.set(familyOf(c), (familyCounts.get(familyOf(c)) ?? 0) + 1)
  const MAX_MARKETS = 7
  const topFamilies = [...familyCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_MARKETS)
    .map(([fam]) => fam)
  const familySet = new Set(topFamilies)
  const marketLabelFor = (c: Company) => (familySet.has(familyOf(c)) ? familyOf(c) : 'Other')
  const marketLabels = [...topFamilies, ...(companies.some((c) => !familySet.has(familyOf(c))) ? ['Other'] : [])]
  const marketId = (label: string) => `mkt_${label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`

  const landscape = (snap.events ?? []).find((e) => e.eventType === 'market_landscape_built')?.payload as
    | { nodes?: BrainLandscapeNode[]; edges?: BrainLandscapeEdge[]; clusters?: BrainCluster[] }
    | undefined

  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  for (const label of marketLabels) nodes.push({ id: marketId(label), type: 'market', label })
  for (const c of companies) {
    nodes.push({ id: c.id, type: c.type, label: c.name, score: c.fitScore })
    edges.push({ source: c.id, target: marketId(marketLabelFor(c)), kind: 'market', weight: 0.4 })
  }
  for (const f of founders) {
    nodes.push({ id: f.id, type: 'founder', label: f.name, score: f.score })
    edges.push({ source: f.id, target: f.companyId, kind: 'founder', weight: 0.6 })
  }
  const nodeIds = new Set(nodes.map((n) => n.id))
  for (const e of landscape?.edges ?? []) {
    if (nodeIds.has(e.source) && nodeIds.has(e.target))
      edges.push({ source: e.source, target: e.target, kind: e.type === 'analogue' ? 'precedent' : 'similarity', weight: e.weight })
  }
  const graph: FundGraph = { nodes, edges, weights }

  /* ---- execution queue (derived from finalists + recommendation) ---- */
  const executionQueue: ExecutionItem[] = []
  if (recId) executionQueue.push({ id: 'ex-memo', kind: 'memo', title: `Finalize IC memo — ${nameOf(recId)}`, due: 'Today', companyId: recId })
  for (const f of snap.finalists ?? []) {
    if (f.id === recId) continue
    executionQueue.push({ id: `ex-call-${f.id}`, kind: 'call', title: `Diligence call — ${f.name}`, due: 'This week', companyId: f.id })
  }
  const firstSourced = companies.find((c) => c.type === 'sourced' && c.id !== recId)
  if (firstSourced) executionQueue.push({ id: `ex-out-${firstSourced.id}`, kind: 'outreach', title: `Founder outreach — ${firstSourced.name}`, due: 'Next week', companyId: firstSourced.id })

  return { companies, founders, fundProfile, weights, graph, executionQueue }
}

function buildMemoText(memo: BrainMemo | undefined, name: string): string | undefined {
  if (!memo) return undefined
  const parts: string[] = []
  if (memo.executiveSummary) parts.push(memo.executiveSummary)
  if (memo.investmentThesis) parts.push(`Thesis. ${memo.investmentThesis}`)
  if (memo.whyNow) parts.push(`Why now. ${memo.whyNow}`)
  if (memo.marketAndCompetition) parts.push(`Market. ${memo.marketAndCompetition}`)
  if (memo.technicalMoat) parts.push(`Moat. ${memo.technicalMoat}`)
  if (memo.businessModel) parts.push(`Model. ${memo.businessModel}`)
  if (memo.committeeDisagreement) parts.push(`Committee. ${memo.committeeDisagreement}`)
  if (memo.recommendation) parts.push(`Recommendation. ${memo.recommendation}`)
  return parts.length ? parts.join('\n\n') : `Memo for ${name}.`
}
