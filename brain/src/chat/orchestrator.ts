import type { LLMClient } from "../llm/client.js";
import type { SearchClient } from "../search/client.js";
import type { Company } from "../schemas/company.js";
import type { VCBrainState } from "../state.js";
import { compareGraphCompanies, type GraphAxisSelection } from "../graph/experience.js";
import { companySimilarity } from "../tools/similarity.js";
import { discoverCompanies } from "../tools/discover.js";
import { sourceFounder, type SourcedFounderView } from "../tools/sourceFounder.js";
import { describeCompany } from "../agents/util.js";
import { runPipeline, type AgentExecutionEvent } from "../orchestrator.js";

export interface OrchestratorChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface OrchestratorChatContext {
  route?: string;
  companyId?: string;
  comparisonCompanyId?: string;
  axes?: GraphAxisSelection;
}

export type ChatStreamEvent =
  | { type: "run_started"; runId: string; orchestrator: "investment_orchestrator"; agents: string[] }
  | { type: "agent_started"; runId: string; agent: string; label: string }
  | { type: "agent_completed"; runId: string; agent: string; summary: string }
  | { type: "agent_failed"; runId: string; agent: string; error: string }
  | { type: "companies_sourced"; runId: string; companies: Company[] }
  | { type: "founders_sourced"; runId: string; founders: SourcedFounderView[] }
  | { type: "text_delta"; runId: string; delta: string }
  | { type: "run_completed"; runId: string; message: OrchestratorChatMessage };

export interface ChatOrchestratorOptions {
  state: VCBrainState;
  companies: Company[];
  llm: LLMClient;
  search?: SearchClient;
  competitors?: Company[];
  now?: () => number;
  onEvent?: (event: ChatStreamEvent) => void | Promise<void>;
}

interface Specialist {
  id: string;
  label: string;
  run: () => string;
}

interface DirectReply {
  intent: "greeting" | "help" | "thanks" | "goodbye";
  content: string;
}

const SOURCING_CLARIFICATION_PREFIX = "Before I start live sourcing";
const SOURCING_CLARIFICATION = `${SOURCING_CLARIFICATION_PREFIX}, what should I target?

Please share:

- **Sector or investment thesis**
- **Stage and target check size**
- **Geography**
- **Must-have signals or exclusions**

A short answer is fine—for example: “Seed–Series A computer-vision infrastructure in the US, $1–3M checks, excluding hardware-only companies.”`;

function latestUserMessage(messages: OrchestratorChatMessage[]): string {
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}

function normalizedMessage(message: string): string {
  return message.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * High-confidence conversational intents bypass research agents entirely.
 * Keeping these deterministic prevents a greeting from being overwhelmed by
 * whatever fund/company context happens to be open in the UI.
 */
function directReplyFor(message: string): DirectReply | undefined {
  const text = normalizedMessage(message);
  if (/^(hi|hello|hey|hiya|howdy|yo)( there| team| everyone)?[!.?]*$/.test(text)
    || /^good (morning|afternoon|evening)[!.?]*$/.test(text)) {
    return {
      intent: "greeting",
      content: "Hi there! I’m your VC investment copilot. I can compare companies, surface historical analogues, explain graph positions, or review risks. What are you evaluating?",
    };
  }
  if (/^(help|what can you do|how can you help( me)?|what should i ask you)[!.?]*$/.test(text)) {
    return {
      intent: "help",
      content: "I can compare a company with past winners and failures, explain its graph position, review diligence risks, summarize the fund thesis, or find similar external companies. Select a company or tell me what you want to evaluate.",
    };
  }
  if (/^(thanks|thank you|thank you very much|thx|appreciate it|got it)[!.?]*$/.test(text)) {
    return { intent: "thanks", content: "You’re welcome. What would you like to evaluate next?" };
  }
  if (/^(bye|goodbye|see you|talk later|that is all|that's all)[!.?]*$/.test(text)) {
    return { intent: "goodbye", content: "Sounds good. I’ll be here when you’re ready to evaluate the next company." };
  }
  return undefined;
}

function hasIntent(text: string, pattern: RegExp): boolean {
  return pattern.test(text);
}

const LINKEDIN_URL_RE = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[^\s)]+/i;

export interface FounderSourcingRequest {
  linkedinUrl?: string;
  name?: string;
}

/** A capitalized 2–3 word personal name. */
const PERSON_NAME = "([A-Z][\\w.'-]+(?:\\s+[A-Z][\\w.'-]+){1,2})";

/** Pull a person's name from a founder request, on whichever side of "founder" it sits. */
export function extractFounderName(message: string): string | undefined {
  // Drop a leading command verb/article first so a capitalized sentence-start
  // verb ("Source Elon Musk...") can't be mistaken for part of the name.
  const text = message.replace(
    /^\s*(please\s+|can you\s+|could you\s+)?(source|score|evaluate|vet|scout|look ?up|check out|research|add|find)\s+(the\s+|an?\s+)?/i,
    "",
  );
  // Trim trailing sentence punctuation the name char class may have swallowed.
  const clean = (n: string | undefined) => n?.replace(/[.,;:]+$/, "").trim() || undefined;
  // "the founder [named] Jane Doe"
  const after = text.match(new RegExp(`[Ff]ounder(?:\\s+named)?\\s+["“]?${PERSON_NAME}`));
  if (after) return clean(after[1]);
  // "Jane Doe as a founder"
  const before = text.match(new RegExp(`${PERSON_NAME}["”]?\\s+as\\s+(?:an?\\s+)?[Ff]ounder`));
  if (before) return clean(before[1]);
  // Fallback: the first capitalized name that remains.
  return clean(text.match(new RegExp(PERSON_NAME))?.[1]);
}

/**
 * Founder-scout trigger: any LinkedIn profile URL routes straight to the tool;
 * otherwise an explicit "source/score/vet/add ... founder ... <Name>" phrasing,
 * with the name on either side of the word "founder".
 */
export function detectFounderSourcing(message: string): FounderSourcingRequest | undefined {
  const url = message.match(LINKEDIN_URL_RE)?.[0];
  if (url) return { linkedinUrl: url.startsWith("http") ? url : `https://${url}` };
  const text = normalizedMessage(message);
  if (!/\b(source|score|evaluate|vet|scout|look ?up|check out|research|add)\b/.test(text)) return undefined;
  if (!/\bfounder\b/.test(text)) return undefined;
  const name = extractFounderName(message);
  if (name) return { name };
  return undefined;
}

export function isSourcingRequest(message: string): boolean {
  const text = normalizedMessage(message);
  const action = /\b(source|sourcing|find|discover|scout|search for|look for|identify|surface)\b/.test(text);
  const target = /\b(company|companies|startup|startups|deal|deals|candidate|candidates|investment|investments|opportunity|opportunities)\b/.test(text);
  return action && target;
}

/** True when a sourcing command contains no usable search constraint. */
export function needsSourcingClarification(message: string): boolean {
  if (!isSourcingRequest(message)) return false;
  const remainder = normalizedMessage(message)
    .replace(/\b(search for|look for)\b/g, " ")
    .replace(/\b(source|sourcing|find|discover|scout|identify|surface)\b/g, " ")
    .replace(/\b(company|companies|startup|startups|deal|deals|candidate|candidates|investment|investments|opportunity|opportunities)\b/g, " ")
    .replace(/\b(can|could|would|will|you|please|some|any|few|a|the|new|good|great|interesting|potential|for|me|us|our|fund|portfolio)\b/g, " ")
    .replace(/[^a-z0-9$-]+/g, " ")
    .trim();
  return remainder.length === 0;
}

function isSourcingClarificationFollowUp(messages: OrchestratorChatMessage[]): boolean {
  let latestUserIndex = -1;
  for (let index = messages.length - 1; index >= 0; index--) {
    if (messages[index]?.role === "user") {
      latestUserIndex = index;
      break;
    }
  }
  if (latestUserIndex <= 0) return false;
  const priorMessage = messages[latestUserIndex - 1];
  return priorMessage?.role === "assistant" && priorMessage.content.startsWith(SOURCING_CLARIFICATION_PREFIX);
}

const PIPELINE_AGENTS = [
  "discovery",
  "fundProfiler",
  "marketScout",
  "technicalDiligence",
  "commercialDiligence",
  "financialDiligence",
  "risk",
  "partnerReview",
  "committee",
  "memo",
];

function agentLabel(agent: string): string {
  if (agent.startsWith("partner:")) return `Partner review — ${agent.slice("partner:".length)}`;
  const labels: Record<string, string> = {
    founderScout: "Founder scout",
    discovery: "Tavily discovery",
    fundProfiler: "Fund profiler",
    marketScout: "Market scout",
    technicalDiligence: "Technical diligence",
    commercialDiligence: "Commercial diligence",
    financialDiligence: "Financial diligence",
    risk: "Risk review",
    partnerReview: "Partner review",
    committee: "Investment committee",
    memo: "Memo writer",
  };
  return labels[agent] ?? agent.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function mergePipelineState(target: VCBrainState, pipeline: VCBrainState): void {
  const known = new Set(target.candidateUniverse.map((company) => company.id));
  target.candidateUniverse.push(...pipeline.candidateUniverse.filter((company) => !known.has(company.id)));
  const ranked = new Map((target.sourcedCandidates ?? []).map((candidate) => [candidate.companyId, candidate]));
  for (const candidate of pipeline.sourcedCandidates ?? []) ranked.set(candidate.companyId, candidate);
  target.sourcedCandidates = [...ranked.values()];
  target.fundProfile = pipeline.fundProfile ?? target.fundProfile;
  target.finalists = pipeline.finalists;
  target.diligence = { ...(target.diligence ?? {}), ...(pipeline.diligence ?? {}) };
  target.partnerOpinions = pipeline.partnerOpinions;
  target.committeeDecision = pipeline.committeeDecision;
  target.investmentMemo = pipeline.investmentMemo;
  target.financialScenarios = pipeline.financialScenarios;
  target.events.push(...pipeline.events);
}

function mentionsCompany(message: string, company: Company): boolean {
  const escaped = company.name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(message);
}

function findMentionedCompany(message: string, companies: Company[], excludedId?: string): Company | undefined {
  const lower = message.toLowerCase();
  return companies
    .filter((company) => company.id !== excludedId)
    .sort((a, b) => b.name.length - a.name.length)
    .find((company) => mentionsCompany(lower, company));
}

function nearestByOutcome(source: Company, companies: Company[], outcome: Company["outcome"]): Company | undefined {
  return companies
    .filter((company) => company.id !== source.id && company.outcome === outcome)
    .map((company) => ({ company, score: companySimilarity(source, company).overall }))
    .sort((a, b) => b.score - a.score)[0]?.company;
}

/** Companies the fund has actually put money into (as opposed to rejected/external). */
const PAST_INVESTMENT_STATUSES: Company["historicalStatus"][] = ["portfolio", "invested"];

/**
 * The fund's nearest PAST INVESTMENTS to the focal company, ranked by cluster
 * (attribute-similarity) score. This is how the copilot answers "what's the most
 * similar company we've invested in" — grounded in the same similarity engine
 * that positions the 3D graph clusters.
 */
function nearestPastInvestments(source: Company, companies: Company[], k = 2) {
  return companies
    .filter((company) => company.id !== source.id && PAST_INVESTMENT_STATUSES.includes(company.historicalStatus))
    .map((company) => ({ company, sim: companySimilarity(source, company) }))
    .sort((a, b) => b.sim.overall - a.sim.overall)
    .slice(0, k);
}

/** Compact deal economics for a "is this a better deal?" comparison; nulls when unknown. */
function dealTerms(company: Company, state: VCBrainState) {
  const m = company.metrics;
  const fit = state.sourcedCandidates?.find((candidate) => candidate.companyId === company.id)?.fundFitScore;
  const pct = (v: number | undefined) => (v != null ? Math.round(v * 100) : null);
  return {
    valuation: company.valuation ?? null,
    checkSizeSought: company.checkSizeSought ?? null,
    arr: m?.arr ?? null,
    arrGrowthPct: pct(m?.arrGrowthRate),
    nrrPct: pct(m?.nrr),
    grossMarginPct: pct(m?.grossMargin),
    fundFitScore: pct(fit),
    outcome: company.outcome,
    historicalStatus: company.historicalStatus,
  };
}

function specialistsFor(
  messages: OrchestratorChatMessage[],
  context: OrchestratorChatContext,
  state: VCBrainState,
  companies: Company[],
): Specialist[] {
  const question = latestUserMessage(messages);
  const lower = question.toLowerCase();
  const focal = companies.find((company) => company.id === context.companyId) ?? findMentionedCompany(question, companies);
  const requestedComparison = companies.find((company) => company.id === context.comparisonCompanyId)
    ?? findMentionedCompany(question, companies, focal?.id);
  const selected: Specialist[] = [];

  if (focal) {
    selected.push({
      id: "company_analyst",
      label: "Company analyst",
      run: () => describeCompany(focal),
    });
  }

  if (
    focal &&
    (requestedComparison ||
      hasIntent(
        lower,
        /\b(compar(?:e|ison)?|similar|analogue|winner|fail(?:ed|ure)?|competitor|graph|axis|axes|invest(?:ed|ment|ments)?|back(?:ed)?|past|prior|previous|portfolio|deal|better)\b/,
      ))
  ) {
    selected.push({
      id: "analogue_analyst",
      label: "Historical analogue analyst",
      run: () => {
        const rank = (company: Company, sim = companySimilarity(focal, company)) => ({
          name: company.name,
          clusterSimilarity: Number(sim.overall.toFixed(3)),
          similarityDimensions: sim.dimensions,
          sharedAttributes: sim.sharedAttributes,
          keyDifferences: sim.keyDifferences,
          comparison: compareGraphCompanies(focal, company, context.axes),
          dealTerms: dealTerms(company, state),
        });

        if (requestedComparison) {
          return JSON.stringify({
            focal: { name: focal.name, dealTerms: dealTerms(focal, state) },
            analogues: [rank(requestedComparison)],
            note: "Direct comparison requested. Use dealTerms on both sides to judge which is the better deal (lower entry valuation, stronger growth/NRR/margin, higher fund-fit).",
          });
        }

        // Prefer the fund's nearest PAST INVESTMENTS (the clusters we've backed);
        // fall back to outcome-labelled analogues only if we've invested in nothing similar.
        const invested = nearestPastInvestments(focal, companies, 2);
        const pool = invested.length
          ? invested
          : [nearestByOutcome(focal, companies, "succeeded"), nearestByOutcome(focal, companies, "failed")]
              .filter((company): company is Company => Boolean(company))
              .map((company) => ({ company, sim: companySimilarity(focal, company) }));
        if (!pool.length) {
          return `No past investments or outcome-labelled analogues are available to compare against ${focal.name}. Say this explicitly rather than guessing.`;
        }
        return JSON.stringify({
          focal: { name: focal.name, dealTerms: dealTerms(focal, state) },
          note: invested.length
            ? "Analogues are the fund's nearest PAST INVESTMENTS by cluster similarity. Compare dealTerms to judge whether the focal company is the better deal."
            : "No prior investments were similar; these are the nearest outcome-labelled companies instead.",
          analogues: pool.map(({ company, sim }) => rank(company, sim)),
        });
      },
    });
  }

  if (focal && hasIntent(lower, /\b(risk|risks|diligence|technical|commercial|financial|feasibility|feasible|regulatory|regulation)\b/)) {
    selected.push({
      id: "diligence_analyst",
      label: "Diligence analyst",
      run: () => {
        const diligence = state.diligence?.[focal.id];
        return diligence ? JSON.stringify(diligence) : `No completed diligence record for ${focal.name}. Flag missing evidence explicitly.`;
      },
    });
  }

  if (hasIntent(lower, /\b(fund|thesis|criterion|criteria|portfolio|strategy|mandate|check size)\b/)) {
    selected.push({
      id: "fund_strategy_analyst",
      label: "Fund strategy analyst",
      run: () => state.fundProfile
        ? JSON.stringify({
            thesis: state.fundProfile.thesisSummary,
            stages: state.fundProfile.stages,
            sectors: state.fundProfile.sectors,
            criteria: state.fundProfile.criteria,
          })
        : `Fund mandate: ${state.mandate}`,
    });
  }

  return selected;
}

export async function streamOrchestratorChat(
  messages: OrchestratorChatMessage[],
  context: OrchestratorChatContext,
  options: ChatOrchestratorOptions,
): Promise<OrchestratorChatMessage> {
  const now = options.now ?? Date.now;
  const runId = `chat_${now().toString(36)}`;
  const directReply = directReplyFor(latestUserMessage(messages));
  if (directReply) {
    const emit = async (event: ChatStreamEvent) => options.onEvent?.(event);
    await emit({ type: "run_started", runId, orchestrator: "investment_orchestrator", agents: [] });
    await emit({ type: "text_delta", runId, delta: directReply.content });
    const message: OrchestratorChatMessage = { role: "assistant", content: directReply.content };
    await emit({ type: "run_completed", runId, message });
    return message;
  }
  const question = latestUserMessage(messages);
  const clarificationFollowUp = isSourcingClarificationFollowUp(messages);
  if (needsSourcingClarification(question)) {
    const emit = async (event: ChatStreamEvent) => options.onEvent?.(event);
    await emit({ type: "run_started", runId, orchestrator: "investment_orchestrator", agents: [] });
    await emit({ type: "text_delta", runId, delta: SOURCING_CLARIFICATION });
    const message: OrchestratorChatMessage = { role: "assistant", content: SOURCING_CLARIFICATION };
    await emit({ type: "run_completed", runId, message });
    return message;
  }
  const founderRequest = detectFounderSourcing(question);
  if (founderRequest) {
    const emit = async (event: ChatStreamEvent) => options.onEvent?.(event);
    await emit({ type: "run_started", runId, orchestrator: "investment_orchestrator", agents: ["founderScout"] });
    if (!options.search) {
      const content = "Founder sourcing is unavailable because the server has no Tavily search client configured.";
      await emit({ type: "text_delta", runId, delta: content });
      const message: OrchestratorChatMessage = { role: "assistant", content };
      await emit({ type: "run_completed", runId, message });
      return message;
    }
    await emit({ type: "agent_started", runId, agent: "founderScout", label: agentLabel("founderScout") });
    try {
      const founder = await sourceFounder(
        { ...founderRequest, fundProfile: options.state.fundProfile },
        { search: options.search, llm: options.llm },
      );
      await emit({
        type: "agent_completed",
        runId,
        agent: "founderScout",
        summary: `${founder.name}: ${founder.score}/100 (${founder.confidence} confidence)`,
      });
      await emit({ type: "founders_sourced", runId, founders: [founder] });
      const content =
        `${founder.name} — ${founder.role}${founder.company ? ` at ${founder.company}` : ""}. ` +
        `Founder score ${founder.score}/100 (${founder.confidence} confidence). ${founder.justification}` +
        (founder.signals.length ? ` Signals: ${founder.signals.join(", ")}.` : "") +
        ` Assembled from ${founder.sources.length} public sources; added to the Founders leads.`;
      await emit({ type: "text_delta", runId, delta: content });
      const message: OrchestratorChatMessage = { role: "assistant", content };
      await emit({ type: "run_completed", runId, message });
      return message;
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      await emit({ type: "agent_failed", runId, agent: "founderScout", error: detail });
      const content = `Founder scout couldn't assemble a profile: ${detail}`;
      await emit({ type: "text_delta", runId, delta: content });
      const message: OrchestratorChatMessage = { role: "assistant", content };
      await emit({ type: "run_completed", runId, message });
      return message;
    }
  }

  if (isSourcingRequest(question) || clarificationFollowUp) {
    const emit = async (event: ChatStreamEvent) => options.onEvent?.(event);
    await emit({
      type: "run_started",
      runId,
      orchestrator: "investment_orchestrator",
      agents: PIPELINE_AGENTS,
    });

    if (!options.search) {
      const content = "Live sourcing is unavailable because the server has no Tavily search client configured.";
      await emit({ type: "text_delta", runId, delta: content });
      const message: OrchestratorChatMessage = { role: "assistant", content };
      await emit({ type: "run_completed", runId, message });
      return message;
    }

    await emit({ type: "agent_started", runId, agent: "discovery", label: agentLabel("discovery") });
    let discovered: Company[];
    try {
      discovered = await discoverCompanies(
        {
          mandate: question,
          fundProfile: options.state.fundProfile,
          queries: [question],
          limit: 10,
          resultsPerQuery: 10,
          excludeNames: options.companies.map((company) => company.name),
        },
        { search: options.search, llm: options.llm },
      );
      await emit({
        type: "agent_completed",
        runId,
        agent: "discovery",
        summary: `Found ${discovered.length} verified candidate${discovered.length === 1 ? "" : "s"} with public sources.`,
      });
    } catch (error) {
      await emit({ type: "agent_failed", runId, agent: "discovery", error: String(error) });
      throw error;
    }

    if (!discovered.length) {
      const content = "Tavily completed the search, but no new verifiable companies were returned after deduplication. Try a narrower sector, geography, or stage.";
      await emit({ type: "text_delta", runId, delta: content });
      const message: OrchestratorChatMessage = { role: "assistant", content };
      await emit({ type: "run_completed", runId, message });
      return message;
    }

    const pipelineState: VCBrainState = {
      mandate: question,
      historicalMemos: options.state.historicalMemos,
      portfolioCompanies: options.state.portfolioCompanies,
      rejectedDeals: options.state.rejectedDeals,
      candidateUniverse: discovered,
      events: [],
    };
    const onAgentEvent = async (event: AgentExecutionEvent) => {
      if (event.status === "started") {
        await emit({ type: "agent_started", runId, agent: event.agent, label: agentLabel(event.agent) });
      } else if (event.status === "completed") {
        await emit({ type: "agent_completed", runId, agent: event.agent, summary: `${agentLabel(event.agent)} completed.` });
      } else {
        await emit({ type: "agent_failed", runId, agent: event.agent, error: event.error ?? "Agent failed" });
      }
    };
    await runPipeline(pipelineState, {
      llm: options.llm,
      competitors: options.competitors,
      maxRetries: 1,
      onAgentEvent,
    });
    mergePipelineState(options.state, pipelineState);
    await emit({ type: "companies_sourced", runId, companies: discovered });

    const scoreById = new Map((pipelineState.sourcedCandidates ?? []).map((candidate) => [candidate.companyId, candidate]));
    const report = {
      query: question,
      discovered: discovered.map((company) => ({
        id: company.id,
        name: company.name,
        description: company.description,
        stage: company.stage,
        sector: company.sector,
        sources: company.sourceRefs,
        fundFit: scoreById.get(company.id)?.fundFitScore,
        reasonsToAdvance: scoreById.get(company.id)?.reasonsToAdvance,
        unresolvedRisks: scoreById.get(company.id)?.unresolvedRisks,
      })),
      finalists: pipelineState.finalists?.map((company) => company.name) ?? [],
      recommendation: pipelineState.committeeDecision,
      memo: pipelineState.investmentMemo,
    };
    const prompt = [
      `Investor sourcing request: ${question}`,
      "",
      "FULL PIPELINE RESULT (only name companies present here):",
      JSON.stringify(report),
      "",
      "Summarize what the live search found, identify the finalists and recommendation, cite source URLs inline, and call out the most important unresolved risks. Explicitly say that the result came from live Tavily discovery followed by the full investment pipeline. Do not add companies or facts absent from the result.",
    ].join("\n");
    let content = "";
    for await (const delta of options.llm.streamText({
      system: "You are the main VC investment orchestrator reporting a completed sourcing pipeline. Be concise, factual, and strictly grounded in the supplied pipeline result.",
      prompt,
    })) {
      content += delta;
      await emit({ type: "text_delta", runId, delta });
    }
    const message: OrchestratorChatMessage = { role: "assistant", content };
    await emit({ type: "run_completed", runId, message });
    return message;
  }
  const specialists = specialistsFor(messages, context, options.state, options.companies);
  const emit = async (event: ChatStreamEvent) => options.onEvent?.(event);
  await emit({ type: "run_started", runId, orchestrator: "investment_orchestrator", agents: specialists.map((agent) => agent.id) });

  const reports: string[] = [];
  for (const specialist of specialists) {
    await emit({ type: "agent_started", runId, agent: specialist.id, label: specialist.label });
    const report = specialist.run();
    reports.push(`[${specialist.label}]\n${report}`);
    await emit({ type: "agent_completed", runId, agent: specialist.id, summary: report.slice(0, 240) });
  }

  const conversation = messages.slice(-8).map((message) => `${message.role}: ${message.content}`).join("\n");
  const prompt = [
    "SPECIALIST REPORTS",
    reports.join("\n\n"),
    "",
    "CONVERSATION",
    conversation,
    "",
    "Answer the investor's latest message naturally and at the level of detail it requests. Do not invent a company or investment task when none was requested. When comparing outcomes, describe candidate explanatory factors, never claim causality from correlation. If evidence is absent, say so.",
  ].join("\n");
  let content = "";
  for await (const delta of options.llm.streamText({
    system: "You are the main VC investment orchestrator and a natural conversational assistant. Synthesize specialist work when present. Be concise, evidence-grounded, and direct. For casual conversation, respond casually without forcing investment analysis.",
    prompt,
  })) {
    content += delta;
    await emit({ type: "text_delta", runId, delta });
  }
  const message: OrchestratorChatMessage = { role: "assistant", content };
  await emit({ type: "run_completed", runId, message });
  return message;
}

export async function runOrchestratorChat(
  messages: OrchestratorChatMessage[],
  context: OrchestratorChatContext,
  options: Omit<ChatOrchestratorOptions, "onEvent">,
): Promise<OrchestratorChatMessage> {
  return streamOrchestratorChat(messages, context, options);
}
