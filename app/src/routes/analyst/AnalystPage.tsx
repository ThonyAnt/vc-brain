import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AskInput } from '@/components/ui/ask-input'
import { OrchestrationTrace, type TraceRun, type TraceStage } from '@/components/analyst/OrchestrationTrace'
import { api } from '../../lib/api/client'
import type { OrchestratorStreamEvent } from '../../lib/api/client'
import type { ChatMessage } from '../../lib/types'

/* Mirrors the server's agentLabel map so queued stages (ids only) read well. */
const AGENT_LABELS: Record<string, string> = {
  founderScout: 'Founder scout',
  discovery: 'Tavily discovery',
  fundProfiler: 'Fund profiler',
  marketScout: 'Market scout',
  technicalDiligence: 'Technical diligence',
  commercialDiligence: 'Commercial diligence',
  financialDiligence: 'Financial diligence',
  risk: 'Risk review',
  partnerReview: 'Partner review',
  committee: 'Investment committee',
  memo: 'Memo writer',
}

const labelFor = (id: string, label?: string) =>
  AGENT_LABELS[id] ?? label ?? id.replace(/([a-z])([A-Z])/g, '$1 $2')

const partnerId = (agent: string) => agent.slice('partner:'.length)

/*
 * Fold one SSE lifecycle event into the run trace. Stages are seeded from the
 * run_started plan; agents the plan didn't declare append as they start.
 * Individual partner:* agents fan into the partnerReview stage as stamps.
 * The pipeline is sequential, so a stage starting also completes everything
 * planned before it (heals any missed completion events).
 */
function applyTraceEvent(run: TraceRun | undefined, event: OrchestratorStreamEvent): TraceRun | undefined {
  const now = Date.now()
  if (event.type === 'run_started') {
    return {
      startedAt: now,
      stages: event.agents.map((id) => ({ id, label: labelFor(id), status: 'queued' as const })),
    }
  }
  if (!run || run.endedAt) return run
  const stages = run.stages.map((s) => ({ ...s, partners: s.partners?.map((p) => ({ ...p })) }))
  const next: TraceRun = { ...run, stages }
  const find = (id: string) => stages.find((s) => s.id === id)
  const partnerHost = () => {
    let stage = find('partnerReview')
    if (!stage) {
      stage = { id: 'partnerReview', label: AGENT_LABELS.partnerReview, status: 'queued' }
      stages.push(stage)
    }
    return stage
  }

  if (event.type === 'agent_started') {
    if (event.agent.startsWith('partner:')) {
      const stage = partnerHost()
      stage.status = 'running'
      stage.startedAt = stage.startedAt ?? now
      stage.partners = stage.partners ?? []
      if (!stage.partners.some((p) => p.id === partnerId(event.agent)))
        stage.partners.push({ id: partnerId(event.agent), status: 'running' })
    } else {
      let stage = find(event.agent)
      if (!stage) {
        stage = { id: event.agent, label: labelFor(event.agent, event.label), status: 'queued' }
        stages.push(stage)
      }
      for (const s of stages) {
        if (s === stage) break
        if (s.status === 'running' || s.status === 'queued') {
          if (s.status === 'running') s.endedAt = s.endedAt ?? now
          s.status = 'done'
          s.partners?.forEach((p) => { if (p.status === 'running') p.status = 'done' })
        }
      }
      stage.status = 'running'
      stage.startedAt = stage.startedAt ?? now
    }
  }

  if (event.type === 'agent_completed') {
    if (event.agent.startsWith('partner:')) {
      const stage = partnerHost()
      const partner = stage.partners?.find((p) => p.id === partnerId(event.agent))
      if (partner) partner.status = 'done'
      if (stage.partners?.length && stage.partners.every((p) => p.status === 'done')) {
        stage.status = 'done'
        stage.endedAt = now
      }
    } else {
      const stage = find(event.agent)
      if (stage) {
        stage.status = 'done'
        stage.endedAt = now
        stage.startedAt = stage.startedAt ?? run.startedAt
        stage.summary = event.summary
      }
    }
  }

  if (event.type === 'agent_failed') {
    const stage = find(event.agent.startsWith('partner:') ? 'partnerReview' : event.agent)
    if (stage) {
      stage.status = 'failed'
      stage.error = event.error
      stage.endedAt = now
    }
  }

  if (event.type === 'run_completed') {
    next.endedAt = now
    for (const s of stages) {
      if (s.status === 'running') {
        s.status = 'done'
        s.endedAt = s.endedAt ?? now
      }
      s.partners?.forEach((p) => { if (p.status === 'running') p.status = 'done' })
    }
  }

  return next
}

/** Close out a trace whose stream ended without a run_completed event. */
function closeTrace(run: TraceRun | undefined): TraceRun | undefined {
  if (!run || run.endedAt) return run
  const stages: TraceStage[] = run.stages.map((s) =>
    s.status === 'running' ? { ...s, status: 'done', endedAt: s.endedAt ?? Date.now() } : s,
  )
  return { ...run, endedAt: Date.now(), stages }
}

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, href }) => <a className="font-medium text-primary underline underline-offset-2" href={href} target="_blank" rel="noreferrer">{children}</a>,
        blockquote: ({ children }) => <blockquote className="my-3 border-l-4 border-primary pl-4 text-charcoal">{children}</blockquote>,
        code: ({ children, className }) => <code className={`${className ?? ''} bg-bone px-1 py-0.5 font-mono text-[0.9em]`}>{children}</code>,
        h1: ({ children }) => <h1 className="mb-3 mt-4 text-xl font-semibold first:mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-2 mt-4 text-lg font-semibold first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-2 mt-3 font-semibold first:mt-0">{children}</h3>,
        li: ({ children }) => <li className="pl-0.5">{children}</li>,
        ol: ({ children }) => <ol className="my-3 list-decimal space-y-1.5 pl-5">{children}</ol>,
        p: ({ children }) => <p className="mb-3 leading-relaxed last:mb-0">{children}</p>,
        pre: ({ children }) => <pre className="my-3 overflow-x-auto border-2 border-hairline-strong bg-bone p-3 text-xs [&_code]:bg-transparent [&_code]:p-0">{children}</pre>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        table: ({ children }) => <table className="my-3 w-full border-collapse text-left text-xs">{children}</table>,
        td: ({ children }) => <td className="border-2 border-hairline-strong p-2 align-top">{children}</td>,
        th: ({ children }) => <th className="border-2 border-hairline-strong bg-bone p-2 font-semibold">{children}</th>,
        ul: ({ children }) => <ul className="my-3 list-disc space-y-1.5 pl-5">{children}</ul>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

/* Full-screen fund-brain chat. Empty state is the big ask prompt; once a
   question lands the page becomes a message thread with the input pinned.
   Each orchestrated turn shows a live stage trace that stays in the thread. */
export function AnalystPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  /* Assistant message index -> orchestration trace for that run. */
  const [traces, setTraces] = useState<Record<number, TraceRun>>({})
  /* Assistant message index -> founders sourced in that run, so a completed
     founder-sourcing turn shows a link through to the Founder Leads page. */
  const [sourcedFounders, setSourcedFounders] = useState<Record<number, number>>({})
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy, traces])

  async function ask(question: string) {
    if (!question.trim() || busy) return
    const next: ChatMessage[] = [...messages, { role: 'user', content: question }]
    const assistantIndex = next.length
    setMessages([...next, { role: 'assistant', content: '' }])
    setBusy(true)
    const onEvent = (event: OrchestratorStreamEvent) => {
      if (event.type === 'founders_sourced' && event.founders.length) {
        setSourcedFounders((current) => ({
          ...current,
          [assistantIndex]: (current[assistantIndex] ?? 0) + event.founders.length,
        }))
      }
      setTraces((current) => {
        const run = applyTraceEvent(current[assistantIndex], event)
        return run && run !== current[assistantIndex] ? { ...current, [assistantIndex]: run } : current
      })
    }
    const reply = await api.streamChat(next, { route: '/analyst' }, {
      onEvent,
      onDelta: (delta) => {
        setMessages((current) => {
          const updated = [...current]
          const last = updated.at(-1)
          if (last?.role === 'assistant') updated[updated.length - 1] = { ...last, content: last.content + delta }
          return updated
        })
      },
    })
    setMessages((current) => {
      const updated = [...current]
      if (updated.at(-1)?.role === 'assistant') updated[updated.length - 1] = reply
      else updated.push(reply)
      return updated
    })
    setTraces((current) => {
      const run = closeTrace(current[assistantIndex])
      return run && run !== current[assistantIndex] ? { ...current, [assistantIndex]: run } : current
    })
    setBusy(false)
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <AskInput title="Ask the fund brain" onSubmit={ask} className="max-w-2xl" />
        <p className="code-sm -mt-4 text-charcoal">
          institutional memory · 34 memos · 47 passes · 8 outcomes
        </p>
      </div>
    )
  }

  const liveTrace = traces[messages.length - 1]

  return (
    <div className="mx-auto flex h-full w-full max-w-[820px] flex-col px-8 pt-6 pb-8">
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 pb-6">
        {messages.map((m, i) => (
          <Fragment key={i}>
            {m.role === 'assistant' && traces[i] && traces[i].stages.length > 0 && (
              <OrchestrationTrace run={traces[i]} />
            )}
            {!m.content && m.role === 'assistant' ? null : (
              <div
                className={`max-w-[85%] rounded-none border-2 border-hairline-strong p-4 text-sm ${
                  m.role === 'user'
                    ? 'ml-auto bg-dark text-on-dark shadow-brutal-sm'
                    : 'bg-card text-ink shadow-brutal'
                }`}
              >
                {m.role === 'assistant' ? <AssistantMarkdown content={m.content} /> : m.content}
                {m.role === 'assistant' && sourcedFounders[i] ? (
                  <Link
                    to="/founders"
                    className="mt-3 inline-flex items-center gap-1.5 font-medium text-primary underline underline-offset-2"
                  >
                    View {sourcedFounders[i]} new {sourcedFounders[i] === 1 ? 'lead' : 'leads'} in Founder Leads
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            )}
          </Fragment>
        ))}
        {busy && !liveTrace?.stages.length && (
          <div className="max-w-[85%] border-2 border-hairline-strong bg-card p-4 shadow-brutal" aria-live="polite">
            <span className="code-sm text-charcoal">Thinking…</span>
            <div className="mt-3 h-3 overflow-hidden border-2 border-hairline-strong bg-bone">
              <div className="h-full w-1/5 animate-pulse bg-primary" />
            </div>
          </div>
        )}
      </div>
      <AskInput onSubmit={ask} className="shrink-0" />
    </div>
  )
}
