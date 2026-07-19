import type { Company } from "../schemas/company.js";
import { agglomerativeClusters } from "../similarity/cluster.js";
import { companySimilarity, type EmbeddingMap } from "./similarity.js";

export interface LandscapeNode {
  id: string;
  clusterId: number;
  /** Initial coordinates (the frontend force layout refines these). */
  x: number;
  y: number;
  z: number;
}

export interface LandscapeEdge {
  source: string;
  target: string;
  weight: number;
  type: "nearest" | "analogue";
}

export interface LandscapeCluster {
  id: number;
  label: string;
  memberIds: string[];
}

export interface MarketLandscape {
  nodes: LandscapeNode[];
  edges: LandscapeEdge[];
  clusters: LandscapeCluster[];
}

export interface LandscapeOptions {
  focalId?: string;
  neighborK?: number;
  clusterThreshold?: number;
  /** Cap on similarity clusters so the market view stays legible. */
  maxClusters?: number;
  /** Clusters smaller than this get absorbed into their nearest neighbor. */
  minClusterSize?: number;
  embeddings?: EmbeddingMap;
  radius?: number;
}

/**
 * `build_market_landscape` — graph-ready nodes, nearest-neighbor edges, and
 * bottom-up similarity clusters (average-linkage agglomerative over the
 * 10-dimension similarity; see similarity/cluster.ts). Deterministic: cluster
 * centers are spaced on a circle, members fan out by index, distance encodes
 * dissimilarity from the cluster medoid.
 */
export function buildMarketLandscape(
  companies: Company[],
  opts: LandscapeOptions = {},
): MarketLandscape {
  const neighborK = opts.neighborK ?? 3;
  const radius = opts.radius ?? 100;
  const emb = opts.embeddings;

  const result = agglomerativeClusters(companies, {
    threshold: opts.clusterThreshold ?? 0.45,
    maxClusters: opts.maxClusters ?? 8,
    minClusterSize: opts.minClusterSize ?? 3,
    // Two-level: a dominant theme splits into sub-markets instead of one blob.
    maxClusterSize: Math.max(10, Math.ceil(companies.length / 5)),
    embeddings: emb,
  });
  // Seed = medoid: the member most similar to its own cluster on average.
  const clusters = result.clusters.map((cl) => ({
    id: cl.id,
    label: cl.label,
    seed: companies[cl.medoidIndex]!,
    members: cl.memberIndices.map((i) => companies[i]!),
  }));

  // Coordinates: each cluster gets an angular slice; members fan around its center.
  const nodes: LandscapeNode[] = [];
  const clusterCount = Math.max(clusters.length, 1);
  for (const cl of clusters) {
    const centerAngle = (2 * Math.PI * cl.id) / clusterCount;
    const cx = Math.cos(centerAngle) * radius;
    const cy = Math.sin(centerAngle) * radius;
    cl.members.forEach((m, i) => {
      const sim = companySimilarity(m, cl.seed, emb).overall; // 1 for seed itself
      const spread = (1 - sim) * radius * 0.6;
      const a = (2 * Math.PI * i) / Math.max(cl.members.length, 1);
      nodes.push({
        id: m.id,
        clusterId: cl.id,
        x: m.id === opts.focalId ? 0 : cx + Math.cos(a) * spread,
        y: m.id === opts.focalId ? 0 : cy + Math.sin(a) * spread,
        z: (sim - 0.5) * 20,
      });
    });
  }

  // Nearest-neighbor edges, deduped by unordered pair.
  const edges: LandscapeEdge[] = [];
  const seen = new Set<string>();
  for (const c of companies) {
    const sims = companies
      .filter((o) => o.id !== c.id)
      .map((o) => ({ id: o.id, s: companySimilarity(c, o, emb).overall }))
      .sort((a, b) => b.s - a.s)
      .slice(0, neighborK);
    for (const n of sims) {
      const key = [c.id, n.id].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: c.id, target: n.id, weight: n.s, type: "nearest" });
    }
  }

  return {
    nodes,
    edges,
    clusters: clusters.map((cl) => ({
      id: cl.id,
      label: cl.label,
      memberIds: cl.members.map((m) => m.id),
    })),
  };
}
