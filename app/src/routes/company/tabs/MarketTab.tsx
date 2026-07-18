import { Card } from '../../../components/ui/Card'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import type { Company, Competitor } from '../../../lib/types'

/* kind → brutal fill: black incumbents, white directs, bone adjacents, yellow emergents */
const KIND_FILL: Record<Competitor['kind'], string> = {
  incumbent: 'bg-dark text-on-dark',
  direct: 'bg-card text-ink',
  adjacent: 'bg-bone text-ink',
  emerging: 'bg-hero-glow text-ink',
}

const CHIP_ROT = [-2, 1.5, -1, 2]

/* Deterministic quadrant placement: x = maturity (incumbent left, emerging right),
   y = proximity (direct high, adjacent low), spread along the diagonal. */
function place(c: Competitor, i: number, total: number) {
  const xBase = { incumbent: 24, direct: 44, adjacent: 56, emerging: 78 }[c.kind]
  const yBase = { incumbent: 32, direct: 20, adjacent: 70, emerging: 56 }[c.kind]
  const spread = (i / Math.max(total - 1, 1) - 0.5) * 30
  return { x: xBase + spread * 0.4, y: yBase + spread }
}

function AxisTag({ children, className }: { children: string; className: string }) {
  return (
    <span
      className={`code-sm absolute z-10 border-2 border-hairline-strong bg-dark px-2 py-0.5 uppercase text-on-dark ${className}`}
    >
      {children}
    </span>
  )
}

export function MarketTab({ company }: { company: Company }) {
  const comps = company.competitors

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <div className="flex items-baseline justify-between">
          <Eyebrow>Competitor landscape</Eyebrow>
          <span className="code-sm text-charcoal">{comps.length} tracked</span>
        </div>

        <div
          className="relative mt-3 aspect-[4/3] overflow-hidden border-2 border-hairline-strong bg-card"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.14) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          {/* axes */}
          <div className="absolute inset-x-0 top-1/2 border-t-2 border-hairline-strong" />
          <div className="absolute inset-y-0 left-1/2 border-l-2 border-hairline-strong" />
          <AxisTag className="top-2 left-1/2 -translate-x-1/2">direct</AxisTag>
          <AxisTag className="bottom-2 left-1/2 -translate-x-1/2">adjacent</AxisTag>
          <AxisTag className="top-1/2 left-2 -translate-y-1/2">incumbent</AxisTag>
          <AxisTag className="top-1/2 right-2 -translate-y-1/2">emerging</AxisTag>

          {comps.map((c, i) => {
            const p = place(c, i, comps.length)
            return (
              <div
                key={c.name}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <div
                  className={`code-sm cursor-default whitespace-nowrap border-2 border-hairline-strong px-2 py-0.5 shadow-brutal-sm transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${KIND_FILL[c.kind]}`}
                  style={{ transform: `rotate(${CHIP_ROT[i % CHIP_ROT.length]}deg)` }}
                >
                  {c.name}
                </div>
                <div className="pointer-events-none absolute top-full left-1/2 z-30 mt-2 hidden w-48 -translate-x-1/2 border-2 border-hairline-strong bg-card p-2 shadow-brutal group-hover:block">
                  <span className="caption text-body">{c.note}</span>
                </div>
              </div>
            )
          })}

          {/* the company itself — red sticker, top of the stack */}
          <div className="absolute top-[38%] left-[63%] z-30 -translate-x-1/2 -translate-y-1/2">
            <div
              className="caption-tight whitespace-nowrap border-2 border-hairline-strong bg-primary px-2.5 py-1 text-on-primary shadow-brutal"
              style={{ transform: 'rotate(-3deg)' }}
            >
              {company.name}
            </div>
          </div>

          {/* white space callout */}
          <div className="absolute right-[5%] bottom-[8%] w-40 border-2 border-dashed border-hairline-strong bg-card/80 p-2">
            <span className="code-sm uppercase text-ink">White space</span>
            <div className="caption mt-1 text-charcoal">emerging + adjacent, no funded player</div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {(['incumbent', 'direct', 'adjacent', 'emerging'] as const).map((kind) => {
          const list = comps.filter((c) => c.kind === kind)
          if (!list.length) return null
          return (
            <Card key={kind} className="p-0">
              <div className="flex items-center justify-between border-b-2 border-hairline-strong px-4 py-2">
                <span
                  className={`code-sm border-2 border-hairline-strong px-2 py-0.5 uppercase ${KIND_FILL[kind]}`}
                >
                  {kind}
                </span>
                <span className="code-sm text-charcoal">{list.length}</span>
              </div>
              <div className="space-y-3 p-4">
                {list.map((c) => (
                  <div key={c.name}>
                    <div className="caption-tight text-ink">{c.name}</div>
                    <div className="text-sm text-mute">{c.note}</div>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
