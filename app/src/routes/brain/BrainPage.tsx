import { useCallback, useEffect, useRef, useState } from 'react'
import { BrainCanvas, SECTOR_PALETTE, type BrainHandle } from '../../components/brain/BrainCanvas'
import { DotGridBackground } from '../../components/brain/DotGridBackground'
import { NodePanel } from '../../components/brain/NodePanel'
import { GlobeCard } from '../../components/geo/GlobeCard'
import { SourcingInbox } from '../../components/sourcing/SourcingInbox'
import { api } from '../../lib/api/client'
import type { Company, FundGraph, GraphEdge, GraphNode } from '../../lib/types'
import type { LatLng } from '../../lib/geo'

/* Turn freshly web-discovered companies into graph nodes + edges: each joins the
   market cluster matching its sector and links to its closest prior winner. */
function discoveredToGraph(companies: Company[], graph: FundGraph): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const markets = graph.nodes.filter((n) => n.type === 'market')
  const marketFor = (sector: string) => {
    const s = sector.toLowerCase()
    const hit = markets.find((m) => s.includes(m.label.toLowerCase()) || m.label.toLowerCase().includes(s))
    return hit ?? markets[0]
  }
  const existing = new Set(graph.nodes.map((n) => n.id))
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  for (const c of companies) {
    if (existing.has(c.id)) continue
    existing.add(c.id)
    const mkt = marketFor(c.sector)
    const anchor = mkt?.position ?? [0, 0, 0]
    let hash = 2166136261
    for (const char of c.id) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
    const jitter = (shift: number) => ((((hash >>> shift) & 255) / 255) - 0.5) * 28
    nodes.push({
      id: c.id,
      type: 'sourced',
      label: c.name,
      score: c.fitScore,
      position: [anchor[0] + jitter(0), anchor[1] + jitter(8) * 0.7, anchor[2] + jitter(16)],
    })
    if (mkt) edges.push({ source: c.id, target: mkt.id, kind: 'market', weight: 0.4 })
    for (const a of c.analogues) {
      if (a.kind === 'portfolio' && graph.nodes.some((n) => n.id === a.companyId))
        edges.push({ source: c.id, target: a.companyId, kind: 'precedent', weight: 0.8 })
    }
  }
  return { nodes, edges }
}

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
  const pendingDiscovered = useRef<string[]>([])

  useEffect(() => {
    api.getGraph().then(setGraph)
    api.getSourcing().then(setSourced)
  }, [])

  const onSelect = useCallback((id: string | null) => setSelectedId(id), [])
  const onFeedback = useCallback((ids: string[]) => brainRef.current?.pulseNodes(ids), [])

  /* Web discovery: fold new companies into the graph, then pulse + fly to them. */
  const onDiscover = useCallback((companies: Company[]) => {
    setSourced((previous) => {
      const known = new Set(previous.map((company) => company.id))
      return [...companies.filter((company) => !known.has(company.id)), ...previous]
    })
    setGraph((prev) => {
      if (!prev) return prev
      const { nodes, edges } = discoveredToGraph(companies, prev)
      if (!nodes.length) return prev
      pendingDiscovered.current = nodes.map((n) => n.id)
      return { ...prev, nodes: [...prev.nodes, ...nodes], edges: [...prev.edges, ...edges] }
    })
  }, [])

  // After the canvas rebuilds with the new nodes, highlight and fly to them.
  useEffect(() => {
    if (!graph || pendingDiscovered.current.length === 0) return
    const ids = pendingDiscovered.current
    pendingDiscovered.current = []
    brainRef.current?.pulseNodes(ids)
    if (ids[0]) brainRef.current?.focusNode(ids[0])
  }, [graph])

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
            onDiscover={onDiscover}
            onHoverCity={setHoverCity}
          />
          <GlobeCard companies={sourced} focus={hoverCity} />
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

      {/* sector legend yields the corner while a company card is open */}
      {!selectedId && (
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
      )}
      <div style={hudMono} className="pointer-events-none absolute right-4 bottom-4">
        drag orbit · scroll zoom · hover inspect · click focus · [ ] node size
      </div>
    </div>
  )
}
