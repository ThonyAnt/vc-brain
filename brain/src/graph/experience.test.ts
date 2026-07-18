import { describe, expect, it } from "vitest";
import { makeCompany, medflow, scribeai } from "../fixtures/sample.js";
import {
  buildExperienceGraph,
  compareGraphCompanies,
  graphAxisValue,
  listGraphAxes,
} from "./experience.js";

const failedWearable = makeCompany({
  id: "co_failed_wearable",
  name: "Failed Wearable",
  historicalStatus: "invested",
  outcome: "failed",
  description: "One-time-purchase FDA wearable without a proprietary data model.",
  attributes: {
    industryPath: ["Healthcare", "Wearables"],
    productCategoryPath: ["Hardware", "Wearable"],
    targetCustomers: ["Patients"],
    technicalApproaches: ["Sensors"],
    disruptionMechanisms: ["Improves diagnosis"],
    regulatoryLabels: ["FDA-regulated"],
    businessModel: "One-time hardware sale",
    operationalModel: "Manufacturing-dependent",
  },
  graphMetrics: { proprietary_data_moat: 0.1 },
});

describe("3D experience graph", () => {
  const companies = [medflow, failedWearable, scribeai];

  it("publishes built-in and custom axes", () => {
    const axes = listGraphAxes(companies);
    expect(axes.some((axis) => axis.key === "revenue")).toBe(true);
    expect(axes.find((axis) => axis.key === "proprietary_data_moat")?.source).toBe("custom");
  });

  it("builds normalized coordinates, outcome colors, and analogue edges", () => {
    const graph = buildExperienceGraph(companies, {
      axes: { x: "revenue", y: "ai_adoption", z: "recurring_revenue" },
      focalCompanyId: scribeai.id,
      now: () => new Date("2026-07-18T00:00:00.000Z"),
    });
    expect(graph.generatedAt).toBe("2026-07-18T00:00:00.000Z");
    expect(graph.nodes.every((node) => Object.values(node.coordinates).every((value) => value >= -1 && value <= 1))).toBe(true);
    expect(graph.nodes.find((node) => node.id === medflow.id)).toMatchObject({ visualRole: "past_success", color: "#2F80FF" });
    expect(graph.nodes.find((node) => node.id === failedWearable.id)).toMatchObject({ visualRole: "past_failure", color: "#FF3158" });
    expect(graph.edges.map((edge) => edge.type)).toEqual(expect.arrayContaining(["nearest_success", "nearest_failure"]));
  });

  it("keeps missing reported data distinct from zero", () => {
    expect(graphAxisValue(failedWearable, "revenue")).toBeNull();
    const graph = buildExperienceGraph(companies);
    expect(graph.nodes.find((node) => node.id === failedWearable.id)?.missingAxes).toContain("x");
  });

  it("returns an explainable, non-causal winner/failure comparison", () => {
    const comparison = compareGraphCompanies(
      medflow,
      failedWearable,
      { x: "technical_feasibility", y: "regulatory_moat", z: "recurring_revenue" },
    );
    expect(comparison.outcomeContrast?.summary).toContain("opposite recorded outcomes");
    expect(comparison.outcomeContrast?.caveat).toContain("not proof");
    expect(comparison.axes.find((axis) => axis.axis.key === "recurring_revenue")?.delta).toBeGreaterThan(0);
    expect(comparison.attributeContrasts).toContainEqual(expect.objectContaining({
      dimension: "Business model",
      sourceValue: "Subscription SaaS",
      targetValue: "One-time hardware sale",
    }));
  });

  it("rejects duplicate or unknown axes", () => {
    expect(() => buildExperienceGraph(companies, { axes: { x: "revenue", y: "revenue" } })).toThrow("must be different");
    expect(() => buildExperienceGraph(companies, { axes: { x: "made_up" } })).toThrow("Unknown graph axis");
  });
});
