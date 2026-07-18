import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { Company } from "../schemas/company.js";
import {
  CompanyIndex,
  findNearestCompanies,
  type NeighborResult,
} from "../tools/similarity.js";
import { SeedBundleSchema, type SeedBundle } from "./bundle.js";

export interface CompanyStore {
  get(id: string): Company | undefined;
  all(): Company[];
  byHistoricalStatus(status: Company["historicalStatus"]): Company[];
  nearest(id: string, k?: number): NeighborResult[];
  put(company: Company): void;
}

/**
 * In-memory company store backed by a seed bundle / JSON file. Cheap similarity
 * queries via CompanyIndex. Fine for the demo's ~dozens of companies; a Supabase
 * or pgvector adapter can implement the same `CompanyStore` interface later.
 */
export class JsonCompanyStore implements CompanyStore {
  private readonly index: CompanyIndex;

  constructor(companies: Company[] = []) {
    this.index = new CompanyIndex(companies);
  }

  static fromBundle(bundle: SeedBundle): JsonCompanyStore {
    return new JsonCompanyStore([
      ...bundle.portfolioCompanies,
      ...bundle.rejectedDeals,
      ...bundle.candidateUniverse,
      ...bundle.competitors,
    ]);
  }

  get(id: string): Company | undefined {
    return this.index.get(id);
  }

  all(): Company[] {
    return this.index.all();
  }

  byHistoricalStatus(status: Company["historicalStatus"]): Company[] {
    return this.all().filter((c) => c.historicalStatus === status);
  }

  nearest(id: string, k = 5): NeighborResult[] {
    const target = this.index.get(id);
    if (!target) return [];
    return findNearestCompanies(target, this.all(), { k });
  }

  put(company: Company): void {
    this.index.add(company);
  }
}

/** Load and validate a seed bundle from a JSON file. */
export async function loadBundle(path: string): Promise<SeedBundle> {
  const raw = await readFile(path, "utf8");
  return SeedBundleSchema.parse(JSON.parse(raw));
}

/** Validate and write a seed bundle to a JSON file (creating parent dirs). */
export async function saveBundle(path: string, bundle: SeedBundle): Promise<void> {
  const validated = SeedBundleSchema.parse(bundle);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(validated, null, 2) + "\n", "utf8");
}
