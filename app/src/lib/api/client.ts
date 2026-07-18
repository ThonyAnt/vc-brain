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

/*
 * Stub API — now backed by a deterministic brain snapshot (VCBrainState),
 * adapted into the app's view types. Same interface the UI already consumes;
 * swap the snapshot import for a live `runPipeline` call to go online.
 */

const data = adaptSnapshot(snapshotJson as unknown as BrainSnapshot)

const store = {
  graph: data.graph,
  weights: { ...data.weights },
  feedbackLog: [] as { input: FeedbackInput; note: string }[],
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
  },

  async chat(messages: ChatMessage[], context?: { route?: string; companyId?: string }): Promise<ChatMessage> {
    await delay(600)
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
  },
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
