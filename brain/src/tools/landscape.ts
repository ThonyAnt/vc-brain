import type { Company } from "../schemas/company.js";
import { agglomerativeClusters } from "../similarity/cluster.js";
import { classicalMds } from "../similarity/mds.js";
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
  type: "nearest" | "analogue" | "competition";
}

export interface LandscapeCluster {
  id: number;
  label: string;
  memberIds: string[];
  /** Average-linkage MDS anchor shared by all members of this market. */
  x: number;
  y: number;
  z: number;
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
 * anchors use average-linkage MDS, while members use pairwise MDS inside each
 * cluster. Thus both market-to-market and company-to-company distance encode
 * the same 10-dimension company similarity.
 */
export function buildMarketLandscape(
  companies: Company[],
  opts: LandscapeOptions = {},
): MarketLandscape {
  const neighborK = opts.neighborK ?? 3;
  const radius = opts.radius ?? 100;
  const emb = opts.embeddings;

  // Exact pairwise matrix from the canonical 10-dimension metric. This is
  // intentionally recomputed here (rather than approximated from cluster
  // labels/medoids) because both MDS layers need every pairwise relationship.
  const similarity: number[][] = Array.from({ length: companies.length }, (_, i) =>
    Array.from({ length: companies.length }, (_, j) => (i === j ? 1 : 0)),
  );
  for (let i = 0; i < companies.length; i++) {
    for (let j = i + 1; j < companies.length; j++) {
      const value = companySimilarity(companies[i]!, companies[j]!, emb).overall;
      similarity[i]![j] = value;
      similarity[j]![i] = value;
    }
  }

  const result = agglomerativeClusters(companies, {
    threshold: opts.clusterThreshold ?? 0.45,
    maxClusters: opts.maxClusters ?? 8,
    minClusterSize: opts.minClusterSize ?? 3,
    // Two-level: a dominant theme splits into sub-markets instead of one blob.
    maxClusterSize: Math.max(10, Math.ceil(companies.length / 5)),
    embeddings: emb,
  });
  const clusters = result.clusters.map((cl) => ({
    id: cl.id,
    label: cl.label,
    memberIndices: cl.memberIndices,
    members: cl.memberIndices.map((i) => companies[i]!),
  }));

  // Average linkage between every cluster pair, matching the quantity used by
  // agglomerativeClusters when it decides which markets belong together.
  const clusterDistances = clusters.map((a, ai) =>
    clusters.map((b, bi) => {
      if (ai === bi) return 0;
      let total = 0;
      for (const i of a.memberIndices) for (const j of b.memberIndices) total += similarity[i]![j]!;
      return 1 - total / (a.memberIndices.length * b.memberIndices.length);
    }),
  );
  const anchorCoordinates = classicalMds(
    clusterDistances,
    3,
    clusters.map((cluster) => `cluster:${cluster.memberIndices.map((i) => companies[i]!.id).sort().join("|")}`),
  );
  // Cluster clouds need enough breathing room for labels and edge inspection.
  // A uniform anchor scale preserves all MDS distance ratios.
  const anchorScale = radius * 1.7;
  const anchors = anchorCoordinates.map(([x = 0, y = 0, z = 0]) => ({
    x: x * anchorScale,
    y: y * anchorScale,
    z: z * anchorScale,
  }));

  // Classical MDS inside each cluster honors every member-to-member distance;
  // this replaces the old medoid radial fan, which only represented one row of
  // the similarity matrix.
  const nodes: LandscapeNode[] = [];
  for (const [clusterIndex, cl] of clusters.entries()) {
    const memberDistances = cl.memberIndices.map((companyIndexA) =>
      cl.memberIndices.map((companyIndexB) => 1 - similarity[companyIndexA]![companyIndexB]!),
    );
    const localCoordinates = classicalMds(memberDistances, 3, cl.members.map((member) => member.id));
    const anchor = anchors[clusterIndex] ?? { x: 0, y: 0, z: 0 };
    // Keep the pairwise geometry but make each market cloud tighter relative
    // to the semantic distance between market anchors.
    const memberScale = radius * 0.55;
    cl.members.forEach((m, i) => {
      const [x = 0, y = 0, z = 0] = localCoordinates[i] ?? [];
      nodes.push({
        id: m.id,
        clusterId: cl.id,
        x: anchor.x + x * memberScale,
        y: anchor.y + y * memberScale,
        z: anchor.z + z * memberScale,
      });
    });
  }

  // Nearest-neighbor edges, deduped by unordered pair.
  const edges: LandscapeEdge[] = [];
  const seen = new Set<string>();
  for (let companyIndex = 0; companyIndex < companies.length; companyIndex++) {
    const c = companies[companyIndex]!;
    const sims = companies
      .map((o, otherIndex) => ({ id: o.id, s: similarity[companyIndex]![otherIndex]! }))
      .filter((o) => o.id !== c.id)
      .sort((a, b) => b.s - a.s || a.id.localeCompare(b.id))
      .slice(0, neighborK);
    for (const n of sims) {
      const key = [c.id, n.id].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: c.id, target: n.id, weight: n.s, type: "nearest" });
    }
  }

  // Explicit competitors are additive to similarity edges. Match names only
  // when they resolve exactly after case/whitespace normalization—no guessing.
  const normalizedName = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
  const byName = new Map<string, Company[]>();
  for (const company of companies) {
    const key = normalizedName(company.name);
    byName.set(key, [...(byName.get(key) ?? []), company].sort((a, b) => a.id.localeCompare(b.id)));
  }
  const competitionSeen = new Set<string>();
  for (const company of companies) {
    for (const competitorName of company.competitors) {
      for (const competitor of byName.get(normalizedName(competitorName)) ?? []) {
        if (competitor.id === company.id) continue;
        const key = [company.id, competitor.id].sort().join("|");
        if (competitionSeen.has(key)) continue;
        competitionSeen.add(key);
        edges.push({ source: company.id, target: competitor.id, weight: 0.8, type: "competition" });
      }
    }
  }

  return {
    nodes,
    edges,
    clusters: clusters.map((cl, index) => ({
      id: cl.id,
      label: cl.label,
      memberIds: cl.members.map((m) => m.id),
      ...(anchors[index] ?? { x: 0, y: 0, z: 0 }),
    })),
  };
}
