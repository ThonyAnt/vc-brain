import { describe, it, expect } from "vitest";
import { createInitialState } from "./state.js";
import { runPipeline, applyFeedback } from "./orchestrator.js";
import { MockLLMClient } from "./llm/mock.js";
import { mockAgentOptions } from "./fixtures/mockAgents.js";
import * as fx from "./fixtures/sample.js";
import { InvestorFeedbackSchema } from "./schemas/feedback.js";

function makeDeps() {
  let t = 0;
  return {
    llm: new MockLLMClient(mockAgentOptions),
    competitors: fx.competitors,
    now: () => ++t,
  };
}

function freshState() {
  return createInitialState({
    mandate: "Find the best seed-stage healthcare AI company for this fund.",
    historicalMemos: fx.historicalMemos,
    portfolioCompanies: fx.portfolioCompanies,
    rejectedDeals: fx.rejectedDeals,
    candidateUniverse: fx.candidateUniverse,
  });
}

describe("runPipeline (end-to-end, mock LLM)", () => {
  it("runs every stage and fills the shared state coherently", async () => {
    const state = freshState();
    await runPipeline(state, makeDeps());

    expect(state.fundProfile?.criteria.length).toBeGreaterThan(0);

    // Sourcing: the on-thesis clinical-docs company is a finalist.
    expect(state.finalists?.map((c) => c.id)).toContain("co_scribeai");
    expect(state.finalists).toHaveLength(3);
    expect(state.sourcedCandidates?.length).toBe(fx.candidateUniverse.length);

    // Diligence for every finalist.
    for (const f of state.finalists!) {
      expect(state.diligence?.[f.id]).toBeDefined();
      expect(state.diligence?.[f.id]?.financial.assumptions.investmentAmount).toBeGreaterThan(0);
    }

    // Partner review: one opinion set per partner, one opinion per finalist.
    expect(Object.keys(state.partnerOpinions!)).toHaveLength(3);
    for (const opinions of Object.values(state.partnerOpinions!)) {
      expect(opinions).toHaveLength(3);
    }

    // Committee recommends a real finalist; memo is for that company.
    const rec = state.committeeDecision!.recommendedCompanyId;
    expect(state.finalists!.map((c) => c.id)).toContain(rec);
    expect(state.investmentMemo?.companyId).toBe(rec);
    expect(rec).toBe("co_scribeai");
  });

  it("emits graph events for every stage", async () => {
    const state = freshState();
    await runPipeline(state, makeDeps());
    const stages = new Set(state.events.map((e) => e.stage));
    for (const s of ["profiling", "sourcing", "diligence", "partner_review", "committee", "memo"]) {
      expect(stages).toContain(s);
    }
    // Events carry a market landscape for the graph.
    const landscape = state.events.find((e) => e.eventType === "market_landscape_built");
    expect(landscape).toBeDefined();
    expect((landscape!.payload as { nodes: unknown[] }).nodes.length).toBeGreaterThan(0);
  });
});

describe("applyFeedback (learning loop)", () => {
  it("updates a criterion weight, reranks, and emits a learning pulse", async () => {
    const state = freshState();
    const deps = makeDeps();
    await runPipeline(state, deps);

    const weightBefore = state.fundProfile!.criteria.find((c) => c.id === "crit_distribution")!.weight;

    const feedback = InvestorFeedbackSchema.parse({
      action: "pass",
      companyId: "co_radintel",
      rationale: "Strong tech but distribution is unproven.",
      criterionId: "crit_distribution",
      learningRate: 0.2,
    });
    await applyFeedback(state, feedback, deps);

    expect(state.learningResult?.changedCriteria.length).toBeGreaterThan(0);
    const weightAfter = state.updatedFundProfile!.criteria.find((c) => c.id === "crit_distribution")!.weight;
    expect(weightAfter).not.toBe(weightBefore);
    expect(state.learningResult?.whatTheFundLearned).toMatch(/distribution/i);
    expect(state.events.some((e) => e.eventType === "fund_preferences_updated")).toBe(true);
  });
});
