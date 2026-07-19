# Meridian

An AI investment system for venture capital firms. It learns how a fund thinks, discovers matching startups, maps the market, models returns, prepares diligence, and improves after every decision.

The core idea: a living institutional memory and reasoning system for venture investing. Not a search engine, CRM, or note taker. A fund-specific reasoning layer that connects every new opportunity to the fund's historical decisions and gets smarter with each one.

## What it does

- **Fund graph.** Ingests prior memos, portfolio companies, rejected deals, thesis, and partner preferences. Builds an interactive graph where spatial distance means similarity.
- **Conviction-driven sourcing.** Finds companies that match the fund's actual decision patterns and explains why each one surfaced, including which past investments and rejections it resembles.
- **Startup analysis.** Company summary, historical analogues, fund-fit score, risks, competitor landscape, and missing diligence questions.
- **Financial modeling.** Auto-generated editable models with bull, base, and bear return scenarios. IRR, MOIC, probability of returning the fund.
- **Outreach and scheduling.** Founder contact discovery, personalized outreach, meeting coordination.
- **Meeting copilot.** Pre-meeting brief, structured live notes, contradiction detection, suggested follow-ups.
- **Post-meeting output.** Draft investment memo in the fund's own style, updated model, recommendation.
- **Learning loop.** Every approve, pass, and outcome updates Meridian. The graph and recommendation weights visibly change after feedback.
- **Partner intelligence.** Predicts which partners will support or oppose a deal and why.

See [docs/PLAN.md](docs/PLAN.md) for the full product plan and demo narrative.
See [docs/OUTREACH_AUTOMATION.md](docs/OUTREACH_AUTOMATION.md) for the staged, production-safe approach to founder outreach, reply handling, and calendar scheduling.

## Local development

```bash
# Terminal 1 — brain API (OpenAI + Tavily stay server-side)
cd brain && npm install && npm run api

# Terminal 2 — UI (proxies /api → localhost:8790)
cd app && npm install && npm run dev
```

Root `.env` (repo root) should include:

```
OPENAI_API_KEY=…
TAVILY_API_KEY=…
```

## Vercel deployment (UI + brain API together)

One Vercel project hosts the Vite SPA and the brain as serverless `/api/*` routes. No separate Railway/Fly host required.

1. Import this GitHub repo into Vercel (Root Directory = repo root).
2. Framework preset: **Vite** (root `vercel.json` sets install/build/output).
3. Set server env vars (Project → Settings → Environment Variables):
   - `OPENAI_API_KEY`
   - `TAVILY_API_KEY`
   - optional: `VC_BRAIN_OPENAI_MODEL` (default `gpt-4o-mini`)
4. Leave `VITE_API_BASE_URL` **unset** so the browser calls same-origin `/api/...`.
5. Deploy. Long sourcing/SSE runs need a plan that allows higher `maxDuration` (configured to 300s).

Locally you still run `brain` + `app` as two processes (Vite proxies `/api` → `:8790`). Optional separate API host still works via `VITE_API_BASE_URL`.

**Not Supabase:** live chat/sourcing needs OpenAI + Tavily compute and SSE, not a database. Supabase would only help later for durable persistence of sourced companies / feedback.
