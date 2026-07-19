import { CompanySchema, type Company } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";
import { DiscoveryExtractionSchema } from "../schemas/discovery.js";
import type { LLMClient } from "../llm/client.js";
import type { SearchClient, SearchResult } from "../search/client.js";

const DISCOVERY_SYSTEM = `You are the Market Scout's discovery step. From noisy web-search results,
extract DISTINCT, REAL startups that match the investor's ask. For each, normalize its similarity
attributes (industry/product hierarchies root->leaf, problem statement, customer/technical/founder/
disruption/regulatory labels, business model, GTM). Ignore listicles-as-entities, news outlets, funds,
and duplicates. Only include companies actually named in the results — do not invent them. If a result
names several companies, extract each. Attributes describe WHAT KIND of company it is, not its quality.
When the results reveal them, include the company's official website domain and its HQ city with
approximate latitude/longitude (your best geographic estimate for the city is fine).
Match the investor ask even when it sits outside the fund's usual sectors. Prefer names not listed as
already known.`;

/** Favicon-service logo for a company website; null if the domain can't be parsed. */
export function logoUrlFor(website?: string): string | undefined {
  if (!website) return undefined;
  try {
    const domain = new URL(website.startsWith("http") ? website : `https://${website}`).hostname;
    return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : undefined;
  } catch {
    return undefined;
  }
}

const norm = (s: string) => s.trim().toLowerCase();
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40) || "company";

const CHAT_ASK_RE =
  /\b(source|sourcing|find|discover|scout|search for|look for|identify|surface)\b/i;

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

/** Turn a chat-style ask into Tavily-friendly search queries. */
export function queriesFromInvestorAsk(ask: string): string[] {
  const topic = ask
    .replace(/\b(can|could|would|will|you|please|source|sourcing|find|discover|scout|identify|surface|get|me|us|our)\b/gi, " ")
    .replace(/\b(search for|look for)\b/gi, " ")
    .replace(/\b(some|any|few|a|an|the|new|good|great|interesting|potential)\b/gi, " ")
    .replace(/\b(compan(?:y|ies)|startups?|deals?|candidates?|investments?|opportunities)\b/gi, " ")
    .replace(/[^a-z0-9$&+/\-.\s]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const focus = topic.length >= 2 ? topic : ask.slice(0, 80).trim();
  return [
    `${focus} startups recently funded`,
    `seed stage ${focus} companies`,
    `emerging ${focus} startups`,
  ];
}

function expandQueryList(queries: string[], maxQueries: number): string[] {
  const out: string[] = [];
  for (const query of queries) {
    const next = CHAT_ASK_RE.test(query) ? queriesFromInvestorAsk(query) : [query];
    for (const item of next) {
      if (!out.includes(item)) out.push(item);
      if (out.length >= maxQueries) return out;
    }
  }
  return out.slice(0, maxQueries);
}

/** Derive a few focused search queries from the fund's thesis/sectors/stage. */
export function buildDiscoveryQueries(input: DiscoverInput): string[] {
  const maxQueries = input.maxQueries ?? 3;
  if (input.queries?.length) return expandQueryList(input.queries, maxQueries);
  const p = input.fundProfile;
  const stage = (p?.stages?.[0] ?? "seed").replace(/_/g, " ");
  const sectors = p?.sectors?.length ? p.sectors : ["technology"];
  const queries = sectors.map((s) => `${stage} stage ${s} startups recently funded`);
  if (p?.thesisSummary) {
    queries.push(`emerging startups matching thesis: ${p.thesisSummary}`.slice(0, 200));
  } else if (input.mandate) {
    if (CHAT_ASK_RE.test(input.mandate)) queries.push(...queriesFromInvestorAsk(input.mandate));
    else queries.push(input.mandate.slice(0, 200));
  }
  return queries.slice(0, maxQueries);
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
  const known = (input.excludeNames ?? []).slice(0, 40).join(", ");

  const extraction = await deps.llm.generateStructured({
    schema: DiscoveryExtractionSchema,
    schemaName: "DiscoveryExtraction",
    system: DISCOVERY_SYSTEM,
    prompt:
      `Investor ask (HARD TARGET — extract companies that match this ask):\n${input.mandate}\n\n` +
      `Fund thesis (soft preference only — do not reject ask-matching companies outside it):\n` +
      `${input.fundProfile?.thesisSummary ?? "(none)"}\n\n` +
      (known ? `Already known — prefer other names: ${known}\n\n` : "") +
      `Web-search results:\n${context}\n\n` +
      `Extract the distinct startups that match the investor ask.`,
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
        website: d.website,
        logoUrl: logoUrlFor(d.website),
        hqCity: d.hqCity,
        hqLat: d.hqLat,
        hqLng: d.hqLng,
        historicalStatus: "external",
        status: "sourced",
        sourceRefs: d.website ? [d.website, ...d.sourceUrls] : d.sourceUrls,
      }),
    );
    if (input.limit && out.length >= input.limit) break;
  }
  return out;
}
