import type { LLMClient } from "./client.js";
import { MockLLMClient } from "./mock.js";

export * from "./client.js";
export { MockLLMClient } from "./mock.js";
export { OpenAILLMClient } from "./openai.js";

/**
 * Select an LLM client from the environment. Defaults to the mock so nothing
 * hits the network unless VC_BRAIN_LLM=openai (and OPENAI_API_KEY) are set.
 * OpenAI is loaded lazily so the openai SDK isn't required for mock runs.
 */
export async function createLLMClient(): Promise<LLMClient> {
  if (process.env.VC_BRAIN_LLM === "openai") {
    const { OpenAILLMClient } = await import("./openai.js");
    return new OpenAILLMClient({ model: process.env.VC_BRAIN_OPENAI_MODEL });
  }
  return new MockLLMClient();
}
