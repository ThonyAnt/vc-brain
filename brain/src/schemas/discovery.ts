import { z } from "zod";
import { CompanyAttributesSchema, CompanyStage, FounderSchema } from "./company.js";

/** Map messy LLM stage labels onto the closed CompanyStage enum. */
function coerceCompanyStage(value: unknown): unknown {
  if (value == null || value === "") return undefined;
  if (typeof value !== "string") return value;
  const key = value.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (CompanyStage.options.includes(key as z.infer<typeof CompanyStage>)) return key;
  if (/pre[_\s-]*seed/.test(key)) return "pre_seed";
  if (/^seed/.test(key)) return "seed";
  if (/series[_\s]*a\b|^a$/.test(key)) return "series_a";
  if (/series[_\s]*b\b|^b$/.test(key)) return "series_b";
  if (/series[_\s]*[cdef]|series[_\s]*c_plus|late[_\s]*stage/.test(key)) return "series_c_plus";
  if (/growth|public|ipo/.test(key)) return "growth";
  return undefined;
}

/** A company the discovery agent extracted from web-search results. */
export const DiscoveredCompanySchema = z.object({
  name: z.string(),
  description: z.string().default(""),
  website: z.string().optional(),
  sector: z.string().optional(),
  stage: z.preprocess(coerceCompanyStage, CompanyStage.optional()),
  geography: z.string().optional(),
  /** HQ city ("Austin", "Berlin") and approximate coordinates. */
  hqCity: z.string().optional(),
  hqLat: z.number().min(-90).max(90).optional(),
  hqLng: z.number().min(-180).max(180).optional(),
  founders: z.array(FounderSchema).default([]),
  attributes: CompanyAttributesSchema,
  /** Which search-result indices support this company (for provenance). */
  sourceUrls: z.array(z.string()).default([]),
});
export type DiscoveredCompany = z.infer<typeof DiscoveredCompanySchema>;

export const DiscoveryExtractionSchema = z.object({
  companies: z.array(DiscoveredCompanySchema),
});
export type DiscoveryExtraction = z.infer<typeof DiscoveryExtractionSchema>;
