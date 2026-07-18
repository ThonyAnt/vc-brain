import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
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
 * OpenAI-backed LLMClient. Structured output uses OpenAI's JSON-schema
 * response format (Zod -> schema); embeddings use text-embedding-3-small.
 * Selected via env flag — never the default in tests.
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
    const completion = await this.client.beta.chat.completions.parse({
      model: req.model ?? this.model,
      messages: [
        ...(req.system ? [{ role: "system" as const, content: req.system }] : []),
        { role: "user" as const, content: req.prompt },
      ],
      response_format: zodResponseFormat(req.schema, req.schemaName),
    });
    const parsed = completion.choices[0]?.message.parsed;
    if (parsed == null) {
      const refusal = completion.choices[0]?.message.refusal;
      throw new Error(
        `OpenAILLMClient: no parsed output for '${req.schemaName}'` +
          (refusal ? ` (refusal: ${refusal})` : ""),
      );
    }
    return parsed as z.infer<S>;
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
