import { describe, it, expect } from "vitest";
import { agglomerativeClusters } from "./cluster.js";
import * as fx from "../fixtures/sample.js";
import type { Company } from "../schemas/company.js";

const healthcareDocs: Company[] = [fx.scribeai, fx.medflow, fx.notegen, fx.vetcharts];
const mixed: Company[] = [...healthcareDocs, fx.payflow, fx.careloop, fx.healthadboard];

describe("agglomerativeClusters", () => {
  it("groups similar companies and separates dissimilar ones", () => {
    const { assignments } = agglomerativeClusters(mixed, { threshold: 0.35 });
    const cluster = (c: Company) => assignments[mixed.indexOf(c)];
    // Clinical-documentation companies merge; consumer fintech stays apart.
    expect(cluster(fx.scribeai)).toBe(cluster(fx.medflow));
    expect(cluster(fx.scribeai)).not.toBe(cluster(fx.payflow));
  });

  it("is deterministic regardless of input order", () => {
    const a = agglomerativeClusters(mixed, { threshold: 0.35 });
    const reversed = [...mixed].reverse();
    const b = agglomerativeClusters(reversed, { threshold: 0.35 });
    // Same partition (compare as sets of member-id sets).
    const partition = (companies: Company[], assign: number[]) => {
      const groups = new Map<number, string[]>();
      companies.forEach((c, i) => {
        groups.set(assign[i]!, [...(groups.get(assign[i]!) ?? []), c.id].sort());
      });
      return new Set([...groups.values()].map((g) => g.join("|")));
    };
    expect(partition(mixed, a.assignments)).toEqual(partition(reversed, b.assignments));
  });

  it("honors maxClusters by merging beyond the threshold", () => {
    const { assignments } = agglomerativeClusters(mixed, { threshold: 0.99, maxClusters: 2 });
    expect(new Set(assignments).size).toBeLessThanOrEqual(2);
  });

  it("absorbs tiny clusters when minClusterSize is set", () => {
    const { assignments } = agglomerativeClusters(mixed, {
      threshold: 0.35,
      minClusterSize: 2,
    });
    const counts = new Map<number, number>();
    for (const a of assignments) counts.set(a, (counts.get(a) ?? 0) + 1);
    for (const size of counts.values()) expect(size).toBeGreaterThanOrEqual(2);
  });

  it("returns a medoid per cluster (member most similar to its cluster)", () => {
    const { clusters } = agglomerativeClusters(mixed, { threshold: 0.35 });
    for (const cl of clusters) {
      expect(cl.memberIndices).toContain(cl.medoidIndex);
    }
  });

  it("labels clusters from modal member attributes", () => {
    const { clusters } = agglomerativeClusters(healthcareDocs, { threshold: 0.3 });
    const labels = clusters.map((c) => c.label.toLowerCase()).join(" ");
    expect(labels).toMatch(/clinical|documentation|infrastructure|healthcare/);
  });

  it("handles empty and single-company inputs", () => {
    expect(agglomerativeClusters([], {}).clusters).toEqual([]);
    const one = agglomerativeClusters([fx.scribeai], {});
    expect(one.assignments).toEqual([0]);
    expect(one.clusters).toHaveLength(1);
  });
});
