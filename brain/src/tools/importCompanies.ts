import {
  CompanySchema,
  type Company,
  type CompanyAttributes,
  type CompanyMetrics,
  type Founder,
} from "../schemas/company.js";
import type { LLMClient } from "../llm/client.js";
import { extractCompanyAttributes } from "./attributes.js";
import { slug, normName } from "../util/ids.js";

type Stage = Company["stage"];
type HistStatus = Company["historicalStatus"];
type Status = Company["status"];

/**
 * Loosely-structured company input (e.g. a teammate's synthetic dataset). Only
 * `name` is required. If `attributes` are supplied they're used directly;
 * otherwise they're extracted from `text`/`description` via the LLM.
 */
export interface RawCompanyInput {
  id?: string;
  name: string;
  description?: string;
  website?: string;
  sector?: string;
  stage?: Stage;
  geography?: string;
  checkSizeSought?: number;
  valuation?: number;
  founders?: Founder[];
  competitors?: string[];
  metrics?: CompanyMetrics;
  attributes?: Partial<CompanyAttributes>;
  historicalStatus?: HistStatus;
  outcome?: Company["outcome"];
  status?: Status;
  /** Free-form text used for attribute extraction when `attributes` is absent. */
  text?: string;
}

export interface ImportOptions {
  defaultHistoricalStatus?: HistStatus;
  defaultStatus?: Status;
}

function hasAttributeSignal(a?: Partial<CompanyAttributes>): boolean {
  if (!a) return false;
  return Boolean(
    a.industryPath?.length ||
      a.problemStatement ||
      a.businessModel ||
      a.targetCustomers?.length,
  );
}

function textForExtraction(raw: RawCompanyInput): string {
  return (
    raw.text ??
    [
      raw.name,
      raw.description,
      raw.sector && `Sector: ${raw.sector}`,
      raw.geography && `Geography: ${raw.geography}`,
    ]
      .filter(Boolean)
      .join(". ")
  );
}

/**
 * Normalize a batch of loosely-structured companies into validated Company
 * records. Uses supplied attributes when present, else extracts them with the
 * LLM. Deduped by name. Ready to drop into a seed bundle / the candidate universe.
 */
export async function importCompanies(
  raw: RawCompanyInput[],
  llm: LLMClient,
  opts: ImportOptions = {},
): Promise<Company[]> {
  const seen = new Set<string>();
  const out: Company[] = [];

  for (const entry of raw) {
    const key = normName(entry.name);
    if (!key || seen.has(key)) continue;
    seen.add(key);

    const attributes = hasAttributeSignal(entry.attributes)
      ? entry.attributes
      : await extractCompanyAttributes({ text: textForExtraction(entry), name: entry.name }, llm);

    out.push(
      CompanySchema.parse({
        id: entry.id ?? `co_${slug(entry.name)}`,
        name: entry.name,
        description: entry.description ?? "",
        attributes,
        founders: entry.founders ?? [],
        sector: entry.sector,
        stage: entry.stage,
        geography: entry.geography,
        checkSizeSought: entry.checkSizeSought,
        valuation: entry.valuation,
        metrics: entry.metrics,
        competitors: entry.competitors ?? [],
        historicalStatus: entry.historicalStatus ?? opts.defaultHistoricalStatus ?? "external",
        outcome: entry.outcome ?? "unknown",
        status: entry.status ?? opts.defaultStatus ?? "sourced",
        sourceRefs: entry.website ? [entry.website] : [],
      }),
    );
  }
  return out;
}
