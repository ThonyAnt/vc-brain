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
});
