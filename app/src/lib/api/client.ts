import {
  buildGraph,
  companies,
  criteriaWeights,
  executionQueue,
  founders,
  fundProfile,
} from '../mock/fixtures'
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
 * Stub API. The teammate's backend replaces this module behind the same
 * interface — nothing outside lib/api should know the data is local.
 */

const store = {
  graph: buildGraph(),
  weights: { ...criteriaWeights },
  feedbackLog: [] as { input: FeedbackInput; note: string }[],
}

export const api = {
  async getGraph(): Promise<FundGraph> {
    return { ...store.graph, weights: { ...store.weights } }
  },

  async getCompanies(): Promise<Company[]> {
    return companies
  },

  async getCompany(id: string): Promise<Company | undefined> {
    return companies.find((c) => c.id === id)
  },

  async getSourcing(): Promise<Company[]> {
    return companies.filter((c) => c.type === 'sourced').sort((a, b) => b.fitScore - a.fitScore)
  },

  async getFounders(): Promise<Founder[]> {
    return founders
  },

  async getFounder(id: string): Promise<Founder | undefined> {
    return founders.find((f) => f.id === id)
  },

  async getFund(): Promise<FundProfile> {
    return fundProfile
  },

  async getExecutionQueue(): Promise<ExecutionItem[]> {
    return executionQueue
  },

  async postFeedback(input: FeedbackInput): Promise<FeedbackResult> {
    const entityFounder = founders.find((f) => f.id === input.entityId)
    const entityCompany = companies.find((c) => c.id === input.entityId)
    const changedNodeIds = [input.entityId]

    let note = 'Feedback recorded.'
    if (entityFounder) {
      const delta = input.action === 'agree' ? 0.05 : -0.05
      store.weights['Technical founder credibility'] = clamp(store.weights['Technical founder credibility'] + delta)
      store.weights['Founder-market fit'] = clamp(store.weights['Founder-market fit'] + delta)
      const company = companies.find((c) => c.id === entityFounder.companyId)
      if (company) changedNodeIds.push(company.id)
      note =
        input.action === 'agree'
          ? `The fund now places greater weight on founder credibility in ${company?.sector ?? 'this sector'} investments.`
          : `The fund now discounts founder-signal scoring in ${company?.sector ?? 'this sector'} until re-validated.`
    } else if (entityCompany) {
      const delta = input.action === 'pass' ? -0.04 : 0.04
      store.weights['Market timing'] = clamp(store.weights['Market timing'] + delta)
      for (const a of entityCompany.analogues) changedNodeIds.push(a.companyId)
      note =
        input.action === 'pass'
          ? `Pass recorded. ${entityCompany.name}'s pattern now argues against similar ${entityCompany.sector} deals.`
          : `Signal strengthened. Deals resembling ${entityCompany.name} (${entityCompany.sector}) will rank higher.`
    }

    store.feedbackLog.push({ input, note })
    store.graph = { ...store.graph, weights: { ...store.weights } }
    return { weights: { ...store.weights }, changedNodeIds, note }
  },

  async chat(messages: ChatMessage[], context?: { route?: string; companyId?: string }): Promise<ChatMessage> {
    await delay(600)
    const last = messages[messages.length - 1]?.content.toLowerCase() ?? ''
    const company = context?.companyId ? companies.find((c) => c.id === context.companyId) : undefined

    let content: string
    if (company) {
      if (last.includes('risk')) {
        content = `Top risks for ${company.name}: ${company.risks.slice(0, 2).join(' ')} The unresolved diligence question I'd raise first: ${company.diligenceQuestions[0] ?? 'none logged.'}`
      } else if (last.includes('compare') || last.includes('similar')) {
        content = `${company.name} maps to ${company.analogues.map((a) => a.note).join(' ')}`
      } else {
        content = `${company.name}: ${company.summary} Fund-fit score ${company.fitScore}. Ask me about risks, analogues, or the model.`
      }
    } else if (last.includes('check size') || last.includes('criteria')) {
      content = `${fundProfile.name} writes ${fundProfile.checkSize} at ${fundProfile.stages.join('/')} in ${fundProfile.sectors.slice(0, 3).join(', ')}. Current top criteria: ${topCriteria(3)}.`
    } else {
      content = `I'm the fund brain for ${fundProfile.name}. I can explain why a company surfaced, compare it to past decisions, or update the sourcing criteria. What are you evaluating?`
    }
    return { role: 'assistant', content }
  },
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
