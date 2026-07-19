import { readFile } from "node:fs/promises";
import { CompanySchema, type Company } from "../schemas/company.js";
import { normalizeUsd } from "./fundfit.js";
import { HistoricalMemoSchema, type HistoricalMemo } from "../schemas/history.js";
import { MemoExtractionSchema } from "../schemas/ingestion.js";
import type { LLMClient } from "../llm/client.js";
import { slug } from "../util/ids.js";

const SYSTEM = `You ingest a past investment memo into a fund's structured memory. Extract the subject
company, the decision (invested / rejected / passed), the rationale, the identified moat, the 2-3
load-bearing decision drivers (short matchable tags, e.g. "clinician-founder", "unproven distribution"),
the outcome if stated, and normalize the company's similarity attributes (what KIND of company it is).
Do not invent facts not present in the memo.`;

/** invested -> portfolio, rejected -> rejected, passed -> passed. */
function historicalStatusFor(
  decision: "invested" | "rejected" | "passed",
): Company["historicalStatus"] {
  if (decision === "invested") return "portfolio";
  if (decision === "rejected") return "rejected";
  return "passed";
}

export interface IngestedHistory {
  memo: HistoricalMemo;
  /** The subject company, ready to drop into portfolio/rejected/passed history. */
  company: Company;
}

/** Ingest one memo's raw text into a HistoricalMemo + its subject Company. */
export async function ingestMemoText(
  rawText: string,
  llm: LLMClient,
  opts: { id?: string; source?: string } = {},
): Promise<IngestedHistory> {
  const ex = await llm.generateStructured({
    schema: MemoExtractionSchema,
    schemaName: "MemoExtraction",
    system: SYSTEM,
    prompt: `Investment memo:\n${rawText}\n\nExtract the structured history.`,
  });

  const companyId = `co_${slug(ex.companyName)}`;
  const memoId = opts.id ?? `memo_${slug(ex.companyName)}`;

  const memo = HistoricalMemoSchema.parse({
    id: memoId,
    companyId,
    companyName: ex.companyName,
    decision: ex.decision,
    date: ex.date,
    text: rawText,
    rationale: ex.rationale,
    identifiedMoat: ex.identifiedMoat,
    decisionDrivers: ex.decisionDrivers,
    outcome: ex.outcome,
  });

  const company = CompanySchema.parse({
    id: companyId,
    name: ex.companyName,
    description: ex.rationale,
    attributes: ex.attributes,
    sector: ex.sector,
    stage: ex.stage,
    geography: ex.geography,
    // Memos write checks as "2.0" (millions) as often as "2000000".
    checkSizeSought: ex.checkSize != null ? normalizeUsd(ex.checkSize) : undefined,
    historicalStatus: historicalStatusFor(ex.decision),
    outcome: ex.outcome,
    status: ex.decision === "invested" ? "invested" : "passed",
    sourceRefs: opts.source ? [memoId, opts.source] : [memoId],
  });

  return { memo, company };
}

export interface IngestedHistorySet {
  memos: HistoricalMemo[];
  portfolioCompanies: Company[];
  rejectedDeals: Company[];
  passedDeals: Company[];
}

function bucket(results: IngestedHistory[]): IngestedHistorySet {
  const set: IngestedHistorySet = { memos: [], portfolioCompanies: [], rejectedDeals: [], passedDeals: [] };
  for (const { memo, company } of results) {
    set.memos.push(memo);
    if (company.historicalStatus === "portfolio") set.portfolioCompanies.push(company);
    else if (company.historicalStatus === "rejected") set.rejectedDeals.push(company);
    else set.passedDeals.push(company);
  }
  return set;
}

/** Ingest many memo texts, bucketed by decision for direct use as fund history. */
export async function ingestMemoTexts(
  texts: string[],
  llm: LLMClient,
): Promise<IngestedHistorySet> {
  const results = await Promise.all(texts.map((t) => ingestMemoText(t, llm)));
  return bucket(results);
}

/**
 * Ingest memo files from disk (.md / .txt / plain text). PDFs/decks should be
 * converted to text upstream before calling this. Each file's path is recorded
 * as the source reference.
 */
export async function ingestMemoFiles(
  paths: string[],
  llm: LLMClient,
): Promise<IngestedHistorySet> {
  const results = await Promise.all(
    paths.map(async (p) => {
      const text = await readFile(p, "utf8");
      return ingestMemoText(text, llm, { source: p });
    }),
  );
  return bucket(results);
}
