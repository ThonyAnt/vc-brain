import { describe, it, expect } from "vitest";
import { findNearestCompanies } from "./similarity.js";
import { fundFit, rankCandidates, normalizeUsd, displayFitScore } from "./fundfit.js";
import { buildMarketLandscape } from "./landscape.js";
import { broadMarketLabel } from "./labelClusters.js";
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

describe("normalizeUsd", () => {
  it("reads small values as millions", () => {
    expect(normalizeUsd(2.5)).toBe(2_500_000);
    expect(normalizeUsd(1)).toBe(1_000_000);
    expect(normalizeUsd(50)).toBe(50_000_000);
  });
  it("leaves dollar amounts untouched", () => {
    expect(normalizeUsd(2_500_000)).toBe(2_500_000);
    expect(normalizeUsd(250_000)).toBe(250_000);
  });
  it("does not touch zero", () => {
    expect(normalizeUsd(0)).toBe(0);
  });
});

describe("displayFitScore", () => {
  const cohort = [0.36, 0.3, 0.28, 0.26];
  it("spreads cohort scores across the display band", () => {
    expect(displayFitScore(0.36, cohort)).toBe(95); // cohort max
    expect(displayFitScore(0.26, cohort)).toBe(45); // cohort min
    const mid = displayFitScore(0.31, cohort);
    expect(mid).toBeGreaterThan(45);
    expect(mid).toBeLessThan(95);
  });
  it("marks eliminated (score<=0) low and handles degenerate cohorts", () => {
    expect(displayFitScore(0, cohort)).toBe(35);
    expect(displayFitScore(0.5, [0.5, 0.5])).toBe(70);
    expect(displayFitScore(0.5, [])).toBe(70);
  });
});

describe("rankCandidates check-size units", () => {
  it("does not eliminate dollar-denominated candidates when the profile is in millions", () => {
    const profile = { ...fx.fundProfile, checkSize: { min: 1, max: 2.5 } };
    const ranked = rankCandidates({
      candidates: fx.candidateUniverse,
      fundProfile: profile,
      positiveHistory: fx.portfolioCompanies,
      rejectedHistory: fx.rejectedDeals,
    });
    // ScribeAI seeks $2M — must survive a {min:1, max:2.5} (millions) profile.
    const scribe = ranked.find((r) => r.companyId === "co_scribeai")!;
    expect(scribe.eliminationReason).toBeUndefined();
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
  it("clusters healthcare docs together and emits deterministic semantic coordinates", () => {
    const all = [...fx.candidateUniverse, ...fx.portfolioCompanies, fx.notegen];
    const land = buildMarketLandscape(all, { focalId: "co_scribeai" });
    const repeated = buildMarketLandscape(all, { focalId: "co_scribeai" });
    const clusterOf = (id: string) => land.nodes.find((n) => n.id === id)!.clusterId;
    expect(clusterOf("co_scribeai")).toBe(clusterOf("co_medflow"));
    expect(clusterOf("co_scribeai")).not.toBe(clusterOf("co_payflow"));
    expect(land.nodes).toEqual(repeated.nodes);
    expect(land.clusters).toEqual(repeated.clusters);
    expect(land.clusters.every((cluster) => [cluster.x, cluster.y, cluster.z].every(Number.isFinite))).toBe(true);
    const scribe = land.nodes.find((node) => node.id === "co_scribeai")!;
    const distanceFromScribe = (id: string) => {
      const node = land.nodes.find((candidate) => candidate.id === id)!;
      return Math.hypot(scribe.x - node.x, scribe.y - node.y, scribe.z - node.z);
    };
    // Canonical similarities are MedFlow .86, VetCharts .59, RadIntel .38.
    expect(distanceFromScribe("co_medflow")).toBeLessThan(distanceFromScribe("co_vetcharts"));
    expect(distanceFromScribe("co_vetcharts")).toBeLessThan(distanceFromScribe("co_radintel"));
    expect(land.edges.length).toBeGreaterThan(0);
  });

  it("adds exact-name competitor edges without replacing similarity edges", () => {
    const scribeWithCompetitor = { ...fx.scribeai, competitors: ["  notegen  "] };
    const all = [scribeWithCompetitor, fx.notegen, fx.medflow, fx.payflow];
    const land = buildMarketLandscape(all, { minClusterSize: 1 });
    expect(land.edges).toContainEqual({
      source: "co_scribeai",
      target: "co_notegen",
      weight: 0.8,
      type: "competition",
    });
    expect(land.edges.some((edge) => edge.type === "nearest")).toBe(true);
  });
});

describe("broadMarketLabel", () => {
  it("collapses narrow or vague labels into stable market families", () => {
    expect(broadMarketLabel("B2B SaaS")).toBe("Enterprise AI");
    expect(broadMarketLabel("Payments")).toBe("Fintech");
    expect(broadMarketLabel("Logistics and supply chain")).toBe("Robotics & Logistics");
    expect(broadMarketLabel("Enterprise Operations Automation")).toBe("Industrial Operations");
    expect(broadMarketLabel("Technology")).toBe("Developer Tools");
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
