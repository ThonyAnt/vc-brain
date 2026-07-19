import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

export type GraphAxisKey =
  | 'fit'
  | 'arr'
  | 'winner_similarity'
  | 'rejection_similarity'
  | 'valuation'

export type GraphAxes = [GraphAxisKey, GraphAxisKey, GraphAxisKey]
export type GraphMode = 'original' | 'custom'

export const GRAPH_AXIS_OPTIONS: { key: GraphAxisKey; label: string }[] = [
  { key: 'fit', label: 'Fund fit' },
  { key: 'winner_similarity', label: 'Similarity to winners' },
  { key: 'rejection_similarity', label: 'Similarity to passes' },
  { key: 'arr', label: 'ARR' },
  { key: 'valuation', label: 'Valuation' },
]

interface Props {
  mode: GraphMode
  axes: GraphAxes
  options: typeof GRAPH_AXIS_OPTIONS
  onModeChange: (mode: GraphMode) => void
  onAxesChange: (axes: GraphAxes) => void
}

export function GraphViewTabs({ mode, axes, options, onModeChange, onAxesChange }: Props) {
  const [editorOpen, setEditorOpen] = useState(false)

  return (
    <div className="pointer-events-auto absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
      {mode === 'custom' && editorOpen && (
        <div className="absolute bottom-[calc(100%+0.55rem)] left-1/2 w-[min(34rem,calc(100vw-8rem))] -translate-x-1/2 border-2 border-hairline-strong bg-white p-3 shadow-brutal">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs font-semibold text-mute">Custom graph axes</div>
            <button
              type="button"
              onClick={() => setEditorOpen(false)}
              className="grid h-7 w-7 place-items-center text-mute hover:bg-bone hover:text-ink"
              aria-label="Close axis editor"
            >
              <X aria-hidden="true" size={15} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['X', 'Y', 'Z'] as const).map((axis, index) => (
              <label key={axis} className="min-w-0">
                <span className="mb-1 block text-xs font-semibold text-ink">{axis} axis</span>
                <select
                  value={axes[index]}
                  onChange={(event) => {
                    const next = [...axes] as GraphAxes
                    next[index] = event.target.value as GraphAxisKey
                    onAxesChange(next)
                  }}
                  className="h-9 w-full min-w-0 border-2 border-hairline-strong bg-card px-2 text-xs font-semibold text-ink outline-none focus:border-primary"
                >
                  {options.map((option) => (
                    <option key={option.key} value={option.key} disabled={axes.includes(option.key) && axes[index] !== option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex h-11 items-stretch border-2 border-hairline-strong bg-white shadow-brutal-sm">
        <button
          type="button"
          onClick={() => {
            setEditorOpen(false)
            onModeChange('original')
          }}
          className={`border-r-2 border-hairline-strong px-5 text-sm font-semibold ${mode === 'original' ? 'bg-dark text-on-dark' : 'text-ink hover:bg-bone'}`}
        >
          Original graph
        </button>
        <button
          type="button"
          onClick={() => {
            onModeChange('custom')
            setEditorOpen(true)
          }}
          className={`flex items-center gap-2 px-5 text-sm font-semibold ${mode === 'custom' ? 'bg-dark text-on-dark' : 'text-ink hover:bg-bone'}`}
        >
          Custom axes
          <SlidersHorizontal aria-hidden="true" size={14} />
        </button>
      </div>
    </div>
  )
}
