import type { Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import type { PartnerOpinion, CommitteeDecision } from "../schemas/committee.js";
import { CommitteeDecisionSchema } from "../schemas/committee.js";
import type { AgentDeps } from "./types.js";
import { describeCompany } from "./util.js";

const SYSTEM = `You are the Investment Committee. Synthesize the partner opinions into a decision.
Do NOT simply average votes — surface the central disagreement, the strongest bull and bear cases,
unresolved diligence, and pick a single recommended company with a confidence and a recommended check
size within the fund's range. Your rationale must reflect the fund's thesis and its historical precedent.`;

export interface CommitteeInput {
  finalists: Company[];
  partnerOpinions: Record<string, PartnerOpinion[]>;
  fundProfile: FundProfile;
}

function opinionsBlock(input: CommitteeInput): string {
  const lines: string[] = [];
  for (const [partnerId, opinions] of Object.entries(input.partnerOpinions)) {
    for (const o of opinions) {
      lines.push(
        `${partnerId} on ${o.companyId}: ${o.vote} (conf ${o.confidence}) — ${o.thesis} ` +
          `| concern: ${o.biggestConcern}`,
      );
    }
  }
  return lines.join("\n");
}

export async function investmentCommitteeAgent(
  input: CommitteeInput,
  deps: AgentDeps,
): Promise<CommitteeDecision> {
  const finalistBlock = input.finalists.map(describeCompany).join("\n");
  return deps.llm.generateStructured({
    schema: CommitteeDecisionSchema,
    schemaName: "CommitteeDecision",
    system: SYSTEM,
    prompt:
      `Fund thesis: ${input.fundProfile.thesisSummary}\n` +
      `Check size range: ${input.fundProfile.checkSize.min}-${input.fundProfile.checkSize.max}\n\n` +
      `Finalists:\n${finalistBlock}\n\n` +
      `Partner opinions:\n${opinionsBlock(input)}\n\n` +
      `Produce the committee decision. recommendedCompanyId MUST be one of the finalists.`,
  });
}
