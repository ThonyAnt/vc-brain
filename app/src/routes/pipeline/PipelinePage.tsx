import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card } from '../../components/ui/Card'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { api } from '../../lib/api/client'
import type { Company, ExecutionItem, Stage } from '../../lib/types'

const STAGES: Stage[] = ['Sourced', 'Outreach', 'Meeting', 'Diligence', 'IC', 'Decision']

const KIND_LABEL: Record<ExecutionItem['kind'], string> = {
  call: 'call',
  outreach: 'outreach',
  schedule: 'schedule',
  memo: 'memo',
}

type View = 'board' | 'database'

type SortKey = 'name' | 'stage' | 'sector' | 'fitScore' | 'raising' | 'location'

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
  const [queue, setQueue] = useState<ExecutionItem[]>([])
  // ?view=database overrides (demo aid); otherwise last choice persists per browser
  const [view, setView] = useState<View>(() => {
    const param = new URLSearchParams(window.location.search).get('view')
    if (param === 'database' || param === 'board') return param
    return (localStorage.getItem('vcbrain-pipeline-view') as View) ?? 'board'
  })
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'fitScore', dir: -1 })
  const navigate = useNavigate()

  useEffect(() => {
    api.getCompanies().then(setCompanies)
    api.getExecutionQueue().then(setQueue)
  }, [])

  function switchView(v: View) {
    setView(v)
    localStorage.setItem('vcbrain-pipeline-view', v)
  }

  function onSort(key: SortKey) {
    setSort((s) => (s.key === key ? { key, dir: -s.dir as 1 | -1 } : { key, dir: key === 'fitScore' ? -1 : 1 }))
  }

  const active = companies.filter((c) => c.dealStage)

  const sorted = [...active].sort((a, b) => {
    const { key, dir } = sort
    if (key === 'fitScore') return (a.fitScore - b.fitScore) * dir
    if (key === 'stage') return (STAGES.indexOf(a.dealStage!) - STAGES.indexOf(b.dealStage!)) * dir
    const av = (a[key] ?? '') as string
    const bv = (b[key] ?? '') as string
    return av.localeCompare(bv) * dir
  })

  return (
    <div className="mx-auto max-w-[1280px] p-8 pb-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Pipeline</Eyebrow>
          <h1 className="display-lg mt-2">Active deals</h1>
        </div>

        {/* view switcher */}
        <div className="flex border-2 border-hairline-strong shadow-brutal-sm">
          {(['board', 'database'] as const).map((v) => (
            <button
              key={v}
              onClick={() => switchView(v)}
              className={`code-sm cursor-pointer px-4 py-2 uppercase transition-colors ${
                view === v ? 'bg-dark text-on-dark' : 'bg-card text-ink hover:bg-bone'
              } ${v === 'database' ? 'border-l-2 border-hairline-strong' : ''}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* execution queue: today's calls, outreach, scheduling, memos */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
        {queue.map((item) => (
          <button
            key={item.id}
            onClick={() => item.companyId && navigate(`/company/${item.companyId}`)}
            className="flex shrink-0 cursor-pointer items-center gap-3 rounded-none border-2 border-hairline-strong bg-card py-2 pr-5 pl-3 text-left transition-colors hover:bg-bone"
          >
            <span
              className={`caption rounded-none border border-hairline-strong px-2.5 py-1 ${
                item.kind === 'call' ? 'bg-dark text-on-dark' : 'bg-bone text-charcoal'
              }`}
            >
              {KIND_LABEL[item.kind]}
            </span>
            <span className="text-sm text-ink">{item.title}</span>
            <span className="code-sm text-ash">{item.due}</span>
          </button>
        ))}
      </div>

      {view === 'board' ? (
        /* stage board */
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage) => {
            const deals = active.filter((c) => c.dealStage === stage)
            return (
              <div key={stage} className="rounded-none border-2 border-hairline-strong bg-bone p-3">
                <div className="flex items-baseline justify-between px-1">
                  <Eyebrow className="text-charcoal">{stage}</Eyebrow>
                  <span className="code-sm text-ash">{deals.length}</span>
                </div>
                <div className="mt-2 space-y-2">
                  {deals.map((c) => (
                    <Card
                      key={c.id}
                      className="cursor-pointer p-3 transition-colors hover:bg-card/60"
                      onClick={() => navigate(`/company/${c.id}`)}
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="caption-tight text-ink">{c.name}</span>
                        <span className="code-sm text-ink">{c.fitScore}</span>
                      </div>
                      <div className="caption mt-1 text-mute">{c.oneLiner}</div>
                      {c.raising && <div className="code-sm mt-2 text-charcoal">{c.raising}</div>}
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
        <div className="mt-6 overflow-x-auto rounded-none border-2 border-hairline-strong bg-card shadow-brutal">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-hairline-strong bg-bone">
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
                      <span className="code-md text-ink">{c.fitScore}</span>
                      <div className="h-2 w-16 border border-hairline-strong bg-card">
                        <div className="h-full bg-primary" style={{ width: `${c.fitScore}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="code-sm px-4 py-3 whitespace-nowrap text-ink">{c.raising ?? '—'}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-ink">{c.location}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="caption-tight whitespace-nowrap text-primary">open →</span>
                  </td>
                </tr>
              ))}
              {!sorted.length && (
                <tr>
                  <td colSpan={7} className="caption px-4 py-8 text-center text-ash">
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
