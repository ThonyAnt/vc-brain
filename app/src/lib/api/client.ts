import snapshotJson from '../brain/snapshot.json'
import { adaptSnapshot, type BrainSnapshot } from '../brain/adapt'
import type {
  ChatMessage,
  Company,
  ExecutionItem,
  FeedbackInput,
  FeedbackResult,
  Founder,
  FundGraph,
  FundProfile,
  FundProfilePatch,
  FundProfileView,
  OutreachRecord,
} from '../types'

export type OrchestratorStreamEvent =
  | { type: 'run_started'; runId: string; orchestrator: string; agents: string[] }
  | { type: 'agent_started'; runId: string; agent: string; label: string }
  | { type: 'agent_completed'; runId: string; agent: string; summary: string }
  | { type: 'agent_failed'; runId: string; agent: string; error: string }
  | { type: 'companies_sourced'; runId: string; companies: Company[]; founders?: Founder[] }
  | { type: 'founders_sourced'; runId: string; founders: Founder[] }
  | { type: 'text_delta'; runId: string; delta: string }
  | { type: 'run_completed'; runId: string; message: ChatMessage }
  | { type: 'error'; error: string }

export interface StreamChatHandlers {
  onDelta?: (delta: string) => void
  onEvent?: (event: OrchestratorStreamEvent) => void
}

type ChatContext = {
  route?: string
  companyId?: string
  comparisonCompanyId?: string
  axes?: { x: string; y: string; z: string }
}

export type CompanyWorkbookKind = 'tam-exit' | 'landscape'

export interface CompanyWorkbookPreview {
  kind: CompanyWorkbookKind
  title: string
  fileName: string
  previewSheet: string
  sheets: string[]
  status: 'company-specific'
  notes: string[]
  columns: string[]
  rows: { label: string; values: (string | number | null)[]; source?: string }[]
}

/*
 * The HCP research snapshot (100 underwritten companies + the fund's own memo
 * history, run through the live pipeline) is the deterministic frontend seed.
 * Interactive endpoints hit the live brain API, and newly sourced companies are
 * merged into this dataset at runtime so demo content and real pipeline coexist.
 */

const adapted = adaptSnapshot(snapshotJson as unknown as BrainSnapshot)
const data = {
  companies: [...adapted.companies],
  founders: [...adapted.founders],
  fundProfile: adapted.fundProfile,
  weights: { ...adapted.weights },
  graph: adapted.graph,
  executionQueue: [...adapted.executionQueue],
}

const store = {
  graph: data.graph,
  weights: { ...data.weights },
  feedbackLog: [] as { input: FeedbackInput; note: string }[],
  outreach: new Map<string, OutreachRecord>(),
}

function outreachFor(companyId: string): OutreachRecord {
  const existing = store.outreach.get(companyId)
  if (existing) return existing
  const company = data.companies.find((item) => item.id === companyId)
  const founder = data.founders.find((item) => item.companyId === companyId)
  const contactName = founder?.name ?? 'Founder'
  const firstName = contactName.split(' ')[0]
  const record: OutreachRecord = {
    id: `outreach-${companyId}`,
    companyId,
    contact: {
      name: contactName,
      role: founder?.role ?? `Founder, ${company?.name ?? 'company'}`,
      email: `${firstName.toLowerCase()}@${(company?.name ?? 'company').toLowerCase().replace(/\s/g, '')}.com`,
      source: 'Founder profile · verified work email',
      confidence: 94,
      verified: true,
    },
    status: 'draft',
    subject: `Quick question about ${company?.name ?? 'your company'}`,
    body: `Hi ${firstName},\n\nI came across ${company?.name ?? 'the company'} and was impressed by ${company?.whySurfaced?.[0]?.toLowerCase() ?? 'the team’s approach'}. At Meridian, we partner with technical founders building durable B2B infrastructure and workflow software.\n\nWould you be open to a brief 25-minute conversation next week to compare notes?\n\nBest,\nDana\nMeridian Ventures`,
    personalizationFacts: [
      company?.whySurfaced?.[0] ?? 'Matches Meridian’s seed-stage investment focus.',
      founder?.signals[0] ?? 'Founder profile is a strong match for the fund thesis.',
    ],
    thread: [],
    offeredSlots: [],
  }
  store.outreach.set(companyId, record)
  return record
}

const sourcingListeners = new Set<(companies: Company[]) => void>()

function mergeSourcedCompanies(companies: Company[], founders: Founder[] = []) {
  const byId = new Map(data.companies.map((company) => [company.id, company]))
  for (const company of companies) byId.set(company.id, company)
  data.companies = [...byId.values()]
  const foundersById = new Map(data.founders.map((founder) => [founder.id, founder]))
  for (const founder of founders) foundersById.set(founder.id, founder)
  data.founders = [...foundersById.values()]
  for (const listener of sourcingListeners) listener(companies)
}

/** POST to the live brain API; returns null if it's unreachable or errors. */
async function postJson<T>(path: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/** GET from the live brain API; returns null if it's unreachable or errors. */
async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(path)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/** Format a USD check-size range as e.g. "$1.0M – $2.5M" for display. */
function formatCheckSize(min: number, max: number): string {
  const m = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`
  return `${m(min)} – ${m(max)}`
}

async function chatOnce(messages: ChatMessage[], context?: ChatContext): Promise<ChatMessage> {
  const live = await postJson<ChatMessage>('/api/chat', { messages, context })
  if (live?.content) return live
  return localChat(messages, context)
}

function parseSseFrame(frame: string): OrchestratorStreamEvent | undefined {
  const data = frame
    .split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trimStart())
    .join('\n')
  if (!data) return undefined
  return JSON.parse(data) as OrchestratorStreamEvent
}

export const api = {
  async getGraph(): Promise<FundGraph> {
    return { ...store.graph, weights: { ...store.weights } }
  },

  async getCompanies(): Promise<Company[]> {
    return data.companies
  },

  async getCompany(id: string): Promise<Company | undefined> {
    return data.companies.find((c) => c.id === id)
  },

  async getCompanyWorkbookPreview(
    company: Company,
    kind: CompanyWorkbookKind,
    sheet?: string,
  ): Promise<CompanyWorkbookPreview> {
    const live = await postJson<CompanyWorkbookPreview>('/api/models/preview', { company, kind, sheet })
    return live ?? localWorkbookPreview(company, kind, sheet)
  },

  async downloadCompanyWorkbook(company: Company, kind: CompanyWorkbookKind): Promise<boolean> {
    try {
      const res = await fetch('/api/models/workbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, kind }),
      })
      if (!res.ok) return false
      const blob = await res.blob()
      const disposition = res.headers.get('Content-Disposition') ?? ''
      const fileName = disposition.match(/filename="([^"]+)"/)?.[1] ?? `${company.id}-${kind}.xlsx`
      const href = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = href
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(href), 1_000)
      return true
    } catch {
      return false
    }
  },

  async getSourcing(): Promise<Company[]> {
    return data.companies.filter((c) => c.type === 'sourced').sort((a, b) => b.fitScore - a.fitScore)
  },

  subscribeSourcing(listener: (companies: Company[]) => void): () => void {
    sourcingListeners.add(listener)
    return () => sourcingListeners.delete(listener)
  },

  async getFounders(): Promise<Founder[]> {
    return data.founders
  },

  /**
   * Founder scout: LinkedIn URL (identity anchor) or name → Tavily fan-out →
   * fund-calibrated score. Returns null when the brain API is unreachable or
   * has no Tavily key. The sourced founder is merged into the leads list.
   */
  async sourceFounder(input: {
    linkedinUrl?: string
    name?: string
    company?: string
  }): Promise<{ founder: Founder; sources: string[] } | null> {
    const live = await postJson<{ founder: Founder; sources: string[] }>('/api/founders/source', input)
    if (!live?.founder) return null
    mergeSourcedCompanies([], [live.founder])
    return live
  },

  async getFounder(id: string): Promise<Founder | undefined> {
    return data.founders.find((f) => f.id === id)
  },

  /**
   * Load the fund profile. When the brain API is up, overlay its live editable
   * slice (thesis, check size, stages/sectors/geographies, and criteria weights)
   * onto the fixture base so the page edits the real backend criteria. Name and
   * partners are not editable and always come from the fixture. Falls back to the
   * fixture wholesale when the API is unreachable.
   */
  async getFund(): Promise<FundProfile> {
    const live = await getJson<FundProfileView>('/api/fund')
    if (!live) return data.fundProfile
    store.weights = { ...live.weights }
    store.graph = { ...store.graph, weights: { ...store.weights } }
    return {
      ...data.fundProfile,
      thesis: live.thesis,
      checkSize: formatCheckSize(live.checkSizeMin, live.checkSizeMax),
      checkSizeMin: live.checkSizeMin,
      checkSizeMax: live.checkSizeMax,
      stages: live.stages,
      sectors: live.sectors,
      geographies: live.geographies,
    }
  },

  /**
   * Persist an edit to the fund profile on the brain, which reshapes future
   * discovery and ranking. Returns the updated editable slice, or null when the
   * API is unreachable (caller should treat that as "not saved").
   */
  async updateFund(patch: FundProfilePatch): Promise<FundProfileView | null> {
    const live = await postJson<FundProfileView>('/api/fund', patch)
    if (!live) return null
    store.weights = { ...live.weights }
    store.graph = { ...store.graph, weights: { ...store.weights } }
    return live
  },

  async getExecutionQueue(): Promise<ExecutionItem[]> {
    return data.executionQueue
  },

  async getOutreach(companyId: string): Promise<OutreachRecord> {
    return structuredClone(outreachFor(companyId))
  },

  async saveOutreachDraft(companyId: string, draft: Pick<OutreachRecord, 'subject' | 'body'>): Promise<OutreachRecord> {
    const record = outreachFor(companyId)
    record.subject = draft.subject
    record.body = draft.body
    return structuredClone(record)
  },

  async sendOutreach(companyId: string): Promise<OutreachRecord> {
    const record = outreachFor(companyId)
    record.status = 'sent'
    record.thread.push({ id: `message-${record.thread.length + 1}`, direction: 'outbound', sentAt: new Date().toISOString(), body: record.body })
    return structuredClone(record)
  },

  async simulatePositiveReply(companyId: string): Promise<OutreachRecord> {
    const record = outreachFor(companyId)
    record.status = 'replied'
    record.thread.push({ id: `message-${record.thread.length + 1}`, direction: 'inbound', sentAt: new Date().toISOString(), body: 'Thanks Dana — happy to chat. Next week works for me. What times do you have?' })
    return structuredClone(record)
  },

  async proposeOutreachSlots(companyId: string): Promise<OutreachRecord> {
    const record = outreachFor(companyId)
    record.status = 'awaiting_slot'
    record.offeredSlots = [
      { id: 'slot-1', label: 'Tuesday, Jul 21 · 10:00 AM PT', startAt: '2026-07-21T17:00:00.000Z', endAt: '2026-07-21T17:25:00.000Z' },
      { id: 'slot-2', label: 'Tuesday, Jul 21 · 1:30 PM PT', startAt: '2026-07-21T20:30:00.000Z', endAt: '2026-07-21T20:55:00.000Z' },
      { id: 'slot-3', label: 'Wednesday, Jul 22 · 11:00 AM PT', startAt: '2026-07-22T18:00:00.000Z', endAt: '2026-07-22T18:25:00.000Z' },
    ]
    return structuredClone(record)
  },

  async confirmOutreachSlot(companyId: string, slotId: string): Promise<OutreachRecord> {
    const record = outreachFor(companyId)
    const slot = record.offeredSlots.find((item) => item.id === slotId)
    if (!slot) throw new Error('Selected time is no longer available.')
    record.status = 'event_created'
    record.event = { title: `Meridian × ${data.companies.find((item) => item.id === companyId)?.name ?? 'Founder'}`, startAt: slot.startAt, calendar: 'Dana Whitfield · Google Calendar' }
    return structuredClone(record)
  },

  async postFeedback(input: FeedbackInput): Promise<FeedbackResult> {
    // Live: the real learning agent interprets the feedback and re-weights.
    const live = await postJson<FeedbackResult>('/api/feedback', input)
    if (live) {
      store.weights = { ...store.weights, ...live.weights }
      store.graph = { ...store.graph, weights: { ...store.weights } }
      return live
    }
    return localFeedback(input)
  },

  async chat(messages: ChatMessage[], context?: ChatContext): Promise<ChatMessage> {
    return chatOnce(messages, context)
  },

  /** Stream main-orchestrator lifecycle events and answer deltas over POST SSE. */
  async streamChat(
    messages: ChatMessage[],
    context?: ChatContext,
    handlers: StreamChatHandlers = {},
  ): Promise<ChatMessage> {
    try {
      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        body: JSON.stringify({ messages, context }),
      })
      if (!res.ok || !res.body) throw new Error(`chat stream failed (${res.status})`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let content = ''
      let finalMessage: ChatMessage | undefined

      const consume = (frame: string) => {
        const event = parseSseFrame(frame)
        if (!event) return
        handlers.onEvent?.(event)
        if (event.type === 'companies_sourced') {
          mergeSourcedCompanies(event.companies, event.founders)
        } else if (event.type === 'founders_sourced') {
          mergeSourcedCompanies([], event.founders)
        } else if (event.type === 'text_delta') {
          content += event.delta
          handlers.onDelta?.(event.delta)
        } else if (event.type === 'run_completed') {
          finalMessage = event.message
        } else if (event.type === 'error') {
          throw new Error(event.error)
        }
      }

      while (true) {
        const { done, value } = await reader.read()
        buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, '\n')
        let boundary = buffer.indexOf('\n\n')
        while (boundary >= 0) {
          consume(buffer.slice(0, boundary))
          buffer = buffer.slice(boundary + 2)
          boundary = buffer.indexOf('\n\n')
        }
        if (done) break
      }
      if (buffer.trim()) consume(buffer)
      return finalMessage ?? { role: 'assistant', content }
    } catch {
      // Preserve offline/demo behavior when the live API is unavailable.
      return chatOnce(messages, context)
    }
  },

  /**
   * Trigger a live web search (Tavily) for new startups matching the fund.
   * Needs the brain API running; returns [] if it's unreachable (no local
   * fallback — real discovery can't be faked). New companies are merged into the
   * in-memory store so the rest of the app (company pages, graph) can see them.
   */
  async discover(query?: string): Promise<Company[]> {
    const live = await postJson<{ companies: Company[] }>('/api/discover', { query })
    if (!live?.companies?.length) return []
    mergeSourcedCompanies(live.companies)
    return live.companies
  },
}

/* ---------------- local fallbacks (used when the API is down) ------------- */

/**
 * Offline mirror of the brain's workbook preview (brain/src/models/
 * companyWorkbooks.ts): same sheets, rows, and source-label policy, built from
 * the company record already in the client. Downloads still need the live API —
 * this keeps the Files tab readable when it's off.
 */
function localWorkbookPreview(
  company: Company,
  kind: CompanyWorkbookKind,
  requestedSheet?: string,
): CompanyWorkbookPreview {
  const m = company.model
  const estimated = new Set(m?.estimatedFields ?? [])
  const val = (v: number | undefined): number | null =>
    v !== undefined && Number.isFinite(v) && v > 0 ? v : null
  const src = (field: string, v: number | null): string =>
    v === null ? 'Input required' : estimated.has(field) ? 'HCP assumption' : 'Company record'
  const status = (field: string, v: number | null): string =>
    v === null ? 'Input required' : estimated.has(field) ? 'HCP assumption' : 'Known'
  const fileBase = company.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'company'
  const offlineNote = 'Preview generated locally — start the brain API to download the editable workbook.'

  const readme = {
    columns: ['Value'],
    rows: [
      { label: 'Purpose', values: ['A deterministic first-pass model populated from the company record.'] },
      { label: 'Yellow cells', values: ['Required or optional investor inputs; blank when no source-backed value exists.'] },
      { label: 'Blue cells', values: ['Formula outputs; review assumptions before using the model in an investment decision.'] },
      { label: 'Source policy', values: ['Known fields are labelled Company record; backfilled ones HCP assumption. No market-size or competitor facts are fabricated.'] },
      { label: 'Generated for', values: [company.name] },
      { label: 'Sector', values: [company.sector || null] },
      { label: 'Stage', values: [company.stage || null] },
    ] as CompanyWorkbookPreview['rows'],
  }

  if (kind === 'landscape') {
    const competitors = company.competitors.slice(0, 15)
    const sheets = ['README', 'Final Competitive Landscape']
    const previewSheet = sheets.includes(requestedSheet ?? '') ? requestedSheet! : 'Final Competitive Landscape'
    const content =
      previewSheet === 'README'
        ? readme
        : {
            columns: [company.name, ...competitors.map((c) => c.name)],
            rows: [
              { label: 'Relationship', values: ['Main company', ...competitors.map((c) => c.kind)], source: 'Company record' },
              { label: 'Primary use case', values: [company.oneLiner || null, ...competitors.map((c) => c.note || null)], source: 'Company and sourcing records' },
              { label: 'Key moat / differentiator', values: [company.reasonsToInvest[0] ?? null, ...competitors.map((c) => c.note || null)], source: 'Company and sourcing records' },
              { label: 'Latest funding', values: [company.raising ?? company.stage ?? null, ...competitors.map(() => null)], source: 'Company record' },
              { label: 'Valuation', values: [val(m?.valuation), ...competitors.map(() => null)], source: src('valuation', val(m?.valuation)) },
            ] as CompanyWorkbookPreview['rows'],
          }
    return {
      kind,
      title: `${company.name} — Competitive Landscape`,
      fileName: `${fileBase}-competitive-landscape.xlsx`,
      previewSheet,
      sheets,
      status: 'company-specific',
      notes: [
        `${competitors.length} named competitor${competitors.length === 1 ? '' : 's'} loaded from the company record.`,
        offlineNote,
      ],
      ...content,
    }
  }

  const sheets = ['README', 'TAM', '2 year rev build', 'Exit Scenario', 'TAM Penetration Required']
  const previewSheet = sheets.includes(requestedSheet ?? '') ? requestedSheet! : 'TAM'
  const arr = val(m?.arr)
  const growth = val(m?.growthPct)
  const valuation = val(m?.valuation)
  const check = val(m?.checkSize)
  const exitMultiple = val(m?.exitMultiple)
  const years = val(m?.yearsToExit)
  const exitArr = arr && growth && years ? arr * (1 + growth / 100) ** years : null
  const exitValuation = exitArr && exitMultiple ? exitArr * exitMultiple : null
  const ownership = valuation && check ? check / valuation : null
  const proceeds = exitValuation && ownership ? exitValuation * ownership : null
  const moic = proceeds && check ? proceeds / check : null

  let content: Pick<CompanyWorkbookPreview, 'columns' | 'rows'>
  if (previewSheet === 'README') {
    content = readme
  } else if (previewSheet === '2 year rev build') {
    const quarters = ['Current', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8']
    const projected = quarters.map((_, i) => (arr && growth ? arr * (1 + growth / 100) ** (i / 4) : i === 0 ? arr : null))
    content = {
      columns: quarters,
      rows: [
        { label: 'ARR', values: projected, source: 'Current ARR + annual growth formula' },
        { label: 'Quarterly revenue run-rate', values: projected.map((v) => (v ? v / 4 : null)), source: 'ARR ÷ 4' },
      ],
    }
  } else if (previewSheet === 'Exit Scenario') {
    content = {
      columns: ['Value', 'Source / method'],
      rows: [
        { label: 'Entry valuation', values: [valuation, src('valuation', valuation)] },
        { label: 'Investment amount', values: [check, src('checkSize', check)] },
        { label: 'Current ARR', values: [arr, src('arr', arr)] },
        { label: 'Annual ARR growth', values: [growth, src('growthPct', growth)] },
        { label: 'Exit revenue multiple', values: [exitMultiple, src('exitMultiple', exitMultiple)] },
        { label: 'Years to exit', values: [years, src('yearsToExit', years)] },
        { label: 'Exit ARR', values: [exitArr, 'Current ARR × growth over years'] },
        { label: 'Implied exit valuation', values: [exitValuation, 'Exit ARR × revenue multiple'] },
        { label: 'Entry ownership', values: [ownership, 'Investment ÷ entry valuation'] },
        { label: 'Gross proceeds', values: [proceeds, 'Exit valuation × ownership; dilution not modelled'] },
        { label: 'Gross MOIC', values: [moic, 'Gross proceeds ÷ investment'] },
      ],
    }
  } else if (previewSheet === 'TAM Penetration Required') {
    content = {
      columns: ['Value', 'Source / interpretation'],
      rows: [
        { label: 'Total addressable market', values: [null, 'Requires source-backed TAM inputs'] },
        { label: 'Exit ARR', values: [exitArr, 'Exit Scenario formula'] },
        { label: 'Required TAM penetration', values: [null, 'Calculated after TAM inputs are supplied'] },
      ],
    }
  } else {
    content = {
      columns: ['Company-specific value', 'Status'],
      rows: [
        { label: 'Company', values: [company.name, 'Known'], source: 'Company record' },
        { label: 'Target market', values: [company.sector || null, company.sector ? 'Known' : 'Input required'], source: 'Company record' },
        { label: 'Current ARR', values: [arr, status('arr', arr)], source: src('arr', arr) },
        { label: 'Annual growth', values: [growth, status('growthPct', growth)], source: src('growthPct', growth) },
        { label: 'Entry valuation', values: [valuation, status('valuation', valuation)], source: src('valuation', valuation) },
        { label: 'Investment amount', values: [check, status('checkSize', check)], source: src('checkSize', check) },
        { label: 'Exit multiple', values: [exitMultiple, status('exitMultiple', exitMultiple)], source: src('exitMultiple', exitMultiple) },
        { label: 'Years to exit', values: [years, status('yearsToExit', years)], source: src('yearsToExit', years) },
        { label: 'TAM segment counts + ACV', values: [null, 'Input required'], source: 'Not available in company record' },
      ],
    }
  }

  return {
    kind,
    title: `${company.name} — TAM + Revenue + Exit Model`,
    fileName: `${fileBase}-tam-revenue-exit-model.xlsx`,
    previewSheet,
    sheets,
    status: 'company-specific',
    notes: ['Yellow cells are missing or investor-controlled assumptions; blue cells are formulas.', offlineNote],
    ...content,
  }
}

function localFeedback(input: FeedbackInput): FeedbackResult {
  const founder = data.founders.find((f) => f.id === input.entityId)
  const company = data.companies.find((c) => c.id === input.entityId)
  const changedNodeIds = [input.entityId]
  let note = 'Feedback recorded.'

  if (founder) {
    const delta = input.action === 'agree' ? 0.05 : -0.05
    const key = criterionKey('founder')
    if (key) store.weights[key] = clamp(store.weights[key] + delta)
    const c = data.companies.find((x) => x.id === founder.companyId)
    if (c) changedNodeIds.push(c.id)
    note =
      input.action === 'agree'
        ? `The fund now places greater weight on founder credibility in ${c?.sector ?? 'this sector'} investments.`
        : `The fund now discounts founder-signal scoring in ${c?.sector ?? 'this sector'} until re-validated.`
  } else if (company) {
    const pass = input.action === 'pass'
    const delta = pass ? -0.04 : 0.04
    const key = criterionKey(pass ? 'distribution' : 'market')
    if (key) store.weights[key] = clamp(store.weights[key] + delta)
    for (const a of company.analogues) changedNodeIds.push(a.companyId)
    note = pass
      ? `Pass recorded. ${company.name}'s pattern now argues against similar ${company.sector} deals.`
      : `Signal strengthened. Deals resembling ${company.name} (${company.sector}) will rank higher.`
  }

  store.feedbackLog.push({ input, note })
  store.graph = { ...store.graph, weights: { ...store.weights } }
  return { weights: { ...store.weights }, changedNodeIds, note }
}

async function localChat(messages: ChatMessage[], context?: ChatContext): Promise<ChatMessage> {
  await delay(400)
  const last = messages[messages.length - 1]?.content.toLowerCase() ?? ''
  const company = context?.companyId ? data.companies.find((c) => c.id === context.companyId) : undefined
  const fund = data.fundProfile

  let content: string
  if (company) {
    if (last.includes('risk')) {
      content = `Top risks for ${company.name}: ${company.risks.slice(0, 2).join(' ')} The unresolved diligence question I'd raise first: ${company.diligenceQuestions[0] ?? 'none logged.'}`
    } else if (last.includes('compare') || last.includes('similar')) {
      content = `${company.name} maps to ${company.analogues.map((a) => a.note).join(' ') || 'no logged analogues.'}`
    } else {
      content = `${company.name}: ${company.summary} Fund-fit score ${company.fitScore}. Ask me about risks, analogues, or the model.`
    }
  } else if (last.includes('check size') || last.includes('criteria')) {
    content = `${fund.name} writes ${fund.checkSize} at ${fund.stages.join('/')} in ${fund.sectors.slice(0, 3).join(', ')}. Current top criteria: ${topCriteria(3)}.`
  } else {
    content = `I'm the fund brain for ${fund.name}. I can explain why a company surfaced, compare it to past decisions, or update the sourcing criteria. What are you evaluating?`
  }
  return { role: 'assistant', content }
}

/** Find a live weight key whose name mentions `hint` (e.g. "founder"). */
function criterionKey(hint: string): string | undefined {
  const keys = Object.keys(store.weights)
  return keys.find((k) => k.toLowerCase().includes(hint)) ?? keys[0]
}

function clamp(v: number) {
  return Math.min(1, Math.max(0, Number(v.toFixed(2))))
}

function topCriteria(n: number) {
  return Object.entries(store.weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k, v]) => `${k} (${v.toFixed(2)})`)
    .join(', ')
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
