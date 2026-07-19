import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import type { FitBreakdown } from '../../lib/types'

/*
 * Explains the fund-fit score. Generic copy describes the formula; when a
 * per-company breakdown is available (ranked companies), the actual components
 * are shown with the closest winner / rejected analogues.
 */

const pct = (v: number) => `${Math.round(v * 100)}%`

function BreakdownRow({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="caption text-mute">
        {label}
        {detail && <span className="text-ash"> · {detail}</span>}
      </span>
      <span className="code-sm text-ink">{value}</span>
    </div>
  )
}

export function FitInfo({ breakdown, className = '' }: { breakdown?: FitBreakdown; className?: string }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="How the fund-fit score is computed"
            className={`inline-flex cursor-help items-center text-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-focus ${className}`}
          >
            <Info size={13} strokeWidth={2.5} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start" className="max-w-[320px] p-3">
          <p className="caption text-ink">
            Fit blends thesis match against the fund profile with similarity to past winners, minus a penalty for
            echoing rejected deals — weights re-learn from partner feedback. Scores are scaled 30–95 within the
            current sourcing cohort; hard-filtered companies floor at 35.
          </p>
          {breakdown && (
            <div className="mt-2.5 space-y-1 border-t border-hairline pt-2">
              <BreakdownRow label="Thesis match" value={pct(breakdown.thesisMatch)} />
              <BreakdownRow
                label="Like past winners"
                value={pct(breakdown.similarityToWinners)}
                detail={breakdown.closestWinner}
              />
              <BreakdownRow
                label="Like rejected deals"
                value={`−${pct(breakdown.similarityToRejected)}`}
                detail={breakdown.closestRejected}
              />
              {breakdown.eliminationReason && (
                <p className="caption pt-1 text-mute">Eliminated: {breakdown.eliminationReason}.</p>
              )}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
