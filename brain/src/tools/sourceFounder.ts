import { z } from "zod";
import type { LLMClient } from "../llm/client.js";
import type { SearchClient, SearchResult } from "../search/client.js";
import type { FundProfile } from "../schemas/fundProfile.js";

/*
 * Founder scout: source and score a single person from the open web.
 *
 * Given a LinkedIn URL, we read that specific profile via the search provider's
 * extract endpoint (Tavily resolves the public profile past the crawler snippet)
 * and use it as the IDENTITY ANCHOR — the real name/role/background, not a guess
 * from the URL slug. We then corroborate with web search (funding news,
 * Crunchbase, interviews, personal sites) for substance. With only a name, we
 * rely on search alone. Extraction is best-effort: if it fails we fall back to
 * the slug-derived name and search.
 */

export const FounderSourcingSchema = z.object({
  name: z.string(),
  role: z.string().default("Founder"),
  /** Current company, when the results reveal one. */
  company: z.string().optional(),
  background: z.string().default(""),
  signals: z.array(z.string()).default([]),
  /** 0–100 fund-calibrated founder score. */
  score: z.number().min(0).max(100),
  justification: z.string(),
  confidence: z.enum(["low", "medium", "high"]).default("medium"),
});
export type FounderSourcing = z.infer<typeof FounderSourcingSchema>;

export interface SourcedFounderView extends FounderSourcing {
  id: string;
  linkedin?: string;
  sources: string[];
}

/*
 * TODO(anthony): fill with calibrated exemplars from fund history — winner
 * founders (Corepay/Quillon archetypes) as highs with the reasoning, the
 * regret-pass operator corrected upward, and correct-pass profiles as lows.
 * Each entry becomes one few-shot block in the scoring prompt.
 */
export const FEW_SHOT_EXAMPLES: { profile: string; score: number; justification: string }[] = [];

const FOUNDER_SCOUT_SYSTEM = `You are a venture fund's founder scout. From noisy web-search results
about ONE person, assemble their profile (role, background, notable signals) and assign a
fund-calibrated score from 0-100 for how strongly this fund should pursue them as a founder to back.
Only use facts present in the results — never invent employers, exits, or credentials. If the results
are thin or ambiguous about identity, say so in the justification and set confidence to "low".
Signals are short evidence tags ("2x founder", "ex-Stripe infra", "shipped v1 in 11 weeks").`;

function fewShotBlock(): string {
  if (FEW_SHOT_EXAMPLES.length === 0) return "";
  const blocks = FEW_SHOT_EXAMPLES.map(
    (ex, i) => `Example ${i + 1}:\nProfile: ${ex.profile}\nScore: ${ex.score}\nJustification: ${ex.justification}`,
  );
  return `\n\nCalibration examples from this fund's history:\n${blocks.join("\n\n")}`;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40) || "founder";

/** Pull the profile slug + a display-name guess out of a LinkedIn URL. */
export function parseLinkedinUrl(url: string): { slug: string; nameGuess: string } | undefined {
  const match = url.match(/linkedin\.com\/in\/([^/?#\s]+)/i);
  const rawSlug = match?.[1];
  if (!rawSlug) return undefined;
  const slug = rawSlug.toLowerCase();
  const nameGuess = slug
    .split("-")
    .filter((part) => part && !/^\d+$/.test(part) && !/^[0-9a-f]{6,}$/.test(part))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return { slug, nameGuess };
}

/** Best-effort display name from an extracted profile's leading markdown heading. */
export function nameFromExtractedProfile(rawContent: string): string | undefined {
  const heading = rawContent.match(/^#\s+([^\n#|]{2,60})/m)?.[1]?.trim();
  return heading && /[a-zA-Z]/.test(heading) ? heading : undefined;
}

export function founderQueries(name: string, company?: string): string[] {
  const queries = [
    `"${name}" founder startup`,
    company ? `"${name}" "${company}" founder` : `"${name}" raised OR funding OR seed`,
    `"${name}" interview OR podcast OR profile`,
    `${name} linkedin`,
  ];
  return queries.slice(0, 4);
}

export interface SourceFounderInput {
  linkedinUrl?: string;
  name?: string;
  company?: string;
  fundProfile?: FundProfile;
}

export interface SourceFounderDeps {
  search: SearchClient;
  llm: LLMClient;
}

export async function sourceFounder(
  input: SourceFounderInput,
  deps: SourceFounderDeps,
): Promise<SourcedFounderView> {
  const parsed = input.linkedinUrl ? parseLinkedinUrl(input.linkedinUrl) : undefined;

  const seen = new Set<string>();
  const results: SearchResult[] = [];

  // 1. When given a LinkedIn URL, read that exact profile first (identity anchor).
  //    Best-effort: extraction failures fall through to search-only below.
  let profileName: string | undefined;
  if (input.linkedinUrl && deps.search.extract) {
    try {
      const [profile] = await deps.search.extract([input.linkedinUrl]);
      const raw = profile?.rawContent?.trim();
      if (raw) {
        profileName = nameFromExtractedProfile(raw);
        results.push({
          title: `LinkedIn profile${profileName ? ` — ${profileName}` : ""}`,
          url: input.linkedinUrl,
          content: raw.slice(0, 4000),
          score: 1,
        });
        seen.add(input.linkedinUrl);
      }
    } catch {
      // extract is optional; corroborating search still runs below.
    }
  }

  const name = input.name?.trim() || profileName || parsed?.nameGuess;
  if (!name) throw new Error("sourceFounder: provide a LinkedIn URL or a name");

  // 2. Corroborate with web search (funding, interviews, secondary profiles).
  for (const q of founderQueries(name, input.company)) {
    const found = await deps.search.search(q, { maxResults: 4 });
    for (const r of found) {
      if (!seen.has(r.url)) {
        seen.add(r.url);
        results.push(r);
      }
    }
  }
  if (results.length === 0) {
    throw new Error(`sourceFounder: web search returned nothing for "${name}"`);
  }

  const context = results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.content}`)
    .join("\n\n");

  const extraction = await deps.llm.generateStructured({
    schema: FounderSourcingSchema,
    schemaName: "FounderSourcing",
    system: FOUNDER_SCOUT_SYSTEM + fewShotBlock(),
    prompt:
      `Fund thesis: ${input.fundProfile?.thesisSummary ?? "seed-stage B2B software"}\n\n` +
      `Target person: ${name}` +
      (input.company ? ` (reportedly at ${input.company})` : "") +
      (input.linkedinUrl ? `\nLinkedIn: ${input.linkedinUrl}` : "") +
      (profileName || (input.linkedinUrl && seen.has(input.linkedinUrl))
        ? `\n\nNote: source [1] is the person's own LinkedIn profile — treat it as the authoritative identity anchor for name, role, and background.`
        : "") +
      `\n\nSources:\n${context}\n\n` +
      `Assemble this person's founder profile and score them for the fund.`,
  });

  return {
    ...extraction,
    id: `fd_${parsed?.slug ? slugify(parsed.slug) : slugify(extraction.name || name)}`,
    linkedin: input.linkedinUrl,
    sources: results.map((r) => r.url).slice(0, 6),
  };
}
