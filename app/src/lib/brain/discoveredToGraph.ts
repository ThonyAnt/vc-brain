import type { Company, FundGraph, GraphEdge, GraphNode } from '../types'

/** Turn freshly sourced companies into graph nodes + market/precedent edges. */
export function discoveredToGraph(
  companies: Company[],
  graph: FundGraph,
): { nodes: GraphNode[]; edges: GraphEdge[] } {
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
