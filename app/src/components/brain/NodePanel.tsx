import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../../lib/api/client'
import type { Company, Founder } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Pill } from '../ui/Pill'
import { ROLE_COLORS } from './BrainCanvas'

/* Dark-inversion detail panel over the brain canvas. */
export function NodePanel({
  selectedId,
  onClose,
  onFeedback,
}: {
  selectedId: string
  onClose: () => void
  onFeedback: (changedIds: string[]) => void
}) {
  const [company, setCompany] = useState<Company | null>(null)
  const [founder, setFounder] = useState<Founder | null>(null)
  const [names, setNames] = useState<Map<string, string>>(new Map())
  const navigate = useNavigate()
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    setCompany(null)
    setFounder(null)
    api.getCompany(selectedId).then((c) => c && setCompany(c))
    api.getFounder(selectedId).then((f) => f && setFounder(f))
    api.getCompanies().then((all) => setNames(new Map(all.map((c) => [c.id, c.name]))))
  }, [selectedId])

  async function pass() {
    if (!company) return
    const res = await api.postFeedback({ entityId: company.id, action: 'pass' })
    setWeights(res.weights)
    setLearningNote(res.note)
    onFeedback(res.changedNodeIds)
    onClose()
  }

  if (!company && !founder) return null

  const color = ROLE_COLORS[company?.type ?? 'founder']

  return (
    <div className="pointer-events-auto h-fit w-80 rounded-lg bg-dark/85 p-4 text-on-dark backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="heading-sm">{company?.name ?? founder?.name}</div>
          <div className="eyebrow mt-1" style={{ color }}>
            {company ? `${company.sector} · ${company.type}` : founder?.role}
          </div>
        </div>
        <button onClick={onClose} className="cursor-pointer text-on-dark-mute hover:text-on-dark">
          ×
        </button>
      </div>

      {company && (
        <>
          <p className="mt-3 text-[13px] leading-4.5 text-on-dark-mute">{company.oneLiner}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="eyebrow text-on-dark-mute">Fund fit</span>
            <div className="h-[3px] flex-1 rounded-full bg-white/10">
              <div className="h-[3px] rounded-full bg-hero-glow" style={{ width: `${company.fitScore}%` }} />
            </div>
            <span className="eyebrow">{company.fitScore}</span>
          </div>
          {company.raising && (
            <div className="mt-2 flex justify-between text-[13px]">
              <span className="text-on-dark-mute">Raising</span>
              <span className="font-mono text-[12px]">{company.raising}</span>
            </div>
          )}
          {company.analogues.length > 0 && (
            <div className="mt-3 border-t border-divider-dark pt-3">
              <span className="eyebrow text-on-dark-mute">Nearest precedents</span>
              {company.analogues.map((a) => (
                <div key={a.companyId} className="mt-2 text-[12px] leading-4">
                  <span style={{ color: ROLE_COLORS[a.kind] }}>{names.get(a.companyId) ?? a.companyId}</span>
                  <span className="text-on-dark-mute"> — {a.note}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Pill variant="primary" onClick={() => navigate(`/company/${company.id}`)}>
              Open analysis
            </Pill>
            {company.type === 'sourced' && (
              <Pill variant="onDark" onClick={pass}>
                Pass
              </Pill>
            )}
          </div>
        </>
      )}

      {founder && !company && (
        <>
          <p className="mt-3 text-[13px] leading-4.5 text-on-dark-mute">{founder.background}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="eyebrow text-on-dark-mute">Founder score</span>
            <div className="h-[3px] flex-1 rounded-full bg-white/10">
              <div className="h-[3px] rounded-full bg-hero-pink" style={{ width: `${founder.score}%` }} />
            </div>
            <span className="eyebrow">{founder.score}</span>
          </div>
          <p className="mt-3 border-l-2 border-hero-pink/60 pl-2 text-[12px] leading-4 text-on-dark-mute">
            {founder.justification}
          </p>
          <div className="mt-4">
            <Pill variant="onDark" onClick={() => navigate(`/founders`)}>
              Review in Founders
            </Pill>
          </div>
        </>
      )}
    </div>
  )
}
