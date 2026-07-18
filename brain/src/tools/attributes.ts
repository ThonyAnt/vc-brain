import { CompanyAttributesSchema, type CompanyAttributes } from "../schemas/company.js";
import type { LLMClient } from "../llm/client.js";

const SYSTEM = `You normalize a company description into structured similarity attributes.
Describe WHAT KIND of company it is — never its quality, traction, or investment appeal.
Use concise, reusable labels (e.g. "Clinician-founder", "Subscription SaaS", "Enterprise sales").
Industry and product-category paths go root -> leaf (broad -> narrow).`;

export interface ExtractAttributesInput {
  /** Pitch deck text, memo, website summary, or free-form description. */
  text: string;
  name?: string;
}

/**
 * `extract_company_attributes` — LLM-backed. Converts free text into the
 * normalized similarity schema so a new company can be placed in the graph.
 */
export async function extractCompanyAttributes(
  input: ExtractAttributesInput,
  llm: LLMClient,
): Promise<CompanyAttributes> {
  return llm.generateStructured({
    schema: CompanyAttributesSchema,
    schemaName: "CompanyAttributes",
    system: SYSTEM,
    prompt: `Company${input.name ? ` (${input.name})` : ""}:\n${input.text}\n\nReturn the normalized attributes.`,
  });
}
