import type { Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import type { CandidateDiligence } from "../schemas/diligence.js";
import type { PartnerOpinion, CommitteeDecision } from "../schemas/committee.js";
import { InvestmentMemoSchema, type InvestmentMemo } from "../schemas/memo.js";
import { calculateFinancialScenarios, type ScenarioSet } from "../finance/scenarios.js";
import type { AgentDeps } from "./types.js";
import { describeCompany, describeMany } from "./util.js";

const SYSTEM = `You are the Memo agent. Write the investment memo in the FUND'S OWN style, learned from
its prior memos. Every substantive claim should carry sourceNodeIds pointing to the graph nodes that
back it (company IDs, memo IDs, criterion IDs). Tie the thesis to historical analogues and the
committee decision. Be concrete about reasons to invest, reasons to pass, and open diligence.`;

export interface MemoInput {
  company: Company;
  fundProfile: FundProfile;
  diligence: CandidateDiligence;
  analogues?: Company[];
  partnerOpinions: PartnerOpinion[];
  committee: CommitteeDecision;
}

function scenarioSummary(s: ScenarioSet): string {
  const fmt = (label: string, r: ScenarioSet["base"]) =>
    `${label}: exit=${Math.round(r.exitValuation).toLocaleString()}, MOIC=${r.moic.toFixed(
      2,
    )}x, IRR=${(r.irr * 100).toFixed(1)}%`;
  return [fmt("bull", s.bull), fmt("base", s.base), fmt("bear", s.bear)].join(" | ");
}

/** Generate the investment memo; return it alongside the deterministic scenarios used. */
export async function memoAgent(
  input: MemoInput,
  deps: AgentDeps,
): Promise<{ memo: InvestmentMemo; scenarios: ScenarioSet }> {
  const scenarios = calculateFinancialScenarios(input.diligence.financial.assumptions);

  const memo = await deps.llm.generateStructured({
    schema: InvestmentMemoSchema,
    schemaName: "InvestmentMemo",
    system: SYSTEM,
    prompt:
      `Fund thesis: ${input.fundProfile.thesisSummary}\n` +
      `Recurring reasons to invest: ${input.fundProfile.recurringReasonsToInvest.join(", ")}\n` +
      `Recurring reasons to pass: ${input.fundProfile.recurringReasonsToPass.join(", ")}\n\n` +
      `Company:\n${describeCompany(input.company)}\n\n` +
      (input.analogues?.length ? `Historical analogues:\n${describeMany(input.analogues)}\n\n` : "") +
      `Technical strengths: ${input.diligence.technical.keyStrengths.join("; ")}\n` +
      `Commercial risks: ${input.diligence.commercial.keyRisks.join("; ")}\n` +
      `Return scenarios (${scenarioSummary(scenarios)})\n\n` +
      `Committee: recommend ${input.committee.recommendedCompanyId} (conf ${input.committee.confidence}). ` +
      `Central disagreement: ${input.committee.centralDisagreement}\n\n` +
      `Write the memo for companyId ${input.company.id}.`,
  });

  return { memo: { ...memo, companyId: input.company.id }, scenarios };
}
