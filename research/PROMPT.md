# Generate 100 Additional HCP Investment Memos with 10 Concurrent Agents

You are the lead research orchestrator working inside the VC Brain repository.
Your objective is to produce research-quality investment memos for **100 real,
unique companies** using **exactly 10 concurrent background agents**, with 10
companies assigned to each agent. The result must closely match the format,
analytical standard, sourcing discipline, and assumption labeling in:

`../HCP_10_Investment_Memos_2026-07-18.md`

Do not merely summarize companies. Produce bottom-up, decision-useful VC
underwriting that can later seed the VC Brain graph and persistent company
store.

## Non-negotiable execution rules

1. Read the entire reference memo before beginning. Treat its headings, tables,
   calculation conventions, source hygiene, and distinction between disclosed
   facts and **HCP assumptions** as the canonical standard.
2. Inspect `brain/src/schemas/company.ts` before research so the structured
   companion records use the repository's actual `CompanySchema`.
3. Use exactly 10 background agents concurrently. Each agent owns a numbered,
   non-overlapping batch of 10 companies and writes only to its own batch files.
4. Do not allow agents to edit a shared aggregate file concurrently. The lead
   agent alone performs the final merge after all 10 agents complete.
5. Research current public sources. Prefer company sites, official financing
   announcements, regulatory filings, technical documentation, research papers,
   and credible primary reporting. Never invent citations, founders, funding,
   metrics, customers, pricing, or product capabilities.
6. Clearly label every non-disclosed financing term, revenue estimate,
   penetration rate, dilution assumption, exit multiple, and return estimate as
   **HCP assumption**.
7. Every company must be real and verifiable. Exclude the 10 companies already
   covered by the reference file: Mem0, Sekai, Alinea Invest, Sett, Tailor,
   Cedar Money, Bevel, Rwazi, Phia, and Twentyeight Health.
8. Do not select duplicate companies, aliases of the same company, subsidiaries,
   or two products from the same company.
9. Target Seed and Series A companies where a hypothetical $1.0m-$2.5m initial
   check is plausible. A small number of Pre-Seed or Series B companies may be
   included only when the memo explicitly explains the exception.
10. Continue until all deliverables validate. A partially completed batch is not
    acceptable.

## Phase 1: build the roster before spawning agents

Create a master roster of 100 unique companies before starting memo research.
The roster must include company name, URL, stage, segment, geography, assigned
batch, and a one-sentence reason it belongs in the dataset.

Aim for a deliberately varied dataset so configurable graph axes produce useful
contrast. Cover at least these areas:

- AI infrastructure and developer tools
- Enterprise and vertical AI
- Healthcare software, devices, and regulated technology
- Fintech and financial infrastructure
- Cybersecurity and data infrastructure
- Climate, energy, industrial, and supply-chain technology
- Consumer software, commerce, and marketplaces
- Future of work, education, and creator tools
- Robotics, hardware-enabled software, and deep technology
- B2B SaaS across different business models and go-to-market motions

Ensure the roster contains meaningful variation in:

- recurring subscription versus usage, transaction, marketplace, advertising,
  licensing, and one-time-purchase models
- enterprise sales, product-led, channel, developer-led, and consumer GTM
- pure software, hardware-dependent, manufacturing-dependent, and regulated
  operating models
- AI centrality, technical feasibility, regulatory burden/moat, proprietary-data
  potential, competition intensity, and legacy-market disruption
- successful-looking, ambiguous, and weak investment cases; do not make all 100
  recommendations positive

Write the approved roster to:

`research/generated/HCP_100_Company_Roster.md`

Divide it deterministically into batches 01-10 with exactly 10 companies per
batch. Once assigned, company ownership must not change unless the lead agent
records the replacement and rechecks global uniqueness.

## Phase 2: launch 10 concurrent background agents

Spawn all 10 agents before waiting for any one of them. Give each agent:

- its exact list of 10 assigned companies
- this prompt
- the reference memo path
- the company schema path
- its unique output paths

Agent `NN` must write only:

- `research/generated/batches/HCP_Memos_Batch_NN.md`
- `research/generated/batches/HCP_Companies_Batch_NN.json`
- `research/generated/batches/HCP_Sources_Batch_NN.md`

An agent must never edit another batch or the aggregate deliverables.

## Required Markdown format for every batch

Each batch document must follow the reference file's Markdown conventions and
begin with:

1. H1 title naming the batch and its ten companies
2. Prepared date, scope, target check, and the same public-source/assumption
   disclaimer used by the reference
3. `## Portfolio summary` table with rank, company, segment, round screened,
   proposed check, base MOIC, and recommendation
4. `### Common model conventions`

Then include 10 numbered company memos separated by `---`. Every company memo
must contain, in this order:

```markdown
## N. Company Name

**Stage:** ...  
**Proposed HCP check:** ...  
**Recommendation:** ...  
**Links:** [Company](...) | [Financing](...) | [Additional primary source](...)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| ... | ... | ... |

### Product description

...

### Thesis: why invest

...

**What must be true:** ...

**Next-round milestones:** ...

### Founder bet

...

### Market, TAM, and revenue build

Bottom-up TAM table and a 2026E-2032E operating-unit/revenue build.

### Competitive landscape

Competitive table covering business model/user, workflow capability, delivery,
hardest-to-copy advantage, pricing, and capital status. Use `X`, `Partial`, `No
evidence`, and `Undisclosed` with the same meanings as the reference.

### Public comps and exit model

Public-comps table plus entry valuation, ownership, dilution, exit ownership,
2032 revenue, selected multiple, exit value, proceeds, base MOIC, downside MOIC,
and upside MOIC. Show enough arithmetic to audit the result.

### Principal risks and why invest anyway

- **Risk:** evidence-based explanation and required diligence or mitigation.
```

Finish each batch with source and assumption notes. Recommendations should use
decision-oriented labels such as Pursue, Diligence, Price-sensitive, Watch,
Pass, or a clearly explained variation.

## Modeling and research standards

- Build revenue from operating units such as accounts, seats, usage, locations,
  transactions, devices, covered lives, or take rate. Do not project revenue by
  applying an unsupported market CAGR.
- Entry ownership = proposed check / assumed post-money valuation.
- Exit ownership = entry ownership × (1 - cumulative future dilution).
- Exit enterprise value = 2032 revenue × selected EV/LTM revenue multiple.
- HCP proceeds = exit enterprise value × exit ownership.
- MOIC = proceeds / proposed check.
- Downside should use 60% of base exit revenue and one turn less on the exit
  multiple, with a 1.0x multiple floor. Upside should use 150% of base revenue
  and one turn more. Hold dilution constant unless a memo explicitly justifies a
  different convention.
- Cite public-comps values with source and as-of date. Explain why the selected
  exit multiple is appropriate and normally conservative relative to the set.
- Distinguish company claims, third-party reporting, and HCP assumptions in the
  sentence where each appears.
- If a fact cannot be verified, write `Undisclosed` or `No evidence`; do not fill
  gaps with plausible-sounding numbers.
- Use direct source links near the claims they support. Maintain a source ledger
  containing URL, source title, publication date when known, access date, and
  claims supported.

## Structured JSON companion output

Each batch must also contain a JSON array of 10 records that validate against
`CompanySchema` in `brain/src/schemas/company.ts`. Use stable IDs of the form
`co_<normalized_company_name>` and preserve the schema's exact enum values.

Populate as much verified information as possible, including:

- description, founders, stage, geography, sector, round, check sought,
  valuation, known metrics, competitors, source references, and outcome fields
- normalized company-kind attributes: industry hierarchy, product category,
  customers, technical approaches, founder archetypes, disruption mechanisms,
  regulatory labels, business model, GTM, operating model, problem statement,
  and product description
- `graphMetrics` values in the `0..1` range for fund-specific dimensions only
  when evidence supports the score

At minimum consider these `graphMetrics` keys:

- `ai_adoption`
- `legacy_disruptiveness`
- `technical_feasibility`
- `regulatory_moat`
- `proprietary_data_moat`
- `competition_intensity`

Do not convert unknown values into zero. Omit unsupported custom metrics. In the
memo or source ledger, briefly explain the evidence behind every custom score.
These companies are external candidates, so use `historicalStatus: "external"`
and `outcome: "unknown"` unless the source data genuinely represents fund
history supplied by the user.

## Per-agent validation before completion

Each agent must verify and report:

- exactly 10 Markdown memos and 10 JSON records
- all assigned companies are present exactly once
- no reference-file company is included
- all required headings and tables are present
- all URLs are syntactically valid and every important claim has a source
- model arithmetic recomputes correctly within reasonable rounding tolerance
- JSON parses and validates against `CompanySchema`
- no unsupported fact is presented as disclosed truth
- no placeholder text, TODO, fabricated citation, or unlabelled estimate remains

If validation fails, the owning agent must repair its own batch before returning.

## Phase 3: lead-agent merge and global validation

After all 10 agents complete, the lead agent must:

1. Read every batch memo, JSON file, source ledger, and agent validation report.
2. Build a normalized-name and domain-based deduplication check across all 100
   companies and against the original 10-company reference.
3. Reassign global ranks 1-100 based on the full underwriting set; do not simply
   concatenate ten independent rankings.
4. Create one global portfolio-summary table and one common-model-conventions
   section.
5. Merge the 100 memos into:
   `research/generated/HCP_100_Investment_Memos_2026-07-18.md`
6. Merge the structured records into a single valid JSON array:
   `research/generated/HCP_100_Companies.json`
7. Merge and deduplicate the source ledgers into:
   `research/generated/HCP_100_Sources.md`
8. Write a machine-readable QA report to:
   `research/generated/HCP_100_QA.json`

The QA report must contain counts, duplicates checked, schema-validation result,
broken or unreachable links, missing required sections, arithmetic failures,
recommendation distribution, sector/stage/business-model distributions, and a
list of every unresolved concern.

## Final acceptance criteria

The task is complete only when:

- all 10 agents ran concurrently and completed their isolated batches
- the aggregate contains exactly 100 unique new companies
- every company has a full HCP-style Markdown memo and one schema-valid JSON
  record
- no company from the original ten appears
- the aggregate portfolio summary contains 100 ranked rows
- the final memo follows the reference document's structure and analytical tone
- sources and HCP assumptions are clearly distinguishable
- all model calculations pass the lead agent's recomputation
- the global JSON file parses and validates against the repository schema
- the QA report records no unresolved duplicate, schema, missing-section, or
  arithmetic errors

In the final response, provide the output paths, per-agent completion table,
total memo/record counts, validation summary, and any remaining research caveats.
