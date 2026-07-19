import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../../lib/api/client'
import type { Company, Founder } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Pill } from '../ui/Pill'
import { ACCENT } from './BrainCanvas'
import { sectorColor } from './sectorColors'

/* Mockup panel voice: mono uppercase sector line, accent fit bar */
const sectorMono: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.62rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
}

/* White-glass detail panel over the light brain canvas (final-mockup chrome). */
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

  const lineColor = company ? (company.type === 'portfolio' ? ACCENT : sectorColor(company.sector)) : ACCENT

  return (
    <div className="glass-panel pointer-events-auto h-fit w-80 p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="heading-sm text-ink">{company?.name ?? founder?.name}</div>
          <div className="mt-1" style={{ ...sectorMono, color: lineColor }}>
            {company ? `${company.sector} · ${company.type === 'sourced' ? 'sourced this week' : company.type}` : founder?.role}
          </div>
        </div>
        <button onClick={onClose} className="cursor-pointer text-mute hover:text-ink">
          ×
        </button>
      </div>

      {company && (
        <>
          <p className="mt-3 text-sm text-mute">{company.oneLiner}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="caption text-mute">Fund fit</span>
            <div className="h-[3px] flex-1 rounded-none bg-bone">
              <div className="h-[3px] rounded-none" style={{ width: `${company.fitScore}%`, background: ACCENT }} />
            </div>
            <span className="code-sm text-ink">{company.fitScore}</span>
          </div>
          {company.raising && (
            <div className="mt-2 flex justify-between">
              <span className="caption text-mute">Raising</span>
              <span className="code-sm text-ink">{company.raising}</span>
            </div>
          )}
          {company.analogues.length > 0 && (
            <div className="mt-3 border-t border-hairline pt-3">
              <span className="caption-tight text-charcoal">Nearest precedents</span>
              {company.analogues.map((a) => (
                <div key={a.companyId} className="caption mt-2 text-mute">
                  <span className="caption-tight text-ink">{names.get(a.companyId) ?? a.companyId}</span> — {a.note}
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Pill variant="primary" size="md" onClick={() => navigate(`/company/${company.id}`)}>
              Open analysis
            </Pill>
            {company.type === 'sourced' && (
              <Pill variant="outline" size="md" onClick={pass}>
                Pass
              </Pill>
            )}
          </div>
        </>
      )}

      {founder && !company && (
        <>
          <p className="mt-3 text-sm text-mute">{founder.background}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="caption text-mute">Founder score</span>
            <div className="h-[3px] flex-1 rounded-none bg-bone">
              <div className="h-[3px] rounded-none" style={{ width: `${founder.score}%`, background: ACCENT }} />
            </div>
            <span className="code-sm text-ink">{founder.score}</span>
          </div>
          <p className="caption mt-3 border-l-2 pl-2 text-mute" style={{ borderColor: ACCENT }}>
            {founder.justification}
          </p>
          <div className="mt-4">
            <Pill variant="dark" size="md" onClick={() => navigate(`/founders`)}>
              Review in Founders
            </Pill>
          </div>
        </>
      )}
    </div>
  )
}
