import { useState } from 'react'

/*
 * Neobrutal radar: 2px series strokes with low-alpha fills, recessive rings,
 * Space Mono axis labels, per-axis hover tooltip, legend chips, and a
 * collapsible data table (identity never rides on color alone).
 * All axes share one 0..1 scale — the one situation where a radar is honest.
 */

export interface RadarSeries {
  name: string
  color: string
  /** One value per axis, 0..1. */
  values: (number | undefined)[]
}

export function RadarChart({
  axes,
  series,
  size = 340,
}: {
  axes: string[]
  series: RadarSeries[]
  size?: number
}) {
  const [hover, setHover] = useState<number | null>(null)
  const cx = size / 2
  const cy = size / 2
  const R = size * 0.33
  const n = axes.length
  const PAD_X = 78
  const PAD_Y = 14

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2
  const pt = (i: number, v: number) => ({
    x: cx + Math.cos(angle(i)) * R * v,
    y: cy + Math.sin(angle(i)) * R * v,
  })

  const polygon = (values: (number | undefined)[]) =>
    values.map((v, i) => {
      const p = pt(i, Math.max(0, Math.min(1, v ?? 0)))
      return `${p.x},${p.y}`
    }).join(' ')

  const labelAnchor = (i: number) => {
    const c = Math.cos(angle(i))
    if (Math.abs(c) < 0.35) return 'middle'
    return c > 0 ? 'start' : 'end'
  }

  return (
    <div className="relative mx-auto max-w-[460px]">
      <svg
        width="100%"
        viewBox={`${-PAD_X} ${-PAD_Y} ${size + PAD_X * 2} ${size + PAD_Y * 2}`}
        role="img"
        aria-label="Similarity radar"
      >
        {/* recessive rings + spokes */}
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <polygon
            key={r}
            points={axes.map((_, i) => `${pt(i, r).x},${pt(i, r).y}`).join(' ')}
            fill="none"
            stroke="rgba(0,0,0,0.10)"
            strokeWidth={r === 1 ? 1.5 : 1}
          />
        ))}
        {axes.map((_, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={pt(i, 1).x}
            y2={pt(i, 1).y}
            stroke="rgba(0,0,0,0.10)"
            strokeWidth={1}
          />
        ))}

        {/* series polygons */}
        {series.map((s) => (
          <g key={s.name}>
            <polygon points={polygon(s.values)} fill={s.color} fillOpacity={0.12} stroke={s.color} strokeWidth={2} />
            {s.values.map((v, i) => {
              const p = pt(i, Math.max(0, Math.min(1, v ?? 0)))
              return <circle key={i} cx={p.x} cy={p.y} r={3} fill={s.color} stroke="#ffffff" strokeWidth={1.5} />
            })}
          </g>
        ))}

        {/* axis labels + hover targets */}
        {axes.map((label, i) => {
          const p = pt(i, 1.16)
          return (
            <g key={label}>
              <text
                x={p.x}
                y={p.y}
                textAnchor={labelAnchor(i)}
                dominantBaseline="middle"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fill: hover === i ? '#000000' : '#333333',
                  fontWeight: hover === i ? 700 : 400,
                }}
              >
                {label}
              </text>
              <line
                x1={cx}
                y1={cy}
                x2={pt(i, 1.12).x}
                y2={pt(i, 1.12).y}
                stroke="transparent"
                strokeWidth={22}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            </g>
          )
        })}
      </svg>

      {/* hover tooltip */}
      {hover !== null && (
        <div className="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2 border-2 border-hairline-strong bg-card px-3 py-2 shadow-brutal-sm">
          <div className="code-sm uppercase text-ink">{axes[hover]}</div>
          {series.map((s) => (
            <div key={s.name} className="mt-1 flex items-center gap-2">
              <i className="inline-block h-2.5 w-2.5 border border-hairline-strong" style={{ background: s.color }} />
              <span className="caption text-charcoal">{s.name}</span>
              <span className="code-sm ml-auto pl-3 text-ink">
                {s.values[hover] === undefined ? '—' : `${Math.round((s.values[hover] ?? 0) * 100)}%`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* legend */}
      <div className="mt-1 flex flex-wrap items-center gap-4">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <i className="inline-block h-2.5 w-2.5 border border-hairline-strong" style={{ background: s.color }} />
            <span className="caption text-charcoal">{s.name}</span>
          </span>
        ))}
      </div>

      {/* accessible table view */}
      <details className="mt-2">
        <summary className="code-sm cursor-pointer text-charcoal">data table</summary>
        <table className="mt-1 w-full border-collapse">
          <thead>
            <tr>
              <th className="code-sm border-b border-hairline py-1 text-left text-charcoal">Dimension</th>
              {series.map((s) => (
                <th key={s.name} className="code-sm border-b border-hairline py-1 text-right text-charcoal">
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {axes.map((label, i) => (
              <tr key={label}>
                <td className="caption py-1 text-ink">{label}</td>
                {series.map((s) => (
                  <td key={s.name} className="code-sm py-1 text-right text-ink">
                    {s.values[i] === undefined ? '—' : `${Math.round((s.values[i] ?? 0) * 100)}%`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  )
}
