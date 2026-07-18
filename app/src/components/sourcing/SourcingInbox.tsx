import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../../lib/api/client'
import type { Company } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Pill } from '../ui/Pill'

/* Dark-inversion panel over the brain canvas (Replicate code-well surface). */
export function SourcingInbox({
  onFocus,
  onFeedback,
}: {
  onFocus: (id: string) => void
  onFeedback: (changedIds: string[]) => void
}) {
  const [items, setItems] = useState<Company[]>([])
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const navigate = useNavigate()
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    api.getSourcing().then(setItems)
  }, [])

  async function pass(c: Company) {
    const res = await api.postFeedback({ entityId: c.id, action: 'pass' })
    setWeights(res.weights)
    setLearningNote(res.note)
    setDismissed((d) => new Set(d).add(c.id))
    onFeedback(res.changedNodeIds)
  }

  const visible = items.filter((c) => !dismissed.has(c.id))

  return (
    <div className="pointer-events-auto flex h-full w-80 flex-col rounded-lg bg-dark/85 text-on-dark backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-divider-dark px-4 py-3">
        <span className="caption-tight">Sourced this week</span>
        <span className="eyebrow text-hero-glow">{visible.length}</span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-2">
        {visible.map((c) => (
          <div
            key={c.id}
            className="cursor-pointer rounded-card border border-divider-dark/50 p-3 transition-colors hover:border-divider-dark"
            onClick={() => onFocus(c.id)}
          >
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-semibold">{c.name}</div>
              <div className="eyebrow text-hero-glow">{c.fitScore}</div>
            </div>
            <div className="mt-1 text-[13px] leading-4.5 text-on-dark-mute">{c.oneLiner}</div>
            {c.whySurfaced?.[0] && (
              <div className="mt-2 border-l-2 border-hero-glow/60 pl-2 text-[12px] leading-4 text-on-dark-mute">
                {c.whySurfaced[0]}
              </div>
            )}
            <div className="mt-3 flex gap-1.5" onClick={(e) => e.stopPropagation()}>
              <Pill variant="onDark" className="h-7 px-3 text-[12px]" onClick={() => navigate(`/company/${c.id}`)}>
                Investigate
              </Pill>
              <Pill variant="onDark" className="h-7 px-3 text-[12px]" onClick={() => pass(c)}>
                Pass
              </Pill>
              <Pill
                variant="onDark"
                className={`h-7 px-3 text-[12px] ${saved.has(c.id) ? 'bg-white/10' : ''}`}
                onClick={() => setSaved((s) => new Set(s).add(c.id))}
              >
                {saved.has(c.id) ? 'Saved' : 'Save'}
              </Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
