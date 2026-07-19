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
 * Calibrated exemplars from the fund's founder-assessment history. The curve:
 * generational founders (Jensen Huang) define the 95 ceiling; serial exited
 * founders actively building land ~85-90; elite operators in stealth in the
 * high 70s with confidence capped by unknowns; strong pre-founders without an
 * active venture in the mid-to-high 60s; very early founders with undescribed
 * companies down at ~30 with low confidence.
 */
export const FEW_SHOT_EXAMPLES: {
  profile: string;
  score: number;
  confidence: "low" | "medium" | "high";
  justification: string;
}[] = [
  {
    profile:
      "Jensen Huang — Founder/CEO of NVIDIA since 1993 (30+ yrs). Built the company from a startup into the defining platform of the AI compute era; invented the GPU category, drove CUDA into the industry standard, and navigated multiple near-death pivots to a multi-trillion-dollar company. Oregon State EE, Stanford MSEE.",
    score: 95,
    confidence: "high",
    justification:
      "The calibration ceiling: a generational founder with three decades of category creation, repeated reinvention, and platform-scale execution. Scores of 95+ are reserved for this tier — no single exit or strong pedigree reaches it.",
  },
  {
    profile:
      "Brian O'Kelley — Co-founder/CEO of Scope3 (4 yrs, decarbonizing media/advertising). Previously co-founder/CEO of AppNexus for 11 yrs through its $1.6B sale to AT&T; CTO of Right Media through its Yahoo acquisition; co-founded Waybridge; invented core programmatic ad-tech (ad exchange, DSP, SSP, header bidding), 17 patents; Princeton CS.",
    score: 90,
    confidence: "high",
    justification:
      "The strongest realistic seed-stage profile short of the generational tier: a repeat exited CEO who operated at platform scale, deep engineering credentials, and unusual credibility selling back into his old buyer set. The Waybridge hand-off is worth probing for commitment horizon; category-defining invention plus a $1.6B exit and a live company four years in earn the top of the serial-founder band.",
  },
  {
    profile:
      "Hossein Azari — Founder/CEO of OpenFi (7.5 yrs, AI × DeFi financial services, NYC). Harvard CS PhD + Columbia Executive MBA; ex-Google Research scientist; co-founded Clarity Money (Chief Data Scientist), acquired by Goldman Sachs; six-month post-acquisition stint at Goldman before returning to founding.",
    score: 85,
    confidence: "high",
    justification:
      "Strong signal stack: elite technical credentials (Harvard PhD, Google Research), a validated exit in the fund's exact domain (Clarity Money → Goldman Sachs), and 7+ years actively building in fintech. Held below the top of the serial-founder band because the exit was as a non-CEO co-founder at undisclosed terms and OpenFi shows no visible traction markers after 7.5 years.",
  },
  {
    profile:
      "Nonso Maduka — Co-founder/CEO of a stealth company at the AI × financial-services intersection (8 months). Princeton EE, Harvard MBA with Distinction; six years Citi mortgage trading; product leadership at NerdWallet and Glassdoor; GM / Head of Product at Plaid; Head of Product at Invisible (acquired by Perplexity).",
    score: 78,
    confidence: "medium",
    justification:
      "High-conviction fintech operator with an engineering foundation, elite product credentials at Plaid, and a decade of preparation for exactly what he is now building. Scores below the serial-exit tier because the venture is stealth: capital raised, segment, and founding team are unknown — medium confidence until those resolve.",
  },
  {
    profile:
      "Rohini Pandhi — Member-in-residence at South Park Commons (exploring her next venture). Nearly eight years at Block/Square rising to Product Lead for Square Payments and the Bitcoin Wallet; Head of Expansion at Mercury; co-founded Transparent Collective (10 yrs; helped 70+ underrepresented startups raise $70M+) and the Sataza restaurant concept; First Round Angel Track; Michigan BSE + Booth MBA.",
    score: 68,
    confidence: "high",
    justification:
      "Seasoned fintech product operator with genuine founding instincts and a clear pre-founding posture — the SPC residency is a strong intent signal. Capped in the high 60s because there is no confirmed tech venture yet; the score jumps the moment she commits to what she is building.",
  },
  {
    profile:
      "Hakeem Angulu — Member of Technical Staff at Anthropic (Product Platform, ~2 yrs); previously four years at Google (SWE II → Senior); CTO of Oak Systems for three years; Harvard CS/Statistics; Goldman Sachs IBD internship.",
    score: 65,
    confidence: "high",
    justification:
      "Technically exceptional with rare frontier-AI experience and early operator instincts from the startup CTO stint, but currently an IC with no visible startup idea or intent to leave. A watch-closely pre-founder rather than an active opportunity — the score reflects potential without a catalyst, and unknowns about whether Oak Systems was venture-scale.",
  },
  {
    profile:
      "Zach Richards — Co-founder of Machina (3 months old; no public product, sector, or team information). Previously led the Frontier Data team at Mercor (built APEX-Agents benchmarks); two years as a BCG consultant deploying RAG systems and energy models; Ohio State chemical engineering.",
    score: 30,
    confidence: "low",
    justification:
      "Legitimate applied-AI and engineering background with a deliberate early leap into founding, but there is essentially nothing to underwrite: a three-month-old company with no product description, traction, funding, or co-founder information, and a short total career. Scores this low when the venture is unverifiable — clarity on what Machina builds could move it substantially.",
  },
];

const FOUNDER_SCOUT_SYSTEM = `You are a venture fund's founder scout. From noisy web-search results
about ONE person, assemble their profile (role, background, notable signals) and assign a
fund-calibrated score from 0-100 for how strongly this fund should pursue them as a founder to back.
Only use facts present in the results — never invent employers, exits, or credentials. If the results
are thin or ambiguous about identity, say so in the justification and set confidence to "low".
Signals are short evidence tags ("2x founder", "ex-Stripe infra", "shipped v1 in 11 weeks").`;

function fewShotBlock(): string {
  if (FEW_SHOT_EXAMPLES.length === 0) return "";
  const blocks = FEW_SHOT_EXAMPLES.map(
    (ex, i) =>
      `Example ${i + 1}:\nProfile: ${ex.profile}\nScore: ${ex.score}\nConfidence: ${ex.confidence}\nJustification: ${ex.justification}`,
  );
  return `\n\nCalibration examples from this fund's assessment history (match this scoring curve):\n${blocks.join("\n\n")}`;
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
