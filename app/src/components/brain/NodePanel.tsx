import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../../lib/api/client'
import type { Company, Founder } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Eyebrow } from '../ui/Eyebrow'
import { Pill } from '../ui/Pill'
import { ROLE_COLORS } from './BrainCanvas'

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
    <div className="pointer-events-auto w-80 rounded-card border border-hairline bg-canvas/80 p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="display-xs text-ink">{company?.name ?? founder?.name}</div>
          <Eyebrow className="mt-1" style={{ color }}>
            {company ? `${company.sector} · ${company.type}` : founder?.role}
          </Eyebrow>
        </div>
        <button onClick={onClose} className="cursor-pointer text-mute hover:text-ink">
          ×
        </button>
      </div>

      {company && (
        <>
          <p className="mt-3 text-[13px] leading-4.5 text-body">{company.oneLiner}</p>
          <div className="mt-3 flex items-center gap-3">
            <Eyebrow>Fund fit</Eyebrow>
            <div className="h-1 flex-1 rounded-full bg-soft">
              <div className="h-1 rounded-full bg-sunset" style={{ width: `${company.fitScore}%` }} />
            </div>
            <span className="eyebrow text-ink">{company.fitScore}</span>
          </div>
          {company.raising && (
            <div className="mt-2 flex justify-between text-[13px]">
              <span className="text-mute">Raising</span>
              <span className="text-body">{company.raising}</span>
            </div>
          )}
          {company.analogues.length > 0 && (
            <div className="mt-3 border-t border-hairline pt-3">
              <Eyebrow>Nearest precedents</Eyebrow>
              {company.analogues.map((a) => (
                <div key={a.companyId} className="mt-2 text-[12px] leading-4">
                  <span style={{ color: ROLE_COLORS[a.kind] }}>{names.get(a.companyId) ?? a.companyId}</span>
                  <span className="text-mute"> — {a.note}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Pill size="sm" variant="solid" onClick={() => navigate(`/company/${company.id}`)}>
              Open analysis
            </Pill>
            {company.type === 'sourced' && (
              <Pill size="sm" onClick={pass}>
                Pass
              </Pill>
            )}
          </div>
        </>
      )}

      {founder && !company && (
        <>
          <p className="mt-3 text-[13px] leading-4.5 text-body">{founder.background}</p>
          <div className="mt-3 flex items-center gap-3">
            <Eyebrow>Founder score</Eyebrow>
            <div className="h-1 flex-1 rounded-full bg-soft">
              <div className="h-1 rounded-full bg-twilight" style={{ width: `${founder.score}%` }} />
            </div>
            <span className="eyebrow text-ink">{founder.score}</span>
          </div>
          <p className="mt-3 border-l border-twilight/40 pl-2 text-[12px] leading-4 text-mute">{founder.justification}</p>
          <div className="mt-4">
            <Pill size="sm" variant="solid" onClick={() => navigate(`/founders`)}>
              Review in Founders
            </Pill>
          </div>
        </>
      )}
    </div>
  )
}
