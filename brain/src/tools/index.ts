export { CompanyIndex } from "./similarity.js";
export type { EmbeddingMap, NeighborResult, NearestOptions } from "./similarity.js";
export { companySimilarity, findNearestCompanies } from "./similarity.js";

export { fundFit, rankCandidates } from "./fundfit.js";
export type { RankInput } from "./fundfit.js";

export { buildMarketLandscape } from "./landscape.js";
export type {
  MarketLandscape,
  LandscapeNode,
  LandscapeEdge,
  LandscapeCluster,
  LandscapeOptions,
} from "./landscape.js";

export { emitGraphEvent } from "./events.js";
export type { EmitEventInput } from "./events.js";

export { extractCompanyAttributes } from "./attributes.js";
export type { ExtractAttributesInput } from "./attributes.js";

export { discoverCompanies, buildDiscoveryQueries } from "./discover.js";
export type { DiscoverInput, DiscoverDeps } from "./discover.js";

// Re-export the deterministic financial model as a tool.
export { calculateFinancialScenarios } from "../finance/scenarios.js";
export type { ScenarioSet, ScenarioResult, ScenarioMultipliers } from "../finance/scenarios.js";
