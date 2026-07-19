import ExcelJS from "exceljs";
import { z } from "zod";

const CompetitorSchema = z.object({
  name: z.string(),
  kind: z.enum(["direct", "adjacent", "incumbent", "emerging"]).default("direct"),
  note: z.string().default(""),
});

const CompanyModelSchema = z.object({
  arr: z.number().nonnegative().optional(),
  growthPct: z.number().optional(),
  customers: z.number().nonnegative().optional(),
  valuation: z.number().nonnegative().optional(),
  checkSize: z.number().nonnegative().optional(),
  exitMultiple: z.number().positive().optional(),
  yearsToExit: z.number().positive().optional(),
});

export const CompanyWorkbookInputSchema = z.object({
  id: z.string(),
  name: z.string(),
  oneLiner: z.string().default(""),
  sector: z.string().default(""),
  stage: z.string().default(""),
  location: z.string().default(""),
  raising: z.string().optional(),
  summary: z.string().default(""),
  competitors: z.array(CompetitorSchema).default([]),
  reasonsToInvest: z.array(z.string()).default([]),
  risks: z.array(z.string()).default([]),
  model: CompanyModelSchema.optional(),
});

export type CompanyWorkbookInput = z.infer<typeof CompanyWorkbookInputSchema>;
export type CompanyWorkbookKind = "tam-exit" | "landscape";

export interface CompanyWorkbookPreview {
  kind: CompanyWorkbookKind;
  title: string;
  fileName: string;
  previewSheet: string;
  sheets: string[];
  status: "company-specific";
  notes: string[];
  columns: string[];
  rows: Array<{ label: string; values: Array<string | number | null>; source?: string }>;
}

const COLORS = {
  burgundy: "7F0000",
  salmon: "F4A3A3",
  paleBlue: "D8E5E9",
  yellow: "FFF2CC",
  black: "000000",
  white: "FFFFFF",
  gray: "F2F2F2",
  red: "FF3333",
};

const thinBorder: Partial<ExcelJS.Borders> = {
  top: { style: "thin", color: { argb: COLORS.black } },
  left: { style: "thin", color: { argb: COLORS.black } },
  bottom: { style: "thin", color: { argb: COLORS.black } },
  right: { style: "thin", color: { argb: COLORS.black } },
};

const money = "$#,##0;[Red]-$#,##0";
const percent = "0.0%";
const multiple = "0.0x";

function safeFileName(name: string) {
  return name.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "company";
}

function known(value: number | undefined) {
  return value !== undefined && Number.isFinite(value) && value > 0 ? value : null;
}

function marketUnit(company: CompanyWorkbookInput): string {
  const sector = company.sector.toLowerCase();
  const text = `${company.oneLiner} ${company.summary}`.toLowerCase();
  if (sector.includes("health") || text.includes("hospital") || text.includes("clinical")) {
    return "healthcare organizations";
  }
  if (sector.includes("fintech") || sector.includes("financial") || text.includes("bank")) {
    return "financial institutions";
  }
  if (sector.includes("logistic") || text.includes("shipper") || text.includes("freight")) {
    return "shippers and logistics operators";
  }
  if (sector.includes("security")) return "organizations with security teams";
  if (sector.includes("dev") || text.includes("developer")) return "software teams";
  if (text.includes("consumer") || text.includes("direct-to-consumer")) return "target consumers";
  return "target businesses";
}

function valueOrBlank(value: number | undefined): number | null {
  return known(value);
}

function styleTitle(sheet: ExcelJS.Worksheet, range: string, title: string) {
  sheet.mergeCells(range);
  const cell = sheet.getCell(range.split(":")[0]!);
  cell.value = title;
  cell.font = { bold: true, color: { argb: COLORS.white }, size: 14 };
  cell.alignment = { horizontal: "center", vertical: "middle" };
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.burgundy } };
}

function styleHeader(row: ExcelJS.Row) {
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: COLORS.white } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.burgundy } };
    cell.border = thinBorder;
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
}

function styleInput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.yellow } };
  cell.border = thinBorder;
}

function styleOutput(cell: ExcelJS.Cell) {
  cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.paleBlue } };
  cell.font = { bold: true };
  cell.border = thinBorder;
}

function addReadMe(workbook: ExcelJS.Workbook, company: CompanyWorkbookInput) {
  const sheet = workbook.addWorksheet("README", { views: [{ showGridLines: false }] });
  sheet.columns = [{ width: 24 }, { width: 90 }];
  styleTitle(sheet, "A1:B1", `${company.name} — Company-Specific Model`);
  const rows = [
    ["Purpose", "A deterministic first-pass model populated from the company record."],
    ["Yellow cells", "Required or optional investor inputs. They stay blank when the record has no source-backed value."],
    ["Blue cells", "Formula outputs. Review assumptions before using the model in an investment decision."],
    ["Source policy", "Known company fields are labelled Company record. Derived cells are labelled Formula. No market-size or competitor facts are fabricated."],
    ["Generated for", company.name],
    ["Sector", company.sector || "Not provided"],
    ["Stage", company.stage || "Not provided"],
  ];
  rows.forEach((values, index) => {
    const row = sheet.getRow(index + 3);
    row.values = values;
    row.getCell(1).font = { bold: true };
    row.eachCell((cell) => {
      cell.border = thinBorder;
      cell.alignment = { vertical: "top", wrapText: true };
    });
  });
}

function addTamSheet(workbook: ExcelJS.Workbook, company: CompanyWorkbookInput) {
  const sheet = workbook.addWorksheet("TAM", { views: [{ showGridLines: false, state: "frozen", ySplit: 8 }] });
  sheet.columns = [
    { width: 34 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 22 },
    { width: 28 },
  ];
  styleTitle(sheet, "A1:F1", `${company.name} — Market Sizing`);
  const metadata = [
    ["Company", company.name, "Company record"],
    ["Target market", company.sector || null, company.sector ? "Company record" : "Input required"],
    ["Market unit", marketUnit(company), "Deterministic sector mapping — edit if needed"],
    ["Known ARR", valueOrBlank(company.model?.arr), company.model?.arr ? "Company record" : "Input required"],
    ["Known customers", valueOrBlank(company.model?.customers), company.model?.customers ? "Company record" : "Input required"],
  ];
  metadata.forEach((values, index) => {
    const row = sheet.getRow(index + 3);
    row.getCell(1).value = values[0];
    row.getCell(2).value = values[1];
    row.getCell(3).value = values[2];
    row.getCell(1).font = { bold: true };
    if (index >= 1) styleInput(row.getCell(2));
  });
  sheet.getCell("B6").numFmt = money;
  sheet.getCell("B7").numFmt = "#,##0";

  sheet.getRow(9).values = ["Customer segment", `Count of ${marketUnit(company)}`, "Addressable %", "Annual ACV", "Revenue opportunity", "Source / note"];
  styleHeader(sheet.getRow(9));
  ["Primary segment", "Secondary segment", "Other addressable segment"].forEach((label, offset) => {
    const rowNumber = 10 + offset;
    const row = sheet.getRow(rowNumber);
    row.getCell(1).value = label;
    styleInput(row.getCell(2));
    styleInput(row.getCell(3));
    styleInput(row.getCell(4));
    row.getCell(5).value = { formula: `IF(COUNT(B${rowNumber}:D${rowNumber})<3,"",B${rowNumber}*C${rowNumber}*D${rowNumber})` };
    row.getCell(5).numFmt = money;
    styleOutput(row.getCell(5));
    row.getCell(6).value = "Enter a source or diligence note";
    styleInput(row.getCell(6));
  });
  sheet.getCell("A13").value = "Total addressable market";
  sheet.getCell("A13").font = { bold: true };
  sheet.getCell("E13").value = { formula: 'IF(COUNT(E10:E12)=0,"",SUM(E10:E12))' };
  sheet.getCell("E13").numFmt = money;
  styleOutput(sheet.getCell("E13"));
  sheet.getCell("A15").value = "Implied current market penetration";
  sheet.getCell("E15").value = { formula: 'IF(OR(B6="",E13=""),"",B6/E13)' };
  sheet.getCell("E15").numFmt = percent;
  styleOutput(sheet.getCell("E15"));
  sheet.getCell("A17").value = "Accuracy note";
  sheet.getCell("A17").font = { bold: true, color: { argb: COLORS.red } };
  sheet.mergeCells("B17:F18");
  sheet.getCell("B17").value = `The unit “${marketUnit(company)}” is a starting label, not a claim. Replace it and populate yellow cells with source-backed counts and ACV assumptions.`;
  sheet.getCell("B17").alignment = { wrapText: true, vertical: "top" };
  sheet.getCell("B17").fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.yellow } };
}

function addRevenueBuild(workbook: ExcelJS.Workbook, company: CompanyWorkbookInput) {
  const sheet = workbook.addWorksheet("2 year rev build", { views: [{ showGridLines: false, state: "frozen", ySplit: 6, xSplit: 1 }] });
  sheet.getColumn(1).width = 32;
  for (let col = 2; col <= 10; col += 1) sheet.getColumn(col).width = 15;
  styleTitle(sheet, "A1:J1", `${company.name} — Two-Year Revenue Build`);
  sheet.getCell("A3").value = "Current ARR";
  sheet.getCell("B3").value = valueOrBlank(company.model?.arr);
  sheet.getCell("B3").numFmt = money;
  styleInput(sheet.getCell("B3"));
  sheet.getCell("C3").value = company.model?.arr ? "Company record" : "Input required";
  sheet.getCell("A4").value = "Annual ARR growth assumption";
  sheet.getCell("B4").value = known(company.model?.growthPct) ? company.model!.growthPct! / 100 : null;
  sheet.getCell("B4").numFmt = percent;
  styleInput(sheet.getCell("B4"));
  sheet.getCell("C4").value = company.model?.growthPct ? "Company record" : "Input required";
  sheet.getCell("A5").value = "Current customers";
  sheet.getCell("B5").value = valueOrBlank(company.model?.customers);
  styleInput(sheet.getCell("B5"));
  sheet.getCell("C5").value = company.model?.customers ? "Company record" : "Optional input";

  const quarters = ["Current", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];
  sheet.getRow(7).values = ["Metric", ...quarters];
  styleHeader(sheet.getRow(7));
  sheet.getCell("A8").value = "ARR";
  sheet.getCell("B8").value = { formula: 'IF(B3="","",B3)' };
  for (let col = 3; col <= 10; col += 1) {
    const current = sheet.getCell(8, col);
    const previous = sheet.getCell(8, col - 1).address;
    current.value = { formula: `IF(OR(${previous}="",$B$4=""),"",${previous}*(1+$B$4)^(1/4))` };
  }
  sheet.getCell("A9").value = "Quarterly revenue run-rate";
  for (let col = 2; col <= 10; col += 1) {
    sheet.getCell(8, col).numFmt = money;
    sheet.getCell(9, col).value = { formula: `IF(${sheet.getCell(8, col).address}="","",${sheet.getCell(8, col).address}/4)` };
    sheet.getCell(9, col).numFmt = money;
    styleOutput(sheet.getCell(8, col));
    styleOutput(sheet.getCell(9, col));
  }
  sheet.mergeCells("A12:J13");
  sheet.getCell("A12").value = "Projection uses the visible annual growth assumption compounded quarterly. Replace it with a sourced or IC-approved forecast before circulation.";
  sheet.getCell("A12").alignment = { wrapText: true, vertical: "top" };
  sheet.getCell("A12").fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.yellow } };
}

function addExitScenario(workbook: ExcelJS.Workbook, company: CompanyWorkbookInput) {
  const sheet = workbook.addWorksheet("Exit Scenario", { views: [{ showGridLines: false }] });
  sheet.columns = [{ width: 34 }, { width: 20 }, { width: 24 }, { width: 50 }];
  styleTitle(sheet, "A1:D1", `${company.name} — Exit Scenario`);
  const inputs: Array<[string, number | null, string, string]> = [
    ["Entry valuation", valueOrBlank(company.model?.valuation), money, company.model?.valuation ? "Company record" : "Input required"],
    ["Investment amount", valueOrBlank(company.model?.checkSize), money, company.model?.checkSize ? "Company record" : "Input required"],
    ["Current ARR", valueOrBlank(company.model?.arr), money, company.model?.arr ? "Company record" : "Input required"],
    ["Annual ARR growth", known(company.model?.growthPct) ? company.model!.growthPct! / 100 : null, percent, company.model?.growthPct ? "Company record" : "Input required"],
    ["Exit revenue multiple", valueOrBlank(company.model?.exitMultiple), multiple, company.model?.exitMultiple ? "Company record" : "Input required"],
    ["Years to exit", valueOrBlank(company.model?.yearsToExit), "0.0", company.model?.yearsToExit ? "Company record" : "Input required"],
  ];
  sheet.getRow(3).values = ["Assumption", "Value", "Source", "Notes"];
  styleHeader(sheet.getRow(3));
  inputs.forEach(([label, value, format, source], index) => {
    const row = sheet.getRow(index + 4);
    row.values = [label, value, source, source === "Input required" ? "Populate before relying on outputs" : null];
    row.getCell(2).numFmt = format;
    styleInput(row.getCell(2));
  });
  sheet.getRow(11).values = ["Output", "Value", "Method", null];
  styleHeader(sheet.getRow(11));
  const outputs: Array<[string, string, string, string]> = [
    ["Exit ARR", 'IF(COUNT(B6,B7,B9)<3,"",B6*(1+B7)^B9)', money, "Current ARR × growth over years"],
    ["Implied exit valuation", 'IF(COUNT(B12,B8)<2,"",B12*B8)', money, "Exit ARR × revenue multiple"],
    ["Entry ownership", 'IF(COUNT(B4,B5)<2,"",B5/B4)', percent, "Investment ÷ entry valuation"],
    ["Gross proceeds", 'IF(COUNT(B13,B14)<2,"",B13*B14)', money, "Exit valuation × ownership; dilution not modelled"],
    ["Gross MOIC", 'IF(COUNT(B15,B5)<2,"",B15/B5)', multiple, "Gross proceeds ÷ investment"],
  ];
  outputs.forEach(([label, formula, format, method], index) => {
    const row = sheet.getRow(index + 12);
    row.values = [label, { formula }, method, null];
    row.getCell(2).numFmt = format;
    styleOutput(row.getCell(2));
  });
  sheet.mergeCells("A19:D20");
  sheet.getCell("A19").value = "This simplified model intentionally excludes future rounds, option-pool expansion, liquidation preferences, taxes, and fees. Add dilution before using the ownership or return outputs for an IC decision.";
  sheet.getCell("A19").alignment = { wrapText: true, vertical: "top" };
  sheet.getCell("A19").fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.yellow } };
}

function addTamPenetration(workbook: ExcelJS.Workbook, company: CompanyWorkbookInput) {
  const sheet = workbook.addWorksheet("TAM Penetration Required", { views: [{ showGridLines: false }] });
  sheet.columns = [{ width: 38 }, { width: 22 }, { width: 28 }, { width: 52 }];
  styleTitle(sheet, "A1:D1", `${company.name} — TAM Penetration Required`);
  sheet.getRow(3).values = ["Input / output", "Value", "Source", "Interpretation"];
  styleHeader(sheet.getRow(3));
  const rows: Array<[string, ExcelJS.CellValue, string, string, string]> = [
    ["Total addressable market", { formula: "TAM!E13" }, money, "TAM sheet", "Requires source-backed market inputs"],
    ["Exit ARR", { formula: "'Exit Scenario'!B12" }, money, "Exit Scenario", "Projected company revenue at exit"],
    ["Required TAM penetration", { formula: 'IF(COUNT(B4,B5)<2,"",B5/B4)' }, percent, "Formula", "Exit ARR ÷ TAM"],
  ];
  rows.forEach(([label, value, format, source, note], index) => {
    const row = sheet.getRow(index + 4);
    row.values = [label, value, source, note];
    row.getCell(2).numFmt = format;
    styleOutput(row.getCell(2));
  });
}

function addLandscape(workbook: ExcelJS.Workbook, company: CompanyWorkbookInput) {
  const sheet = workbook.addWorksheet("Final Competitive Landscape", { views: [{ showGridLines: false, state: "frozen", xSplit: 1, ySplit: 3 }] });
  const competitors = company.competitors.slice(0, 15);
  sheet.getColumn(1).width = 30;
  for (let col = 2; col <= competitors.length + 2; col += 1) sheet.getColumn(col).width = 24;
  const lastColumn = sheet.getColumn(competitors.length + 2).letter;
  styleTitle(sheet, `A1:${lastColumn}1`, `${company.name} — Competitive Landscape`);
  sheet.getRow(3).values = ["Comparison field", company.name, ...competitors.map((competitor) => competitor.name)];
  styleHeader(sheet.getRow(3));

  const mainMoat = company.reasonsToInvest[0] ?? null;
  const rows: Array<[string, string | null, (competitor: z.infer<typeof CompetitorSchema>) => string | null]> = [
    ["Relationship", "Main company", (competitor) => competitor.kind],
    ["Category / sector", company.sector || null, () => null],
    ["Business model", null, () => null],
    ["Primary use cases / users", company.oneLiner, (competitor) => competitor.note],
    ["Core product capabilities", company.summary, (competitor) => competitor.note],
    ["Workflow completeness", null, () => null],
    ["Technical infrastructure", null, () => null],
    ["Deployment & delivery model", null, () => null],
    ["Target customer / ICP", null, () => null],
    ["Key moat / differentiator", mainMoat, (competitor) => competitor.note],
    ["Pricing / cost model", null, () => null],
    ["Latest funding", (company.raising ?? company.stage) || null, () => null],
    ["Total funding", null, () => null],
    ["Valuation", known(company.model?.valuation) ? `$${Math.round(company.model!.valuation!).toLocaleString("en-US")}` : null, () => null],
    ["Key investors", null, () => null],
    ["Evidence status", "Company record", (competitor) => competitor.note ? "Sourcing record" : "Input required"],
  ];
  rows.forEach(([label, mainValue, competitorValue], offset) => {
    const row = sheet.getRow(offset + 4);
    row.getCell(1).value = label;
    row.getCell(1).font = { bold: true };
    row.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: offset % 2 ? COLORS.gray : COLORS.white } };
    row.getCell(2).value = mainValue || null;
    competitors.forEach((competitor, index) => {
      row.getCell(index + 3).value = competitorValue(competitor) || null;
    });
    if ([3, 4, 9].includes(offset)) row.height = 60;
    for (let colNumber = 1; colNumber <= competitors.length + 2; colNumber += 1) {
      const cell = row.getCell(colNumber);
      cell.border = thinBorder;
      cell.alignment = { vertical: "top", wrapText: true };
      if (colNumber > 1 && !cell.value) styleInput(cell);
      else if (colNumber > 1 && offset % 2) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.gray } };
    }
  });
  sheet.autoFilter = { from: "A3", to: `${lastColumn}3` };
}

function configureWorkbook(workbook: ExcelJS.Workbook, company: CompanyWorkbookInput) {
  workbook.creator = "VC Brain";
  workbook.company = company.name;
  workbook.title = `${company.name} diligence model`;
  workbook.subject = "Company-specific venture diligence workbook";
  workbook.created = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;
}

function readmePreview(company: CompanyWorkbookInput) {
  return {
    columns: ["Value"],
    rows: [
      { label: "Purpose", values: ["A deterministic first-pass model populated from the company record."] },
      { label: "Yellow cells", values: ["Required or optional investor inputs; blank when no source-backed value exists."] },
      { label: "Blue cells", values: ["Formula outputs; review assumptions before using the model in an investment decision."] },
      { label: "Source policy", values: ["Known fields are labelled Company record. No market-size or competitor facts are fabricated."] },
      { label: "Generated for", values: [company.name] },
      { label: "Sector", values: [company.sector || null] },
      { label: "Stage", values: [company.stage || null] },
    ],
  };
}

function projectedExit(company: CompanyWorkbookInput) {
  const arr = known(company.model?.arr);
  const growth = known(company.model?.growthPct);
  const years = known(company.model?.yearsToExit);
  const multipleValue = known(company.model?.exitMultiple);
  const valuation = known(company.model?.valuation);
  const check = known(company.model?.checkSize);
  const exitArr = arr && growth && years ? arr * (1 + growth / 100) ** years : null;
  const exitValuation = exitArr && multipleValue ? exitArr * multipleValue : null;
  const ownership = valuation && check ? check / valuation : null;
  const proceeds = exitValuation && ownership ? exitValuation * ownership : null;
  const moic = proceeds && check ? proceeds / check : null;
  return { exitArr, exitValuation, ownership, proceeds, moic };
}

export function buildCompanyWorkbookPreview(
  kind: CompanyWorkbookKind,
  raw: unknown,
  requestedSheet?: string,
): CompanyWorkbookPreview {
  const company = CompanyWorkbookInputSchema.parse(raw);
  if (kind === "landscape") {
    const competitors = company.competitors.slice(0, 15);
    const sheets = ["README", "Final Competitive Landscape"];
    const previewSheet = sheets.includes(requestedSheet ?? "") ? requestedSheet! : "Final Competitive Landscape";
    const content = previewSheet === "README"
      ? readmePreview(company)
      : {
          columns: [company.name, ...competitors.map((competitor) => competitor.name)],
          rows: [
            { label: "Relationship", values: ["Main company", ...competitors.map((competitor) => competitor.kind)], source: "Company record" },
            { label: "Primary use case", values: [company.oneLiner || null, ...competitors.map((competitor) => competitor.note || null)], source: "Company and sourcing records" },
            { label: "Key moat / differentiator", values: [company.reasonsToInvest[0] ?? null, ...competitors.map((competitor) => competitor.note || null)], source: "Company and sourcing records" },
            { label: "Latest funding", values: [company.raising ?? company.stage ?? null, ...competitors.map(() => null)], source: "Company record" },
            { label: "Valuation", values: [known(company.model?.valuation), ...competitors.map(() => null)], source: "Company record" },
          ],
        };
    return {
      kind,
      title: `${company.name} — Competitive Landscape`,
      fileName: `${safeFileName(company.name)}-competitive-landscape.xlsx`,
      previewSheet,
      sheets,
      status: "company-specific",
      notes: [
        `${competitors.length} named competitor${competitors.length === 1 ? "" : "s"} loaded from the company record.`,
        "Unsupported competitor facts remain blank yellow cells.",
      ],
      ...content,
    };
  }

  const sheets = ["README", "TAM", "2 year rev build", "Exit Scenario", "TAM Penetration Required"];
  const previewSheet = sheets.includes(requestedSheet ?? "") ? requestedSheet! : "TAM";
  const exit = projectedExit(company);
  let content: Pick<CompanyWorkbookPreview, "columns" | "rows">;
  if (previewSheet === "README") {
    content = readmePreview(company);
  } else if (previewSheet === "2 year rev build") {
    const quarterLabels = ["Current", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];
    const arr = known(company.model?.arr);
    const growth = known(company.model?.growthPct);
    const projectedArr = quarterLabels.map((_, index) => (
      arr && growth ? arr * (1 + growth / 100) ** (index / 4) : index === 0 ? arr : null
    ));
    content = {
      columns: quarterLabels,
      rows: [
        { label: "ARR", values: projectedArr, source: "Current ARR + annual growth formula" },
        { label: "Quarterly revenue run-rate", values: projectedArr.map((value) => value ? value / 4 : null), source: "ARR ÷ 4" },
      ],
    };
  } else if (previewSheet === "Exit Scenario") {
    content = {
      columns: ["Value", "Source / method"],
      rows: [
        { label: "Entry valuation", values: [known(company.model?.valuation), company.model?.valuation ? "Company record" : null] },
        { label: "Investment amount", values: [known(company.model?.checkSize), company.model?.checkSize ? "Company record" : null] },
        { label: "Current ARR", values: [known(company.model?.arr), company.model?.arr ? "Company record" : null] },
        { label: "Annual ARR growth", values: [known(company.model?.growthPct), company.model?.growthPct ? "Company record" : null] },
        { label: "Exit revenue multiple", values: [known(company.model?.exitMultiple), company.model?.exitMultiple ? "Company record" : null] },
        { label: "Years to exit", values: [known(company.model?.yearsToExit), company.model?.yearsToExit ? "Company record" : null] },
        { label: "Exit ARR", values: [exit.exitArr, "Current ARR × growth over years"] },
        { label: "Implied exit valuation", values: [exit.exitValuation, "Exit ARR × revenue multiple"] },
        { label: "Entry ownership", values: [exit.ownership, "Investment ÷ entry valuation"] },
        { label: "Gross proceeds", values: [exit.proceeds, "Exit valuation × ownership; dilution not modelled"] },
        { label: "Gross MOIC", values: [exit.moic, "Gross proceeds ÷ investment"] },
      ],
    };
  } else if (previewSheet === "TAM Penetration Required") {
    content = {
      columns: ["Value", "Source / interpretation"],
      rows: [
        { label: "Total addressable market", values: [null, "Requires source-backed TAM inputs"] },
        { label: "Exit ARR", values: [exit.exitArr, "Exit Scenario formula"] },
        { label: "Required TAM penetration", values: [null, "Calculated after TAM inputs are supplied"] },
      ],
    };
  } else {
    content = {
      columns: ["Company-specific value", "Status"],
      rows: [
        { label: "Company", values: [company.name, "Known"], source: "Company record" },
        { label: "Target market", values: [company.sector || null, company.sector ? "Known" : "Input required"], source: "Company record" },
        { label: "Market unit", values: [marketUnit(company), "Editable mapping"], source: "Deterministic sector mapping" },
        { label: "Current ARR", values: [known(company.model?.arr), company.model?.arr ? "Known" : "Input required"], source: "Company record" },
        { label: "Annual growth", values: [known(company.model?.growthPct), company.model?.growthPct ? "Known" : "Input required"], source: "Company record" },
        { label: "Entry valuation", values: [known(company.model?.valuation), company.model?.valuation ? "Known" : "Input required"], source: "Company record" },
        { label: "Investment amount", values: [known(company.model?.checkSize), company.model?.checkSize ? "Known" : "Input required"], source: "Company record" },
        { label: "Exit multiple", values: [known(company.model?.exitMultiple), company.model?.exitMultiple ? "Known" : "Input required"], source: "Company record" },
        { label: "Years to exit", values: [known(company.model?.yearsToExit), company.model?.yearsToExit ? "Known" : "Input required"], source: "Company record" },
        { label: "TAM segment counts + ACV", values: [null, "Input required"], source: "Not available in company record" },
      ],
    };
  }

  return {
    kind,
    title: `${company.name} — TAM + Revenue + Exit Model`,
    fileName: `${safeFileName(company.name)}-tam-revenue-exit-model.xlsx`,
    previewSheet,
    sheets,
    status: "company-specific",
    notes: [
      `Market unit starts as “${marketUnit(company)}” and is editable.`,
      "Yellow cells are missing or investor-controlled assumptions; blue cells are formulas.",
    ],
    ...content,
  };
}

export async function buildCompanyWorkbook(kind: CompanyWorkbookKind, raw: unknown): Promise<Buffer> {
  const company = CompanyWorkbookInputSchema.parse(raw);
  const workbook = new ExcelJS.Workbook();
  configureWorkbook(workbook, company);
  addReadMe(workbook, company);
  if (kind === "landscape") {
    addLandscape(workbook, company);
  } else {
    addTamSheet(workbook, company);
    addRevenueBuild(workbook, company);
    addExitScenario(workbook, company);
    addTamPenetration(workbook, company);
  }
  const bytes = await workbook.xlsx.writeBuffer();
  return Buffer.from(bytes);
}
