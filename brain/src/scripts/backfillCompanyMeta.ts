/**
 * One-off backfill: website + logoUrl + HQ city/coords for companies that
 * predate those fields (HCP seed, previously sourced, and the app snapshot).
 * Patches JSON in place by company id — never regenerates LLM content, so
 * memos/diligence in the snapshot are untouched. Run with:
 *   VC_BRAIN_LLM=openai node --env-file=../.env node_modules/.bin/tsx src/scripts/backfillCompanyMeta.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { createLLMClient } from "../llm/index.js";
import { logoUrlFor } from "../tools/discover.js";

const here = dirname(fileURLToPath(import.meta.url));
const FILES = [
  resolve(here, "../../data/seed.hcp.json"),
  resolve(here, "../../data/sourced-companies.json"),
  resolve(here, "../../../app/src/lib/brain/snapshot.json"),
];

const MetaSchema = z.object({
  companies: z.array(
    z.object({
      id: z.string(),
      website: z.string().optional(),
      hqCity: z.string().optional(),
      hqLat: z.number().min(-90).max(90).optional(),
      hqLng: z.number().min(-180).max(180).optional(),
    }),
  ),
});
type Meta = z.infer<typeof MetaSchema>["companies"][number];

interface CompanyLike {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  hqCity?: string;
  hqLat?: number;
  hqLng?: number;
  attributes?: { industryPath?: string[] };
}

/** Recursively collect / patch every object that looks like a company record. */
function walk(node: unknown, visit: (c: CompanyLike) => void): void {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, visit);
  } else if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (typeof o.id === "string" && typeof o.name === "string" && "attributes" in o) {
      visit(o as unknown as CompanyLike);
    }
    for (const v of Object.values(o)) walk(v, visit);
  }
}

async function main() {
  const docs = FILES.map((f) => ({ path: f, json: JSON.parse(readFileSync(f, "utf8")) as unknown }));

  /* unique companies still missing website or coords */
  const need = new Map<string, CompanyLike>();
  for (const d of docs) {
    walk(d.json, (c) => {
      if (!need.has(c.id) && (!c.website || c.hqLat == null)) need.set(c.id, c);
    });
  }
  console.log(`companies needing backfill: ${need.size}`);
  if (need.size === 0) return;

  const llm = await createLLMClient();
  const list = [...need.values()];
  const metaById = new Map<string, Meta>();

  for (let i = 0; i < list.length; i += 20) {
    const batch = list.slice(i, i + 20);
    const lines = batch
      .map(
        (c) =>
          `${c.id} | ${c.name} | ${(c.attributes?.industryPath ?? []).join(">")} | ${(c.description ?? "").slice(0, 140)}`,
      )
      .join("\n");
    const out = await llm.generateStructured({
      schema: MetaSchema,
      schemaName: "CompanyMetaBackfill",
      system:
        "You identify real startups. For each company give its official website (canonical domain) and " +
        "HQ city with approximate latitude/longitude (city-level accuracy is fine). OMIT any field you are " +
        "not reasonably confident about — never invent a website for a company you do not recognize.",
      prompt: `Companies (id | name | industry | description):\n${lines}`,
    });
    for (const m of out.companies) if (need.has(m.id)) metaById.set(m.id, m);
    console.log(`batch ${i / 20 + 1}: ${out.companies.length} resolved`);
  }

  /* apply everywhere, never overwriting existing values */
  let patched = 0;
  for (const d of docs) {
    let touched = 0;
    walk(d.json, (c) => {
      const m = metaById.get(c.id);
      if (!m) return;
      let changed = false;
      if (!c.website && m.website) {
        c.website = m.website;
        changed = true;
      }
      if (!c.logoUrl) {
        const logo = logoUrlFor(c.website);
        if (logo) {
          c.logoUrl = logo;
          changed = true;
        }
      }
      if (c.hqLat == null && m.hqLat != null && m.hqLng != null) {
        c.hqCity = c.hqCity ?? m.hqCity;
        c.hqLat = m.hqLat;
        c.hqLng = m.hqLng;
        changed = true;
      }
      if (changed) touched++;
    });
    writeFileSync(d.path, JSON.stringify(d.json, null, 2) + "\n");
    console.log(`${d.path}: patched ${touched} records`);
    patched += touched;
  }
  console.log(`done — ${metaById.size}/${need.size} companies resolved, ${patched} records patched`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
