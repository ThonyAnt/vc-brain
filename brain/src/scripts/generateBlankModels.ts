import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCompanyWorkbook } from "../models/companyWorkbooks.js";

const here = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(here, "../../../app/public/models");
const blankCompany = {
  id: "blank-company",
  name: "Company",
  oneLiner: "",
  sector: "",
  stage: "",
  location: "",
  summary: "",
  competitors: [],
  reasonsToInvest: [],
  risks: [],
};

await mkdir(outputDir, { recursive: true });
await writeFile(
  resolve(outputDir, "tam-revenue-exit-model-blank.xlsx"),
  await buildCompanyWorkbook("tam-exit", blankCompany),
);
await writeFile(
  resolve(outputDir, "competitive-landscape-template-blank.xlsx"),
  await buildCompanyWorkbook("landscape", blankCompany),
);

console.log(`Wrote blank company model templates to ${outputDir}`);
