/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V4 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ACCENT } from '../brain/BrainCanvas'
import { api } from '../../lib/api/client'
import type { Company } from '../../lib/types'
import type { LatLng } from '../../lib/geo'
import { cityLatLng } from '../../lib/geo'
import { useAppStore } from '../../state/store'
import { Pill } from '../ui/Pill'

/* Neobrutal panel over the brain canvas. The sourcing globe lives in GlobeCard
   on the brain page; hover here reports the city so the globe rotates to it. */
export function SourcingInbox({
  onFocus,
  onFeedback,
  onDiscover,
  onHoverCity,
}: {
  onFocus: (id: string) => void
  onFeedback: (changedIds: string[]) => void
  onDiscover?: (companies: Company[]) => void
  onHoverCity?: (city: LatLng | null) => void
}) {
  const [items, setItems] = useState<Company[]>([])
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())
  // Folded by default; ?inbox opens it for demos and screenshots.
  const [open, setOpen] = useState(() => new URLSearchParams(window.location.search).has('inbox'))
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set())
  const navigate = useNavigate()
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    api.getSourcing().then(setItems)
    return api.subscribeSourcing((companies) => {
      setItems((previous) => {
        const incoming = new Map(companies.map((company) => [company.id, company]))
        return [...companies, ...previous.filter((company) => !incoming.has(company.id))]
      })
      setFoundIds((current) => new Set([...current, ...companies.map((company) => company.id)]))
      onDiscover?.(companies)
    })
  }, [onDiscover])

  async function pass(c: Company) {
    const res = await api.postFeedback({ entityId: c.id, action: 'pass' })
    setWeights(res.weights)
    setLearningNote(res.note)
    setDismissed((d) => new Set(d).add(c.id))
    onFeedback(res.changedNodeIds)
  }

  const visible = items.filter((c) => !dismissed.has(c.id))

  if (!open) {
    return (
      <div className="pointer-events-auto flex items-stretch gap-2">
        <button
          onClick={() => setOpen(true)}
          className="glass-panel flex h-11 cursor-pointer items-center gap-2.5 rounded-none px-4 transition-colors hover:bg-bone focus-visible:outline-3 focus-visible:outline-ring-focus"
        >
          <span className="caption-tight whitespace-nowrap text-ink">Sourced this week</span>
          <span className="code-md" style={{ color: ACCENT }}>{visible.length}</span>
        </button>
        <button
          onClick={() => navigate('/analyst')}
          className="caption-tight h-11 cursor-pointer whitespace-nowrap border-2 border-hairline-strong bg-primary px-5 text-on-primary shadow-brutal-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-ring-focus active:translate-y-0 disabled:opacity-50"
        >
          Source
        </button>
      </div>
    )
  }

  return (
    <div className="glass-panel pointer-events-auto flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <span className="caption-tight text-ink">Sourced this week</span>
        <span className="flex items-center gap-3">
          <button
            onClick={() => navigate('/analyst')}
            className="caption-tight cursor-pointer border-2 border-hairline-strong bg-primary px-2.5 py-1 text-on-primary hover:bg-dark focus-visible:outline-3 focus-visible:outline-ring-focus"
          >
            Source
          </button>
          <span className="code-md" style={{ color: ACCENT }}>
            {visible.length}
          </span>
          <button
            onClick={() => setOpen(false)}
            title="Collapse"
            className="cursor-pointer text-mute hover:text-ink"
          >
            ×
          </button>
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-2">
        {visible.map((c) => (
          <div
            key={c.id}
            className="cursor-pointer rounded-none border-2 border-hairline-strong bg-card p-3 transition-colors hover:bg-bone"
            onClick={() => onFocus(c.id)}
            onMouseEnter={() => onHoverCity?.(cityLatLng(c.location))}
            onMouseLeave={() => onHoverCity?.(null)}
          >
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                {c.logoUrl && (
                  <img
                    src={c.logoUrl}
                    alt=""
                    className="h-5 w-5 shrink-0 border border-hairline-strong bg-card object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
                <div className="text-sm font-semibold text-ink">{c.name}</div>
                {foundIds.has(c.id) && (
                  <span
                    className="caption-tight rounded-full px-1.5 py-0.5 text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    new
                  </span>
                )}
              </div>
              <div className="code-sm" style={{ color: ACCENT }}>
                {c.fitScore}
              </div>
            </div>
            <div className="code-sm mt-1 flex flex-wrap gap-x-2 text-charcoal">
              <span>{c.sector}</span>
              <span>· {c.stage}</span>
              {c.location !== '—' && <span>· {c.location}</span>}
            </div>
            <div className="mt-2 text-sm text-mute">{c.oneLiner || 'Company profile is still being enriched.'}</div>
            {c.raising && <div className="code-sm mt-2 text-ink">{c.raising}</div>}
            {c.whySurfaced?.[0] && (
              <div className="caption mt-2 border-l-2 pl-2 text-charcoal" style={{ borderColor: ACCENT }}>
                {c.whySurfaced[0]}
              </div>
            )}
            {c.risks[0] && (
              <div className="caption mt-2 text-mute">
                <span className="font-semibold text-ink">Open risk:</span> {c.risks[0]}
              </div>
            )}
            <div className="mt-3 flex gap-1.5" onClick={(e) => e.stopPropagation()}>
              <Pill variant="ghost" className="px-3" onClick={() => navigate(`/company/${c.id}`)}>
                Investigate
              </Pill>
              <Pill variant="ghost" className="px-3" onClick={() => pass(c)}>
                Pass
              </Pill>
              <Pill
                variant="ghost"
                className={`px-3 ${saved.has(c.id) ? 'bg-bone' : ''}`}
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
