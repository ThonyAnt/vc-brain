import { z } from "zod";
import { CompanyStage } from "../schemas/company.js";
import type { FundProfile } from "../schemas/fundProfile.js";

/**
 * The editable slice of the fund profile the UI works with. This is the shape
 * the app's Fund profile page reads (via GET /api/fund) and edits (via
 * POST /api/fund). It is intentionally flatter than the full FundProfile:
 * check size is split into two numbers and criteria are reduced to a
 * name -> weight map so the page can render sliders without knowing ids.
 */
export interface FundProfileView {
  thesis: string;
  checkSizeMin: number;
  checkSizeMax: number;
  stages: string[];
  sectors: string[];
  geographies: string[];
  weights: Record<string, number>;
}

/** A partial edit; every field is optional so the UI can PATCH a subset. */
export const FundProfilePatchSchema = z.object({
  thesis: z.string().optional(),
  checkSizeMin: z.number().nonnegative().optional(),
  checkSizeMax: z.number().nonnegative().optional(),
  stages: z.array(CompanyStage).optional(),
  sectors: z.array(z.string()).optional(),
  geographies: z.array(z.string()).optional(),
  weights: z.record(z.string(), z.number()).optional(),
});
export type FundProfilePatch = z.infer<typeof FundProfilePatchSchema>;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Project the full fund profile down to the editable slice the UI needs. */
export function fundProfileToView(profile: FundProfile): FundProfileView {
  const weights: Record<string, number> = {};
  for (const c of profile.criteria) weights[c.name] = Number(c.weight.toFixed(2));
  return {
    thesis: profile.thesisSummary,
    checkSizeMin: profile.checkSize.min,
    checkSizeMax: profile.checkSize.max,
    stages: [...profile.stages],
    sectors: [...profile.sectors],
    geographies: [...profile.geographies],
    weights,
  };
}

/**
 * Apply a UI edit to the fund profile, returning an updated copy (the caller
 * decides whether to commit it to state). Weights map to existing criteria by
 * name (exact, then case-insensitive); values are clamped to [0,1]; names that
 * match no criterion are ignored. Only the fields present in the patch change.
 */
export function applyFundPatch(profile: FundProfile, patch: FundProfilePatch): FundProfileView {
  const next: FundProfile = {
    ...profile,
    checkSize: { ...profile.checkSize },
    stages: [...profile.stages],
    sectors: [...profile.sectors],
    geographies: [...profile.geographies],
    criteria: profile.criteria.map((c) => ({ ...c })),
  };

  if (patch.thesis !== undefined) next.thesisSummary = patch.thesis;
  if (patch.checkSizeMin !== undefined) next.checkSize.min = patch.checkSizeMin;
  if (patch.checkSizeMax !== undefined) next.checkSize.max = patch.checkSizeMax;
  if (patch.stages !== undefined) next.stages = [...patch.stages];
  if (patch.sectors !== undefined) next.sectors = [...patch.sectors];
  if (patch.geographies !== undefined) next.geographies = [...patch.geographies];

  if (patch.weights) {
    for (const [name, weight] of Object.entries(patch.weights)) {
      const target =
        next.criteria.find((c) => c.name === name) ??
        next.criteria.find((c) => c.name.toLowerCase() === name.toLowerCase());
      if (target) target.weight = clamp01(weight);
      else console.warn(`applyFundPatch: no criterion named '${name}', weight ignored`);
    }
  }

  // Mutate the caller's object in place so state.fundProfile is updated, and
  // also return the fresh view for the response.
  Object.assign(profile, next);
  return fundProfileToView(profile);
}
