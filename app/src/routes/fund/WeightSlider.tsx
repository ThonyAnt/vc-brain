interface WeightSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
}

/*
 * Neobrutal weight control: the bar IS the slider. Same chunky yellow-on-black
 * bar as view mode, plus a square die-cut thumb; a transparent native range
 * input overlays the bar so drag + keyboard + a11y come for free.
 */
export function WeightSlider({ label, value, onChange }: WeightSliderProps) {
  const pct = value * 100
  return (
    <div className="flex items-center gap-3">
      <span className="w-64 shrink-0 text-sm text-on-dark-mute">{label}</span>
      <div className="relative h-5 flex-1">
        {/* track + fill, vertically centered */}
        <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 border border-divider-dark bg-black">
          <div className="h-full bg-hero-glow" style={{ width: `${pct}%` }} />
        </div>
        {/* die-cut square thumb at the fill edge */}
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-3 -translate-x-1/2 -translate-y-1/2 border-2 border-black bg-hero-glow"
          style={{ left: `${pct}%`, boxShadow: '0 0 0 2px #ffffff' }}
        />
        {/* the real control, invisible on top */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 w-full cursor-ew-resize opacity-0"
        />
      </div>
      <span className="code-sm w-10 text-right text-on-dark">{value.toFixed(2)}</span>
    </div>
  )
}
