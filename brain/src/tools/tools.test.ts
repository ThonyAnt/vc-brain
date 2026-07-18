import { describe, it, expect } from "vitest";
import { findNearestCompanies } from "./similarity.js";
import { fundFit, rankCandidates } from "./fundfit.js";
import { buildMarketLandscape } from "./landscape.js";
import { emitGraphEvent } from "./events.js";
import { createInitialState } from "../state.js";
import * as fx from "../fixtures/sample.js";

describe("findNearestCompanies", () => {
  it("ranks the most similar company first", () => {
    const all = [...fx.candidateUniverse, ...fx.portfolioCompanies, fx.notegen];
    const near = findNearestCompanies(fx.scribeai, all, { k: 3 });
    // ScribeAI (clinical docs) should be closest to MedFlow or NoteGen, not PayFlow.
    expect(near[0]!.companyId).not.toBe("co_payflow");
    expect(near.map((n) => n.companyId)).toContain("co_medflow");
  });
});

describe("fundFit", () => {
  it("scores an on-thesis company above an off-thesis one", () => {
    const scribe = fundFit(fx.scribeai, fx.fundProfile).score;
    const pay = fundFit(fx.payflow, fx.fundProfile).score;
    expect(scribe).toBeGreaterThan(pay);
  });
});

describe("rankCandidates", () => {
  const ranked = rankCandidates({
    candidates: fx.candidateUniverse,
    fundProfile: fx.fundProfile,
    positiveHistory: fx.portfolioCompanies,
    rejectedHistory: fx.rejectedDeals,
    competitors: fx.competitors,
  });

  it("puts the best-fit healthcare docs company on top", () => {
    expect(ranked[0]!.companyId).toBe("co_scribeai");
  });

  it("labels closest winner and competitor for the top candidate", () => {
    const top = ranked[0]!;
    expect(top.closestWinnerId).toBe("co_medflow");
    expect(top.closestCompetitorId).toBe("co_notegen");
    expect(top.fundFitScore).toBeGreaterThan(0.5);
  });

  it("keeps PayFlow (off-thesis fintech) at the bottom", () => {
    expect(ranked.at(-1)!.companyId).toBe("co_payflow");
  });
});

describe("buildMarketLandscape", () => {
  it("clusters healthcare docs together and separates fintech", () => {
    const all = [...fx.candidateUniverse, ...fx.portfolioCompanies, fx.notegen];
    const land = buildMarketLandscape(all, { focalId: "co_scribeai" });
    const clusterOf = (id: string) => land.nodes.find((n) => n.id === id)!.clusterId;
    expect(clusterOf("co_scribeai")).toBe(clusterOf("co_medflow"));
    expect(clusterOf("co_scribeai")).not.toBe(clusterOf("co_payflow"));
    expect(land.nodes.find((n) => n.id === "co_scribeai")).toMatchObject({ x: 0, y: 0 });
    expect(land.edges.length).toBeGreaterThan(0);
  });
});

describe("emitGraphEvent", () => {
  it("appends a sequentially-ided event to state", () => {
    const state = createInitialState({ mandate: "test" });
    const e1 = emitGraphEvent(state, { stage: "sourcing", eventType: "candidates_discovered", timestamp: 1 });
    const e2 = emitGraphEvent(state, { stage: "committee", eventType: "recommendation", nodeIds: ["co_scribeai"], timestamp: 2 });
    expect(e1.id).toBe("evt_1");
    expect(e2.id).toBe("evt_2");
    expect(e2.nodeIds).toEqual(["co_scribeai"]);
    expect(state.events).toHaveLength(2);
  });
});
