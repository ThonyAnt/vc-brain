import type { Company } from "../schemas/company.js";
import { computeCompanySimilarity } from "./compute.js";
import type { EmbeddingMap } from "../tools/similarity.js";

/*
 * Bottom-up (agglomerative) clustering over the 10-dimension company
 * similarity. Average linkage: the affinity between two clusters is the mean
 * pairwise similarity across all their members, so clusters grow around dense
 * neighborhoods instead of chaining through single lucky pairs.
 *
 * The dendrogram is cut by three cooperating rules:
 *   - merge while the best pair's average similarity >= `threshold`
 *   - keep merging the best pair (even below threshold) while there are more
 *     than `maxClusters` clusters, so the market view stays legible
 *   - afterwards, absorb clusters smaller than `minClusterSize` into their
 *     nearest cluster, so stragglers don't render as one-node "markets"
 *
 * Deterministic: ties break on the smallest original indices, and the final
 * clusters are ordered by size (then by first member) — input order never
 * changes the partition.
 */

export interface AgglomerativeOptions {
  /** Merge clusters while their average similarity is at least this. */
  threshold?: number;
  /** Hard cap on cluster count; best pairs merge beyond threshold to reach it. */
  maxClusters?: number;
  /** Clusters smaller than this are absorbed into their nearest neighbor. */
  minClusterSize?: number;
  /**
   * Clusters larger than this are split by a second agglomerative pass over
   * their members (hierarchical two-level clustering), so one dominant theme
   * (e.g. an AI-heavy dataset) doesn't collapse into a single mega-market.
   */
  maxClusterSize?: number;
  /** Optional per-company embeddings for the free-text similarity dimension. */
  embeddings?: EmbeddingMap;
}

export interface ClusterResult {
  /** assignments[i] = cluster index of companies[i]. */
  assignments: number[];
  clusters: Array<{
    id: number;
    label: string;
    memberIndices: number[];
    /** Member most similar on average to its own cluster — its center. */
    medoidIndex: number;
  }>;
}

interface WorkingCluster {
  members: number[];
  /** Smallest original index — deterministic tie-break identity. */
  key: number;
}

export function agglomerativeClusters(
  companies: Company[],
  opts: AgglomerativeOptions = {},
): ClusterResult {
  const threshold = opts.threshold ?? 0.45;
  const maxClusters = opts.maxClusters ?? 8;
  const minClusterSize = opts.minClusterSize ?? 1;
  const n = companies.length;
  if (n === 0) return { assignments: [], clusters: [] };

  // Pairwise similarity matrix (n is ~100s; O(n^2) is fine and exact).
  const sim: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const s = computeCompanySimilarity(companies[i]!.attributes, companies[j]!.attributes, {
        embeddings:
          opts.embeddings?.get(companies[i]!.id) && opts.embeddings?.get(companies[j]!.id)
            ? { a: opts.embeddings.get(companies[i]!.id)!, b: opts.embeddings.get(companies[j]!.id)! }
            : undefined,
      }).overall;
      sim[i]![j] = s;
      sim[j]![i] = s;
    }
  }

  // Level 1: cluster everything.
  let clusters = clusterIndices(
    Array.from({ length: n }, (_, i) => i),
    sim,
    { threshold, maxClusters, minClusterSize },
  );

  // Level 2: split oversized clusters with a second pass over their members
  // (threshold > 1 disables similarity merging, so the sub-pass is driven purely
  // by the sub-cluster count — it undoes the forced merges of a dominant theme).
  const maxClusterSize = opts.maxClusterSize ?? Infinity;
  if (Number.isFinite(maxClusterSize)) {
    const next: WorkingCluster[] = [];
    for (const cl of clusters) {
      if (cl.members.length <= maxClusterSize) {
        next.push(cl);
        continue;
      }
      const parts = Math.ceil(cl.members.length / maxClusterSize);
      next.push(
        ...clusterIndices(cl.members, sim, {
          threshold: 1.01,
          maxClusters: parts,
          minClusterSize,
        }),
      );
    }
    clusters = next;
  }

  // Stable output order: by size desc, then by first member asc.
  clusters.sort((a, b) => b.members.length - a.members.length || a.key - b.key);

  const assignments = new Array<number>(n).fill(0);
  const out: ClusterResult["clusters"] = clusters.map((cl, id) => {
    for (const m of cl.members) assignments[m] = id;
    return {
      id,
      label: labelCluster(cl.members.map((m) => companies[m]!)),
      memberIndices: cl.members,
      medoidIndex: medoid(cl.members, sim),
    };
  });

  return { assignments, clusters: out };
}

/**
 * Core average-linkage loop over a subset of company indices. Merges the most
 * similar pair while it clears `threshold`, or while the cluster count exceeds
 * `maxClusters`; then absorbs clusters smaller than `minClusterSize`.
 */
function clusterIndices(
  indices: number[],
  sim: number[][],
  opts: { threshold: number; maxClusters: number; minClusterSize: number },
): WorkingCluster[] {
  let clusters: WorkingCluster[] = indices.map((i) => ({ members: [i], key: i }));

  const linkage = (a: WorkingCluster, b: WorkingCluster): number => {
    let total = 0;
    for (const i of a.members) for (const j of b.members) total += sim[i]![j]!;
    return total / (a.members.length * b.members.length);
  };

  const bestPair = (): { ai: number; bi: number; s: number } => {
    let best = { ai: -1, bi: -1, s: -1 };
    for (let a = 0; a < clusters.length; a++) {
      for (let b = a + 1; b < clusters.length; b++) {
        const s = linkage(clusters[a]!, clusters[b]!);
        // Deterministic tie-break: higher similarity, then smaller cluster keys.
        if (
          s > best.s + 1e-12 ||
          (Math.abs(s - best.s) <= 1e-12 &&
            best.ai >= 0 &&
            (clusters[a]!.key < clusters[best.ai]!.key ||
              (clusters[a]!.key === clusters[best.ai]!.key && clusters[b]!.key < clusters[best.bi]!.key)))
        ) {
          best = { ai: a, bi: b, s };
        }
      }
    }
    return best;
  };

  const merge = (ai: number, bi: number) => {
    const [a, b] = [clusters[ai]!, clusters[bi]!];
    const merged: WorkingCluster = {
      members: [...a.members, ...b.members].sort((x, y) => x - y),
      key: Math.min(a.key, b.key),
    };
    clusters = clusters.filter((_, idx) => idx !== ai && idx !== bi);
    clusters.push(merged);
  };

  while (clusters.length > 1) {
    const { ai, bi, s } = bestPair();
    if (s >= opts.threshold || clusters.length > opts.maxClusters) merge(ai, bi);
    else break;
  }

  if (opts.minClusterSize > 1) {
    let guard = clusters.length;
    while (guard-- > 0) {
      const smallIdx = clusters.findIndex((c) => c.members.length < opts.minClusterSize);
      if (smallIdx < 0 || clusters.length < 2) break;
      const small = clusters[smallIdx]!;
      let nearest = -1;
      let nearestSim = -1;
      for (let i = 0; i < clusters.length; i++) {
        if (i === smallIdx) continue;
        const s = linkage(small, clusters[i]!);
        if (s > nearestSim) {
          nearestSim = s;
          nearest = i;
        }
      }
      merge(Math.min(smallIdx, nearest), Math.max(smallIdx, nearest));
    }
  }

  return clusters;
}

/** Member with the highest average similarity to its own cluster. */
function medoid(members: number[], sim: number[][]): number {
  if (members.length === 1) return members[0]!;
  let best = members[0]!;
  let bestAvg = -1;
  for (const i of members) {
    let total = 0;
    for (const j of members) if (j !== i) total += sim[i]![j]!;
    const avg = total / (members.length - 1);
    if (avg > bestAvg) {
      bestAvg = avg;
      best = i;
    }
  }
  return best;
}

/** Modal value + its share among members; deterministic (alphabetical) tie-break. */
function modal(values: string[]): { value: string; share: number } | undefined {
  const clean = values.map((v) => v.trim()).filter(Boolean);
  if (clean.length === 0) return undefined;
  const counts = new Map<string, number>();
  for (const v of clean) counts.set(v, (counts.get(v) ?? 0) + 1);
  const [value, count] = [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  )[0]!;
  return { value, share: count / values.length };
}

const prettyLabel = (s: string): string => {
  const spaced = s.replace(/_/g, " ").trim();
  return spaced === spaced.toLowerCase() ? spaced[0]!.toUpperCase() + spaced.slice(1) : spaced;
};

/**
 * Label a cluster from its members' modal attributes, walking the industry
 * hierarchy leaf -> mid -> root and requiring the modal value to actually be
 * shared (>= a third of members). Without the share requirement, a diverse
 * cluster's label degenerates to whichever unique value sorts first
 * alphabetically. Falls back to modal sector prefix, then "Mixed".
 */
function labelCluster(members: Company[]): string {
  const levels: Array<(c: Company) => string | undefined> = [
    (c) => c.attributes.industryPath.at(-1),
    (c) => c.attributes.industryPath[1],
    (c) => c.attributes.industryPath[0],
    (c) => c.sector?.split(/[/,(]/)[0],
  ];
  for (const pick of levels) {
    const m = modal(members.map((c) => pick(c) ?? ""));
    if (m && m.share >= 1 / 3) return prettyLabel(m.value);
  }
  const anySector = modal(members.map((c) => c.sector ?? ""));
  return anySector ? prettyLabel(anySector.value) : "Mixed";
}
