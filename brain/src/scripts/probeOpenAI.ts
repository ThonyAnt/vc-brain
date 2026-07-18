/**
 * Canary: run ONE structured agent call live against OpenAI to surface any
 * strict-JSON-schema incompatibilities before running the full pipeline.
 *   node --env-file=../.env node_modules/.bin/tsx src/scripts/probeOpenAI.ts
 */
import { OpenAILLMClient } from "../llm/openai.js";
import { fundProfilerAgent } from "../agents/fundProfiler.js";
import * as fx from "../fixtures/sample.js";

async function main() {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");
  const llm = new OpenAILLMClient({ model: process.env.VC_BRAIN_OPENAI_MODEL });
  console.log("Calling Fund Profiler live (most complex schema: records + nesting)...");
  const profile = await fundProfilerAgent(
    {
      mandate: "Find the best seed-stage healthcare AI company for this fund.",
      historicalMemos: fx.historicalMemos,
      portfolioCompanies: fx.portfolioCompanies,
      rejectedDeals: fx.rejectedDeals,
    },
    { llm },
  );
  console.log("OK. thesis:", profile.thesisSummary);
  console.log("criteria:", profile.criteria.map((c) => `${c.name}=${c.weight.toFixed(2)}`).join(", "));
  console.log("attributePreferences keys:", Object.keys(profile.attributePreferences).length);
}

main().catch((e) => {
  console.error("PROBE FAILED:", e?.message ?? e);
  process.exit(1);
});
