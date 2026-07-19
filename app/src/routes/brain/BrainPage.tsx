import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { BrainCanvas, SECTOR_PALETTE, type BrainHandle } from '../../components/brain/BrainCanvas'
import { DotGridBackground } from '../../components/brain/DotGridBackground'
import {
  GRAPH_AXIS_OPTIONS,
  GraphViewTabs,
  type GraphAxes,
  type GraphAxisKey,
  type GraphMode,
} from '../../components/brain/GraphViewTabs'
import { NodePanel } from '../../components/brain/NodePanel'
import { SourcingInbox } from '../../components/sourcing/SourcingInbox'
import { api } from '../../lib/api/client'
import type { Company, FundGraph, GraphEdge, GraphNode } from '../../lib/types'

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

/* HUD chips/hints: compact labels in the site's original DM Sans. */
const hudMono: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.66rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#333333',
}

const GRAPH_AXES_STORAGE_KEY = 'vcbrain-custom-graph-axes-v2'
const DEFAULT_CUSTOM_AXES: GraphAxes = ['fit', 'winner_similarity', 'rejection_similarity']
const PREFERRED_AXIS_ORDER: GraphAxisKey[] = ['fit', 'winner_similarity', 'rejection_similarity', 'arr', 'valuation']
const AXIS_SPAN = 124

function loadCustomAxes(): GraphAxes {
  try {
    const saved = JSON.parse(localStorage.getItem(GRAPH_AXES_STORAGE_KEY) ?? 'null') as GraphAxes | null
    const validKeys = new Set(GRAPH_AXIS_OPTIONS.map((option) => option.key))
    if (saved?.length === 3 && new Set(saved).size === 3 && saved.every((key) => validKeys.has(key))) return saved
  } catch {
    // Ignore stale or manually edited browser state.
  }
  return DEFAULT_CUSTOM_AXES
}

function pickAvailableAxes(available: Iterable<GraphAxisKey>): GraphAxes {
  const keys = new Set(available)
  const picked = PREFERRED_AXIS_ORDER.filter((key) => keys.has(key)).slice(0, 3)
  return (picked.length === 3 ? picked : DEFAULT_CUSTOM_AXES) as GraphAxes
}

function axisValue(company: Company | undefined, axis: GraphAxisKey): number | undefined {
  if (!company) return undefined
  if (axis === 'fit') return company.fitScore
  if (axis === 'arr') return company.model?.arr
  if (axis === 'winner_similarity') return company.fitBreakdown?.similarityToWinners
  if (axis === 'rejection_similarity') return company.fitBreakdown?.similarityToRejected
  return company.model?.valuation
}

function plottedAxisValue(company: Company | undefined, axis: GraphAxisKey): number | undefined {
  const value = axisValue(company, axis)
  if (value === undefined) return undefined
  return axis === 'arr' || axis === 'valuation' ? Math.log10(Math.max(value, 1)) : value
}

function informativeAxisOptions(companies: Company[]) {
  if (!companies.length) return GRAPH_AXIS_OPTIONS.filter((option) => DEFAULT_CUSTOM_AXES.includes(option.key))
  const minimumUniqueValues = Math.min(8, Math.max(4, Math.round(companies.length * 0.05)))
  return GRAPH_AXIS_OPTIONS.filter((option) => {
    const values = companies.map((company) => plottedAxisValue(company, option.key)).filter((value): value is number => value !== undefined)
    const coverage = values.length / companies.length
    const uniqueValues = new Set(values.map((value) => value.toPrecision(8))).size
    return coverage >= 0.8 && uniqueValues >= minimumUniqueValues
  })
}

function rankAxisPositions(values: Array<number | undefined>): number[] {
  const ranked = values
    .map((value, index) => ({ value, index }))
    .filter((entry): entry is { value: number; index: number } => entry.value !== undefined && Number.isFinite(entry.value))
    .sort((a, b) => a.value - b.value || a.index - b.index)

  const positions = values.map(() => 0)
  if (!ranked.length) return positions

  let start = 0
  while (start < ranked.length) {
    let end = start + 1
    while (end < ranked.length && ranked[end].value === ranked[start].value) end += 1
    const avgRank = (start + end - 1) / 2
    const t = ranked.length === 1 ? 0.5 : avgRank / (ranked.length - 1)
    const coordinate = (t - 0.5) * AXIS_SPAN
    for (let i = start; i < end; i += 1) positions[ranked[i].index] = coordinate
    start = end
  }
  return positions
}

function graphForAxes(graph: FundGraph, companies: Company[], axes: GraphAxes): FundGraph {
  const companyById = new Map(companies.map((company) => [company.id, company]))
  const companyNodes = graph.nodes.filter((node) => node.type === 'portfolio' || node.type === 'rejected' || node.type === 'sourced')
  const axisPositions = axes.map((axis) =>
    rankAxisPositions(companyNodes.map((node) => plottedAxisValue(companyById.get(node.id), axis))),
  )
  const positionById = new Map(
    companyNodes.map((node, index) => [
      node.id,
      axisPositions.map((positions) => positions[index] ?? 0) as [number, number, number],
    ]),
  )

  return {
    ...graph,
    nodes: graph.nodes.filter((node) => node.type !== 'founder').map((node) => {
      const position = positionById.get(node.id)
      return position ? { ...node, position } : node
    }),
    edges: graph.edges.filter((edge) => edge.kind !== 'founder'),
  }
}

export function BrainPage() {
  const [graph, setGraph] = useState<FundGraph | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [companies, setCompanies] = useState<Company[]>([])
  const [graphMode, setGraphMode] = useState<GraphMode>('original')
  const [customAxes, setCustomAxes] = useState<GraphAxes>(loadCustomAxes)
  const brainRef = useRef<BrainHandle>(null)
  const pendingDiscovered = useRef<string[]>([])
  const searchFocusedId = useRef<string | null>(null)

  useEffect(() => {
    api.getGraph().then(setGraph)
    api.getCompanies().then(setCompanies)
  }, [])

  const onSelect = useCallback((id: string | null) => setSelectedId(id), [])
  const onFeedback = useCallback((ids: string[]) => brainRef.current?.pulseNodes(ids), [])

  /* Web discovery: fold new companies into the graph, then pulse + fly to them. */
  const onDiscover = useCallback((companies: Company[]) => {
    setCompanies((previous) => {
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
  const availableAxisOptions = useMemo(() => informativeAxisOptions(companies), [companies])
  const displayedGraph = useMemo(
    () => graph && graphMode === 'custom' ? graphForAxes(graph, companies, customAxes) : graph,
    [companies, customAxes, graph, graphMode],
  )
  const searchableCompanies = useMemo(
    () => graph?.nodes.filter((n) => n.type === 'portfolio' || n.type === 'rejected' || n.type === 'sourced') ?? [],
    [graph],
  )
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
  const searchMatches = useMemo(
    () => normalizedQuery
      ? searchableCompanies.filter((node) => node.label.toLocaleLowerCase().includes(normalizedQuery))
      : [],
    [normalizedQuery, searchableCompanies],
  )

  useEffect(() => {
    if (!normalizedQuery) {
      brainRef.current?.highlightNodes(null)
      if (searchFocusedId.current) brainRef.current?.clearFocus()
      searchFocusedId.current = null
      return
    }

    const ids = searchMatches.map((node) => node.id)
    brainRef.current?.highlightNodes(ids)
    if (ids.length === 1) {
      if (searchFocusedId.current !== ids[0]) brainRef.current?.focusNode(ids[0])
      searchFocusedId.current = ids[0]
    } else if (searchFocusedId.current) {
      brainRef.current?.clearFocus()
      searchFocusedId.current = null
      brainRef.current?.highlightNodes(ids)
    }
  }, [customAxes, graphMode, normalizedQuery, searchMatches])

  useEffect(() => {
    localStorage.setItem(GRAPH_AXES_STORAGE_KEY, JSON.stringify(customAxes))
  }, [customAxes])

  useEffect(() => {
    if (availableAxisOptions.length < 3) return
    const available = new Set(availableAxisOptions.map((option) => option.key))
    if (customAxes.every((axis) => available.has(axis))) return
    setCustomAxes(pickAvailableAxes(available))
  }, [availableAxisOptions, customAxes])

  const customAxisLabels = customAxes.map((key) => GRAPH_AXIS_OPTIONS.find((option) => option.key === key)?.label ?? key) as [string, string, string]

  return (
    <div className="relative h-full overflow-hidden">
      <DotGridBackground />
      {displayedGraph && (
        <BrainCanvas
          ref={brainRef}
          graph={displayedGraph}
          onSelect={onSelect}
          showClusterLabels={graphMode === 'original'}
          showAxes={graphMode === 'custom'}
          axisLabels={customAxisLabels}
        />
      )}

      <div className="pointer-events-auto absolute top-4 left-1/2 z-20 w-[min(25rem,calc(100vw-8rem))] -translate-x-1/2">
        <div
          className="flex h-11 items-center border-2 border-hairline-strong bg-white shadow-brutal-sm focus-within:border-primary"
          role="search"
        >
          <Search aria-hidden="true" className="ml-3 shrink-0 text-mute" size={17} strokeWidth={2.2} />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setSearchQuery('')
                event.currentTarget.blur()
              }
            }}
            placeholder="Search companies"
            aria-label="Search companies in the graph"
            className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-mute"
          />
          {normalizedQuery && (
            <>
              <span className="whitespace-nowrap text-xs text-mute">
                {searchMatches.length} {searchMatches.length === 1 ? 'match' : 'matches'}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear company search"
                className="mx-1.5 grid h-7 w-7 place-items-center text-mute hover:bg-bone hover:text-ink"
              >
                <X aria-hidden="true" size={15} />
              </button>
            </>
          )}
        </div>
      </div>

      <GraphViewTabs
        mode={graphMode}
        axes={customAxes}
        options={availableAxisOptions}
        onModeChange={(mode) => {
          setGraphMode(mode)
          setSelectedId(null)
        }}
        onAxesChange={setCustomAxes}
      />

      {/* HUD overlays */}
      <div className="pointer-events-none absolute inset-0 flex p-4 pl-24">
        <div className="flex h-full w-80 flex-col gap-3">
          <SourcingInbox
            onFocus={(id) => brainRef.current?.focusNode(id)}
            onFeedback={onFeedback}
            onDiscover={onDiscover}
          />
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
      {!selectedId && graphMode === 'original' && (
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
      <div style={hudMono} className="pointer-events-none absolute right-4 bottom-4 hidden xl:block">
        drag orbit · scroll zoom · hover inspect · click focus · [ ] node size
      </div>
    </div>
  )
}
