import { useState } from 'react'
import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import type { Company } from '../../../lib/types'

interface Assumptions {
  annualGrowthPct: number
  growthDecayPct: number
  churnPct: number
  grossMarginPct: number
  exitMultiple: number
  yearsToExit: number
  checkSize: number
  valuation: number
  dilutionPct: number
}

function compute(arr0: number, a: Assumptions) {
  let arr = arr0
  let g = a.annualGrowthPct / 100
  for (let y = 0; y < a.yearsToExit; y++) {
    arr *= 1 + Math.max(g - a.churnPct / 100, 0)
    g *= 1 - a.growthDecayPct / 100
  }
  const exitValue = arr * a.exitMultiple
  const ownership = (a.checkSize / a.valuation) * (1 - a.dilutionPct / 100)
  const proceeds = exitValue * ownership
  const moic = proceeds / a.checkSize
  const irr = Math.pow(Math.max(moic, 0.0001), 1 / a.yearsToExit) - 1
  return { arr, exitValue, ownership, proceeds, moic, irr }
}

const fmt = (n: number) =>
  n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${(n / 1e3).toFixed(0)}k`

const FUND_SIZE = 60_000_000

const FIELDS: { key: keyof Assumptions; label: string; step: number }[] = [
  { key: 'annualGrowthPct', label: 'Annual growth %', step: 10 },
  { key: 'growthDecayPct', label: 'Growth decay %/yr', step: 5 },
  { key: 'churnPct', label: 'Churn %', step: 1 },
  { key: 'grossMarginPct', label: 'Gross margin %', step: 1 },
  { key: 'exitMultiple', label: 'Exit multiple (× ARR)', step: 1 },
  { key: 'yearsToExit', label: 'Years to exit', step: 1 },
  { key: 'checkSize', label: 'Check size $', step: 250_000 },
  { key: 'valuation', label: 'Entry valuation $', step: 1_000_000 },
  { key: 'dilutionPct', label: 'Future dilution %', step: 5 },
]

export function ModelTab({ company }: { company: Company }) {
  const m = company.model
  const [a, setA] = useState<Assumptions>({
    annualGrowthPct: 140,
    growthDecayPct: 25,
    churnPct: m?.churnPct ?? 3,
    grossMarginPct: m?.grossMarginPct ?? 75,
    exitMultiple: m?.exitMultiple ?? 8,
    yearsToExit: m?.yearsToExit ?? 7,
    checkSize: m?.checkSize ?? 2_000_000,
    valuation: m?.valuation ?? 15_000_000,
    dilutionPct: 30,
  })

  if (!m) {
    return (
      <Card>
        <Eyebrow>Model</Eyebrow>
        <p className="mt-2 text-body">No financial model yet — upload metrics or connect the data room to generate one.</p>
      </Card>
    )
  }

  const scenarios = {
    bear: compute(m.arr, { ...a, annualGrowthPct: a.annualGrowthPct * 0.6, exitMultiple: a.exitMultiple * 0.6, dilutionPct: a.dilutionPct + 10 }),
    base: compute(m.arr, a),
    bull: compute(m.arr, { ...a, annualGrowthPct: a.annualGrowthPct * 1.3, exitMultiple: a.exitMultiple * 1.4, dilutionPct: Math.max(a.dilutionPct - 10, 0) }),
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card>
        <Eyebrow>Assumptions</Eyebrow>
        <div className="mt-3 space-y-2.5">
          {FIELDS.map((f) => (
            <label key={f.key} className="flex items-center justify-between gap-3">
              <span className="text-sm text-charcoal">{f.label}</span>
              <input
                type="number"
                step={f.step}
                value={a[f.key]}
                onChange={(e) => setA({ ...a, [f.key]: Number(e.target.value) })}
                className="h-9 w-32 rounded-full border border-hairline bg-card px-4 text-right font-mono text-[12px] text-ink focus:outline-3 focus:outline-ring-focus"
              />
            </label>
          ))}
        </div>
        <div className="mt-4 border-t border-hairline pt-3">
          <Eyebrow>Current actuals</Eyebrow>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[12px] text-charcoal">
            <span>ARR {fmt(m.arr)}</span>
            <span>NRR {m.nrrPct}%</span>
            <span>CAC {fmt(m.cac)}</span>
            <span>Payback {m.cacPaybackMonths}mo</span>
            <span>Burn {fmt(m.burnMonthly)}/mo</span>
            <span>Runway {m.runwayMonths}mo</span>
          </div>
        </div>
      </Card>

      <div className="space-y-4 lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {(['bear', 'base', 'bull'] as const).map((k) => {
            const s = scenarios[k]
            const featured = k === 'base'
            return (
              <div
                key={k}
                className={`rounded-lg p-6 ${featured ? 'bg-dark text-on-dark' : 'border border-hairline bg-card text-ink'}`}
              >
                <span className={`eyebrow ${featured ? 'text-hero-glow' : 'text-mute'}`}>{k}</span>
                <div className="display-md mt-2">{s.moic.toFixed(1)}×</div>
                <div className={`mt-1 font-mono text-[12px] ${featured ? 'text-on-dark-mute' : 'text-charcoal'}`}>
                  IRR {(s.irr * 100).toFixed(0)}%
                </div>
                <div className={`mt-4 space-y-1 font-mono text-[12px] ${featured ? 'text-on-dark-mute' : 'text-charcoal'}`}>
                  <div className="flex justify-between"><span>ARR@exit</span><span>{fmt(s.arr)}</span></div>
                  <div className="flex justify-between"><span>Exit value</span><span>{fmt(s.exitValue)}</span></div>
                  <div className="flex justify-between"><span>Ownership</span><span>{(s.ownership * 100).toFixed(1)}%</span></div>
                  <div className="flex justify-between"><span>Proceeds</span><span>{fmt(s.proceeds)}</span></div>
                  <div className="flex justify-between"><span>% of fund</span><span>{((s.proceeds / FUND_SIZE) * 100).toFixed(0)}%</span></div>
                </div>
              </div>
            )
          })}
        </div>

        <Card className="bg-bone">
          <Eyebrow>Read</Eyebrow>
          <p className="mt-2 text-sm leading-normal text-body">
            Base case returns {((scenarios.base.proceeds / FUND_SIZE) * 100).toFixed(0)}% of the $60M fund on a{' '}
            {fmt(a.checkSize)} check. The bull case needs growth to hold near {Math.round(a.annualGrowthPct * 1.3)}%
            with an {Math.round(a.exitMultiple * 1.4)}× ARR exit — compare Corepay's realized path before trusting it.
            Edit any assumption to re-run all three scenarios.
          </p>
        </Card>
      </div>
    </div>
  )
}
