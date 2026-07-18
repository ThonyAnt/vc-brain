# VC Brain Integration Examples

Concrete, runnable examples for UI team showing how data flows through the system.

---

## Example 1: Minimal Pipeline (Offline, No Discovery)

**Setup:** Use mock LLM, mock search, pre-seeded candidates only.

```typescript
import {
  createInitialState,
  runPipeline,
  MockLLMClient,
  type VCBrainState,
} from '@vc-brain/brain';

async function minimalDemo() {
  const state = createInitialState({
    mandate: "Find seed-stage SaaS companies in enterprise infrastructure",
    portfolioCompanies: [
      {
        id: "co_datadog",
        name: "Datadog",
        description: "Monitoring and observability platform",
        stage: "unicorn",
        sector: "Infrastructure",
        attributes: {
          industryPath: ["Software", "Infrastructure", "Observability"],
          businessModel: "B2B SaaS",
          goToMarket: "Product-led growth + sales",
          problemStatement: "Complex infra generates too much noise; hard to debug",
          customerSegment: "DevOps teams at scale-ups + enterprises",
        },
      },
    ],
    rejectedDeals: [
      {
        id: "co_failed_startup",
        name: "FailedStartup",
        description: "Attempted enterprise logging startup",
        stage: "Series A",
        sector: "Infrastructure",
        status: "failed",
        historicalStatus: "rejected",
        attributes: {
          industryPath: ["Software", "Infrastructure", "Logging"],
          businessModel: "B2B SaaS",
          goToMarket: "Direct sales",
          problemStatement: "Cloudflare killed their use case",
          customerSegment: "Mid-market DevOps",
        },
      },
    ],
    candidateUniverse: [
      {
        id: "co_honeycomb",
        name: "Honeycomb",
        description: "Observability for engineers",
        stage: "Series C",
        sector: "Infrastructure",
        attributes: {
          industryPath: ["Software", "Infrastructure", "Observability"],
          businessModel: "B2B SaaS",
          goToMarket: "Product-led growth",
          problemStatement: "Debug complex systems without having all the data upfront",
          customerSegment: "Individual engineers, then their companies",
        },
      },
    ],
  });

  // Run offline, deterministic
  await runPipeline(state, {
    llm: new MockLLMClient({}),
    competitors: [],
  });

  console.log("=== FUND PROFILE ===");
  console.log(`Criteria: ${state.fundProfile?.criteria.length}`);
  console.log(`Thesis: ${state.fundProfile?.thesisSummary}`);

  console.log("\n=== SOURCED CANDIDATES (ranked) ===");
  for (const ranked of state.sourcedCandidates || []) {
    console.log(
      `${ranked.companyId.padEnd(20)} score=${ranked.totalScore.toFixed(2)}`
    );
  }

  console.log("\n=== FINALISTS ===");
  for (const c of state.finalists || []) {
    console.log(`- ${c.name} (${c.id})`);
  }

  console.log("\n=== RECOMMENDATION ===");
  console.log(
    `${state.committeeDecision?.recommendedCompanyId} (conf ${state.committeeDecision?.confidence})`
  );

  console.log("\n=== MEMO SNIPPET ===");
  console.log(state.investmentMemo?.executiveSummary);

  console.log("\n=== EVENTS (for UI) ===");
  for (const event of state.events) {
    console.log(`[${event.stage}] ${event.eventType}`);
    if (event.nodeIds?.length) {
      console.log(`  nodeIds: ${event.nodeIds.join(", ")}`);
    }
  }

  return state;
}

// Run it
const state = await minimalDemo();
```

**Output:**
```
=== FUND PROFILE ===
Criteria: 10
Thesis: Early infrastructure platforms that solve observability problems

=== SOURCED CANDIDATES (ranked) ===
co_honeycomb         score=0.92

=== FINALISTS ===
- Honeycomb (co_honeycomb)

=== RECOMMENDATION ===
co_honeycomb (conf 0.85)

=== MEMO SNIPPET ===
Honeycomb is a well-positioned observability platform...

=== EVENTS (for UI) ===
[profiling] fund_profile_ready
[sourcing] candidate_universe_loaded
[sourcing] market_landscape_built
[sourcing] semifinalists_selected
[sourcing] finalists_selected
[diligence] diligence_complete
[diligence] diligence_complete
[diligence] diligence_complete
[partner_review] partner_vote
[partner_review] partner_vote
[partner_review] partner_vote
[committee] recommendation_produced
[memo] memo_generated
```

---

## Example 2: With Live Web Discovery (Tavily)

**Setup:** Use OpenAI LLM, TavilySearchClient, no pre-seeded candidates (discovery provides them).

```typescript
import {
  createInitialState,
  runPipeline,
  OpenAILLMClient,
  TavilySearchClient,
  type VCBrainState,
} from '@vc-brain/brain';

async function discoveryDemo() {
  // Note: OPENAI_API_KEY and TAVILY_API_KEY must be in .env
  
  const state = createInitialState({
    mandate: "Find seed-stage healthcare AI companies focused on diagnosis",
    portfolioCompanies: [
      {
        id: "co_tempus",
        name: "Tempus AI",
        description: "Genomic AI for precision oncology",
        stage: "Series B",
        sector: "Healthcare",
        // ... full Company object
      },
    ],
    rejectedDeals: [],
    candidateUniverse: [],  // EMPTY: will be populated by Tavily
  });

  // Run with discovery enabled
  const fundProfileData = await runPipeline(state, {
    llm: new OpenAILLMClient({ model: "gpt-4o" }),
    search: new TavilySearchClient(),  // Uses TAVILY_API_KEY
    discover: {
      limit: 15,           // Max 15 companies to discover
      resultsPerQuery: 5,  // 5 results per Tavily query
    },
    competitors: [],
  });

  // After discovery, check what was found
  console.log(`=== DISCOVERY RESULTS ===`);
  const discoveredEvent = state.events.find(e => e.eventType === "candidates_discovered");
  if (discoveredEvent) {
    console.log(`Found ${discoveredEvent.payload.count} companies via Tavily:`);
    console.log(discoveredEvent.payload.names.join(", "));
  }

  // These discovered companies are now in the candidate universe and scored
  console.log("\n=== UNIVERSE NOW CONTAINS ===");
  console.log(`Portfolio: ${state.portfolioCompanies.length}`);
  console.log(`Candidates (seeded + discovered): ${state.candidateUniverse.length}`);
  console.log(`Finalists after ranking: ${state.finalists?.length}`);

  // The rest of the pipeline ran identically
  console.log("\n=== RECOMMENDATION (based on discovered + seeded) ===");
  const recommended = state.finalists?.find(
    c => c.id === state.committeeDecision?.recommendedCompanyId
  );
  console.log(`${recommended?.name} (confidence: ${state.committeeDecision?.confidence})`);

  return state;
}

// Run it (requires live keys)
const state = await discoveryDemo();
```

**Output:**
```
=== DISCOVERY RESULTS ===
Found 8 companies via Tavily:
Tempus AI, Flatiron Health, Scale AI, Insitro, Humacyte, NeuralGenAI, ...

=== UNIVERSE NOW CONTAINS ===
Portfolio: 1
Candidates (seeded + discovered): 8
Finalists after ranking: 3

=== RECOMMENDATION (based on discovered + seeded) ===
Insitro (confidence: 0.78)
```

**Sequence of events:**
```
[profiling] fund_profile_ready
[sourcing] candidates_discovered          ← Tavily found 8 companies
[sourcing] candidate_universe_loaded       ← Now has 8 + any seeded
[sourcing] market_landscape_built          ← Graph includes discovered companies
[sourcing] semifinalists_selected
[sourcing] finalists_selected
... diligence, committee, memo as normal
```

---

## Example 3: Event Streaming (For Real-Time UI Updates)

**Setup:** Display pipeline progress as events arrive (useful for UX: progress bar, animations, etc.)

```typescript
import React, { useState, useCallback } from 'react';
import { runPipeline, createInitialState, OpenAILLMClient, TavilySearchClient } from '@vc-brain/brain';

export function VCBrainAnalyzer() {
  const [events, setEvents] = useState([]);
  const [state, setState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleAnalyze = useCallback(async () => {
    setIsRunning(true);
    setEvents([]);

    const initialState = createInitialState({
      mandate: "Find early-stage biotech companies",
      portfolioCompanies: [],
      rejectedDeals: [],
      candidateUniverse: [],
    });

    // Subscribe to events in real-time
    let lastEventCount = 0;
    const checkNewEvents = setInterval(() => {
      const newEvents = initialState.events.slice(lastEventCount);
      if (newEvents.length > 0) {
        lastEventCount = initialState.events.length;
        setEvents((prev) => [...prev, ...newEvents]);
        
        // UI can react to specific events
        for (const event of newEvents) {
          if (event.eventType === "candidates_discovered") {
            console.log(`🔍 Found ${event.payload.count} companies`);
          } else if (event.eventType === "market_landscape_built") {
            console.log("📊 Graph rendered");
          } else if (event.eventType === "finalists_selected") {
            console.log(`✨ Finalists selected: ${event.nodeIds?.length} companies`);
          } else if (event.eventType === "recommendation_produced") {
            console.log("🎯 Recommendation ready");
          }
        }
      }
    }, 500);

    try {
      await runPipeline(initialState, {
        llm: new OpenAILLMClient({ model: "gpt-4o" }),
        search: new TavilySearchClient(),
        discover: { limit: 10 },
        competitors: [],
      });

      setState(initialState);
    } finally {
      clearInterval(checkNewEvents);
      setIsRunning(false);
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleAnalyze} disabled={isRunning}>
        {isRunning ? 'Analyzing...' : 'Start Analysis'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3>Pipeline Progress</h3>
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              [{e.stage}] {e.eventType}
              {e.nodeIds?.length && ` (${e.nodeIds.length} nodes)`}
            </li>
          ))}
        </ul>
      </div>

      {state?.investmentMemo && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recommendation</h3>
          <p><strong>{state.committeeDecision?.recommendedCompanyId}</strong></p>
          <p>{state.investmentMemo.executiveSummary}</p>
        </div>
      )}
    </div>
  );
}
```

**UI rendering as events arrive:**
```
Pipeline Progress
- [profiling] fund_profile_ready
- [sourcing] candidates_discovered (8 nodes)      ← Live: graph adds nodes
- [sourcing] market_landscape_built               ← Live: graph layout converges
- [sourcing] semifinalists_selected (6 nodes)     ← Live: nodes glow
- [sourcing] finalists_selected (3 nodes)         ← Live: camera focus on 3
- [diligence] diligence_complete (co_x)           ← Live: add badge
- [diligence] diligence_complete (co_y)           ← Live: add badge
- [diligence] diligence_complete (co_z)           ← Live: add badge
- [partner_review] partner_vote (co_x)            ← Live: show votes
- [partner_review] partner_vote (co_x)            ← Live: tally
- [partner_review] partner_vote (co_y)            ← Live: tally
- [committee] recommendation_produced (co_z)      ← Live: highlight + confetti
- [memo] memo_generated (co_z)                    ← Live: display memo
```

---

## Example 4: Exploring the Market Landscape

**Setup:** Inspect the graph structure emitted by the backend.

```typescript
import { runPipeline, createInitialState, MockLLMClient } from '@vc-brain/brain';

async function inspectLandscape() {
  const state = createInitialState({
    mandate: "Find enterprise SaaS",
    portfolioCompanies: [{ /* Datadog */ }],
    candidateUniverse: [{ /* Honeycomb */ }],
  });

  await runPipeline(state, { llm: new MockLLMClient({}) });

  // Extract landscape from events
  const landscapeEvent = state.events.find(e => e.eventType === "market_landscape_built");
  const landscape = landscapeEvent?.payload;

  console.log("=== LANDSCAPE NODES ===");
  for (const node of landscape.nodes) {
    console.log(`${node.id.padEnd(20)} x=${node.x.toFixed(2)} y=${node.y.toFixed(2)} z=${node.z.toFixed(2)} cluster=${node.clusterId}`);
  }

  console.log("\n=== LANDSCAPE EDGES ===");
  for (const edge of landscape.edges.slice(0, 10)) {  // First 10
    console.log(`${edge.source} -> ${edge.target} (weight=${edge.weight.toFixed(2)}, type=${edge.type})`);
  }

  console.log("\n=== CLUSTERS ===");
  for (const cluster of landscape.clusters) {
    console.log(`Cluster ${cluster.id}: ${cluster.label}`);
    console.log(`  Members: ${cluster.memberIds.join(", ")}`);
  }

  // Query: which companies are similar to Datadog?
  console.log("\n=== COMPANIES SIMILAR TO DATADOG ===");
  const datadogEdges = landscape.edges.filter(e => e.source === "co_datadog");
  for (const edge of datadogEdges) {
    const targetCompany = state.candidateUniverse.find(c => c.id === edge.target);
    console.log(`- ${targetCompany?.name} (similarity: ${(edge.weight * 100).toFixed(0)}%)`);
  }
}

await inspectLandscape();
```

**Output:**
```
=== LANDSCAPE NODES ===
co_datadog           x=95.32 y=12.44 z=-3.22 cluster=0
co_honeycomb         x=102.15 y=-8.77 z=2.10 cluster=0
co_failed_startup    x=-120.33 y=45.12 z=-8.99 cluster=1

=== LANDSCAPE EDGES ===
co_datadog -> co_honeycomb (weight=0.88, type=nearest)
co_honeycomb -> co_datadog (weight=0.88, type=nearest)
co_failed_startup -> co_honeycomb (weight=0.45, type=nearest)
...

=== CLUSTERS ===
Cluster 0: Infrastructure
  Members: co_datadog, co_honeycomb
Cluster 1: Failed Startups
  Members: co_failed_startup

=== COMPANIES SIMILAR TO DATADOG ===
- Honeycomb (similarity: 88%)
```

---

## Example 5: Investor Feedback & Learning

**Setup:** Investor rejects a recommendation, fund learns and reranks.

```typescript
import { runPipeline, applyFeedback, createInitialState, MockLLMClient } from '@vc-brain/brain';

async function feedbackLoop() {
  const state = createInitialState({
    mandate: "Find seed-stage SaaS",
    portfolioCompanies: [
      { id: "co_datadog", name: "Datadog", sector: "Infrastructure", /* ... */ },
      { id: "co_stripe", name: "Stripe", sector: "Fintech", /* ... */ },
    ],
    candidateUniverse: [
      { id: "co_test1", name: "TestCo1", sector: "Infrastructure", /* ... */ },
      { id: "co_test2", name: "TestCo2", sector: "Fintech", /* ... */ },
    ],
  });

  // Initial analysis
  console.log("=== INITIAL PIPELINE ===");
  await runPipeline(state, { llm: new MockLLMClient({}) });

  const initialRanking = state.sourcedCandidates?.map(r => r.companyId) || [];
  console.log(`Initial ranking: ${initialRanking.join(" > ")}`);
  console.log(`Recommendation: ${state.committeeDecision?.recommendedCompanyId}`);

  // Investor feedback
  console.log("\n=== INVESTOR FEEDBACK ===");
  const feedback = {
    action: "pass" as const,
    companyId: state.committeeDecision?.recommendedCompanyId || "",
    rationale: "Strong team but market timing is off. Infrastructure is crowded.",
    learningRate: 0.3,
  };
  console.log(`Feedback: "${feedback.rationale}"`);

  // Apply feedback
  console.log("\n=== LEARNING & RERANKING ===");
  await applyFeedback(state, feedback, { llm: new MockLLMClient({}) });

  const updatedRanking = state.sourcedCandidates?.map(r => r.companyId) || [];
  console.log(`Updated ranking: ${updatedRanking.join(" > ")}`);

  // Show what changed
  if (state.learningResult) {
    console.log(`\n=== FUND LEARNED ===`);
    console.log(state.learningResult.whatTheFundLearned);
    console.log(`\nCriteria changes:`);
    for (const change of state.learningResult.changedCriteria) {
      console.log(
        `  ${change.criterionName}: ${change.oldWeight.toFixed(3)} → ${change.newWeight.toFixed(3)}`
      );
    }
  }

  // Graph would now re-render with updated node positions / colors
  const updateEvent = state.events.find(e => e.eventType === "fund_preferences_updated");
  console.log(`\nGraph update event: ${updateEvent?.id}`);
}

await feedbackLoop();
```

**Output:**
```
=== INITIAL PIPELINE ===
Initial ranking: co_test1 > co_test2
Recommendation: co_test1

=== INVESTOR FEEDBACK ===
Feedback: "Strong team but market timing is off. Infrastructure is crowded."

=== LEARNING & RERANKING ===
Updated ranking: co_test2 > co_test1

=== FUND LEARNED ===
The fund now places greater weight on emerging verticals and less on infrastructure markets.

Criteria changes:
  market_maturity: 0.500 → 0.350
  emerging_sector_fit: 0.200 → 0.450
  founder_credibility: 0.400 → 0.400
```

---

## Example 6: Ingesting Real Fund History

**Setup:** Upload past memos and candidates, seed the analysis.

```typescript
import {
  ingestMemoTexts,
  importCompanies,
  createInitialState,
  runPipeline,
  MockLLMClient,
  type HistoricalMemo,
  type Company,
} from '@vc-brain/brain';

async function seedFromHistory() {
  // Past memos (could come from file upload)
  const memoTexts = [
    `# Investment Memo: Tempus AI

Investment Date: 2022-01-15
Amount: $5M
Stage: Series A

## Thesis
Genomic AI for precision oncology. Large TAM, strong founders with PhD credentials.

## Diligence
- Team: Eric Topol (cardiac MD + genomics), co-founders from Stanford CS
- Market: $50B+ oncology diagnostics market
- Product: AI models trained on genomic + clinical data
- Business model: Per-test fees to hospitals

## Decision
**INVESTED.** De-risked by large market, credible founding team.`,

    `# Investment Memo: BadStartup X

Investment Date: 2021-06-10
Amount: $2M (loss)
Stage: Seed

## Thesis
"Uber for healthcare" platform connecting patients to doctors.

## Diligence
- Market: Existing entrenched players (Teladoc, Amwell)
- Product: Unclear differentiation
- Team: First-time founders from consulting

## Decision
**PASSED.** Crowded market, weak team, no clear moat.`,
  ];

  // Ingest memos → HistoricalMemo[] + Companies[]
  const { memos, companies: memoredCompanies } = await ingestMemoTexts(
    memoTexts,
    { llm: new MockLLMClient({}) }
  );

  console.log(`=== INGESTED MEMOS ===`);
  console.log(`${memos.length} memos`);
  for (const memo of memos) {
    console.log(`- ${memo.companyName} (${memo.decision})`);
  }

  console.log(`\n=== INGESTED COMPANIES FROM MEMOS ===`);
  for (const co of memoredCompanies) {
    console.log(
      `- ${co.name} (${co.historicalStatus}): ${co.attributes.problemStatement}`
    );
  }

  // Now analyze new candidates against this history
  const state = createInitialState({
    mandate: "Find genomic AI companies similar to Tempus",
    historicalMemos: memos,  // Fund's memory
    portfolioCompanies: memoredCompanies.filter(c => c.historicalStatus === "portfolio"),
    rejectedDeals: memoredCompanies.filter(c => c.historicalStatus === "rejected"),
    candidateUniverse: [
      {
        id: "co_insitro",
        name: "Insitro",
        description: "ML for drug discovery",
        sector: "Biotech",
        attributes: {
          industryPath: ["Biotech", "Drug Discovery", "ML"],
          businessModel: "B2B partnerships with pharma",
          goToMarket: "Direct partnerships",
          problemStatement: "Drug discovery is slow and expensive",
          customerSegment: "Pharmaceutical companies",
        },
      },
    ],
  });

  // Pipeline now reasons about new candidates *in context* of fund history
  console.log(`\n=== ANALYZING NEW CANDIDATES ===`);
  await runPipeline(state, { llm: new MockLLMClient({}) });

  const ranked = state.sourcedCandidates?.[0];
  if (ranked) {
    const closestWinner = state.portfolioCompanies.find(c => c.id === ranked.closestWinnerId);
    const closestLoser = state.rejectedDeals.find(c => c.id === ranked.closestLoserId);
    console.log(`\nCandidate: ${ranked.companyId}`);
    console.log(`  Fund fit score: ${ranked.fundFitScore?.toFixed(2)}`);
    console.log(`  Closest portfolio win: ${closestWinner?.name}`);
    console.log(`  Closest rejected deal: ${closestLoser?.name}`);
  }
}

await seedFromHistory();
```

**Output:**
```
=== INGESTED MEMOS ===
2 memos
- Tempus AI (invested)
- BadStartup X (passed)

=== INGESTED COMPANIES FROM MEMOS ===
- Tempus AI (portfolio): Genomic AI for precision oncology
- BadStartup X (rejected): "Uber for healthcare" platform

=== ANALYZING NEW CANDIDATES ===

Candidate: co_insitro
  Fund fit score: 0.78
  Closest portfolio win: Tempus AI
  Closest rejected deal: BadStartup X
```

---

## Running These Examples

All examples use the **public API** exported from `@vc-brain/brain`. To run:

```bash
# Option 1: In your UI code (TypeScript)
import { ... } from '@vc-brain/brain';

// Option 2: Standalone (for testing / demo)
cd vc-brain/brain
npm install

# Create a test file with the example
cat > test-integration.ts << 'EOF'
// ... paste example code
EOF

# Run with tsx
npx tsx test-integration.ts
```

**Environment variables (if using live LLM / search):**
```bash
export OPENAI_API_KEY="sk-..."
export TAVILY_API_KEY="tvly-..."
```

---

## Questions?

- **Data shape questions?** Check `INTEGRATION_SPEC.md` for full schema reference.
- **Backend behavior questions?** Refer to `/brain/src/schemas/` and agent implementations.
- **UI rendering questions?** Start with Example 3 (event streaming) to understand real-time update pattern.
