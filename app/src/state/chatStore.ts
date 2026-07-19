import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '../lib/types'
import type { TraceRun, TraceStage } from '@/components/analyst/OrchestrationTrace'

/*
 * Analyst conversation, kept outside the page component and persisted to
 * localStorage so the thread (and each run's orchestration trace) survives
 * navigation and reloads. The full message list is replayed to the brain on
 * every turn, so restoring the thread also restores the model's context.
 */

type Updater<T> = T | ((current: T) => T)
const resolve = <T,>(updater: Updater<T>, current: T): T =>
  typeof updater === 'function' ? (updater as (c: T) => T)(current) : updater

export type SourcedCompanyLink = { id: string; name: string }

/** Close out a trace whose stream ended (or was interrupted mid-run). */
export function closeTrace(run: TraceRun | undefined): TraceRun | undefined {
  if (!run || run.endedAt) return run
  const now = Date.now()
  const stages: TraceStage[] = run.stages.map((s) =>
    s.status === 'running' || s.status === 'queued'
      ? { ...s, status: 'done', endedAt: s.endedAt ?? now }
      : s,
  )
  return { ...run, endedAt: now, stages }
}

interface AnalystChatState {
  messages: ChatMessage[]
  /** Assistant message index -> orchestration trace for that run. */
  traces: Record<number, TraceRun>
  /** Assistant message index -> ids of founders sourced in that run. */
  sourcedFounders: Record<number, string[]>
  /** Assistant message index -> companies sourced in that run (for deep-links). */
  sourcedCompanies: Record<number, SourcedCompanyLink[]>
  setMessages: (updater: Updater<ChatMessage[]>) => void
  setTraces: (updater: Updater<Record<number, TraceRun>>) => void
  setSourcedFounders: (updater: Updater<Record<number, string[]>>) => void
  setSourcedCompanies: (updater: Updater<Record<number, SourcedCompanyLink[]>>) => void
  clear: () => void
}

export const useAnalystChat = create<AnalystChatState>()(
  persist(
    (set) => ({
      messages: [],
      traces: {},
      sourcedFounders: {},
      sourcedCompanies: {},
      setMessages: (updater) => set((s) => ({ messages: resolve(updater, s.messages) })),
      setTraces: (updater) => set((s) => ({ traces: resolve(updater, s.traces) })),
      setSourcedFounders: (updater) => set((s) => ({ sourcedFounders: resolve(updater, s.sourcedFounders) })),
      setSourcedCompanies: (updater) => set((s) => ({ sourcedCompanies: resolve(updater, s.sourcedCompanies) })),
      clear: () => set({ messages: [], traces: {}, sourcedFounders: {}, sourcedCompanies: {} }),
    }),
    {
      name: 'vcbrain-analyst-chat',
      version: 3,
      migrate: (persisted, version) => {
        const p = (persisted ?? {}) as Partial<AnalystChatState>
        if (version < 2) p.sourcedFounders = {}
        if (version < 3) p.sourcedCompanies = {}
        return {
          messages: p.messages ?? [],
          traces: p.traces ?? {},
          sourcedFounders: p.sourcedFounders ?? {},
          sourcedCompanies: p.sourcedCompanies ?? {},
        }
      },
      partialize: (s) => ({
        messages: s.messages,
        traces: s.traces,
        sourcedFounders: s.sourcedFounders,
        sourcedCompanies: s.sourcedCompanies,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AnalystChatState>
        let messages = p.messages ?? []
        const last = messages.at(-1)
        if (last?.role === 'assistant' && !last.content) messages = messages.slice(0, -1)
        const traces = Object.fromEntries(
          Object.entries(p.traces ?? {}).map(([k, run]) => [k, closeTrace(run)!]),
        )
        return {
          ...current,
          messages,
          traces,
          sourcedFounders: p.sourcedFounders ?? {},
          sourcedCompanies: p.sourcedCompanies ?? {},
        }
      },
    },
  ),
)
