import { z } from "zod";
import { CompanySchema, type Company } from "../schemas/company.js";
import { FundProfileSchema, type FundProfile } from "../schemas/fundProfile.js";
import { HistoricalMemoSchema, type HistoricalMemo } from "../schemas/history.js";

/**
 * Small synthetic healthcare-fund scenario used by tests and the demo run.
 * (Richard owns the richer synthetic dataset; this is a minimal stand-in.)
 */

type CompanyInput = z.input<typeof CompanySchema>;

export function makeCompany(partial: Partial<CompanyInput> & { id: string; name: string }): Company {
  return CompanySchema.parse({
    description: "",
    ...partial,
    attributes: { ...(partial.attributes ?? {}) },
  });
}

// --- Portfolio (invested) ---
export const medflow = makeCompany({
  id: "co_medflow",
  name: "MedFlow",
  description: "Ambient clinical documentation for hospital physicians.",
  historicalStatus: "portfolio",
  outcome: "succeeded",
  stage: "seed",
  geography: "US",
  sector: "Healthcare",
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
    problemStatement: "reducing clinical documentation burden for physicians",
  },
});

export const careloop = makeCompany({
  id: "co_careloop",
  name: "CareLoop",
  description: "Care-coordination workflow for hospital discharge.",
  historicalStatus: "portfolio",
  outcome: "active",
  stage: "seed",
  geography: "US",
  sector: "Healthcare",
  attributes: {
    industryPath: ["Healthcare", "Infrastructure", "Care coordination"],
    productCategoryPath: ["Software", "Workflow application"],
    targetCustomers: ["Hospitals", "Care teams"],
    technicalApproaches: ["Workflow automation"],
    founderArchetypes: ["Former industry operator"],
    disruptionMechanisms: ["Creates a new workflow"],
    regulatoryLabels: ["Clinical-validation-dependent"],
    businessModel: "Subscription SaaS",
    goToMarket: "Enterprise sales",
    operationalModel: "Pure software",
    problemStatement: "coordinating patient discharge across care teams",
  },
});

// --- Rejected ---
export const healthadboard = makeCompany({
  id: "co_healthadboard",
  name: "HealthAdBoard",
  description: "Ad-supported patient education content network.",
  historicalStatus: "rejected",
  outcome: "failed",
  stage: "seed",
  geography: "US",
  sector: "Healthcare",
  attributes: {
    industryPath: ["Healthcare", "Consumer", "Patient education"],
    productCategoryPath: ["Software", "Consumer application"],
    targetCustomers: ["Consumers", "Patients"],
    technicalApproaches: ["Data aggregation"],
    founderArchetypes: ["Repeat founder"],
    disruptionMechanisms: ["Changes distribution"],
    regulatoryLabels: ["Pure software"],
    businessModel: "Advertising",
    goToMarket: "Direct to consumer",
    operationalModel: "Pure software",
    problemStatement: "distributing patient education content to consumers",
  },
});

// --- Candidate universe ---
export const scribeai = makeCompany({
  id: "co_scribeai",
  name: "ScribeAI",
  description: "AI medical scribe that drafts clinical notes from visit audio.",
  historicalStatus: "external",
  stage: "seed",
  geography: "US",
  sector: "Healthcare",
  checkSizeSought: 2_000_000,
  valuation: 18_000_000,
  metrics: { arr: 1_200_000, arrGrowthRate: 2.5, churnRate: 0.08, nrr: 1.15, grossMargin: 0.78 },
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
    problemStatement: "drafting clinical notes automatically from patient visits",
  },
  founders: [{ name: "Dr. Alina Reyes", role: "CEO", background: "Practicing physician, ex-Epic" }],
});

export const radintel = makeCompany({
  id: "co_radintel",
  name: "RadIntel",
  description: "Computer-vision triage for radiology departments.",
  historicalStatus: "external",
  stage: "seed",
  geography: "US",
  sector: "Healthcare",
  checkSizeSought: 3_000_000,
  valuation: 25_000_000,
  metrics: { arr: 800_000, arrGrowthRate: 1.8, churnRate: 0.05, nrr: 1.1, grossMargin: 0.7 },
  attributes: {
    industryPath: ["Healthcare", "Infrastructure", "Diagnostics"],
    productCategoryPath: ["Software", "Workflow application"],
    targetCustomers: ["Hospitals", "Radiologists"],
    technicalApproaches: ["Computer vision"],
    founderArchetypes: ["Academic researcher"],
    disruptionMechanisms: ["Improves diagnosis"],
    regulatoryLabels: ["FDA-regulated"],
    businessModel: "Subscription SaaS",
    goToMarket: "Founder-led enterprise sales",
    operationalModel: "Pure software",
    problemStatement: "triaging radiology studies to speed up diagnosis",
  },
  founders: [{ name: "Wei Chen", role: "CEO", background: "Stanford CS PhD, medical imaging" }],
});

export const payflow = makeCompany({
  id: "co_payflow",
  name: "PayFlow",
  description: "Consumer peer-to-peer payments app.",
  historicalStatus: "external",
  stage: "seed",
  geography: "US",
  sector: "Fintech",
  checkSizeSought: 4_000_000,
  attributes: {
    industryPath: ["Fintech", "Payments"],
    productCategoryPath: ["Infrastructure", "API"],
    targetCustomers: ["Consumers"],
    technicalApproaches: ["Marketplace matching"],
    founderArchetypes: ["Former big-tech engineer"],
    disruptionMechanisms: ["Reduces cost"],
    regulatoryLabels: ["Financially-regulated"],
    businessModel: "Transaction fees",
    goToMarket: "Direct to consumer",
    operationalModel: "Pure software",
    problemStatement: "moving money between consumers cheaply",
  },
});

export const vetcharts = makeCompany({
  id: "co_vetcharts",
  name: "VetCharts",
  description: "Clinical documentation for veterinary clinics.",
  historicalStatus: "external",
  stage: "seed",
  geography: "US",
  sector: "Healthcare",
  checkSizeSought: 1_500_000,
  attributes: {
    industryPath: ["Healthcare", "Infrastructure", "Clinical documentation"],
    productCategoryPath: ["Software", "Workflow application"],
    targetCustomers: ["Veterinary clinics"],
    technicalApproaches: ["Foundation-model application"],
    founderArchetypes: ["Former industry operator"],
    disruptionMechanisms: ["Replaces manual labor"],
    regulatoryLabels: ["Pure software"],
    businessModel: "Subscription SaaS",
    goToMarket: "Product-led growth",
    operationalModel: "Pure software",
    problemStatement: "drafting clinical notes for veterinarians",
  },
});

// --- External competitor ---
export const notegen = makeCompany({
  id: "co_notegen",
  name: "NoteGen",
  description: "Incumbent clinical-notes vendor bundled with an EHR.",
  historicalStatus: "external",
  sector: "Healthcare",
  attributes: {
    industryPath: ["Healthcare", "Infrastructure", "Clinical documentation"],
    productCategoryPath: ["Software", "System of record"],
    targetCustomers: ["Hospitals"],
    technicalApproaches: ["Workflow automation"],
    founderArchetypes: ["Former industry operator"],
    disruptionMechanisms: ["Replaces an incumbent product"],
    regulatoryLabels: ["Clinical-validation-dependent"],
    businessModel: "Licensing",
    goToMarket: "Enterprise sales",
    operationalModel: "Pure software",
    problemStatement: "documenting clinical encounters inside the EHR",
  },
});

export const portfolioCompanies: Company[] = [medflow, careloop];
export const rejectedDeals: Company[] = [healthadboard];
export const candidateUniverse: Company[] = [scribeai, radintel, payflow, vetcharts];
export const competitors: Company[] = [notegen];

export const historicalMemos: HistoricalMemo[] = [
  HistoricalMemoSchema.parse({
    id: "memo_medflow",
    companyId: "co_medflow",
    companyName: "MedFlow",
    decision: "invested",
    text: "Invested in MedFlow: clinician founder, clear hospital pull, ambient documentation replaces hours of manual charting. Enterprise sales motion into health systems.",
    rationale: "Clinician founder credibility plus urgent hospital workflow pain.",
    identifiedMoat: "Clinical workflow integration and clinician trust.",
    decisionDrivers: ["clinician-founder", "urgent workflow pain", "enterprise distribution"],
    outcome: "succeeded",
  }),
  HistoricalMemoSchema.parse({
    id: "memo_healthadboard",
    companyId: "co_healthadboard",
    companyName: "HealthAdBoard",
    decision: "rejected",
    text: "Passed on HealthAdBoard: ad-supported consumer model, weak distribution, no clinical moat, unclear willingness to pay.",
    rationale: "Consumer ad model outside thesis; no defensible clinical workflow.",
    identifiedMoat: "None identified.",
    decisionDrivers: ["consumer ad model", "weak distribution", "no clinical moat"],
    outcome: "failed",
  }),
];

export const fundProfile: FundProfile = FundProfileSchema.parse({
  thesisSummary:
    "Seed-stage healthcare infrastructure software with clinician or operator founders, enterprise distribution into health systems, and a clinical-workflow moat.",
  stages: ["seed", "pre_seed"],
  sectors: ["Healthcare"],
  geographies: ["US"],
  checkSize: { min: 1_000_000, max: 3_000_000 },
  ownershipTarget: 0.1,
  criteria: [
    {
      id: "crit_founder",
      name: "Founder credibility",
      weight: 0.3,
      positiveSignals: ["clinician-founder", "domain operator"],
      negativeSignals: ["no domain experience"],
      supportingMemoIds: ["memo_medflow"],
    },
    {
      id: "crit_distribution",
      name: "Distribution readiness",
      weight: 0.25,
      positiveSignals: ["enterprise sales", "existing hospital relationships"],
      negativeSignals: ["unproven consumer channel"],
      supportingMemoIds: ["memo_medflow", "memo_healthadboard"],
    },
    {
      id: "crit_moat",
      name: "Clinical workflow moat",
      weight: 0.25,
      positiveSignals: ["workflow integration", "regulatory barrier"],
      negativeSignals: ["commodity content"],
      supportingMemoIds: ["memo_medflow"],
    },
    {
      id: "crit_market",
      name: "Market urgency",
      weight: 0.2,
      positiveSignals: ["acute staffing pain", "reimbursed workflow"],
      negativeSignals: ["nice to have"],
      supportingMemoIds: [],
    },
  ],
  attributePreferences: {
    "industry:clinical documentation": 0.8,
    "founderArchetypes:clinician-founder": 0.9,
    "founderArchetypes:former industry operator": 0.4,
    "businessModel:subscription saas": 0.6,
    "goToMarket:enterprise sales": 0.7,
    "targetCustomers:hospitals": 0.7,
    "businessModel:advertising": -0.9,
    "goToMarket:direct to consumer": -0.7,
    "targetCustomers:consumers": -0.6,
  },
  archetypes: {
    successful: ["Clinician-founder healthcare infrastructure with enterprise pull"],
    rejected: ["Consumer ad-supported healthcare content"],
  },
  recurringReasonsToInvest: ["Clinician founder", "Urgent hospital workflow pain", "Enterprise distribution"],
  recurringReasonsToPass: ["Consumer ad model", "No clinical moat", "Weak distribution"],
  partnerProfiles: [
    { id: "partner_tech", name: "Tara (Technical)", archetype: "technical", priorities: ["founder quality", "technical moat", "regulatory defensibility"], biases: {} },
    { id: "partner_comm", name: "Cole (Commercial)", archetype: "commercial", priorities: ["distribution", "market size", "scalability"], biases: {} },
    { id: "partner_fin", name: "Fiona (Financial)", archetype: "financial", priorities: ["capital efficiency", "ownership", "fund return"], biases: {} },
  ],
});
