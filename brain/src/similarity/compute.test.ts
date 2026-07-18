import { describe, it, expect } from "vitest";
import { computeCompanySimilarity, DEFAULT_SIMILARITY_WEIGHTS } from "./compute.js";
import { CompanyAttributesSchema } from "../schemas/company.js";

const mk = (o: Record<string, unknown>) => CompanyAttributesSchema.parse(o);

const a = mk({
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
  problemStatement: "reducing clinical documentation burden for doctors",
});

describe("computeCompanySimilarity", () => {
  it("weights sum to 1", () => {
    const total = Object.values(DEFAULT_SIMILARITY_WEIGHTS).reduce((x, y) => x + y, 0);
    expect(total).toBeCloseTo(1);
  });

  it("is 1.0 for an identical company", () => {
    const res = computeCompanySimilarity(a, a);
    expect(res.overall).toBeCloseTo(1);
  });

  it("returns a value in [0,1] and per-dimension scores", () => {
    const b = mk({
      industryPath: ["Healthcare", "Infrastructure", "Diagnostics"],
      productCategoryPath: ["Software", "Workflow application"],
      targetCustomers: ["Hospitals"],
      technicalApproaches: ["Computer vision"],
      founderArchetypes: ["Academic researcher"],
      disruptionMechanisms: ["Improves diagnosis"],
      regulatoryLabels: ["FDA-regulated"],
      businessModel: "Subscription SaaS",
      goToMarket: "Founder-led enterprise sales",
      operationalModel: "Pure software",
      problemStatement: "improving diagnosis accuracy for radiologists",
    });
    const res = computeCompanySimilarity(a, b);
    expect(res.overall).toBeGreaterThan(0);
    expect(res.overall).toBeLessThan(1);
    expect(res.dimensions.industry).toBeCloseTo(2 / 3);
    expect(res.dimensions.product).toBe(1);
    // shares GTM partially (enterprise sales <-> founder-led enterprise sales)
    expect(res.dimensions.goToMarket).toBeGreaterThan(0);
    expect(res.dimensions.goToMarket).toBeLessThan(1);
  });

  it("similar companies score higher than dissimilar ones", () => {
    const near = mk({
      industryPath: ["Healthcare", "Infrastructure", "Clinical documentation"],
      productCategoryPath: ["Software", "Workflow application"],
      targetCustomers: ["Hospitals", "Clinicians"],
      technicalApproaches: ["Foundation-model application"],
      founderArchetypes: ["Clinician-founder"],
      businessModel: "Subscription SaaS",
      goToMarket: "Enterprise sales",
      problemStatement: "reducing documentation burden for clinicians",
    });
    const far = mk({
      industryPath: ["Fintech", "Payments"],
      productCategoryPath: ["Infrastructure", "API"],
      targetCustomers: ["Consumers"],
      technicalApproaches: ["Marketplace matching"],
      founderArchetypes: ["Repeat founder"],
      businessModel: "Transaction fees",
      goToMarket: "Direct to consumer",
      problemStatement: "moving money between consumers cheaply",
    });
    expect(computeCompanySimilarity(a, near).overall).toBeGreaterThan(
      computeCompanySimilarity(a, far).overall,
    );
  });

  it("uses provided embeddings for the problem dimension", () => {
    const b = mk({ problemStatement: "totally different words" });
    const withEmb = computeCompanySimilarity(a, b, {
      embeddings: { a: { problem: [1, 0, 0] }, b: { problem: [1, 0, 0] } },
    });
    expect(withEmb.dimensions.problem).toBeCloseTo(1);
  });
});
