import { describe, expect, it } from "vitest";
import { classicalMds } from "./mds.js";

const distance = (a: number[], b: number[]) =>
  Math.sqrt(a.reduce((sum, value, index) => sum + (value - b[index]!) ** 2, 0));

describe("classicalMds", () => {
  it("reconstructs Euclidean pairwise distances deterministically", () => {
    const distances = [
      [0, 1, 2],
      [1, 0, 1],
      [2, 1, 0],
    ];
    const first = classicalMds(distances, 3, ["co_a", "co_b", "co_c"]);
    const second = classicalMds(distances, 3, ["co_a", "co_b", "co_c"]);
    expect(first).toEqual(second);
    expect(distance(first[0]!, first[1]!)).toBeCloseTo(1, 8);
    expect(distance(first[0]!, first[2]!)).toBeCloseTo(2, 8);
    expect(distance(first[1]!, first[2]!)).toBeCloseTo(1, 8);
  });
});
