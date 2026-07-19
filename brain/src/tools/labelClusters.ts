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

const LABELING_SYSTEM = `You name broad market families for a venture fund's spatial portfolio map.
Each cluster groups startups by strategic similarity, but its label must stay useful when zoomed out.
For each cluster write ONE label:
- 1-3 words, Title Case
- use a familiar, broad market category. Prefer labels like "Healthcare", "Fintech",
  "Cybersecurity", "Climate & Energy", "Robotics & Logistics", "Consumer Social",
  "Education", "Enterprise AI", and "AI Infrastructure"
- name the customer market, not a narrow feature or implementation detail
- distinct from every other cluster's label
- never a single member company's name, no trailing words like "Cluster" or "Companies"
- do not use mechanism-heavy modifiers like "AI-Enhanced", "Automated", "APIs and Wallets",
  "Interfaces", "Operations", "Tools", or "Platforms" unless needed to distinguish two clusters
- the words "Solutions", "Technologies", "Tech", "Innovation", "Various", and "Software" are banned.`;

export function broadMarketLabel(label: string): string {
  const normalized = label.trim();
  if (/^(b2b saas|enterprise software|enterprise automation)$/i.test(normalized)) return "Enterprise AI";
  if (/industrial operations|industrial automation|operations automation|enterprise operations/i.test(normalized)) return "Industrial Operations";
  if (/payments?|wallets?|financial infrastructure/i.test(normalized)) return "Fintech";
  if (/^(social|event platforms?)$/i.test(normalized)) return "Consumer Social";
  if (/logistics|supply chain|industrial automation/i.test(normalized)) return "Robotics & Logistics";
  if (/persona platform|adaptive learning/i.test(normalized)) return "Education";
  if (/^(data analytics|consumer applications?)$/i.test(normalized)) return "AI Applications";
  if (/^(technology|developer infrastructure|developer platforms?)$/i.test(normalized)) return "Developer Tools";
  if (/health|medical|medicine|fitness|wellness/i.test(normalized)) return "Healthcare";
  if (/fintech|financial|wallet|banking/i.test(normalized)) return "Fintech";
  if (/cyber|security/i.test(normalized)) return "Cybersecurity";
  if (/climate|energy/i.test(normalized)) return "Climate & Energy";
  if (/robot|logistics/i.test(normalized)) return "Robotics & Logistics";
  if (/consumer|social|event/i.test(normalized)) return "Consumer Social";
  if (/education|learning/i.test(normalized)) return "Education";
  if (/agent infrastructure|ai infrastructure/i.test(normalized)) return "AI Infrastructure";
  if (/enterprise ai|ai agents?/i.test(normalized)) return "Enterprise AI";
  return normalized;
}

export function broadenClusterLabels(landscape: MarketLandscape, companies: Company[] = []): MarketLandscape {
  const byId = new Map(companies.map((company) => [company.id, company]));
  return {
    ...landscape,
    clusters: landscape.clusters.map((cluster) => ({
      ...cluster,
      label: refineLabelForMembers(broadMarketLabel(cluster.label), cluster.memberIds.map((id) => byId.get(id)).filter((company): company is Company => Boolean(company))),
    })),
  };
}

function refineLabelForMembers(label: string, members: Company[]): string {
  if (label !== "Climate & Energy" || members.length === 0) return label;
  const climateMembers = members.filter((member) => {
    const text = [member.sector, ...member.attributes.industryPath, member.description].filter(Boolean).join(" ");
    return /climate|energy|carbon|renewable/i.test(text);
  });
  return climateMembers.length / members.length < 0.5 ? "Industrial Operations" : label;
}

const CANONICAL_MARKET_LABELS = new Set([
  "AI Infrastructure",
  "Enterprise AI",
  "Industrial Operations",
  "Healthcare",
  "Fintech",
  "Consumer Social",
  "Cybersecurity",
  "Robotics & Logistics",
  "Education",
  "AI Applications",
  "Developer Tools",
  "Climate & Energy",
]);

export async function labelClustersWithLLM(
  landscape: MarketLandscape,
  companies: Company[],
  llm: LLMClient,
): Promise<MarketLandscape> {
  if (landscape.clusters.length === 0) return landscape;
  const byId = new Map(companies.map((c) => [c.id, c]));
  const deterministic = broadenClusterLabels(landscape, companies);
  const deterministicLabelById = new Map(deterministic.clusters.map((cluster) => [cluster.id, cluster.label]));

  const summaries = landscape.clusters.map((cl) => {
    const members = cl.memberIds
      .map((id) => byId.get(id))
      .filter((c): c is Company => Boolean(c))
      .slice(0, 12);
    const lines = members
      .map((m) => `- ${m.name} [${m.sector ?? m.attributes.industryPath[0] ?? "unknown"}]: ${(m.description ?? "").slice(0, 140)}`)
      .join("\n");
    return `Cluster ${cl.id} (${cl.memberIds.length} members):\n${lines}`;
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
    return broadenClusterLabels({
      ...landscape,
      clusters: landscape.clusters.map((cl) => {
        let label = broadMarketLabel(labelById.get(cl.id) ?? "");
        const deterministicLabel = deterministicLabelById.get(cl.id) ?? "";
        if (CANONICAL_MARKET_LABELS.has(deterministicLabel)) label = deterministicLabel;
        if (!label || used.has(label.toLowerCase())) label = broadMarketLabel(cl.label); // fall back to the modal auto-label
        label = broadMarketLabel(label);
        used.add(label.toLowerCase());
        return { ...cl, label };
      }),
    }, companies);
  } catch {
    return broadenClusterLabels(landscape, companies);
  }
}
