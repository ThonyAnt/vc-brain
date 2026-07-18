/**
 * End-to-end demo run. Uses the mock LLM by default (offline, instant).
 * Set VC_BRAIN_LLM=openai (and OPENAI_API_KEY) to run against OpenAI.
 *
 *   npm run demo
 */
import { createInitialState } from "./state.js";
import { runPipeline, applyFeedback } from "./orchestrator.js";
import { MockLLMClient } from "./llm/mock.js";
import { OpenAILLMClient } from "./llm/openai.js";
import type { LLMClient } from "./llm/client.js";
import { mockAgentOptions } from "./fixtures/mockAgents.js";
import * as fx from "./fixtures/sample.js";
import { InvestorFeedbackSchema } from "./schemas/feedback.js";

function makeLLM(): LLMClient {
  if (process.env.VC_BRAIN_LLM === "openai") {
    console.log("• LLM: OpenAI");
    return new OpenAILLMClient({ model: process.env.VC_BRAIN_OPENAI_MODEL });
  }
  console.log("• LLM: mock (offline). Set VC_BRAIN_LLM=openai to use OpenAI.");
  return new MockLLMClient(mockAgentOptions);
}

async function main() {
  const state = createInitialState({
    mandate: "Find the best seed-stage healthcare AI company for this fund.",
    historicalMemos: fx.historicalMemos,
    portfolioCompanies: fx.portfolioCompanies,
    rejectedDeals: fx.rejectedDeals,
    candidateUniverse: fx.candidateUniverse,
  });

  await runPipeline(state, { llm: makeLLM(), competitors: fx.competitors });

  console.log("\n=== FUND PROFILE ===");
  console.log(state.fundProfile?.thesisSummary);

  console.log("\n=== SOURCING (ranked) ===");
  for (const r of state.sourcedCandidates ?? []) {
    console.log(
      `  ${r.companyId.padEnd(16)} score=${r.totalScore.toFixed(3)} fundFit=${r.fundFitScore?.toFixed(
        2,
      )} closestWinner=${r.closestWinnerId ?? "-"}${r.eliminationReason ? `  [${r.eliminationReason}]` : ""}`,
    );
  }
  console.log(`  finalists: ${state.finalists?.map((c) => c.name).join(", ")}`);

  console.log("\n=== COMMITTEE ===");
  const c = state.committeeDecision!;
  console.log(`  recommend: ${c.recommendedCompanyId} (conf ${c.confidence}, check ${c.recommendedCheckSize})`);
  console.log(`  disagreement: ${c.centralDisagreement}`);

  console.log("\n=== MEMO ===");
  console.log(`  ${state.investmentMemo?.executiveSummary}`);
  console.log(`  recommendation: ${state.investmentMemo?.recommendation}`);

  console.log("\n=== FEEDBACK / LEARNING ===");
  const feedback = InvestorFeedbackSchema.parse({
    action: "pass",
    companyId: "co_radintel",
    rationale: "Strong tech but distribution unproven.",
    criterionId: "crit_distribution",
    learningRate: 0.2,
  });
  await applyFeedback(state, feedback, { llm: makeLLM(), competitors: fx.competitors });
  for (const ch of state.learningResult?.changedCriteria ?? []) {
    console.log(`  ${ch.criterionName}: ${ch.oldWeight.toFixed(3)} -> ${ch.newWeight.toFixed(3)}`);
  }
  console.log(`  learned: ${state.learningResult?.whatTheFundLearned}`);

  console.log(`\n• ${state.events.length} graph events emitted.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
