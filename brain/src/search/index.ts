import type { SearchClient } from "./client.js";
import { TavilySearchClient } from "./tavily.js";

export type { SearchClient, SearchResult, SearchOptions } from "./client.js";
export { TavilySearchClient } from "./tavily.js";
export { MockSearchClient } from "./mock.js";
export type { SearchFixtures } from "./mock.js";

/**
 * A Tavily client if TAVILY_API_KEY is set, else undefined (discovery is then
 * skipped and the pipeline runs on the provided candidate universe only).
 */
export function createSearchClient(): SearchClient | undefined {
  if (process.env.TAVILY_API_KEY) return new TavilySearchClient();
  return undefined;
}
