import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../../lib/api/client'
import type { Company } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Eyebrow } from '../ui/Eyebrow'
import { Pill } from '../ui/Pill'

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
    <div className="pointer-events-auto flex h-full w-80 flex-col rounded-card border border-hairline bg-canvas/80 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <Eyebrow className="text-ink">Sourced this week</Eyebrow>
        <Eyebrow className="text-sunset">{visible.length}</Eyebrow>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-2">
        {visible.map((c) => (
          <div
            key={c.id}
            className="cursor-pointer rounded-card border border-hairline bg-card p-3 transition-colors hover:border-white/25"
            onClick={() => onFocus(c.id)}
          >
            <div className="flex items-baseline justify-between">
              <div className="text-sm text-ink">{c.name}</div>
              <div className="eyebrow text-sunset">{c.fitScore}</div>
            </div>
            <div className="mt-1 text-[13px] leading-4.5 text-mute">{c.oneLiner}</div>
            {c.whySurfaced?.[0] && (
              <div className="mt-2 border-l border-sunset/40 pl-2 text-[12px] leading-4 text-body">{c.whySurfaced[0]}</div>
            )}
            <div className="mt-3 flex gap-1.5" onClick={(e) => e.stopPropagation()}>
              <Pill size="sm" className="text-[12px]" onClick={() => navigate(`/company/${c.id}`)}>
                Investigate
              </Pill>
              <Pill size="sm" className="text-[12px]" onClick={() => pass(c)}>
                Pass
              </Pill>
              <Pill
                size="sm"
                className={`text-[12px] ${saved.has(c.id) ? 'bg-soft' : ''}`}
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
