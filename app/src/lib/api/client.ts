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
} from '../types'

export type OrchestratorStreamEvent =
  | { type: 'run_started'; runId: string; orchestrator: string; agents: string[] }
  | { type: 'agent_started'; runId: string; agent: string; label: string }
  | { type: 'agent_completed'; runId: string; agent: string; summary: string }
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

/*
 * Data comes from a deterministic brain snapshot (VCBrainState), adapted into
 * the app's view types. The interactive endpoints (chat, feedback) hit the live
 * brain API (real OpenAI + learning loop) when it's running, and fall back to
 * local stubs when it isn't — so the app works with or without the API server.
 */

const data = adaptSnapshot(snapshotJson as unknown as BrainSnapshot)

const store = {
  graph: data.graph,
  weights: { ...data.weights },
  feedbackLog: [] as { input: FeedbackInput; note: string }[],
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

  async getSourcing(): Promise<Company[]> {
    return data.companies.filter((c) => c.type === 'sourced').sort((a, b) => b.fitScore - a.fitScore)
  },

  async getFounders(): Promise<Founder[]> {
    return data.founders
  },

  async getFounder(id: string): Promise<Founder | undefined> {
    return data.founders.find((f) => f.id === id)
  },

  async getFund(): Promise<FundProfile> {
    return data.fundProfile
  },

  async getExecutionQueue(): Promise<ExecutionItem[]> {
    return data.executionQueue
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
        if (event.type === 'text_delta') {
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
    for (const c of live.companies) {
      if (!data.companies.some((x) => x.id === c.id)) data.companies.push(c)
    }
    return live.companies
  },
}

/* ---------------- local fallbacks (used when the API is down) ------------- */

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
