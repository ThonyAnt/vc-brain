import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import type { Company, Competitor } from '../../../lib/types'

const KIND_COLOR: Record<Competitor['kind'], string> = {
  incumbent: '#202020',
  direct: '#575757',
  adjacent: '#8d8d8d',
  emerging: '#2b9a66',
}

/* Deterministic quadrant placement: x = maturity (incumbent left, emerging right),
   y = proximity (direct high, adjacent low), jittered by name hash. */
function place(c: Competitor, i: number, total: number) {
  const xBase = { incumbent: 15, direct: 45, adjacent: 55, emerging: 82 }[c.kind]
  const yBase = { incumbent: 30, direct: 22, adjacent: 68, emerging: 55 }[c.kind]
  const spread = (i / Math.max(total - 1, 1) - 0.5) * 28
  return { x: xBase + spread * 0.4, y: yBase + spread }
}

export function MarketTab({ company }: { company: Company }) {
  const comps = company.competitors

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <Eyebrow>Competitor landscape</Eyebrow>
        <div className="relative mt-3 aspect-[4/3] rounded-card bg-bone">
          {/* axes */}
          <div className="absolute inset-x-4 top-1/2 border-t border-hairline" />
          <div className="absolute inset-y-4 left-1/2 border-l border-hairline" />
          <span className="caption absolute top-2 left-3 text-ash">direct</span>
          <span className="caption absolute bottom-2 left-3 text-ash">adjacent</span>
          <span className="caption absolute top-1/2 left-3 -translate-y-4 text-ash">incumbent</span>
          <span className="caption absolute top-1/2 right-3 -translate-y-4 text-ash">emerging</span>

          {comps.map((c, i) => {
            const p = place(c, i, comps.length)
            return (
              <div
                key={c.name}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <div className="mx-auto h-3 w-3 rounded-full" style={{ background: KIND_COLOR[c.kind] }} />
                <div className="mt-1 text-center text-[11px] leading-3 text-charcoal">{c.name}</div>
                <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 hidden w-44 -translate-x-1/2 rounded-card border border-hairline bg-card p-2 text-[11px] leading-4 text-body group-hover:block">
                  {c.note}
                </div>
              </div>
            )
          })}

          {/* the company itself — the one orange stamp */}
          <div className="absolute left-[63%] top-[38%] -translate-x-1/2 -translate-y-1/2">
            <div className="mx-auto h-4 w-4 rounded-full border border-hairline-strong bg-primary" />
            <div className="caption-tight mt-1 text-center text-ink">{company.name}</div>
          </div>

          {/* white space callout */}
          <div className="absolute right-[6%] bottom-[10%] w-36 rounded-card border border-dashed border-ash p-2">
            <span className="caption text-ash">white space</span>
            <div className="mt-1 text-[11px] leading-4 text-mute">emerging + adjacent, no funded player</div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {(['incumbent', 'direct', 'adjacent', 'emerging'] as const).map((kind) => {
          const list = comps.filter((c) => c.kind === kind)
          if (!list.length) return null
          return (
            <Card key={kind}>
              <div className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full" style={{ background: KIND_COLOR[kind] }} />
                <Eyebrow>{kind}</Eyebrow>
              </div>
              {list.map((c) => (
                <div key={c.name} className="mt-2">
                  <div className="caption-tight text-ink">{c.name}</div>
                  <div className="text-sm text-mute">{c.note}</div>
                </div>
              ))}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
