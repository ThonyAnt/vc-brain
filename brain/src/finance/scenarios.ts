import type { FinancialAssumptions } from "../schemas/diligence.js";

export interface ScenarioResult {
  exitValuation: number;
  ownershipAtExit: number;
  proceeds: number;
  moic: number;
  irr: number;
}

export interface ScenarioSet {
  base: ScenarioResult;
  bull: ScenarioResult;
  bear: ScenarioResult;
}

interface ScenarioMultiplier {
  arr: number;
  exitMultiple: number;
}

export interface ScenarioMultipliers {
  bull: ScenarioMultiplier;
  bear: ScenarioMultiplier;
}

export const DEFAULT_MULTIPLIERS: ScenarioMultipliers = {
  bull: { arr: 1.6, exitMultiple: 1.4 },
  bear: { arr: 0.5, exitMultiple: 0.7 },
};

function runScenario(
  a: FinancialAssumptions,
  arrMult: number,
  exitMult: number,
): ScenarioResult {
  const projectedArr = a.projectedArr * arrMult;
  const exitMultiple = a.exitMultiple * exitMult;
  const exitValuation = projectedArr * exitMultiple;
  const ownershipAtExit = a.initialOwnership * a.dilutionFactor;
  const proceeds = exitValuation * ownershipAtExit;
  const moic = a.investmentAmount > 0 ? proceeds / a.investmentAmount : 0;
  const irr = moic > 0 && a.yearsToExit > 0 ? Math.pow(moic, 1 / a.yearsToExit) - 1 : -1;
  return { exitValuation, ownershipAtExit, proceeds, moic, irr };
}

/**
 * Deterministic return model. The LLM proposes the assumptions; the math is
 * computed here so results are reproducible and auditable.
 */
export function calculateFinancialScenarios(
  assumptions: FinancialAssumptions,
  multipliers: ScenarioMultipliers = DEFAULT_MULTIPLIERS,
): ScenarioSet {
  return {
    base: runScenario(assumptions, 1, 1),
    bull: runScenario(assumptions, multipliers.bull.arr, multipliers.bull.exitMultiple),
    bear: runScenario(assumptions, multipliers.bear.arr, multipliers.bear.exitMultiple),
  };
}
