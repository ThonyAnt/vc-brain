import { describe, expect, it } from "vitest";
import { MockLLMClient } from "../llm/mock.js";
import { MockSearchClient } from "../search/mock.js";
import { createInitialState } from "../state.js";
import { mockAgentOptions, mockSearchResults } from "../fixtures/mockAgents.js";
import * as fx from "../fixtures/sample.js";
import { detectFounderSourcing, needsSourcingClarification, streamOrchestratorChat, type ChatStreamEvent } from "./orchestrator.js";

const { fundProfile, medflow, careloop, scribeai } = fx;

describe("interactive investment orchestrator", () => {
  it("routes to specialists and streams lifecycle plus text deltas", async () => {
    const state = createInitialState({
      mandate: "Healthcare AI",
      portfolioCompanies: [medflow],
      candidateUniverse: [scribeai],
    });
    state.fundProfile = fundProfile;
    const events: ChatStreamEvent[] = [];
    const result = await streamOrchestratorChat(
      [{ role: "user", content: "Compare ScribeAI with MedFlow and explain the fund fit." }],
      { companyId: scribeai.id },
      {
        state,
        companies: [scribeai, medflow],
        llm: new MockLLMClient({ text: () => "ScribeAI resembles a prior winner, with caveats." }),
        now: () => 42,
        onEvent: (event) => { events.push(event); },
      },
    );
    expect(result.content).toContain("prior winner");
    expect(events[0]).toMatchObject({ type: "run_started", orchestrator: "investment_orchestrator" });
    expect(events.filter((event) => event.type === "agent_started").map((event) => "agent" in event ? event.agent : ""))
      .toEqual(expect.arrayContaining(["company_analyst", "analogue_analyst", "fund_strategy_analyst"]));
    expect(events.some((event) => event.type === "text_delta")).toBe(true);
    expect(events.at(-1)?.type).toBe("run_completed");
  });

  describe("detectFounderSourcing", () => {
    it("detects the name whether it sits before or after the word 'founder'", () => {
      // Name before ("<Name> as a founder") — the phrasing that previously fell through to the LLM.
      expect(detectFounderSourcing("Source Elon Musk as a founder and add to the leads list and give a score."))
        .toMatchObject({ name: "Elon Musk" });
      // Name after ("founder <Name>").
      expect(detectFounderSourcing("Please vet the founder Jane Doe.")).toMatchObject({ name: "Jane Doe" });
      // The full prompt rides along as Tavily search context.
      expect(detectFounderSourcing("Source Anthony Yu from UPenn M&T as a founder."))
        .toEqual({ name: "Anthony Yu", context: "Source Anthony Yu from UPenn M&T as a founder." });
    });
    it("routes a LinkedIn URL straight to the tool", () => {
      expect(detectFounderSourcing("score https://www.linkedin.com/in/patrickcollison as a founder"))
        .toEqual({ linkedinUrl: "https://www.linkedin.com/in/patrickcollison" });
    });
    it("ignores messages with no founder intent", () => {
      expect(detectFounderSourcing("What is the fund thesis?")).toBeUndefined();
      expect(detectFounderSourcing("Compare Vooma to our portfolio.")).toBeUndefined();
    });
  });

  it("grounds 'similar past investment / better deal' questions in the fund's portfolio clusters", async () => {
    const state = createInitialState({
      mandate: "Healthcare AI",
      portfolioCompanies: [medflow, careloop],
      candidateUniverse: [scribeai],
    });
    state.fundProfile = fundProfile;
    let capturedPrompt = "";
    const events: ChatStreamEvent[] = [];
    await streamOrchestratorChat(
      [{
        role: "user",
        content: "What's the most similar company to ScribeAI that we've invested in in the past, and is this a better deal?",
      }],
      { companyId: scribeai.id },
      {
        state,
        companies: [scribeai, medflow, careloop],
        llm: new MockLLMClient({ text: (req) => { capturedPrompt = req.prompt; return "ScribeAI is cheaper than MedFlow."; } }),
        now: () => 42,
        onEvent: (event) => { events.push(event); },
      },
    );
    // The analogue specialist fires on "invested in the past / better deal" phrasing...
    const started = events.filter((e) => e.type === "agent_started").map((e) => (e.type === "agent_started" ? e.agent : ""));
    expect(started).toContain("analogue_analyst");
    // ...and grounds the answer in a real PAST INVESTMENT (portfolio), with clusters + deal terms.
    expect(capturedPrompt).toMatch(/MedFlow|CareLoop/);
    expect(capturedPrompt).toContain("PAST INVESTMENTS");
    expect(capturedPrompt).toContain("clusterSimilarity");
    expect(capturedPrompt).toContain("dealTerms");
  });

  it.each([
    ["Hi there!", "Hi there!"],
    ["hello", "Hi there!"],
    ["Good morning.", "Hi there!"],
    ["What can you do?", "I can compare a company"],
    ["Thanks!", "You’re welcome."],
    ["Goodbye", "Sounds good."],
  ])("handles conversational intent '%s' without invoking a specialist", async (input, expected) => {
    const state = createInitialState({ mandate: "Healthcare AI", portfolioCompanies: [medflow] });
    state.fundProfile = fundProfile;
    const events: ChatStreamEvent[] = [];
    const result = await streamOrchestratorChat(
      [{ role: "user", content: input }],
      // A greeting must remain a greeting even on a company-detail route.
      { companyId: medflow.id },
      {
        state,
        companies: [medflow, scribeai],
        llm: new MockLLMClient({ text: () => { throw new Error("LLM must not run"); } }),
        now: () => 42,
        onEvent: (event) => { events.push(event); },
      },
    );
    expect(result.content).toContain(expected);
    expect(events[0]).toMatchObject({ type: "run_started", agents: [] });
    expect(events.some((event) => event.type === "agent_started")).toBe(false);
    expect(events.some((event) => event.type === "text_delta")).toBe(true);
    expect(events.at(-1)?.type).toBe("run_completed");
  });

  it("does not assume every no-company message is a fund-strategy request", async () => {
    const state = createInitialState({ mandate: "Healthcare AI", portfolioCompanies: [medflow] });
    state.fundProfile = fundProfile;
    const events: ChatStreamEvent[] = [];
    await streamOrchestratorChat(
      [{ role: "user", content: "How should I approach this decision?" }],
      {},
      {
        state,
        companies: [medflow, scribeai],
        llm: new MockLLMClient({ text: () => "Start by defining the decision." }),
        now: () => 42,
        onEvent: (event) => { events.push(event); },
      },
    );
    expect(events[0]).toMatchObject({ type: "run_started", agents: [] });
  });

  it("still routes explicit fund questions to the fund strategy specialist", async () => {
    const state = createInitialState({ mandate: "Healthcare AI", portfolioCompanies: [medflow] });
    state.fundProfile = fundProfile;
    const events: ChatStreamEvent[] = [];
    await streamOrchestratorChat(
      [{ role: "user", content: "What is the fund thesis?" }],
      {},
      {
        state,
        companies: [medflow, scribeai],
        llm: new MockLLMClient({ text: () => "The fund invests in healthcare AI." }),
        now: () => 42,
        onEvent: (event) => { events.push(event); },
      },
    );
    expect(events.filter((event) => event.type === "agent_started")).toContainEqual(
      expect.objectContaining({ agent: "fund_strategy_analyst" }),
    );
  });

  it.each([
    "Source some companies.",
    "Find a few startups for the fund.",
    "Please surface potential deals.",
  ])("asks for scope before running an underspecified sourcing request: '%s'", async (input) => {
    const state = createInitialState({ mandate: "Healthcare AI", portfolioCompanies: [medflow] });
    state.fundProfile = fundProfile;
    const events: ChatStreamEvent[] = [];
    const result = await streamOrchestratorChat(
      [{ role: "user", content: input }],
      {},
      {
        state,
        companies: [medflow, scribeai],
        llm: new MockLLMClient({ text: () => { throw new Error("LLM must not run"); } }),
        now: () => 42,
        onEvent: (event) => { events.push(event); },
      },
    );

    expect(needsSourcingClarification(input)).toBe(true);
    expect(result.content).toContain("what should I target");
    expect(result.content).toContain("Sector or investment thesis");
    expect(events[0]).toMatchObject({ type: "run_started", agents: [] });
    expect(events.some((event) => event.type === "agent_started")).toBe(false);
    expect(events.at(-1)?.type).toBe("run_completed");
  });

  it("runs live discovery after the user answers the sourcing clarification", async () => {
    const state = createInitialState({
      mandate: "Find healthcare AI companies.",
      historicalMemos: fx.historicalMemos,
      portfolioCompanies: fx.portfolioCompanies,
      rejectedDeals: fx.rejectedDeals,
      candidateUniverse: fx.candidateUniverse,
    });
    state.fundProfile = fundProfile;
    const clarification = await streamOrchestratorChat(
      [{ role: "user", content: "Source some companies." }],
      {},
      {
        state,
        companies: [...fx.candidateUniverse, ...fx.portfolioCompanies, ...fx.rejectedDeals, ...fx.competitors],
        llm: new MockLLMClient({ text: () => { throw new Error("LLM must not run"); } }),
        now: () => 41,
      },
    );
    const events: ChatStreamEvent[] = [];
    const result = await streamOrchestratorChat(
      [
        { role: "user", content: "Source some companies." },
        clarification,
        { role: "user", content: "Seed healthcare AI in the US, $1–3M checks; exclude consumer wellness." },
      ],
      {},
      {
        state,
        companies: [...fx.candidateUniverse, ...fx.portfolioCompanies, ...fx.rejectedDeals, ...fx.competitors],
        competitors: fx.competitors,
        search: new MockSearchClient(mockSearchResults),
        llm: new MockLLMClient({ ...mockAgentOptions, text: () => "Live Tavily discovery completed the full pipeline on NoteHealth." }),
        now: () => 42,
        onEvent: (event) => { events.push(event); },
      },
    );

    expect(result.content).toContain("full pipeline");
    expect(state.candidateUniverse.map((company) => company.id)).toEqual(
      expect.arrayContaining(["co_notehealth", "co_claimsync"]),
    );
    const started = events
      .filter((event) => event.type === "agent_started")
      .map((event) => event.type === "agent_started" ? event.agent : "");
    expect(started).toEqual(expect.arrayContaining([
      "discovery",
      "fundProfiler",
      "marketScout",
      "technicalDiligence",
      "commercialDiligence",
      "financialDiligence",
      "risk",
      "committee",
      "memo",
    ]));
    expect(events.some((event) => event.type === "agent_failed")).toBe(false);
    expect(events).toContainEqual(expect.objectContaining({
      type: "companies_sourced",
      companies: expect.arrayContaining([expect.objectContaining({ id: "co_notehealth" })]),
    }));
    expect(events.at(-1)?.type).toBe("run_completed");
  });
});
