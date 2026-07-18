import { FundProfileSchema, type FundProfile } from "../schemas/fundProfile.js";
import type { HistoricalMemo } from "../schemas/history.js";
import type { Company } from "../schemas/company.js";
import type { AgentDeps } from "./types.js";
import { describeMany } from "./util.js";

const SYSTEM = `You are the Fund Profiler. Learn how ONE fund thinks from its history:
extract preferred stages, sectors, geographies, check size, weighted investment criteria,
recurring reasons to invest and pass, successful vs rejected archetypes, per-partner tendencies,
and attribute preferences (keyed "<dimension>:<value>", e.g. "founderArchetypes:clinician-founder",
positive weights for favored values, negative for disfavored). Criterion weights should sum near 1.
Ground every criterion in the memos via supportingMemoIds.`;

export interface FundProfilerInput {
  mandate: string;
  historicalMemos: HistoricalMemo[];
  portfolioCompanies: Company[];
  rejectedDeals: Company[];
}

export async function fundProfilerAgent(
  input: FundProfilerInput,
  deps: AgentDeps,
): Promise<FundProfile> {
  const memoText = input.historicalMemos
    .map(
      (m) =>
        `[${m.id}] ${m.decision.toUpperCase()} ${m.companyName} (outcome: ${m.outcome}): ${m.text}` +
        ` Drivers: ${m.decisionDrivers.join(", ")}. Moat: ${m.identifiedMoat ?? "n/a"}.`,
    )
    .join("\n");

  return deps.llm.generateStructured({
    schema: FundProfileSchema,
    schemaName: "FundProfile",
    system: SYSTEM,
    prompt:
      `Investment mandate: ${input.mandate}\n\n` +
      `Historical memos:\n${memoText}\n\n` +
      `Portfolio companies:\n${describeMany(input.portfolioCompanies)}\n\n` +
      `Rejected deals:\n${describeMany(input.rejectedDeals)}\n\n` +
      `Produce the fund profile.`,
  });
}
