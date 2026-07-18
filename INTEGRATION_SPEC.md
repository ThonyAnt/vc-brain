# VC Brain Backend ↔ UI Integration Spec

**Audience:** UI team (Anthony). This document specifies how the brain backend (agents + logic layer, on `agents-and-logic` branch) connects to the eventual UI.

**Status:** Backend complete and tested (78 tests passing). This spec is the contract for UI integration.

---

## Overview

The brain backend produces a **complete investment analysis** as a single `VCBrainState` object, plus an ordered stream of visualization events. The UI consumes both to:

1. Display the analysis pipeline as it runs (via events)
2. Render the 3D graph of companies (via `MarketLandscape`)
3. Allow user interaction (feedback, drill-down, export)

**The design separates concerns:**
- Backend: deterministic state machine + event emission (does not render)
- UI: event subscription + visualization + interaction (does not compute)

---

## Data Contracts

### 1. The Main State Object: `VCBrainState`

The backend returns a filled `VCBrainState` after `runPipeline()` completes. This is the single source of truth for the entire analysis.

```typescript
interface VCBrainState {
  // Inputs (user-provided)
  mandate: string;
  historicalMemos: HistoricalMemo[];
  portfolioCompanies: Company[];
  rejectedDeals: Company[];
  candidateUniverse: Company[];

  // Progressively filled outputs (empty until pipeline runs)
  fundProfile?: FundProfile;
  sourcedCandidates?: RankedCandidate[];  // ranked list with scores
  finalists?: Company[];
  diligence?: Record<string, CandidateDiligence>;  // keyed by company.id
  partnerOpinions?: Record<string, PartnerOpinion[]>;  // keyed by partner.id
  committeeDecision?: CommitteeDecision;
  investmentMemo?: InvestmentMemo;
  financialScenarios?: ScenarioSet;

  // Feedback / learning
  feedback?: InvestorFeedback;
  learningResult?: LearningResult;
  updatedFundProfile?: FundProfile;

  // Visualization events (ordered, append-only)
  events: WorkflowEvent[];
}
```

### 2. Company (the core entity)

All companies (portfolio, rejected, candidates, discovered) share this schema:

```typescript
interface Company {
  id: string;  // e.g. "co_tempus_ai" (generated from name if not provided)
  name: string;
  description: string;
  
  attributes: {
    industryPath: string[];  // ["Healthcare", "Oncology", "Diagnostics"]
    businessModel: string;   // "B2B SaaS", "Marketplace", etc.
    goToMarket: string;      // "Direct to enterprises", "Self-serve", etc.
    problemStatement: string;
    customerSegment: string;
    disruptionVector?: string;
    regulatoryProfile?: string;
  };

  // Metadata
  founders?: string[];
  sector?: string;
  stage?: string;  // "seed", "Series A", "Series B", etc.
  geography?: string[];
  status: "active" | "sourced" | "acquired" | "failed" | "unknown";
  historicalStatus: "portfolio" | "rejected" | "external";
  sourceRefs: string[];  // URLs, sources
}
```

### 3. Ranked Candidates (output of Scout)

```typescript
interface RankedCandidate {
  companyId: string;
  totalScore: number;  // 0..1
  fundFitScore?: number;
  sourcingScore?: number;
  closestWinnerId?: string;  // portfolio company it resembles
  closestLoserId?: string;   // rejected deal it resembles
  eliminationReason?: string;  // why it was filtered out
}
```

### 4. Market Landscape (graph-ready data)

Emitted in `market_landscape_built` event, ready to render as a 3D force-directed graph:

```typescript
interface MarketLandscape {
  nodes: LandscapeNode[];  // All companies: candidates, portfolio, rejected, competitors
  edges: LandscapeEdge[];  // Weighted similarity connections
  clusters: LandscapeCluster[];  // Industry/sector groupings
}

interface LandscapeNode {
  id: string;  // company.id
  clusterId: number;
  x: number;  // Initial 3D position (force layout refines)
  y: number;
  z: number;  // Similarity to cluster seed
}

interface LandscapeEdge {
  source: string;  // company.id
  target: string;  // company.id
  weight: number;  // 0..1 similarity score
  type: "nearest" | "analogue";
}

interface LandscapeCluster {
  id: number;
  label: string;  // Industry name, e.g. "Healthcare" 
  memberIds: string[];  // company IDs in this cluster
}
```

### 5. Investment Memo (human-readable output)

```typescript
interface InvestmentMemo {
  companyId: string;
  executiveSummary: string;
  investment_thesis: string;
  market_opportunity: string;
  company_differentiation: string;
  founder_quality: string;
  team_assessment: string;
  risk_analysis: string;
  missing_diligence: string[];
  
  // Each claim can be traced back to graph nodes
  sourceNodeIds?: string[];
  
  recommendation: "invest" | "pass" | "revisit";
}
```

### 6. Workflow Events (the event stream)

```typescript
interface WorkflowEvent {
  id: string;  // "evt_1", "evt_2", etc.
  stage: "profiling" | "sourcing" | "diligence" | "partner_review" | "committee" | "memo" | "learning";
  eventType: string;  // "fund_profile_ready", "candidates_discovered", etc.
  timestamp: number;  // milliseconds
  nodeIds?: string[];  // company IDs this event touches (for highlighting)
  payload?: unknown;  // event-specific data
}
```

**Key events emitted during pipeline:**

| Stage | Event Type | nodeIds | Payload | UI Action |
|-------|-----------|---------|---------|-----------|
| profiling | `fund_profile_ready` | [] | `{criteria: 5}` | Show fund profile summary |
| sourcing | `candidates_discovered` | [co_x, co_y, ...] | `{count: 8, names: [...]}` | Pulse new company nodes |
| sourcing | `candidate_universe_loaded` | [all ids] | undefined | Display all candidates |
| sourcing | `market_landscape_built` | undefined | `MarketLandscape` | Render 3D graph |
| sourcing | `semifinalists_selected` | [id1, id2, ...] | undefined | Highlight semifinalists |
| sourcing | `finalists_selected` | [id1, id2, id3] | undefined | Highlight finalists, focus camera |
| diligence | `diligence_complete` | [company.id] | undefined | Add diligence badges to node |
| partner_review | `partner_vote` | [company.id] | `{partnerId, vote: "yes" \| "pass" \| "no"}` | Show voting UI |
| committee | `recommendation_produced` | [recommended_id] | `{confidence: 0.85, checkSize: 5000000}` | Highlight recommendation, show confidence |
| memo | `memo_generated` | [recommended_id] | `{scenarios: {bull, base, bear}}` | Display memo + scenarios |
| learning | `fund_preferences_updated` | [company.id] | `{changedCriteria: [...], whatTheFundLearned: "..."}` | Animate graph update, show learning |

---

## Entry Points

### Running the Full Pipeline

```typescript
import { 
  runPipeline, 
  createInitialState, 
  TavilySearchClient,
  OpenAILLMClient,
  MockLLMClient 
} from '@vc-brain/brain';

// Create initial state
const state = createInitialState({
  mandate: "Find seed-stage healthcare AI companies",
  historicalMemos: [...],  // from file upload
  portfolioCompanies: [...],
  rejectedDeals: [...],
  candidateUniverse: [...],
});

// Run pipeline (no discovery; uses mock LLM for speed)
await runPipeline(state, {
  llm: new MockLLMClient(fixtures),
  competitors: [],
});

// Result: state is now fully populated with analysis + events

// OR: run with live LLM + web discovery
await runPipeline(state, {
  llm: new OpenAILLMClient({ model: "gpt-4o" }),
  search: new TavilySearchClient(),  // requires TAVILY_API_KEY
  discover: { limit: 15 },
  competitors: [...external_competitor_list],
});
```

### Subscribing to Events (Recommended for UI)

Instead of polling `state` after the pipeline completes, subscribe to events *as they emit*:

```typescript
// Pseudo-code for event streaming (actual implementation depends on your architecture)
async function runPipelineWithEventStream(state, opts, onEvent) {
  const unsubscribe = subscribeToEvents(state.events, (event) => {
    onEvent(event);
    // UI updates in real-time as events arrive
  });

  await runPipeline(state, opts);
  
  unsubscribe();
  return state;  // final state
}

// UI can then do:
await runPipelineWithEventStream(state, opts, (event) => {
  if (event.eventType === "candidates_discovered") {
    graph.pulseNodes(event.nodeIds);
  } else if (event.eventType === "market_landscape_built") {
    graph.render(event.payload);
  } else if (event.eventType === "finalists_selected") {
    graph.highlight(event.nodeIds);
  }
  // ... etc
});
```

**For now (hackathon MVP):** Run the full pipeline, then consume `state.events` in order.

---

## Interactive 3D Graph API

The live server exposes an axis-driven graph in addition to the pipeline's
similarity landscape. Coordinates are normalized to `[-1, 1]`; raw values are
also returned so the UI can render truthful tooltips. Missing measurements are
listed in `missingAxes` and placed at the midpoint instead of being treated as
zero.

### List available axes

```http
GET /api/graph/axes
```

The response includes reported axes (ARR, growth, margin, NRR, customers,
valuation), derived axes (AI adoption, disruption, recurring revenue,
regulatory moat, feasibility, proprietary data, competition), and any
fund-specific keys found in `Company.graphMetrics`.

### Build/rebuild the graph

```http
POST /api/graph/layout
Content-Type: application/json

{
  "axes": {
    "x": "revenue",
    "y": "ai_adoption",
    "z": "recurring_revenue"
  },
  "focalCompanyId": "co_scribeai"
}
```

`focalCompanyId` is optional. When provided, analogue edges are limited to the
selected node. Each node includes `visualRole` and a backend-provided default
color: prior success blue, prior failure neon red, active portfolio light blue,
passed orange, candidate lime, and external gray. The UI may override colors,
but should use `visualRole` as the semantic source of truth.

Edges have one of these types:

- `nearest_success`
- `nearest_failure`
- `nearest_external`

Every edge carries similarity, shared attributes, and key differences.

### Inspect a connection

```http
POST /api/graph/compare
Content-Type: application/json

{
  "sourceId": "co_scribeai",
  "targetId": "co_medflow",
  "axes": {
    "x": "revenue",
    "y": "ai_adoption",
    "z": "recurring_revenue"
  }
}
```

The response is ready for a side-by-side panel: overall and per-dimension
similarity, shared attributes, differences, raw values/deltas on the selected
axes, explicit categorical contrasts (business model, GTM, operating model,
technical approach, regulation, and customer), and an outcome contrast when one company succeeded and the other failed.
Outcome contrasts are explicitly framed as candidate explanatory factors, not
causal conclusions.

### Adding a custom fund axis

Store a normalized `0..1` value on each relevant company:

```json
{
  "graphMetrics": {
    "proprietary_data_moat": 0.9,
    "founder_market_fit": 0.75
  }
}
```

Those keys automatically appear in `GET /api/graph/axes` and can be selected as
X, Y, or Z. The three selected axes must be distinct.

---

## Streamed Orchestrator Chat API

The existing `POST /api/chat` endpoint remains available and now uses the main
investment orchestrator. For the animated UI, use:

```http
POST /api/chat/stream
Accept: text/event-stream
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Compare ScribeAI with MedFlow" }
  ],
  "context": {
    "route": "/brain",
    "companyId": "co_scribeai",
    "comparisonCompanyId": "co_medflow",
    "axes": {
      "x": "revenue",
      "y": "ai_adoption",
      "z": "recurring_revenue"
    }
  }
}
```

This is a POST SSE stream. Parse frames separated by a blank line. Event names
and payload `type` values are identical:

1. `run_started` — run ID, orchestrator name, and planned specialist IDs
2. `agent_started` — specialist ID and human label
3. `agent_completed` — specialist ID and a short result preview
4. `text_delta` — append `delta` to the visible assistant message
5. `run_completed` — authoritative final `{ role, content }` message
6. `error` — terminal error payload

Current specialist routes are company analysis, historical analogues,
diligence, fund strategy, and portfolio memory. The main orchestrator selects
only the relevant specialists and synthesizes their evidence into the streamed
answer.

### Applying Feedback (Learning Loop)

```typescript
import { applyFeedback } from '@vc-brain/brain';

// Investor rejects the recommendation with rationale
const feedback = {
  action: "pass",  // or "interested", "invested"
  companyId: "co_tempus_ai",
  rationale: "Strong tech but distribution unproven at scale.",
  learningRate: 0.2,
};

await applyFeedback(state, feedback, {
  llm: new OpenAILLMClient(),
  competitors: [],
});

// Result: state.updatedFundProfile, state.learningResult populated
// New event: "fund_preferences_updated" emitted
// Graph should rerank and re-render
```

---

## Recommended UI Flow

### 1. **Initialization Phase**

```
User uploads fund history (memos, candidates) 
  → Backend ingests + creates SeedBundle
  → UI shows fund profile (criteria, thesis, stage focus)
```

### 2. **Pipeline Execution Phase**

```
User clicks "Analyze" or "Generate Brain"
  → UI calls runPipeline(state, opts)
  → Backend emits events in sequence:
    1. fund_profile_ready → show criteria sidebar
    2. candidate_universe_loaded → show all candidates in list
    3. market_landscape_built → render 3D graph (all nodes + edges)
    4. semifinalists_selected → pulse top candidates
    5. finalists_selected → focus camera, highlight finalists
    6. diligence_complete (×3) → add diligence badges to nodes
    7. partner_vote (×N) → show voting breakdown
    8. recommendation_produced → highlight winner, show confidence
    9. memo_generated → display full memo + scenarios
  → UI reacts to each event in real-time (animations, highlights, etc.)
```

### 3. **Exploration Phase**

```
User can:
  • Hover company node → show popup (name, stage, fit score)
  • Click company node → drill into diligence, financials, analogues
  • Click memo claim → highlight supporting graph nodes
  • Inspect finalists in table view (rank, scores, reasoning)
```

### 4. **Feedback Phase**

```
User approves or rejects recommendation
  → UI calls applyFeedback(state, feedback, opts)
  → Backend emits:
    - fund_preferences_updated event with changed criteria
  → UI re-renders graph (colors/positions update), shows learning summary
```

---

## Key Implementation Notes

### Event-Driven Architecture

The backend does **not** render anything. It emits structured events; the UI decides what to visualize.

- **Event consumption:** Pull events from `state.events[]` in order, or subscribe to a real-time stream if you add WebSocket/SSE.
- **Idempotency:** Events are append-only. Replay events at any time to rebuild the UI state.
- **Determinism:** All pipeline runs are deterministic (no randomness). Test with snapshots.

### Graph Rendering (3D Force-Directed)

The `MarketLandscape` provides:
- **Initial positions** (x, y, z from deterministic clustering)
- **Edges with weights** (force layout can use weight for spring tension)
- **Clusters** (for coloring / grouping)

**Recommended libraries:**
- Three.js + D3-force (or Babylon.js)
- vis.js (higher-level, but less customizable)
- or custom WebGL if performance critical

**Important:** The backend computes similarity (10 dimensions: stage, sector, founders, model, GTM, etc.). Edges encode this; the force layout refines positions visually but the semantic meaning is already there.

### Similarity & Fund Fit (Not Your Problem)

The backend exports deterministic functions for reference:
- `computeCompanySimilarity(company1, company2)` → dimension-by-dimension breakdown
- `computeFundFit(company, fundProfile)` → fit score 0..1

The UI does **not** need to recompute these. They're available for inspection/debugging.

### LLM & Search Clients

The backend provides seams:
- `LLMClient` → swap `MockLLMClient` (offline) with `OpenAILLMClient` (live)
- `SearchClient` → swap `MockSearchClient` (fixtures) with `TavilySearchClient` (live web)

The UI controls which to use via environment variables or UI toggles:
```bash
VC_BRAIN_LLM=openai         # Use OpenAI (requires OPENAI_API_KEY)
VC_BRAIN_DISCOVER=1         # Enable web discovery (requires TAVILY_API_KEY)
```

### State Persistence

The backend provides:
- `saveBundle()` / `loadBundle()` — persist SeedBundle (candidates + history) to JSON
- `saveSnapshot()` / `loadSnapshot()` — persist entire `VCBrainState` (golden pipeline output)

The UI can use these for:
- Save analysis as a file (export memo as PDF, export financials as Excel, etc.)
- Load previous analyses (replay events, continue from checkpoint)
- Undo/redo (snapshots at each major stage)

---

## Development Workflow

### Backend-First Testing

1. Run backend tests to verify all agents + orchestrator:
   ```bash
   cd vc-brain/brain
   npm test
   ```

2. Run demo (offline, mock LLM, mock discovery):
   ```bash
   npm run demo
   ```
   Outputs state to console. UI can consume this JSON.

3. Run demo with live OpenAI:
   ```bash
   VC_BRAIN_LLM=openai npm run demo:openai
   ```

4. Run demo with live Tavily:
   ```bash
   VC_BRAIN_LLM=openai VC_BRAIN_DISCOVER=1 npm run demo:discover
   ```

### UI Integration Checklist

- [ ] Import `@vc-brain/brain` types and functions
- [ ] Implement file upload for memos → call `ingestMemoTexts()`
- [ ] Implement file upload for candidates → call `importCompanies()`
- [ ] Wire "Analyze" button → call `runPipeline()`
- [ ] Subscribe to `state.events[]` and render each event type
- [ ] Render `MarketLandscape` as 3D graph (Three.js or similar)
- [ ] Implement company detail view (drill-down into diligence)
- [ ] Implement memo view with sourceNodeIds linking to graph
- [ ] Implement feedback form → call `applyFeedback()`
- [ ] Test with mock LLM (fast, offline)
- [ ] Test with live OpenAI (requires keys)
- [ ] Test with live Tavily discovery (requires keys)

---

## API Reference (What the UI Imports)

```typescript
// Main orchestrator
export { runPipeline, applyFeedback };

// State & events
export type { VCBrainState, WorkflowEvent, WorkflowStage };
export { createInitialState };

// Schemas (types for all entities)
export type { 
  Company, 
  FundProfile, 
  HistoricalMemo,
  RankedCandidate,
  CandidateDiligence,
  InvestmentMemo,
  ScenarioSet,
  InvestorFeedback,
  LearningResult,
  // ... many more
};

// Tools (for reference/debugging)
export { buildMarketLandscape, computeCompanySimilarity, computeFundFit };

// Ingestion (for file upload flows)
export { ingestMemoTexts, importCompanies, loadBundle, saveBundle };

// LLM & Search clients
export { MockLLMClient, OpenAILLMClient, TavilySearchClient, MockSearchClient };
```

---

## Questions for UI Team

Before starting, align on:

1. **Real-time event streaming?** (WebSocket/SSE) or consume events after pipeline completes?
2. **Graph library choice?** (Three.js, Babylon.js, vis.js, custom WebGL?)
3. **Export formats?** (PDF memo, Excel financials, PNG graph snapshot?)
4. **Concurrent pipelines?** (multiple analyses in tabs?) or single-analysis focus?
5. **Memo editing?** (read-only or allow investor to edit AI-generated memo before output?)

---

## Example: Minimal UI Integration

```typescript
import React, { useState, useEffect } from 'react';
import { runPipeline, createInitialState, MockLLMClient } from '@vc-brain/brain';

export function VCBrainUI() {
  const [state, setState] = useState(null);
  const [events, setEvents] = useState([]);

  const handleAnalyze = async () => {
    const state = createInitialState({
      mandate: "Find seed-stage healthcare AI",
      portfolioCompanies: [...],
      rejectedDeals: [...],
      candidateUniverse: [...],
    });

    // Subscribe to events
    const unsubscribe = () => {};
    const originalPush = state.events.push.bind(state.events);
    state.events.push = function(...args) {
      const event = args[0];
      setEvents((prev) => [...prev, event]);
      
      // React to specific events
      if (event.eventType === 'market_landscape_built') {
        renderGraph(event.payload);
      } else if (event.eventType === 'finalists_selected') {
        highlightFinalists(event.nodeIds);
      }
      
      return originalPush(...args);
    };

    await runPipeline(state, {
      llm: new MockLLMClient(fixtures),
    });

    setState(state);
  };

  return (
    <div>
      <button onClick={handleAnalyze}>Analyze Fund</button>
      {state && (
        <>
          <Graph landscape={state.events.find(e => e.eventType === 'market_landscape_built')?.payload} />
          <Memo memo={state.investmentMemo} />
        </>
      )}
    </div>
  );
}
```

---

## Questions? Contact Ben

Backend is locked and tested. This spec is the contract. For questions on agent behavior, state shape, or event semantics, ask Ben (liuben398@gmail.com).

UI can move forward independently; backend will not change.
