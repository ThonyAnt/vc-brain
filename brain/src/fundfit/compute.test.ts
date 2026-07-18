import { describe, it, expect } from "vitest";
import { computeFundFit, computeSourcingScore, attributeKeys } from "./compute.js";
import { CompanyAttributesSchema } from "../schemas/company.js";

const attrs = CompanyAttributesSchema.parse({
  industryPath: ["Healthcare", "Infrastructure"],
  businessModel: "Subscription SaaS",
  targetCustomers: ["Enterprise", "Hospitals"],
  founderArchetypes: ["Clinician-founder"],
});

describe("attributeKeys", () => {
  it("emits dimension:value keys for each attribute value", () => {
    const keys = attributeKeys(attrs);
    expect(keys).toContain("businessModel:subscription saas");
    expect(keys).toContain("targetCustomers:hospitals");
    expect(keys).toContain("founderArchetypes:clinician-founder");
  });
});

describe("computeFundFit", () => {
  it("sums matched preference weights and lists matches", () => {
    const prefs = {
      "businessModel:subscription saas": 0.6,
      "founderArchetypes:clinician-founder": 0.8,
      "targetCustomers:smb": -0.5, // not present -> ignored
    };
    const res = computeFundFit(attrs, prefs);
    expect(res.raw).toBeCloseTo(1.4);
    expect(res.positiveMatches).toContain("businessModel:subscription saas");
    expect(res.score).toBeGreaterThan(0.5); // logistic(1.4) > 0.5
  });

  it("returns 0.5 normalized score for no matches", () => {
    const res = computeFundFit(attrs, {});
    expect(res.raw).toBe(0);
    expect(res.score).toBeCloseTo(0.5);
  });

  it("separates negative matches", () => {
    const res = computeFundFit(attrs, { "founderArchetypes:clinician-founder": -0.4 });
    expect(res.raw).toBeCloseTo(-0.4);
    expect(res.negativeMatches).toContain("founderArchetypes:clinician-founder");
  });
});

describe("computeSourcingScore", () => {
  it("applies the default 0.45/-0.20/0.35 formula", () => {
    const s = computeSourcingScore({
      similarityToPositive: 0.8,
      similarityToRejected: 0.5,
      thesisMatch: 0.6,
    });
    expect(s).toBeCloseTo(0.45 * 0.8 - 0.2 * 0.5 + 0.35 * 0.6);
  });

  it("honors custom coefficients", () => {
    const s = computeSourcingScore(
      { similarityToPositive: 1, similarityToRejected: 0, thesisMatch: 0 },
      { positiveHistory: 0.9, rejectedHistory: 0.2, thesisMatch: 0.1 },
    );
    expect(s).toBeCloseTo(0.9);
  });
});
