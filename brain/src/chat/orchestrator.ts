import type { LLMClient } from "../llm/client.js";
import type { Company } from "../schemas/company.js";
import type { VCBrainState } from "../state.js";
import { compareGraphCompanies, type GraphAxisSelection } from "../graph/experience.js";
import { companySimilarity } from "../tools/similarity.js";
import { describeCompany } from "../agents/util.js";

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
  | { type: "text_delta"; runId: string; delta: string }
  | { type: "run_completed"; runId: string; message: OrchestratorChatMessage };

export interface ChatOrchestratorOptions {
  state: VCBrainState;
  companies: Company[];
  llm: LLMClient;
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
