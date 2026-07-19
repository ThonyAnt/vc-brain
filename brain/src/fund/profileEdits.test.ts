import { describe, it, expect } from "vitest";
import { FundProfileSchema, type FundProfile } from "../schemas/fundProfile.js";
import { applyFundPatch, fundProfileToView } from "./profileEdits.js";

function makeProfile(): FundProfile {
  return FundProfileSchema.parse({
    thesisSummary: "Original thesis.",
    stages: ["seed", "series_a"],
    sectors: ["software", "fintech"],
    geographies: ["global"],
    checkSize: { min: 1_000_000, max: 2_500_000 },
    criteria: [
      { id: "moat", name: "Moat and Competitive Advantage", weight: 0.2 },
      { id: "founder", name: "Founder's Track Record and Market Fit", weight: 0.15 },
    ],
    archetypes: { successful: [], rejected: [] },
  });
}

describe("fundProfileToView", () => {
  it("projects the editable slice with weights keyed by criterion name", () => {
    const view = fundProfileToView(makeProfile());
    expect(view).toEqual({
      thesis: "Original thesis.",
      checkSizeMin: 1_000_000,
      checkSizeMax: 2_500_000,
      stages: ["seed", "series_a"],
      sectors: ["software", "fintech"],
      geographies: ["global"],
      weights: {
        "Moat and Competitive Advantage": 0.2,
        "Founder's Track Record and Market Fit": 0.15,
      },
    });
  });
});

describe("applyFundPatch", () => {
  it("updates scalar and array fields in place, returning the new view", () => {
    const profile = makeProfile();
    const view = applyFundPatch(profile, {
      thesis: "New thesis.",
      checkSizeMin: 500_000,
      checkSizeMax: 5_000_000,
      stages: ["pre_seed"],
      sectors: ["healthcare"],
      geographies: ["north america", "europe"],
    });

    expect(profile.thesisSummary).toBe("New thesis.");
    expect(profile.checkSize).toEqual({ min: 500_000, max: 5_000_000 });
    expect(profile.stages).toEqual(["pre_seed"]);
    expect(profile.sectors).toEqual(["healthcare"]);
    expect(view.geographies).toEqual(["north america", "europe"]);
  });

  it("maps weights to criteria by name and clamps to [0,1]", () => {
    const profile = makeProfile();
    applyFundPatch(profile, {
      weights: {
        "Moat and Competitive Advantage": 0.9,
        "Founder's Track Record and Market Fit": 1.7, // clamps to 1
      },
    });
    const byName = Object.fromEntries(profile.criteria.map((c) => [c.name, c.weight]));
    expect(byName["Moat and Competitive Advantage"]).toBe(0.9);
    expect(byName["Founder's Track Record and Market Fit"]).toBe(1);
  });

  it("matches criterion names case-insensitively", () => {
    const profile = makeProfile();
    applyFundPatch(profile, { weights: { "moat and competitive advantage": 0.42 } });
    const moat = profile.criteria.find((c) => c.id === "moat");
    expect(moat?.weight).toBe(0.42);
  });

  it("ignores weights that match no criterion", () => {
    const profile = makeProfile();
    const before = profile.criteria.map((c) => c.weight);
    applyFundPatch(profile, { weights: { "Nonexistent Criterion": 0.5 } });
    expect(profile.criteria.map((c) => c.weight)).toEqual(before);
  });

  it("leaves fields absent from the patch untouched", () => {
    const profile = makeProfile();
    applyFundPatch(profile, { thesis: "Only thesis changed." });
    expect(profile.sectors).toEqual(["software", "fintech"]);
    expect(profile.checkSize).toEqual({ min: 1_000_000, max: 2_500_000 });
  });
});
