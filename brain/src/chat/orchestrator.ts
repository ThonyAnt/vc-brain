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

function latestUserMessage(messages: OrchestratorChatMessage[]): string {
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}

function findMentionedCompany(message: string, companies: Company[], excludedId?: string): Company | undefined {
  const lower = message.toLowerCase();
  return companies
    .filter((company) => company.id !== excludedId)
    .sort((a, b) => b.name.length - a.name.length)
    .find((company) => lower.includes(company.name.toLowerCase()));
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

  if (focal && (requestedComparison || /compar|similar|analogue|winner|fail|compet|graph|axis|axes/.test(lower))) {
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

  if (focal && /risk|diligen|technical|commercial|financial|feasib|regulat/.test(lower)) {
    selected.push({
      id: "diligence_analyst",
      label: "Diligence analyst",
      run: () => {
        const diligence = state.diligence?.[focal.id];
        return diligence ? JSON.stringify(diligence) : `No completed diligence record for ${focal.name}. Flag missing evidence explicitly.`;
      },
    });
  }

  if (!focal || /fund|thesis|criter|portfolio|strategy|mandate|check size/.test(lower)) {
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

  if (!selected.length) {
    selected.push({
      id: "portfolio_memory_analyst",
      label: "Portfolio memory analyst",
      run: () => companies
        .filter((company) => company.historicalStatus !== "external")
        .map(describeCompany)
        .join("\n"),
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
    "Answer the investor's latest question. When comparing outcomes, describe candidate explanatory factors, never claim causality from correlation. If evidence is absent, say so.",
  ].join("\n");
  let content = "";
  for await (const delta of options.llm.streamText({
    system: "You are the main VC investment orchestrator. Synthesize specialist work into a concise, evidence-grounded answer. Be direct, analytical, and explicit about uncertainty.",
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
