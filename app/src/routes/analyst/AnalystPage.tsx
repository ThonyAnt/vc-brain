import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AskInput } from '@/components/ui/ask-input'
import { FlowFieldBackground } from '@/components/ui/flow-field-background'
import { api } from '../../lib/api/client'
import type { OrchestratorStreamEvent } from '../../lib/api/client'
import type { ChatMessage } from '../../lib/types'

type PipelineProgress = {
  planned: string[]
  completed: string[]
  current: string
  failed: boolean
}

const EMPTY_PROGRESS: PipelineProgress = {
  planned: [],
  completed: [],
  current: 'Starting orchestration…',
  failed: false,
}

const AGENT_LABELS: Record<string, string> = {
  discovery: 'Searching the web with Tavily',
  fundProfiler: 'Profiling the fund mandate',
  marketScout: 'Scouting the market',
  technicalDiligence: 'Running technical diligence',
  commercialDiligence: 'Running commercial diligence',
  financialDiligence: 'Running financial diligence',
  risk: 'Reviewing risks',
  partnerReview: 'Collecting partner reviews',
  committee: 'Convening the investment committee',
  memo: 'Writing the investment memo',
}

function progressAgent(agent: string) {
  return agent.startsWith('partner:') ? 'partnerReview' : agent
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
   question lands the page becomes a message thread with the input pinned. */
export function AnalystPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<PipelineProgress>(EMPTY_PROGRESS)
  /* Assistant message index -> founders sourced in that run, so a completed
     founder-sourcing turn shows a link through to the Founder Leads page. */
  const [sourcedFounders, setSourcedFounders] = useState<Record<number, number>>({})
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy, progress])

  async function ask(question: string) {
    if (!question.trim() || busy) return
    const next: ChatMessage[] = [...messages, { role: 'user', content: question }]
    const assistantIndex = next.length
    setMessages([...next, { role: 'assistant', content: '' }])
    setBusy(true)
    setProgress(EMPTY_PROGRESS)
    const onEvent = (event: OrchestratorStreamEvent) => {
      if (event.type === 'founders_sourced' && event.founders.length) {
        setSourcedFounders((current) => ({
          ...current,
          [assistantIndex]: (current[assistantIndex] ?? 0) + event.founders.length,
        }))
      }
      if (event.type === 'run_started') {
        setProgress({
          planned: event.agents,
          completed: [],
          current: event.agents.length ? 'Planning the sourcing pipeline…' : 'Preparing response…',
          failed: false,
        })
      }
      if (event.type === 'agent_started') {
        const agent = progressAgent(event.agent)
        setProgress((current) => ({ ...current, current: AGENT_LABELS[agent] ?? `${event.label}…` }))
      }
      if (event.type === 'agent_completed') {
        const agent = progressAgent(event.agent)
        setProgress((current) => ({
          ...current,
          completed: current.planned.includes(agent) && !current.completed.includes(agent)
            ? [...current.completed, agent]
            : current.completed,
          current: `${AGENT_LABELS[agent] ?? event.agent} complete`,
        }))
      }
      if (event.type === 'agent_failed') {
        const agent = progressAgent(event.agent)
        setProgress((current) => ({
          ...current,
          current: `${AGENT_LABELS[agent] ?? event.agent} failed`,
          failed: true,
        }))
      }
      if (event.type === 'run_completed') {
        setProgress((current) => ({ ...current, completed: current.planned, current: 'Analysis complete' }))
      }
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
    setBusy(false)
  }

  if (messages.length === 0) {
    return (
      <div className="relative flex h-full flex-col items-center justify-center p-8">
        <FlowFieldBackground />
        <div className="relative flex w-full flex-col items-center">
          <AskInput title="Ask the fund brain" onSubmit={ask} className="max-w-2xl" />
          <p className="code-sm -mt-4 text-charcoal">
            institutional memory · 34 memos · 47 passes · 8 outcomes
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[820px] flex-col px-8 pt-6 pb-8">
      {busy && <FlowFieldBackground particleCount={150} trailOpacity={0.12} className="opacity-60" />}
      <div ref={scrollRef} className="relative min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 pb-6">
        {messages.map((m, i) => (!m.content && m.role === 'assistant' ? null : (
          <div
            key={i}
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
        )))}
        {busy && (() => {
          const total = progress.planned.length
          const percentage = total ? Math.round((progress.completed.length / total) * 100) : 12
          return (
            <div className="border-2 border-hairline-strong bg-card p-4 shadow-brutal" aria-live="polite">
              <div className="flex items-center justify-between gap-4">
                <span className={`code-sm ${progress.failed ? 'text-primary' : 'text-charcoal'}`}>{progress.current}</span>
                <span className="code-sm">{total ? `${percentage}%` : 'LIVE'}</span>
              </div>
              <div
                className="mt-3 h-3 overflow-hidden border-2 border-hairline-strong bg-bone"
                role="progressbar"
                aria-label="Sourcing pipeline progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={total ? percentage : undefined}
              >
                <div
                  className={`h-full bg-primary transition-[width] duration-500 ease-out ${total ? '' : 'animate-pulse'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {total > 0 && <div className="code-sm mt-2 text-charcoal">{progress.completed.length} of {total} stages complete</div>}
            </div>
          )
        })()}
      </div>
      <AskInput onSubmit={ask} className="relative shrink-0" />
    </div>
  )
}
