import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card } from '../../components/ui/Card'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { api } from '../../lib/api/client'
import type { Company, Stage } from '../../lib/types'

const STAGES: Stage[] = ['Sourced', 'Outreach', 'Meeting', 'Diligence', 'IC', 'Decision']

type View = 'board' | 'database'

/* view-switcher icons in the hand-drawn nav family (18px grid, 1.2 stroke) */
function BoardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="3" width="3.5" height="12" />
      <rect x="7.25" y="3" width="3.5" height="8" />
      <rect x="12.5" y="3" width="3.5" height="5" />
    </svg>
  )
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="3" width="14" height="12" />
      <path d="M2 7h14M2 11h14M7 3v12" />
    </svg>
  )
}

/* fit scores read like highlighter marks: hot deals go yellow */
function ScoreChip({ score }: { score: number }) {
  return (
    <span
      className={`code-sm rounded-none border-2 border-hairline-strong px-1.5 whitespace-nowrap ${
        score >= 80 ? 'bg-hero-glow text-ink' : 'bg-bone text-ink'
      }`}
    >
      {score}
    </span>
  )
}

type SortKey = 'name' | 'stage' | 'sector' | 'fitScore' | 'raising' | 'location'
type ValuationBand = 'all' | 'under-10' | '10-to-15' | '15-plus'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Company' },
  { key: 'stage', label: 'Stage' },
  { key: 'sector', label: 'Sector' },
  { key: 'fitScore', label: 'Fit' },
  { key: 'raising', label: 'Raising' },
  { key: 'location', label: 'Location' },
]

/* stage chips step up the brutal palette: bone → yellow → black */
function StageBadge({ stage }: { stage: Stage }) {
  const i = STAGES.indexOf(stage)
  const fill = i >= 4 ? 'bg-dark text-on-dark' : i >= 2 ? 'bg-hero-glow text-ink' : 'bg-bone text-ink'
  return (
    <span className={`code-sm rounded-none border-2 border-hairline-strong px-2 py-0.5 whitespace-nowrap ${fill}`}>
      {stage}
    </span>
  )
}

export function PipelinePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  // ?view=database overrides (demo aid); otherwise last choice persists per browser
  const [view, setView] = useState<View>(() => {
    const param = new URLSearchParams(window.location.search).get('view')
    if (param === 'database' || param === 'board') return param
    return (localStorage.getItem('vcbrain-pipeline-view') as View) ?? 'board'
  })
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'fitScore', dir: -1 })
  const [stageFilter, setStageFilter] = useState<Stage | 'all'>('all')
  const [scoreFilter, setScoreFilter] = useState(0)
  const [sectorFilter, setSectorFilter] = useState('all')
  const [valuationFilter, setValuationFilter] = useState<ValuationBand>('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [batchNotice, setBatchNotice] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.getCompanies().then(setCompanies)
  }, [])

  function switchView(v: View) {
    setView(v)
    localStorage.setItem('vcbrain-pipeline-view', v)
  }

  function onSort(key: SortKey) {
    setSort((s) => (s.key === key ? { key, dir: -s.dir as 1 | -1 } : { key, dir: key === 'fitScore' ? -1 : 1 }))
  }

  const active = companies.filter((c) => c.dealStage)
  const sectors = useMemo(() => [...new Set(active.map((company) => company.sector))].sort(), [active])
  const locations = useMemo(() => [...new Set(active.map((company) => company.location))].sort(), [active])

  function valuationCap(company: Company) {
    const cap = company.raising?.match(/at \$(\d+(?:\.\d+)?)M cap/i)
    return cap ? Number(cap[1]) : undefined
  }

  const filtered = active.filter((company) => {
    if (stageFilter !== 'all' && company.dealStage !== stageFilter) return false
    if (company.fitScore < scoreFilter) return false
    if (sectorFilter !== 'all' && company.sector !== sectorFilter) return false
    if (locationFilter !== 'all' && company.location !== locationFilter) return false
    const cap = valuationCap(company)
    if (valuationFilter === 'under-10') return cap !== undefined && cap < 10
    if (valuationFilter === '10-to-15') return cap !== undefined && cap >= 10 && cap < 15
    if (valuationFilter === '15-plus') return cap !== undefined && cap >= 15
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const { key, dir } = sort
    if (key === 'fitScore') return (a.fitScore - b.fitScore) * dir
    if (key === 'stage') return (STAGES.indexOf(a.dealStage!) - STAGES.indexOf(b.dealStage!)) * dir
    const av = (a[key] ?? '') as string
    const bv = (b[key] ?? '') as string
    return av.localeCompare(bv) * dir
  })

  const allVisibleSelected = sorted.length > 0 && sorted.every((company) => selectedIds.has(company.id))
  const outreachEligible = active.filter((company) => selectedIds.has(company.id) && company.dealStage === 'Sourced')

  function toggleCompany(companyId: string) {
    setSelectedIds((previous) => {
      const next = new Set(previous)
      if (next.has(companyId)) next.delete(companyId)
      else next.add(companyId)
      return next
    })
  }

  function toggleAllVisible() {
    setSelectedIds((previous) => {
      const next = new Set(previous)
      if (allVisibleSelected) sorted.forEach((company) => next.delete(company.id))
      else sorted.forEach((company) => next.add(company.id))
      return next
    })
  }

  function sendBatchOutreach() {
    if (!outreachEligible.length) return
    const eligibleIds = new Set(outreachEligible.map((company) => company.id))
    setCompanies((previous) => previous.map((company) => (
      eligibleIds.has(company.id) ? { ...company, dealStage: 'Outreach' } : company
    )))
    setSelectedIds((previous) => {
      const next = new Set(previous)
      eligibleIds.forEach((id) => next.delete(id))
      return next
    })
    setBatchNotice(`${outreachEligible.length} personalized outreach ${outreachEligible.length === 1 ? 'draft was' : 'drafts were'} queued for review.`)
  }

  return (
    <div className="mx-auto max-w-[1280px] p-8 pb-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Pipeline</Eyebrow>
          <h1 className="display-lg mt-2">Active deals</h1>
        </div>

        {/* view switcher */}
        <div className="flex border-2 border-hairline-strong shadow-brutal-sm">
          {(
            [
              { v: 'board', label: 'Board view', Icon: BoardIcon },
              { v: 'database', label: 'Database view', Icon: DatabaseIcon },
            ] as const
          ).map(({ v, label, Icon }) => (
            <button
              key={v}
              onClick={() => switchView(v)}
              title={label}
              aria-label={label}
              className={`cursor-pointer p-2.5 transition-colors ${
                view === v ? 'bg-dark text-on-dark' : 'bg-card text-ink hover:bg-bone'
              } ${v === 'database' ? 'border-l-2 border-hairline-strong' : ''}`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>

      {/* deal filters + bulk selection */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-2 border-hairline-strong bg-card p-3 shadow-brutal-sm">
        <span className="code-sm mr-1 text-mute uppercase">Filter deals</span>
        <select aria-label="Filter by stage" value={stageFilter} onChange={(event) => setStageFilter(event.target.value as Stage | 'all')} className="h-9 border-2 border-hairline-strong bg-card px-2 text-sm text-ink">
          <option value="all">All stages</option>
          {STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
        </select>
        <select aria-label="Filter by minimum score" value={scoreFilter} onChange={(event) => setScoreFilter(Number(event.target.value))} className="h-9 border-2 border-hairline-strong bg-card px-2 text-sm text-ink">
          <option value={0}>Any score</option>
          <option value={60}>Score 60+</option>
          <option value={70}>Score 70+</option>
          <option value={80}>Score 80+</option>
          <option value={90}>Score 90+</option>
        </select>
        <select aria-label="Filter by industry" value={sectorFilter} onChange={(event) => setSectorFilter(event.target.value)} className="h-9 border-2 border-hairline-strong bg-card px-2 text-sm text-ink">
          <option value="all">All industries</option>
          {sectors.map((sector) => <option key={sector} value={sector}>{sector}</option>)}
        </select>
        <select aria-label="Filter by raising valuation" value={valuationFilter} onChange={(event) => setValuationFilter(event.target.value as ValuationBand)} className="h-9 border-2 border-hairline-strong bg-card px-2 text-sm text-ink">
          <option value="all">Any raising / cap</option>
          <option value="under-10">Under $10M cap</option>
          <option value="10-to-15">$10M–$15M cap</option>
          <option value="15-plus">$15M+ cap</option>
        </select>
        <select aria-label="Filter by location" value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} className="h-9 border-2 border-hairline-strong bg-card px-2 text-sm text-ink">
          <option value="all">All locations</option>
          {locations.map((location) => <option key={location} value={location}>{location}</option>)}
        </select>
        <div className="flex-1" />
        {selectedIds.size > 0 && (
          <button type="button" onClick={sendBatchOutreach} disabled={!outreachEligible.length} className="h-9 border-2 border-hairline-strong bg-primary px-3 text-sm font-semibold text-on-primary disabled:cursor-not-allowed disabled:bg-stone disabled:text-charcoal">
            Send outreach{outreachEligible.length ? ` · ${outreachEligible.length}` : ''}
          </button>
        )}
        <button type="button" onClick={toggleAllVisible} disabled={!sorted.length} className="h-9 border-2 border-hairline-strong bg-dark px-3 text-sm font-semibold text-on-dark disabled:cursor-not-allowed disabled:opacity-40">
          {allVisibleSelected ? 'Clear selection' : `Select all ${sorted.length}`}
        </button>
      </div>
      {batchNotice && <div role="status" className="mt-3 border-2 border-success bg-success/10 px-3 py-2 text-sm text-body">{batchNotice}</div>}

      {view === 'board' ? (
        /* stage board */
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage) => {
            const deals = sorted.filter((c) => c.dealStage === stage)
            return (
              <div key={stage} className="rounded-none border-2 border-hairline-strong bg-bone">
                <div className="flex items-center justify-between border-b-2 border-hairline-strong bg-card px-3 py-2">
                  <span className="code-sm uppercase text-ink">{stage}</span>
                  <span
                    className={`code-sm px-1.5 ${deals.length ? 'bg-dark text-on-dark' : 'text-ash'}`}
                  >
                    {deals.length}
                  </span>
                </div>
                <div className="space-y-3 p-3">
                  {deals.map((c) => (
                    <Card
                      key={c.id}
                      className="cursor-pointer p-3 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000]"
                      onClick={() => navigate(`/company/${c.id}`)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex items-center gap-2"><input aria-label={`Select ${c.name}`} type="checkbox" checked={selectedIds.has(c.id)} onClick={(event) => event.stopPropagation()} onChange={() => toggleCompany(c.id)} className="h-4 w-4 accent-primary" /><span className="caption-tight text-ink">{c.name}</span></span>
                        <ScoreChip score={c.fitScore} />
                      </div>
                      <div className="caption mt-1.5 line-clamp-2 text-mute">{c.oneLiner}</div>
                      {c.raising && (
                        <div className="code-sm mt-2.5 inline-block bg-dark px-1.5 py-0.5 text-on-dark">
                          {c.raising}
                        </div>
                      )}
                    </Card>
                  ))}
                  {!deals.length && <div className="caption px-1 py-3 text-center text-ash">—</div>}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* database view */
        <div className="mt-4 overflow-x-auto rounded-none border-2 border-hairline-strong bg-card shadow-brutal">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-hairline-strong bg-bone">
                <th className="w-12 px-4 py-3">
                  <input aria-label="Select all visible companies" type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} className="h-4 w-4 cursor-pointer accent-primary" />
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => onSort(col.key)}
                    className="code-sm cursor-pointer px-4 py-3 uppercase select-none hover:bg-stone/40"
                    title={`Sort by ${col.label}`}
                  >
                    {col.label}
                    {sort.key === col.key && <span className="ml-1">{sort.dir === 1 ? '▲' : '▼'}</span>}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/company/${c.id}`)}
                  className="cursor-pointer border-t border-hairline-strong transition-colors hover:bg-bone"
                >
                  <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                    <input aria-label={`Select ${c.name}`} type="checkbox" checked={selectedIds.has(c.id)} onChange={() => toggleCompany(c.id)} className="h-4 w-4 cursor-pointer accent-primary" />
                  </td>
                  <td className="max-w-[320px] px-4 py-3">
                    <div className="caption-tight text-ink">{c.name}</div>
                    <div className="caption mt-0.5 truncate text-mute">{c.oneLiner}</div>
                  </td>
                  <td className="px-4 py-3">
                    <StageBadge stage={c.dealStage!} />
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-ink">{c.sector}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ScoreChip score={c.fitScore} />
                      <div className="h-2 w-16 border border-hairline-strong bg-card">
                        <div className="h-full bg-primary" style={{ width: `${c.fitScore}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {c.raising ? (
                      <span className="code-sm inline-block bg-dark px-1.5 py-0.5 text-on-dark">{c.raising}</span>
                    ) : (
                      <span className="caption text-ash">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-ink">{c.location}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="caption-tight whitespace-nowrap text-primary">open →</span>
                  </td>
                </tr>
              ))}
              {!sorted.length && (
                <tr>
                  <td colSpan={8} className="caption px-4 py-8 text-center text-ash">
                    No active deals
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
