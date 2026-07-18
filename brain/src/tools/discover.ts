import { CompanySchema, type Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import { DiscoveryExtractionSchema } from "../schemas/discovery.js";
import type { LLMClient } from "../llm/client.js";
import type { SearchClient, SearchResult } from "../search/client.js";

const DISCOVERY_SYSTEM = `You are the Market Scout's discovery step. From noisy web-search results,
extract DISTINCT, REAL startups that plausibly fit the fund. For each, normalize its similarity
attributes (industry/product hierarchies root->leaf, problem statement, customer/technical/founder/
disruption/regulatory labels, business model, GTM). Ignore listicles, news outlets, funds, and
duplicates. Only include companies actually named in the results — do not invent them. If a result
names several companies, extract each. Attributes describe WHAT KIND of company it is, not its quality.`;

const norm = (s: string) => s.trim().toLowerCase();
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40) || "company";

export interface DiscoverInput {
  mandate: string;
  fundProfile?: FundProfile;
  /** Explicit queries; if omitted they're derived from the fund profile. */
  queries?: string[];
  maxQueries?: number;
  resultsPerQuery?: number;
  /** Max companies to return. */
  limit?: number;
  /** Company names already known, to skip as duplicates. */
  excludeNames?: string[];
}

export interface DiscoverDeps {
  search: SearchClient;
  llm: LLMClient;
}

/** Derive a few focused search queries from the fund's thesis/sectors/stage. */
export function buildDiscoveryQueries(input: DiscoverInput): string[] {
  if (input.queries?.length) return input.queries.slice(0, input.maxQueries ?? input.queries.length);
  const p = input.fundProfile;
  const stage = (p?.stages?.[0] ?? "seed").replace(/_/g, " ");
  const sectors = p?.sectors?.length ? p.sectors : ["technology"];
  const queries = sectors.map((s) => `${stage} stage ${s} startups recently funded`);
  if (p?.thesisSummary) {
    queries.push(`emerging startups matching thesis: ${p.thesisSummary}`.slice(0, 200));
  } else if (input.mandate) {
    queries.push(input.mandate.slice(0, 200));
  }
  return queries.slice(0, input.maxQueries ?? 3);
}

/**
 * Discover real companies from the web: build queries from the fund profile,
 * search (Tavily), then use the LLM to extract normalized Company records from
 * the results. Deduped against `excludeNames` and each other; historicalStatus
 * "external", status "sourced". Feeds the same ranking pipeline as any candidate.
 */
export async function discoverCompanies(
  input: DiscoverInput,
  deps: DiscoverDeps,
): Promise<Company[]> {
  const queries = buildDiscoveryQueries(input);
  const bySnippetUrl = new Set<string>();
  const results: SearchResult[] = [];
  for (const q of queries) {
    const found = await deps.search.search(q, { maxResults: input.resultsPerQuery ?? 5 });
    for (const r of found) {
      if (!bySnippetUrl.has(r.url)) {
        bySnippetUrl.add(r.url);
        results.push(r);
      }
    }
  }
  if (results.length === 0) return [];

  const context = results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.content}`)
    .join("\n\n");

  const extraction = await deps.llm.generateStructured({
    schema: DiscoveryExtractionSchema,
    schemaName: "DiscoveryExtraction",
    system: DISCOVERY_SYSTEM,
    prompt:
      `Fund thesis: ${input.fundProfile?.thesisSummary ?? input.mandate}\n\n` +
      `Web-search results:\n${context}\n\n` +
      `Extract the distinct startups that fit the fund.`,
  });

  const exclude = new Set((input.excludeNames ?? []).map(norm));
  const taken = new Set<string>();
  const out: Company[] = [];
  for (const d of extraction.companies) {
    const key = norm(d.name);
    if (!key || exclude.has(key) || taken.has(key)) continue;
    taken.add(key);
    out.push(
      CompanySchema.parse({
        id: `co_${slug(d.name)}`,
        name: d.name,
        description: d.description,
        attributes: d.attributes,
        founders: d.founders,
        sector: d.sector,
        stage: d.stage,
        geography: d.geography,
        historicalStatus: "external",
        status: "sourced",
        sourceRefs: d.website ? [d.website, ...d.sourceUrls] : d.sourceUrls,
      }),
    );
    if (input.limit && out.length >= input.limit) break;
  }
  return out;
}
