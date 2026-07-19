import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from '../ui/Eyebrow'
import { partnerDisplay } from '../../lib/partnerPersonas'

/*
 * Live trace of one orchestrator run: a vertical stage rail in the deal-stage
 * visual language (bone = queued, hero-glow = running, black = done, red =
 * failed), per-stage durations, expandable specialist findings, and partner
 * avatars that stamp in as each partner review lands. Stays in the thread
 * after the run as a collapsible "show work" record.
 */

export type StageStatus = 'queued' | 'running' | 'done' | 'failed'

export interface TracePartner {
  id: string
  status: StageStatus
}

export interface TraceStage {
  id: string
  label: string
  status: StageStatus
  summary?: string
  error?: string
  startedAt?: number
  endedAt?: number
  /** Individual partner reviews fanning out under the partnerReview stage. */
  partners?: TracePartner[]
}

export interface TraceRun {
  startedAt: number
  endedAt?: number
  /** True when the run is the offline simulator, not the live brain API. */
  offline?: boolean
  stages: TraceStage[]
}

/* Server emits placeholder summaries like "Risk review completed." — only a
 * summary with more than that is worth an expandable findings row. */
const isRealSummary = (s: string | undefined): s is string =>
  !!s && !/^[\w\s—-]+ completed\.$/.test(s.trim())

const secs = (ms: number) => `${Math.max(0, ms / 1000).toFixed(1)}s`

function StatusCell({ status }: { status: StageStatus }) {
  const reduced = useReducedMotion()
  if (status === 'running') {
    return (
      <motion.i
        className="h-5 w-5 shrink-0 border-2 border-hairline-strong bg-hero-glow"
        animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      />
    )
  }
  const look = {
    queued: 'bg-bone',
    done: 'bg-dark text-on-dark',
    failed: 'bg-primary text-on-primary',
  }[status]
  return (
    <i className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 border-hairline-strong font-mono text-[11px] font-bold not-italic ${look}`}>
      {status === 'done' ? '✓' : status === 'failed' ? '✕' : ''}
    </i>
  )
}

function PartnerRow({ partners }: { partners: TracePartner[] }) {
  const reduced = useReducedMotion()
  return (
    <div className="mt-2 ml-8 flex items-center gap-2">
      {partners.map((p, i) => {
        /* underscored ids ("partner_a") read as placeholders once de-snaked */
        const persona = partnerDisplay(p.id.replace(/[_-]/g, ' '), i)
        return (
          <motion.div
            key={p.id}
            className="flex flex-col items-center gap-1"
            initial={reduced ? false : { scale: 1.6, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <img
              src={persona.photo}
              alt={persona.name}
              title={persona.name}
              className={`h-9 w-9 border-2 border-hairline-strong object-cover shadow-brutal-sm transition-[filter,opacity] duration-500 ${
                p.status === 'done' ? '' : 'opacity-60 grayscale'
              }`}
            />
            <span className="code-sm text-[9px] uppercase text-charcoal">
              {persona.name.split(' ')[0]}
            </span>
          </motion.div>
        )
      })}
      <span className="code-sm ml-1 text-charcoal">
        {partners.filter((p) => p.status === 'done').length}/{partners.length} reviews in
      </span>
    </div>
  )
}

function StageRow({ stage, now }: { stage: TraceStage; now: number }) {
  const [expanded, setExpanded] = useState(false)
  const running = stage.status === 'running'
  const duration =
    stage.startedAt !== undefined
      ? secs((stage.endedAt ?? now) - stage.startedAt)
      : undefined
  return (
    <div className="border-b border-hairline py-2 last:border-b-0">
      <div className="flex items-center gap-3">
        <StatusCell status={stage.status} />
        <span
          className={`min-w-0 flex-1 truncate text-sm ${
            running ? 'font-semibold text-ink' : stage.status === 'queued' ? 'text-charcoal' : 'text-ink'
          }`}
        >
          {stage.label}
        </span>
        {stage.id !== 'committee' && isRealSummary(stage.summary) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="code-sm shrink-0 cursor-pointer uppercase text-primary"
          >
            findings {expanded ? '▾' : '▸'}
          </button>
        )}
        {duration && <span className="code-sm shrink-0 text-charcoal">{duration}</span>}
      </div>
      {stage.status === 'failed' && stage.error && (
        <p className="code-sm mt-1.5 ml-8 border-2 border-hairline-strong bg-primary/10 p-1.5 text-primary">
          {stage.error}
        </p>
      )}
      {expanded && isRealSummary(stage.summary) && (
        <p className="caption mt-1.5 ml-8 border-l-2 border-hairline-strong pl-2.5 text-charcoal">
          {stage.summary}
        </p>
      )}
      {/* the run's climax: the committee lands as a black verdict band */}
      {stage.id === 'committee' && stage.status === 'done' && isRealSummary(stage.summary) && (
        <div className="mt-2 ml-8 border-2 border-hairline-strong bg-dark p-2.5 shadow-brutal-sm">
          <span className="code-sm uppercase tracking-[0.08em] text-hero-glow">Committee verdict</span>
          <p className="mt-1 text-sm text-on-dark">{stage.summary}</p>
        </div>
      )}
      {stage.partners && stage.partners.length > 0 && <PartnerRow partners={stage.partners} />}
    </div>
  )
}

export function OrchestrationTrace({ run }: { run: TraceRun }) {
  const live = !run.endedAt
  const [open, setOpen] = useState(live)
  const [now, setNow] = useState(() => Date.now())

  /* tick the visible durations while the run is live */
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => setNow(Date.now()), 300)
    return () => clearInterval(t)
  }, [live])

  const doneCount = run.stages.filter((s) => s.status === 'done').length
  const failed = run.stages.some((s) => s.status === 'failed')
  const total = secs((run.endedAt ?? now) - run.startedAt)

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className="max-w-[85%] border-2 border-hairline-strong bg-card shadow-brutal"
      aria-live="polite"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <Eyebrow className={failed ? 'text-primary' : ''}>Orchestration</Eyebrow>
          {run.offline && (
            <span className="code-sm border-2 border-hairline-strong bg-hero-glow px-1.5 py-0.5 uppercase tracking-[0.08em] text-ink">
              offline demo
            </span>
          )}
          {live && (
            <motion.i
              className="h-2 w-2 bg-primary not-italic"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          )}
        </span>
        <span className="code-sm text-ink">
          {doneCount}/{run.stages.length} · {total}
        </span>
      </summary>
      <div className="px-4 pb-3">
        {run.stages.map((stage) => (
          <StageRow key={stage.id} stage={stage} now={now} />
        ))}
      </div>
    </details>
  )
}
