import { describe, expect, it } from "vitest";
import { MockLLMClient } from "../llm/mock.js";
import { createInitialState } from "../state.js";
import { fundProfile, medflow, scribeai } from "../fixtures/sample.js";
import { streamOrchestratorChat, type ChatStreamEvent } from "./orchestrator.js";

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
});
