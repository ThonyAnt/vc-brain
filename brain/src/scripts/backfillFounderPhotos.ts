/**
 * One-off backfill: founder photoUrl for profiles that predate headshot
 * sourcing. For every named founder without a photo, runs the same guarded
 * resolution the founder scout uses: caption-verified Tavily image search
 * (an image only qualifies when its vision caption names the founder), plus
 * the LinkedIn displayphoto path when a real profile URL is stored. Never
 * guesses — founders the guard can't verify keep no photo (the UI shows
 * initials). Placeholder founders ("Co-Founder Name") are skipped. Run with:
 *   node --env-file=../.env node_modules/.bin/tsx src/scripts/backfillFounderPhotos.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { TavilySearchClient } from "../search/tavily.js";
import { parseLinkedinUrl, pickHeadshot, pickHeadshotFromImageSearch } from "../tools/sourceFounder.js";

const here = dirname(fileURLToPath(import.meta.url));
// sourced-companies.json is deliberately excluded: its founder identities are
// unverified LLM demo output (sibling records hold "Co-Founder Name"
// placeholders), and a name-only search there attaches same-named strangers —
// e.g. a fictional "Dr. Alina Reyes" matched the real French author's photo.
const FILES = [
  resolve(here, "../../data/seed.hcp.json"),
  resolve(here, "../../../app/src/lib/brain/snapshot.json"),
];

interface FounderRec {
  name?: string;
  linkedin?: string;
  photoUrl?: string;
}
interface CompanyRec {
  name?: string;
  founders?: FounderRec[];
}

const search = new TavilySearchClient();
const CONCURRENCY = 5;

/** Every array of companies in a data file, wherever the file keeps them. */
function companyLists(doc: unknown): CompanyRec[][] {
  if (Array.isArray(doc)) return [doc as CompanyRec[]];
  if (doc && typeof doc === "object") {
    return Object.values(doc).filter(
      (v): v is CompanyRec[] => Array.isArray(v) && v.some((c) => c && typeof c === "object" && "founders" in c),
    );
  }
  return [];
}

const isPlaceholder = (name: string) => /founder name|^founder$|^ceo$|^unknown/i.test(name.trim());

async function resolvePhoto(founder: FounderRec, companyName: string): Promise<string | undefined> {
  // Path 1: a stored real LinkedIn profile -> displayphoto via extract.
  const slug = founder.linkedin ? parseLinkedinUrl(founder.linkedin)?.slug : undefined;
  if (slug && slug !== "cofounder" && search.extract) {
    try {
      const [profile] = await search.extract([founder.linkedin!]);
      const hit = pickHeadshot(profile?.images);
      if (hit) return hit;
    } catch {
      // fall through to image search
    }
  }
  // Path 2: caption-verified image search.
  try {
    const images = await search.images(`"${founder.name}" "${companyName}" linkedin`);
    return pickHeadshotFromImageSearch(images, founder.name!);
  } catch {
    return undefined;
  }
}

let resolved = 0;
let skipped = 0;
let unverified = 0;

for (const file of FILES) {
  let doc: unknown;
  try {
    doc = JSON.parse(readFileSync(file, "utf8"));
  } catch {
    console.log(`skip (missing): ${file}`);
    continue;
  }
  const jobs: { founder: FounderRec; company: string }[] = [];
  for (const list of companyLists(doc)) {
    for (const company of list) {
      for (const founder of company.founders ?? []) {
        if (!founder.name || isPlaceholder(founder.name)) {
          skipped++;
          continue;
        }
        if (founder.photoUrl) continue;
        jobs.push({ founder, company: company.name ?? "" });
      }
    }
  }
  console.log(`${file}: ${jobs.length} founders to resolve`);
  let done = 0;
  for (let i = 0; i < jobs.length; i += CONCURRENCY) {
    await Promise.all(
      jobs.slice(i, i + CONCURRENCY).map(async ({ founder, company }) => {
        const photo = await resolvePhoto(founder, company);
        done++;
        if (photo) {
          founder.photoUrl = photo;
          resolved++;
          console.log(`  [${done}/${jobs.length}] ${founder.name} (${company}) -> photo`);
        } else {
          unverified++;
        }
      }),
    );
  }
  if (jobs.length > 0) writeFileSync(file, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
}

console.log(
  `\nresolved: ${resolved} · unverified (kept photoless, UI shows initials): ${unverified} · placeholder skipped: ${skipped}`,
);
