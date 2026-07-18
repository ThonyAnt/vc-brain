import type { z } from "zod";

export interface StructuredRequest<S extends z.ZodTypeAny = z.ZodTypeAny> {
  /** Zod schema the response MUST validate against. */
  schema: S;
  /** Stable name for the schema (used as the OpenAI json_schema name / mock key). */
  schemaName: string;
  system?: string;
  prompt: string;
  model?: string;
}

export interface TextRequest {
  system?: string;
  prompt: string;
  model?: string;
}

/**
 * The single seam between agents and any LLM provider. Agents depend only on
 * this interface, so the whole pipeline runs offline against MockLLMClient and
 * swaps to OpenAILLMClient with no caller changes.
 */
export interface LLMClient {
  /** Generate an object validated against `req.schema`. */
  generateStructured<S extends z.ZodTypeAny>(req: StructuredRequest<S>): Promise<z.infer<S>>;
  /** Generate free text. */
  generateText(req: TextRequest): Promise<string>;
  /** Stream free text as provider-sized deltas. */
  streamText(req: TextRequest): AsyncIterable<string>;
  /** Embed texts into vectors (per-dimension semantic similarity). */
  embed(texts: string[]): Promise<number[][]>;
}
