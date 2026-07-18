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

describe("calculateFinancialScenarios — edge cases & invariants", () => {
  it("total loss: zero exit value → MOIC 0 and IRR -1 (-100%)", () => {
    const { base: b } = calculateFinancialScenarios({ ...base, projectedArr: 0 });
    expect(b.proceeds).toBe(0);
    expect(b.moic).toBe(0);
    expect(b.irr).toBe(-1);
  });

  it("guards divide-by-zero: investmentAmount 0 → MOIC 0, IRR -1 (never Infinity/NaN)", () => {
    const { base: b } = calculateFinancialScenarios({ ...base, investmentAmount: 0 });
    expect(Number.isFinite(b.moic)).toBe(true);
    expect(Number.isFinite(b.irr)).toBe(true);
    expect(b.moic).toBe(0);
    expect(b.irr).toBe(-1);
  });

  it("partial loss: MOIC < 1 → IRR is negative but strictly above -100%", () => {
    // base proceeds = 6M; investment 12M → MOIC 0.5
    const { base: b } = calculateFinancialScenarios({ ...base, investmentAmount: 12_000_000 });
    expect(b.moic).toBeCloseTo(0.5);
    expect(b.irr).toBeGreaterThan(-1);
    expect(b.irr).toBeLessThan(0);
    expect(b.irr).toBeCloseTo(Math.pow(0.5, 1 / 5) - 1);
  });

  it("breakeven: MOIC exactly 1 → IRR 0", () => {
    // proceeds 6M with investment 6M → MOIC 1
    const { base: b } = calculateFinancialScenarios({ ...base, investmentAmount: 6_000_000 });
    expect(b.moic).toBeCloseTo(1);
    expect(b.irr).toBeCloseTo(0);
  });

  it("time value of money: for a fixed MOIC, a longer horizon yields a lower IRR", () => {
    const short = calculateFinancialScenarios({ ...base, yearsToExit: 3 }).base;
    const long = calculateFinancialScenarios({ ...base, yearsToExit: 8 }).base;
    expect(short.moic).toBeCloseTo(long.moic); // MOIC is time-independent
    expect(long.irr).toBeLessThan(short.irr); // same multiple, more years → lower IRR
  });

  it("IRR compounds back to MOIC: (1 + irr)^years ≈ moic", () => {
    const { base: b } = calculateFinancialScenarios(base);
    expect(Math.pow(1 + b.irr, base.yearsToExit)).toBeCloseTo(b.moic);
  });

  it("ownership at exit = initialOwnership × dilutionFactor", () => {
    const { base: b } = calculateFinancialScenarios(base);
    expect(b.ownershipAtExit).toBeCloseTo(base.initialOwnership * base.dilutionFactor);
  });

  it("bull/bear scale proceeds by (arrMult × exitMult) off the base case", () => {
    const s = calculateFinancialScenarios(base); // defaults: bull 1.6×1.4, bear 0.5×0.7
    expect(s.bull.proceeds).toBeCloseTo(s.base.proceeds * 1.6 * 1.4);
    expect(s.bear.proceeds).toBeCloseTo(s.base.proceeds * 0.5 * 0.7);
  });

  it("is pure: does not mutate the input assumptions", () => {
    const input = { ...base };
    const snapshot = JSON.stringify(input);
    calculateFinancialScenarios(input);
    expect(JSON.stringify(input)).toBe(snapshot);
  });

  it("is deterministic: identical inputs produce identical outputs", () => {
    expect(calculateFinancialScenarios(base)).toEqual(calculateFinancialScenarios(base));
  });
});
