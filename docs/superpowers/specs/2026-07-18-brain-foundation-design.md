# VC Brain — Agent Layer Foundation Design

**Date:** 2026-07-18
**Branch:** `agents-and-logic`
**Owner:** Ben (agents + logic)
**Status:** Approved — foundation chunk

## Context

VC Brain is a fund-specific investment-reasoning system. This branch owns the
**agent + logic layer** only — not the app scaffold, graph UI, or synthetic data
(those are Anthony's and Richard's). See [docs/PLAN.md](../../PLAN.md) for the
full product plan.

This spec covers the **foundation chunk**: the shared state, schemas, and
deterministic tools that every agent sits on top of. Agents themselves (Fund
Profiler → Market Scout → diligence → partners → committee → memo → learning)
are the *next* chunk and are out of scope here, but the foundation is designed
so they slot in cleanly.

## Goals

- Provide a single typed shared-state object (`VCBrainState`) and Zod schemas for
  every agent input/output, so a malformed LLM response can't break the pipeline.
- Implement the deterministic math — company similarity, fund fit, financial
  scenarios — as pure, unit-tested functions. Keep this out of the LLM.
- Provide a provider-agnostic `LLMClient` seam so the whole pipeline runs offline
  against a mock, with an OpenAI adapter ready to switch on via one env flag.
- Emit graph-ready data (node coordinates, edges, events) for the frontend.

## Non-goals (this chunk)

- Agent implementations and the orchestrator.
- Real LLM calls in tests (mock only; OpenAI adapter is built but not the default).
- App scaffold, graph rendering, synthetic dataset generation.
- Outreach / scheduling / meeting copilot.

## Key decisions

- **Language/runtime:** TypeScript + Node, ESM. Matches the spec's TS + Zod
  schemas and shares types with the frontend later.
- **LLM provider:** OpenAI (the credits available). Accessed only through the
  `LLMClient` interface. Mock-first — `MockLLMClient` is the default in dev/tests.
- **Package layout:** self-contained `brain/` folder with its own `package.json`,
  independently testable, importable via a clean `index.ts`. Chosen over a root
  `src/` to avoid colliding with the app scaffold that may land at repo root.
- **Similarity ≠ fund-fit:** separate modules. Similarity drives graph position
  and analogues only; fund-fit / sourcing drives recommendations. Two nearly
  identical companies stay spatially close even if one is a strong investment and
  the other weak.
- **Testing:** Vitest. TDD the deterministic functions (similarity, fund-fit,
  finance) — clear inputs/outputs. LLM-dependent code tested against the mock.

## Structure

```
brain/
  package.json  tsconfig.json  vitest.config.ts
  src/
    state.ts            # VCBrainState, WorkflowEvent, shared enums
    schemas/            # Zod: company, fundProfile, diligence,
                        #   partnerOpinion, committee, memo, feedback
    taxonomy/           # industry/product/customer hierarchies for similarity
    similarity/         # 10 weighted dimensions -> company_similarity(A,B) in [0,1]
    fundfit/            # preference-weighted fund_fit + sourcing_score
    finance/            # deterministic MOIC / IRR / bull-base-bear
    llm/
      client.ts         # LLMClient interface
      mock.ts           # deterministic fixtures + hash-based pseudo-embeddings
      openai.ts         # OpenAI adapter (JSON-schema structured output + embeddings)
    tools/              # deterministic agent-callable tools (no agent needed):
                        #   computeCompanySimilarity, findNearestCompanies,
                        #   computeFundFit, rankCandidates,
                        #   calculateFinancialScenarios, buildMarketLandscape,
                        #   emitGraphEvent
    index.ts
```

## Components

### Shared state & schemas
`VCBrainState` holds mandate, historical memos, portfolio companies, rejected
deals, candidate universe, and the progressively-filled outputs (fund profile,
ranked candidates, finalists, diligence, partner opinions, committee decision,
memo, feedback) plus an append-only `events: WorkflowEvent[]`. Every agent
output has a Zod schema; agents will be forced to conform to it.

### Similarity (graph position only)
`company_similarity(A, B)` = weighted sum over 10 dimensions:
industry 0.18, problem 0.15, customer 0.12, product 0.10, technical 0.10,
business-model 0.08, go-to-market 0.08, founder-archetype 0.07,
disruption 0.07, regulatory 0.05. Normalized to [0,1]. Techniques per dimension:
hierarchical-taxonomy (industry/product/customer), multi-label Jaccard
(customers/technical/founder/disruption/regulatory), embedding-cosine (free-text
problem/product/pain/technical descriptions), categorical partial-match
(business model / GTM / operational). Custom weights overridable.

### Fund fit (recommendations only)
`fund_fit(company) = Σ preference_weight(attribute_value)` against the learned
fund profile. `sourcing_score = 0.45·sim_to_positive_history
− 0.20·sim_to_rejected_history + 0.35·explicit_thesis_match`. Coefficients and
preference weights are updatable later by the feedback-learning agent.

### Finance (deterministic)
`calculate_financial_scenarios` returns bull/base/bear with exit valuation,
ownership at exit, proceeds, MOIC, IRR from investment amount, entry valuation,
ownership, growth, dilution, exit multiple, years to exit. Pure math — the LLM
proposes assumptions, code computes results.

### LLM seam
```ts
interface LLMClient {
  generateStructured<T>(opts: { schema: ZodType<T>; system?: string;
    prompt: string; model?: string }): Promise<T>;
  generateText(opts: { system?: string; prompt: string; model?: string }): Promise<string>;
  embed(texts: string[]): Promise<number[][]>;
}
```
- `MockLLMClient`: returns registered fixtures keyed by a label; deterministic
  hash-based pseudo-embeddings so similarity is stable and offline.
- `OpenAILLMClient`: structured output via OpenAI JSON-schema `response_format`
  (Zod → JSON schema), embeddings via `text-embedding-3-small`. Selected by env
  flag; never the default in tests.

### Tools (graph-ready output)
Deterministic agent-callable tools that need no LLM: `computeCompanySimilarity`,
`findNearestCompanies`, `computeFundFit`, `rankCandidates`,
`calculateFinancialScenarios`, `buildMarketLandscape` (node coords + cluster ids
+ nearest-neighbor and analogue edges), `emitGraphEvent` (the structured event
stream the 3D graph consumes). LLM-backed tools (`extract_company_attributes`,
etc.) depend on `LLMClient` and land with the agent chunk.

## Testing strategy

- TDD pure functions: similarity dimensions + weighted aggregate, fund-fit,
  sourcing score, MOIC/IRR, taxonomy distance, Jaccard, cosine.
- `MockLLMClient` drives any code needing generation/embeddings; assert
  deterministic behavior.
- A small hand-built fixture set of 3–4 companies to exercise
  `findNearestCompanies` / `buildMarketLandscape` end-to-end.

## Success criteria

- `npm test` in `brain/` passes with the deterministic functions covered.
- `company_similarity` and `fund_fit` are demonstrably independent.
- Swapping `MockLLMClient` → `OpenAILLMClient` requires no change to callers.
- Tools emit data shaped for the graph pipeline without importing any UI code.
