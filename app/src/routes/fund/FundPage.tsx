import { useEffect, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { Pill } from '../../components/ui/Pill'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { api } from '../../lib/api/client'
import { GlobeCard } from '../../components/geo/GlobeCard'
import type { Company, CriteriaWeights, FundProfile } from '../../lib/types'
import { useAppStore } from '../../state/store'
import { partnerDisplay } from '../../lib/partnerPersonas'
import { ChipEditor } from './ChipEditor'
import { WeightSlider } from './WeightSlider'

/* Backend CompanyStage enum values -> display labels. */
const STAGE_OPTIONS: [string, string][] = [
  ['pre_seed', 'Pre-seed'],
  ['seed', 'Seed'],
  ['series_a', 'Series A'],
  ['series_b', 'Series B'],
  ['series_c_plus', 'Series C+'],
  ['growth', 'Growth'],
]
const stageLabel = (v: string) => STAGE_OPTIONS.find(([id]) => id === v)?.[1] ?? v

interface Draft {
  thesis: string
  checkSizeMin: number
  checkSizeMax: number
  stages: string[]
  sectors: string[]
  geographies: string[]
  weights: CriteriaWeights
  /** Frozen slider order captured on edit-start so rows don't reshuffle mid-drag. */
  weightOrder: string[]
}

export function FundPage() {
  const [fund, setFund] = useState<FundProfile | null>(null)
  const [sourced, setSourced] = useState<Company[]>([])
  const [baseWeights, setBaseWeights] = useState<CriteriaWeights>({})
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)
  const liveWeights = useAppStore((s) => s.weights)
  const setWeights = useAppStore((s) => s.setWeights)
  const setLearningNote = useAppStore((s) => s.setLearningNote)

  useEffect(() => {
    api.getFund().then(setFund)
    api.getSourcing().then(setSourced)
    api.getGraph().then((g) => setBaseWeights(g.weights))
  }, [])

  if (!fund) return null
  const weights = liveWeights ?? baseWeights
  const isEditing = draft !== null

  const startEdit = () => {
    const order = Object.keys(weights).sort((a, b) => weights[b] - weights[a])
    setDraft({
      thesis: fund.thesis,
      checkSizeMin: fund.checkSizeMin ?? 0,
      checkSizeMax: fund.checkSizeMax ?? 0,
      stages: [...fund.stages],
      sectors: [...fund.sectors],
      geographies: [...fund.geographies],
      weights: { ...weights },
      weightOrder: order,
    })
  }
  const cancelEdit = () => setDraft(null)

  const save = async () => {
    if (!draft) return
    setSaving(true)
    const view = await api.updateFund({
      thesis: draft.thesis,
      checkSizeMin: draft.checkSizeMin,
      checkSizeMax: draft.checkSizeMax,
      stages: draft.stages,
      sectors: draft.sectors,
      geographies: draft.geographies,
      weights: draft.weights,
    })
    setSaving(false)
    if (!view) {
      setLearningNote('Brain API unreachable — profile not saved.')
      setDraft(null)
      return
    }
    setWeights(view.weights)
    setFund(await api.getFund())
    setDraft(null)
    setLearningNote('Fund profile updated — future sourcing and ranking will use it.')
  }

  const patchDraft = (patch: Partial<Draft>) => setDraft((d) => (d ? { ...d, ...patch } : d))

  return (
    <div className="mx-auto max-w-[1280px] p-8 pb-28">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Eyebrow>Fund profile</Eyebrow>
          <h1 className="display-lg mt-2">{fund.name}</h1>
        </div>
        <div className="mt-2 flex shrink-0 gap-2">
          {isEditing ? (
            <>
              <Pill variant="ghost" onClick={cancelEdit} disabled={saving}>
                Cancel
              </Pill>
              <Pill variant="primary" onClick={save} disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </Pill>
            </>
          ) : (
            <Pill variant="outline" onClick={startEdit}>
              Edit profile
            </Pill>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <Eyebrow>Thesis</Eyebrow>
            {isEditing && draft ? (
              <textarea
                value={draft.thesis}
                onChange={(e) => patchDraft({ thesis: e.target.value })}
                rows={4}
                className="mt-2 w-full rounded-none border border-hairline-strong bg-canvas p-3 text-lg text-body outline-none focus:border-ink"
              />
            ) : (
              <p className="mt-2 text-lg text-body">{fund.thesis}</p>
            )}

            <div className="mt-4">
              {isEditing && draft ? (
                <div className="space-y-3">
                  <div>
                    <Eyebrow>Sectors</Eyebrow>
                    <div className="mt-1.5">
                      <ChipEditor
                        values={draft.sectors}
                        onChange={(sectors) => patchDraft({ sectors })}
                        placeholder="Add sector…"
                      />
                    </div>
                  </div>
                  <div>
                    <Eyebrow>Geographies</Eyebrow>
                    <div className="mt-1.5">
                      <ChipEditor
                        values={draft.geographies}
                        onChange={(geographies) => patchDraft({ geographies })}
                        placeholder="Add geography…"
                        tone="charcoal"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {fund.sectors.map((s) => (
                    <span key={s} className="rounded-none border border-hairline-strong bg-canvas px-2.5 py-1 caption text-ink">
                      {s}
                    </span>
                  ))}
                  {fund.geographies.map((g) => (
                    <span key={g} className="rounded-none border border-hairline-strong bg-canvas px-2.5 py-1 caption text-charcoal">
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
              <div>
                <Eyebrow>Check size</Eyebrow>
                {isEditing && draft ? (
                  <div className="mt-1 flex items-center gap-2">
                    <MoneyInput
                      value={draft.checkSizeMin}
                      onChange={(checkSizeMin) => patchDraft({ checkSizeMin })}
                    />
                    <span className="text-charcoal">–</span>
                    <MoneyInput
                      value={draft.checkSizeMax}
                      onChange={(checkSizeMax) => patchDraft({ checkSizeMax })}
                    />
                  </div>
                ) : (
                  <div className="caption-tight mt-1 text-ink">{fund.checkSize}</div>
                )}
              </div>
              <div>
                <Eyebrow>Stages</Eyebrow>
                {isEditing && draft ? (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {STAGE_OPTIONS.map(([id, label]) => {
                      const on = draft.stages.includes(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() =>
                            patchDraft({
                              stages: on ? draft.stages.filter((s) => s !== id) : [...draft.stages, id],
                            })
                          }
                          className={`rounded-none border px-2.5 py-1 caption transition-colors ${
                            on
                              ? 'border-hairline-strong bg-dark text-on-dark'
                              : 'border-hairline-strong bg-canvas text-charcoal hover:bg-bone'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="caption-tight mt-1 text-ink">{fund.stages.map(stageLabel).join(' · ')}</div>
                )}
              </div>
            </div>
          </Card>

          <GlobeCard companies={sourced} globeHeight="h-[420px]" />

          <Card>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="code-sm uppercase tracking-[0.12em] text-ink">Criteria weights</span>
                <span className="caption-tight border-2 border-hairline-strong bg-primary px-1.5 py-0.5 text-on-primary">
                  LIVE
                </span>
              </span>
              <span className="code-sm text-charcoal">
                {isEditing ? 'click cells to re-weight' : 'updates with every decision'}
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              {isEditing && draft
                ? draft.weightOrder.map((k) => (
                    <WeightSlider
                      key={k}
                      label={k}
                      value={draft.weights[k]}
                      onChange={(v) => patchDraft({ weights: { ...draft.weights, [k]: v } })}
                    />
                  ))
                : Object.entries(weights)
                    .sort((a, b) => b[1] - a[1])
                    .map(([k, v]) => (
                      <div key={k} className="flex items-center gap-3">
                        <span className="w-64 shrink-0 text-sm text-body">{k}</span>
                        <div className="flex h-3.5 flex-1">
                          {Array.from({ length: 20 }, (_, i) => (
                            <i
                              key={i}
                              className={`-ml-[2px] flex-1 border-2 border-hairline-strong transition-colors duration-500 first:ml-0 ${
                                i < Math.round(v * 20) ? 'bg-secondary' : 'bg-card'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="code-sm w-10 text-right text-ink">{v.toFixed(2)}</span>
                      </div>
                    ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {fund.partners.map((p, i) => {
            const { name, photo, background } = partnerDisplay(p.name, i)
            return (
              <ExpandableCard
                key={name}
                title={name}
                description={p.focus}
                src={photo}
                imageClassName={name === 'David Chen' || name === 'Priya Nair' ? 'object-top' : undefined}
                classNameExpanded="[&_h4]:text-ink [&_h4]:font-semibold"
              >
                <h4>Investment lens</h4>
                <p>{p.leans}</p>
                <h4>Background</h4>
                <p>{background}</p>
                <h4>Focus</h4>
                <p>{p.focus}</p>
                <h4>In committee</h4>
                <p>
                  The brain models {name.split(' ')[0]}'s likely stance on each deal from their historical
                  votes and the lens above — see the partner-fit readout on any company page.
                </p>
              </ExpandableCard>
            )
          })}

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

/** Dollar input shown in $M; stores the raw USD value. */
function MoneyInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <span className="inline-flex items-center border border-hairline-strong bg-canvas">
      <span className="pl-2 text-charcoal">$</span>
      <input
        type="number"
        min={0}
        step={0.1}
        value={value ? value / 1_000_000 : 0}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)) * 1_000_000)}
        className="w-16 bg-transparent px-1 py-1 caption-tight text-ink outline-none"
      />
      <span className="pr-2 text-charcoal">M</span>
    </span>
  )
}
