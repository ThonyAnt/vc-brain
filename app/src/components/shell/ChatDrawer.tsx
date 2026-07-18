import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useLocation } from 'react-router'
import remarkGfm from 'remark-gfm'
import { api } from '../../lib/api/client'
import type { OrchestratorStreamEvent } from '../../lib/api/client'
import type { ChatMessage } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Eyebrow } from '../ui/Eyebrow'
import { Pill } from '../ui/Pill'

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
        a: ({ children, href }) => <a className="font-medium text-[#266df0] underline underline-offset-2" href={href} target="_blank" rel="noreferrer">{children}</a>,
        blockquote: ({ children }) => <blockquote className="my-2 border-l-2 border-[#266df0] pl-3 text-ash">{children}</blockquote>,
        code: ({ children, className }) => <code className={`${className ?? ''} bg-bone px-1 py-0.5 font-mono text-[0.9em] text-ink`}>{children}</code>,
        h1: ({ children }) => <h1 className="mb-2 mt-3 text-lg font-semibold text-ink first:mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-2 mt-3 text-base font-semibold text-ink first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-1.5 mt-2 font-semibold text-ink first:mt-0">{children}</h3>,
        li: ({ children }) => <li className="pl-0.5">{children}</li>,
        ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
        p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
        pre: ({ children }) => <pre className="my-2 overflow-x-auto border border-hairline bg-bone p-2 text-xs [&_code]:bg-transparent [&_code]:p-0">{children}</pre>,
        strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
        table: ({ children }) => <table className="my-2 w-full border-collapse text-left text-xs">{children}</table>,
        td: ({ children }) => <td className="border border-hairline p-1.5 align-top">{children}</td>,
        th: ({ children }) => <th className="border border-hairline bg-bone p-1.5 font-semibold text-ink">{children}</th>,
        ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export function ChatDrawer() {
  const open = useAppStore((s) => s.chatOpen)
  const location = useLocation()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'I am the fund analyst. Ask why a company surfaced, how it compares to past decisions, or upload a deck.' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<PipelineProgress>(EMPTY_PROGRESS)
  const fileRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const companyId = location.pathname.startsWith('/company/') ? location.pathname.split('/')[2] : undefined

  async function send(text: string) {
    if (!text.trim() || busy) return
    const next: ChatMessage[] = [...messages, { role: 'user' as const, content: text }]
    setMessages(next)
    setInput('')
    setBusy(true)
    setProgress(EMPTY_PROGRESS)
    // Reserve the assistant bubble; streamed deltas append into it in place.
    setMessages([...next, { role: 'assistant', content: '' }])
    const onEvent = (event: OrchestratorStreamEvent) => {
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
        setProgress((current) => ({
          ...current,
          current: AGENT_LABELS[agent] ?? `${event.label}…`,
        }))
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
    const reply = await api.streamChat(next, { route: location.pathname, companyId }, {
      onEvent,
      onDelta: (delta) => {
        setMessages((current) => {
          const updated = [...current]
          const last = updated[updated.length - 1]
          if (last?.role === 'assistant') updated[updated.length - 1] = { ...last, content: last.content + delta }
          return updated
        })
      },
    })
    // The completion event is authoritative and also covers non-streaming fallback.
    setMessages((current) => {
      const updated = [...current]
      if (updated.at(-1)?.role === 'assistant') updated[updated.length - 1] = reply
      else updated.push(reply)
      return updated
    })
    setBusy(false)
  }

  function onFile(file: File) {
    setMessages((m) => [
      ...m,
      { role: 'user', content: `Uploaded: ${file.name}` },
      {
        role: 'assistant',
        content: `Parsing ${file.name}… deck ingestion is stubbed in this build. In the full flow this creates a company node, runs the analysis, and places it in the brain next to its analogues.`,
      },
    ])
  }

  return (
    <aside className="flex w-90 shrink-0 flex-col border-l border-hairline bg-canvas">
      <div className="flex h-15 items-center justify-between border-b border-hairline px-4">
        <span className="caption-tight text-ink">Fund Analyst</span>
        {companyId && <Eyebrow>ctx: {companyId.replace(/^s-|^p-|^r-/, '')}</Eyebrow>}
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (!m.content && m.role === 'assistant' ? null : (
          <div
            key={i}
            className={`max-w-[85%] rounded-card px-3 py-2 text-sm ${
              m.role === 'user' ? 'ml-auto bg-bone text-ink' : 'border border-hairline bg-card text-body'
            }`}
          >
            {m.role === 'assistant' ? <AssistantMarkdown content={m.content} /> : m.content}
          </div>
        )))}
        {busy && (() => {
          const total = progress.planned.length
          const percentage = total ? Math.round((progress.completed.length / total) * 100) : 12
          return (
            <div className="border-2 border-hairline-strong bg-card p-3" aria-live="polite">
              <div className="flex items-center justify-between gap-3">
                <Eyebrow className={progress.failed ? 'text-red-600' : 'text-ash'}>{progress.current}</Eyebrow>
                <span className="font-mono text-[10px] text-ash">{total ? `${percentage}%` : 'LIVE'}</span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden border border-hairline-strong bg-bone"
                role="progressbar"
                aria-label="Sourcing pipeline progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={total ? percentage : undefined}
              >
                <div
                  className={`h-full bg-[#266df0] transition-[width] duration-500 ease-out ${total ? '' : 'animate-pulse'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {total > 0 && (
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-ash">
                  {progress.completed.length} of {total} stages complete
                </div>
              )}
            </div>
          )
        })()}
      </div>
      <div className="border-t border-hairline p-3">
        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          <button
            onClick={() => fileRef.current?.click()}
            title="Upload deck"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-none border-2 border-hairline-strong bg-card text-ink hover:bg-bone"
          >
            +
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Ask the brain…"
            className="h-11 w-full rounded-none border-2 border-hairline-strong bg-card px-5 text-base text-ink placeholder:text-ash focus:outline-3 focus:outline-ring-focus"
          />
          <Pill variant="primary" size="md" onClick={() => send(input)}>
            →
          </Pill>
        </div>
      </div>
    </aside>
  )
}
