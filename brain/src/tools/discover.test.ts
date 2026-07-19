import { describe, it, expect } from "vitest";
import { discoverCompanies, buildDiscoveryQueries, queriesFromInvestorAsk } from "./discover.js";
import { MockSearchClient } from "../search/mock.js";
import { MockLLMClient } from "../llm/mock.js";
import { mockAgentStructured, mockSearchResults } from "../fixtures/mockAgents.js";
import { fundProfile } from "../fixtures/sample.js";

function deps() {
  return {
    search: new MockSearchClient(mockSearchResults),
    llm: new MockLLMClient({ structured: mockAgentStructured }),
  };
}

describe("queriesFromInvestorAsk", () => {
  it("turns a chat sourcing prompt into search queries", () => {
    const qs = queriesFromInvestorAsk("Source a new company in healthcare.");
    expect(qs.join(" ").toLowerCase()).toContain("healthcare");
    expect(qs.join(" ").toLowerCase()).toContain("startups");
    expect(qs.join(" ").toLowerCase()).not.toContain("source a new");
  });
});

describe("buildDiscoveryQueries", () => {
  it("derives sector/stage queries from the fund profile", () => {
    const qs = buildDiscoveryQueries({ mandate: "m", fundProfile });
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.join(" ").toLowerCase()).toContain("healthcare");
    expect(qs.join(" ").toLowerCase()).toContain("seed");
  });
  it("rewrites chat-style explicit queries into search phrases", () => {
    const qs = buildDiscoveryQueries({
      mandate: "Source a new company in healthcare.",
      queries: ["Source a new company in healthcare."],
      maxQueries: 3,
    });
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.join(" ").toLowerCase()).toContain("healthcare");
    expect(qs.some((q) => /source a new company/i.test(q))).toBe(false);
  });
  it("honors explicit search queries", () => {
    const qs = buildDiscoveryQueries({ mandate: "m", queries: ["a", "b", "c", "d"], maxQueries: 2 });
    expect(qs).toEqual(["a", "b"]);
  });
});

describe("discoverCompanies", () => {
  it("returns normalized Company records from search results", async () => {
    const out = await discoverCompanies({ mandate: "m", fundProfile }, deps());
    expect(out.map((c) => c.name)).toEqual(["NoteHealth", "ClaimSync"]);
    const note = out[0]!;
    expect(note.id).toBe("co_notehealth");
    expect(note.historicalStatus).toBe("external");
    expect(note.status).toBe("sourced");
    expect(note.attributes.industryPath.at(-1)).toBe("Clinical documentation");
    expect(note.sourceRefs).toContain("https://notehealth.example");
  });

  it("dedupes against excludeNames (case-insensitive)", async () => {
    const out = await discoverCompanies(
      { mandate: "m", fundProfile, excludeNames: ["notehealth"] },
      deps(),
    );
    expect(out.map((c) => c.name)).toEqual(["ClaimSync"]);
  });

  it("respects the limit", async () => {
    const out = await discoverCompanies({ mandate: "m", fundProfile, limit: 1 }, deps());
    expect(out).toHaveLength(1);
  });

  it("returns nothing when search yields no results", async () => {
    const out = await discoverCompanies(
      { mandate: "m", fundProfile },
      { search: new MockSearchClient([]), llm: new MockLLMClient({ structured: mockAgentStructured }) },
    );
    expect(out).toEqual([]);
  });
});
