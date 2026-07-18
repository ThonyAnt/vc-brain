import { z } from "zod";
import { CompanyAttributesSchema, CompanyStage, FounderSchema } from "./company.js";

/** A company the discovery agent extracted from web-search results. */
export const DiscoveredCompanySchema = z.object({
  name: z.string(),
  description: z.string().default(""),
  website: z.string().optional(),
  sector: z.string().optional(),
  stage: CompanyStage.optional(),
  geography: z.string().optional(),
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
