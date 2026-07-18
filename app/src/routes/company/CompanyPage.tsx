import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import { api } from '../../lib/api/client'
import type { Company, Founder } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { Card } from '../../components/ui/Card'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Pill } from '../../components/ui/Pill'
import { ModelTab } from './tabs/ModelTab'
import { MarketTab } from './tabs/MarketTab'
import { MemoTab } from './tabs/MemoTab'
import { OverviewTab } from './tabs/OverviewTab'

const TABS = ['Overview', 'Market map', 'Model', 'Memo'] as const
type Tab = (typeof TABS)[number]

export function CompanyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState<Company | null>(null)
  const [founders, setFounders] = useState<Founder[]>([])
  const [tab, setTab] = useState<Tab>('Overview')
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    if (!id) return
    setTab('Overview')
    api.getCompany(id).then((c) => setCompany(c ?? null))
    api.getFounders().then((all) => setFounders(all.filter((f) => f.companyId === id)))
  }, [id])

  if (!company) {
    return (
      <div className="p-8">
        <Eyebrow>Company</Eyebrow>
        <h1 className="display-lg mt-2">Not found</h1>
        <p className="mt-3 text-body">No company with id “{id}”.</p>
      </div>
    )
  }

  async function feedback(action: 'investigate' | 'pass') {
    if (!company) return
    const res = await api.postFeedback({ entityId: company.id, action })
    setWeights(res.weights)
    setLearningNote(res.note)
    if (action === 'pass') navigate('/')
  }

  return (
    <div className="mx-auto max-w-[1280px] p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>
            {company.sector} · {company.stage} · {company.location}
          </Eyebrow>
          <h1 className="display-lg mt-2">{company.name}</h1>
          <p className="mt-3 max-w-[640px] text-lg text-body">{company.oneLiner}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <Eyebrow>Fund fit</Eyebrow>
            <div className="display-md text-ink">{company.fitScore}</div>
          </div>
          {company.type === 'sourced' && (
            <>
              <Pill variant="primary" size="md" onClick={() => feedback('investigate')}>
                Advance
              </Pill>
              <Pill size="md" onClick={() => feedback('pass')}>
                Pass
              </Pill>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-2 border-b border-hairline pb-3">
        {TABS.map((t) => (
          <Pill key={t} variant={tab === t ? 'dark' : 'ghost'} onClick={() => setTab(t)}>
            {t}
          </Pill>
        ))}
        <div className="flex-1" />
        <NavLink to="/" className="caption-tight self-center text-primary">
          view in brain →
        </NavLink>
      </div>

      <div className="mt-6">
        {tab === 'Overview' && <OverviewTab company={company} founders={founders} />}
        {tab === 'Market map' && <MarketTab company={company} />}
        {tab === 'Model' && <ModelTab company={company} />}
        {tab === 'Memo' && <MemoTab company={company} founders={founders} />}
      </div>

      {company.raising && (
        <Card className="mt-8 flex items-center justify-between bg-bone">
          <span className="text-sm text-charcoal">Raising</span>
          <span className="code-md text-ink">{company.raising}</span>
        </Card>
      )}
    </div>
  )
}
