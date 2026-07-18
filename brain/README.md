# @vc-brain/brain

The **agent + logic layer** for VC Brain: the fund-specific reasoning engine that
learns how one fund thinks, sources and evaluates candidates, simulates an
investment committee, writes a memo, and learns from feedback — emitting
graph-ready events for the 3D fund brain.

Self-contained TypeScript package. Mock-first (runs offline), OpenAI-ready.

## Quick start

```bash
npm install
npm test          # 49 tests, all offline
npm run demo      # full pipeline against the mock LLM
npm run typecheck
```

Run against OpenAI (uses the OpenAI credits):

```bash
VC_BRAIN_LLM=openai OPENAI_API_KEY=sk-... npm run demo
```

## Architecture

```
mandate + fund history ─▶ Fund Profiler ─▶ Market Scout ─▶ Diligence (Technical /
  Commercial / Financial / Risk) ─▶ Partner agents ×3 ─▶ Investment Committee ─▶
  Memo ─▶ (feedback) ─▶ Learning
```

- **`schemas/`** — Zod schemas for every agent I/O. Malformed model output can't
  propagate; it fails at the boundary.
- **`state.ts`** — `VCBrainState`, the single object every agent reads/writes,
  plus `WorkflowEvent` for the graph.
- **`similarity/`** — company similarity over 10 weighted dimensions. Describes
  *what kind* of company something is → graph position only. **Not** fund fit.
- **`fundfit/`** — learned-preference fund fit + sourcing score → recommendations.
  Kept independent from similarity by design.
- **`finance/`** — deterministic MOIC / IRR / bull-base-bear. The LLM proposes
  assumptions; the math is computed in code.
- **`llm/`** — the `LLMClient` seam. `MockLLMClient` (fixtures + deterministic
  embeddings) is the default; `OpenAILLMClient` swaps in via `VC_BRAIN_LLM=openai`.
- **`tools/`** — deterministic agent-callable tools: `companySimilarity`,
  `findNearestCompanies`, `fundFit`, `rankCandidates`, `calculateFinancialScenarios`,
  `buildMarketLandscape`, `emitGraphEvent`, `extractCompanyAttributes`.
- **`agents/`** — the ten reasoning agents. Each depends only on `LLMClient`.
- **`orchestrator.ts`** — `runPipeline` (sequencing, parallel diligence,
  validation/retries, event emission) and `applyFeedback` (learning loop).

## Integration notes for the app/graph

- `runPipeline(state, { llm, competitors })` returns the filled `VCBrainState`.
- `state.events` is the ordered `WorkflowEvent[]` the 3D graph consumes
  (`candidate_universe_loaded`, `market_landscape_built`, `finalists_selected`,
  `partner_vote`, `recommendation_produced`, `fund_preferences_updated`, …). Each
  event carries `nodeIds` for highlight / pulse / fly-to.
- `buildMarketLandscape(...)` (also emitted as an event payload) returns
  `{ nodes, edges, clusters }` shaped for a force-directed graph — nodes have an
  initial `x/y/z`, edges have similarity weights.
- Every memo claim carries `sourceNodeIds` so the UI can link memo text back to
  graph nodes.

Sample synthetic data lives in `src/fixtures/` (a stand-in for Richard's dataset).
