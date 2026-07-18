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

export function PipelinePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [queue, setQueue] = useState<ExecutionItem[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.getCompanies().then(setCompanies)
    api.getExecutionQueue().then(setQueue)
  }, [])

  const active = companies.filter((c) => c.dealStage)

  return (
    <div className="mx-auto max-w-[1280px] p-8">
      <Eyebrow>Pipeline</Eyebrow>
      <h1 className="display-lg mt-2">Active deals</h1>

      {/* execution queue: today's calls, outreach, scheduling, memos */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
        {queue.map((item) => (
          <button
            key={item.id}
            onClick={() => item.companyId && navigate(`/company/${item.companyId}`)}
            className="flex shrink-0 cursor-pointer items-center gap-3 rounded-full border border-hairline bg-card py-2 pr-5 pl-3 text-left transition-colors hover:bg-bone"
          >
            <span
              className={`eyebrow rounded-full px-2.5 py-1 ${
                item.kind === 'call' ? 'bg-primary text-on-primary' : 'bg-bone text-charcoal'
              }`}
            >
              {KIND_LABEL[item.kind]}
            </span>
            <span className="text-sm text-ink">{item.title}</span>
            <span className="eyebrow text-ash">{item.due}</span>
          </button>
        ))}
      </div>

      {/* stage board */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {STAGES.map((stage) => {
          const deals = active.filter((c) => c.dealStage === stage)
          return (
            <div key={stage} className="rounded-lg bg-bone p-3">
              <div className="flex items-baseline justify-between px-1">
                <Eyebrow className="text-charcoal">{stage}</Eyebrow>
                <span className="font-mono text-[12px] text-ash">{deals.length}</span>
              </div>
              <div className="mt-2 space-y-2">
                {deals.map((c) => (
                  <Card
                    key={c.id}
                    className="cursor-pointer p-3 transition-colors hover:border-hairline-strong"
                    onClick={() => navigate(`/company/${c.id}`)}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="caption-tight text-ink">{c.name}</span>
                      <span className="font-mono text-[12px] text-primary">{c.fitScore}</span>
                    </div>
                    <div className="mt-1 text-[12px] leading-4 text-mute">{c.oneLiner}</div>
                    {c.raising && <div className="mt-2 font-mono text-[11px] text-charcoal">{c.raising}</div>}
                  </Card>
                ))}
                {!deals.length && <div className="px-1 py-3 text-center text-[12px] text-ash">—</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
