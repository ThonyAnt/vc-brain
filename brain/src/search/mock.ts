import type { ExtractResult, ImageResult, SearchClient, SearchOptions, SearchResult } from "./client.js";

export type SearchFixtures =
  | SearchResult[]
  | Record<string, SearchResult[]>
  | ((query: string) => SearchResult[]);

/** URL -> full page content (or content + page images), for the extract() seam. */
export type ExtractFixtures = Record<string, string | { rawContent: string; images?: string[] }>;

/** Offline, deterministic SearchClient driven by fixtures. */
export class MockSearchClient implements SearchClient {
  constructor(
    private readonly fixtures: SearchFixtures = {},
    private readonly extractFixtures: ExtractFixtures = {},
    private readonly imageFixtures: ImageResult[] = [],
  ) {}

  async images(): Promise<ImageResult[]> {
    return this.imageFixtures;
  }

  async extract(urls: string[]): Promise<ExtractResult[]> {
    return urls.map((url) => {
      const fixture = this.extractFixtures[url];
      if (typeof fixture === "string" || fixture === undefined) {
        return { url, rawContent: fixture ?? "" };
      }
      return { url, rawContent: fixture.rawContent, images: fixture.images };
    });
  }

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
