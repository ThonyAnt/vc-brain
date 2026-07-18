import { z } from "zod";

/**
 * A map of string keys to numeric weights, tolerant of LLM slips: if the model
 * returns a numeric string it is coerced; anything non-numeric becomes 0.
 * Used for learned preference/score maps where strict typing isn't guaranteed.
 */
export const WeightRecord = z.record(
  z.string(),
  z.preprocess((v) => {
    if (typeof v === "number") return v;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }, z.number()),
);
export type WeightRecord = z.infer<typeof WeightRecord>;
