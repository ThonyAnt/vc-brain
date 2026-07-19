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

/**
 * Founder-scout trigger: any LinkedIn profile URL routes straight to the tool;
 * otherwise an explicit "source/score/vet the founder <Name>" phrasing.
 */
export function detectFounderSourcing(message: string): FounderSourcingRequest | undefined {
  const url = message.match(LINKEDIN_URL_RE)?.[0];
  if (url) return { linkedinUrl: url.startsWith("http") ? url : `https://${url}` };
  const text = normalizedMessage(message);
  if (!/\b(source|score|evaluate|vet|scout|look ?up|check out|research)\b/.test(text)) return undefined;
  if (!/\bfounder\b/.test(text)) return undefined;
  const named = message.match(/founder(?:\s+named)?\s+["“]?([A-Z][\w.'-]+(?:\s+[A-Z][\w.'-]+){1,2})["”]?/);
  if (named) return { name: named[1] };
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

  if (focal && (requestedComparison || hasIntent(lower, /\b(compar(?:e|ison)?|similar|analogue|winner|fail(?:ed|ure)?|competitor|graph|axis|axes)\b/))) {
    selected.push({
      id: "analogue_analyst",
      label: "Historical analogue analyst",
      run: () => {
        const targets = requestedComparison
          ? [requestedComparison]
          : [nearestByOutcome(focal, companies, "succeeded"), nearestByOutcome(focal, companies, "failed")]
              .filter((company): company is Company => Boolean(company));
        if (!targets.length) return "No outcome-labelled historical analogues are available.";
        return targets.map((target) => JSON.stringify(compareGraphCompanies(focal, target, context.axes))).join("\n");
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
