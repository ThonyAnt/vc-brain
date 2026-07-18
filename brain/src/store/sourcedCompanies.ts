import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { z } from "zod";
import { CompanySchema, type Company } from "../schemas/company.js";

const SourcedCompaniesSchema = z.array(CompanySchema);

/** Load the portable, repository-backed sourced-company dataset. */
export function loadSourcedCompanies(path: string): Company[] {
  try {
    return SourcedCompaniesSchema.parse(JSON.parse(readFileSync(path, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** Validate and atomically replace the portable sourced-company dataset. */
export function saveSourcedCompanies(path: string, companies: Company[]): void {
  const validated = SourcedCompaniesSchema.parse(companies);
  mkdirSync(dirname(path), { recursive: true });
  const temporaryPath = `${path}.tmp`;
  writeFileSync(temporaryPath, `${JSON.stringify(validated, null, 2)}\n`, "utf8");
  renameSync(temporaryPath, path);
}
