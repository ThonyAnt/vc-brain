import { describe, expect, it } from "vitest";
import { MockLLMClient } from "../llm/mock.js";
import { MockSearchClient } from "../search/mock.js";
import {
  founderQueries,
  nameFromExtractedProfile,
  pickHeadshot,
  pickHeadshotFromImageSearch,
  sourceFounder,
} from "./sourceFounder.js";
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

describe("pickHeadshot", () => {
  const displayphoto =
    "https://media.licdn.com/dms/image/v2/D5603AQE/profile-displayphoto-shrink_800_800/photo.jpg";
  it("picks the profile displayphoto over banners, logos, and other people's thumbnails", () => {
    expect(
      pickHeadshot([
        "https://media.licdn.com/dms/image/v2/D4E16AQF/profile-displaybackgroundimage-shrink_350_1400/banner.jpg",
        displayphoto,
        "https://media.licdn.com/dms/image/v2/C4D0BAQH/company-logo_100_100/acme.png",
        "https://media.licdn.com/dms/image/v2/D5603AQX/profile-displayphoto-shrink_100_100/also-viewed.jpg",
      ]),
    ).toBe(displayphoto);
  });
  it("prefers larger displayphoto variants over thumbnails", () => {
    const small = "https://media.licdn.com/dms/image/v2/A/profile-displayphoto-shrink_100_100/a.jpg";
    expect(pickHeadshot([small, displayphoto])).toBe(displayphoto);
  });
  it("never falls back to arbitrary page images", () => {
    expect(pickHeadshot(["https://example.com/office-party.jpg"])).toBeUndefined();
    expect(pickHeadshot([])).toBeUndefined();
    expect(pickHeadshot(undefined)).toBeUndefined();
  });
});

describe("pickHeadshotFromImageSearch", () => {
  it("accepts only images whose caption names the person", () => {
    const images = [
      { url: "https://cdn.example.com/logo.png", description: "The Acme company logo" },
      { url: "https://cdn.example.com/jane.jpg", description: "Jane Doe speaking at a conference" },
    ];
    expect(pickHeadshotFromImageSearch(images, "Jane Doe")).toBe("https://cdn.example.com/jane.jpg");
  });
  it("rejects uncaptioned images and partial name matches", () => {
    expect(
      pickHeadshotFromImageSearch([{ url: "https://cdn.example.com/mystery.jpg" }], "Jane Doe"),
    ).toBeUndefined();
    expect(
      pickHeadshotFromImageSearch(
        [{ url: "https://cdn.example.com/john.jpg", description: "John Doe portrait" }],
        "Jane Doe",
      ),
    ).toBeUndefined();
  });
  it("refuses single-token names and substring word hits", () => {
    expect(
      pickHeadshotFromImageSearch(
        [{ url: "https://cdn.example.com/luc.jpg", description: "Luc presenting a dashboard" }],
        "Luc",
      ),
    ).toBeUndefined();
    expect(
      pickHeadshotFromImageSearch(
        [{ url: "https://cdn.example.com/lucid.jpg", description: "The Lucid Doe dashboard" }],
        "Luc Doe",
      ),
    ).toBeUndefined();
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
    expect(result.photoUrl).toBeUndefined();
    expect(captured.prompt).not.toContain("authoritative identity anchor");
  });

  it("pulls the founder's headshot from the LinkedIn profile extract", async () => {
    const url = "https://www.linkedin.com/in/janedoe";
    const headshot =
      "https://media.licdn.com/dms/image/v2/D5603AQE/profile-displayphoto-shrink_800_800/jane.jpg";
    const search = new MockSearchClient([searchHit], {
      [url]: {
        rawContent: "# Jane Doe\n**Founder & CEO at Acme**",
        images: [
          "https://media.licdn.com/dms/image/v2/C4D0BAQH/company-logo_100_100/acme.png",
          headshot,
        ],
      },
    });
    const { llm } = llmEcho();

    const result = await sourceFounder({ linkedinUrl: url }, { search, llm });

    expect(result.photoUrl).toBe(headshot);
  });

  it("falls back to caption-verified image search when the extract has no photo", async () => {
    const url = "https://www.linkedin.com/in/janedoe";
    const search = new MockSearchClient(
      [searchHit],
      { [url]: "# Jane Doe\n**Founder & CEO at Acme**" },
      [
        { url: "https://cdn.example.com/logo.png", description: "The Acme company logo" },
        { url: "https://cdn.example.com/jane.jpg", description: "Jane Doe smiling in an office" },
      ],
    );
    const { llm } = llmEcho();

    const result = await sourceFounder({ linkedinUrl: url }, { search, llm });

    expect(result.photoUrl).toBe("https://cdn.example.com/jane.jpg");
  });
});
