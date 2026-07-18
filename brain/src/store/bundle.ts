import { z } from "zod";
import { CompanySchema } from "../schemas/company.js";
import { FundProfileSchema } from "../schemas/fundProfile.js";
import { HistoricalMemoSchema } from "../schemas/history.js";
import { createInitialState, type VCBrainState } from "../state.js";

/**
 * A seed bundle is the full demo dataset in one JSON-serializable object:
 * the fund's mandate + history + candidate universe. This is what we persist,
 * commit, and load to seed the brain (local-JSON storage).
 */
export const SeedBundleSchema = z.object({
  mandate: z.string(),
  fundProfile: FundProfileSchema.optional(),
  historicalMemos: z.array(HistoricalMemoSchema).default([]),
  portfolioCompanies: z.array(CompanySchema).default([]),
  rejectedDeals: z.array(CompanySchema).default([]),
  candidateUniverse: z.array(CompanySchema).default([]),
  competitors: z.array(CompanySchema).default([]),
});
export type SeedBundle = z.infer<typeof SeedBundleSchema>;

/** Build a fresh pipeline state from a seed bundle (competitors passed separately to runPipeline). */
export function stateFromBundle(bundle: SeedBundle): VCBrainState {
  const state = createInitialState({
    mandate: bundle.mandate,
    historicalMemos: bundle.historicalMemos,
    portfolioCompanies: bundle.portfolioCompanies,
    rejectedDeals: bundle.rejectedDeals,
    candidateUniverse: bundle.candidateUniverse,
  });
  if (bundle.fundProfile) state.fundProfile = bundle.fundProfile;
  return state;
}
