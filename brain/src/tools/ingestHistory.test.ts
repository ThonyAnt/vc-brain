import { describe, it, expect } from "vitest";
import { ingestMemoText, ingestMemoTexts } from "./ingestHistory.js";
import { MockLLMClient } from "../llm/mock.js";
import { mockAgentStructured } from "../fixtures/mockAgents.js";

const llm = () => new MockLLMClient({ structured: mockAgentStructured });

describe("ingestMemoText", () => {
  it("turns raw memo text into a HistoricalMemo + subject Company", async () => {
    const text = "Company: MedFlow\nDecision: invested\nAmbient clinical documentation for hospitals.";
    const { memo, company } = await ingestMemoText(text, llm());

    expect(memo.id).toBe("memo_medflow");
    expect(memo.companyId).toBe("co_medflow");
    expect(memo.decision).toBe("invested");
    expect(memo.text).toBe(text); // raw text retained
    expect(memo.decisionDrivers.length).toBeGreaterThan(0);

    expect(company.id).toBe("co_medflow");
    expect(company.historicalStatus).toBe("portfolio"); // invested -> portfolio
    expect(company.status).toBe("invested");
    expect(company.attributes.industryPath.at(-1)).toBe("Clinical documentation");
    expect(company.sourceRefs).toContain("memo_medflow");
  });

  it("maps rejected memos to rejected history", async () => {
    const { company } = await ingestMemoText("Company: AdBoard\nDecision: rejected\nAd model.", llm());
    expect(company.historicalStatus).toBe("rejected");
    expect(company.status).toBe("passed");
  });
});

describe("ingestMemoTexts", () => {
  it("buckets a batch of memos by decision", async () => {
    const set = await ingestMemoTexts(
      [
        "Company: MedFlow\nDecision: invested\nClinical docs.",
        "Company: AdBoard\nDecision: rejected\nAd model.",
        "Company: MaybeCo\nDecision: passed\nDid not pursue.",
      ],
      llm(),
    );
    expect(set.memos).toHaveLength(3);
    expect(set.portfolioCompanies.map((c) => c.name)).toEqual(["MedFlow"]);
    expect(set.rejectedDeals.map((c) => c.name)).toEqual(["AdBoard"]);
    expect(set.passedDeals.map((c) => c.name)).toEqual(["MaybeCo"]);
  });
});
