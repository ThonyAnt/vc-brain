import type { Company } from "../schemas/company.js";
import type { FundProfile, PartnerProfile } from "../schemas/fundProfile.js";
import type { CandidateDiligence } from "../schemas/diligence.js";
import type { PartnerOpinion } from "../schemas/committee.js";
import type { AgentDeps } from "./types.js";
import { PartnerOpinionSetSchema } from "./types.js";
import { describeCompany } from "./util.js";

function partnerSystem(p: PartnerProfile): string {
  return (
    `You are ${p.name}, a ${p.archetype} partner at the fund. You prioritize: ${p.priorities.join(
      ", ",
    )}. ` +
    `Evaluate each finalist through THAT lens specifically — do not average across all concerns. ` +
    `Vote strong_yes | yes | uncertain | no with a confidence 0..1, a crisp thesis, top evidence, ` +
    `your single biggest concern, and what evidence would change your vote. Genuine disagreement with ` +
    `other partners is expected and valuable.`
  );
}

function diligenceDigest(d: CandidateDiligence | undefined): string {
  if (!d) return "  (no diligence)";
  return (
    `  technical: moat=${d.technical.moatScore}, feasibility=${d.technical.feasibilityScore}, ` +
    `founder=${d.technical.founderTechnicalScore}; risks=${d.technical.keyRisks.join("; ")}\n` +
    `  commercial: market=${d.commercial.marketScore}, urgency=${d.commercial.urgencyScore}, ` +
    `distribution=${d.commercial.distributionScore}, scalability=${d.commercial.scalabilityScore}\n` +
    `  financial: revenueQuality=${d.financial.revenueQualityScore}, ` +
    `capitalEfficiency=${d.financial.capitalEfficiencyScore}`
  );
}

export interface PartnerReviewInput {
  partner: PartnerProfile;
  finalists: Company[];
  diligence: Record<string, CandidateDiligence>;
  fundProfile: FundProfile;
}

/** One partner independently evaluates every finalist. */
export async function partnerReviewAgent(
  input: PartnerReviewInput,
  deps: AgentDeps,
): Promise<PartnerOpinion[]> {
  const block = input.finalists
    .map((c) => `${describeCompany(c)}\n${diligenceDigest(input.diligence[c.id])}`)
    .join("\n\n");

  const res = await deps.llm.generateStructured({
    schema: PartnerOpinionSetSchema,
    schemaName: "PartnerOpinionSet",
    system: partnerSystem(input.partner),
    prompt:
      `Fund thesis: ${input.fundProfile.thesisSummary}\n\n` +
      `Finalists and diligence:\n${block}\n\n` +
      `Return one opinion per finalist. Use partnerId "${input.partner.id}".`,
  });

  // Guarantee the partnerId is set correctly regardless of the model.
  return res.opinions.map((o) => ({ ...o, partnerId: input.partner.id }));
}
