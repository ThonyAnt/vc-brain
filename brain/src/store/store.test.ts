import { describe, it, expect } from "vitest";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { SeedBundleSchema, stateFromBundle } from "./bundle.js";
import { JsonCompanyStore, loadBundle, saveBundle } from "./jsonStore.js";
import { loadSourcedCompanies, saveSourcedCompanies } from "./sourcedCompanies.js";
import * as fx from "../fixtures/sample.js";

function sampleBundle() {
  return SeedBundleSchema.parse({
    mandate: "Seed healthcare AI.",
    fundProfile: fx.fundProfile,
    historicalMemos: fx.historicalMemos,
    portfolioCompanies: fx.portfolioCompanies,
    rejectedDeals: fx.rejectedDeals,
    candidateUniverse: fx.candidateUniverse,
    competitors: fx.competitors,
  });
}

describe("SeedBundle + stateFromBundle", () => {
  it("builds pipeline state from a bundle, carrying fundProfile", () => {
    const state = stateFromBundle(sampleBundle());
    expect(state.candidateUniverse.length).toBe(fx.candidateUniverse.length);
    expect(state.fundProfile?.thesisSummary).toBeTruthy();
  });
});

describe("JsonCompanyStore", () => {
  const store = JsonCompanyStore.fromBundle(sampleBundle());

  it("indexes every company across buckets", () => {
    expect(store.get("co_scribeai")?.name).toBe("ScribeAI");
    expect(store.byHistoricalStatus("portfolio").map((c) => c.id)).toContain("co_medflow");
    expect(store.byHistoricalStatus("rejected").map((c) => c.id)).toContain("co_healthadboard");
  });

  it("answers nearest-neighbor queries", () => {
    const near = store.nearest("co_scribeai", 3);
    expect(near[0]!.companyId).not.toBe("co_scribeai");
    expect(near.map((n) => n.companyId)).toContain("co_medflow");
  });

  it("supports put for newly discovered companies", () => {
    const before = store.all().length;
    store.put({ ...store.get("co_scribeai")!, id: "co_new", name: "NewCo" });
    expect(store.all().length).toBe(before + 1);
    expect(store.get("co_new")?.name).toBe("NewCo");
  });
});

describe("loadBundle / saveBundle round-trip", () => {
  it("writes and reads back an identical validated bundle", async () => {
    const path = join(tmpdir(), `vcbrain-seed-${process.pid}.json`);
    const bundle = sampleBundle();
    await saveBundle(path, bundle);
    const loaded = await loadBundle(path);
    expect(loaded.candidateUniverse.map((c) => c.id)).toEqual(
      bundle.candidateUniverse.map((c) => c.id),
    );
    expect(loaded.mandate).toBe(bundle.mandate);
  });
});

describe("portable sourced-company storage", () => {
  it("writes and loads sourced companies from a known JSON path", () => {
    const path = join(tmpdir(), `vcbrain-sourced-${process.pid}.json`);
    const companies = [fx.scribeai];
    saveSourcedCompanies(path, companies);
    expect(loadSourcedCompanies(path).map((company) => company.id)).toEqual([fx.scribeai.id]);
  });
});
