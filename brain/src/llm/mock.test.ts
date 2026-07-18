import { describe, it, expect } from "vitest";
import { z } from "zod";
import { MockLLMClient } from "./mock.js";
import { cosine } from "../similarity/metrics.js";

describe("MockLLMClient", () => {
  it("returns and validates a registered structured fixture", async () => {
    const schema = z.object({ n: z.number(), label: z.string() });
    const client = new MockLLMClient({ structured: { Thing: { n: 3, label: "x" } } });
    const out = await client.generateStructured({
      schema,
      schemaName: "Thing",
      prompt: "make a thing",
    });
    expect(out).toEqual({ n: 3, label: "x" });
  });

  it("throws when no fixture is registered", async () => {
    const client = new MockLLMClient();
    await expect(
      client.generateStructured({ schema: z.object({}), schemaName: "Missing", prompt: "p" }),
    ).rejects.toThrow(/no structured fixture/);
  });

  it("throws when a fixture violates the schema", async () => {
    const schema = z.object({ n: z.number() });
    const client = new MockLLMClient({ structured: { Bad: { n: "not a number" } } });
    await expect(
      client.generateStructured({ schema, schemaName: "Bad", prompt: "p" }),
    ).rejects.toThrow();
  });

  it("supports handler functions of the request", async () => {
    const schema = z.object({ echo: z.string() });
    const client = new MockLLMClient({
      structured: { Echo: (req) => ({ echo: req.prompt }) },
    });
    const out = await client.generateStructured({ schema, schemaName: "Echo", prompt: "hi" });
    expect(out.echo).toBe("hi");
  });

  it("produces deterministic embeddings; similar text -> higher cosine", async () => {
    const client = new MockLLMClient();
    const [a1] = await client.embed(["reducing clinical documentation burden"]);
    const [a2] = await client.embed(["reducing clinical documentation burden"]);
    expect(a1).toEqual(a2); // deterministic

    const [near] = await client.embed(["reducing clinical documentation work"]);
    const [far] = await client.embed(["marketplace for used cars"]);
    expect(cosine(a1!, near!)).toBeGreaterThan(cosine(a1!, far!));
  });
});
