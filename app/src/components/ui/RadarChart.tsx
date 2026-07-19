import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { curveCatmullRomClosed, curveLinearClosed, lineRadial, type CurveFactory } from 'd3-shape'

/*
 * Neobrutal spider chart (d3 lineRadial + Catmull-Rom closed curves): thick
 * series strokes that draw themselves in on mount, low-alpha fills, polygonal
 * tick rings with % labels, horizontal axis labels ringed around the plot,
 * in-chart legend, per-axis hover tooltip, and a collapsible data table.
 * All axes share one 0..1 scale — the one situation where a spider is honest.
 */

export interface RadarSeries {
  name: string
  color: string
  /** One value per axis, 0..1. */
  values: (number | undefined)[]
}

const TICKS = [0.2, 0.4, 0.6, 0.8, 1]

export function RadarChart({
  axes,
  series,
  size = 480,
}: {
  axes: string[]
  series: RadarSeries[]
  size?: number
}) {
  const [hover, setHover] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const n = axes.length
  const R = size * 0.335
  const half = size / 2

  const clamp = (v: number | undefined) => Math.max(0, Math.min(1, v ?? 0))
  const angleDeg = (i: number) => (360 * i) / n

  const radialPath = (values: (number | undefined)[], curve: CurveFactory) => {
    const gen = lineRadial<[number, number]>()
      .angle((d) => (2 * Math.PI * d[0]) / n)
      .radius((d) => R * d[1])
      .curve(curve)
    return gen(values.map((v, i) => [i, clamp(v)])) ?? ''
  }

  return (
    <div className="relative mx-auto max-w-[520px]">
      <motion.svg
        width="100%"
        viewBox={`-${half} -${half} ${size} ${size}`}
        role="img"
        aria-label="Similarity spider chart"
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* polygonal tick rings + % labels */}
        <g opacity={0.35}>
          {TICKS.map((t) => (
            <path
              key={t}
              d={radialPath(Array(n).fill(t), curveLinearClosed)}
              fill="none"
              stroke="#000000"
              strokeWidth={t === 1 ? 1.5 : 1}
            />
          ))}
          {TICKS.map((t) => (
            <text
              key={`l${t}`}
              x={5}
              y={-R * t + 3}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fill: '#333333' }}
            >
              {Math.round(t * 100)}
            </text>
          ))}
        </g>

        {/* axis spokes (first tick → rim) */}
        <g opacity={0.35}>
          {axes.map((_, i) => (
            <path
              key={i}
              d={`M 0 ${-R * TICKS[0]} V ${-R}`}
              fill="none"
              stroke="#000000"
              strokeWidth={1}
              transform={`rotate(${angleDeg(i)})`}
            />
          ))}
        </g>

        {/* axis labels — positioned around the ring, kept horizontal */}
        {axes.map((label, i) => (
          <text
            key={label}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${angleDeg(i)}) translate(0 ${-(R + 28)}) rotate(${-angleDeg(i)})`}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fill: hover === i ? '#000000' : '#333333',
              fontWeight: hover === i ? 700 : 400,
            }}
          >
            {label}
          </text>
        ))}

        {/* series: fills fade in, thick strokes draw themselves */}
        {series.map((s, si) => (
          <g key={s.name}>
            <motion.path
              d={radialPath(s.values, curveCatmullRomClosed)}
              fill={s.color}
              stroke="none"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 0.18 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : 0.75 + si * 0.3 }}
            />
            <motion.path
              d={radialPath(s.values, curveCatmullRomClosed)}
              fill="none"
              stroke={s.color}
              strokeWidth={4}
              strokeLinejoin="round"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.05, delay: reduced ? 0 : 0.25 + si * 0.3, ease: 'easeInOut' }}
            />
          </g>
        ))}

        {/* in-chart legend, top-left */}
        <g transform={`translate(${-half + 8} ${-half + 14})`}>
          {series.map((s, i) => (
            <g key={s.name} transform={`translate(0 ${i * 20})`}>
              <rect x={0} y={-6} width={11} height={11} fill={s.color} stroke="#000000" strokeWidth={1.5} />
              <text
                x={17}
                y={4}
                style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fill: '#000000' }}
              >
                {s.name}
              </text>
            </g>
          ))}
        </g>

        {/* per-axis hover targets */}
        {axes.map((_, i) => (
          <path
            key={`h${i}`}
            d={`M 0 0 V ${-(R + 20)}`}
            stroke="transparent"
            strokeWidth={26}
            fill="none"
            transform={`rotate(${angleDeg(i)})`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </motion.svg>

      {/* hover tooltip */}
      {hover !== null && (
        <div className="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2 border-2 border-hairline-strong bg-card px-3 py-2 shadow-brutal-sm">
          <div className="code-sm uppercase text-ink">{axes[hover]}</div>
          {series.map((s) => (
            <div key={s.name} className="mt-1 flex items-center gap-2">
              <i className="inline-block h-2.5 w-2.5 border border-hairline-strong" style={{ background: s.color }} />
              <span className="caption text-charcoal">{s.name}</span>
              <span className="code-sm ml-auto pl-3 text-ink">
                {s.values[hover] === undefined ? '—' : `${Math.round(clamp(s.values[hover]) * 100)}%`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* accessible table view */}
      <details className="mt-1">
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
                    {s.values[i] === undefined ? '—' : `${Math.round(clamp(s.values[i]) * 100)}%`}
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
