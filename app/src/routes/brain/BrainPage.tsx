import { useCallback, useEffect, useRef, useState } from 'react'
import { BrainCanvas, ROLE_COLORS, type BrainHandle } from '../../components/brain/BrainCanvas'
import { NodePanel } from '../../components/brain/NodePanel'
import { StarsBackground } from '../../components/brain/StarsBackground'
import { SourcingInbox } from '../../components/sourcing/SourcingInbox'
import { api } from '../../lib/api/client'
import type { FundGraph } from '../../lib/types'

const LEGEND = [
  { label: 'Sourced', role: 'sourced' },
  { label: 'Portfolio', role: 'portfolio' },
  { label: 'Rejected', role: 'rejected' },
  { label: 'Founders', role: 'founder' },
  { label: 'Tracked', role: 'tracked' },
]

export function BrainPage() {
  const [graph, setGraph] = useState<FundGraph | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const brainRef = useRef<BrainHandle>(null)

  useEffect(() => {
    api.getGraph().then(setGraph)
  }, [])

  const onSelect = useCallback((id: string | null) => setSelectedId(id), [])
  const onFeedback = useCallback((ids: string[]) => brainRef.current?.pulseNodes(ids), [])

  return (
    <div className="relative h-full overflow-hidden bg-canvas">
      <StarsBackground />
      {graph && <BrainCanvas ref={brainRef} graph={graph} onSelect={onSelect} />}

      {/* HUD overlays */}
      <div className="pointer-events-none absolute inset-0 flex p-4">
        <SourcingInbox onFocus={(id) => brainRef.current?.focusNode(id)} onFeedback={onFeedback} />
        <div className="flex-1" />
        {selectedId && (
          <NodePanel
            selectedId={selectedId}
            onClose={() => {
              setSelectedId(null)
              brainRef.current?.clearFocus()
            }}
            onFeedback={onFeedback}
          />
        )}
      </div>

      <div className="pointer-events-none absolute bottom-4 left-88 flex items-center gap-4">
        {LEGEND.map((l) => (
          <span key={l.role} className="eyebrow flex items-center gap-1.5 text-mute">
            <i className="inline-block h-2 w-2 rounded-full" style={{ background: ROLE_COLORS[l.role] }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  )
}
