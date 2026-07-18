/**
 * Minimal live API for the UI: real OpenAI chat + real learning-loop feedback.
 * Keys stay server-side (loaded from ../.env). The app's Vite dev server proxies
 * /api -> this server, so the browser never sees a key.
 *
 *   npm run api          (from brain/)
 *
 * Endpoints:
 *   GET  /api/graph/axes
 *   POST /api/graph/layout   { axes, focalCompanyId? }
 *   POST /api/graph/compare  { sourceId, targetId, axes? }
 *   POST /api/chat           { messages, context } -> { role, content }
 *   POST /api/chat/stream    same input -> Server-Sent Events
 *   POST /api/feedback       { entityId, action, justification }
 */
import http from "node:http";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { OpenAILLMClient } from "./llm/openai.js";
import { TavilySearchClient } from "./search/tavily.js";
import { applyFeedback } from "./orchestrator.js";
import { discoverCompanies } from "./tools/discover.js";
import { rankCandidates } from "./tools/fundfit.js";
import { InvestorFeedbackSchema, type FeedbackActionType } from "./schemas/feedback.js";
import {
  buildExperienceGraph,
  compareGraphCompanies,
  listGraphAxes,
  type GraphAxisSelection,
} from "./graph/experience.js";
import {
  runOrchestratorChat,
  streamOrchestratorChat,
  type ChatStreamEvent,
  type OrchestratorChatContext,
  type OrchestratorChatMessage,
} from "./chat/orchestrator.js";
import type { RankedCandidate } from "./schemas/sourcing.js";
import type { VCBrainState } from "./state.js";
import type { Company } from "./schemas/company.js";
import { loadSourcedCompanies, saveSourcedCompanies } from "./store/sourcedCompanies.js";

const here = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT = resolve(here, "../../app/src/lib/brain/snapshot.json");
const SOURCED_COMPANIES = resolve(here, "../data/sourced-companies.json");
const PORT = Number(process.env.VC_BRAIN_API_PORT ?? "8790");
const MODEL = process.env.VC_BRAIN_OPENAI_MODEL ?? "gpt-4o-mini";

const state = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as VCBrainState & { competitors?: Company[] };
const persistedSourcedCompanies = loadSourcedCompanies(SOURCED_COMPANIES);
const initialCandidateIds = new Set(state.candidateUniverse.map((company) => company.id));
state.candidateUniverse.push(...persistedSourcedCompanies.filter((company) => !initialCandidateIds.has(company.id)));
const competitors = state.competitors ?? [];
const llm = new OpenAILLMClient({ model: MODEL });
// Web discovery is available only when a Tavily key is present server-side.
const search = process.env.TAVILY_API_KEY ? new TavilySearchClient() : undefined;

const cap = (s: string) => (s ? s[0]!.toUpperCase() + s.slice(1) : s);

const universe = (): Company[] => [
  ...state.candidateUniverse,
  ...state.portfolioCompanies,
  ...state.rejectedDeals,
  ...competitors,
];
const findCompany = (id?: string) => (id ? universe().find((c) => c.id === id) : undefined);

/** App feedback ids/actions -> brain feedback. Founder ids look like `f-<companyId>-<i>`. */
function companyIdFor(entityId: string): string {
  if (entityId.startsWith("f-")) return entityId.replace(/^f-/, "").replace(/-\d+$/, "");
  return entityId;
}
function brainAction(action: string): FeedbackActionType {
  switch (action) {
    case "agree":
      return "mark_rationale_correct";
    case "disagree":
      return "mark_rationale_incorrect";
    case "pass":
      return "pass";
    default:
      return "advance"; // save / investigate / outreach
  }
}

async function handleFeedback(body: { entityId: string; action: string; justification?: string }) {
  const companyId = companyIdFor(body.entityId);
  const company = findCompany(companyId) ?? findCompany(state.committeeDecision?.recommendedCompanyId);
  const feedback = InvestorFeedbackSchema.parse({
    action: brainAction(body.action),
    companyId: company?.id ?? companyId,
    rationale: body.justification || `Investor ${body.action} on ${company?.name ?? companyId}.`,
    learningRate: 0.2,
  });

  await applyFeedback(state, feedback, { llm, competitors, useEmbeddings: false });
  // Compound: the updated profile becomes the base for the next feedback.
  if (state.updatedFundProfile) state.fundProfile = state.updatedFundProfile;

  const weights: Record<string, number> = {};
  for (const c of state.fundProfile?.criteria ?? []) weights[c.name] = Number(c.weight.toFixed(2));
  const moved = (state.learningResult?.changedRankings ?? []).slice(0, 4).map((r) => r.companyId);
  const changedNodeIds = [...new Set([body.entityId, company?.id, ...moved].filter(Boolean))] as string[];
  return { weights, changedNodeIds, note: state.learningResult?.whatTheFundLearned ?? "Feedback recorded." };
}

/**
 * Map a freshly-discovered brain company (+ its ranking) to the app's sourced
 * Company view shape, so the dashboard can render it with no extra adaptation.
 */
function sourcedView(c: Company, r: RankedCandidate | undefined) {
  const fit = r?.fundFitScore !== undefined ? Math.round(r.fundFitScore * 100) : 70;
  const diligence = state.diligence?.[c.id];
  const winner = r?.closestWinnerId ? findCompany(r.closestWinnerId) : undefined;
  const rejected = r?.closestRejectedDealId ? findCompany(r.closestRejectedDealId) : undefined;
  const competitor = r?.closestCompetitorId ? findCompany(r.closestCompetitorId) : undefined;

  const analogues = [];
  if (winner) analogues.push({ companyId: winner.id, kind: "portfolio", note: `Resembles prior winner ${winner.name}.` });
  if (rejected) analogues.push({ companyId: rejected.id, kind: "rejected", note: `Echoes passed deal ${rejected.name}.` });

  const risks = [...new Set([
    ...(r?.unresolvedRisks ?? []),
    ...(diligence?.technical.keyRisks ?? []),
    ...(diligence?.commercial.keyRisks ?? []),
    ...(diligence?.financial.keyRisks ?? []),
    ...(diligence?.risk?.criticalRisks ?? []),
  ])];
  const diligenceQuestions = [...new Set([
    ...(diligence?.technical.diligenceQuestions ?? []),
    ...(diligence?.commercial.diligenceQuestions ?? []),
    ...(diligence?.financial.diligenceQuestions ?? []),
    ...(diligence?.risk?.highValueQuestions ?? []),
  ])];
  const assumptions = diligence?.financial.assumptions;
  const metrics = c.metrics;
  const model = metrics || assumptions
    ? {
        arr: metrics?.arr ?? assumptions?.projectedArr ?? 0,
        growthPct: Math.round((metrics?.arrGrowthRate ?? 0) * 100),
        churnPct: Math.round((metrics?.churnRate ?? 0) * 100),
        nrrPct: Math.round((metrics?.nrr ?? 0) * 100),
        grossMarginPct: Math.round((metrics?.grossMargin ?? 0) * 100),
        cac: metrics?.cac ?? 0,
        cacPaybackMonths: 0,
        burnMonthly: metrics?.monthlyBurn ?? 0,
        runwayMonths: metrics?.runwayMonths ?? 0,
        valuation: c.valuation ?? assumptions?.entryValuation ?? 0,
        checkSize: assumptions?.investmentAmount ?? c.checkSizeSought ?? 0,
        exitMultiple: assumptions?.exitMultiple ?? 0,
        yearsToExit: assumptions?.yearsToExit ?? 0,
      }
    : undefined;

  return {
    id: c.id,
    name: c.name,
    type: "sourced" as const,
    oneLiner: c.description ?? "",
    sector: c.sector ?? c.attributes.industryPath[0] ?? "—",
    stage: cap(c.stage ?? "seed"),
    location: c.geography ?? "—",
    raising: c.checkSizeSought ? `$${(c.checkSizeSought / 1_000_000).toFixed(1)}M round` : undefined,
    fitScore: fit,
    summary: c.description ?? "",
    founderIds: c.founders.map((_, index) => `f-${c.id}-${index}`),
    analogues,
    whySurfaced: [
      winner
        ? `Surfaced from a live web search — closest to portfolio winner ${winner.name} (fund-fit ${fit}).`
        : `Surfaced from a live web search — matches the fund thesis (fund-fit ${fit}).`,
      ...(r?.reasonsToAdvance ?? []),
    ],
    risks,
    diligenceQuestions,
    reasonsToInvest: r?.reasonsToAdvance ?? [],
    reasonsToPass: r?.reasonsToReject ?? [],
    competitors: competitor
      ? [{ name: competitor.name, kind: "direct", note: "Closest external competitor by similarity." }]
      : [],
    model,
  };
}

function sourcedFounderViews(c: Company, r: RankedCandidate | undefined) {
  const technicalScore = state.diligence?.[c.id]?.technical.founderTechnicalScore;
  const score = technicalScore !== undefined
    ? Math.round(technicalScore * 100)
    : r?.fundFitScore !== undefined ? Math.round(r.fundFitScore * 100) : 70;
  return c.founders.map((founder, index) => ({
    id: `f-${c.id}-${index}`,
    name: founder.name,
    companyId: c.id,
    role: founder.role || `Founder, ${c.name}`,
    background: founder.background,
    score,
    justification: founder.background || "Founder background requires further verification.",
    signals: c.attributes.founderArchetypes,
  }));
}

/** Trigger a live web search, fold results into the universe, return sourced views. */
async function handleDiscover(body: { query?: string; limit?: number }) {
  if (!search) throw new Error("web search unavailable: TAVILY_API_KEY not set on the server");
  const fundProfile = state.fundProfile;

  const discovered = await discoverCompanies(
    {
      mandate: state.mandate ?? "Find companies matching the fund thesis.",
      fundProfile,
      queries: body.query?.trim() ? [body.query.trim()] : undefined,
      limit: Math.min(body.limit ?? 6, 12),
      excludeNames: universe().map((c) => c.name),
    },
    { search, llm },
  );
  if (discovered.length === 0) return { companies: [], count: 0 };

  for (const c of discovered) state.candidateUniverse.push(c);
  saveSourcedCompanies(SOURCED_COMPANIES, state.candidateUniverse);

  let ranked: RankedCandidate[] = [];
  if (fundProfile) {
    ranked = rankCandidates({
      candidates: discovered,
      fundProfile,
      positiveHistory: state.portfolioCompanies,
      rejectedHistory: state.rejectedDeals,
      competitors,
    });
    state.sourcedCandidates = [...(state.sourcedCandidates ?? []), ...ranked];
  }

  const byId = new Map(ranked.map((r) => [r.companyId, r]));
  const companies = discovered
    .map((c) => sourcedView(c, byId.get(c.id)))
    .sort((a, b) => b.fitScore - a.fitScore);
  return { companies, count: companies.length };
}

interface ChatBody {
  messages: OrchestratorChatMessage[];
  context?: OrchestratorChatContext;
}

async function handleChat(body: ChatBody) {
  return runOrchestratorChat(body.messages, body.context ?? {}, {
    state,
    companies: universe(),
    competitors,
    llm,
    search,
  });
}

function handleGraphLayout(body: { axes?: Partial<GraphAxisSelection>; focalCompanyId?: string }) {
  return buildExperienceGraph(universe(), {
    axes: body.axes,
    focalCompanyId: body.focalCompanyId,
    candidateIds: new Set(state.candidateUniverse.map((company) => company.id)),
    externalIds: new Set(competitors.map((company) => company.id)),
  });
}

function handleGraphCompare(body: { sourceId: string; targetId: string; axes?: GraphAxisSelection }) {
  const source = findCompany(body.sourceId);
  const target = findCompany(body.targetId);
  if (!source) throw new Error(`Unknown source company '${body.sourceId}'`);
  if (!target) throw new Error(`Unknown target company '${body.targetId}'`);
  return compareGraphCompanies(source, target, body.axes);
}

async function handleStreamingChat(req: http.IncomingMessage, res: http.ServerResponse) {
  const body = (await readBody(req)) as ChatBody;
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  let sourcedCompaniesChanged = false;
  const writeEvent = (event: ChatStreamEvent) => {
    if (event.type === "companies_sourced") sourcedCompaniesChanged = true;
    const outgoing = event.type === "companies_sourced"
      ? {
          ...event,
          companies: event.companies.map((company) => sourcedView(
            company,
            state.sourcedCandidates?.find((candidate) => candidate.companyId === company.id),
          )),
          founders: event.companies.flatMap((company) => sourcedFounderViews(
            company,
            state.sourcedCandidates?.find((candidate) => candidate.companyId === company.id),
          )),
        }
      : event;
    res.write(`event: ${outgoing.type}\ndata: ${JSON.stringify(outgoing)}\n\n`);
  };
  try {
    await streamOrchestratorChat(body.messages, body.context ?? {}, {
      state,
      companies: universe(),
      competitors,
      llm,
      search,
      onEvent: writeEvent,
    });
  } catch (error) {
    res.write(`event: error\ndata: ${JSON.stringify({ type: "error", error: String(error) })}\n\n`);
  } finally {
    if (sourcedCompaniesChanged) saveSourcedCompanies(SOURCED_COMPANIES, state.candidateUniverse);
    res.end();
  }
}

function readBody(req: http.IncomingMessage): Promise<unknown> {
  return new Promise((res, rej) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try {
        res(data ? JSON.parse(data) : {});
      } catch (e) {
        rej(e);
      }
    });
    req.on("error", rej);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Content-Type", "application/json");
  if (req.method === "OPTIONS") return res.writeHead(204).end();

  try {
    if (req.method === "GET" && req.url === "/api/graph/axes") {
      return res.end(JSON.stringify({ axes: listGraphAxes(universe()) }));
    }
    if (req.method === "POST" && req.url === "/api/graph/layout") {
      return res.end(JSON.stringify(handleGraphLayout((await readBody(req)) as never)));
    }
    if (req.method === "POST" && req.url === "/api/graph/compare") {
      return res.end(JSON.stringify(handleGraphCompare((await readBody(req)) as never)));
    }
    if (req.method === "POST" && req.url === "/api/feedback") {
      return res.end(JSON.stringify(await handleFeedback((await readBody(req)) as never)));
    }
    if (req.method === "POST" && req.url === "/api/chat") {
      return res.end(JSON.stringify(await handleChat((await readBody(req)) as never)));
    }
    if (req.method === "POST" && req.url === "/api/chat/stream") {
      return handleStreamingChat(req, res);
    }
    if (req.method === "POST" && req.url === "/api/discover") {
      return res.end(JSON.stringify(await handleDiscover((await readBody(req)) as never)));
    }
    res.writeHead(404).end(JSON.stringify({ error: "not found" }));
  } catch (e) {
    console.error("API error:", e);
    res.writeHead(500).end(JSON.stringify({ error: String(e) }));
  }
});

server.listen(PORT, () => console.log(`• Brain API on http://localhost:${PORT} (model ${MODEL})`));
