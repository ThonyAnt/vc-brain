import { useEffect, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Pill } from '../../components/ui/Pill'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { api } from '../../lib/api/client'
import type { CriteriaWeights, FundProfile } from '../../lib/types'
import { useAppStore } from '../../state/store'

/* Demo partner portraits (Unsplash stock) */
const PARTNER_PHOTOS: Record<string, string> = {
  'Dana Whitfield': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop',
  'Marcus Oyelaran': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop',
  'Priya Ramachandran': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
  default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
}

export function FundPage() {
  const [fund, setFund] = useState<FundProfile | null>(null)
  const [baseWeights, setBaseWeights] = useState<CriteriaWeights>({})
  const liveWeights = useAppStore((s) => s.weights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    api.getFund().then(setFund)
    api.getGraph().then((g) => setBaseWeights(g.weights))
  }, [])

  if (!fund) return null
  const weights = liveWeights ?? baseWeights

  return (
    <div className="mx-auto max-w-[1280px] p-8 pb-28">
      <Eyebrow>Fund profile</Eyebrow>
      <h1 className="display-lg mt-2">{fund.name}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <Eyebrow>Thesis</Eyebrow>
            <p className="mt-2 text-lg text-body">{fund.thesis}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {fund.sectors.map((s) => (
                <span key={s} className="rounded-full border border-hairline bg-canvas px-2.5 py-1 caption text-ink">
                  {s}
                </span>
              ))}
              {fund.geographies.map((g) => (
                <span key={g} className="rounded-full border border-hairline bg-canvas px-2.5 py-1 caption text-charcoal">
                  {g}
                </span>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
              <div>
                <Eyebrow>Check size</Eyebrow>
                <div className="caption-tight mt-1 text-ink">{fund.checkSize}</div>
              </div>
              <div>
                <Eyebrow>Stages</Eyebrow>
                <div className="caption-tight mt-1 text-ink">{fund.stages.join(' · ')}</div>
              </div>
            </div>
          </Card>

          <Card className="bg-dark text-on-dark">
            <div className="flex items-baseline justify-between">
              <span className="caption-tight text-hero-glow">Criteria weights · live</span>
              <span className="caption text-on-dark-mute">updates with every decision</span>
            </div>
            <div className="mt-4 space-y-2.5">
              {Object.entries(weights)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="w-64 shrink-0 text-sm text-on-dark-mute">{k}</span>
                    <div className="h-[3px] flex-1 rounded-full bg-divider-dark">
                      <div
                        className="h-[3px] rounded-full bg-hero-glow transition-all duration-700"
                        style={{ width: `${v * 100}%` }}
                      />
                    </div>
                    <span className="code-sm w-10 text-right text-on-dark">{v.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {fund.partners.map((p) => (
            <ExpandableCard
              key={p.name}
              title={p.name}
              description={p.focus}
              src={PARTNER_PHOTOS[p.name] ?? PARTNER_PHOTOS.default}
              classNameExpanded="[&_h4]:text-ink [&_h4]:font-semibold"
            >
              <h4>Investment lens</h4>
              <p>{p.leans}</p>
              <h4>Focus</h4>
              <p>{p.focus}</p>
              <h4>In committee</h4>
              <p>
                The brain models {p.name.split(' ')[0]}'s likely stance on each deal from their historical
                votes and the lens above — see the partner-fit readout on any company page.
              </p>
            </ExpandableCard>
          ))}

          <Card className="bg-bone">
            <Eyebrow>Institutional memory</Eyebrow>
            <p className="mt-2 text-sm text-body">
              34 memos, 47 rejected deals, and 8 portfolio outcomes ingested. Upload new memos or past decisions to
              deepen the brain.
            </p>
            <Pill
              variant="dark"
              size="md"
              className="mt-3"
              onClick={() => setLearningNote('Memo ingestion is stubbed in this build — the backend wires in here.')}
            >
              Upload memos
            </Pill>
          </Card>
        </div>
      </div>
    </div>
  )
}
