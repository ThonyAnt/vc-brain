import { useEffect, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Pill } from '../../components/ui/Pill'
import { api } from '../../lib/api/client'
import type { CriteriaWeights, FundProfile } from '../../lib/types'
import { useAppStore } from '../../state/store'

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
    <div className="mx-auto max-w-[1280px] p-8">
      <Eyebrow>Fund profile</Eyebrow>
      <h1 className="display-lg mt-2">{fund.name}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <Eyebrow>Thesis</Eyebrow>
            <p className="mt-2 text-lg leading-relaxed text-body">{fund.thesis}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {fund.sectors.map((s) => (
                <span key={s} className="rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[11px] text-ink">
                  {s}
                </span>
              ))}
              {fund.geographies.map((g) => (
                <span key={g} className="rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[11px] text-charcoal">
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
              <span className="eyebrow text-hero-glow">Criteria weights · live</span>
              <span className="eyebrow text-on-dark-mute">updates with every decision</span>
            </div>
            <div className="mt-4 space-y-2.5">
              {Object.entries(weights)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="w-64 shrink-0 text-sm text-on-dark-mute">{k}</span>
                    <div className="h-[3px] flex-1 rounded-full bg-white/10">
                      <div
                        className="h-[3px] rounded-full bg-hero-glow transition-all duration-700"
                        style={{ width: `${v * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-mono text-[12px] text-on-dark">{v.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {fund.partners.map((p) => (
            <Card key={p.name}>
              <div className="caption-tight text-ink">{p.name}</div>
              <Eyebrow className="mt-0.5">{p.focus}</Eyebrow>
              <p className="mt-2 text-sm leading-normal text-mute">{p.leans}</p>
            </Card>
          ))}

          <Card className="bg-bone">
            <Eyebrow>Institutional memory</Eyebrow>
            <p className="mt-2 text-sm leading-normal text-body">
              34 memos, 47 rejected deals, and 8 portfolio outcomes ingested. Upload new memos or past decisions to
              deepen the brain.
            </p>
            <Pill
              variant="dark"
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
