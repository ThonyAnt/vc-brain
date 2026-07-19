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

/** Close out a trace whose stream ended (or was interrupted mid-run). */
export function closeTrace(run: TraceRun | undefined): TraceRun | undefined {
  if (!run || run.endedAt) return run
  const stages: TraceStage[] = run.stages.map((s) =>
    s.status === 'running' ? { ...s, status: 'done', endedAt: s.endedAt ?? Date.now() } : s,
  )
  return { ...run, endedAt: Date.now(), stages }
}

interface AnalystChatState {
  messages: ChatMessage[]
  /** Assistant message index -> orchestration trace for that run. */
  traces: Record<number, TraceRun>
  /** Assistant message index -> founders sourced in that run. */
  sourcedFounders: Record<number, number>
  setMessages: (updater: Updater<ChatMessage[]>) => void
  setTraces: (updater: Updater<Record<number, TraceRun>>) => void
  setSourcedFounders: (updater: Updater<Record<number, number>>) => void
  clear: () => void
}

export const useAnalystChat = create<AnalystChatState>()(
  persist(
    (set) => ({
      messages: [],
      traces: {},
      sourcedFounders: {},
      setMessages: (updater) => set((s) => ({ messages: resolve(updater, s.messages) })),
      setTraces: (updater) => set((s) => ({ traces: resolve(updater, s.traces) })),
      setSourcedFounders: (updater) => set((s) => ({ sourcedFounders: resolve(updater, s.sourcedFounders) })),
      clear: () => set({ messages: [], traces: {}, sourcedFounders: {} }),
    }),
    {
      name: 'vcbrain-analyst-chat',
      version: 1,
      partialize: (s) => ({ messages: s.messages, traces: s.traces, sourcedFounders: s.sourcedFounders }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AnalystChatState>
        /* a reload mid-run leaves an empty assistant bubble and an open trace;
         * drop the one and close the other so the restored thread is settled */
        let messages = p.messages ?? []
        const last = messages.at(-1)
        if (last?.role === 'assistant' && !last.content) messages = messages.slice(0, -1)
        const traces = Object.fromEntries(
          Object.entries(p.traces ?? {}).map(([k, run]) => [k, closeTrace(run)!]),
        )
        return { ...current, messages, traces, sourcedFounders: p.sourcedFounders ?? {} }
      },
    },
  ),
)
