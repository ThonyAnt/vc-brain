interface WeightSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
}

/**
 * A single criterion weight row for the dark "Criteria weights" card in edit
 * mode: a labelled 0–1 range slider (accent bg-hero-glow) with a live readout.
 */
export function WeightSlider({ label, value, onChange }: WeightSliderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-64 shrink-0 text-sm text-on-dark-mute">{label}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="flex-1 cursor-pointer accent-hero-glow"
      />
      <span className="code-sm w-10 text-right text-on-dark">{value.toFixed(2)}</span>
    </div>
  )
}
