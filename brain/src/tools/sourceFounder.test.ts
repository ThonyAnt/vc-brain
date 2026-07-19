import { describe, expect, it } from "vitest";
import { MockLLMClient } from "../llm/mock.js";
import { MockSearchClient } from "../search/mock.js";
import { founderQueries, nameFromExtractedProfile, sourceFounder } from "./sourceFounder.js";
import type { SearchResult } from "../search/client.js";

const searchHit: SearchResult = {
  title: "Jane Doe raises seed round",
  url: "https://news.example.com/jane-doe",
  content: "Jane Doe, founder of Acme, raised a $2M seed.",
  score: 0.9,
};

function llmEcho() {
  // Return a valid FounderSourcing object; capture the prompt for assertions.
  const captured: { prompt: string } = { prompt: "" };
  const llm = new MockLLMClient({
    structured: {
      FounderSourcing: (req) => {
        captured.prompt = req.prompt;
        return {
          name: "Jane Doe",
          role: "Founder",
          background: "Founder of Acme.",
          signals: ["seed raised"],
          score: 80,
          justification: "Strong seed traction.",
          confidence: "medium",
        };
      },
    },
  });
  return { llm, captured };
}

describe("founderQueries", () => {
  it("leads with the full prompt when context is given (chat path)", () => {
    const q = founderQueries("Anthony Yu", undefined, "Source Anthony Yu from UPenn M&T as a founder.");
    expect(q[0]).toBe("Source Anthony Yu from UPenn M&T as a founder.");
    expect(q.length).toBe(5);
  });
  it("uses only name-based queries without context", () => {
    const q = founderQueries("Anthony Yu");
    expect(q.length).toBe(4);
    expect(q[0]).toContain("Anthony Yu");
  });
});

describe("nameFromExtractedProfile", () => {
  it("reads the display name from a markdown profile heading", () => {
    expect(nameFromExtractedProfile("# Patrick Collison\n**Stripe CEO**")).toBe("Patrick Collison");
  });
  it("returns undefined when there is no heading", () => {
    expect(nameFromExtractedProfile("no heading here")).toBeUndefined();
  });
});

describe("sourceFounder", () => {
  it("reads the LinkedIn profile directly (extract) and anchors identity on it", async () => {
    const url = "https://www.linkedin.com/in/janedoe";
    const search = new MockSearchClient([searchHit], {
      [url]: "# Jane Doe\n**Founder & CEO at Acme**\nSan Francisco\n## About\nBuilding Acme.",
    });
    const { llm, captured } = llmEcho();

    const result = await sourceFounder({ linkedinUrl: url }, { search, llm });

    // The profile URL is the first source (identity anchor), not just a name-search hit.
    expect(result.sources[0]).toBe(url);
    expect(result.linkedin).toBe(url);
    // The extracted profile is fed to the LLM and flagged as authoritative.
    expect(captured.prompt).toContain("LinkedIn profile");
    expect(captured.prompt).toContain("authoritative identity anchor");
    expect(captured.prompt).toContain("Building Acme.");
  });

  it("falls back to name-based search when no LinkedIn URL is given", async () => {
    const search = new MockSearchClient([searchHit]);
    const { llm, captured } = llmEcho();

    const result = await sourceFounder({ name: "Jane Doe" }, { search, llm });

    expect(result.sources).toContain(searchHit.url);
    expect(result.linkedin).toBeUndefined();
    expect(captured.prompt).not.toContain("authoritative identity anchor");
  });
});
