/*
 * Adapter: maps a deterministic brain snapshot (VCBrainState JSON, produced by
 * `brain/src/scripts/exportSnapshot.ts`) into the app's view types. The api
 * client serves these — nothing in the UI knows the data came from the brain.
 *
 * The brain and the app were designed independently, so this is a lossy,
 * defensive mapping: fields the brain produces are mapped; the rest get sensible
 * defaults so every page renders.
 */
import { DIMENSION_LABELS, similarityDimensions, type SimilarityAttrs } from './similarityDims'
import type {
  Analogue,
  Company,
  Competitor,
  CriteriaWeights,
  ExecutionItem,
  FitBreakdown,
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
  attributes?: SimilarityAttrs & { industryPath?: string[]; founderArchetypes?: string[] }
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
  similarityToWinners?: number
  similarityToRejected?: number
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
  x?: number
  y?: number
  z?: number
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
  memberIds?: string[]
  x?: number
  y?: number
  z?: number
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

/** FNV-1a — deterministic per-company jitter so estimates differ but never change between loads. */
function idHash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

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
   * Diligence, every other non-eliminated ranked candidate -> Sourced.
   * Only hard-filter-eliminated companies (off-stage/off-thesis) stay off the
   * board; the pipeline database view sorts/paginates the volume. */
  const finalistIds = new Set((snap.finalists ?? []).map((f) => f.id))
  const topSourcedIds = new Set(
    (snap.sourcedCandidates ?? [])
      .filter((r) => !r.eliminationReason && !finalistIds.has(r.companyId) && r.companyId !== recId)
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

    /* Score components behind the displayed fit, for the UI's explainer. */
    const fitBreakdown: FitBreakdown | undefined = r
      ? {
          thesisMatch: r.fundFitScore ?? 0,
          similarityToWinners: r.similarityToWinners ?? 0,
          similarityToRejected: r.similarityToRejected ?? 0,
          closestWinner: r.closestWinnerId ? nameOf(r.closestWinnerId) : undefined,
          closestRejected: r.closestRejectedDealId ? nameOf(r.closestRejectedDealId) : undefined,
          eliminationReason: r.eliminationReason,
        }
      : undefined

    /* 10-dimension similarity fingerprint vs closest precedents (radar data).
     * Mirrors the brain's offline similarity recipe over snapshot attributes. */
    let fingerprint: Company['fingerprint']
    if (c.attributes && r && (r.closestWinnerId || r.closestRejectedDealId)) {
      const winner = r.closestWinnerId ? byId.get(r.closestWinnerId) : undefined
      const rejected = r.closestRejectedDealId ? byId.get(r.closestRejectedDealId) : undefined
      const vsW = winner?.attributes ? similarityDimensions(c.attributes, winner.attributes) : undefined
      const vsR = rejected?.attributes ? similarityDimensions(c.attributes, rejected.attributes) : undefined
      if (vsW || vsR) {
        fingerprint = {
          winner: winner?.name,
          rejected: rejected?.name,
          dims: DIMENSION_LABELS.map((d) => ({ ...d, vsWinner: vsW?.[d.key], vsRejected: vsR?.[d.key] })),
        }
      }
    }

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
    /* Every company gets a model so the Model tab and workbooks always render.
     * Source-backed values come from metrics / financial diligence; the rest are
     * stage-scaled, deterministically jittered HCP assumptions. Backfilled
     * fields are tracked so downstream labels read "HCP assumption", never
     * "Company record". */
    const estimatedFields: string[] = []
    const estimate = (field: string, sourced: number | undefined, fallback: number): number => {
      if (sourced !== undefined && Number.isFinite(sourced) && sourced > 0) return sourced
      estimatedFields.push(field)
      return fallback
    }
    const stageLc = (c.stage ?? 'seed').toLowerCase()
    const jitter = 0.8 + ((idHash(c.id) % 401) / 1000) // 0.80 – 1.20
    const baseArr = stageLc.includes('series b')
      ? 6_000_000
      : stageLc.includes('series a')
        ? 2_200_000
        : stageLc.includes('pre')
          ? 400_000
          : 900_000
    const model: SaasModel = {
      arr: estimate('arr', m?.arr ?? a?.projectedArr, Math.round((baseArr * jitter) / 10_000) * 10_000),
      growthPct: estimate(
        'growthPct',
        m?.arrGrowthRate !== undefined ? Math.round(m.arrGrowthRate * 100) : undefined,
        stageLc.includes('series') ? 110 : 140,
      ),
      churnPct: Math.round((m?.churnRate ?? 0.06) * 100),
      nrrPct: Math.round((m?.nrr ?? 1.1) * 100),
      grossMarginPct: Math.round((m?.grossMargin ?? 0.72) * 100),
      cac: m?.cac ?? 15_000,
      cacPaybackMonths: 14,
      burnMonthly: m?.monthlyBurn ?? 250_000,
      runwayMonths: m?.runwayMonths ?? 18,
      valuation: estimate(
        'valuation',
        c.valuation ?? a?.entryValuation,
        // Round size × 5 ≈ 20% dilution round; else a stage-scaled default.
        c.checkSizeSought ? c.checkSizeSought * 5 : Math.round((15_000_000 * jitter) / 100_000) * 100_000,
      ),
      checkSize: estimate('checkSize', a?.investmentAmount ?? c.checkSizeSought, 2_000_000),
      exitMultiple: estimate('exitMultiple', a?.exitMultiple, 8),
      yearsToExit: estimate('yearsToExit', a?.yearsToExit, 6),
      estimatedFields,
    }

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
      fitBreakdown,
      fingerprint,
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

  /* ---- graph (markets = the brain's similarity clusters) ----
   * Clusters come from the brain's hierarchical agglomerative pass (average
   * linkage over 10-dimension similarity, k-medoid split of dominant themes,
   * auto-labeled from modal member attributes). Sector-prefix families remain
   * as a fallback for snapshots without a usable landscape (or degenerate
   * cluster counts). */
  const familyOf = (c: Company): string => {
    const fam = c.sector.split(/[/,(]/)[0].replace(/\s+and\s+.*$/i, '').trim()
    return fam || 'Software'
  }
  const marketId = (label: string) => `mkt_${label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`

  const landscape = (snap.events ?? []).find((e) => e.eventType === 'market_landscape_built')?.payload as
    | { nodes?: BrainLandscapeNode[]; edges?: BrainLandscapeEdge[]; clusters?: BrainCluster[] }
    | undefined

  const clusterList = landscape?.clusters ?? []
  const clusterById = new Map(clusterList.map((cl) => [cl.id, cl]))
  const landscapeNodeById = new Map((landscape?.nodes ?? []).map((node) => [node.id, node]))
  const clusterOfCompany = new Map((landscape?.nodes ?? []).map((n) => [n.id, n.clusterId]))
  const useClusters =
    clusterList.length >= 2 && clusterList.length <= 14 && companies.every((c) => clusterOfCompany.has(c.id) || c.type === 'sourced')

  let marketLabels: string[]
  let marketLabelFor: (c: Company) => string
  if (useClusters) {
    marketLabels = clusterList.map((cl) => cl.label)
    const fallback = clusterList[0].label
    marketLabelFor = (c) => clusterById.get(clusterOfCompany.get(c.id) ?? -1)?.label ?? fallback
  } else {
    const familyCounts = new Map<string, number>()
    for (const c of companies) familyCounts.set(familyOf(c), (familyCounts.get(familyOf(c)) ?? 0) + 1)
    const topFamilies = [...familyCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([fam]) => fam)
    const familySet = new Set(topFamilies)
    marketLabelFor = (c) => (familySet.has(familyOf(c)) ? familyOf(c) : 'Other')
    marketLabels = [...topFamilies, ...(companies.some((c) => !familySet.has(familyOf(c))) ? ['Other'] : [])]
  }

  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  for (const label of marketLabels) {
    const cluster = clusterList.find((candidate) => candidate.label === label)
    nodes.push({
      id: marketId(label),
      type: 'market',
      label,
      position: cluster && cluster.x != null && cluster.y != null && cluster.z != null
        ? [cluster.x, cluster.y, cluster.z]
        : undefined,
    })
  }
  for (const c of companies) {
    const semanticPosition = landscapeNodeById.get(c.id)
    const hasSemanticPosition = semanticPosition
      && semanticPosition.x != null
      && semanticPosition.y != null
      && semanticPosition.z != null
    nodes.push({
      id: c.id,
      type: c.type,
      label: c.name,
      score: c.fitScore,
      position: hasSemanticPosition ? [semanticPosition.x!, semanticPosition.y!, semanticPosition.z!] : undefined,
    })
    edges.push({ source: c.id, target: marketId(marketLabelFor(c)), kind: 'market', weight: 0.4 })
  }
  for (const f of founders) {
    nodes.push({ id: f.id, type: 'founder', label: f.name, score: f.score })
    /* standalone prospects (founder scout) have no company edge; they orbit unattached */
    if (f.companyId) edges.push({ source: f.id, target: f.companyId, kind: 'founder', weight: 0.6 })
  }
  const nodeIds = new Set(nodes.map((n) => n.id))
  for (const e of landscape?.edges ?? []) {
    if (nodeIds.has(e.source) && nodeIds.has(e.target))
      edges.push({
        source: e.source,
        target: e.target,
        kind: e.type === 'competition' ? 'competition' : e.type === 'analogue' ? 'precedent' : 'similarity',
        weight: e.weight,
      })
  }

  // Ranked candidates can name the nearest external competitor after the
  // landscape event was emitted. Add those links without requiring an LLM or
  // overwriting the similarity/precedent layers.
  const competitionKeys = new Set(
    edges
      .filter((edge) => edge.kind === 'competition')
      .map((edge) => [edge.source, edge.target].sort().join('|')),
  )
  for (const rankedCompany of snap.sourcedCandidates ?? []) {
    const competitorId = rankedCompany.closestCompetitorId
    if (!competitorId || !nodeIds.has(rankedCompany.companyId) || !nodeIds.has(competitorId)) continue
    const key = [rankedCompany.companyId, competitorId].sort().join('|')
    if (competitionKeys.has(key)) continue
    competitionKeys.add(key)
    edges.push({ source: rankedCompany.companyId, target: competitorId, kind: 'competition', weight: 0.8 })
  }

  // Founder-to-founder links require an exact normalized organization name in
  // both backgrounds (e.g. “ex-Epic” / “from Epic”). No semantic inference.
  const organizations = (background: string): Set<string> => {
    const names = new Set<string>()
    const patterns = [
      /\b(?:ex[-\s]|at\s+|from\s+)([A-Z][A-Za-z0-9&.+-]*(?:\s+[A-Z][A-Za-z0-9&.+-]*){0,3})/g,
      /\b([A-Z][A-Za-z0-9&.+-]*(?:\s+[A-Z][A-Za-z0-9&.+-]*){0,3}\s+(?:University|College|Institute|Labs?))\b/g,
    ]
    for (const pattern of patterns) {
      for (const match of background.matchAll(pattern)) names.add(match[1]!.trim().toLocaleLowerCase('en-US'))
    }
    return names
  }
  const founderOrganizations = new Map(founders.map((founder) => [founder.id, organizations(founder.background)]))
  for (let i = 0; i < founders.length; i++) {
    for (let j = i + 1; j < founders.length; j++) {
      const a = founders[i]!
      const b = founders[j]!
      if (a.companyId === b.companyId) continue
      const aOrganizations = founderOrganizations.get(a.id)!
      if ([...aOrganizations].some((organization) => founderOrganizations.get(b.id)!.has(organization))) {
        edges.push({ source: a.id, target: b.id, kind: 'founder', weight: 0.55 })
      }
    }
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
