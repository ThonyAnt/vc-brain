import { describe, it, expect } from "vitest";
import { hierarchicalSimilarity } from "./taxonomy.js";

describe("hierarchicalSimilarity", () => {
  it("is 1 for identical paths", () => {
    expect(
      hierarchicalSimilarity(["Healthcare", "Infra", "Docs"], ["Healthcare", "Infra", "Docs"]),
    ).toBe(1);
  });
  it("scores same parent, different leaf below identical", () => {
    const s = hierarchicalSimilarity(
      ["Healthcare", "Infra", "Docs"],
      ["Healthcare", "Infra", "Diagnostics"],
    );
    expect(s).toBeCloseTo(2 / 3);
  });
  it("scores same root only lower than same parent", () => {
    const parent = hierarchicalSimilarity(["A", "B", "C"], ["A", "B", "D"]);
    const root = hierarchicalSimilarity(["A", "B"], ["A", "C"]);
    expect(root).toBeLessThan(parent);
    expect(root).toBeCloseTo(1 / 2);
  });
  it("is 0 when roots differ", () => {
    expect(hierarchicalSimilarity(["Healthcare"], ["Fintech"])).toBe(0);
  });
  it("is 0 when either path is empty", () => {
    expect(hierarchicalSimilarity([], ["A"])).toBe(0);
  });
  it("is case-insensitive", () => {
    expect(hierarchicalSimilarity(["healthcare"], ["Healthcare"])).toBe(1);
  });
  it("treats medicine, healthcare, fitness, and wellness as one broad market family", () => {
    expect(hierarchicalSimilarity(["Medicine", "Clinical"], ["Healthcare", "Care delivery"])).toBe(1 / 2);
    expect(hierarchicalSimilarity(["Fitness", "Consumer"], ["Wellness", "Consumer"])).toBe(1);
  });
});
