import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { api } from '../../../lib/api/client'
import type { Company, Founder } from '../../../lib/types'

export function OverviewTab({ company, founders }: { company: Company; founders: Founder[] }) {
  const [names, setNames] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    api.getCompanies().then((all) => setNames(new Map(all.map((c) => [c.id, c.name]))))
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Card>
          <Eyebrow>Summary</Eyebrow>
          <p className="mt-2 leading-relaxed text-body">{company.summary}</p>
        </Card>

        {company.whySurfaced && (
          <Card className="bg-bone">
            <Eyebrow>Why this surfaced</Eyebrow>
            <ul className="mt-2 space-y-1.5">
              {company.whySurfaced.map((w) => (
                <li key={w} className="text-sm leading-normal text-body">
                  · {w}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {company.analogues.length > 0 && (
          <Card>
            <Eyebrow>Historical analogues</Eyebrow>
            <div className="mt-3 space-y-3">
              {company.analogues.map((a) => (
                <div key={a.companyId} className="flex gap-3">
                  <NavLink
                    to={`/company/${a.companyId}`}
                    className={`caption-tight shrink-0 ${a.kind === 'portfolio' ? 'text-success' : 'text-charcoal'}`}
                  >
                    {names.get(a.companyId) ?? a.companyId}
                  </NavLink>
                  <span className="text-sm leading-normal text-mute">{a.note}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <Eyebrow className="text-success">Reasons to invest</Eyebrow>
            <ul className="mt-2 space-y-1.5">
              {company.reasonsToInvest.map((r) => (
                <li key={r} className="text-sm leading-normal text-body">
                  · {r}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <Eyebrow className="text-primary">Reasons to pass</Eyebrow>
            <ul className="mt-2 space-y-1.5">
              {company.reasonsToPass.map((r) => (
                <li key={r} className="text-sm leading-normal text-body">
                  · {r}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        {founders.map((f) => (
          <Card key={f.id}>
            <div className="flex items-baseline justify-between">
              <span className="caption-tight text-ink">{f.name}</span>
              <span className="font-mono text-sm text-primary">{f.score}</span>
            </div>
            <Eyebrow className="mt-0.5">{f.role}</Eyebrow>
            <p className="mt-2 text-sm leading-normal text-mute">{f.background}</p>
            <NavLink to="/founders" className="eyebrow mt-3 inline-block text-primary">
              score rationale →
            </NavLink>
          </Card>
        ))}

        <Card>
          <Eyebrow>Key risks</Eyebrow>
          <ul className="mt-2 space-y-1.5">
            {company.risks.map((r) => (
              <li key={r} className="text-sm leading-normal text-body">
                · {r}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-dark text-on-dark">
          <span className="eyebrow text-on-dark-mute">Missing diligence</span>
          <ul className="mt-2 space-y-2">
            {company.diligenceQuestions.map((q) => (
              <li key={q} className="font-mono text-[12px] leading-normal text-on-dark">
                → {q}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
