import type { ExtractResult, SearchClient, SearchOptions, SearchResult } from "./client.js";

interface TavilyRaw {
  results?: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
    raw_content?: string | null;
  }>;
}

interface TavilyExtractRaw {
  results?: Array<{ url: string; raw_content?: string | null }>;
}

export interface TavilyOptions {
  apiKey?: string;
  endpoint?: string;
  extractEndpoint?: string;
}

/** Tavily-backed web search. Auth via `Authorization: Bearer <TAVILY_API_KEY>`. */
export class TavilySearchClient implements SearchClient {
  private readonly apiKey: string | undefined;
  private readonly endpoint: string;
  private readonly extractEndpoint: string;

  constructor(opts: TavilyOptions = {}) {
    this.apiKey = opts.apiKey ?? process.env.TAVILY_API_KEY;
    this.endpoint = opts.endpoint ?? "https://api.tavily.com/search";
    this.extractEndpoint = opts.extractEndpoint ?? "https://api.tavily.com/extract";
  }

  /** Pull full page content for specific URLs (reads past crawler snippets). */
  async extract(urls: string[]): Promise<ExtractResult[]> {
    if (!this.apiKey) throw new Error("TavilySearchClient: TAVILY_API_KEY not set");
    if (urls.length === 0) return [];
    const res = await fetch(this.extractEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ urls }),
    });
    if (!res.ok) {
      throw new Error(`TavilySearchClient.extract: ${res.status} ${await res.text()}`);
    }
    const json = (await res.json()) as TavilyExtractRaw;
    return (json.results ?? []).map((r) => ({ url: r.url, rawContent: r.raw_content ?? "" }));
  }

  async search(query: string, opts: SearchOptions = {}): Promise<SearchResult[]> {
    if (!this.apiKey) throw new Error("TavilySearchClient: TAVILY_API_KEY not set");
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        query,
        max_results: opts.maxResults ?? 5,
        search_depth: opts.depth ?? "basic",
        include_raw_content: opts.includeRawContent ?? false,
      }),
    });
    if (!res.ok) {
      throw new Error(`TavilySearchClient: ${res.status} ${await res.text()}`);
    }
    const json = (await res.json()) as TavilyRaw;
    return (json.results ?? []).map((r) => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score,
      rawContent: r.raw_content ?? undefined,
    }));
  }
}
