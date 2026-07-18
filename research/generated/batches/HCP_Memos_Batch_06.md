# HCP Investment Memos: Batch 06 — Climate, Energy, Industrial, and Supply Chain

**Companies:** Terminal49, Nira Energy, Bayou Energy, Vooma, Lithos Carbon, Paces, Verse, Texture, Cargado, Isometric

**Prepared:** July 18, 2026
**Scope:** Public-source underwriting only; no Crunchbase or PitchBook access
**Target initial check:** $1.0 million to $2.5 million
**Important:** Financing terms, ownership, revenue, penetration, dilution, and exit values labeled **HCP assumption** are underwriting inputs, not company disclosures. All dollars are U.S. dollars unless noted.

**Swap note:** No substitutions were required. All ten assigned companies (Bayou Energy, Verse, Paces, Nira Energy, Isometric, Lithos Carbon, Cargado, Vooma, Terminal49, Texture) were verified as real, independent, non-duplicate companies and are covered below. Two stage corrections were made against the roster hints after verification: Lithos Carbon's only confirmed priced equity round is a $6.29m seed (October 2022, Union Square Ventures and Greylock Partners); the widely indexed "$57.1m Series A" figure on aggregator sites is a carbon-removal purchase (offtake) agreement with Frontier, not an equity round, and is treated as such throughout this memo. Nira Energy's only disclosed priced round is a $500k Y Combinator seed (2022); its 2025 Energize Capital round is described by the company and investor as a "strategic growth investment" of undisclosed size, not a named "Series A." Both companies are underwritten at Seed stage in this batch, with the correction noted in each memo.

## Portfolio summary

| Rank | Company | Segment | Round screened | Proposed check | Base MOIC | Recommendation |
|---:|---|---|---|---:|---:|---|
| 1 | Terminal49 | Container tracking API | Series A | $1.75m | 7.7x | Pursue |
| 2 | Nira Energy | Grid interconnection software | Seed (2025 growth round) | $1.5m | 6.4x | Pursue |
| 3 | Bayou Energy | Utility data API | Seed (pre-seed) | $1.25m | 5.9x | Diligence |
| 4 | Vooma | AI agents for freight | Series A | $2.0m | 4.7x | Pursue |
| 5 | Lithos Carbon | Enhanced rock weathering | Seed | $1.5m | 4.5x | Pursue |
| 6 | Paces | Green infrastructure siting AI | Series A | $2.0m | 3.4x | Diligence |
| 7 | Verse | Clean-power procurement software | Series A | $2.5m | 3.0x | Diligence |
| 8 | Texture | Energy device data platform | Series A | $2.25m | 2.1x | Diligence |
| 9 | Cargado | Cross-border freight marketplace | Series A | $2.0m | 1.7x | Watch |
| 10 | Isometric | Carbon removal registry | Series A | $2.0m | 1.2x | Price-sensitive |

### Common model conventions

- Revenue is built from operating units (meters, accounts, loads, devices, tonnes, or projects), not a top-down market-growth percentage. Forecasts represent an HCP base case and are not management guidance.
- Entry ownership equals check divided by post-money valuation. Exit ownership equals entry ownership multiplied by one minus cumulative dilution. Dilution is 35% by default; batch memos that use a different figure explain why (younger, capital-intensive companies use a higher assumption; older, capital-efficient, or already-profitable companies use a lower one).
- Exit enterprise value equals 2032 revenue multiplied by the selected EV/LTM revenue multiple. HCP proceeds equal exit enterprise value multiplied by exit ownership. MOIC equals proceeds divided by check. The model excludes preference effects, taxes, fees, secondary sales, and follow-on reserves.
- Public-comps multiples are snapshots as of July 18, 2026 from the linked StockAnalysis pages, whose financial statistics cite S&P Global Market Intelligence. Several tickers (MDB, SNOW, NET, DDOG, GTLB, RBLX, U, APP, HOOD, SOFI, WDAY, SHOP, and others) are reused from the July 18, 2026 reference-memo snapshot where the same comp set applies; new tickers specific to climate, grid, and freight infrastructure were fetched directly for this batch.
- Downside uses 60% of base exit revenue and one turn less on the multiple, with a 1.0x floor. Upside uses 150% of base exit revenue and one turn more. Dilution is held constant.
- Competitive tables use **X** only where the capability is verified, **Partial** where the product covers only part of the workflow, **No evidence** where public material does not support the claim, and **Undisclosed** for unavailable commercial or capital data.

---

## 1. Terminal49

**Stage:** Series A
**Proposed HCP check:** $1.75m
**Recommendation:** Pursue
**Links:** [Company](https://terminal49.com/) | [Series A announcement](https://www.prnewswire.com/news-releases/terminal49-secures-6-5m-series-a-to-power-ocean-freight-visibility-and-automation-301725978.html) | [Company blog announcement](https://terminal49.com/blog/series-a-announcement) | [API product](https://terminal49.com/container-tracking-api)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Akshay Dodeja | Co-founder | Public sources identify Dodeja as co-founder of Terminal49, founded in 2015; exact current title not confirmed in available press coverage. Confirm in diligence. |
| Philipp Gutheim | Co-founder | Co-founded Terminal49 alongside Dodeja in 2015; exact current title not confirmed in available press coverage. Confirm in diligence. |

### Product description

Terminal49 is an API and dashboard for ocean-container shipment tracking. It integrates with every major ocean carrier and with U.S. and Canadian marine terminals, standardizing carrier and terminal data (vessel schedules, container milestones, demurrage and per-diem risk, customs holds) into one searchable feed. According to the company, its integrations cover 98% of global ocean freight and container traffic, and it tracks more than a million containers for customers including Wayfair, Hillebrand, and Mazda USA. The wedge is integration depth and data normalization, not visualization: building and maintaining carrier- and terminal-specific integrations at this scale is a multi-year effort that most importers, freight forwarders, and logistics software vendors would rather buy than build.

### Thesis: why invest

Terminal49 raised a $6.5m Series A in January 2023, led by Stage 2 Capital and co-led by Grand Venture Partners. The company was founded in 2015 and reached Series A only in 2023 — an unusually long, capital-efficient path (roughly $6.5m of disclosed outside capital across eight years) that suggests the founders bootstrapped or grew on revenue before raising a priced round. That capital efficiency is itself a signal: the product has been commercially viable for years before this round, reducing execution risk relative to a freshly funded Series A of the same size.

The moat is the integration graph: carrier EDI/API relationships, terminal scraping and API integrations, and the operational work of keeping hundreds of data sources current and normalized. This is exactly the kind of infrastructure that becomes more valuable as more software (TMS, ERP, customs brokerage, insurance) is built on top of it, because switching costs rise with every downstream integration a customer builds against Terminal49's API.

**What must be true:** carrier and terminal coverage must keep pace with new carriers, alliances, and terminal operators without integration debt piling up; the API must remain the reliability benchmark against direct carrier EDI feeds; and Terminal49 must convert single-workflow (container tracking) customers into multi-product accounts (demurrage/per-diem alerts, customs, analytics) to grow revenue per account.

**Next-round milestones:** $15m ARR, 3,000+ paying accounts, net revenue retention above 115%, at least three multi-year enterprise contracts above $250k ACV, and continued near-100% ocean-carrier and terminal coverage in the U.S. and Canada.

### Founder bet

The bet is on two technical operators who built a durable, unglamorous integration business over nearly a decade before taking meaningful outside capital, in a category (ocean-freight data) where most VC-funded competitors (project44, FourKites) generalized across modes instead of going deep on ocean. Diligence should confirm current org structure, founder equity and vesting after eight years of operation, and whether the long pre-Series-A period reflects deliberate capital discipline or a earlier struggle to raise.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market importers/exporters and BCOs shipping by ocean container | 25,000 | $15,000 | $375m | HCP assumption: API/dashboard subscription for shippers managing recurring ocean volume |
| Freight forwarders, 3PLs, and customs brokers | 5,000 | $40,000 | $200m | HCP assumption: multi-client tracking and automation workloads |
| Enterprise and carrier/terminal data-licensing accounts | 100 | $250,000 | $25m | HCP assumption: large-scale API and data-partnership deployments |
| **TAM** | 30,100 |  | **$600m** | Annual ocean-freight visibility software pool |
| HCP penetration |  |  | **10.0%** | About 4,500 blended paying accounts by 2032 |
| **2032 revenue opportunity** |  |  | **$60m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paying accounts | 350 | 650 | 1,150 | 1,800 | 2,600 | 3,500 | 4,500 |
| Blended annual contract value | $8.0k | $8.5k | $9.0k | $9.7k | $10.5k | $11.5k | $13.3k |
| **Revenue** | **$3** | **$6** | **$10** | **$17** | **$27** | **$40** | **$60** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Terminal49** | Usage/subscription API; importers, forwarders, 3PLs | X ocean tracking, milestones, demurrage/per-diem alerts | Cloud API and dashboard | Direct carrier/terminal integrations covering ~98% of global ocean traffic per company | [Published tiers](https://terminal49.com/api-pricing) | $6.5m Series A; total and valuation undisclosed; Stage 2 Capital, Grand Venture Partners |
| project44 | Multimodal visibility platform; large shippers/3PLs | X multimodal tracking; Partial ocean-specific depth vs. Terminal49 | Cloud platform | Breadth across ocean, air, rail, road, and parcel | Undisclosed | Private; total and valuation undisclosed here |
| FourKites | Multimodal visibility platform; enterprise shippers | X multimodal tracking; Partial ocean-specific depth | Cloud platform | Large enterprise install base and carrier network | Undisclosed | Private; total and valuation undisclosed here |
| Portcast | Ocean ETA prediction and visibility; forwarders/shippers | X predictive ETAs; Partial full milestone/demurrage automation | Cloud API | Predictive-ETA modeling specialization | Undisclosed | Private; capital data undisclosed here |
| GoComet | Freight visibility and procurement; shippers | X tracking; Partial procurement/benchmarking add-ons | Cloud platform | Combined visibility plus freight-procurement workflow | Undisclosed | Private; capital data undisclosed here |
| CargoSmart | Legacy ocean shipment management; forwarders/carriers | X carrier-community tracking; Partial modern API-first delivery | Cloud platform, carrier-consortium roots | Long-standing carrier-community relationships (COSCO/OOCL lineage) | Undisclosed | Private/carrier-affiliated; capital data not comparable |
| In-house EDI/manual tracking | Internal ops teams at importers/forwarders | Partial tracking via spreadsheets and carrier portals; No evidence of automation or alerting | Manual/legacy EDI | Existing carrier relationships only | N/A | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Descartes Systems Group](https://stockanalysis.com/stocks/dsgx/statistics/) | 7.95x | Closest direct comp: public supply-chain visibility and logistics-network software |
| [C.H. Robinson](https://stockanalysis.com/stocks/chrw/statistics/) | 1.61x | Diversified freight brokerage with technology investment |
| [Landstar System](https://stockanalysis.com/stocks/lstr/statistics/) | 1.44x | Asset-light freight network operator |
| **Median** | **1.61x** | HCP uses 5.5x, weighted toward Descartes as the only pure-software comp; a ~31% discount to Descartes reflecting Terminal49's smaller scale and single-mode focus |

| Return path | Base |
|---|---:|
| Entry post-money | $30m, HCP assumption |
| Initial ownership | 5.83% |
| Cumulative future dilution | 30%, HCP assumption (lower than default given the company's demonstrated capital efficiency) |
| Exit ownership | 4.08% |
| 2032 revenue / exit multiple | $60m / 5.5x |
| Exit enterprise value | $330m |
| HCP proceeds / MOIC | $13.5m / **7.7x** |
| Downside / upside MOIC | 3.8x / 13.6x |

### Principal risks and why invest anyway

- **Carrier/terminal dependency:** Terminal49's moat is also a maintenance obligation — carrier API changes, new terminal operators, and consolidation (for example, ocean-alliance restructuring) can break integrations. Invest because the company has sustained ~98% coverage through multiple alliance and schedule changes already; require an integration-uptime SLA and change-management process in diligence.
- **Platform bundling:** larger multimodal platforms (project44, FourKites) or ERP/TMS vendors could bundle "good enough" ocean tracking for free. Terminal49's defense is data completeness and API-first pricing accessible to smaller shippers those platforms don't prioritize.
- **Thin public disclosure:** no ARR, growth rate, or customer count beyond "hundreds" and "over a million containers tracked" is publicly available. Require current ARR, logo count, net retention, and gross margin before final terms.
- **Long pre-Series-A history:** eight years to a first priced round is unusual. Confirm whether this reflects capital discipline (positive) or prior fundraising difficulty (negative) through reference calls with the Series A investors.

---

## 2. Nira Energy

**Stage:** Seed
**Proposed HCP check:** $1.5m
**Recommendation:** Pursue
**Links:** [Company](https://www.niraenergy.com/) | [Y Combinator profile](https://www.ycombinator.com/companies/nira-energy) | [2025 growth-round announcement](https://www.prnewswire.com/news-releases/nira-energy-partners-with-energize-capital-to-scale-transmission-automation-software-302467710.html) | [Product reporting](https://www.latitudemedia.com/news/how-nira-energy-is-using-software-to-unclog-the-interconnection-queue/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Chris Ariante | Co-founder and CEO | Latitude Media and the Energize Capital investment writeup identify Ariante as CEO; company was founded in 2021 and reported profitability from its first year. |
| Andy Chen | Co-founder | Latitude Media reports Chen previously worked at Palantir before co-founding Nira. |

**Stage correction:** the roster listed Nira as "Seed/A." The only disclosed priced round HCP could verify is a $500k Y Combinator seed (2022). The May 2025 Energize Capital round is described in the press release and by Energize Capital as a "strategic growth investment" and "one of the larger investments" the firm has made, but the amount is not disclosed and it is not labeled a "Series A" in primary sources. HCP treats Nira as Seed stage with an undisclosed-size 2025 growth round layered on top.

### Product description

Nira builds software that automates transmission interconnection and grid-planning studies for renewable, storage, and data-center developers. The platform ingests utility and RTO/ISO grid data to identify the lowest-cost, fastest interconnection points for a proposed project, replacing manual engineering studies traditionally run in tools like PSS/E by a small number of transmission planning engineers. Nira states its software can increase project siting and interconnection speed by 50 to 100 times, and that it has supported analysis across more than 500 GW of interconnection studies and helped customers identify more than $3 billion in cost discrepancies (per Energize Capital's investment writeup). More than 100 developers, including AES, Cypress Creek, and Doral Renewables, are cited as customers.

### Thesis: why invest

Grid interconnection is the most cited bottleneck in U.S. clean-energy and data-center buildout: developers routinely wait years and pay for speculative upgrade costs because interconnection studies are manual, slow, and opaque. Nira turns that process into software, and it did so profitably from year one without needing venture capital to survive — a rare signal of genuine willingness-to-pay in an infrastructure-software category. The May 2025 Energize Capital investment (Energize manages a portfolio described as $2 billion) added board-level energy-sector expertise rather than rescue capital, consistent with a growth investment into a working business rather than a subsistence raise.

The moat is a proprietary dataset built from hundreds of completed interconnection studies across U.S. power markets, plus the domain-specific modeling logic needed to replicate what transmission planning engineers do by hand. That data compounds: each new study Nira runs improves its ability to predict interconnection cost and timeline for the next customer.

**What must be true:** interconnection queue reform (increasingly mandated by FERC and RTOs) must keep pushing developers toward faster, data-driven siting rather than shrinking the addressable problem; Nira's models must remain accurate as RTOs change queue rules and cost-allocation methods; and the company must expand from analysis software into a recurring, multi-project relationship rather than one-off engineering engagements.

**Next-round milestones:** disclosed ARR and customer count (both currently undisclosed), 200+ paying developer customers, expansion into at least one additional grid-planning use case (e.g., generation + transmission co-optimization or government/utility-side planning), and continued profitability or a clear path back to it after the growth investment.

### Founder bet

The bet is on a technical, capital-disciplined founding team — an ex-Palantir engineer paired with a CEO who built a profitable business before taking meaningful outside money — in a category where most well-funded competitors are still scaling toward product-market fit. Diligence should confirm the actual size of the 2025 Energize Capital round, current burn rate now that the company has taken growth capital, and whether profitability has been preserved or intentionally sacrificed for growth.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Renewable, storage, and data-center developer accounts | 2,500 | $60,000 | $150m | HCP assumption: per-developer interconnection and siting software subscription |
| Transmission-owning utilities and RTO/ISO planning groups | 300 | $250,000 | $75m | HCP assumption: enterprise planning-desk deployments |
| Government, regulatory, and advisory accounts | 50 | $150,000 | $7.5m | HCP assumption: policy and queue-reform analytics |
| **TAM** | 2,850 |  | **$232.5m** | Annual grid-interconnection software pool |
| HCP penetration |  |  | **23.7%** | About 760 blended customers at scale; aggressive but plausible for the recognized category leader in a still-small, still-consolidating niche |
| **2032 revenue opportunity** |  |  | **$55m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paying developer/utility accounts | 100 | 180 | 280 | 400 | 520 | 640 | 760 |
| Blended annual contract value | $30k | $35k | $41k | $48k | $56k | $64k | $72k |
| **Revenue** | **$3** | **$6** | **$11** | **$19** | **$29** | **$41** | **$55** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Nira Energy** | Subscription SaaS; renewable/storage/data-center developers | X interconnection cost/timeline modeling, siting recommendations | Cloud platform | Proprietary study dataset across 500+ GW analyzed; profitable since founding | Undisclosed | $500k YC seed (2022); undisclosed-size 2025 Energize Capital growth investment; total and valuation undisclosed |
| Anza | Interconnection cost and queue data platform; developers | X queue/cost data and benchmarking; Partial full study automation | Cloud platform | Aggregated interconnection-request dataset | Undisclosed | Private; capital data undisclosed here |
| Neara | Grid digital-twin software; utilities | X asset-level grid modeling; Partial developer-side interconnection focus | Cloud platform | 3D network digital twin | Undisclosed | Private; capital data undisclosed here |
| GridUnity | Interconnection queue management software; utilities/RTOs | X queue management workflow; Partial developer-facing siting tools | Cloud platform | Utility-side queue-management relationships | Undisclosed | Private; capital data undisclosed here |
| Bentley Systems (OpenUtilities/Seequent) | Engineering/GIS software; utilities and engineers | X broad grid and geospatial modeling; Partial interconnection-specific automation | Enterprise software | Deep engineering-software install base | Enterprise/custom | Public company product |
| In-house PSS/E-based engineering studies | Utility and developer engineering teams | Partial manual study workflow; No evidence of automated benchmarking across markets | Desktop engineering tools | Existing engineer headcount and utility relationships | N/A | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Bentley Systems](https://stockanalysis.com/stocks/bsy/statistics/) | 7.19x | Engineering/GIS software for infrastructure, closest structural comp |
| [Verisk Analytics](https://stockanalysis.com/stocks/vrsk/statistics/) | 9.80x | Proprietary risk/data-analytics platform business model |
| [Itron](https://stockanalysis.com/stocks/itri/statistics/) | 2.00x | Grid data and metering infrastructure, hardware-weighted |
| **Median** | **7.19x** | HCP uses 5.0x, a 30% discount to median reflecting Nira's smaller scale and single-workflow focus today |

| Return path | Base |
|---|---:|
| Entry post-money | $30m, HCP assumption |
| Initial ownership | 5.00% |
| Cumulative future dilution | 30%, HCP assumption (lower than default given demonstrated profitability and capital discipline) |
| Exit ownership | 3.50% |
| 2032 revenue / exit multiple | $55m / 5.0x |
| Exit enterprise value | $275m |
| HCP proceeds / MOIC | $9.6m / **6.4x** |
| Downside / upside MOIC | 3.1x / 11.6x |

### Principal risks and why invest anyway

- **Undisclosed financials:** neither revenue, customer count, nor the size of the 2025 round is public. Require current ARR, gross margin, and burn/profitability status before committing capital.
- **Queue-reform policy risk:** FERC and RTO interconnection-process reforms could eventually simplify or centralize the studies Nira automates, narrowing the problem it solves. Invest because reform timelines have historically slipped for years, and any reform still requires software to execute it at scale.
- **Narrow customer base:** named customers are developer-side (AES, Cypress Creek, Doral); utility- and RTO-side adoption, a larger long-term opportunity, is unproven. Track expansion into utility and government accounts as a milestone.
- **Model accuracy risk:** interconnection cost predictions that are wrong in production could damage trust quickly in a small, reputation-driven developer community. Require evidence of prediction accuracy against actual utility-issued interconnection studies.

---

## 3. Bayou Energy

**Stage:** Seed
**Proposed HCP check:** $1.25m
**Recommendation:** Diligence
**Links:** [Company](https://www.bayou.energy/) | [Financing report](https://www.geekwire.com/2024/this-energy-startup-wants-to-make-utility-data-more-accessible-and-spur-creation-of-new-companies/) | [API documentation](https://docs.bayou.energy/reference/getting-started-with-your-api)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| James Gordey | Co-founder | GeekWire and company materials identify Gordey as co-founder; company was founded in 2021 and went through Y Combinator's Winter 2022 batch. Exact current title not confirmed; confirm in diligence. |
| Joris Van Hecke | Co-founder | GeekWire and company materials identify Van Hecke as co-founder alongside Gordey. Exact current title not confirmed; confirm in diligence. |

### Product description

Bayou Energy provides a developer API that aggregates and standardizes customer utility data — bills, interval usage, and account information — across thousands of regional U.S. electric and gas utilities. Rather than every clean-energy company building and maintaining its own utility-website scraping and login integrations, Bayou centralizes that work behind one API: a customer connects their utility account, and Bayou returns standardized bill and interval data typically within 60 seconds, with a stated 95%+ reliability rate across major U.S. utilities. Named users include Nautilus Solar, Arbor, CleanChoice Energy, Sunscription, Sealed, Elephant Energy, WattBot, and Glow Energy, spanning residential solar, community solar, financing, and demand-side management use cases. Pricing is public and usage-based: $24 per connected meter per year, with the first ten meters free and unlimited API calls per meter.

### Thesis: why invest

Bayou occupies the same structural position for utility data that Plaid occupies for bank data: unglamorous, integration-heavy infrastructure that every downstream clean-energy product needs but none wants to build itself. The company raised a $1.2m pre-seed round in April 2024 from Surface Ventures, CoFound Partners, Leap Forward Ventures, Stepchange Ventures, and Very Serious Ventures, on top of its 2022 Y Combinator batch participation. The round size is small relative to the company's three years of operating history, which is consistent with a capital-light, usage-revenue business rather than one burning cash to find product-market fit — the company already has eight named paying-adjacent customer logos and transparent public pricing, both unusual for a company at this disclosed funding level.

The moat is integration breadth and reliability across a highly fragmented utility landscape (thousands of investor-owned, municipal, and cooperative utilities in the U.S., each with different login and data formats). Once a clean-energy platform builds against Bayou's API, switching to a competitor means re-integrating and re-testing across every utility the platform serves — a real, if not insurmountable, switching cost.

**What must be true:** utility coverage and reliability must keep expanding faster than any single competitor can replicate; usage-based per-meter pricing must scale into meaningful ARR as customer platforms grow their own end-user bases; and utilities themselves must not close off the third-party access (via Green Button Connect, direct APIs, or policy) that Bayou depends on.

**Next-round milestones:** disclosed ARR (currently undisclosed), 500,000+ connected meters under management, expansion beyond the current customer set into at least one new vertical (e.g., EV charging, building electrification, or utility-side demand response), and evidence of net revenue retention above 120% as existing customers grow their end-user base.

### Founder bet

The bet is on two technical founders who chose a narrow, integration-heavy infrastructure problem and built enough reliability and utility coverage to earn public reference customers on a small disclosed capital base. Diligence should confirm actual connected-meter count, revenue, and gross margin (utility-integration maintenance costs can be a meaningful drag on API businesses), plus how defensible the company's utility coverage is against direct competition from Arcadia's UtilityAPI product, which serves the same wedge with more capital behind it.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Residential clean-energy platform meters (solar, community solar, VPP, EV charging, home energy management) | 20,000,000 | $22 | $440m | HCP assumption: blended per-meter API pricing at scale |
| Commercial & industrial and DER-program meters (demand response, C&I efficiency, fleet electrification) | 3,000,000 | $50 | $150m | HCP assumption: higher-value C&I and program accounts |
| **TAM** | 23,000,000 |  | **$590m** | Annual utility-data API revenue pool |
| HCP penetration |  |  | **8.1%** | About 1.5 million connected meters by 2032 |
| **2032 revenue opportunity** |  |  | **$48m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Connected meters (thousands) | 140 | 260 | 430 | 660 | 930 | 1,220 | 1,500 |
| Blended annual value/meter | $21 | $23 | $26 | $27 | $29 | $30 | $32 |
| **Revenue** | **$3** | **$6** | **$11** | **$18** | **$27** | **$37** | **$48** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Bayou Energy** | Usage API; clean-energy software platforms | X bill, interval, and account data across thousands of U.S. utilities | Cloud API | Breadth and reliability (95%+) across a fragmented utility landscape | [$24/meter/year, public](https://www.bayou.energy/) | $1.2m pre-seed (April 2024); prior YC W22 batch; total and valuation undisclosed |
| Arcadia (UtilityAPI) | Usage API plus broader energy-data platform; developers and enterprises | X utility data access; X also operates its own consumer energy brand, unlike Bayou | Cloud API and consumer platform | Larger capital base and combined data-plus-consumer-brand model | Undisclosed | Private; total funding not comparable here, materially larger than Bayou's |
| Urjanet (part of Arcadia) | Utility/telecom data aggregation API; enterprises | X utility bill data; Partial real-time interval-data depth | Cloud API | Long-standing enterprise utility-data relationships | Undisclosed | Private/subsidiary; capital data not applicable |
| Copper Labs | Home energy data and hardware; utilities and consumers | Partial data access via hardware sensor, not pure API; No evidence of Bayou's utility-login breadth | Hardware plus cloud | Direct meter-adjacent sensor data | Undisclosed | Private; capital data undisclosed here |
| Span | Home electrification panel and energy data; consumers/installers | Partial device-level data; No evidence of cross-utility bill/account aggregation | Hardware plus cloud | Panel-level circuit data, not billing data | Hardware plus subscription | Private; valuation not used |
| Direct utility Green Button/manual integration | Internal engineering teams | Partial data access per utility; No evidence of a unified, reliable, multi-utility API | Manual/bespoke integration | Existing utility relationships only | N/A | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Verisk Analytics](https://stockanalysis.com/stocks/vrsk/statistics/) | 9.80x | Proprietary data-aggregation and analytics platform |
| [CoStar Group](https://stockanalysis.com/stocks/csgp/statistics/) | 3.54x | Aggregated, hard-to-replicate data platform monetized via subscription |
| [Itron](https://stockanalysis.com/stocks/itri/statistics/) | 2.00x | Utility/metering data infrastructure, hardware-weighted |
| **Median** | **3.54x** | HCP uses 4.0x, close to median, reflecting a pure-data-API business without Itron's hardware drag but without Verisk's scale or diversification |

| Return path | Base |
|---|---:|
| Entry post-money | $18m, HCP assumption |
| Initial ownership | 6.94% |
| Cumulative future dilution | 45%, HCP assumption (higher than default given the company's very early, small-round stage and multiple future financings likely needed) |
| Exit ownership | 3.82% |
| 2032 revenue / exit multiple | $48m / 4.0x |
| Exit enterprise value | $192m |
| HCP proceeds / MOIC | $7.3m / **5.9x** |
| Downside / upside MOIC | 2.6x / 11.0x |

### Principal risks and why invest anyway

- **Scale versus disclosed capital:** only $1.2m of outside capital is publicly confirmed, which is thin for a company competing against a better-capitalized direct competitor (Arcadia/UtilityAPI). Require current cash position, revenue, and burn before final terms; this may in practice be a smaller or bridge-style check.
- **Utility access risk:** the entire business depends on utilities continuing to permit third-party, customer-authorized data access (screen-scraping or Green Button Connect). A shift in utility policy or cybersecurity posture could restrict access industry-wide. Invest because Bayou's diversified, standards-based approach is more resilient than any single point-integration.
- **Thin public disclosure:** no ARR, growth rate, or meter count is public. This memo's revenue build is entirely HCP-modeled from public pricing and logo count; treat the model as illustrative until a data room is available.
- **Commoditization risk:** utility-data aggregation is a real but narrow wedge; a well-capitalized competitor or a utility-run open API standard could compress Bayou's per-meter pricing over time. Bayou's defense is being the most reliable, broadest-coverage option, which must be verified directly with customers.

---

## 4. Vooma

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Pursue
**Links:** [Company](https://www.vooma.com/) | [Series A announcement](https://www.businesswire.com/news/home/20241202150186/en/Vooma-Scores-Over-$16-Million-in-Seed-and-Series-A-Funding-Led-by-Index-and-Craft-Ventures) | [Investor profile](https://www.indexventures.com/perspectives/vooma-secures-166-million-to-build-an-ai-powered-agent-for-the-1t-trucking-industry/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Jesse Buckingham | Co-founder | Index Ventures' investment profile identifies Buckingham as a Stanford graduate and former CEO of ASG LogisTech, a logistics operator, prior to co-founding Vooma. |
| Mike Carter | Co-founder | Index Ventures' investment profile identifies Carter as a Stanford graduate and former founding engineer at Kodiak Robotics, an autonomous-trucking company, prior to co-founding Vooma. |

### Product description

Vooma builds AI agents for freight brokers and carriers that automate the repetitive communication and data-entry tasks embedded in truckload freight. The product suite includes Vooma Quote (identifies rate requests in inbound email and drafts responses), Vooma Build (automates data entry for load orders), and Vooma Voice (handles inbound calls for booking and scheduling). Rather than replacing a broker's transportation management system, Vooma sits on top of existing workflows across email, text, and voice channels — the channels brokers and carriers already use — and automates the manual steps between them. Customers include Echo, MODE, Arrive Logistics, and NFI, all established freight brokerages and carriers.

### Thesis: why invest

Vooma raised a $13m Series A in December 2024, led by Craft Ventures with Index Ventures participating, on top of a $3.6m seed led by Index Ventures with angel investors from Motive, project44, Ryder, and Uber Freight — a strong signal of informed insider conviction from operators who understand freight-brokerage economics. Since its 2023 launch, the company reports 12.5x revenue growth and more than 32x growth in transaction volume, disclosed at the time of the Series A announcement.

Freight brokerage is a labor-intensive, thin-margin business where headcount scales roughly linearly with load volume. An AI agent layer that removes manual quote-drafting, data entry, and phone-based booking directly improves broker margin without requiring brokers to rip out their existing TMS. The moat is workflow-specific training data: every quote, call, and load Vooma processes across its multi-channel deployment improves its models for the next customer, and integration into a broker's existing communication channels (not a separate portal) lowers adoption friction relative to point solutions.

**What must be true:** AI agent accuracy on freight-specific communication (rate negotiation nuance, load specifics, exception handling) must remain high enough that brokers trust it with customer-facing interactions; adoption must expand from single-product (Quote, Build, or Voice) to multi-product accounts; and Vooma must maintain differentiation as freight TMS incumbents and AI-native competitors add similar agent features.

**Next-round milestones:** $20m ARR, 130%+ net revenue retention as customers add products and volume, 50+ enterprise brokerage/carrier customers, and disclosed gross margin above 70% net of underlying model-inference costs.

### Founder bet

The bet is on two Stanford-trained operators with direct freight-industry and autonomous-vehicle-engineering backgrounds, backed by a syndicate of freight-industry angels (Motive, project44, Ryder, Uber Freight executives) whose participation is itself a form of customer validation. Diligence should confirm current ARR, customer concentration (Echo, Arrive, and NFI are large accounts whose loss or renegotiation would be material), and gross margin after inference costs.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| SMB-to-mid-market freight brokerages and 3PLs | 15,000 | $30,000 | $450m | HCP assumption: multi-product AI-agent seat pricing |
| Large enterprise brokers and carriers (top ~200 by volume) | 200 | $500,000 | $100m | HCP assumption: enterprise deployment across quote, build, and voice |
| **TAM** | 15,200 |  | **$550m** | Annual freight AI-agent software pool |
| HCP penetration |  |  | **17.1%** | About 1,600 blended accounts by 2032 |
| **2032 revenue opportunity** |  |  | **$94m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paying accounts | 80 | 180 | 360 | 600 | 900 | 1,250 | 1,600 |
| Blended annual contract value | $35k | $38k | $42k | $46k | $50k | $54k | $59k |
| **Revenue** | **$3** | **$7** | **$15** | **$28** | **$45** | **$68** | **$94** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Vooma** | Usage/subscription SaaS; freight brokers and carriers | X quote drafting, data entry, and voice booking automation | Cloud, multi-channel (email/text/voice) | Freight-specific communication training data across quote, build, and voice products | Undisclosed | $13m Series A; $16.6m total; valuation undisclosed; Craft Ventures, Index Ventures |
| HappyRobot | AI voice agents for logistics; brokers and carriers | X voice-specific automation; Partial email/data-entry breadth vs. Vooma | Cloud voice platform | Voice-specific model tuning for logistics dialogue | Undisclosed | Private; capital data undisclosed here (Series A stage per public reporting) |
| Greenscreens.ai | AI freight pricing/quoting; brokers | X dynamic pricing and quoting; Partial voice/data-entry automation | Cloud SaaS | Freight pricing-data network across brokers | Undisclosed | Private; capital data undisclosed here |
| Parade | Capacity and carrier-relationship management; brokers | X capacity management workflow; Partial quote/voice automation | Cloud SaaS | Carrier-capacity data network | Undisclosed | Private; capital data undisclosed here |
| Turvo | Transportation management system; brokers/3PLs/shippers | X TMS workflow; Partial native AI-agent automation | Cloud TMS | Broad TMS system-of-record install base | Enterprise/custom | Private; capital data undisclosed here |
| DAT Freight & Analytics | Load board and market-rate data; brokers/carriers | Partial rate benchmarking; No evidence of agent-based communication automation | Cloud platform | Long-standing load-board network and rate-data history | Subscription | Private; capital data not comparable |
| Manual broker workflow | Internal brokerage staff | Partial via TMS; No evidence of automated quote/voice handling | Phone, email, TMS | Existing carrier and shipper relationships only | N/A | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Descartes Systems Group](https://stockanalysis.com/stocks/dsgx/statistics/) | 7.95x | Closest comp: public supply-chain and logistics software company |
| [C.H. Robinson](https://stockanalysis.com/stocks/chrw/statistics/) | 1.61x | Illustrates the low multiple attached to the underlying freight-brokerage end market |
| [RXO](https://stockanalysis.com/stocks/rxo/statistics/) | 0.96x | Asset-light freight brokerage, same end-market ceiling |
| **Median** | **1.61x** | HCP uses 5.0x, weighted toward Descartes since Vooma sells software to brokers rather than operating as a broker itself; a 37% discount to Descartes for smaller scale |

| Return path | Base |
|---|---:|
| Entry post-money | $65m, HCP assumption |
| Initial ownership | 3.08% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.00% |
| 2032 revenue / exit multiple | $94m / 5.0x |
| Exit enterprise value | $470m |
| HCP proceeds / MOIC | $9.4m / **4.7x** |
| Downside / upside MOIC | 2.3x / 8.5x |

### Principal risks and why invest anyway

- **End-market multiple ceiling:** freight brokerage itself trades at low public multiples (CHRW 1.61x, RXO 0.96x), and if Vooma is ultimately valued as a brokerage-adjacent tool rather than independent software, exit multiples could compress toward that range. Invest because Vooma sells recurring software to brokers rather than taking freight risk itself, closer to the Descartes comp.
- **Customer concentration:** Echo, Arrive Logistics, and NFI are large, named accounts; losing any one would be material to a company of this size. Require customer-level revenue concentration and contract terms in diligence.
- **AI accuracy and liability:** an AI agent that misquotes a rate or mishandles a booking call has real financial and relationship consequences for brokers. Require evidence of error rates, human-in-the-loop safeguards, and any customer complaint history.
- **Competitive crowding:** HappyRobot, Greenscreens.ai, Parade, and TMS incumbents are all building toward similar agent capabilities. Vooma's differentiation must be defended with data and multi-product retention, not first-mover advantage alone.

---

## 5. Lithos Carbon

**Stage:** Seed
**Proposed HCP check:** $1.5m
**Recommendation:** Pursue
**Links:** [Company](https://www.lithoscarbon.com/) | [Seed announcement](https://www.geekwire.com/2022/carbon-removal-company-lithos-lands-6-3m-for-ag-focused-climate-tech/) | [Frontier offtake agreement](https://frontierclimate.com/writing/lithos) | [2025 delivery announcement](https://www.businesswire.com/news/home/20251202793450/en/Lithos-Carbon-Delivers-5160-Registry-Certified-Tons-of-Carbon-Removal-in-Worlds-Largest-Enhanced-Rock-Weathering-Issuance-to-Date)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Mary Yap | Co-founder and CEO | Public reporting consistently identifies Yap as CEO and spokesperson for the company, including in the Frontier offtake announcement. |
| Noah Planavsky | Co-founder | Identified as co-founder with an academic geochemistry/earth-science background; exact current institutional affiliation not independently confirmed this session. Confirm in diligence. |
| Chris Reinhard | Co-founder | Identified as co-founder with an academic geochemistry/earth-science background; exact current institutional affiliation not independently confirmed this session. Confirm in diligence. |

**Stage correction:** the roster listed Lithos as "Series A." HCP could only verify one priced equity round: a $6.29m seed in October 2022, led by Union Square Ventures and Greylock Partners with Bain Capital Ventures and climate/agriculture funds participating. The $57.1m figure widely indexed by Crunchbase and Tracxn as a "Series A" is, per Frontier's own writeup, a **carbon-removal purchase (offtake) agreement**: Frontier buyers (Alphabet, H&M, JPMorgan, Shopify, Stripe, and others) committed to pay Lithos $57.1m to deliver 154,240 tons of verified CO2 removal between 2024 and 2028. That is revenue under contract, not equity capital, and HCP does not count it toward funding totals. No subsequent priced equity round is confirmed in public sources; HCP underwrites Lithos at Seed stage.

### Product description

Lithos Carbon removes atmospheric carbon dioxide through enhanced rock weathering: it spreads crushed basalt on farmland, where rainwater-driven weathering reactions convert atmospheric CO2 into dissolved bicarbonate while releasing nutrients that can improve soil health and crop yield. The company measures and verifies removal volumes through its own MRV (measurement, reporting, and verification) process and sells the resulting credits, largely to corporate buyers under offtake agreements. In December 2025, Lithos announced delivery of 5,160 registry-certified tons of carbon removal in what it described as the world's largest enhanced-rock-weathering issuance to date — a concrete, verified delivery data point rather than a modeled projection.

### Thesis: why invest

Enhanced rock weathering is one of the few carbon-removal pathways that can plausibly reach gigaton scale because it uses existing farmland and abundant basalt rather than requiring new energy-intensive industrial infrastructure (unlike direct air capture) or new land use (unlike afforestation). Lithos's December 2023 offtake agreement with Frontier — a coalition of Alphabet, H&M, JPMorgan, Shopify, Stripe, and others — was, per Frontier, the world's first enhanced-weathering offtake agreement, and its December 2025 delivery of registry-certified tons converts that commitment into demonstrated execution rather than a paper promise.

The moat is operational and scientific: a working farmer network, logistics for basalt sourcing and spreading, and an MRV methodology precise enough to satisfy registry certification and sophisticated corporate buyers. Enhanced weathering's core scientific challenge — measuring how much CO2 was actually removed from a highly variable, biologically active soil system — is hard to replicate quickly, and Lithos's track record of registry-certified deliveries is direct evidence it has solved enough of that problem to sell credits at scale.

**What must be true:** MRV precision and cost must keep improving so that verification does not consume an unsustainable share of revenue; realized price per tonne must decline gradually (as the company and buyers both want) without compressing gross margin faster than volume grows; and farmer-network economics must remain attractive enough to scale enrolled acreage without Lithos absorbing all the cost.

**Next-round milestones:** a disclosed, priced equity round confirming post-money valuation; 500,000+ tons of cumulative delivered, registry-certified removal; expansion of the offtake customer base beyond the original Frontier coalition; and published unit economics (cost per verified tonne versus realized price per tonne).

### Founder bet

The bet is on a founding team combining deep geochemistry research (Planavsky and Reinhard) with an operator CEO (Yap) who has converted that science into a commercial delivery track record faster than most competing enhanced-weathering startups. Diligence should independently confirm the founders' current institutional affiliations and time commitment, and should treat the absence of any disclosed priced round since 2022 as a real gap to close before finalizing terms — HCP may effectively be pricing a de facto Series A without a comparable round to anchor against.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Global durable carbon-removal demand addressable by scaled agricultural enhanced weathering suppliers by 2032 | 8,000,000 tonnes | $150/tonne | $1.20bn | HCP assumption: durable-CDR buyer demand pool reachable by an ERW-focused supplier at scale |
| **TAM** |  |  | **$1.20bn** | Annual durable-CDR revenue pool addressable by ERW suppliers |
| HCP penetration |  |  | **12.5%** | About 1,000,000 tonnes delivered annually by 2032; aggressive for a nascent market but consistent with Lithos's early leadership in certified ERW delivery |
| **2032 revenue opportunity** |  |  | **$150m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Tonnes delivered (thousands) | 20 | 50 | 110 | 220 | 400 | 650 | 1,000 |
| Realized price/tonne | $180 | $175 | $170 | $165 | $160 | $155 | $150 |
| **Revenue** | **$4** | **$9** | **$19** | **$36** | **$64** | **$101** | **$150** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Lithos Carbon** | Carbon-removal offtake/credit sales; corporate buyers | X basalt application, MRV, registry-certified delivery | Farmland-based enhanced weathering | Farmer network plus MRV precision; registry-certified delivery track record | Undisclosed per-tonne pricing; Frontier offtake at $57.1m for 154,240 tons implies ~$370/ton blended contract price | $6.29m seed (2022); $57.1m Frontier offtake (revenue, not equity); no subsequent priced equity round confirmed |
| Eion | Enhanced rock weathering; corporate buyers | X basalt/olivine application and MRV; Partial disclosed delivery scale vs. Lithos | Farmland-based enhanced weathering | Alternative feedstock and MRV approach | Undisclosed | Private; capital data undisclosed here |
| UNDO Carbon | Enhanced rock weathering (UK-based); corporate buyers | X basalt spreading and MRV; Partial U.S. farmland scale vs. Lithos | Farmland-based enhanced weathering | Early mover with substantial disclosed tonnage delivered in UK/international markets | Undisclosed | Private; capital data undisclosed here |
| InPlanet | Enhanced rock weathering (Brazil-focused); corporate buyers | X basalt application in tropical agriculture; Partial U.S. presence | Farmland-based enhanced weathering | Tropical/agricultural geography differentiation | Undisclosed | Private; capital data undisclosed here |
| Mati Carbon | Enhanced rock weathering (smallholder-farmer focus); corporate/philanthropic buyers | X basalt application and MRV; Partial corporate-offtake scale vs. Lithos | Farmland-based enhanced weathering | Smallholder-farmer network and co-benefit framing | Undisclosed | Private; capital data undisclosed here |
| Terradot | Enhanced rock weathering; corporate buyers | X basalt application and MRV; Partial disclosed delivery scale vs. Lithos | Farmland-based enhanced weathering | Large disclosed offtake commitments from hyperscale buyers | Undisclosed | Private; capital data undisclosed here |
| Charm Industrial (adjacent pathway) | Bio-oil carbon removal; corporate buyers | X different CDR pathway (pyrolysis, not weathering); No evidence of direct ERW competition | Industrial/biomass-based | Different, non-agricultural feedstock model | Undisclosed | Private; capital data undisclosed here |

### Public comps and exit model

No pure-play public comp exists for agricultural enhanced rock weathering. HCP uses a blend of agricultural-inputs and environmental-services comps as imperfect proxies.

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Tetra Tech](https://stockanalysis.com/stocks/ttek/statistics/) | 2.06x | Environmental consulting and measurement services, closest structural analog to MRV-heavy delivery |
| [Nutrien](https://stockanalysis.com/stocks/ntr/statistics/) | 1.69x | Agricultural-inputs company applying material to farmland at scale |
| [UL Solutions](https://stockanalysis.com/stocks/uls/statistics/) | 5.79x | Independent testing/certification/verification business model, relevant to Lithos's registry-certified-delivery model |
| **Median** | **2.06x** | HCP uses 2.0x, near the environmental-services/agricultural-inputs comps and well below the certification-business UL Solutions comp, reflecting Lithos's current dependence on physical, farmland-based delivery |

| Return path | Base |
|---|---:|
| Entry post-money | $40m, HCP assumption |
| Initial ownership | 3.75% |
| Cumulative future dilution | 40%, HCP assumption (higher than default given capital intensity of scaling farmland operations and MRV) |
| Exit ownership | 2.25% |
| 2032 revenue / exit multiple | $150m / 2.0x |
| Exit enterprise value | $300m |
| HCP proceeds / MOIC | $6.75m / **4.5x** |
| Downside / upside MOIC | 1.4x / 10.1x |

### Principal risks and why invest anyway

- **No confirmed priced round since 2022:** HCP is effectively pricing this investment without a recent equity comp to anchor against, and the widely reported "$57.1m Series A" is not equity. Require full cap table, current valuation basis, and use-of-proceeds detail before finalizing terms.
- **MRV and measurement uncertainty:** enhanced weathering's carbon accounting depends on soil, hydrology, and mineralogy modeling that is inherently harder to verify than, say, direct air capture's mass-balance measurement. Invest because Lithos has already achieved registry certification at meaningful scale (5,160 tons in one issuance), evidence the methodology satisfies independent verifiers today.
- **Buyer concentration:** the Frontier coalition (Alphabet, H&M, JPMorgan, Shopify, Stripe) represents the company's most visible offtake demand; loss of Frontier-coalition support or a slowdown in corporate voluntary-market buying would directly hit revenue. Track customer diversification beyond Frontier as a milestone.
- **Unit economics disclosure gap:** no public cost-per-tonne or gross-margin figure exists. Require this in diligence; enhanced weathering's economics depend heavily on basalt sourcing/transport cost and MRV overhead, both of which could be higher than the model assumes.

---

## 6. Paces

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Diligence
**Links:** [Company](https://www.paces.com/) | [Series A announcement](https://www.paces.com/news/paces-raises-11-million-to-accelerate-clean-energy-development) | [ESG Today coverage](https://www.esgtoday.com/energy-infrastructure-software-startup-paces-raises-11-million-to-accelerate-green-energy-development/) | [Product](https://www.paces.com/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| James Mcwalter | Co-founder and CEO | Multiple financing reports (ESG Dive, Utility Dive, ESG Today) identify Mcwalter as co-founder and CEO; company founded in 2022 and headquartered in Brooklyn, New York. |
| Charles Bai | Co-founder | Identified alongside Mcwalter as co-founder in company and press materials; exact current title not confirmed in available coverage. Confirm in diligence. |

### Product description

Paces is a GIS and AI-driven data platform for renewable-energy site selection and permitting due diligence. Its two flagship tools are Project Search, which lets developers screen potential sites against custom parameters using consolidated spatial, zoning, permitting, interconnection, and environmental data, and Permitting Predictor, which analyzes local, state, and federal zoning and permitting risk to flag likely obstacles before a developer commits capital. The company describes its platform as compressing site-selection and due-diligence work "from months to minutes." Disclosed customers include EDF Renewables, AES, and Third Pillar Solar.

### Thesis: why invest

Paces raised an $11m Series A in July 2024, led by Navitas Capital with Suffolk Technologies and MCJ Collective joining, on top of a $1.9m pre-seed led by Resolute Ventures. Renewable-project siting sits upstream of the interconnection bottleneck that companies like Nira Energy (also in this batch) address downstream: before a developer can even request interconnection, it needs to identify a technically and politically viable site, which today requires manually cross-referencing zoning maps, environmental data, and permitting history across thousands of U.S. jurisdictions.

The moat is data aggregation depth: zoning, permitting, environmental, and interconnection data are scattered across county, state, and federal sources with no common schema, and assembling them into a queryable, AI-analyzable layer is a multi-year data-engineering effort. Named enterprise customers (EDF Renewables, AES) suggest the platform has cleared the bar for large developers' due-diligence workflows, not just smaller independent developers.

**What must be true:** data coverage and freshness must scale faster than any single competitor or in-house GIS team can replicate; Permitting Predictor's risk assessments must remain accurate enough that developers trust it for real capital-allocation decisions; and Paces must expand from a due-diligence tool used early in a project's life into a platform developers return to across the full project lifecycle.

**Next-round milestones:** disclosed ARR (currently undisclosed), 100+ enterprise developer customers, expansion of Permitting Predictor's jurisdictional coverage nationwide, and at least one disclosed case study quantifying time or cost savings versus a manual siting process.

### Founder bet

The bet is on a founding team that identified siting and permitting risk — not interconnection or financing — as the highest-leverage upstream data problem in renewable development, and built enough data infrastructure in two years to win large developer customers. Diligence should confirm current ARR, customer renewal behavior, and how defensible the underlying data licenses and pipelines are against a well-funded GIS incumbent (Bentley Systems) or a large developer building the same capability in-house.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Renewable, storage, and EV-charging developer firms | 4,500 | $40,000 | $180m | HCP assumption: per-developer siting and due-diligence subscription |
| Utility and large independent power producer accounts | 500 | $150,000 | $75m | HCP assumption: enterprise multi-project deployments |
| Data licensing to EPCs, financiers, and insurers | 300 | $80,000 | $24m | HCP assumption: risk-data licensing beyond core developer customers |
| **TAM** | 5,300 |  | **$279m** | Annual green-infrastructure siting-data software pool |
| HCP penetration |  |  | **17.2%** | About 1,150 blended customers by 2032 |
| **2032 revenue opportunity** |  |  | **$47m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paying accounts | 50 | 110 | 220 | 380 | 600 | 850 | 1,150 |
| Blended annual contract value | $22k | $25k | $28k | $31k | $34k | $37k | $41k |
| **Revenue** | **$1** | **$3** | **$6** | **$12** | **$20** | **$31** | **$47** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Paces** | Subscription SaaS; renewable/storage/EV-charging developers | X site search, X permitting risk prediction | Cloud GIS/AI platform | Aggregated zoning, permitting, environmental, and interconnection data with AI risk scoring | Undisclosed | $11m Series A; $12.9m total; valuation undisclosed; Navitas Capital, Suffolk Technologies, MCJ Collective |
| Anza | Interconnection cost/queue benchmarking data; developers | Partial siting-adjacent data; X interconnection-cost focus rather than permitting/zoning | Cloud platform | Aggregated interconnection-request dataset | Undisclosed | Private; capital data undisclosed here |
| Landgate | Land and renewable-energy site data; developers/landowners | X land and resource data; Partial permitting-risk prediction depth vs. Paces | Cloud platform | Land-transaction and resource-data marketplace | Undisclosed | Private; capital data undisclosed here |
| Crux Climate | Clean-energy tax-credit transferability and project data; developers/financiers | Partial project and siting-adjacent data; X core focus is tax-credit transactions, not siting | Cloud platform | Tax-credit transaction network and data | Undisclosed | Private; capital data undisclosed here |
| Bentley Systems (Seequent/OpenUtilities) | Engineering/GIS software; utilities and engineers | X broad geospatial modeling; Partial renewable-siting-specific permitting risk scoring | Enterprise software | Deep engineering-software install base | Enterprise/custom | Public company product |
| Government/public GIS data (NREL, state/local portals) | Free public data; developers | Partial raw data; No evidence of consolidated AI-driven risk scoring | Public web portals | Free, authoritative source data | Free | Public sector |
| In-house Esri-based GIS teams | Internal developer analyst teams | Partial manual GIS analysis; No evidence of automated cross-jurisdiction permitting prediction | Desktop GIS tools | Existing developer relationships and local expertise | N/A | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Bentley Systems](https://stockanalysis.com/stocks/bsy/statistics/) | 7.19x | Closest comp: public GIS/engineering software for infrastructure |
| [CoStar Group](https://stockanalysis.com/stocks/csgp/statistics/) | 3.54x | Aggregated real-estate/geospatial data platform, similar data-moat model |
| [Verisk Analytics](https://stockanalysis.com/stocks/vrsk/statistics/) | 9.80x | Proprietary risk-data analytics business model |
| **Median** | **7.19x** | HCP uses 5.0x, a 30% discount to median reflecting Paces' smaller scale and narrower current focus than Bentley |

| Return path | Base |
|---|---:|
| Entry post-money | $45m, HCP assumption |
| Initial ownership | 4.44% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.89% |
| 2032 revenue / exit multiple | $47m / 5.0x |
| Exit enterprise value | $235m |
| HCP proceeds / MOIC | $6.8m / **3.4x** |
| Downside / upside MOIC | 1.6x / 6.1x |

### Principal risks and why invest anyway

- **Policy dependency:** demand for renewable siting software is directly tied to the pace of U.S. clean-energy and data-center-driven grid buildout, which is sensitive to federal tax-credit and permitting policy. Invest because data-center and industrial load growth (not only renewables policy) is an independent, currently strong demand driver for faster siting decisions.
- **Data licensing and freshness risk:** the platform depends on continuously updated zoning, permitting, and environmental data across thousands of jurisdictions; any gap in coverage or staleness directly undermines Permitting Predictor's core value proposition. Require evidence of data-refresh cadence and jurisdictional coverage breadth in diligence.
- **Incumbent GIS competition:** Bentley Systems and large in-house developer GIS teams could replicate core functionality given enough time and capital. Paces' defense must be speed of jurisdictional coverage expansion and AI-driven risk-prediction accuracy, both of which should be benchmarked against a manual process in diligence.
- **Thin public disclosure:** no ARR, customer count beyond three named logos, or growth rate is public. Treat this memo's revenue build as an HCP model until a data room clarifies actual scale.

---

## 7. Verse

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Diligence
**Links:** [Company](https://verse.inc/) | [Series A announcement](https://verse.inc/press/verse-inc-secures-20-5-million-series-a-funding-led-by-gv/) | [Series A press release](https://www.prnewswire.com/news-releases/verse-secures-20-5-million-in-series-a-funding-led-by-gv-to-help-organizations-reduce-electricity-costs--emissions-302152878.html) | [Seed announcement](https://www.prnewswire.com/news-releases/clean-energy-procurement-and-management-software-provider-verse-closes-5-75m-seed-round-led-by-coatue-launches-first-product-and-signs-climeworks-as-customer-301879805.html)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Seyed Madaeni | Co-founder | Identified as co-founder in Series A and seed financing press releases; company founded in 2022. Exact current title not confirmed; confirm in diligence. |
| Matt Penfold | Co-founder | Identified as co-founder alongside Madaeni in company financing materials. Exact current title not confirmed; confirm in diligence. |

### Product description

Verse builds Aria, a SaaS platform that helps corporations set, plan, procure, and manage clean-energy goals — from renewable energy credit (REC) purchases to hourly-matched carbon-free energy (CFE) portfolios spanning power purchase agreements and on-site assets. The company states Aria uses generative AI to help customers define clean-energy targets and optimize portfolios for cost and emissions, and claims the platform can help customers reduce electricity costs by 10% or more while eliminating Scope 2 emissions. Verse's first disclosed customer, announced at its seed round, was Climeworks, a direct-air-capture company with its own significant clean-power needs.

### Thesis: why invest

Verse raised a $20.5m Series A in May 2024, led by GV (Google Ventures) with Coatue, CIV, and MCJ Collective participating, following a $5.75m seed in July 2023 led by Coatue — meaning Coatue backed the company at both stages, a positive signal of continued conviction. Corporate clean-power procurement today is largely a manual, consultant-driven process: sustainability teams work with energy brokers and lawyers to structure PPAs and REC purchases with limited software tooling, similar to how enterprise ERP looked before modern SaaS. Verse's bet is that this becomes a software-managed, continuously optimized portfolio problem rather than a one-off transaction.

The moat, if it materializes, is a combination of market and pricing data across clean-energy assets and contracts, plus the workflow lock-in of managing a multi-year PPA/REC portfolio inside one platform. The risk is that the category's growth is directly tied to corporate sustainability budgets and policy tailwinds, both of which have become less certain in the U.S. through 2025 and 2026 than they were when Verse was founded in 2022.

**What must be true:** corporate clean-power procurement budgets must continue growing even amid policy uncertainty (driven increasingly by data-center load growth and cost economics rather than pure ESG mandates); Aria's AI-driven recommendations must demonstrably outperform incumbent broker/consultant workflows on cost and speed; and Verse must expand beyond point transactions into an ongoing, renewed subscription relationship.

**Next-round milestones:** disclosed ARR (currently undisclosed), net revenue retention above 120% as customers expand procured volume, 100+ enterprise customers, and at least one published case study quantifying realized cost or emissions savings versus a broker-led process.

### Founder bet

The bet is on a founding team that raised from a strong, repeat-backing investor syndicate (GV, Coatue across two rounds) in a category that is genuinely underserved by software today. Diligence should confirm current ARR and customer count beyond Climeworks, and should specifically test how much of the company's pipeline depends on U.S. federal clean-energy tax incentives that have faced political headwinds through 2025-2026 versus corporate demand (particularly data-center power needs) that is less policy-dependent.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market corporates with active renewable procurement programs | 8,000 | $40,000 | $320m | HCP assumption: core procurement and portfolio-management subscription |
| Large enterprise/Fortune 1000 with multi-asset clean-power portfolios | 1,500 | $150,000 | $225m | HCP assumption: complex multi-asset, multi-market deployments |
| Utilities and energy retailers embedding Aria for corporate customers | 200 | $400,000 | $80m | HCP assumption: white-label/embedded distribution |
| **TAM** | 9,700 |  | **$625m** | Annual corporate clean-power procurement software pool |
| HCP penetration |  |  | **19.2%** | About 1,400 blended accounts by 2032; aggressive, assumes Verse becomes the default platform in a still-nascent, software-underserved category |
| **2032 revenue opportunity** |  |  | **$120m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paying accounts | 60 | 130 | 260 | 460 | 750 | 1,050 | 1,400 |
| Blended annual contract value | $35k | $40k | $46k | $54k | $63k | $74k | $86k |
| **Revenue** | **$2** | **$5** | **$12** | **$25** | **$47** | **$78** | **$120** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Verse** | Subscription SaaS; corporate sustainability/energy teams | X goal-setting, procurement planning, portfolio management via Aria | Cloud SaaS | GenAI-driven portfolio optimization plus market/pricing data across clean-energy contracts | Undisclosed | $20.5m Series A; $26.25m total; valuation undisclosed; GV, Coatue, CIV, MCJ Collective |
| LevelTen Energy | PPA marketplace and analytics; corporate buyers and developers | X PPA transaction marketplace and pricing data; Partial full portfolio-management/goal-setting workflow vs. Verse | Cloud marketplace and SaaS | Large PPA transaction and pricing dataset | Undisclosed | Private; capital data undisclosed here |
| Watershed | Corporate carbon accounting and reduction software; sustainability teams | Partial clean-energy procurement workflow; X core focus is broader carbon accounting, not procurement optimization | Cloud SaaS | Broad carbon-accounting customer base and data | Undisclosed | Private; valuation not used |
| Persefoni | Corporate carbon accounting/CSRD compliance software; sustainability/finance teams | Partial clean-energy procurement workflow; X core focus is disclosure/compliance, not procurement | Cloud SaaS | Compliance-grade carbon-accounting engine | Undisclosed | Private; valuation not used |
| Schneider Electric Sustainability Business | Enterprise sustainability advisory and software; large corporates | X broad procurement and advisory services; Partial AI-native, self-serve workflow vs. Verse | Advisory plus software platform | Large existing enterprise energy-management relationships | Custom | Public company division |
| Edison Energy | Energy and sustainability advisory with software tools; large corporates | X procurement advisory; Partial standalone software platform vs. Verse | Advisory-led, software-supported | Long-standing broker/advisory relationships | Custom | Private; capital data not comparable |
| In-house broker/consultant-led procurement | Corporate sustainability and procurement teams | Partial via spreadsheets and external brokers; No evidence of integrated software optimization | Manual/advisory | Existing broker relationships | N/A | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Workiva](https://stockanalysis.com/stocks/wk/statistics/) | 3.39x | Closest public comp: compliance/ESG-adjacent enterprise SaaS |
| [CoStar Group](https://stockanalysis.com/stocks/csgp/statistics/) | 3.54x | Data-and-workflow platform business model |
| [Itron](https://stockanalysis.com/stocks/itri/statistics/) | 2.00x | Energy-sector software/data comp, hardware-weighted |
| **Median** | **3.39x** | HCP uses 3.5x, at the median, a modest premium to Workiva reflecting Verse's faster reported growth against the risk of policy-driven demand volatility |

| Return path | Base |
|---|---:|
| Entry post-money | $90m, HCP assumption |
| Initial ownership | 2.78% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.81% |
| 2032 revenue / exit multiple | $120m / 3.5x |
| Exit enterprise value | $420m |
| HCP proceeds / MOIC | $7.6m / **3.0x** |
| Downside / upside MOIC | 1.3x / 5.9x |

### Principal risks and why invest anyway

- **Policy exposure:** corporate clean-energy procurement economics are sensitive to U.S. federal tax-credit policy, which has faced rollback pressure through 2025-2026. Invest because a growing share of demand (data-center and AI-driven load growth needing firm clean power for cost and grid-capacity reasons) is now less dependent on ESG mandates than it was when Verse was founded.
- **Thin public disclosure:** no ARR, customer count beyond Climeworks, or growth rate is public despite $26.25m raised across two rounds. Require current ARR and net retention before finalizing terms.
- **Category crowding at the edges:** Watershed, Persefoni, and LevelTen Energy all touch adjacent parts of the same corporate-sustainability software stack; a platform-consolidation move by any of them could compress Verse's independent value. Track whether Verse's procurement-specific depth remains differentiated as adjacent players expand scope.
- **Entry price versus disclosed traction:** at an HCP-assumed $90m post-money against undisclosed revenue, the base MOIC is moderate rather than exceptional. Require current ARR to test whether the assumed valuation is conservative or aggressive before committing.

---

## 8. Texture

**Stage:** Series A
**Proposed HCP check:** $2.25m
**Recommendation:** Diligence
**Links:** [Company](https://www.texturehq.com/) | [Series A announcement](https://www.texturehq.com/blog/texture-series-a) | [Financing coverage](https://www.powermag.com/texture-raises-12-5m-to-tackle-the-operational-complexity-of-the-modern-grid/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Sanjiv Sanghavi | Co-founder and CEO | Identified by name and title in the company's own Series A blog post. |
| Additional co-founders | Undisclosed | The company's Series A post references two additional co-founders by first name only ("Nick" and "Victor"); full names, surnames, and titles were not independently verifiable in public sources within this session. Confirm in diligence. |

### Product description

Texture describes itself as "the operating system for energy" for utilities, positioning itself around two core capabilities: grid visibility (a single view of every meter, device, and data source on a utility's network, including outage detection and transformer load tracking) and grid operations (load shifting, asset dispatch, and flexibility/demand-response program management). The platform integrates with OEM and energy-data partners including Tesla, FranklinWH, Honeywell, Ecobee, SolarEdge, Leap Energy, and WattTime, and has completed SOC 2 Type I and Type II certification. Disclosed customers include Vermont Electric Cooperative and sonnen (a virtual-power-plant operator managing residential batteries).

### Thesis: why invest

Texture raised a $12.5m Series A in May 2026, co-led by VoLo Earth Ventures and Equal Ventures with Lerer Hippeau and Abstract Ventures increasing their positions, bringing total disclosed funding to approximately $23m. Alongside the round, Texture announced a partnership with NRTC (National Rural Telecommunications Cooperative), whose network represents 850 utility cooperatives nationwide — a distribution channel that could meaningfully accelerate customer acquisition among smaller utilities that lack the budget or staff for enterprise DERMS (distributed energy resource management system) deployments from legacy vendors.

The moat, if defensible, is integration breadth across a highly fragmented device and data landscape (dozens of battery, solar, thermostat, and EV-charging OEMs, each with different APIs) combined with SOC 2-certified reliability that utilities require before connecting Texture to grid-operations workflows. Smaller utilities and co-ops are underserved by legacy DERMS vendors built for large investor-owned utilities, and the NRTC partnership gives Texture a distribution shortcut into exactly that underserved segment.

**What must be true:** device and OEM integration breadth must keep expanding as new DER hardware categories (batteries, EV chargers, smart thermostats, water heaters) proliferate; the NRTC channel must convert into meaningful paid utility/co-op deployments rather than remaining a pilot-stage partnership; and Texture must prove grid-operations reliability at a level utilities trust for real-time dispatch, not just visibility and monitoring.

**Next-round milestones:** disclosed ARR (currently undisclosed), 50+ paying utility/co-op customers (beyond pilots), measurable NRTC-channel conversion, and at least one published case study quantifying outage-detection or load-shifting impact.

### Founder bet

The bet is on a founding team building integration-heavy grid software for a segment (utility cooperatives and smaller municipal utilities) that legacy DERMS vendors have largely underserved, with an early distribution partnership (NRTC) that could be a meaningful unlock if it converts to paid deployments. Diligence should confirm the full founding-team roster and titles (only the CEO is named in available public sources), current ARR, and the commercial terms of the NRTC partnership.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| U.S. electric utilities and cooperatives (excluding largest investor-owned utilities already served by legacy GIS/ADMS vendors) | 2,500 | $80,000 | $200m | HCP assumption: grid-visibility and DER-coordination subscription |
| DER aggregators and virtual-power-plant operators | 500 | $150,000 | $75m | HCP assumption: device-coordination and program-management fees |
| Large investor-owned utility enterprise deployments | 100 | $500,000 | $50m | HCP assumption: enterprise-scale deployments |
| **TAM** | 3,100 |  | **$325m** | Annual grid-visibility and DER-operations software pool |
| HCP penetration |  |  | **17.8%** | About 750 blended utility/DER accounts by 2032 |
| **2032 revenue opportunity** |  |  | **$58m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Utility/DER accounts | 40 | 90 | 170 | 280 | 420 | 580 | 750 |
| Blended annual contract value | $45k | $50k | $56k | $62k | $68k | $73k | $77k |
| **Revenue** | **$2** | **$5** | **$10** | **$17** | **$29** | **$42** | **$58** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Texture** | Subscription SaaS; utilities and co-ops | X grid visibility, X load shifting/asset dispatch, X DER coordination | Cloud platform, SOC 2 Type I/II certified | OEM/device integration breadth (Tesla, FranklinWH, Honeywell, Ecobee, SolarEdge) plus NRTC's 850-co-op distribution channel | Undisclosed | $12.5m Series A; ~$23m total; valuation undisclosed; VoLo Earth Ventures, Equal Ventures, Lerer Hippeau, Abstract Ventures |
| Camus Energy | Grid operations/DERMS software; utilities | X grid ops and DER coordination workflow; Partial disclosed OEM-integration breadth vs. Texture | Cloud platform | Grid-ops-specific software for utilities of varying size | Undisclosed | Private; capital data undisclosed here |
| Uplight | DER and customer-engagement software; utilities | X broad DER program management; Partial single-view device visibility depth vs. Texture | Cloud platform | Large incumbent utility customer base | Enterprise/custom | Private; capital data undisclosed here |
| Itron | Metering and grid-edge data infrastructure; utilities | X device/meter data at scale; Partial modern DER-coordination software depth vs. Texture | Hardware plus software | Massive installed meter base | Enterprise/custom | Public |
| Bidgely | AI-driven energy-data analytics; utilities | X consumption analytics and disaggregation; Partial real-time grid-ops/dispatch capability vs. Texture | Cloud SaaS | Device-level load-disaggregation AI models | Undisclosed | Private; capital data undisclosed here |
| Kraken Technologies (Octopus Energy) | Utility operating platform, licensed; utilities | X broad utility operations platform; Partial DER-specific device-integration breadth vs. Texture | Licensed enterprise software | Proven at large scale within Octopus Energy and licensees | Enterprise/custom | Subsidiary of Octopus Energy; capital data not comparable |
| Legacy utility SCADA/OMS vendors (Oracle Utilities, GE Vernova) | Enterprise grid-management software; large utilities | X core grid operations; No evidence of modern DER/OEM-device integration breadth | Enterprise on-prem/cloud | Long-standing utility relationships and regulatory approval | Enterprise/custom | Public company divisions |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Itron](https://stockanalysis.com/stocks/itri/statistics/) | 2.00x | Grid-data and metering infrastructure comp |
| [Enphase Energy](https://stockanalysis.com/stocks/enph/statistics/) | 3.69x | Distributed-energy hardware-plus-software comp |
| [Stem, Inc.](https://stockanalysis.com/stocks/stem/statistics/) | 2.54x | Closest direct comp: DER software/storage-management company |
| **Median** | **2.54x** | HCP uses 3.0x, a modest premium to the median reflecting Texture's pure-software model versus Stem's and Enphase's hardware exposure, tempered by the DER sector's broader multiple compression |

| Return path | Base |
|---|---:|
| Entry post-money | $55m, HCP assumption |
| Initial ownership | 4.09% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.66% |
| 2032 revenue / exit multiple | $58m / 3.0x |
| Exit enterprise value | $174m |
| HCP proceeds / MOIC | $4.6m / **2.1x** |
| Downside / upside MOIC | 0.8x / 4.1x |

### Principal risks and why invest anyway

- **DER-sector multiple compression:** public DER-adjacent comps (Stem, Enphase, Itron) all trade at modest multiples after a difficult 2023-2025 stretch for the sector. Invest only if diligence confirms Texture's pure-software, utility-subscription model (rather than hardware sales) genuinely commands a premium to these hardware-exposed peers.
- **Incomplete founder disclosure:** only the CEO is named in public sources; two additional co-founders are referenced by first name only. Require full leadership roster, equity ownership, and titles before finalizing terms.
- **Channel-conversion risk:** the NRTC partnership covers 850 co-ops but is new (announced with the Series A); it may take years to convert into meaningful paid deployments, and co-ops are typically slow, budget-constrained buyers. Track paid-conversion rate from the NRTC channel explicitly as a milestone.
- **Downside scenario shows capital loss:** at HCP's base assumptions, a below-case outcome (60% of base revenue, one turn off the multiple) produces a MOIC below 1.0x. Require evidence of gross margin and utility-sales-cycle length before committing capital at the proposed valuation.

---

## 9. Cargado

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Watch
**Links:** [Company](https://cargado.com/) | [Series A announcement](https://cargado.com/news) | [FreightWaves coverage](https://www.freightwaves.com/news/exclusive-cargado-raises-12m-to-boost-cross-border-trucking-marketplace)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Matt Silver | Co-founder | FreightWaves and the company's own Series A materials identify Silver as co-founder; company founded in January 2024. Exact current title not confirmed; confirm in diligence. |
| Rylan Hawkins | Co-founder | FreightWaves and the company's own Series A materials identify Hawkins as co-founder alongside Silver. Exact current title not confirmed; confirm in diligence. |

### Product description

Cargado operates an invite-only load board for cross-border U.S.-Mexico trucking freight. Brokers, 3PLs, and freight forwarders post cross-border loads and receive bids from a vetted network of cross-border trucking companies; the company personally vets every carrier before granting marketplace access, addressing a real trust and fraud problem in cross-border freight where carrier legitimacy and customs compliance are harder to verify than in domestic U.S. trucking. At the time of its Series A, Cargado reported more than 200 broker/3PL/forwarder customers and more than 650 vetted cross-border carriers, achieved within roughly six months of public launch.

### Thesis: why invest

Cargado raised a $12m Series A in April 2025, led by LGVP with Conversion Capital, Assembly Ventures, and Friends & Family Capital joining as new investors alongside existing investors Primary Venture Partners, Ironspring Ventures, Zenda Capital, and Proeza Ventures. U.S.-Mexico cross-border trucking is a large, structurally growing freight corridor as nearshoring shifts manufacturing toward Mexico, and it is underserved by modern digital marketplaces relative to domestic U.S. freight, which DAT, Uber Freight, and others have already digitized. Cargado's carrier-vetting process directly addresses a documented pain point (customs fraud, unreliable cross-border carriers) that generic domestic load boards do not solve.

The moat, if it holds, is the vetted carrier network itself and the trust and performance data accumulated across it — a two-sided network where both broker-side demand and vetted-carrier supply reinforce each other. The company's rapid growth (200+ customers and 650+ carriers within six months of launch) is a genuine positive signal of product-market fit in a specific niche.

**What must be true:** the vetted-carrier network must remain meaningfully more trustworthy than open load boards as it scales, without vetting quality degrading; take rate or monetization per load must expand beyond simple brokerage matching into higher-margin services (factoring, insurance, customs, financing) to escape freight brokerage's structurally thin public-market multiples; and Cargado must defend its position against Nuvocargo, a well-funded direct competitor targeting the same corridor.

**Next-round milestones:** disclosed net revenue/take rate, 1,500+ vetted carriers, expansion into at least one adjacent monetization line (factoring, customs brokerage, or insurance), and evidence that carrier and broker retention remain high as the network scales past its initial cohort.

### Founder bet

The bet is on two founders who identified a specific, underserved corridor (U.S.-Mexico cross-border trucking) and built rapid two-sided marketplace liquidity within six months of launch. Diligence should focus on unit economics per load (take rate net of vetting/compliance cost), customer concentration among the 200 disclosed brokers/3PLs, and a direct comparison against Nuvocargo's scale and funding.

### Market, TAM, and revenue build

| Bottom-up step | Units | Value | Result | Basis |
|---|---:|---:|---:|---|
| Addressable U.S.-Mexico cross-border truckload freight volume reachable via a vetted digital marketplace | 8,000,000 loads/year | $2,500 avg load value | $20.00bn GMV | HCP assumption: brokers/3PLs/forwarders segment reachable by a trust-vetted digital marketplace |
| Marketplace monetization rate | | 2.0% | $400m | HCP assumption: blended brokerage-fee-equivalent monetization across matched loads |
| **TAM** | | | **$400m** | Annual net marketplace-revenue pool |
| HCP penetration |  |  | **21.0%** | About 2.2 million loads facilitated annually by 2032 |
| **2032 revenue opportunity** |  |  | **$84m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Loads facilitated (thousands) | 100 | 250 | 500 | 850 | 1,250 | 1,700 | 2,200 |
| Net revenue per load | $26 | $28 | $30 | $32 | $34 | $36 | $38 |
| **Revenue** | **$3** | **$7** | **$15** | **$27** | **$43** | **$61** | **$84** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Cargado** | Marketplace/take-rate; brokers, 3PLs, forwarders, cross-border carriers | X vetted invite-only load board, X carrier vetting | Cloud marketplace | Personally vetted cross-border carrier network (650+ at Series A) | Undisclosed | $12m Series A; total and valuation undisclosed; LGVP, Conversion Capital, Assembly Ventures, Primary Venture Partners |
| Nuvocargo | Digital freight forwarder/marketplace; U.S.-Mexico shippers and carriers | X cross-border brokerage and marketplace; Partial invite-only vetting model vs. Cargado | Cloud platform plus brokerage operations | Broader freight-forwarding and customs-adjacent service scope | Undisclosed | Private; total funding not comparable here, materially larger than Cargado's disclosed total |
| DAT Freight & Analytics | Load board and market-rate data; brokers/carriers, primarily domestic U.S. | Partial cross-border coverage; No evidence of Cargado's carrier-vetting-first model | Cloud platform | Long-standing load-board network and rate-data history | Subscription | Private; capital data not comparable |
| Uber Freight | Digital freight brokerage/marketplace; shippers and carriers | X domestic and some cross-border brokerage; Partial invite-only vetting depth vs. Cargado | Cloud platform | Large capital base and shipper relationships | Undisclosed | Private (spun out of Uber); capital data not comparable |
| J.B. Hunt 360 | Digital freight marketplace; shippers and carriers, primarily domestic | X domestic marketplace; No evidence of cross-border-specific vetting workflow | Cloud platform | Large asset-based carrier network as backstop | Undisclosed | Public company product |
| Traditional cross-border customs brokers/forwarders | Manual brokerage services; shippers | Partial matching via phone/email/personal relationships; No evidence of a digital vetted marketplace | Manual/phone/email | Existing customs and carrier relationships | Commission-based | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [C.H. Robinson](https://stockanalysis.com/stocks/chrw/statistics/) | 1.61x | Diversified freight brokerage, illustrates end-market multiple ceiling |
| [Landstar System](https://stockanalysis.com/stocks/lstr/statistics/) | 1.44x | Asset-light freight network operator |
| [RXO](https://stockanalysis.com/stocks/rxo/statistics/) | 0.96x | Pure-play asset-light freight brokerage spinoff |
| **Median** | **1.44x** | HCP uses 1.4x, at the median; freight brokerage and marketplace businesses structurally trade at low public multiples regardless of growth rate, and HCP does not assume Cargado escapes that ceiling without diligence evidence of a higher-margin monetization mix |

| Return path | Base |
|---|---:|
| Entry post-money | $45m, HCP assumption |
| Initial ownership | 4.44% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.89% |
| 2032 revenue / exit multiple | $84m / 1.4x |
| Exit enterprise value | $117.6m |
| HCP proceeds / MOIC | $3.4m / **1.7x** |
| Downside / upside MOIC | 0.7x / 4.4x |

### Principal risks and why invest anyway

- **Structurally low exit multiples:** every public comp in the freight-brokerage/marketplace category trades below 2.0x EV/LTM revenue, capping upside even in a strong operating scenario. HCP's base MOIC (1.7x) does not clear a typical venture return bar; this is a Watch, not a Pursue, until Cargado demonstrates a higher-margin monetization mix (factoring, insurance, customs) that could support a better comp set.
- **Direct, better-funded competition:** Nuvocargo targets the same U.S.-Mexico corridor with a broader service scope and a larger disclosed capital base. Require a direct win/loss and pricing comparison against Nuvocargo in diligence.
- **Carrier-vetting quality at scale:** the trust model that differentiates Cargado today (personal vetting of every carrier) may not scale linearly with network growth without either slowing growth or degrading vetting quality. Track vetting headcount and process automation as the carrier base grows.
- **Downside includes capital loss:** at 60% of base revenue and a floor multiple, HCP's downside case falls below 1.0x MOIC. This is a real, not merely theoretical, risk given the category's low structural multiples — size any eventual investment accordingly and revisit only if unit economics or monetization mix improve materially.

---

## 10. Isometric

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Price-sensitive
**Links:** [Company](https://isometric.com/) | [Series A announcement](https://isometric.com/writing-articles/isometric-raises-40m-to-bring-agentic-certification-to-the-industrial-economy) | [TechFundingNews coverage](https://techfundingnews.com/isometric-40m-series-a-industrial-certification-ai/) | [Seed coverage](https://techcrunch.com/2023/07/17/isometric-taps-25m-to-build-a-registry-and-science-platform-focused-on-carbon-removal/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Eamon Jubbawy | Founder and CEO | Previously co-founded Onfido, a digital-identity verification company that verified over a billion identities before a $650m acquisition by Entrust — direct, relevant experience building a trust/verification infrastructure business to scale and exit. |
| Jennifer Wilcox | Chief Scientist (not a founder) | Former Principal Deputy Assistant Secretary at the U.S. Department of Energy; published foundational work on carbon dioxide removal. Listed as key leadership, not as a co-founder, on the company's own team page. |
| Stacy Kauk | Chief Science Officer (not a founder) | Former Head of Sustainability at Shopify and a founding member of Frontier (the carbon-removal offtake coalition); listed as key leadership, not as a co-founder. |

### Product description

Isometric operates Certify, an AI-agent-driven certification platform, alongside a public carbon-removal registry that gives buyers and suppliers access to project data, protocols, and issued carbon-removal certificates. Certify deploys AI agents to ingest and cross-check the data underlying a certification claim — sensor readings, satellite imagery, supply-chain records, and laboratory results — flagging inconsistencies and escalating cases that require expert human judgment. The company states this can compress certification timelines from roughly 12 months to hours. Isometric started with carbon-removal certification (biochar, enhanced weathering, direct air capture, reforestation, ocean alkalinity enhancement) and, with its June 2026 Series A, is expanding into broader industrial certification: embodied emissions in low-carbon steel and cement, superpollutant reductions, renewable energy certificates, and low-carbon shipping and aviation fuels. Disclosed customers/counterparties include Microsoft, Boeing, JPMorgan Chase, and Anglo American, with more than 16 million tonnes of carbon removal contracted across more than 200 projects.

### Thesis: why invest

Isometric raised a $40m Series A in June 2026, led by AVP (AXA Venture Partners) with global insurer AXA as anchor investor, and existing investors Lowercarbon Capital and Plural participating alongside personal investments from Kleiner Perkins chairman John Doerr and investor Walter Kortschak. This followed a $25m seed in July 2023 led by Lowercarbon Capital and Plural — total disclosed funding of $65m. The company's framing is compelling: the voluntary carbon market's credibility problems have stemmed partly from a "referees paid by the players" conflict of interest, where project developers historically paid for their own verification. Isometric flips that model so buyers fund certification, and backs it with AI-accelerated, evidence-linked verification rather than slow manual audits.

Jubbawy's Onfido track record (built and sold an identity-verification infrastructure company for $650m) is a direct, relevant precedent for building trust infrastructure that can scale to a large, diversified certification market. The disclosed customer list (Microsoft, Boeing, JPMorgan Chase, Anglo American) suggests real enterprise credibility beyond the carbon-removal niche the company started in.

**What must be true:** Certify's AI-driven verification must remain scientifically rigorous enough to satisfy skeptical corporate buyers and regulators as it expands beyond carbon removal into broader industrial certification; the buyer-pays model must not recreate its own conflict-of-interest concerns; and Isometric must win share from entrenched incumbents (Verra, Gold Standard) and well-funded specialist competitors (Puro.earth, BeZero Carbon, Sylvera) across multiple certification categories simultaneously.

**Next-round milestones:** disclosed ARR (currently undisclosed), expansion of contracted volume beyond 16 million tonnes and beyond carbon removal into at least one additional industrial-certification category at meaningful scale, and a published, independently reviewed comparison of Certify's accuracy/consistency against traditional manual verification.

### Founder bet

The bet is on a repeat, high-credibility founder (Onfido's $650m exit) applying a proven verification-infrastructure playbook to a new, larger, and messier market. The team is unusually strong for this stage, with a Chief Scientist (ex-DOE) and Chief Science Officer (ex-Shopify, Frontier founding member) providing genuine scientific credibility alongside Jubbawy's commercial and infrastructure-building track record. The risk for HCP is not the team or the business — it is the price.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Carbon-removal and voluntary-carbon-market certification (credits certified annually) | 5,000,000 tonnes | $30/tonne certification fee | $150m | HCP assumption: scaled certification-fee pool across durable and nature-based removal pathways |
| Industrial decarbonization certification (low-carbon steel, cement, aviation fuel, RECs) | 5,000 certified facility-years | $60,000 avg fee | $300m | HCP assumption: expansion into broader industrial certification, per the company's stated Series A strategy |
| Enterprise buyer subscription/data access | 2,000 accounts | $25,000/year | $50m | HCP assumption: registry data and assurance access for corporate buyers |
| **TAM** | | | **$500m** | Annual certification and registry revenue pool |
| HCP penetration |  |  | **22.4%** | Aggressive; assumes Isometric becomes the leading buyer-funded certifier across carbon removal and a meaningful share of industrial certification by 2032 |
| **2032 revenue opportunity** |  |  | **$112m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Certified projects/accounts | 300 | 550 | 900 | 1,400 | 2,000 | 2,650 | 3,400 |
| Blended annual certification fee | $27k | $28k | $29k | $30k | $31k | $32k | $33k |
| **Revenue** | **$8** | **$15** | **$26** | **$42** | **$62** | **$85** | **$112** |

### Competitive landscape

| Company | Business model / user | Workflow capability | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Isometric** | Buyer-funded certification/registry fees; carbon-removal and industrial buyers/suppliers | X AI-agent evidence verification, X public registry, X protocol development across CDR pathways | Cloud platform (Certify plus registry) | Buyer-funded model avoiding supplier-paid conflict of interest, plus AI-accelerated verification speed | Undisclosed | $40m Series A; $65m total; valuation undisclosed; AVP/AXA, Lowercarbon Capital, Plural, John Doerr, Walter Kortschak |
| Verra | Legacy carbon-credit registry/standard; project developers and buyers | X broad registry and methodology library; Partial modern AI-driven verification speed vs. Isometric | Registry/standard-setting body | Largest incumbent registry by historical volume and market recognition | Fee-based | Nonprofit/incumbent; capital structure not comparable |
| Gold Standard | Legacy carbon-credit registry/standard; project developers and buyers | X broad registry and methodology library; Partial modern AI-driven verification speed vs. Isometric | Registry/standard-setting body | Long-standing credibility, particularly for co-benefit-focused projects | Fee-based | Nonprofit/incumbent; capital structure not comparable |
| Puro.earth | CDR-focused registry; carbon-removal buyers and suppliers | X CDR-specific registry and methodologies; Partial buyer-funded model vs. Isometric | Registry platform | Early mover in engineered-CDR-specific registry standards | Fee-based | Private (Nasdaq-affiliated); capital data undisclosed here |
| BeZero Carbon | Carbon-credit ratings; buyers and market participants | Partial verification-adjacent ratings; No evidence of primary registry/certification function | Ratings platform | Independent, buyer-facing risk-rating methodology | Subscription | Private; capital data undisclosed here |
| Sylvera | Carbon-credit ratings and analytics; buyers | Partial verification-adjacent ratings; No evidence of primary registry/certification function | Ratings/analytics platform | Satellite and remote-sensing-based project analytics | Subscription | Private; capital data undisclosed here |
| Traditional third-party verification/audit firms | Manual project-level audits; project developers | Partial manual verification; No evidence of AI-accelerated, evidence-linked workflow at Isometric's stated speed | Manual/on-site audit | Long-standing accreditation and auditor relationships | Fee-based per audit | N/A |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Moody's](https://stockanalysis.com/stocks/mco/statistics/) | 12.08x | Illustrates the premium multiple a trusted, scaled ratings/certification franchise can command |
| [Verisk Analytics](https://stockanalysis.com/stocks/vrsk/statistics/) | 9.80x | Proprietary risk-data and analytics platform business model |
| [UL Solutions](https://stockanalysis.com/stocks/uls/statistics/) | 5.79x | Closest structural comp: independent physical-world testing, inspection, and certification business |
| **Median** | **9.80x** | HCP uses 5.0x, near UL Solutions and well below the median, reflecting Isometric's early-stage, unprofitable status versus these mature, diversified certification incumbents |

| Return path | Base |
|---|---:|
| Entry post-money | $300m, HCP assumption (reflecting the scale of the $40m Series A, blue-chip lead/anchor investors, and disclosed enterprise customer list) |
| Initial ownership | 0.67% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 0.43% |
| 2032 revenue / exit multiple | $112m / 5.0x |
| Exit enterprise value | $560m |
| HCP proceeds / MOIC | $2.4m / **1.2x** |
| Downside / upside MOIC | 0.6x / 2.2x |

### Principal risks and why invest anyway

- **Entry price is the binding constraint:** at an HCP-assumed $300m post-money, a $2.0m check buys too little ownership for a $1.0-2.5m check to clear a venture return bar even in Isometric's own strong base case. This is a "great company, wrong-sized check at this price" situation, not a business-quality problem. Pursue only via a smaller allocation, a secondary at a discount, or a structure (e.g., a SAFE with a valuation cap) that does not require competing for primary Series A allocation at the full disclosed round size.
- **Downside includes real capital loss:** at 60% of base revenue and one turn off the multiple, HCP's downside case falls below 1.0x MOIC. Confirm actual post-money valuation before committing any capital, since the entire return case is more sensitive to entry price than to operating performance.
- **Incumbent and specialist competition:** Verra and Gold Standard have decades of market recognition despite credibility criticism, while Puro.earth, BeZero Carbon, and Sylvera all compete for parts of the same buyer/verification relationship. Isometric must win share from all of them simultaneously across an expanding set of certification categories.
- **Expansion-execution risk:** moving from a carbon-removal-specific registry into broad industrial certification (steel, cement, aviation fuel) is a significant scope expansion announced concurrently with this round. Require evidence of traction in at least one non-carbon-removal category before assuming the larger TAM materializes.

---

## Cross-company decision framework

| Company | Core control point | Most important diligence test | 2032 revenue | Exit multiple | Base MOIC |
|---|---|---|---:|---:|---:|
| Terminal49 | Carrier/terminal integration graph for ocean freight | Current ARR, customer concentration, and integration-uptime track record | $60m | 5.5x | 7.7x |
| Nira Energy | Proprietary interconnection-study dataset | Disclosed ARR and size of the 2025 growth round | $55m | 5.0x | 6.4x |
| Bayou Energy | Utility-data integration breadth and reliability | Connected-meter count, revenue, and gross margin versus Arcadia/UtilityAPI | $48m | 4.0x | 5.9x |
| Vooma | Freight-specific AI-agent training data across channels | Customer concentration and error-rate/liability evidence | $94m | 5.0x | 4.7x |
| Lithos Carbon | Farmer network plus registry-certified MRV | Confirmation of current priced-round valuation and unit economics | $150m | 2.0x | 4.5x |
| Paces | Aggregated zoning/permitting/interconnection dataset | Current ARR and jurisdictional data-coverage breadth | $47m | 5.0x | 3.4x |
| Verse | Clean-power procurement workflow and market data | Current ARR and exposure to U.S. clean-energy policy risk | $120m | 3.5x | 3.0x |
| Texture | Device/OEM integration breadth plus NRTC channel | Full founder roster, current ARR, and NRTC-channel conversion | $58m | 3.0x | 2.1x |
| Cargado | Vetted cross-border carrier network | Net take rate and competitive position versus Nuvocargo | $84m | 1.4x | 1.7x |
| Isometric | Buyer-funded AI certification registry | Actual post-money valuation versus HCP's $300m assumption | $112m | 5.0x | 1.2x |

## Investment committee conclusion

HCP should prioritize Terminal49, Nira Energy, Vooma, and Lithos Carbon for direct diligence: each has a specific, evidence-backed control point (integration graph, proprietary study data, freight-specific training data, or registry-certified physical delivery), a credible financing history, and a plausible path to meaningful ownership within the check range. Bayou Energy is a close fifth — strong unit economics and real customer logos on very little disclosed capital — but its scale is still small enough, and its direct competitor (Arcadia) large enough, that a data room is needed before committing. Paces, Verse, and Texture are workable businesses in real, underserved categories, but their base cases are moderate rather than exceptional at HCP's assumed entry prices, and each carries a specific execution or disclosure gap (jurisdictional coverage, policy exposure, and incomplete founder disclosure, respectively) worth resolving first. Cargado's operating momentum is genuine, but freight brokerage's structurally low public multiples cap the base case below a typical venture return bar; HCP should watch for evidence of higher-margin monetization before revisiting. Isometric is the strongest underlying business in the batch by customer quality and founder pedigree, but the disclosed $40m Series A implies a price that a $1.0-2.5m check cannot overcome without a different deal structure.

No memo should advance on public evidence alone. The next step is a standardized data request covering cap table and terms, monthly revenue and gross margin, customer or unit cohorts, acquisition channels, retention, security and compliance, pipeline, product telemetry, and reference calls. Private and stealth competitors identified during founder and customer calls should be added manually before final investment committee approval.

## Source and assumption notes

1. Company facts are sourced to official pages, financing announcements, TechCrunch, GeekWire, FreightWaves, PowerMag, ESG Today, Latitude Media, Index Ventures, Frontier Climate, and other outlets linked within each memo. Company-reported operating metrics (customer counts, growth multiples, coverage percentages) are explicitly identified as company claims and should be verified in diligence.
2. Public-company EV/LTM revenue multiples are point-in-time figures fetched from stockanalysis.com on July 18, 2026, and can change daily. Refresh them immediately before an investment committee meeting.
3. TAM calculations are HCP bottom-up underwriting models built from operating units (meters, accounts, loads, tonnes, or projects), not top-down market-growth percentages. Unit counts and prices labeled HCP assumption are deliberately visible so the committee can replace them with management or third-party evidence.
4. No current-round valuation is publicly disclosed for any company in this batch. All post-money values used for ownership calculations are HCP assumptions for return testing, not claims about actual financing terms.
5. Two stage corrections were made against the roster's pre-research hints: Lithos Carbon (Series A hint corrected to Seed, since the indexed "$57.1m Series A" is a carbon-removal offtake agreement, not equity) and Nira Energy (Seed/A hint corrected to Seed, since the 2025 round is an undisclosed-size "strategic growth investment," not a named priced Series A). Both corrections are explained in full in the respective memos.
6. Valuation references for competitors are intentionally omitted when reliable current public evidence was unavailable. No blank field should be interpreted as zero.
