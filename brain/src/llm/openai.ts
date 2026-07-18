import OpenAI from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import type { z } from "zod";
import type { LLMClient, StructuredRequest, TextRequest } from "./client.js";

export interface OpenAILLMOptions {
  client?: OpenAI;
  /** Chat model for reasoning/structured output. */
  model?: string;
  /** Embedding model. */
  embedModel?: string;
}

/**
 * OpenAI-backed LLMClient. Structured output uses a NON-strict json_schema
 * response format (our Zod schemas use defaults/records that OpenAI's strict
 * mode rejects). The schema strongly guides the model; our own `schema.parse`
 * validates and applies defaults, and the orchestrator retries on failure.
 * Embeddings use text-embedding-3-small.
 */
export class OpenAILLMClient implements LLMClient {
  private readonly client: OpenAI;
  private readonly model: string;
  private readonly embedModel: string;

  constructor(opts: OpenAILLMOptions = {}) {
    this.client = opts.client ?? new OpenAI();
    this.model = opts.model ?? "gpt-4o-2024-08-06";
    this.embedModel = opts.embedModel ?? "text-embedding-3-small";
  }

  async generateStructured<S extends z.ZodTypeAny>(req: StructuredRequest<S>): Promise<z.infer<S>> {
    // Default target is JSON Schema draft-7, which OpenAI's structured outputs
    // expect (numeric exclusiveMinimum, etc.). $refStrategy:"none" inlines $refs.
    const jsonSchema = zodToJsonSchema(req.schema, {
      $refStrategy: "none",
    }) as Record<string, unknown>;

    const completion = await this.client.chat.completions.create({
      model: req.model ?? this.model,
      messages: [
        ...(req.system ? [{ role: "system" as const, content: req.system }] : []),
        { role: "user" as const, content: req.prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: req.schemaName, schema: jsonSchema, strict: false },
      },
    });

    const content = completion.choices[0]?.message.content;
    if (!content) {
      const refusal = completion.choices[0]?.message.refusal;
      throw new Error(
        `OpenAILLMClient: empty output for '${req.schemaName}'` +
          (refusal ? ` (refusal: ${refusal})` : ""),
      );
    }
    let raw: unknown;
    try {
      raw = JSON.parse(content);
    } catch {
      throw new Error(`OpenAILLMClient: non-JSON output for '${req.schemaName}'`);
    }
    // Validate + coerce (applies our Zod defaults). Throws -> orchestrator retries.
    return req.schema.parse(raw);
  }

  async generateText(req: TextRequest): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: req.model ?? this.model,
      messages: [
        ...(req.system ? [{ role: "system" as const, content: req.system }] : []),
        { role: "user" as const, content: req.prompt },
      ],
    });
    return completion.choices[0]?.message.content ?? "";
  }

  async embed(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];
    const res = await this.client.embeddings.create({
      model: this.embedModel,
      input: texts,
    });
    return res.data.map((d) => d.embedding);
  }
}
