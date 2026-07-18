import type { SearchClient, SearchOptions, SearchResult } from "./client.js";

export type SearchFixtures =
  | SearchResult[]
  | Record<string, SearchResult[]>
  | ((query: string) => SearchResult[]);

/** Offline, deterministic SearchClient driven by fixtures. */
export class MockSearchClient implements SearchClient {
  constructor(private readonly fixtures: SearchFixtures = {}) {}

  async search(query: string, opts: SearchOptions = {}): Promise<SearchResult[]> {
    let results: SearchResult[];
    if (typeof this.fixtures === "function") {
      results = this.fixtures(query);
    } else if (Array.isArray(this.fixtures)) {
      results = this.fixtures;
    } else {
      results = this.fixtures[query] ?? Object.values(this.fixtures).flat();
    }
    const max = opts.maxResults ?? results.length;
    return results.slice(0, max);
  }
}
