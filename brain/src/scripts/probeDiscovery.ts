/**
 * Live discovery canary: Tavily search + OpenAI extraction -> normalized companies.
 *   node --env-file=../.env node_modules/.bin/tsx src/scripts/probeDiscovery.ts
 */
import { TavilySearchClient } from "../search/tavily.js";
import { OpenAILLMClient } from "../llm/openai.js";
import { discoverCompanies } from "../tools/discover.js";
import { fundProfile } from "../fixtures/sample.js";

async function main() {
  if (!process.env.TAVILY_API_KEY) throw new Error("TAVILY_API_KEY not set");
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

  const search = new TavilySearchClient();
  const llm = new OpenAILLMClient({ model: process.env.VC_BRAIN_OPENAI_MODEL });

  console.log("Discovering real companies from the web (Tavily + OpenAI)...\n");
  const companies = await discoverCompanies(
    {
      mandate: "Find seed-stage healthcare AI companies for this fund.",
      fundProfile,
      resultsPerQuery: 5,
      limit: 10,
    },
    { search, llm },
  );

  console.log(`Found ${companies.length} companies:\n`);
  for (const c of companies) {
    console.log(`• ${c.name} (${c.id})`);
    console.log(`    ${c.description}`);
    console.log(
      `    industry=${c.attributes.industryPath.join(">")}, model=${c.attributes.businessModel}, ` +
        `gtm=${c.attributes.goToMarket}`,
    );
    if (c.sourceRefs.length) console.log(`    source: ${c.sourceRefs[0]}`);
    console.log();
  }
}

main().catch((e) => {
  console.error("DISCOVERY PROBE FAILED:", e?.message ?? e);
  process.exit(1);
});
