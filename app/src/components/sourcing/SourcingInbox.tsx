import { useEffect, useState, type FormEvent } from 'react'
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
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set())
  const navigate = useNavigate()
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    api.getSourcing().then(setItems)
  }, [])

  /* Trigger a live web search; new companies are prepended and flagged "new". */
  async function runDiscover(e?: FormEvent) {
    e?.preventDefault()
    if (searching) return
    setSearching(true)
    try {
      const found = await api.discover(query.trim() || undefined)
      if (found.length) {
        setItems((prev) => {
          const have = new Set(prev.map((c) => c.id))
          return [...found.filter((c) => !have.has(c.id)), ...prev]
        })
        setFoundIds((s) => new Set([...s, ...found.map((c) => c.id)]))
        // BrainPage adds the new nodes to the graph, then pulses + flies to them.
        onDiscover?.(found)
        setQuery('')
      } else {
        setLearningNote('No new companies found for that search.')
      }
    } finally {
      setSearching(false)
    }
  }

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
      <button
        onClick={() => setOpen(true)}
        className="glass-panel pointer-events-auto flex h-fit cursor-pointer items-center gap-2.5 self-start rounded-none px-4 py-2.5 transition-colors hover:bg-bone"
      >
        <span className="caption-tight text-ink">Sourced this week</span>
        <span className="code-md" style={{ color: ACCENT }}>
          {visible.length}
        </span>
      </button>
    )
  }

  return (
    <div className="glass-panel pointer-events-auto flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <span className="caption-tight text-ink">Sourced this week</span>
        <span className="flex items-center gap-3">
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
      <form onSubmit={runDiscover} className="flex items-center gap-2 border-b border-hairline px-3 py-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web for startups…"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-mute"
        />
        <button
          type="submit"
          disabled={searching}
          className="caption-tight rounded-full px-3 py-1 text-white transition-opacity disabled:opacity-60"
          style={{ backgroundColor: ACCENT }}
        >
          {searching ? 'Searching…' : 'Search'}
        </button>
      </form>
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
            <div className="mt-1 text-sm text-mute">{c.oneLiner}</div>
            {c.whySurfaced?.[0] && (
              <div className="caption mt-2 border-l-2 pl-2 text-charcoal" style={{ borderColor: ACCENT }}>
                {c.whySurfaced[0]}
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
