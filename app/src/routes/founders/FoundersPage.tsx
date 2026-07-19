import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { FounderAvatar } from '../../components/ui/FounderAvatar'
import { Pill } from '../../components/ui/Pill'
import { api } from '../../lib/api/client'
import type { Company, Founder } from '../../lib/types'
import { useAppStore } from '../../state/store'

export function FoundersPage() {
  const [founders, setFounders] = useState<Founder[]>([])
  const [companies, setCompanies] = useState<Map<string, Company>>(new Map())
  const [openId, setOpenId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [showScout, setShowScout] = useState(false)
  const [scoutQuery, setScoutQuery] = useState('')
  const [scouting, setScouting] = useState(false)
  const [scoutError, setScoutError] = useState<string | null>(null)
  const navigate = useNavigate()
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    api.getFounders().then((f) => setFounders([...f].sort((a, b) => b.score - a.score)))
    api.getCompanies().then((all) => setCompanies(new Map(all.map((c) => [c.id, c]))))
  }, [])

  async function runScout() {
    const q = scoutQuery.trim()
    if (!q || scouting) return
    setScouting(true)
    setScoutError(null)
    const input = /linkedin\.com\/in\//i.test(q) ? { linkedinUrl: q } : { name: q }
    const res = await api.sourceFounder(input)
    setScouting(false)
    if (!res) {
      setScoutError('Founder scout unavailable — brain API offline or TAVILY_API_KEY not set.')
      return
    }
    setScoutQuery('')
    setShowScout(false)
    setFounders(await api.getFounders().then((f) => [...f].sort((a, b) => b.score - a.score)))
    setOpenId(res.founder.id)
    setLearningNote(
      `Sourced ${res.founder.name} — scored ${res.founder.score}/100 from ${res.sources.length} public sources.`,
    )
  }

  async function feedback(f: Founder, action: 'agree' | 'disagree') {
    const res = await api.postFeedback({ entityId: f.id, action, justification: note || undefined })
    setWeights(res.weights)
    setLearningNote(res.note)
    setNote('')
    setOpenId(null)
  }

  return (
    <div className="mx-auto max-w-[1280px] p-8 pb-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Founders</Eyebrow>
          <h1 className="display-lg mt-2">Leads</h1>
          <p className="mt-3 max-w-[620px] text-body">
            Scored against the fund's historical founder decisions. Agree or disagree with a rationale — the brain
            re-weights its criteria from your call.
          </p>
        </div>
        <Pill variant="primary" size="md" onClick={() => setShowScout((s) => !s)}>
          + Source founder
        </Pill>
      </div>

      {showScout && (
        <div className="mt-4 flex max-w-xl items-center gap-2 border-2 border-hairline-strong bg-card p-2 shadow-brutal">
          <input
            autoFocus
            value={scoutQuery}
            onChange={(e) => setScoutQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runScout()}
            disabled={scouting}
            placeholder="linkedin.com/in/… or a full name"
            className="h-10 w-full rounded-none border-2 border-hairline-strong bg-card px-3 text-sm text-ink placeholder:text-stone focus:outline-none"
          />
          <Pill variant="dark" size="md" onClick={runScout} disabled={scouting}>
            {scouting ? 'Scouting…' : 'Scout'}
          </Pill>
        </div>
      )}
      {scouting && (
        <div className="code-sm mt-2 text-charcoal">FOUNDER SCOUT · TAVILY FAN-OUT + FUND-CALIBRATED SCORING…</div>
      )}
      {scoutError && <div className="code-sm mt-2 text-primary">{scoutError}</div>}

      <div className="mt-6 overflow-hidden rounded-none border-2 border-hairline-strong bg-card shadow-brutal">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-bone">
              {['Founder', 'Company', 'Background', 'Signals', 'Score', ''].map((h) => (
                <th key={h} className="caption-tight px-4 py-3 text-charcoal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {founders.map((f) => {
              const company = f.companyId ? companies.get(f.companyId) : undefined
              const open = openId === f.id
              return (
                <Fragment key={f.id}>
                  <tr
                    className="cursor-pointer border-t border-hairline hover:bg-bone"
                    onClick={() => setOpenId(open ? null : f.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FounderAvatar founder={f} size={9} />
                        <span className="caption-tight text-ink">{f.name}</span>
                      </div>
                    </td>
                    {company ? (
                      <td
                        className="px-4 py-3 text-sm text-primary"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/company/${f.companyId}`)
                        }}
                      >
                        {company.name}
                      </td>
                    ) : (
                      <td className="px-4 py-3 text-sm text-mute">{f.company ?? '—'}</td>
                    )}
                    <td className="max-w-[340px] px-4 py-3 text-sm text-mute">{f.background}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {f.signals.map((s) => (
                          <span key={s} className="rounded-none border border-hairline-strong bg-canvas px-2.5 py-1 caption text-ink">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-[3px] w-16 rounded-none bg-bone">
                          <div className="h-[3px] rounded-none bg-dark" style={{ width: `${f.score}%` }} />
                        </div>
                        <span className="code-md text-ink">{f.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-ash">{open ? '▾' : '▸'}</td>
                  </tr>
                  {open && (
                    <tr className="border-t border-hairline bg-bone">
                      <td colSpan={6} className="px-4 py-4">
                        <Eyebrow>Score rationale</Eyebrow>
                        <p className="mt-1 max-w-[760px] text-sm text-body">{f.justification}</p>
                        {(f.linkedin || f.sources?.length) && (
                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            {f.linkedin && (
                              <a
                                href={f.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="code-sm text-primary underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                linkedin
                              </a>
                            )}
                            {f.sources?.slice(0, 4).map((s, i) => (
                              <a
                                key={s}
                                href={s}
                                target="_blank"
                                rel="noreferrer"
                                className="code-sm text-charcoal underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                src {i + 1}
                              </a>
                            ))}
                          </div>
                        )}
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Why do you agree or disagree? (optional, feeds the brain)"
                            className="h-11 w-96 rounded-none border-2 border-hairline-strong bg-card px-5 text-base text-ink placeholder:text-ash focus:outline-3 focus:outline-ring-focus"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Pill variant="dark" size="md" onClick={() => feedback(f, 'agree')}>
                            Agree
                          </Pill>
                          <Pill size="md" onClick={() => feedback(f, 'disagree')}>
                            Disagree
                          </Pill>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
