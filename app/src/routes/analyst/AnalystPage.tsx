import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AskInput } from '@/components/ui/ask-input'
import { OrchestrationTrace, type TraceRun } from '@/components/analyst/OrchestrationTrace'
import { closeTrace, useAnalystChat } from '../../state/chatStore'
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
   Each orchestrated turn shows a live stage trace that stays in the thread.
   The conversation lives in a persisted store, so it survives navigation
   and reloads until the user starts a new chat. */
interface Flight {
  key: number
  label: string
  from: { x: number; y: number }
  to: { x: number; y: number }
}

export function AnalystPage() {
  const { messages, traces, sourcedFounders, setMessages, setTraces, setSourcedFounders, clear } = useAnalystChat()
  const [busy, setBusy] = useState(false)
  /* sourced-item chips mid-flight from the trace card to their dock icon */
  const [flights, setFlights] = useState<Flight[]>([])
  const flightSeq = useRef(0)
  const liveTraceRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy, traces])

  /* Fly a chip per sourced item into its dock icon, so "it went somewhere"
     is visible. Capped at 3 chips plus a +N overflow chip. */
  function spawnFlights(labels: string[], dockLabel: 'Founders' | 'Pipeline') {
    const target = document.querySelector(`[data-dock-label="${dockLabel}"]`)?.getBoundingClientRect()
    if (!target) return
    const source = liveTraceRef.current?.getBoundingClientRect()
    const from = source
      ? { x: source.left + 24, y: Math.min(source.bottom, window.innerHeight - 120) }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const to = { x: target.left + target.width / 2 - 30, y: target.top + target.height / 2 - 12 }
    const shown = labels.slice(0, 3)
    if (labels.length > 3) shown.push(`+${labels.length - 3}`)
    setFlights((current) => [
      ...current,
      ...shown.map((label) => ({ key: flightSeq.current++, label, from, to })),
    ])
  }

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
          [assistantIndex]: [...(current[assistantIndex] ?? []), ...event.founders.map((f) => f.id)],
        }))
        spawnFlights(event.founders.map((f) => f.name), 'Founders')
      }
      if (event.type === 'companies_sourced' && event.companies.length) {
        spawnFlights(event.companies.map((c) => c.name), 'Pipeline')
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
      </div>
    )
  }

  const liveTrace = traces[messages.length - 1]

  return (
    <div className="mx-auto flex h-full w-full max-w-[820px] flex-col px-8 pt-4 pb-8">
      <div className="flex shrink-0 justify-end pb-2">
        <button
          type="button"
          onClick={clear}
          disabled={busy}
          className="code-sm cursor-pointer border-2 border-hairline-strong bg-card px-2.5 py-1 uppercase tracking-[0.08em] text-charcoal shadow-brutal-sm transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-50"
        >
          New chat
        </button>
      </div>
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 pb-6">
        {messages.map((m, i) => (
          <Fragment key={i}>
            {m.role === 'assistant' && traces[i] && traces[i].stages.length > 0 && (
              <div ref={i === messages.length - 1 ? liveTraceRef : undefined}>
                <OrchestrationTrace run={traces[i]} />
              </div>
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
                {m.role === 'assistant' && sourcedFounders[i]?.length ? (
                  <Link
                    to={`/founders?new=${sourcedFounders[i].join(',')}`}
                    className="mt-3 inline-flex items-center gap-1.5 font-medium text-primary underline underline-offset-2"
                  >
                    View {sourcedFounders[i].length} new{' '}
                    {sourcedFounders[i].length === 1 ? 'lead' : 'leads'} in Founder Leads
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            )}
          </Fragment>
        ))}
        {busy && !liveTrace?.stages.length && !messages.at(-1)?.content && (
          <div className="flex items-center gap-2 pl-1" aria-live="polite">
            <motion.i
              className="h-2 w-2 shrink-0 bg-primary not-italic"
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="code-sm text-charcoal">Thinking…</span>
          </div>
        )}
      </div>
      <AskInput onSubmit={ask} className="shrink-0" />

      {/* sourced-item chips flying into the dock */}
      {flights.map((f, i) => (
        <motion.div
          key={f.key}
          data-flight
          className="pointer-events-none fixed top-0 left-0 z-50"
          initial={{ x: f.from.x, y: f.from.y, opacity: 0, scale: 0.7 }}
          animate={{
            x: [f.from.x, f.from.x, f.to.x],
            y: [f.from.y, f.from.y - 14, f.to.y],
            opacity: [0, 1, 1, 0],
            scale: [0.7, 1, 1, 0.45],
          }}
          transition={{ duration: 0.95, delay: i * 0.16, ease: 'easeInOut' }}
          onAnimationComplete={() => setFlights((current) => current.filter((x) => x.key !== f.key))}
        >
          <span className="code-sm border-2 border-hairline-strong bg-hero-glow px-2 py-1 whitespace-nowrap shadow-brutal-sm">
            {f.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
