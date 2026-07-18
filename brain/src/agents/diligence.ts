import type { Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import {
  TechnicalAnalysisSchema,
  CommercialAnalysisSchema,
  FinancialAnalysisSchema,
  RiskAnalysisSchema,
  type TechnicalAnalysis,
  type CommercialAnalysis,
  type FinancialAnalysis,
  type RiskAnalysis,
} from "../schemas/diligence.js";
import type { AgentDeps } from "./types.js";
import { describeCompany, describeMany } from "./util.js";

export interface DiligenceInput {
  company: Company;
  fundProfile: FundProfile;
  /** Historical analogues (winners/rejects/competitors) for grounding. */
  analogues?: Company[];
}

const analogueBlock = (input: DiligenceInput) =>
  input.analogues?.length ? `\nRelevant analogues:\n${describeMany(input.analogues)}\n` : "";

const TECH_SYSTEM = `You are the Technical Diligence partner. Assess technical feasibility,
defensibility/moat, proprietary data/IP, regulatory requirements, technical founder credibility,
and incumbent replication risk. Scores are 0..1. Be specific and skeptical; propose the diligence
questions that would most change your view. Reference analogues by ID where relevant.`;

export async function technicalDiligenceAgent(
  input: DiligenceInput,
  deps: AgentDeps,
): Promise<TechnicalAnalysis> {
  return deps.llm.generateStructured({
    schema: TechnicalAnalysisSchema,
    schemaName: "TechnicalAnalysis",
    system: TECH_SYSTEM,
    prompt: `Company:\n${describeCompany(input.company)}\n${analogueBlock(input)}\nProduce the technical analysis.`,
  });
}

const COMM_SYSTEM = `You are the Commercial Diligence partner. Assess market size, customer urgency,
competitive intensity, distribution/GTM, pricing power, scalability, customer concentration, market
timing, and portfolio synergies/conflicts. Scores are 0..1. Be specific about distribution risk.`;

export async function commercialDiligenceAgent(
  input: DiligenceInput,
  deps: AgentDeps,
): Promise<CommercialAnalysis> {
  return deps.llm.generateStructured({
    schema: CommercialAnalysisSchema,
    schemaName: "CommercialAnalysis",
    system: COMM_SYSTEM,
    prompt:
      `Fund thesis: ${input.fundProfile.thesisSummary}\n\n` +
      `Company:\n${describeCompany(input.company)}\n${analogueBlock(input)}\nProduce the commercial analysis.`,
  });
}

const FIN_SYSTEM = `You are the Financial Diligence partner. Assess revenue quality and capital
efficiency (scores 0..1) and PROPOSE the financial assumptions for a return model: investmentAmount,
entryValuation, initialOwnership (0..1), projectedArr (at exit), exitMultiple, dilutionFactor (0..1),
yearsToExit. Keep assumptions grounded in the company's metrics and the fund's check size. The return
math itself is computed deterministically downstream — you only propose assumptions.`;

export async function financialDiligenceAgent(
  input: DiligenceInput,
  deps: AgentDeps,
): Promise<FinancialAnalysis> {
  const { checkSize, ownershipTarget } = input.fundProfile;
  return deps.llm.generateStructured({
    schema: FinancialAnalysisSchema,
    schemaName: "FinancialAnalysis",
    system: FIN_SYSTEM,
    prompt:
      `Fund check size: ${checkSize.min}-${checkSize.max}, ownership target: ${ownershipTarget ?? "n/a"}.\n\n` +
      `Company:\n${describeCompany(input.company)}\n\nProduce the financial analysis with proposed assumptions.`,
  });
}

const RISK_SYSTEM = `You are the Risk & Diligence partner. Detect critical risks, unsupported claims,
contradictions, and missing information across the diligence, then list the highest-value follow-up
questions. Be concise and prioritized.`;

export interface RiskInput extends DiligenceInput {
  technical: TechnicalAnalysis;
  commercial: CommercialAnalysis;
  financial: FinancialAnalysis;
}

export async function riskAgent(input: RiskInput, deps: AgentDeps): Promise<RiskAnalysis> {
  return deps.llm.generateStructured({
    schema: RiskAnalysisSchema,
    schemaName: "RiskAnalysis",
    system: RISK_SYSTEM,
    prompt:
      `Company:\n${describeCompany(input.company)}\n\n` +
      `Technical risks: ${input.technical.keyRisks.join("; ")}\n` +
      `Commercial risks: ${input.commercial.keyRisks.join("; ")}\n` +
      `Financial risks: ${input.financial.keyRisks.join("; ")}\n\n` +
      `Produce the consolidated risk analysis.`,
  });
}
