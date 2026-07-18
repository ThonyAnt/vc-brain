export interface SearchResult {
  title: string;
  url: string;
  /** Snippet / summary content from the search provider. */
  content: string;
  /** Provider relevance score (0..1). */
  score: number;
  /** Full page text when requested (optional, larger). */
  rawContent?: string;
}

export interface SearchOptions {
  maxResults?: number;
  depth?: "basic" | "advanced";
  includeRawContent?: boolean;
}

/**
 * The seam between discovery and any web-search provider. Discovery depends
 * only on this interface, so it runs offline against MockSearchClient and swaps
 * to TavilySearchClient with no caller changes.
 */
export interface SearchClient {
  search(query: string, opts?: SearchOptions): Promise<SearchResult[]>;
}
