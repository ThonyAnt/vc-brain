import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Pill } from '../../components/ui/Pill'
import { api } from '../../lib/api/client'
import type { Company, Founder } from '../../lib/types'
import { useAppStore } from '../../state/store'

export function FoundersPage() {
  const [founders, setFounders] = useState<Founder[]>([])
  const [companies, setCompanies] = useState<Map<string, Company>>(new Map())
  const [openId, setOpenId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const navigate = useNavigate()
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    api.getFounders().then((f) => setFounders([...f].sort((a, b) => b.score - a.score)))
    api.getCompanies().then((all) => setCompanies(new Map(all.map((c) => [c.id, c]))))
  }, [])

  async function feedback(f: Founder, action: 'agree' | 'disagree') {
    const res = await api.postFeedback({ entityId: f.id, action, justification: note || undefined })
    setWeights(res.weights)
    setLearningNote(res.note)
    setNote('')
    setOpenId(null)
  }

  return (
    <div className="mx-auto max-w-[1280px] p-8">
      <Eyebrow>Founders</Eyebrow>
      <h1 className="display-lg mt-2">Leads</h1>
      <p className="mt-3 max-w-[620px] text-body">
        Scored against the fund's historical founder decisions. Agree or disagree with a rationale — the brain
        re-weights its criteria from your call.
      </p>

      <div className="mt-6 overflow-hidden rounded-card border border-hairline bg-card">
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
              const company = companies.get(f.companyId)
              const open = openId === f.id
              return (
                <Fragment key={f.id}>
                  <tr
                    className="cursor-pointer border-t border-hairline hover:bg-bone"
                    onClick={() => setOpenId(open ? null : f.id)}
                  >
                    <td className="caption-tight px-4 py-3 text-ink">{f.name}</td>
                    <td
                      className="px-4 py-3 text-sm text-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/company/${f.companyId}`)
                      }}
                    >
                      {company?.name ?? f.companyId}
                    </td>
                    <td className="max-w-[340px] px-4 py-3 text-sm text-mute">{f.background}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {f.signals.map((s) => (
                          <span key={s} className="rounded-full border border-hairline bg-canvas px-2.5 py-1 caption text-ink">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-[3px] w-16 rounded-full bg-bone">
                          <div className="h-[3px] rounded-full bg-dark" style={{ width: `${f.score}%` }} />
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
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Why do you agree or disagree? (optional, feeds the brain)"
                            className="h-11 w-96 rounded-full border border-hairline bg-card px-5 text-base text-ink placeholder:text-ash focus:outline-3 focus:outline-ring-focus"
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
