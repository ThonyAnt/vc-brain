interface WeightSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
}

const CELLS = 20 // 0.05 per cell — matches the stored weight granularity

/*
 * Neobrutal weight editor: the same segmented block meter as view mode, but
 * the cells are buttons — click a cell to set the weight there; click the
 * last filled cell to step down. A hidden range input keeps keyboard + SR
 * access (tab to the row, arrows to adjust).
 */
export function WeightSlider({ label, value, onChange }: WeightSliderProps) {
  const filled = Math.round(value * CELLS)
  return (
    <div className="flex items-center gap-3">
      <span className="w-64 shrink-0 text-sm text-body">{label}</span>
      <div className="relative flex h-5 flex-1">
        {Array.from({ length: CELLS }, (_, i) => (
          <button
            type="button"
            key={i}
            tabIndex={-1}
            aria-hidden
            onClick={() => onChange(filled === i + 1 ? i / CELLS : (i + 1) / CELLS)}
            className={`-ml-[2px] flex-1 cursor-pointer border-2 border-hairline-strong transition-colors first:ml-0 ${
              i < filled ? 'bg-secondary hover:bg-hero-glow' : 'bg-card hover:bg-bone'
            }`}
          />
        ))}
        <input
          type="range"
          min={0}
          max={1}
          step={1 / CELLS}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="pointer-events-none absolute inset-0 w-full opacity-0"
        />
      </div>
      <span className="code-sm w-10 text-right text-ink">{value.toFixed(2)}</span>
    </div>
  )
}
