import type { Company } from "../schemas/company.js";
import {
  computeCompanySimilarity,
  type DimensionEmbeddings,
  type SimilarityDimension,
  type SimilarityResult,
} from "../similarity/compute.js";

/** In-memory company lookup shared by the deterministic tools. */
export class CompanyIndex {
  private readonly byId = new Map<string, Company>();
  constructor(companies: Company[] = []) {
    for (const c of companies) this.byId.set(c.id, c);
  }
  get(id: string): Company | undefined {
    return this.byId.get(id);
  }
  has(id: string): boolean {
    return this.byId.has(id);
  }
  add(c: Company): void {
    this.byId.set(c.id, c);
  }
  all(): Company[] {
    return [...this.byId.values()];
  }
}

/** Optional per-company embeddings for the free-text similarity dimensions. */
export type EmbeddingMap = Map<string, DimensionEmbeddings>;

function embeddingsFor(
  a: Company,
  b: Company,
  emb?: EmbeddingMap,
): { a: DimensionEmbeddings; b: DimensionEmbeddings } | undefined {
  if (!emb) return undefined;
  const ea = emb.get(a.id);
  const eb = emb.get(b.id);
  if (!ea || !eb) return undefined;
  return { a: ea, b: eb };
}

/** `compute_company_similarity` — company-to-company similarity (graph position). */
export function companySimilarity(
  a: Company,
  b: Company,
  emb?: EmbeddingMap,
): SimilarityResult {
  return computeCompanySimilarity(a.attributes, b.attributes, {
    embeddings: embeddingsFor(a, b, emb),
  });
}

export interface NeighborResult {
  companyId: string;
  similarity: number;
  breakdown: Record<SimilarityDimension, number>;
}

export interface NearestOptions {
  k?: number;
  filter?: (c: Company) => boolean;
  embeddings?: EmbeddingMap;
}

/** `find_nearest_companies` — nearest companies to a target by similarity. */
export function findNearestCompanies(
  target: Company,
  corpus: Company[],
  opts: NearestOptions = {},
): NeighborResult[] {
  const k = opts.k ?? 5;
  const results: NeighborResult[] = [];
  for (const c of corpus) {
    if (c.id === target.id) continue;
    if (opts.filter && !opts.filter(c)) continue;
    const sim = companySimilarity(target, c, opts.embeddings);
    results.push({ companyId: c.id, similarity: sim.overall, breakdown: sim.dimensions });
  }
  results.sort((x, y) => y.similarity - x.similarity);
  return results.slice(0, k);
}
