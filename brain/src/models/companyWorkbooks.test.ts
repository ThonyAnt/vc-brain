import ExcelJS from "exceljs";
import { describe, expect, it } from "vitest";
import { buildCompanyWorkbook, buildCompanyWorkbookPreview } from "./companyWorkbooks.js";

const aureline = {
  id: "s-aureline",
  name: "Aureline",
  oneLiner: "AI revenue-operations copilot for B2B SaaS.",
  sector: "B2B SaaS",
  stage: "Seed",
  location: "New York",
  raising: "$3.5M at $18M cap",
  summary: "Closes the quote-to-cash loop.",
  reasonsToInvest: ["Fast product velocity"],
  risks: ["Incumbent bundling"],
  competitors: [
    { name: "Salesforce Revenue Cloud", kind: "incumbent", note: "Bundled CPQ and billing." },
    { name: "Tabs", kind: "direct", note: "AI revenue automation." },
  ],
  model: {
    arr: 340_000,
    growthPct: 18,
    valuation: 18_000_000,
    checkSize: 2_500_000,
    exitMultiple: 8,
    yearsToExit: 7,
  },
};

describe("company-specific workbooks", () => {
  it("maps sourced facts into the TAM, revenue, and exit workbook without inventing TAM counts", async () => {
    const bytes = await buildCompanyWorkbook("tam-exit", aureline);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(bytes as unknown as ExcelJS.Buffer);

    expect(workbook.worksheets.map((sheet) => sheet.name)).toEqual([
      "README",
      "TAM",
      "2 year rev build",
      "Exit Scenario",
      "TAM Penetration Required",
    ]);
    const tam = workbook.getWorksheet("TAM")!;
    expect(tam.getCell("B3").value).toBe("Aureline");
    expect(tam.getCell("B5").value).toBe("target businesses");
    expect(tam.getCell("B6").value).toBe(340_000);
    expect(tam.getCell("B10").value).toBeNull();
    expect(tam.getCell("D10").value).toBeNull();

    const revenue = workbook.getWorksheet("2 year rev build")!;
    expect(revenue.getCell("B3").value).toBe(340_000);
    expect(revenue.getCell("B4").value).toBe(0.18);
    expect(revenue.getCell("C8").value).toMatchObject({ formula: expect.stringContaining("^(1/4)") });

    const exit = workbook.getWorksheet("Exit Scenario")!;
    expect(exit.getCell("B4").value).toBe(18_000_000);
    expect(exit.getCell("B5").value).toBe(2_500_000);
    expect(exit.getCell("B8").value).toBe(8);
    expect(exit.getCell("B9").value).toBe(7);
    expect(exit.getCell("B16").value).toMatchObject({ formula: expect.stringContaining("B15/B5") });
  });

  it("loads only recorded competitors into the landscape and leaves unsupported facts blank", async () => {
    const bytes = await buildCompanyWorkbook("landscape", aureline);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(bytes as unknown as ExcelJS.Buffer);
    const landscape = workbook.getWorksheet("Final Competitive Landscape")!;

    expect(landscape.getRow(3).values).toEqual([undefined, "Comparison field", "Aureline", "Salesforce Revenue Cloud", "Tabs"]);
    expect(landscape.getCell("B4").value).toBe("Main company");
    expect(landscape.getCell("C4").value).toBe("incumbent");
    expect(landscape.getCell("D4").value).toBe("direct");
    expect(landscape.getCell("B6").value).toBeNull();
    expect(landscape.getCell("C6").value).toBeNull();
  });

  it("uses sector-aware market units instead of a physician placeholder", () => {
    const healthcare = buildCompanyWorkbookPreview("tam-exit", {
      ...aureline,
      id: "health",
      name: "Clinical Co",
      sector: "Healthcare AI",
    });
    const unit = healthcare.rows.find((row) => row.label === "Market unit")?.values[0];
    expect(unit).toBe("healthcare organizations");
    expect(JSON.stringify(healthcare)).not.toContain("physician");
  });

  it("previews every worksheet tab in both generated workbooks", () => {
    const tamSheets = ["README", "TAM", "2 year rev build", "Exit Scenario", "TAM Penetration Required"];
    for (const sheet of tamSheets) {
      const preview = buildCompanyWorkbookPreview("tam-exit", aureline, sheet);
      expect(preview.previewSheet).toBe(sheet);
      expect(preview.rows.length).toBeGreaterThan(0);
      expect(preview.columns.length).toBeGreaterThan(0);
    }

    const revenue = buildCompanyWorkbookPreview("tam-exit", aureline, "2 year rev build");
    expect(revenue.columns).toEqual(["Current", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"]);
    expect(revenue.rows[0]?.values[0]).toBe(340_000);
    expect(revenue.rows[0]?.values[4]).toBeCloseTo(401_200, -1);

    const exit = buildCompanyWorkbookPreview("tam-exit", aureline, "Exit Scenario");
    expect(exit.rows.find((row) => row.label === "Gross MOIC")?.values[0]).toBeTypeOf("number");

    for (const sheet of ["README", "Final Competitive Landscape"]) {
      const preview = buildCompanyWorkbookPreview("landscape", aureline, sheet);
      expect(preview.previewSheet).toBe(sheet);
      expect(preview.rows.length).toBeGreaterThan(0);
    }
  });
});
