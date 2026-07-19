import { useEffect, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router'
import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { FitInfo } from '../../../components/ui/FitInfo'
import { FounderAvatar } from '../../../components/ui/FounderAvatar'
import { CardSticky, ContainerScroll } from '@/components/ui/cards-stack'
import { RadarChart } from '@/components/ui/RadarChart'
import { api } from '../../../lib/api/client'
import type { Company, Founder, Stage } from '../../../lib/types'

/* Stacked analysis cards: each section pins and stacks as you scroll the deal */
const STACK_CARD =
  'rounded-none border-2 border-hairline-strong bg-card p-6 shadow-brutal'

const STAGES: Stage[] = ['Sourced', 'Outreach', 'Meeting', 'Diligence', 'IC', 'Decision']

const fmtMoney = (n: number) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : `$${Math.round(n / 1e6)}M`

/* ---- header band: stage tracker · valuation · fit score ------------------- */

function StageTracker({ current }: { current: Stage }) {
  const idx = STAGES.indexOf(current)
  return (
    <div className="rounded-none border-2 border-hairline-strong bg-card p-4 shadow-brutal">
      <Eyebrow>Deal stage</Eyebrow>
      <div className="mt-3 flex">
        {STAGES.map((s, i) => {
          const done = i < idx
          const active = i === idx
          return (
            <div
              key={s}
              className={`code-sm -ml-[2px] flex-1 overflow-hidden border-2 border-hairline-strong px-0.5 py-2 text-center uppercase tracking-[0.08em] whitespace-nowrap first:ml-0 ${
                active
                  ? 'z-10 bg-primary text-on-primary shadow-brutal-sm'
                  : done
                    ? 'bg-dark text-on-dark'
                    : 'bg-card text-charcoal'
              }`}
            >
              {s}
            </div>
          )
        })}
      </div>
      <div className="code-sm mt-2 uppercase tracking-[0.08em] text-charcoal">
        {idx + 1}/{STAGES.length} · {current === 'Decision' ? 'terminal stage' : `next: ${STAGES[idx + 1]}`}
      </div>
    </div>
  )
}

function ValuationBlock({ company }: { company: Company }) {
  const capM = company.raising?.match(/\$([\d.]+)M\s+cap/)?.[1]
  const valuation = company.model?.valuation
    ? fmtMoney(company.model.valuation)
    : capM
      ? `$${capM}M`
      : '—'
  return (
    <div className="rounded-none border-2 border-hairline-strong bg-secondary p-4 shadow-brutal">
      <Eyebrow>Market valuation</Eyebrow>
      <div className="display-md mt-2 text-ink">{valuation}</div>
      <div className="code-sm mt-1 text-charcoal">{company.raising ?? 'no active round'}</div>
    </div>
  )
}

function FitScoreBlock({ company }: { company: Company }) {
  const score = company.fitScore
  const filled = Math.round(score / 10)
  return (
    <div className="rounded-none border-2 border-hairline-strong bg-card p-4 shadow-brutal">
      <div className="flex items-center gap-1.5">
        <Eyebrow>Fund fit</Eyebrow>
        <FitInfo breakdown={company.fitBreakdown} />
      </div>
      <div className="display-md mt-2 text-primary">{score}</div>
      <div className="mt-2 flex">
        {Array.from({ length: 10 }, (_, i) => (
          <i
            key={i}
            className={`-ml-[2px] h-4 flex-1 border-2 border-hairline-strong first:ml-0 ${
              i < filled ? 'bg-primary' : 'bg-bone'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function OverviewTab({ company, founders }: { company: Company; founders: Founder[] }) {
  const [names, setNames] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    api.getCompanies().then((all) => setNames(new Map(all.map((c) => [c.id, c.name]))))
  }, [])

  const sections: { key: string; body: ReactNode; bone?: boolean }[] = [
    /* the fingerprint leads the page: the brain's core claim, visualized */
    ...(company.fingerprint
      ? [
          {
            key: 'Similarity fingerprint',
            body: (
              <div className="mt-3">
                <p className="caption mb-1 text-charcoal">
                  Per-dimension similarity vs the closest precedents — the same 10 dimensions that
                  position this company in the brain.
                </p>
                <RadarChart
                  key={company.id}
                  axes={company.fingerprint.dims.map((d) => d.label)}
                  series={[
                    ...(company.fingerprint.winner
                      ? [
                          {
                            name: `vs ${company.fingerprint.winner} (winner)`,
                            color: '#266df0',
                            values: company.fingerprint.dims.map((d) => d.vsWinner),
                          },
                        ]
                      : []),
                    ...(company.fingerprint.rejected
                      ? [
                          {
                            name: `vs ${company.fingerprint.rejected} (passed)`,
                            color: '#ff3333',
                            values: company.fingerprint.dims.map((d) => d.vsRejected),
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            ),
          },
        ]
      : []),
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
    <div>
      {/* status band: where the deal stands, what it costs, how well it fits */}
      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <StageTracker current={company.dealStage ?? 'Sourced'} />
        <ValuationBlock company={company} />
        <FitScoreBlock company={company} />
      </div>

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
            <div className="flex items-start gap-3">
              <FounderAvatar founder={f} />
              <div className="min-w-0 flex-1">
                <span className="caption-tight block text-ink">{f.name}</span>
                <Eyebrow className="mt-0.5">{f.role}</Eyebrow>
              </div>
              {/* score stamp: the loudest thing on the card */}
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center border-2 border-hairline-strong bg-primary shadow-brutal-sm">
                <span className="font-mono text-xl font-bold leading-none text-on-primary">{f.score}</span>
                <span className="code-sm mt-0.5 text-[9px] uppercase text-on-primary">score</span>
              </div>
            </div>
            <div className="mt-3 flex">
              {Array.from({ length: 10 }, (_, i) => (
                <i
                  key={i}
                  className={`-ml-[2px] h-2.5 flex-1 border-2 border-hairline-strong first:ml-0 ${
                    i < Math.round(f.score / 10) ? 'bg-dark' : 'bg-bone'
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-sm text-mute">{f.background}</p>
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
    </div>
  )
}
