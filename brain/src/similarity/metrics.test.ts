import { describe, it, expect } from "vitest";
import { jaccard, cosine, categoricalSimilarity, textTokenJaccard } from "./metrics.js";

describe("jaccard", () => {
  it("is 1 for identical non-empty sets", () => {
    expect(jaccard(["a", "b"], ["b", "a"])).toBe(1);
  });
  it("is intersection over union", () => {
    expect(jaccard(["a", "b"], ["b", "c"])).toBeCloseTo(1 / 3);
  });
  it("is 0 for disjoint sets", () => {
    expect(jaccard(["a"], ["b"])).toBe(0);
  });
  it("is 0 when both are empty (no shared information)", () => {
    expect(jaccard([], [])).toBe(0);
  });
  it("is case-insensitive and trims", () => {
    expect(jaccard([" A "], ["a"])).toBe(1);
  });
});

describe("cosine", () => {
  it("is 1 for identical vectors", () => {
    expect(cosine([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
  });
  it("is 0 for orthogonal vectors", () => {
    expect(cosine([1, 0], [0, 1])).toBeCloseTo(0);
  });
  it("is 0 when a vector is all zeros", () => {
    expect(cosine([0, 0], [1, 1])).toBe(0);
  });
});

describe("categoricalSimilarity", () => {
  it("is 1 for exact match ignoring case", () => {
    expect(categoricalSimilarity("Enterprise Sales", "enterprise sales")).toBe(1);
  });
  it("gives partial credit for overlapping words", () => {
    const s = categoricalSimilarity("enterprise sales", "founder-led enterprise sales");
    expect(s).toBeGreaterThan(0);
    expect(s).toBeLessThan(1);
  });
  it("is 0 for unrelated categories", () => {
    expect(categoricalSimilarity("enterprise sales", "direct to consumer")).toBe(0);
  });
  it("is 0 when either side is empty", () => {
    expect(categoricalSimilarity("", "enterprise sales")).toBe(0);
  });
});

describe("textTokenJaccard", () => {
  it("scores shared meaningful words", () => {
    const s = textTokenJaccard(
      "reducing administrative work for clinicians",
      "reducing administrative burden for clinicians",
    );
    expect(s).toBeGreaterThan(0.3);
  });
  it("is 0 for empty text", () => {
    expect(textTokenJaccard("", "anything here")).toBe(0);
  });
});
