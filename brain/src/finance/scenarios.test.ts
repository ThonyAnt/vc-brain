import { describe, it, expect } from "vitest";
import { calculateFinancialScenarios } from "./scenarios.js";

const base = {
  investmentAmount: 2_000_000,
  entryValuation: 20_000_000,
  initialOwnership: 0.1,
  projectedArr: 10_000_000,
  exitMultiple: 10,
  dilutionFactor: 0.6,
  yearsToExit: 5,
};

describe("calculateFinancialScenarios", () => {
  it("computes base case MOIC and IRR deterministically", () => {
    const { base: b } = calculateFinancialScenarios(base);
    // exitValue = 10M * 10 = 100M; ownership = 0.1*0.6 = 0.06; proceeds = 6M
    expect(b.exitValuation).toBe(100_000_000);
    expect(b.ownershipAtExit).toBeCloseTo(0.06);
    expect(b.proceeds).toBeCloseTo(6_000_000);
    expect(b.moic).toBeCloseTo(3); // 6M / 2M
    expect(b.irr).toBeCloseTo(Math.pow(3, 1 / 5) - 1);
  });

  it("orders bear < base < bull on proceeds and MOIC", () => {
    const s = calculateFinancialScenarios(base);
    expect(s.bear.proceeds).toBeLessThan(s.base.proceeds);
    expect(s.base.proceeds).toBeLessThan(s.bull.proceeds);
    expect(s.bear.moic).toBeLessThan(s.bull.moic);
  });

  it("respects custom scenario multipliers", () => {
    const s = calculateFinancialScenarios(base, {
      bull: { arr: 2, exitMultiple: 1.5 },
      bear: { arr: 0.5, exitMultiple: 0.8 },
    });
    // bull exitValue = (10M*2) * (10*1.5) = 300M
    expect(s.bull.exitValuation).toBe(300_000_000);
  });
});
