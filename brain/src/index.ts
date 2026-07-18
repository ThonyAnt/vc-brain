// Public API for the VC Brain agent + logic layer.

export * from "./schemas/index.js";
export * from "./state.js";

// LLM seam
export type { LLMClient, StructuredRequest, TextRequest } from "./llm/client.js";
export { MockLLMClient } from "./llm/mock.js";
export { OpenAILLMClient } from "./llm/openai.js";
export { createLLMClient } from "./llm/index.js";

// Search seam (web discovery)
export type { SearchClient, SearchResult, SearchOptions } from "./search/client.js";
export { TavilySearchClient, MockSearchClient, createSearchClient } from "./search/index.js";

// Deterministic math
export {
  computeCompanySimilarity,
  DEFAULT_SIMILARITY_WEIGHTS,
  type SimilarityResult,
  type SimilarityDimension,
  type SimilarityWeights,
} from "./similarity/compute.js";
export { computeFundFit, computeSourcingScore, attributeKeys } from "./fundfit/compute.js";
export {
  calculateFinancialScenarios,
  type ScenarioSet,
  type ScenarioResult,
} from "./finance/scenarios.js";

// Tools
export * from "./tools/index.js";

// Agents
export * from "./agents/index.js";

// Orchestrator
export { runPipeline, applyFeedback, type OrchestratorOptions } from "./orchestrator.js";

// Interactive main-agent orchestration (regular response or streamed deltas).
export {
  runOrchestratorChat,
  streamOrchestratorChat,
  type ChatOrchestratorOptions,
  type ChatStreamEvent,
  type OrchestratorChatContext,
  type OrchestratorChatMessage,
} from "./chat/orchestrator.js";

// Storage / seeding (local JSON)
export * from "./store/index.js";
