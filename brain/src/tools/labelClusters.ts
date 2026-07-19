import { z } from "zod";
import type { LLMClient } from "../llm/client.js";
import type { Company } from "../schemas/company.js";
import type { MarketLandscape } from "./landscape.js";

/*
 * LLM cluster naming. The agglomerative clusters group companies by
 * 10-dimension strategic similarity, but the deterministic auto-labels come
 * from modal member attributes — which usually collapses to the industry
 * ("Healthcare") and undersells what the cluster actually shares. This pass
 * reads each cluster's members and names the shared strategic shape instead.
 * Pure fallback: on any LLM failure the modal auto-labels stay.
 */

const ClusterLabelsSchema = z.object({
  labels: z.array(
    z.object({
      clusterId: z.number(),
      label: z.string(),
    }),
  ),
});

const LABELING_SYSTEM = `You name market clusters for a venture fund's market map. Each cluster
groups startups by strategic similarity across problem, customer, product, technical approach,
business model, and go-to-market — NOT just industry. For each cluster write ONE label:
- 2-4 words, Title Case
- names the shared strategic shape ("Agent Infrastructure", "Clinical Documentation AI",
  "SMB Security Ops"), specific enough that a partner instantly knows what's inside
- distinct from every other cluster's label
- never a single member company's name, no trailing words like "Cluster" or "Companies"
- the words "Solutions", "Technologies", "Tech", "Innovation", "Various", and "Software" are
  BANNED — they say nothing. Name what the companies actually do ("Climate & Energy Ops",
  "Adaptive Learning Agents") instead of abstracting to filler.`;

export async function labelClustersWithLLM(
  landscape: MarketLandscape,
  companies: Company[],
  llm: LLMClient,
): Promise<MarketLandscape> {
  if (landscape.clusters.length === 0) return landscape;
  const byId = new Map(companies.map((c) => [c.id, c]));

  const summaries = landscape.clusters.map((cl) => {
    const members = cl.memberIds
      .map((id) => byId.get(id))
      .filter((c): c is Company => Boolean(c))
      .slice(0, 8);
    const lines = members
      .map((m) => `- ${m.name}: ${(m.description ?? "").slice(0, 140)}`)
      .join("\n");
    return `Cluster ${cl.id} (auto-label: "${cl.label}", ${cl.memberIds.length} members):\n${lines}`;
  });

  try {
    const out = await llm.generateStructured({
      schema: ClusterLabelsSchema,
      schemaName: "ClusterLabels",
      system: LABELING_SYSTEM,
      prompt: `Name each cluster.\n\n${summaries.join("\n\n")}\n\nReturn exactly one label per clusterId.`,
    });
    const labelById = new Map(out.labels.map((l) => [l.clusterId, l.label.trim()]));
    const used = new Set<string>();
    return {
      ...landscape,
      clusters: landscape.clusters.map((cl) => {
        let label = labelById.get(cl.id) ?? "";
        if (!label || used.has(label.toLowerCase())) label = cl.label; // fall back to the modal auto-label
        used.add(label.toLowerCase());
        return { ...cl, label };
      }),
    };
  } catch {
    return landscape;
  }
}
