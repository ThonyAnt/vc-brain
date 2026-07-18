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
  type OrchestratorChatContext,
  type OrchestratorChatMessage,
} from "./chat/orchestrator.js";
import type { RankedCandidate } from "./schemas/sourcing.js";
import type { VCBrainState } from "./state.js";
import type { Company } from "./schemas/company.js";

const here = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT = resolve(here, "../../app/src/lib/brain/snapshot.json");
const PORT = Number(process.env.VC_BRAIN_API_PORT ?? "8787");
const MODEL = process.env.VC_BRAIN_OPENAI_MODEL ?? "gpt-4o-mini";

const state = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as VCBrainState & { competitors?: Company[] };
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
  const winner = r?.closestWinnerId ? findCompany(r.closestWinnerId) : undefined;
  const rejected = r?.closestRejectedDealId ? findCompany(r.closestRejectedDealId) : undefined;
  const competitor = r?.closestCompetitorId ? findCompany(r.closestCompetitorId) : undefined;

  const analogues = [];
  if (winner) analogues.push({ companyId: winner.id, kind: "portfolio", note: `Resembles prior winner ${winner.name}.` });
  if (rejected) analogues.push({ companyId: rejected.id, kind: "rejected", note: `Echoes passed deal ${rejected.name}.` });

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
    founderIds: [],
    analogues,
    whySurfaced: [
      winner
        ? `Surfaced from a live web search — closest to portfolio winner ${winner.name} (fund-fit ${fit}).`
        : `Surfaced from a live web search — matches the fund thesis (fund-fit ${fit}).`,
    ],
    risks: r?.unresolvedRisks ?? [],
    diligenceQuestions: [],
    reasonsToInvest: r?.reasonsToAdvance ?? [],
    reasonsToPass: r?.reasonsToReject ?? [],
    competitors: competitor
      ? [{ name: competitor.name, kind: "direct", note: "Closest external competitor by similarity." }]
      : [],
  };
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
  return runOrchestratorChat(body.messages, body.context ?? {}, { state, companies: universe(), llm });
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
  const writeEvent = (event: { type: string }) => {
    res.write(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
  };
  try {
    await streamOrchestratorChat(body.messages, body.context ?? {}, {
      state,
      companies: universe(),
      llm,
      onEvent: writeEvent,
    });
  } catch (error) {
    writeEvent({ type: "error", error: String(error) } as { type: string });
  } finally {
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
