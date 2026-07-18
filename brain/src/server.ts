/**
 * Minimal live API for the UI: real OpenAI chat + real learning-loop feedback.
 * Keys stay server-side (loaded from ../.env). The app's Vite dev server proxies
 * /api -> this server, so the browser never sees a key.
 *
 *   npm run api          (from brain/)
 *
 * Endpoints:
 *   POST /api/chat      { messages, context } -> { role, content }
 *   POST /api/feedback  { entityId, action, justification } -> { weights, changedNodeIds, note }
 */
import http from "node:http";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { OpenAILLMClient } from "./llm/openai.js";
import { applyFeedback } from "./orchestrator.js";
import { InvestorFeedbackSchema, type FeedbackActionType } from "./schemas/feedback.js";
import type { VCBrainState } from "./state.js";
import type { Company } from "./schemas/company.js";

const here = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT = resolve(here, "../../app/src/lib/brain/snapshot.json");
const PORT = Number(process.env.VC_BRAIN_API_PORT ?? "8787");
const MODEL = process.env.VC_BRAIN_OPENAI_MODEL ?? "gpt-4o-mini";

const state = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as VCBrainState & { competitors?: Company[] };
const competitors = state.competitors ?? [];
const llm = new OpenAILLMClient({ model: MODEL });

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

async function handleChat(body: { messages: { role: string; content: string }[]; context?: { companyId?: string } }) {
  const last = body.messages[body.messages.length - 1]?.content ?? "";
  const company = findCompany(body.context?.companyId);
  const fp = state.fundProfile;
  const memo = company && state.investmentMemo?.companyId === company.id ? state.investmentMemo : undefined;
  const dil = company ? state.diligence?.[company.id] : undefined;

  const context = [
    fp ? `Fund thesis: ${fp.thesisSummary}` : "",
    fp ? `Top criteria: ${fp.criteria.map((c) => `${c.name} (${c.weight.toFixed(2)})`).join(", ")}` : "",
    company ? `Company: ${company.name} — ${company.description} (sector ${company.sector ?? "?"}, ${company.stage ?? "?"}).` : "",
    dil ? `Key risks: ${dil.risk?.criticalRisks?.join("; ") ?? "n/a"}.` : "",
    memo ? `Memo thesis: ${memo.investmentThesis}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const content = await llm.generateText({
    system:
      "You are the fund's investment brain — a sharp VC analyst. Answer in 2-4 sentences, " +
      "specific and grounded in the context provided. No preamble.",
    prompt: `${context}\n\nInvestor question: ${last}`,
  });
  return { role: "assistant", content };
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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Content-Type", "application/json");
  if (req.method === "OPTIONS") return res.writeHead(204).end();

  try {
    if (req.method === "POST" && req.url === "/api/feedback") {
      return res.end(JSON.stringify(await handleFeedback((await readBody(req)) as never)));
    }
    if (req.method === "POST" && req.url === "/api/chat") {
      return res.end(JSON.stringify(await handleChat((await readBody(req)) as never)));
    }
    res.writeHead(404).end(JSON.stringify({ error: "not found" }));
  } catch (e) {
    console.error("API error:", e);
    res.writeHead(500).end(JSON.stringify({ error: String(e) }));
  }
});

server.listen(PORT, () => console.log(`• Brain API on http://localhost:${PORT} (model ${MODEL})`));
