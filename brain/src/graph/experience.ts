import type { Company } from "../schemas/company.js";
import {
  companySimilarity,
  type EmbeddingMap,
} from "../tools/similarity.js";

export type AxisScale = "linear" | "log" | "score";
export type AxisDirection = "ascending" | "descending";

export interface GraphAxisDefinition {
  key: string;
  label: string;
  description: string;
  unit?: string;
  scale: AxisScale;
  direction: AxisDirection;
  /** Whether the value is directly reported or deterministically derived. */
  source: "reported" | "derived" | "custom";
}

export interface GraphAxisSelection {
  x: string;
  y: string;
  z: string;
}

export type GraphVisualRole =
  | "past_success"
  | "past_failure"
  | "active_portfolio"
  | "passed"
  | "candidate"
  | "external";

export interface ExperienceGraphNode {
  id: string;
  name: string;
  sector?: string;
  stage?: string;
  historicalStatus: Company["historicalStatus"];
  outcome: Company["outcome"];
  visualRole: GraphVisualRole;
  color: string;
  coordinates: { x: number; y: number; z: number };
  values: Record<"x" | "y" | "z", number | null>;
  normalizedValues: Record<"x" | "y" | "z", number>;
  missingAxes: Array<"x" | "y" | "z">;
}

export type AnalogueEdgeType =
  | "nearest_success"
  | "nearest_failure"
  | "nearest_external";

export interface ExperienceGraphEdge {
  id: string;
  source: string;
  target: string;
  type: AnalogueEdgeType;
  similarity: number;
  sharedAttributes: string[];
  keyDifferences: string[];
}

export interface ExperienceGraph {
  axes: GraphAxisSelection;
  axisDefinitions: Record<"x" | "y" | "z", GraphAxisDefinition>;
  nodes: ExperienceGraphNode[];
  edges: ExperienceGraphEdge[];
  focalCompanyId?: string;
  generatedAt: string;
}

export interface CompanyComparison {
  source: Pick<Company, "id" | "name" | "historicalStatus" | "outcome" | "description">;
  target: Pick<Company, "id" | "name" | "historicalStatus" | "outcome" | "description">;
  similarity: {
    overall: number;
    dimensions: ReturnType<typeof companySimilarity>["dimensions"];
    sharedAttributes: string[];
    keyDifferences: string[];
  };
  axes: Array<{
    axis: GraphAxisDefinition;
    sourceValue: number | null;
    targetValue: number | null;
    delta: number | null;
  }>;
  attributeContrasts: Array<{
    dimension: string;
    sourceValue: string;
    targetValue: string;
  }>;
  outcomeContrast?: {
    summary: string;
    candidateFactors: string[];
    caveat: string;
  };
}

const BUILTIN_AXES: GraphAxisDefinition[] = [
  { key: "revenue", label: "Annual recurring revenue", description: "Latest reported ARR.", unit: "USD", scale: "log", direction: "ascending", source: "reported" },
  { key: "revenue_growth", label: "Revenue growth", description: "Latest reported annual ARR growth rate.", unit: "x", scale: "linear", direction: "ascending", source: "reported" },
  { key: "gross_margin", label: "Gross margin", description: "Latest reported gross margin.", unit: "%", scale: "linear", direction: "ascending", source: "reported" },
  { key: "retention", label: "Net revenue retention", description: "Latest reported NRR.", unit: "%", scale: "linear", direction: "ascending", source: "reported" },
  { key: "customer_count", label: "Customers", description: "Latest reported customer count.", scale: "log", direction: "ascending", source: "reported" },
  { key: "valuation", label: "Valuation", description: "Latest known company valuation.", unit: "USD", scale: "log", direction: "ascending", source: "reported" },
  { key: "ai_adoption", label: "AI adoption", description: "How central AI/ML is to the product approach, derived from normalized company attributes.", scale: "score", direction: "ascending", source: "derived" },
  { key: "disruptiveness", label: "Legacy disruption", description: "Degree to which the product replaces an incumbent product, workflow, or manual labor.", scale: "score", direction: "ascending", source: "derived" },
  { key: "recurring_revenue", label: "Recurring revenue model", description: "Strength of recurring or contracted revenue in the business model.", scale: "score", direction: "ascending", source: "derived" },
  { key: "regulatory_moat", label: "Regulatory moat", description: "Strength of regulatory or clinical-validation barriers encoded in the company profile.", scale: "score", direction: "ascending", source: "derived" },
  { key: "technical_feasibility", label: "Technical feasibility", description: "Estimated delivery feasibility from the operational and technical approach (not technical diligence).", scale: "score", direction: "ascending", source: "derived" },
  { key: "proprietary_data", label: "Proprietary data moat", description: "Evidence that proprietary data is central to the product or moat.", scale: "score", direction: "ascending", source: "derived" },
  { key: "competition_intensity", label: "Competition intensity", description: "Competitive pressure inferred from known competitors and incumbent-replacement signals.", scale: "score", direction: "ascending", source: "derived" },
];

const BUILTIN_BY_KEY = new Map(BUILTIN_AXES.map((axis) => [axis.key, axis]));
const DEFAULT_AXES: GraphAxisSelection = {
  x: "revenue",
  y: "ai_adoption",
  z: "disruptiveness",
};

function text(c: Company): string {
  const a = c.attributes;
  return [
    c.name,
    c.description,
    a.productDescription,
    a.technicalApproaches.join(" "),
    a.disruptionMechanisms.join(" "),
    a.regulatoryLabels.join(" "),
    a.operationalModel,
    a.businessModel,
  ].join(" ").toLowerCase();
}

function containsAny(value: string, terms: string[]): boolean {
  return terms.some((term) => value.includes(term));
}

/** Raw value for an axis. `null` deliberately distinguishes missing data from zero. */
export function graphAxisValue(company: Company, key: string): number | null {
  const m = company.metrics;
  switch (key) {
    case "revenue": return m?.arr ?? null;
    case "revenue_growth": return m?.arrGrowthRate ?? null;
    case "gross_margin": return m?.grossMargin ?? null;
    case "retention": return m?.nrr ?? null;
    case "customer_count": return m?.customers ?? null;
    case "valuation": return company.valuation ?? null;
  }

  const t = text(company);
  const a = company.attributes;
  switch (key) {
    case "ai_adoption": {
      if (containsAny(t, ["foundation model", "generative ai", "machine learning", "computer vision", " ai "])) return 0.9;
      if (containsAny(t, ["automation", "algorithm", "data aggregation"])) return 0.55;
      return 0.15;
    }
    case "disruptiveness": {
      if (containsAny(t, ["replaces an incumbent", "replaces manual", "new workflow"])) return 0.9;
      if (containsAny(t, ["changes distribution", "reduces cost", "improves diagnosis"])) return 0.7;
      return a.disruptionMechanisms.length ? 0.5 : 0.2;
    }
    case "recurring_revenue": {
      const model = a.businessModel.toLowerCase();
      if (containsAny(model, ["subscription", "saas", "recurring"])) return 1;
      if (containsAny(model, ["licensing", "usage"])) return 0.7;
      if (containsAny(model, ["transaction", "marketplace"])) return 0.45;
      if (containsAny(model, ["advertising", "one-time", "hardware sale"])) return 0.15;
      return 0.35;
    }
    case "regulatory_moat": {
      if (containsAny(t, ["fda", "patent", "regulated"])) return 0.9;
      if (containsAny(t, ["clinical-validation", "clinical validation"])) return 0.65;
      return 0.15;
    }
    case "technical_feasibility": {
      let score = containsAny(a.operationalModel.toLowerCase(), ["pure software"]) ? 0.85 : 0.5;
      if (containsAny(t, ["manufacturing", "hardware", "biotech"])) score -= 0.25;
      if (containsAny(t, ["fda", "clinical-validation"])) score -= 0.1;
      return Math.max(0, Math.min(1, score));
    }
    case "proprietary_data": {
      if (containsAny(t, ["proprietary data", "unique dataset", "data network", "data flywheel"])) return 0.95;
      if (containsAny(t, ["data aggregation", "clinical data", "patient data"])) return 0.65;
      return 0.2;
    }
    case "competition_intensity": {
      const countScore = Math.min(1, company.competitors.length / 5);
      const incumbent = containsAny(t, ["incumbent", "replaces an incumbent"]) ? 0.8 : 0.25;
      return Math.max(countScore, incumbent);
    }
    default: return company.graphMetrics?.[key] ?? null;
  }
}

export function listGraphAxes(companies: Company[]): GraphAxisDefinition[] {
  const customKeys = new Set(companies.flatMap((company) => Object.keys(company.graphMetrics ?? {})));
  return [
    ...BUILTIN_AXES,
    ...[...customKeys]
      .filter((key) => !BUILTIN_BY_KEY.has(key))
      .sort()
      .map((key): GraphAxisDefinition => ({
        key,
        label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: "Fund-specific normalized graph dimension.",
        scale: "score",
        direction: "ascending",
        source: "custom",
      })),
  ];
}

function roleFor(company: Company, candidateIds?: ReadonlySet<string>, externalIds?: ReadonlySet<string>): GraphVisualRole {
  const invested = company.historicalStatus === "portfolio" || company.historicalStatus === "invested";
  if (invested && company.outcome === "succeeded") return "past_success";
  if (invested && company.outcome === "failed") return "past_failure";
  if (invested) return "active_portfolio";
  if (company.historicalStatus === "rejected" || company.historicalStatus === "passed") return "passed";
  if (externalIds?.has(company.id)) return "external";
  if (candidateIds?.has(company.id) || company.status === "sourced") return "candidate";
  return "external";
}

const ROLE_COLORS: Record<GraphVisualRole, string> = {
  past_success: "#2F80FF",
  past_failure: "#FF3158",
  active_portfolio: "#63A4FF",
  passed: "#FF9F43",
  candidate: "#B9F227",
  external: "#8B93A7",
};

function normalize(values: Array<number | null>, scale: AxisScale): number[] {
  const transformed = values.map((value) => {
    if (value === null || !Number.isFinite(value)) return null;
    return scale === "log" ? Math.log10(Math.max(0, value) + 1) : value;
  });
  const present = transformed.filter((value): value is number => value !== null);
  if (!present.length) return transformed.map(() => 0.5);
  const min = Math.min(...present);
  const max = Math.max(...present);
  if (max === min) return transformed.map((value) => value === null ? 0.5 : 0.5);
  return transformed.map((value) => value === null ? 0.5 : (value - min) / (max - min));
}

function axisDefinition(key: string, companies: Company[]): GraphAxisDefinition {
  const axis = listGraphAxes(companies).find((candidate) => candidate.key === key);
  if (!axis) throw new Error(`Unknown graph axis '${key}'`);
  return axis;
}

function nearestEdge(
  source: Company,
  targets: Company[],
  type: AnalogueEdgeType,
  embeddings?: EmbeddingMap,
): ExperienceGraphEdge | undefined {
  const match = targets
    .filter((target) => target.id !== source.id)
    .map((target) => ({ target, result: companySimilarity(source, target, embeddings) }))
    .sort((a, b) => b.result.overall - a.result.overall)[0];
  if (!match) return undefined;
  return {
    id: `${type}:${source.id}:${match.target.id}`,
    source: source.id,
    target: match.target.id,
    type,
    similarity: match.result.overall,
    sharedAttributes: match.result.sharedAttributes,
    keyDifferences: match.result.keyDifferences,
  };
}

export function buildExperienceGraph(
  companies: Company[],
  options: {
    axes?: Partial<GraphAxisSelection>;
    focalCompanyId?: string;
    embeddings?: EmbeddingMap;
    candidateIds?: ReadonlySet<string>;
    externalIds?: ReadonlySet<string>;
    now?: () => Date;
  } = {},
): ExperienceGraph {
  const axes = { ...DEFAULT_AXES, ...options.axes };
  if (new Set([axes.x, axes.y, axes.z]).size !== 3) {
    throw new Error("Graph axes x, y, and z must be different");
  }
  const definitions = {
    x: axisDefinition(axes.x, companies),
    y: axisDefinition(axes.y, companies),
    z: axisDefinition(axes.z, companies),
  };
  const raw = {
    x: companies.map((company) => graphAxisValue(company, axes.x)),
    y: companies.map((company) => graphAxisValue(company, axes.y)),
    z: companies.map((company) => graphAxisValue(company, axes.z)),
  };
  const normalized = {
    x: normalize(raw.x, definitions.x.scale),
    y: normalize(raw.y, definitions.y.scale),
    z: normalize(raw.z, definitions.z.scale),
  };
  const nodes = companies.map((company, index): ExperienceGraphNode => {
    const role = roleFor(company, options.candidateIds, options.externalIds);
    const normalizedValues = {
      x: normalized.x[index] ?? 0.5,
      y: normalized.y[index] ?? 0.5,
      z: normalized.z[index] ?? 0.5,
    };
    const missingAxes = (["x", "y", "z"] as const).filter((axis) => raw[axis][index] === null);
    return {
      id: company.id,
      name: company.name,
      sector: company.sector,
      stage: company.stage,
      historicalStatus: company.historicalStatus,
      outcome: company.outcome,
      visualRole: role,
      color: ROLE_COLORS[role],
      coordinates: {
        x: normalizedValues.x * 2 - 1,
        y: normalizedValues.y * 2 - 1,
        z: normalizedValues.z * 2 - 1,
      },
      values: { x: raw.x[index] ?? null, y: raw.y[index] ?? null, z: raw.z[index] ?? null },
      normalizedValues,
      missingAxes,
    };
  });

  const sources = options.focalCompanyId
    ? companies.filter((company) => company.id === options.focalCompanyId)
    : companies.filter((company) => {
        const role = roleFor(company, options.candidateIds, options.externalIds);
        return role === "candidate" || role === "external";
      });
  if (options.focalCompanyId && !sources.length) throw new Error(`Unknown focal company '${options.focalCompanyId}'`);
  const successes = companies.filter((company) => roleFor(company, options.candidateIds, options.externalIds) === "past_success");
  const failures = companies.filter((company) => roleFor(company, options.candidateIds, options.externalIds) === "past_failure");
  const external = companies.filter((company) => ["candidate", "external"].includes(roleFor(company, options.candidateIds, options.externalIds)));
  const edges = sources.flatMap((source) => [
    nearestEdge(source, successes, "nearest_success", options.embeddings),
    nearestEdge(source, failures, "nearest_failure", options.embeddings),
    nearestEdge(source, external, "nearest_external", options.embeddings),
  ].filter((edge): edge is ExperienceGraphEdge => Boolean(edge)));

  return {
    axes,
    axisDefinitions: definitions,
    nodes,
    edges,
    focalCompanyId: options.focalCompanyId,
    generatedAt: (options.now ?? (() => new Date()))().toISOString(),
  };
}

export function compareGraphCompanies(
  source: Company,
  target: Company,
  axes: GraphAxisSelection = DEFAULT_AXES,
  embeddings?: EmbeddingMap,
): CompanyComparison {
  const companies = [source, target];
  const result = companySimilarity(source, target, embeddings);
  const axisComparisons = ([axes.x, axes.y, axes.z]).map((key) => {
    const sourceValue = graphAxisValue(source, key);
    const targetValue = graphAxisValue(target, key);
    return {
      axis: axisDefinition(key, companies),
      sourceValue,
      targetValue,
      delta: sourceValue === null || targetValue === null ? null : sourceValue - targetValue,
    };
  });
  const attributePairs: Array<[string, string, string]> = [
    ["Business model", source.attributes.businessModel, target.attributes.businessModel],
    ["Go to market", source.attributes.goToMarket, target.attributes.goToMarket],
    ["Operational model", source.attributes.operationalModel, target.attributes.operationalModel],
    ["Technical approach", source.attributes.technicalApproaches.join(", "), target.attributes.technicalApproaches.join(", ")],
    ["Regulatory profile", source.attributes.regulatoryLabels.join(", "), target.attributes.regulatoryLabels.join(", ")],
    ["Target customers", source.attributes.targetCustomers.join(", "), target.attributes.targetCustomers.join(", ")],
  ];
  const attributeContrasts = attributePairs
    .filter(([, sourceValue, targetValue]) => sourceValue.toLowerCase() !== targetValue.toLowerCase())
    .map(([dimension, sourceValue, targetValue]) => ({ dimension, sourceValue, targetValue }));
  const oppositeKnownOutcomes =
    [source.outcome, target.outcome].includes("succeeded") &&
    [source.outcome, target.outcome].includes("failed");
  const candidateFactors = axisComparisons
    .filter((axis) => axis.delta !== null && Math.abs(axis.delta) >= 0.25)
    .map((axis) => `${axis.axis.label}: ${source.name}=${axis.sourceValue}, ${target.name}=${axis.targetValue}`)
    .concat(attributeContrasts.map((contrast) => `${contrast.dimension}: ${source.name}=${contrast.sourceValue}, ${target.name}=${contrast.targetValue}`));
  return {
    source: {
      id: source.id,
      name: source.name,
      historicalStatus: source.historicalStatus,
      outcome: source.outcome,
      description: source.description,
    },
    target: {
      id: target.id,
      name: target.name,
      historicalStatus: target.historicalStatus,
      outcome: target.outcome,
      description: target.description,
    },
    similarity: {
      overall: result.overall,
      dimensions: result.dimensions,
      sharedAttributes: result.sharedAttributes,
      keyDifferences: result.keyDifferences,
    },
    axes: axisComparisons,
    attributeContrasts,
    outcomeContrast: oppositeKnownOutcomes ? {
      summary: `${source.name} and ${target.name} have opposite recorded outcomes despite ${Math.round(result.overall * 100)}% company-kind similarity.`,
      candidateFactors,
      caveat: "These are explanatory correlations from the selected axes, not proof that any factor caused the outcome.",
    } : undefined,
  };
}
