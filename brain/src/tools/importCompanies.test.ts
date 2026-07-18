import { describe, it, expect, vi } from "vitest";
import { importCompanies } from "./importCompanies.js";
import { MockLLMClient } from "../llm/mock.js";
import { mockAgentStructured } from "../fixtures/mockAgents.js";

const llm = () => new MockLLMClient({ structured: mockAgentStructured });

describe("importCompanies", () => {
  it("uses supplied attributes directly (no LLM call)", async () => {
    const client = llm();
    const spy = vi.spyOn(client, "generateStructured");
    const [c] = await importCompanies(
      [
        {
          name: "GivenCo",
          description: "Already structured.",
          sector: "Fintech",
          attributes: {
            industryPath: ["Fintech", "Payments"],
            businessModel: "Transaction fees",
            targetCustomers: ["Consumers"],
          },
        },
      ],
      client,
    );
    expect(c!.id).toBe("co_givenco");
    expect(c!.attributes.industryPath).toEqual(["Fintech", "Payments"]);
    expect(spy).not.toHaveBeenCalled();
  });

  it("extracts attributes via the LLM when none are supplied", async () => {
    const [c] = await importCompanies(
      [{ name: "ExtractCo", description: "An AI medical scribe for hospitals." }],
      llm(),
    );
    expect(c!.attributes.industryPath.at(-1)).toBe("Clinical documentation");
    expect(c!.historicalStatus).toBe("external");
    expect(c!.status).toBe("sourced");
  });

  it("dedupes by name and honors default status options", async () => {
    const out = await importCompanies(
      [
        { name: "Dup", attributes: { businessModel: "SaaS" } },
        { name: "dup", attributes: { businessModel: "SaaS" } },
      ],
      llm(),
      { defaultHistoricalStatus: "portfolio", defaultStatus: "invested" },
    );
    expect(out).toHaveLength(1);
    expect(out[0]!.historicalStatus).toBe("portfolio");
  });
});
