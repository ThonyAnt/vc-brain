import { useCallback, useEffect, useRef, useState } from 'react'
import { BrainCanvas, SECTOR_PALETTE, type BrainHandle } from '../../components/brain/BrainCanvas'
import { DotGridBackground } from '../../components/brain/DotGridBackground'
import { NodePanel } from '../../components/brain/NodePanel'
import { SourcingInbox } from '../../components/sourcing/SourcingInbox'
import { api } from '../../lib/api/client'
import type { FundGraph } from '../../lib/types'

/* HUD chips/hints use the mockup's mono uppercase voice (graph zone, not app chrome) */
const hudMono: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.66rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#6f7988',
}

export function BrainPage() {
  const [graph, setGraph] = useState<FundGraph | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const brainRef = useRef<BrainHandle>(null)

  useEffect(() => {
    api.getGraph().then(setGraph)
  }, [])

  const onSelect = useCallback((id: string | null) => setSelectedId(id), [])
  const onFeedback = useCallback((ids: string[]) => brainRef.current?.pulseNodes(ids), [])

  const markets = graph?.nodes.filter((n) => n.type === 'market') ?? []

  return (
    <div className="relative h-full overflow-hidden">
      <DotGridBackground />
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

      <div className="pointer-events-none absolute top-4 right-4 flex flex-col items-end gap-1.5">
        {markets.map((m, i) => (
          <span key={m.id} style={hudMono} className="flex items-center gap-1.5">
            <i
              className="inline-block h-[7px] w-[7px] rounded-full"
              style={{ background: SECTOR_PALETTE[i % SECTOR_PALETTE.length] }}
            />
            {m.label}
          </span>
        ))}
      </div>
      <div style={hudMono} className="pointer-events-none absolute right-4 bottom-4">
        drag orbit · scroll zoom · hover inspect · click focus · [ ] node size
      </div>
    </div>
  )
}
