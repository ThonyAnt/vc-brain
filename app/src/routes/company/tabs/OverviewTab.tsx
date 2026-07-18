import { useEffect, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router'
import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { CardSticky, ContainerScroll } from '@/components/ui/cards-stack'
import { api } from '../../../lib/api/client'
import type { Company, Founder } from '../../../lib/types'

/* Stacked analysis cards: each section pins and stacks as you scroll the deal */
const STACK_CARD =
  'rounded-card border border-hairline bg-card/95 p-6 backdrop-blur-sm shadow-[0_8px_24px_rgba(32,32,32,0.08)]'

export function OverviewTab({ company, founders }: { company: Company; founders: Founder[] }) {
  const [names, setNames] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    api.getCompanies().then((all) => setNames(new Map(all.map((c) => [c.id, c.name]))))
  }, [])

  const sections: { key: string; body: ReactNode; bone?: boolean }[] = [
    {
      key: 'Summary',
      body: <p className="mt-2 text-body">{company.summary}</p>,
    },
    ...(company.whySurfaced
      ? [
          {
            key: 'Why this surfaced',
            bone: true,
            body: (
              <ul className="mt-2 space-y-1.5">
                {company.whySurfaced.map((w) => (
                  <li key={w} className="text-sm text-body">
                    · {w}
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(company.analogues.length > 0
      ? [
          {
            key: 'Historical analogues',
            body: (
              <div className="mt-3 space-y-3">
                {company.analogues.map((a) => (
                  <div key={a.companyId} className="flex gap-3">
                    <NavLink
                      to={`/company/${a.companyId}`}
                      className={`caption-tight shrink-0 ${a.kind === 'portfolio' ? 'text-success' : 'text-charcoal'}`}
                    >
                      {names.get(a.companyId) ?? a.companyId}
                    </NavLink>
                    <span className="text-sm text-mute">{a.note}</span>
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
    {
      key: 'Reasons to invest',
      body: (
        <ul className="mt-2 space-y-1.5">
          {company.reasonsToInvest.map((r) => (
            <li key={r} className="text-sm text-body">
              · {r}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'Reasons to pass',
      body: (
        <ul className="mt-2 space-y-1.5">
          {company.reasonsToPass.map((r) => (
            <li key={r} className="text-sm text-body">
              · {r}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ContainerScroll className="space-y-4 pb-[16vh] lg:col-span-2">
        {sections.map((s, i) => (
          <CardSticky
            key={s.key}
            index={i + 1}
            incrementY={16}
            incrementZ={4}
            className={`${STACK_CARD} ${s.bone ? 'bg-bone/95' : ''}`}
          >
            <Eyebrow className={s.key === 'Reasons to invest' ? 'text-success' : ''}>{s.key}</Eyebrow>
            {s.body}
          </CardSticky>
        ))}
      </ContainerScroll>

      <div className="h-fit space-y-4 lg:sticky lg:top-4">
        {founders.map((f) => (
          <Card key={f.id}>
            <div className="flex items-baseline justify-between">
              <span className="caption-tight text-ink">{f.name}</span>
              <span className="code-md text-ink">{f.score}</span>
            </div>
            <Eyebrow className="mt-0.5">{f.role}</Eyebrow>
            <p className="mt-2 text-sm text-mute">{f.background}</p>
            <NavLink to="/founders" className="caption-tight mt-3 inline-block text-primary">
              score rationale →
            </NavLink>
          </Card>
        ))}

        <Card>
          <Eyebrow>Key risks</Eyebrow>
          <ul className="mt-2 space-y-1.5">
            {company.risks.map((r) => (
              <li key={r} className="text-sm text-body">
                · {r}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-dark text-on-dark">
          <span className="caption-tight text-on-dark">Missing diligence</span>
          <ul className="mt-2 space-y-2">
            {company.diligenceQuestions.map((q) => (
              <li key={q} className="text-sm text-on-dark">
                → {q}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
