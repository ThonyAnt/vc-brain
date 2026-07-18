import type { z } from "zod";
import type { LLMClient, StructuredRequest, TextRequest } from "./client.js";

export type StructuredHandler = object | ((req: StructuredRequest) => unknown);
export type TextHandler = string | ((req: TextRequest) => string);

export interface MockLLMOptions {
  /** Canned structured outputs keyed by schemaName. Value or (req)->value. */
  structured?: Record<string, StructuredHandler>;
  /** Canned text keyed by an arbitrary label, or a single resolver. */
  text?: Record<string, TextHandler> | ((req: TextRequest) => string);
  /** Embedding dimensionality (default 64). */
  embedDim?: number;
}

/** Deterministic 32-bit string hash (FNV-1a). */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Offline, deterministic LLMClient. Structured outputs come from registered
 * fixtures (validated against the caller's schema so fixture drift is caught).
 * Embeddings are a hashed bag-of-words so similar text -> similar vectors.
 */
export class MockLLMClient implements LLMClient {
  private readonly embedDim: number;

  constructor(private readonly opts: MockLLMOptions = {}) {
    this.embedDim = opts.embedDim ?? 64;
  }

  async generateStructured<S extends z.ZodTypeAny>(req: StructuredRequest<S>): Promise<z.infer<S>> {
    const handler = this.opts.structured?.[req.schemaName];
    if (handler === undefined) {
      throw new Error(
        `MockLLMClient: no structured fixture registered for schema '${req.schemaName}'`,
      );
    }
    const value =
      typeof handler === "function"
        ? (handler as (r: StructuredRequest) => unknown)(req)
        : handler;
    // Validate so a bad fixture fails loudly, exactly like a real bad response.
    return req.schema.parse(value);
  }

  async generateText(req: TextRequest): Promise<string> {
    const t = this.opts.text;
    if (typeof t === "function") return t(req);
    if (t) {
      const first = Object.values(t)[0];
      if (typeof first === "function") return (first as (r: TextRequest) => string)(req);
      if (typeof first === "string") return first;
    }
    return `[[mock text for: ${req.prompt.slice(0, 40)}]]`;
  }

  async embed(texts: string[]): Promise<number[][]> {
    return texts.map((text) => this.embedOne(text));
  }

  private embedOne(text: string): number[] {
    const vec = new Array<number>(this.embedDim).fill(0);
    const tokens = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    for (const tok of tokens) {
      const idx = hash(tok) % this.embedDim;
      vec[idx] = (vec[idx] ?? 0) + 1;
    }
    const norm = Math.sqrt(vec.reduce((s, x) => s + x * x, 0));
    return norm === 0 ? vec : vec.map((x) => x / norm);
  }
}
