import type { StructuredRequest } from "../llm/client.js";
import type { MockLLMOptions } from "../llm/mock.js";
import type { SearchResult } from "../search/client.js";
import { fundProfile } from "./sample.js";

/** Canned web-search results for offline discovery tests. */
export const mockSearchResults: SearchResult[] = [
  {
    title: "Seed-stage healthcare AI startups recently funded",
    url: "https://example.com/healthcare-seed",
    content:
      "NoteHealth raised a seed round for AI clinical documentation in outpatient clinics. " +
      "ClaimSync automates medical claims reconciliation for health systems.",
    score: 0.92,
  },
];

/** Extract unique `co_*` company IDs from a prompt, in order of appearance. */
function companyIds(prompt: string): string[] {
  const out: string[] = [];
  for (const m of prompt.matchAll(/co_[a-z0-9]+/g)) {
    if (!out.includes(m[0])) out.push(m[0]);
  }
  return out;
}

function firstMatch(prompt: string, re: RegExp, fallback: string): string {
  return prompt.match(re)?.[0] ?? fallback;
}

/**
 * Canned, offline agent outputs for the full pipeline. Handlers read the IDs
 * out of each prompt so the mock stays coherent (right company/partner/criterion)
 * without any network calls. This is what runs until VC_BRAIN_LLM=openai is set.
 */
export const mockAgentStructured: NonNullable<MockLLMOptions["structured"]> = {
  FundProfile: fundProfile,

  CompanyAttributes: {
    industryPath: ["Healthcare", "Infrastructure", "Clinical documentation"],
    productCategoryPath: ["Software", "Workflow application"],
    targetCustomers: ["Hospitals", "Clinicians"],
    technicalApproaches: ["Foundation-model application"],
    founderArchetypes: ["Clinician-founder"],
    disruptionMechanisms: ["Replaces manual labor"],
    regulatoryLabels: ["Clinical-validation-dependent"],
    businessModel: "Subscription SaaS",
    goToMarket: "Enterprise sales",
    operationalModel: "Pure software",
    problemStatement: "reducing clinical documentation burden",
  },

  DiscoveryExtraction: {
    companies: [
      {
        name: "NoteHealth",
        description: "AI clinical documentation for outpatient clinics.",
        website: "https://notehealth.example",
        sector: "Healthcare",
        stage: "seed",
        geography: "US",
        hqCity: "Nashville",
        hqLat: 36.1627,
        hqLng: -86.7816,
        founders: [],
        sourceUrls: ["https://example.com/healthcare-seed"],
        attributes: {
          industryPath: ["Healthcare", "Infrastructure", "Clinical documentation"],
          productCategoryPath: ["Software", "Workflow application"],
          targetCustomers: ["Clinics", "Clinicians"],
          technicalApproaches: ["Foundation-model application"],
          founderArchetypes: ["Clinician-founder"],
          disruptionMechanisms: ["Replaces manual labor"],
          regulatoryLabels: ["Clinical-validation-dependent"],
          businessModel: "Subscription SaaS",
          goToMarket: "Enterprise sales",
          operationalModel: "Pure software",
          problemStatement: "reducing documentation burden in outpatient clinics",
        },
      },
      {
        name: "ClaimSync",
        description: "Automated medical claims reconciliation for health systems.",
        website: "https://claimsync.example",
        sector: "Healthcare",
        stage: "seed",
        geography: "US",
        hqCity: "Columbus",
        hqLat: 39.9612,
        hqLng: -82.9988,
        founders: [],
        sourceUrls: ["https://example.com/healthcare-seed"],
        attributes: {
          industryPath: ["Healthcare", "Infrastructure", "Revenue cycle"],
          productCategoryPath: ["Software", "Workflow application"],
          targetCustomers: ["Hospitals", "Billing teams"],
          technicalApproaches: ["Workflow automation"],
          founderArchetypes: ["Former industry operator"],
          disruptionMechanisms: ["Automates compliance"],
          regulatoryLabels: ["Financially-regulated"],
          businessModel: "Subscription SaaS",
          goToMarket: "Enterprise sales",
          operationalModel: "Pure software",
          problemStatement: "reconciling medical claims to reduce denials",
        },
      },
    ],
  },

  ScoutEnrichment: (req: StructuredRequest) => {
    const ids = companyIds(req.prompt);
    return {
      finalistIds: ids.slice(0, 3),
      enrichments: ids.map((id) => ({
        companyId: id,
        reasonsToAdvance: [`Resembles a prior winner on thesis fit (${id})`],
        reasonsToReject: ["Distribution not yet proven at scale"],
        unresolvedRisks: ["Depends on enterprise sales execution"],
      })),
    };
  },

  TechnicalAnalysis: {
    moatScore: 0.7,
    feasibilityScore: 0.8,
    founderTechnicalScore: 0.75,
    keyStrengths: ["Domain-credible founder", "Workflow integration depth"],
    keyRisks: ["Foundation-model layer is replicable"],
    diligenceQuestions: ["What proprietary data compounds over time?"],
    historicalAnalogues: [],
  },

  CommercialAnalysis: {
    marketScore: 0.75,
    urgencyScore: 0.7,
    competitiveIntensity: 0.55,
    distributionScore: 0.6,
    pricingPowerScore: 0.6,
    scalabilityScore: 0.7,
    keyStrengths: ["Acute hospital staffing pain"],
    keyRisks: ["Long enterprise sales cycles"],
    portfolioSynergies: ["Shares buyers with MedFlow"],
    portfolioConflicts: [],
    diligenceQuestions: ["What is the current sales cycle length?"],
  },

  FinancialAnalysis: {
    revenueQualityScore: 0.72,
    capitalEfficiencyScore: 0.65,
    assumptions: {
      investmentAmount: 2_000_000,
      entryValuation: 18_000_000,
      initialOwnership: 0.11,
      projectedArr: 12_000_000,
      exitMultiple: 9,
      dilutionFactor: 0.6,
      yearsToExit: 6,
    },
    keyStrengths: ["Recurring revenue with expansion"],
    keyRisks: ["CAC payback unproven"],
    diligenceQuestions: ["What is net revenue retention by cohort?"],
  },

  RiskAnalysis: {
    criticalRisks: ["Distribution execution risk"],
    unsupportedClaims: ["Claimed NRR not yet cohort-verified"],
    contradictions: [],
    missingInformation: ["Security/compliance posture"],
    highValueQuestions: ["Show cohort retention and CAC payback"],
  },

  PartnerOpinionSet: (req: StructuredRequest) => {
    const ids = companyIds(req.prompt);
    const partnerId = firstMatch(req.prompt, /partner_[a-z]+/, "partner_unknown");
    // Deliberate disagreement: technical partner is bullish, financial more cautious.
    const bullish = partnerId === "partner_tech";
    return {
      opinions: ids.map((id, i) => ({
        partnerId,
        companyId: id,
        vote: i === 0 ? (bullish ? "strong_yes" : "yes") : "uncertain",
        confidence: i === 0 ? 0.8 : 0.5,
        thesis:
          i === 0
            ? `Best fit to the fund's thesis via ${partnerId}'s lens`
            : "Plausible but weaker on this partner's priorities",
        topEvidence: ["Founder-market fit", "Workflow moat"],
        biggestConcern: bullish ? "Replicability of the model layer" : "Distribution and CAC payback",
        evidenceThatWouldChangeVote: ["Signed enterprise pilots with retention data"],
      })),
    };
  },

  CommitteeDecision: (req: StructuredRequest) => {
    const ids = companyIds(req.prompt);
    const min = fundProfile.checkSize.min;
    const max = fundProfile.checkSize.max;
    return {
      rankedFinalistIds: ids,
      recommendedCompanyId: ids[0] ?? "",
      confidence: 0.72,
      recommendedCheckSize: Math.round((min + max) / 2),
      centralDisagreement: "Technical conviction vs. unproven distribution/CAC.",
      strongestBullCase: "Clinician-founder with acute hospital pull, mirrors MedFlow.",
      strongestBearCase: "Model layer is replicable and sales cycle is long.",
      unresolvedDiligence: ["Cohort retention", "CAC payback", "Security posture"],
      rationale: "Closest analogue to a prior winner; fits thesis and check size.",
    };
  },

  InvestmentMemo: (req: StructuredRequest) => {
    const id = companyIds(req.prompt)[0] ?? "";
    return {
      companyId: id,
      executiveSummary: "Recommended seed investment; closest analogue to a prior winner.",
      companyOverview: "AI clinical documentation for hospital physicians.",
      investmentThesis: "Clinician-founder + acute workflow pain + enterprise distribution.",
      whyNow: "Hospital staffing pressure makes documentation automation urgent.",
      historicalAnalogues: [
        { text: "Mirrors MedFlow's clinician-founder pattern", sourceNodeIds: ["co_medflow"], confidence: 0.8 },
      ],
      marketAndCompetition: "Crowded but differentiated on workflow depth vs. NoteGen.",
      technicalMoat: "Workflow integration and clinician trust; data compounding TBD.",
      businessModel: "Subscription SaaS into health systems.",
      financialScenarios: "Base ~3x MOIC; bull higher on expansion, bear on churn.",
      reasonsToInvest: [
        { text: "Founder-market fit", sourceNodeIds: [id], confidence: 0.8 },
      ],
      reasonsToPass: [
        { text: "Distribution unproven at scale", sourceNodeIds: [id], confidence: 0.5 },
      ],
      keyRisks: ["Distribution execution", "Model replicability"],
      openDiligenceQuestions: ["Cohort retention", "CAC payback"],
      committeeDisagreement: "Technical conviction vs. distribution caution.",
      recommendation: "Advance to partner meeting with a term-sheet-conditional check.",
    };
  },

  MemoExtraction: (req: StructuredRequest) => {
    const p = req.prompt;
    const name = (p.match(/company:\s*([^\n.]+)/i)?.[1] ?? "Unknown Co").trim();
    const decisionRaw = p.match(/decision:\s*(invested|rejected|passed)/i)?.[1]?.toLowerCase();
    const decision = (decisionRaw ?? "invested") as "invested" | "rejected" | "passed";
    return {
      companyName: name,
      decision,
      rationale: "Extracted rationale from the memo.",
      identifiedMoat: "Clinical workflow integration and clinician trust.",
      decisionDrivers: ["clinician-founder", "enterprise distribution", "workflow moat"],
      outcome: decision === "invested" ? "succeeded" : "failed",
      sector: "Healthcare",
      stage: "seed",
      geography: "US",
      attributes: {
        industryPath: ["Healthcare", "Infrastructure", "Clinical documentation"],
        productCategoryPath: ["Software", "Workflow application"],
        targetCustomers: ["Hospitals", "Clinicians"],
        technicalApproaches: ["Foundation-model application"],
        founderArchetypes: ["Clinician-founder"],
        disruptionMechanisms: ["Replaces manual labor"],
        regulatoryLabels: ["Clinical-validation-dependent"],
        businessModel: "Subscription SaaS",
        goToMarket: "Enterprise sales",
        operationalModel: "Pure software",
        problemStatement: "reducing clinical documentation burden",
      },
    };
  },

  LearningInterpretation: (req: StructuredRequest) => {
    const prompt = req.prompt;
    // Parse the (id, name) pairs the agent listed for the fund's criteria.
    const criteria: { id: string; name: string }[] = [];
    for (const m of prompt.matchAll(/(crit_[a-z]+)\(([^,]+),/g)) {
      criteria.push({ id: m[1] ?? "", name: (m[2] ?? "").trim() });
    }
    const rationale = prompt.match(/rationale="([^"]*)"/)?.[1] ?? "";
    const explicit = prompt.match(/criterion=(crit_[a-z]+)/)?.[1];

    // Choose the criterion the feedback most implicates: an explicit id wins;
    // otherwise the one whose name shares the most words with the rationale.
    const words = new Set(rationale.toLowerCase().match(/[a-z]+/g) ?? []);
    const byOverlap = criteria
      .map((c) => ({ c, overlap: c.name.toLowerCase().split(/\s+/).filter((w) => words.has(w)).length }))
      .sort((a, b) => b.overlap - a.overlap);
    const chosen =
      (explicit ? criteria.find((c) => c.id === explicit) : undefined) ??
      (byOverlap[0]?.overlap ? byOverlap[0].c : undefined) ??
      criteria[0] ??
      { id: "crit_distribution", name: "distribution readiness" };

    // A pass on a weak criterion strengthens it; "incorrect"/"decrease" weakens.
    const strengthen = !/incorrect|decrease concern|over-?weighted/i.test(prompt);
    return {
      criterionId: chosen.id,
      feedbackDirection: strengthen ? 0.6 : -0.6,
      confidence: 0.7,
      // Sentence names the SAME criterion that actually changed, so the demo stays coherent.
      whatTheFundLearned: `The fund now weights ${chosen.name.toLowerCase()} ${
        strengthen ? "more" : "less"
      } heavily for these deals.`,
    };
  },
};

export const mockAgentOptions: MockLLMOptions = { structured: mockAgentStructured };
