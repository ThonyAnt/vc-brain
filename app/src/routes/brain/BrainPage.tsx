import { useCallback, useEffect, useRef, useState } from 'react'
import { BrainCanvas, SECTOR_PALETTE, type BrainHandle } from '../../components/brain/BrainCanvas'
import { DotGridBackground } from '../../components/brain/DotGridBackground'
import { NodePanel } from '../../components/brain/NodePanel'
import { GlobeCard } from '../../components/geo/GlobeCard'
import { SourcingInbox } from '../../components/sourcing/SourcingInbox'
import { api } from '../../lib/api/client'
import type { Company, FundGraph } from '../../lib/types'
import type { LatLng } from '../../lib/geo'

/* HUD chips/hints: neobrutal mono voice (Space Mono, ink) */
const hudMono: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.66rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#333333',
}

export function BrainPage() {
  const [graph, setGraph] = useState<FundGraph | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sourced, setSourced] = useState<Company[]>([])
  const [hoverCity, setHoverCity] = useState<LatLng | null>(null)
  const brainRef = useRef<BrainHandle>(null)

  useEffect(() => {
    api.getGraph().then(setGraph)
    api.getSourcing().then(setSourced)
  }, [])

  const onSelect = useCallback((id: string | null) => setSelectedId(id), [])
  const onFeedback = useCallback((ids: string[]) => brainRef.current?.pulseNodes(ids), [])

  const markets = graph?.nodes.filter((n) => n.type === 'market') ?? []

  return (
    <div className="relative h-full overflow-hidden">
      <DotGridBackground />
      {graph && <BrainCanvas ref={brainRef} graph={graph} onSelect={onSelect} />}

      {/* HUD overlays */}
      <div className="pointer-events-none absolute inset-0 flex p-4 pl-24">
        {/* left rail: inbox stacks above the standing sourcing map */}
        <div className="flex h-full w-80 flex-col gap-3">
          <SourcingInbox
            onFocus={(id) => brainRef.current?.focusNode(id)}
            onFeedback={onFeedback}
            onHoverCity={setHoverCity}
          />
          <div className="mt-auto">
            <GlobeCard companies={sourced} focus={hoverCity} />
          </div>
        </div>
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
