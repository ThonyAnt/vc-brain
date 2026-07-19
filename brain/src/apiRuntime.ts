/**
 * Shared Meridian brain HTTP handlers — used by the local Node server and
 * Vercel serverless `/api` routes so the UI and API can ship as one deploy.
 */
import type http from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { OpenAILLMClient } from "./llm/openai.js";
import { TavilySearchClient } from "./search/tavily.js";
import { applyFeedback } from "./orchestrator.js";
import { discoverCompanies } from "./tools/discover.js";
import { sourceFounder } from "./tools/sourceFounder.js";
import { rankCandidates, displayFitScore } from "./tools/fundfit.js";
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
import { buildCompanyWorkbook, buildCompanyWorkbookPreview } from "./models/companyWorkbooks.js";
import { applyFundPatch, fundProfileToView, FundProfilePatchSchema } from "./fund/profileEdits.js";
import { z } from "zod";

const here = dirname(fileURLToPath(import.meta.url));
const MODEL = process.env.VC_BRAIN_OPENAI_MODEL ?? "gpt-4o-mini";

function resolveDataFile(candidates: string[]): string {
  const hit = candidates.find((path) => existsSync(path));
  if (hit) return hit;
  return candidates[0]!;
}

const SNAPSHOT = resolveDataFile([
  resolve(here, "../../app/src/lib/brain/snapshot.json"),
  resolve(process.cwd(), "app/src/lib/brain/snapshot.json"),
  resolve(process.cwd(), "src/lib/brain/snapshot.json"),
]);
const SOURCED_COMPANIES = resolveDataFile([
  resolve(here, "../data/sourced-companies.json"),
  resolve(process.cwd(), "brain/data/sourced-companies.json"),
  resolve(process.cwd(), "data/sourced-companies.json"),
]);

const CompanyWorkbookRequestSchema = z.object({
  kind: z.enum(["tam-exit", "landscape"]),
  company: z.unknown(),
  sheet: z.string().optional(),
});

type ApiReq = http.IncomingMessage & { body?: unknown };

const g = globalThis as typeof globalThis & {
  __meridianBrain?: {
    state: VCBrainState & { competitors?: Company[] };
    competitors: Company[];
    llm: OpenAILLMClient;
    search: TavilySearchClient | undefined;
  };
};

function boot() {
  if (g.__meridianBrain) return g.__meridianBrain;
  const state = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as VCBrainState & { competitors?: Company[] };
  const persistedSourcedCompanies = loadSourcedCompanies(SOURCED_COMPANIES);
  const initialCandidateIds = new Set(state.candidateUniverse.map((company) => company.id));
  state.candidateUniverse.push(...persistedSourcedCompanies.filter((company) => !initialCandidateIds.has(company.id)));
  const competitors = state.competitors ?? [];
  const llm = new OpenAILLMClient({ model: MODEL });
  const search = process.env.TAVILY_API_KEY ? new TavilySearchClient() : undefined;
  g.__meridianBrain = { state, competitors, llm, search };
  return g.__meridianBrain;
}

function persistSourced(companies: Company[]) {
  try {
    saveSourcedCompanies(SOURCED_COMPANIES, companies);
  } catch (error) {
    if (process.env.VERCEL) return;
    throw error;
  }
}

const cap = (s: string) => (s ? s[0]!.toUpperCase() + s.slice(1) : s);

function universe(): Company[] {
  const { state, competitors } = boot();
  return [...state.candidateUniverse, ...state.portfolioCompanies, ...state.rejectedDeals, ...competitors];
}

function findCompany(id?: string) {
  return id ? universe().find((c) => c.id === id) : undefined;
}

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
      return "advance";
  }
}

async function handleFeedback(body: { entityId: string; action: string; justification?: string }) {
  const { state, competitors, llm } = boot();
  const companyId = companyIdFor(body.entityId);
  const company = findCompany(companyId) ?? findCompany(state.committeeDecision?.recommendedCompanyId);
  const feedback = InvestorFeedbackSchema.parse({
    action: brainAction(body.action),
    companyId: company?.id ?? companyId,
    rationale: body.justification || `Investor ${body.action} on ${company?.name ?? companyId}.`,
    learningRate: 0.2,
  });

  await applyFeedback(state, feedback, { llm, competitors, useEmbeddings: false });
  if (state.updatedFundProfile) state.fundProfile = state.updatedFundProfile;

  const weights: Record<string, number> = {};
  for (const c of state.fundProfile?.criteria ?? []) weights[c.name] = Number(c.weight.toFixed(2));
  const moved = (state.learningResult?.changedRankings ?? []).slice(0, 4).map((r) => r.companyId);
  const changedNodeIds = [...new Set([body.entityId, company?.id, ...moved].filter(Boolean))] as string[];
  return { weights, changedNodeIds, note: state.learningResult?.whatTheFundLearned ?? "Feedback recorded." };
}

function fitCohort(): number[] {
  return (boot().state.sourcedCandidates ?? []).map((r) => r.totalScore);
}

function sourcedView(c: Company, r: RankedCandidate | undefined) {
  const { state } = boot();
  const fit =
    r?.totalScore !== undefined
      ? displayFitScore(r.totalScore, fitCohort())
      : r?.fundFitScore !== undefined
        ? Math.round(r.fundFitScore * 100)
        : 70;
  const diligence = state.diligence?.[c.id];
  const winner = r?.closestWinnerId ? findCompany(r.closestWinnerId) : undefined;
  const rejected = r?.closestRejectedDealId ? findCompany(r.closestRejectedDealId) : undefined;
  const competitor = r?.closestCompetitorId ? findCompany(r.closestCompetitorId) : undefined;
  const recordedCompetitors = c.competitors.map((name) => ({
    name,
    kind: "direct" as const,
    note: "Named in the sourced company record; further fields require verification.",
  }));
  if (competitor && !recordedCompetitors.some((entry) => entry.name.toLowerCase() === competitor.name.toLowerCase())) {
    recordedCompetitors.push({
      name: competitor.name,
      kind: "direct",
      note: "Closest external competitor by deterministic company similarity.",
    });
  }

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
        customers: metrics?.customers,
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
    competitors: recordedCompetitors,
    model,
  };
}

function sourcedFounderViews(c: Company, r: RankedCandidate | undefined) {
  const { state } = boot();
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
    photoUrl: founder.photoUrl,
    score,
    justification: founder.background || "Founder background requires further verification.",
    signals: c.attributes.founderArchetypes,
  }));
}

async function handleDiscover(body: { query?: string; limit?: number }) {
  const { state, competitors, llm, search } = boot();
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
  persistSourced(state.candidateUniverse);

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

async function handleSourceFounder(body: { linkedinUrl?: string; name?: string; company?: string }) {
  const { state, llm, search } = boot();
  if (!search) throw new Error("web search unavailable: TAVILY_API_KEY not set on the server");
  const founder = await sourceFounder(
    { linkedinUrl: body.linkedinUrl, name: body.name, company: body.company, fundProfile: state.fundProfile },
    { search, llm },
  );
  return { founder, sources: founder.sources };
}

interface ChatBody {
  messages: OrchestratorChatMessage[];
  context?: OrchestratorChatContext;
}

async function handleChat(body: ChatBody) {
  const { state, competitors, llm, search } = boot();
  return runOrchestratorChat(body.messages, body.context ?? {}, {
    state,
    companies: universe(),
    competitors,
    llm,
    search,
  });
}

function handleGraphLayout(body: { axes?: Partial<GraphAxisSelection>; focalCompanyId?: string }) {
  const { state, competitors } = boot();
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

async function handleStreamingChat(body: ChatBody, res: http.ServerResponse) {
  const { state, competitors, llm, search } = boot();
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
    if (sourcedCompaniesChanged) persistSourced(state.candidateUniverse);
    res.end();
  }
}

function readBody(req: ApiReq): Promise<unknown> {
  if (req.body !== undefined && req.body !== null && req.body !== "") {
    return Promise.resolve(typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body);
  }
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

function pathnameOf(req: ApiReq): string {
  const raw = req.url ?? "/";
  return raw.split("?")[0] || "/";
}

/** Node/Vercel-compatible request dispatcher. */
export async function handleNodeApi(req: ApiReq, res: http.ServerResponse): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const path = pathnameOf(req);
  const { state } = boot();

  try {
    if (req.method === "GET" && path === "/api/graph/axes") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ axes: listGraphAxes(universe()) }));
      return;
    }
    if (req.method === "POST" && path === "/api/graph/layout") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(handleGraphLayout((await readBody(req)) as never)));
      return;
    }
    if (req.method === "POST" && path === "/api/graph/compare") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(handleGraphCompare((await readBody(req)) as never)));
      return;
    }
    if (req.method === "POST" && path === "/api/feedback") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await handleFeedback((await readBody(req)) as never)));
      return;
    }
    if (req.method === "GET" && path === "/api/fund") {
      res.setHeader("Content-Type", "application/json");
      if (!state.fundProfile) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "no fund profile" }));
        return;
      }
      res.end(JSON.stringify(fundProfileToView(state.fundProfile)));
      return;
    }
    if (req.method === "POST" && path === "/api/fund") {
      res.setHeader("Content-Type", "application/json");
      if (!state.fundProfile) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "no fund profile" }));
        return;
      }
      const patch = FundProfilePatchSchema.parse(await readBody(req));
      res.end(JSON.stringify(applyFundPatch(state.fundProfile, patch)));
      return;
    }
    if (req.method === "POST" && path === "/api/chat") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await handleChat((await readBody(req)) as never)));
      return;
    }
    if (req.method === "POST" && path === "/api/chat/stream") {
      return handleStreamingChat((await readBody(req)) as ChatBody, res);
    }
    if (req.method === "POST" && path === "/api/discover") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await handleDiscover((await readBody(req)) as never)));
      return;
    }
    if (req.method === "POST" && path === "/api/founders/source") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await handleSourceFounder((await readBody(req)) as never)));
      return;
    }
    if (req.method === "POST" && path === "/api/models/preview") {
      res.setHeader("Content-Type", "application/json");
      const body = CompanyWorkbookRequestSchema.parse(await readBody(req));
      res.end(JSON.stringify(buildCompanyWorkbookPreview(body.kind, body.company, body.sheet)));
      return;
    }
    if (req.method === "POST" && path === "/api/models/workbook") {
      const body = CompanyWorkbookRequestSchema.parse(await readBody(req));
      const preview = buildCompanyWorkbookPreview(body.kind, body.company);
      const workbook = await buildCompanyWorkbook(body.kind, body.company);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Length", String(workbook.length));
      res.setHeader("Content-Disposition", `attachment; filename="${preview.fileName}"`);
      res.end(workbook);
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ error: "not found" }));
  } catch (e) {
    console.error("API error:", e);
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(500);
      res.end(JSON.stringify({ error: String(e) }));
    } else {
      res.end();
    }
  }
}

export function apiModelLabel() {
  return MODEL;
}
