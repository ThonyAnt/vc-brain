import type { Company } from "../schemas/company.js";

/** One-line company summary for agent prompts (id included so mocks can key on it). */
export function describeCompany(c: Company): string {
  const a = c.attributes;
  const m = c.metrics;
  const metrics = m
    ? ` | ARR=${m.arr ?? "?"}, growth=${m.arrGrowthRate ?? "?"}, churn=${m.churnRate ?? "?"}, margin=${m.grossMargin ?? "?"}`
    : "";
  return (
    `- ${c.name} (ID: ${c.id}) [${c.historicalStatus}/${c.outcome}] ` +
    `${c.sector ?? ""} ${c.stage ?? ""}: ${c.description} | ` +
    `industry=${a.industryPath.join(">")}, customers=${a.targetCustomers.join(",")}, ` +
    `model=${a.businessModel}, gtm=${a.goToMarket}, founder=${a.founderArchetypes.join(",")}, ` +
    `reg=${a.regulatoryLabels.join(",")}, problem="${a.problemStatement}"${metrics}`
  );
}

export function describeMany(cs: Company[]): string {
  return cs.map(describeCompany).join("\n");
}

export const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
