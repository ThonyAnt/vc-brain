# HCP Investment Memos — Batch 04: Fintech and Financial Infrastructure (Herald, Straddle, Mercoa, Ansa, Kudos, Baselayer, Felix Pago, Formance, Keep, Layer)

**Prepared:** July 18, 2026
**Scope:** Public-source underwriting only; no Crunchbase or PitchBook access beyond incidental aggregator snippets surfaced in web search, which are flagged as aggregator-sourced wherever they are the only available corroboration.
**Target initial check:** $1.0 million to $2.5 million
**Important:** Financing terms, ownership, revenue, penetration, dilution, and exit values labeled **HCP assumption** are underwriting inputs, not company disclosures. All dollars are U.S. dollars unless noted.

**Roster swap:** Company 9 in the original batch assignment, Moment (momentmarkets.com / moment.com), was verified real but has clearly outgrown this fund's scope: per its own site, Moment raised a $78 million Series C in May 2026 led by Index Ventures (total funding to date $134 million), on top of a September 2023 Series A and a July 2025 $36 million Series B. A $1.0m-$2.5m check into a Series C fixed-income infrastructure company with $134m raised is not a fit for this program. HCP checked the first listed alternate, DolarApp (dolarapp.com), and found it has rebranded to **ARQ** (arqfinance.com) and raised a $70 million Series A in March 2026 (Sequoia Capital and Founders Fund co-leading) on top of 2 million users and a company-reported $10 billion in annualized transaction volume across four countries — also outgrown the scope of a $1.0m-$2.5m first check. HCP therefore moved to the second listed alternate, **Keep** (trykeep.com), a Toronto-based SMB banking and corporate-card platform that emerged from stealth in May 2025 with a first institutional round. Keep's equity component (C$33m / roughly $24m USD, led by Tribe Capital) is larger than a typical seed extension, so this memo explains that exception explicitly in Keep's "Founder bet" section rather than silently treating it as a small Series A.

## Portfolio summary

| Rank | Company | Segment | Round screened | Proposed check | Base MOIC | Recommendation |
|---:|---|---|---|---:|---:|---|
| 1 | Straddle | Pay-by-bank infrastructure | Seed | $1.5m | 8.87x | Diligence |
| 2 | Mercoa | Embedded AP/AR API | Seed | $1.5m | 6.53x | Watch |
| 3 | Herald | Commercial insurance API | Series A | $2.0m | 6.07x | Pursue |
| 4 | Baselayer | Business identity / KYB | Seed | $2.0m | 5.01x | Pursue |
| 5 | Layer | Embedded accounting API | Seed | $1.75m | 4.19x | Diligence |
| 6 | Keep (swap for Moment) | SMB banking and corporate cards | Series A | $2.5m | 3.31x | Diligence |
| 7 | Felix Pago | WhatsApp remittances, LatAm | Series A | $2.5m | 2.31x | Price-sensitive |
| 8 | Formance | Open-source ledger infrastructure | Series A | $2.5m | 2.17x | Price-sensitive |
| 9 | Kudos | AI smart wallet | Series A | $2.0m | 1.85x | Watch |
| 10 | Ansa | Stored-value wallet infrastructure | Series A | $2.0m | 1.40x | Pass |

### Common model conventions

- Revenue is built from operating units — connected accounts, platform partners, payment volume, or customers — not a top-down market-growth percentage. Forecasts represent an HCP base case and are not management guidance.
- Entry ownership equals check divided by post-money valuation. Exit ownership equals entry ownership multiplied by one minus cumulative dilution, held at 35% across this batch unless stated otherwise.
- Exit enterprise value equals 2032 revenue multiplied by the selected EV/LTM revenue multiple. HCP proceeds equal exit enterprise value multiplied by exit ownership. MOIC equals proceeds divided by check. The model excludes preference effects, taxes, fees, secondary sales, and follow-on reserves.
- Public-comps multiples are snapshots as of July 18, 2026 from the linked StockAnalysis pages, whose financial statistics cite S&P Global Market Intelligence. Where a ticker also appears in the reference ten-company file, HCP reused that figure rather than re-pulling it; new tickers were fetched fresh for this batch. Balance-sheet-heavy financial institutions are used cautiously because enterprise value is less comparable, and delisted/acquired comps (e.g., AvidXchange, taken private by TPG and Corpay in October 2025) are noted but excluded from the multiples table.
- Downside uses 60% of base exit revenue and one turn less on the multiple, with a 1.0x floor. Upside uses 150% of base exit revenue and one turn more. Dilution is held constant.
- Competitive tables use **X** only where the capability is verified, **Partial** where the product covers only part of the workflow, **No evidence** where public material does not support the claim, and **Undisclosed** for unavailable commercial or capital data.
- No post-money valuation is publicly disclosed for any company in this batch. Every entry post-money figure in the return-path tables is an explicit HCP assumption, typically 4.5x-6x the most recent disclosed round size, consistent with the multiple implied by the reference file's own comparable-stage entries (e.g., Tailor's $22m Series A at an assumed $100m post-money).

---

## 1. Herald

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Pursue
**Links:** [Company](https://www.heraldai.com/) | [Series A announcement](https://www.prnewswire.com/news-releases/herald-raises-12-million-to-revolutionize-insurance-connectivity-with-ai-powered-solutions-302277522.html) | [API documentation](https://docs.heraldapi.com/) | [Seed announcement](https://www.heraldapi.com/blog/announcing-our-8m-seed-round-to-build-digital-infrastructure-for-commercial-insurance)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Matt Antoszyk | Co-founder and CEO | Named as CEO in the Series A announcement; built Herald's broker-carrier connectivity platform from a 2021 seed round through the 2024 Series A. |
| Additional founding team | Not individually named in public sources reviewed | The financing announcements identify Herald as a founder-led team but do not name a co-founder beyond Antoszyk; confirm full founding-team composition and equity splits in diligence. |

### Product description

Herald builds API infrastructure that connects commercial-insurance brokers to carriers. Brokerages integrate Herald into their agency management system (AMS), CRM, or a custom platform and get standardized, real-time quoting and binding across more than 80 insurance products from 35-plus carrier partners, spanning cyber, management liability, professional liability, business owners policy (BOP), general liability, and workers' compensation. Herald's AI layer extracts and normalizes submission data from PDFs, emails, and disparate carrier formats into a common transaction schema, which is the unglamorous but structurally important work of making carrier appetite and rating machine-readable. The company already works with 8 of the top-25 largest U.S. brokerages, according to its own financing announcement.

### Thesis: why invest

Commercial insurance placement is still overwhelmingly manual: brokers re-key submission data into each carrier's own portal or wait on email quotes. Herald's wedge is to become the API layer that both sides use once, rather than a broker-only front end. The October 2024 $12m Series A was co-led by Lightspeed Venture Partners and Brewer Lane Ventures, with Afore Capital and Underscore Venture Capital participating, on top of an $8m December 2021 seed — a credible, escalating syndicate for a genuinely un-sexy but structurally important category.

The moat is connectivity density: carrier integrations, appetite mapping, and standardized data schemas that get more valuable as more brokers and carriers connect through the same rails, similar in shape to how payment processors compound value with acceptance network size. If Herald becomes the default way mid-market and enterprise brokerages reach multiple carriers, switching cost rises with every additional integrated line of business.

**What must be true:** carrier integrations must scale faster than the cost of maintaining each one; brokers must trust Herald with bind-authority workflows, not just quoting; AI-extracted data must be accurate enough to avoid E&O exposure; and Herald must expand from top-25 brokerages into the long tail of mid-market agencies without a linear increase in integration cost per carrier line.

**Next-round milestones:** $15m ARR, 15 of the top-25 brokerages live, 50-plus carrier integrations, at least 3 lines of business bound (not just quoted) through the API for a majority of active brokerages, and evidence that AI-extraction accuracy holds up under an independent audit.

### Founder bet

The bet is that a small, insurance-fluent team can out-execute both legacy vendors (Vertafore, Applied Systems) that have deep incumbency but slow release cycles, and better-funded generalist insurtechs that lack Herald's carrier-side relationships. Public sources confirm only one named founder (Antoszyk); diligence should verify the technical and insurance-domain depth of the rest of the founding and engineering team, since carrier trust in this category is built as much on relationships and compliance rigor as on API design.

### Market, TAM, and revenue build

No independent syndicated report on the number of active U.S. commercial-lines agencies was available within this batch's research budget, so HCP builds the TAM entirely from an explicit, labeled assumption about market structure rather than citing an unverified figure as fact.

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Large/national brokerages (top ~500) | 500 | $150,000 | $75m | HCP assumption: API + data-licensing fee at enterprise scale |
| Mid-market regional agencies | 8,000 | $25,000 | $200m | HCP assumption |
| Small independent agencies | 30,000 | $6,000 | $180m | HCP assumption |
| **TAM** | 38,500 | | **$455m** | Annual API/platform-fee pool |
| HCP penetration | | | **30.8%** | ~2,000 connected agencies plus continued top-25 brokerage share |
| **2032 revenue opportunity** | | | **$140m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Connected brokerages/agencies | 80 | 200 | 400 | 700 | 1,100 | 1,550 | 2,000 |
| Avg. annual platform revenue | $50k | $55k | $58k | $60k | $62k | $65k | $70k |
| **Revenue** | **$4** | **$11** | **$23** | **$42** | **$68** | **$101** | **$140** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Herald** | Broker-carrier connectivity API | X real-time quoting; Partial binding depending on line | API, AMS/CRM integration | Carrier-integration density and standardized submission data | Undisclosed | $12m Series A; $20m total; valuation undisclosed; Lightspeed, Brewer Lane, Afore, Underscore |
| Vertafore | Agency management systems | X broad AMS workflows; Partial modern API access | On-prem/cloud AMS | Incumbent installed base | Custom | Private (Roper Technologies subsidiary) |
| Applied Systems | Agency management systems | X broad AMS workflows; Partial carrier connectivity | Cloud AMS | Incumbent scale and carrier relationships | Custom | Private; capital data undisclosed here |
| Bold Penguin | Commercial insurance exchange | X quoting marketplace; Partial deep carrier API | Web platform and API | Liberty Mutual-backed distribution | Custom | Acquired by Liberty Mutual (2023); capital status not comparable |
| Duck Creek Technologies | Core insurance systems | X policy/claims/billing systems; No evidence broker-side connectivity focus | Cloud core systems | Carrier-side system-of-record depth | Custom | Private (Vista Equity take-private, 2023) |
| Ushur | Insurance AI automation | Partial document/communication automation; No evidence broker connectivity | SaaS/API | Conversational AI for carriers/payers | Custom | Private; capital data undisclosed here |
| CoverForce | Insurtech API for embedded commercial insurance | X quoting API; Partial carrier breadth vs. Herald | API | Embedded-insurance distribution | Custom | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Guidewire](https://stockanalysis.com/stocks/gwre/statistics/) | 8.76x | Core insurance-systems software |
| [Verisk](https://stockanalysis.com/stocks/vrsk/statistics/) | 9.80x | Insurance data and analytics |
| [CCC Intelligent Solutions](https://stockanalysis.com/stocks/cccs/statistics/) | 4.51x | Claims and insurance workflow software |
| [Sapiens International](https://stockanalysis.com/stocks/spns/statistics/) | 4.24x | Insurance core-systems software |
| **Median** | **6.64x** | HCP uses 4.0x, below the full comp set, reflecting Herald's smaller scale and connectivity-layer (not data-moat or core-systems lock-in) positioning |

| Return path | Base |
|---|---:|
| Entry post-money | $60m, HCP assumption |
| Initial ownership | 3.33% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.17% |
| 2032 revenue / exit multiple | $140m / 4.0x |
| Exit enterprise value | $560m |
| HCP proceeds / MOIC | $12.1m / **6.07x** |
| Downside / upside MOIC | 2.73x / 11.38x |

Downside detail: 60% of base revenue ($84m) at one turn less (3.0x) = $252m EV, $5.46m proceeds, 2.73x. Upside detail: 150% of base revenue ($210m) at one turn more (5.0x) = $1.05bn EV, $22.75m proceeds, 11.38x.

### Principal risks and why invest anyway

- **Single named founder:** public sources verify only Matt Antoszyk. Confirm the full founding and engineering team's insurance-domain and technical depth before closing.
- **Carrier concentration:** losing a handful of large carrier integrations could impair the core value proposition. Require a carrier-diversification and renewal-rate breakdown.
- **AI-extraction liability:** miscoded submission data could create E&O exposure for brokers using Herald. Require evidence of accuracy testing, human-in-the-loop controls, and insurance/indemnification structure.
- **Incumbent bundling:** Vertafore and Applied Systems could add modern API layers of their own. Herald's advantage should be independence from any single AMS and faster carrier onboarding — verify this speed advantage empirically.

---

## 2. Straddle

**Stage:** Seed
**Proposed HCP check:** $1.5m
**Recommendation:** Diligence
**Links:** [Company](https://straddle.com/) | [Pay by Bank product](https://straddle.com/pay-by-bank) | [Documentation](https://docs.straddle.com/guides/payments/funding) | [Funding data (aggregator)](https://www.crunchbase.com/organization/straddle-db8e)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Keith Raphael | Co-founder and CEO | Identified as CEO across aggregator profiles and the company's own materials; based in Broomfield, Colorado. |
| Additional founding team | Not individually named in sources reviewed | No primary press release naming a full founding team was located; confirm co-founder composition directly in diligence. |

### Product description

Straddle is an identity-to-payment platform that combines identity verification, open banking, and real-time bank-to-bank payments in a single API, marketed as "Pay by Bank." Customers use it to onboard payers, verify identity (SSN validity, government ID authenticity, liveness checks), confirm account balances before a debit ("Watchtower"), and move money over ACH and RTP today, with FedNow planned, settling within 24 hours. Straddle's pitch to SaaS platforms, payment facilitators, and marketplaces is that pay-by-bank replaces card-network fees and card-specific fraud exposure with a bank-verified, lower-cost rail, while keeping fraud and compliance (tokenized PII, AML sanctions screening, transaction monitoring) built into the same flow rather than bolted on separately.

### Thesis: why invest

Bank-to-bank payment volume is growing as merchants look to cut card-network costs, and the hard part is not moving money over ACH — it is doing so with enough identity and balance confidence to make the transaction as reliable as a card swipe. Straddle's bet is that bundling identity, fraud, and payment initiation into one API is more valuable to a mid-market SaaS platform than stitching together separate KYC, open-banking, and ACH vendors. Public aggregator data (Crunchbase, PitchBook, Tracxn) consistently shows a $1.25m seed closed in August 2024 led by Bonfire Ventures, with Veridical Ventures, Drive Capital, and Kickstart (US) participating — HCP was unable to locate a primary press release for this round and flags the funding figures as aggregator-sourced rather than company-confirmed.

The moat, if it exists, is the combination of identity confidence and payment execution in one flow: a standalone open-banking or KYC vendor cannot guarantee the money actually moves, and a standalone ACH processor cannot guarantee the payer is who they claim to be. Straddle is also integrated as a Plaid partner for auth flows, which is a credible signal of technical maturity for a company this early.

**What must be true:** the combined identity-plus-payment flow must meaningfully reduce return/fraud rates versus point solutions; Straddle must win mid-market platform and marketplace accounts against much better-funded pay-by-bank competitors; the current small balance sheet ($1.25m disclosed to date) must not constrain compliance buildout or reserve requirements; and unit economics must hold once volume scales past early pilot accounts.

**Next-round milestones:** $8m-$10m annualized net revenue, demonstrable return/fraud-rate improvement versus card or plain-ACH baselines at three or more reference accounts, a second institutional round closing at a step-up valuation, and evidence of a scalable compliance/licensing structure across states.

### Founder bet

The team is led by a single publicly confirmed founder, Keith Raphael, in a category (bank-payment identity infrastructure) that rewards deep compliance and banking-relationship experience as much as engineering speed. The disclosed funding to date ($1.25m) is unusually small for a company already shipping a multi-product platform (Pay by Bank, Watchtower, Embed), which is either a sign of capital efficiency or of undercapitalization relative to ambition — diligence should resolve which.

### Market, TAM, and revenue build

| Bottom-up step | Annual flow | Eligible share | Net take | Result | Basis |
|---|---:|---:|---:|---:|---|
| U.S. recurring bill and B2B payments suited to verified bank-pull (rent, tuition, insurance premiums, subscriptions, marketplace payouts) | $3.0tn | 12% | 0.30% | $1.08bn | HCP assumption |
| **TAM** | | | | **$1.08bn** | Annual net-revenue pool |
| HCP penetration | | | | **8.4%** | ~$26bn of processed GPV by 2032 |
| **2032 revenue opportunity** | | | | **$91m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Gross payment volume, $bn | 0.3 | 1.0 | 2.5 | 5.5 | 10 | 17 | 26 |
| Net take rate | 0.30% | 0.30% | 0.32% | 0.33% | 0.34% | 0.34% | 0.35% |
| **Revenue, $m** | **1** | **3** | **8** | **18** | **34** | **58** | **91** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Straddle** | Identity-to-payment (pay-by-bank) infra | X identity, balance check, ACH/RTP payment | API | Combined identity + payment flow in one API | Undisclosed | $1.25m seed (aggregator-sourced); Bonfire, Veridical, Drive Capital, Kickstart |
| Plaid | Open banking / bank-data infra | X account linking and balance data; Partial payment initiation | API | Bank-connection scale and developer distribution | Usage-based | Private; valuation not used |
| Astra | Bank-to-bank payment infra | X ACH/RTP orchestration; Partial identity layer | API | Payment-orchestration breadth | Usage-based | Private; valuation undisclosed |
| Method Financial | Consumer liability-linked payments | X debt-account connectivity and payments; No evidence commercial marketplace focus | API | Liability-account data | Usage-based | Private; capital data undisclosed here |
| Trustly | Pay-by-bank (Europe-rooted, expanding U.S.) | X account-to-account payments; Partial U.S.-native identity stack | Network plus API | European bank-network breadth | Take rate | Private; capital data undisclosed here |
| Marqeta | Card issuing infrastructure | Partial adjacent (card, not bank-pull); X issuing infra | API | Issuing scale and bank partnerships | Usage-based | Public |
| Fiserv | Core banking and payments infrastructure | X broad payments/banking rails; Partial modern API layer | Enterprise platform | Scale and bank distribution | Custom | Public |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Marqeta](https://stockanalysis.com/stocks/mq/statistics/) | 1.76x | Card/payment-issuing infrastructure |
| [Fiserv](https://stockanalysis.com/stocks/fi/statistics/) | 2.63x | Core banking and payments infrastructure |
| [Global Payments](https://stockanalysis.com/stocks/gpn/statistics/) | 4.41x | Payments processing at scale |
| [Payoneer](https://stockanalysis.com/stocks/payo/statistics/) | 2.01x | Cross-border payments infrastructure |
| **Median** | **2.32x** | HCP uses 1.5x, below the lowest comp, reflecting thin disclosed traction and intense competition from Plaid and Astra |

| Return path | Base |
|---|---:|
| Entry post-money | $10m, HCP assumption |
| Initial ownership | 15.00% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 9.75% |
| 2032 revenue / exit multiple | $91m / 1.5x |
| Exit enterprise value | $136.5m |
| HCP proceeds / MOIC | $13.31m / **8.87x** |
| Downside / upside MOIC | 3.55x / 22.18x |

Downside detail: 60% of base revenue ($54.6m) at 1.0x floor (one turn below 1.5x would be 0.5x, floored to 1.0x) = $54.6m EV, $5.32m proceeds, 3.55x. Upside detail: 150% of base revenue ($136.5m) at one turn more (2.5x) = $341.25m EV, $33.27m proceeds, 22.18x.

### Principal risks and why invest anyway

- **Thin disclosed capitalization:** only $1.25m raised to date against a multi-product roadmap. Confirm current cash position and runway before committing new capital.
- **Single named founder:** verify the rest of the founding and compliance leadership team, given the regulatory weight of identity-plus-payments infrastructure.
- **Competitive intensity:** Plaid, Astra, and Trustly are materially better capitalized. Straddle's combined identity-and-payment flow must show a measurable fraud/return-rate edge, not just feature parity.
- **Regulatory and licensing exposure:** money-movement infrastructure requires state money-transmitter and banking-partner compliance. Require a full licensing and sponsor-bank map in diligence.

---

## 3. Mercoa

**Stage:** Seed
**Proposed HCP check:** $1.5m
**Recommendation:** Watch
**Links:** [Company](https://mercoa.com/) | [Y Combinator profile](https://www.ycombinator.com/companies/mercoa) | [Product changelog](https://mercoa.com/changelog) | [Documentation](https://docs.mercoa.com/embedded-ap-ar/home/overview)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Sai Arora | Co-founder | Named on Mercoa's Y Combinator company profile (W23 batch). |
| Sandeep Dinesh | Co-founder | Y Combinator profile lists prior roles as Senior Software Engineer at Stripe, Lead Software Engineer at Furmacy (YC W21), and Senior Developer Advocate at Google Cloud. |

### Product description

Mercoa is an embedded B2B payments and BillPay API that vertical SaaS platforms use to offer accounts-payable and accounts-receivable automation to their own customers without building it themselves. On the AP side, Mercoa provides an AI-driven inbox that ingests bills by email, handles vendor onboarding, schedules payments, and routes approvals; a "CardPay" agent identifies which vendors will accept card payment instead of ACH or check and automatically converts and delivers that payment, capturing card economics the platform can share back with Mercoa. On the AR side, Mercoa offers AI-assisted contract-to-invoice conversion, branded payment links, and automated collections. Delivery options include React components, hosted iFrames, and REST APIs/SDKs (TypeScript, Python, Java), letting a platform go live, per the company's own site, "in just 3 weeks."

### Thesis: why invest

Embedded AP/AR is a genuinely large wedge — every vertical SaaS platform serving SMBs eventually gets asked to handle bill pay — and Mercoa's CardPay angle (converting ACH/check payments to card to capture interchange) is a specific, monetizable insight rather than a generic "we do bill pay" pitch. The company has named platform customers (Clyr, Joltly, Accountable, InBuild, Spacetil, Backdrop per its own site) and an active product changelog through at least August 2025, evidence of a live, maintained product.

The moat, if any, is data on which vendors accept card payment and at what economics — a data set that compounds as more AP volume flows through the platform. That said, Mercoa's disclosed capitalization is unusually small: Y Combinator and Dunbar Capital investment totaling roughly $500k in a 2023 seed round, per aggregator data, with no larger round disclosed since.

**What must be true:** the CardPay conversion-rate insight (vendors that will accept card) must be defensible and not easily replicated by better-funded competitors; platform partners must convert pilot integrations into meaningful transaction volume; and Mercoa must either raise a larger round or reach default-alive economics on a thin capital base.

**Next-round milestones:** $5m-$8m in annualized platform revenue, 100-plus live platform partners processing meaningful volume, a disclosed larger institutional round, and independent confirmation that the company remains a going concern (see risk below).

### Founder bet

Both founders bring directly relevant experience: Sandeep Dinesh's Stripe engineering background is a credible signal for building reliable payments infrastructure, and the YC W23 pedigree suggests a fast, iterative product cycle (confirmed by an active changelog through August 2025). The bet is a lean, engineering-led team can compete against far better-capitalized AP/AR players on product velocity and a narrow, well-chosen wedge (card conversion) rather than breadth.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Vertical SaaS platforms serving SMBs, addressable for embedded AP/AR | 12,000 | $60,000 (revenue at full partner scale) | $720m | HCP assumption |
| **TAM** | 12,000 | | **$720m** | Annual embedded AP/AR revenue pool |
| HCP penetration | | | **9.3%** | ~320 scaled platform partners by 2032 |
| **2032 revenue opportunity** | | | **$67m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Platform partners | 20 | 50 | 100 | 170 | 230 | 280 | 320 |
| Avg. annual revenue/partner | $30k | $45k | $65k | $95k | $130k | $165k | $210k |
| **Revenue** | **$1** | **$2** | **$7** | **$16** | **$30** | **$46** | **$67** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Mercoa** | Embedded AP/AR API | X bill ingestion, approvals, payment; X card-conversion agent; Partial AR collections | React/iFrame/API | Vendor card-acceptance data and conversion insight | Undisclosed | ~$500k seed (aggregator-sourced); YC, Dunbar Capital |
| Bill.com | AP/AR automation, direct and embedded | X broad AP/AR; X embedded via Divvy/partners | SaaS and embedded API | Scale, bank network, incumbency | Subscription plus transaction fees | Public |
| Melio | SMB bill pay, embeddable | X AP workflows; Partial AR | SaaS and embedded partnerships | SMB brand distribution via bank partners | Free/transaction fees | Private; valuation not used |
| Routable | Embedded AP for platforms | X AP automation and payments | API/embedded | Platform-first embedded focus | Custom | Private; capital data undisclosed here |
| Modern Treasury | Payment operations infrastructure | Partial AP/AR-adjacent; X broader payment ops/ledger | API | Bank-grade payment-ops infrastructure | Custom | Private; valuation not used |
| Stripe (Invoicing/Billing) | Broad payments platform with billing tools | Partial AP/AR-adjacent billing; No evidence dedicated embedded-AP focus | API/platform | Massive distribution and platform breadth | Usage-based | Private; valuation not used |
| AvidXchange | AP automation, mid-market | X AP automation | SaaS | Mid-market incumbency | Custom | Taken private by TPG/Corpay, Oct 2025; no longer a live public comp |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Bill.com](https://stockanalysis.com/stocks/bill/statistics/) | 2.60x | Direct AP/AR automation comp |
| [BlackLine](https://stockanalysis.com/stocks/bl/statistics/) | 2.71x | Financial close/reconciliation automation |
| [Intuit](https://stockanalysis.com/stocks/intu/statistics/) | 3.81x | Adjacent SMB accounting platform |
| [Global Payments](https://stockanalysis.com/stocks/gpn/statistics/) | 4.41x | Broad payments processing |
| **Median** | **3.26x** | HCP uses 1.5x, well below the comp set given the going-concern question flagged below and thin disclosed capitalization |

| Return path | Base |
|---|---:|
| Entry post-money | $10m, HCP assumption |
| Initial ownership | 15.00% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 9.75% |
| 2032 revenue / exit multiple | $67m / 1.5x |
| Exit enterprise value | $100.5m |
| HCP proceeds / MOIC | $9.80m / **6.53x** |
| Downside / upside MOIC | 2.61x / 16.33x |

Downside detail: 60% of base revenue ($40.2m) at 1.0x floor = $40.2m EV, $3.92m proceeds, 2.61x. Upside detail: 150% of base revenue ($100.5m) at 2.5x = $251.25m EV, $24.50m proceeds, 16.33x.

### Principal risks and why invest anyway

- **Going-concern uncertainty:** a third-party review aggregator (openbankingtracker.com) explicitly states "Mercoa has been discontinued," while Mercoa's own site shows live pricing and onboarding CTAs, named customers, and a product changelog with entries as recent as August 27, 2025, and Y Combinator's company page lists Mercoa as "Active." This is a direct, unresolved conflict between sources. **Do not proceed without a live founder call confirming current operating status** — this is the single most important diligence item before any capital is committed, which is why HCP labels this "Watch" rather than "Pursue" or "Diligence" despite an attractive modeled MOIC.
- **Thin capitalization:** only ~$500k disclosed raised since 2023, unusually small for a company with a live, actively developed product. Confirm current cash position and whether a larger round is imminent or has already closed without public disclosure.
- **Competitive intensity:** Bill.com, Melio, and Routable are all better capitalized. Mercoa's card-conversion wedge must be defensible, not just a feature others can copy.
- **Concentration risk:** named customers (Clyr, Joltly, Accountable, InBuild, Spacetil, Backdrop) appear to be early-stage platforms themselves; revenue could be concentrated in a small number of accounts whose own growth is unproven.

---

## 4. Ansa

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Pass
**Links:** [Company](https://ansa.dev/) | [Series A announcement](https://www.prnewswire.com/news-releases/ansa-raises-14-million-series-a-funding-to-redefine-merchant-transaction-solutions-302131675.html) | [TechCrunch coverage](https://techcrunch.com/2024/04/30/wallet-as-a-service-startup-ansa-raises-14m-with-female-investors-leading-the-way/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Sophia Goldberg | Co-founder and CEO | TechCrunch reports she was previously a product manager at Adyen; quoted in the company's blog on building "stored value wallet as a service." |
| JT Cho | Co-founder | TechCrunch reports prior software-engineering experience at Affirm. |

### Product description

Ansa is a white-labeled, "wallet-as-a-service" platform: it lets merchants and platforms launch a branded stored-value wallet (closed-loop balances, gift-card-style credits, loyalty-linked funds) without building the ledger, compliance, and payment-acceptance stack themselves. The pitch to merchants is that a stored-value wallet reduces card-network fees on repeat transactions and increases visit frequency by pre-loading customer funds. Ansa's own case study reports a 30% increase in visit frequency at Compass Coffee after launching a stored-value wallet. The company targets coffee and quick-service restaurant chains, marketplaces, and retail/convenience as initial verticals, with a self-serve incentive engine and merchant analytics portal layered on top of the core wallet infrastructure.

### Thesis: why invest

Stored value is a proven mechanic (Starbucks' app-loaded balance is the canonical example) but building it in-house requires a regulated money-transmission-adjacent ledger, reconciliation, and compliance stack that most mid-market merchants cannot justify. Ansa's April 2024 $14m Series A, led by Renegade Partners with Bain Capital Ventures, BoxGroup, Wischoff Ventures, and B37 Ventures participating (95.6% of the round from female investors, a notable signal TechCrunch highlighted), gives it roughly $20m in total funding to build this out. The company reports doubling its customer base year over year as of Q1 2024, though it has not disclosed absolute customer counts.

The moat, in principle, is switching cost once a merchant's loyalty and balance data lives inside Ansa's ledger. In practice, stored-value infrastructure is a thin-margin, highly competitive category with entrenched players (Fiserv, Marqeta-powered issuers, and numerous loyalty/gift-card vendors) and Ansa has not disclosed enough absolute scale for HCP to underwrite conviction that it is winning share meaningfully.

**What must be true:** stored-value programs must generate durable per-merchant revenue well above thin transaction-processing margins; Ansa must win larger platform/marketplace deals, not just small QSR locations, to reach real scale; and the company must show absolute (not just relative) growth numbers in its next disclosure.

**Next-round milestones:** disclosed absolute customer/merchant counts in the hundreds with visible cohort retention, $8m-$12m annualized platform revenue, at least one marketplace-scale enterprise deployment, and gross margin data showing the wallet model clears standard payments-infrastructure economics.

### Founder bet

Goldberg (Adyen) and Cho (Affirm) both come from strong payments pedigrees, and the Series A syndicate quality (Bain Capital Ventures, Renegade Partners) is a real positive signal. The concern is not team quality but category economics: stored-value wallet infrastructure is structurally thin-margin, and Ansa has not yet disclosed the absolute scale evidence needed to show it can out-earn that structural ceiling.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---|---|
| SMB merchant locations (coffee, QSR, retail) | 50,000 | $6,000 | $300m | HCP assumption |
| Marketplace/platform enterprise deployments | 500 | $200,000 | $100m | HCP assumption |
| **TAM** | | | **$400m** | Annual wallet-infrastructure revenue pool |
| HCP penetration | | | **27.0%** | ~1,800 wallet programs live by 2032 |
| **2032 revenue opportunity** | | | **$108m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Wallet programs live | 50 | 150 | 350 | 650 | 1,000 | 1,400 | 1,800 |
| Avg. annual revenue/program | $10k | $14k | $20k | $28k | $38k | $48k | $60k |
| **Revenue** | **$1** | **$2** | **$7** | **$18** | **$38** | **$67** | **$108** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Ansa** | White-label stored-value wallet infra | X wallet issuance, incentives, merchant analytics | SDK/API | Balance-and-loyalty data lock-in per merchant | Undisclosed | $14m Series A; ~$20m total; valuation undisclosed; Renegade, Bain Capital Ventures, BoxGroup, Wischoff |
| Fiserv | Core banking/payments, includes stored value | X broad stored-value and card issuing; Partial merchant-branded self-serve tooling | Enterprise platform | Bank-distribution scale | Custom | Public |
| Marqeta | Card issuing infra (powers many wallets) | X issuing/wallet rails; Partial merchant-facing self-serve tooling | API | Issuing scale, bank partnerships | Usage-based | Public |
| PayPal (branded balance/wallet) | Consumer wallet at platform scale | X stored balance, payments; No evidence white-label merchant offering | App/API | Massive consumer distribution | Take rate | Public |
| Stored Value Solutions (Fiserv) | Gift card and stored-value programs | X gift-card/stored-value issuance | Enterprise platform | Legacy retail gift-card incumbency | Custom | Fiserv subsidiary |
| Bird (loyalty/stored-value tech) | Loyalty and stored-value for restaurants | X loyalty and stored-value; Partial broader platform use cases | SaaS/API | Restaurant-vertical focus | Custom | Private; capital data undisclosed here |
| Punchh (PAR Technology) | Restaurant loyalty and stored value | X loyalty/stored value for restaurant chains | SaaS | Restaurant enterprise incumbency | Custom | PAR Technology subsidiary; public parent |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Marqeta](https://stockanalysis.com/stocks/mq/statistics/) | 1.76x | Card/wallet issuing infrastructure |
| [PayPal](https://stockanalysis.com/stocks/pypl/statistics/) | 1.55x | Consumer stored-balance wallet at scale |
| [Fiserv](https://stockanalysis.com/stocks/fi/statistics/) | 2.63x | Core payments/stored-value infrastructure |
| **Median** | **1.76x** | HCP uses 1.4x, near the low end, reflecting thin-margin category economics and unproven absolute scale |

| Return path | Base |
|---|---:|
| Entry post-money | $70m, HCP assumption |
| Initial ownership | 2.86% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.86% |
| 2032 revenue / exit multiple | $108m / 1.4x |
| Exit enterprise value | $151.2m |
| HCP proceeds / MOIC | $2.81m / **1.40x** |
| Downside / upside MOIC | 0.60x / 3.61x |

Downside detail: 60% of base revenue ($64.8m) at 1.0x floor (1.4x minus one turn would be 0.4x, floored) = $64.8m EV, $1.20m proceeds, 0.60x — a capital-loss scenario. Upside detail: 150% of base revenue ($162m) at one turn more (2.4x) = $388.8m EV, $7.22m proceeds, 3.61x.

### Principal risks and why invest anyway

- **Structural thin margin:** stored-value infrastructure sits in a category with inherently modest take rates. Absent evidence Ansa earns meaningfully more per merchant than the model above, the base and downside cases do not clear a venture return threshold, which is why HCP recommends **Pass** at the assumed $70m entry price.
- **Undisclosed absolute scale:** "doubled customer base" without a base number is not underwritable. Any renewed interest should require disclosed absolute merchant counts and cohort retention.
- **Competitive crowding:** Fiserv, Marqeta-powered issuers, and vertical loyalty players (Punchh, Bird) all compete for the same merchant budget line.
- **Reconsideration path:** if Ansa discloses a large enterprise/marketplace deployment (not just SMB locations) with materially higher per-account revenue than modeled here, or if entry price is meaningfully below the $70m HCP assumption, this could move back to Diligence.

---

## 5. Kudos

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Watch
**Links:** [Company](https://joinkudos.com) | [Series A coverage](https://techcrunch.com/2024/05/17/kudos-ai-smart-wallet-10m-credit-card/) | [Finextra coverage](https://www.finextra.com/newsarticle/44168/kudos-raises-102m-for-ai-powered-smart-wallet)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Tikue Anazodo | Co-founder and CEO | TechCrunch reports prior roles at Google and Affirm alongside co-founder Ismail. |
| Ahmad Ismail | Co-founder | Same Google/Affirm background per TechCrunch. |

### Product description

Kudos is an AI-powered smart wallet — a browser extension and app — that recommends which credit card a user should use for a given purchase to maximize rewards or cash back. Its "MariaGPT" tool indexes and compares more than 3,000 cards; "Dream Wallet" gives personalized card recommendations based on a user's actual spending; and "Kudos Boost" layers additional cash-back rewards on top of a user's existing card rewards across more than 15,000 partner retailers. The company monetizes primarily through affiliate/referral economics on card recommendations and partner cash-back deals, with plans (per the Series A announcement) to expand MariaGPT into a general personal-finance assistant and a points-based flight-booking portal.

### Thesis: why invest

Consumers leave real money on the table by using the wrong card for a given purchase, and Kudos turns that into a lightweight, checkout-adjacent recommendation product. The May 2024 $10.2m Series A was led by QED Investors, with Patron, Samsung Next, SV Angel, Precursor Ventures, and individual investors including The Points Guy founder Brian Kelly. The company reported growth from 1,000 beta testers in 2022 to 200,000 registered users and over $200m in annualized checkout GMV by the Series A.

The moat is potentially the combination of spend data and card-recommendation accuracy — the more purchase history Kudos sees, the better its recommendations, and better recommendations drive more checkout volume through its extension. However, TechCrunch's own reporting characterized Kudos as "still in the early stages of revenue generation" at the time of the Series A, which is a meaningful company-and-reporter-acknowledged gap between usage and monetization that HCP has not seen closed in more recent public disclosures.

**What must be true:** referral/affiliate economics must scale into durable, high-margin revenue rather than one-time bonuses; the recommendation engine's data advantage must be defensible against card issuers and comparison sites building similar tools natively; and Kudos must convert its 200,000-plus registered users into a meaningfully monetized cohort, not just an engaged-but-unmonetized one.

**Next-round milestones:** disclosed revenue run rate (not just GMV) in the $10m-$15m range, evidence that MariaGPT/Dream Wallet materially improves conversion or retention versus the base extension, and clear separation from free comparison-site competitors on defensibility.

### Founder bet

Anazodo and Ismail's shared Google/Affirm background is a credible signal for both consumer-product execution and fintech-specific judgment. The open question, consistent with TechCrunch's own framing, is whether Kudos can convert genuine user engagement (36% month-over-month growth and 90% retention reported in 2022) into revenue at a pace that justifies the Series A valuation step-up, which the company itself described only as "more than double its seed valuation" without a figure.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---|---|
| Card-holding U.S. consumers open to optimization tools | 60m | $5 | $300m | HCP assumption |
| Affluent/power multi-card users | 15m | $15 | $225m | HCP assumption |
| **TAM** | | | **$525m** | Annual referral/affiliate revenue pool |
| HCP penetration | | | **18.1%** | ~9.5m monetized users by 2032 |
| **2032 revenue opportunity** | | | **$95m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Registered users | 400k | 900k | 1.8m | 3.2m | 5.0m | 7.0m | 9.5m |
| Net annual revenue/user | $2 | $3 | $4 | $5.5 | $7 | $8.5 | $10 |
| **Revenue, $m** | **1** | **3** | **7** | **18** | **35** | **60** | **95** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Kudos** | AI card-recommendation smart wallet | X card selection recommendation; X cash-back layer; Partial general finance assistant | Browser extension, app | Spend-data-driven recommendation accuracy | Free consumer product; monetized via affiliate/referral | $10.2m Series A; $17.2m total; valuation undisclosed; QED, Patron, Samsung Next |
| NerdWallet | Personal-finance comparison/media | X card/product comparison content; Partial real-time checkout recommendation | Web/app, media-driven | SEO/content scale and brand trust | Referral/advertising | Public |
| MaxRewards | Card-optimization app | X card recommendation and reward tracking; Partial cash-back layer | App | Early-mover consumer app in category | Freemium subscription | Private; capital data undisclosed here |
| Extend | Virtual card management for rewards optimization | Partial card selection; X virtual card issuance | App | Issuer partnerships for virtual cards | Freemium | Private; valuation not used |
| The Points Guy | Points/rewards media and tools | Partial card comparison content; No evidence real-time checkout recommendation | Web/media | Brand and content authority | Advertising/affiliate | Private (Red Ventures); capital not comparable |
| Credit Karma | Consumer credit and card recommendation | X card recommendation at scale; Partial checkout-time integration | App/web | Massive user base and credit-data access | Referral/advertising | Private (Intuit subsidiary) |
| Bankrate | Financial product comparison | Partial card comparison; No evidence AI checkout recommendation | Web | Scale and SEO | Advertising/referral | Public (Red Ventures majority-owned) |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [NerdWallet](https://stockanalysis.com/stocks/nrds/statistics/) | 0.68x | Closest business-model comp: referral/comparison monetization |
| [SoFi](https://stockanalysis.com/stocks/sofi/statistics/) | 5.25x | Consumer fintech at scale (reused from reference file) |
| [Robinhood](https://stockanalysis.com/stocks/hood/statistics/) | 18.29x | Premium-growth consumer fintech (reused from reference file) |
| **Median** | **5.25x** | HCP uses 1.5x, close to NerdWallet given Kudos's own admitted early revenue stage |

| Return path | Base |
|---|---:|
| Entry post-money | $50m, HCP assumption |
| Initial ownership | 4.00% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.60% |
| 2032 revenue / exit multiple | $95m / 1.5x |
| Exit enterprise value | $142.5m |
| HCP proceeds / MOIC | $3.71m / **1.85x** |
| Downside / upside MOIC | 0.74x / 4.63x |

Downside detail: 60% of base revenue ($57m) at 1.0x floor = $57m EV, $1.48m proceeds, 0.74x — a capital-loss scenario. Upside detail: 150% of base revenue ($142.5m) at 2.5x = $356.25m EV, $9.26m proceeds, 4.63x.

### Principal risks and why invest anyway

- **Revenue behind usage:** the company's own Series A reporting acknowledged early-stage revenue generation relative to 200,000-plus users and $200m-plus GMV. Require a current revenue disclosure before advancing past Watch.
- **Category crowding:** NerdWallet, Credit Karma, MaxRewards, and Extend all compete for the same card-optimization wedge, several with far larger distribution.
- **Defensibility of the data edge:** card issuers themselves could build native recommendation features, eroding a third-party wallet's advantage.
- **Reconsideration path:** a disclosed revenue run rate materially above the early-2024 characterization, or a lower effective entry price, would justify moving to Diligence.

---

## 6. Baselayer

**Stage:** Seed
**Proposed HCP check:** $2.0m
**Recommendation:** Pursue
**Links:** [Company](https://baselayer.com/) | [Seed announcement](https://www.businesswire.com/news/home/20240501810500/en/Baselayer-Raises-$6.5M-Seed-Round-to-Redefine-Business-Risk-with-AI-Risk-Engine) | [KYB product](https://baselayer.com/business-verification/) | [Identity network](https://baselayer.com/identity-network/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Jonathan Awad | Co-founder | Named in the May 2024 seed-round press release as co-founder, building Baselayer after encountering KYB gaps firsthand. |
| Timothy Hyde | Co-founder | Named alongside Awad in the same press release. |

### Product description

Baselayer is a business-identity verification, risk, and fraud platform (KYB — "know your business") for banks, credit unions, fintechs, marketplaces, payment processors, and SMB lenders. It matches applicant-provided business data against authoritative Secretary of State filings across all 50 states, validates TINs with the IRS in real time, screens for OFAC/sanctions matches, and layers on liens, lawsuits/bankruptcy detection, website and social-media analysis, and an AI-driven "Risk Co.Pilot" that automates underwriting tasks. Its "Identity Network" pools fraud signals across customers into a shared consortium, and "Portfolio Monitoring" continuously watches existing business customers for material changes (dissolutions, officer changes, new liens, sanctions additions). Baselayer's own site claims more than 2,200 financial institutions use the platform, with individual customers reporting up to 92% increases in auto-approval rates and 60% reductions in manual review.

### Thesis: why invest

KYB has historically been a slow, manual underwriting step, and legacy vendors have not kept pace with real-time onboarding expectations from modern fintechs and neobanks. Baselayer's May 2024 $6.5m seed round was 5x oversubscribed — a real market-pull signal — led by Torch Capital, Afore Capital, Founder Collective, Picus Capital, and Gilgamesh Ventures, with participation from named financial-industry executives including Eric Woodward (former President of Early Warning Services) and Jason Mikula, a well-regarded independent fintech analyst. That kind of operator-investor participation is a meaningful credibility signal in a compliance-adjacent category.

The moat is the fraud-consortium data network: the more institutions route KYB decisions through Baselayer, the richer its cross-customer fraud-signal graph becomes, which is the same network-effect logic that has made incumbents like Equifax and TransUnion durable. Baselayer's disclosed 2,200-plus institution count, even if it includes many smaller credit unions on modest usage, is a real distribution base to build that network effect on top of.

**What must be true:** the 2,200-plus institution figure must convert into meaningfully monetized (not just pilot/free-tier) accounts at scale; the fraud-consortium data advantage must compound faster than incumbents like Equifax/TransUnion or newer competitors (Middesk, Alloy, Persona) can replicate; and Baselayer must maintain real-time data accuracy across all 50 states' Secretary of State systems, which vary widely in data quality and update frequency.

**Next-round milestones:** disclosed paying-customer count and average contract value, $15m-$20m ARR, at least one large-bank or card-network reference deployment, and demonstrated fraud-consortium lift (measurable reduction in fraud loss rates) at multiple customers.

### Founder bet

Awad and Hyde built Baselayer around a first-hand pain point in verifying businesses across the financial system, and the caliber of the seed syndicate (Torch Capital, Founder Collective) plus operator-investor participation (a former Early Warning Services president) suggests real domain credibility. The 5x oversubscription is a genuine positive signal on investor demand, though it also means entry price for a new investor is likely to be less favorable than for the original seed backers.

### Market, TAM, and revenue build

Baselayer's own site claims 2,200-plus financial institutions on the platform; HCP treats this as a company claim and conservatively models a smaller, meaningfully-monetized paying subset, since a usage-based, tiered product plausibly includes many low-volume or pilot accounts within that headline number.

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---|---|
| Community banks and credit unions | 9,000 | $8,000 | $72m | HCP assumption |
| Mid-size banks and regional fintechs | 4,000 | $20,000 | $80m | HCP assumption |
| Large banks, card networks, enterprise fintechs | 400 | $150,000 | $60m | HCP assumption |
| Payment processors and SMB lenders | 2,000 | $40,000 | $80m | HCP assumption |
| **TAM** | 15,400 | | **$292m** | Annual KYB/fraud-platform revenue pool |
| HCP penetration | | | **30.8%** | ~6,500 meaningfully monetized accounts by 2032, a fraction of the 2,200-plus (company claim) already on the platform today |
| **2032 revenue opportunity** | | | **$90m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paying, meaningfully-monetized customers | 300 | 650 | 1,200 | 1,900 | 2,700 | 3,500 | 4,300 |
| Avg. annual contract value | $9k | $11k | $13k | $15k | $17k | $19k | $21k |
| **Revenue** | **$3** | **$7** | **$16** | **$29** | **$46** | **$67** | **$90** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Baselayer** | Business identity / KYB / fraud | X SoS matching, TIN validation, sanctions, liens, portfolio monitoring | API and web app | Fraud-consortium network effect across 2,200-plus institutions (company claim) | Undisclosed | $6.5m seed, 5x oversubscribed; Torch Capital, Afore, Founder Collective, Picus, Gilgamesh |
| Middesk | Business verification / KYB API | X business verification and monitoring; Partial full fraud consortium | API | Developer-first API distribution | Usage-based | Private; valuation not used |
| Alloy | Identity and fraud decisioning platform | X broad KYC/KYB orchestration; Partial dedicated business-identity depth | API/platform | Multi-vendor orchestration breadth | Custom | Private; valuation not used |
| Persona | Identity verification platform | Partial business verification; X strong consumer KYC | API | Broad identity-verification distribution | Usage-based | Private; valuation not used |
| Equifax | Consumer and business credit/identity bureau | X business credit and identity data; Partial modern real-time API UX | Enterprise data platform | Decades of bureau data and bank relationships | Custom | Public |
| TransUnion | Consumer and business credit/identity bureau | X business credit and identity data; Partial modern real-time API UX | Enterprise data platform | Bureau data scale | Custom | Public |
| LexisNexis Risk Solutions | Risk and identity data (part of RELX) | X business risk and fraud data; Partial startup-friendly self-serve API | Enterprise data platform | Deep public-records and risk-data breadth | Custom | Public parent (RELX); segment not separately comparable |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Equifax](https://stockanalysis.com/stocks/efx/statistics/) | 4.17x | Consumer/business credit and identity bureau |
| [TransUnion](https://stockanalysis.com/stocks/tru/statistics/) | 4.30x | Consumer/business credit and identity bureau |
| [Fair Isaac (FICO)](https://stockanalysis.com/stocks/fico/statistics/) | 14.45x | Risk-scoring software at premium multiple |
| **Median** | **4.30x** | HCP uses 3.0x, a discount to the bureau incumbents reflecting Baselayer's earlier stage and smaller scale |

| Return path | Base |
|---|---:|
| Entry post-money | $35m, HCP assumption |
| Initial ownership | 5.71% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 3.71% |
| 2032 revenue / exit multiple | $90m / 3.0x |
| Exit enterprise value | $270m |
| HCP proceeds / MOIC | $10.03m / **5.01x** |
| Downside / upside MOIC | 2.01x / 10.03x |

Downside detail: 60% of base revenue ($54m) at one turn less (2.0x) = $108m EV, $4.01m proceeds, 2.01x. Upside detail: 150% of base revenue ($135m) at one turn more (4.0x) = $540m EV, $20.05m proceeds, 10.03x.

### Principal risks and why invest anyway

- **Monetization gap:** the 2,200-plus institution figure is a company claim that likely mixes large paying customers with small or pilot accounts. Require a paying-customer breakdown and average revenue per account before finalizing terms — invest because the seed syndicate's oversubscription and operator participation suggest the underlying pull is real even if the headline count overstates monetized scale.
- **Data-source dependency:** real-time accuracy depends on Secretary of State systems that vary in quality and latency across states. Require evidence of data-freshness SLAs and error-rate monitoring.
- **Bureau incumbency:** Equifax and TransUnion have decades of business data and existing bank relationships. Baselayer must show a clear speed/accuracy/API-experience edge, not just price.
- **Entry price:** the 5x-oversubscribed seed likely means a step-up for a new investor. Confirm the actual post-money terms rather than relying on the HCP assumption used here.

---

## 7. Felix Pago

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Price-sensitive
**Links:** [Company](https://www.felixpago.com) | [Series A coverage](https://techcrunch.com/2024/05/28/felix-pago-raises-15-5-million-to-help-latino-workers-send-money-home-via-whatsapp/) | [QED investment rationale](https://www.qedinvestors.com/blog/why-we-invested-in-felix-pago)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Manuel Godoy | Co-founder and CEO | Identified as CEO in TechCrunch's Series A coverage. |
| Bernardo García | Co-founder | Identified alongside Godoy in the same coverage; TechCrunch notes a third co-founder exists but was not individually named in the article. |

### Product description

Félix Pago is a WhatsApp-native remittance product: users complete a money transfer entirely inside a WhatsApp chat, including by voice message, without downloading a separate app. The platform now supports payouts to ten Latin American countries (Mexico, Guatemala, Honduras, El Salvador, Dominican Republic, Colombia, Nicaragua, Ecuador, Peru, and Costa Rica per the company's current site, up from three countries at the time of the 2024 Series A), with payout via bank deposit, mobile wallet, or cash pickup at more than 40,000 partner locations. Behind the scenes, Félix uses Circle's USDC stablecoin to source and settle foreign exchange, which TechCrunch reported reduces FX costs and pre-funding needs, enabling a free first transfer and a flat $2.50 fee on many subsequent transfers to core corridors.

### Thesis: why invest

Remittances from the U.S. to Latin America are a large, recurring, and still meaningfully priced-inefficient flow, and Félix's WhatsApp-native interface removes the app-download friction that is a real barrier for its target user (blue-collar Latino workers in construction, food service, and home services). The May 2024 $15.5m Series A was led by Castle Island Ventures (a Boston-based crypto-focused fund) with Switch Ventures, HTwenty, MELI Capital (Mercado Libre's venture arm), and Contour returning; Félix has also disclosed partnerships with Mercado Pago and Nubank, both credible distribution signals in the region. Since inception the company has said more than 300,000 users have sent over $1 billion combined through the platform.

The moat is distribution-plus-cost: a referral-driven, chat-native product with stablecoin-powered FX economics is hard for a legacy player (Western Union) to replicate without cannibalizing its own fee structure, and hard for a pure crypto rail to replicate without Félix's retail trust and WhatsApp UX. The risk is that this same moat is replicable by other well-funded LatAm remittance and neobank challengers, and Félix's own growth (previously reported near 30% month-over-month) is not disclosed at a current, comparable rate.

**What must be true:** referral-driven growth must continue without materially rising paid-acquisition cost; the ten-country payout network must maintain reliable partner-location uptime and compliance across jurisdictions with different money-transmission regimes; stablecoin FX arbitrage economics must hold as competitors also adopt similar rails; and Félix must show it can retain users past the free-first-transfer hook.

**Next-round milestones:** $2bn-plus in cumulative processed volume, disclosed current revenue and take-rate figures, expansion into at least two of the additionally listed corridors with proven compliance, and evidence that referral-driven CAC remains materially below paid-acquisition benchmarks for the category.

### Founder bet

Godoy and García (plus an unnamed third co-founder) built a genuinely differentiated distribution mechanic — WhatsApp-native transfer — in a category where most competitors still require a dedicated app. Diligence should confirm the full founding team and assess whether the product's simplicity is defensible or a feature any well-funded competitor could ship within a product cycle.

### Market, TAM, and revenue build

| Bottom-up step | Annual flow | Eligible share | Net take | Result | Basis |
|---|---:|---:|---:|---|
| U.S.-to-Mexico, Central America, Colombia, and Dominican Republic remittance flow | $95bn | 30% addressable for a chat-native, underbanked-focused product | 1.1% | $313.5m | HCP assumption |
| **TAM** | | | | **$313.5m** | Annual net take-rate revenue pool |
| HCP penetration | | | | **44.0%** | Requires sustained multi-corridor category leadership |
| **2032 revenue opportunity** | | | | **$138m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Gross payment volume, $bn | 0.6 | 1.3 | 2.4 | 4.0 | 6.2 | 8.8 | 12.0 |
| Net take rate | 1.00% | 1.00% | 1.05% | 1.10% | 1.10% | 1.15% | 1.15% |
| **Revenue** | **$6** | **$13** | **$25** | **$44** | **$68** | **$101** | **$138** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Félix Pago** | WhatsApp-native LatAm remittances | X send/receive, bank/wallet/cash payout | WhatsApp chat, no separate app required | Chat-native UX plus stablecoin FX economics | $0 first transfer, $2.50 flat fee (core corridors) | $15.5m Series A; ~$18m-plus total; valuation undisclosed; Castle Island, Switch, HTwenty, MELI Capital |
| Western Union | Legacy global remittances | X broad global payout network; Partial modern chat/app UX | Retail, app, web | Massive payout-location footprint | Variable fee/FX spread | Public |
| Remitly | Digital-first remittances | X app-based transfer; No evidence WhatsApp-native flow | App/web | Digital distribution and brand | Variable fee/FX spread | Public |
| Wise | Cross-border transfers, transparent FX | X low-cost FX transfers; No evidence WhatsApp-native or LatAm cash-pickup focus | App/web | Transparent, low-cost FX brand | Transparent fee | Public (LSE-listed; not in stockanalysis.com U.S. comp set) |
| Xoom (PayPal) | Digital remittances | X app/web transfer; Partial LatAm payout breadth | App/web, PayPal-integrated | PayPal distribution | Variable fee | Public parent (PayPal) |
| DolarApp / ARQ | LatAm dollar savings and multi-currency accounts | Partial remittance-adjacent (accounts, cards, FX); No evidence WhatsApp-native chat transfer | App | Multi-currency account and card stack | Undisclosed | $70m Series A (Mar. 2026); Sequoia, Founders Fund — already outgrown this fund's check-size scope |
| Novo Remit / smaller WhatsApp bots | Various small chat-based remittance tools | Partial WhatsApp-based transfer; No evidence Félix's payout-network scale | WhatsApp/Telegram bots | Low switching cost, low differentiation | Variable | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Western Union](https://stockanalysis.com/stocks/wu/statistics/) | 1.11x | Legacy global remittance incumbent |
| [Remitly](https://stockanalysis.com/stocks/rely/statistics/) | 2.59x | Digital-first remittance comp (reused from reference file) |
| [Payoneer](https://stockanalysis.com/stocks/payo/statistics/) | 2.01x | Cross-border payments infrastructure (reused from reference file) |
| [dLocal](https://stockanalysis.com/stocks/dlo/statistics/) | 2.84x | Emerging-market payments infrastructure (reused from reference file) |
| **Median** | **2.30x** | HCP uses 1.8x, below median, reflecting stablecoin-rail regulatory risk and a crowded remittance category |

| Return path | Base |
|---|---:|
| Entry post-money | $70m, HCP assumption |
| Initial ownership | 3.57% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.32% |
| 2032 revenue / exit multiple | $138m / 1.8x |
| Exit enterprise value | $248.4m |
| HCP proceeds / MOIC | $5.77m / **2.31x** |
| Downside / upside MOIC | 0.77x / 5.38x |

Downside detail: 60% of base revenue ($82.8m) at 1.0x floor (0.8x floored) = $82.8m EV, $1.92m proceeds, 0.77x — a capital-loss scenario. Upside detail: 150% of base revenue ($207m) at one turn more (2.8x) = $579.6m EV, $13.45m proceeds, 5.38x.

### Principal risks and why invest anyway

- **Stablecoin dependency:** the FX-cost advantage depends on continued USDC liquidity, Circle's operating stability, and favorable regulatory treatment of stablecoin-based remittance rails. Require exposure limits and a contingency plan if stablecoin regulation tightens.
- **Compliance across ten corridors:** each payout country has its own money-transmission and AML regime. Require a full licensing map and evidence of consistent partner-location uptime.
- **Full entry pricing:** at the $70m HCP assumed post-money, base MOIC is a modest 2.31x. Invest because the WhatsApp-native distribution edge and MELI Capital/Nubank partnerships are real, differentiated signals — but seek a lower effective entry price or firmer current revenue disclosure before committing at this level.
- **Growth-rate disclosure gap:** the ~30% MoM figure is from 2024 reporting; confirm current growth rate, since remittance apps often see deceleration as they scale past early-adopter cohorts.

---

## 8. Formance

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Price-sensitive
**Links:** [Company](https://www.formance.com/) | [Series A announcement](https://www.formance.com/blog/company/formance-secures-21-million-dollar-in-series-a-funding-co-led-by-paypal-ventures-and-portage-ventures-to-expand-its-open-source-financial-infrastructure) | [TechCrunch coverage](https://techcrunch.com/2025/01/29/formance-raises-21-million-to-build-the-aws-of-fintech-infrastructure/) | [GitHub](https://github.com/formancehq/ledger)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Clément Salaün | Co-founder | TechCrunch reports his prior role as payments lead at Selency, a French secondhand-furniture marketplace. |
| Anne-Sybille Pradelles | Co-founder | TechCrunch reports her prior role as COO of cybersecurity startup Alsid. |

### Product description

Formance is an open-source, programmable core ledger for fintech and regulated financial companies. Its Ledger module models transactions and balances using Numscript, a purpose-built scripting language for complex financial flows such as multi-party splits and holds. Connectivity ingests transaction data across banks, payment rails, wallets, and exchanges into one unified model; Flows automates fund-lifecycle steps like holds, KYC checks, and payout orchestration; and Reconciliation automatically matches internal ledger records against external bank and processor statements. The core is open source and can be self-hosted, which the company positions as a control-and-transparency advantage over closed, vendor-hosted ledger products. Named customers include Liberis (lending), Doctolib (healthcare payments), Payflip, Shares, Bastion, GetMomo, and Stables. Formance holds SOC 2 Type II and ISO 27001 certifications and states DORA compliance.

### Thesis: why invest

Every fintech eventually needs a ledger that can reconcile money across multiple rails and partners, and most build one in-house — a slow, expensive, and error-prone undertaking. Formance's open-source-plus-managed-cloud model mirrors the pattern that has worked for other infrastructure categories (databases, observability): give developers a credible, inspectable core for free, then monetize the hosted, supported version. The January 2025 $21m Series A was co-led by PayPal Ventures and Portage Ventures, with Y Combinator, Hoxton Ventures, and Axeleo Capital participating — a strong signal, since PayPal Ventures' participation implies real technical and strategic diligence from a company that operates ledgers at enormous scale itself. TechCrunch reported the round came alongside a 10x revenue increase over the prior 12 months, a strong (if narrow, single-data-point) growth signal.

The moat is the same one Mem0 and other open-core infrastructure plays rely on: distribution through open-source adoption, monetization through a hosted control plane, and switching cost that rises as more of a customer's transaction and reconciliation logic lives inside Formance's ledger.

**What must be true:** open-source adoption must convert into paid hosted/enterprise revenue at a healthy rate, not just free self-hosted usage; the 10x growth rate must be sustainable off a larger base, not a one-time step from a very small starting point; and Formance must win regulated-institution trust (SOC 2, ISO 27001, DORA) against both in-house builds and closed competitors like Modern Treasury and Unit.

**Next-round milestones:** $12m-$15m ARR, 15-plus enterprise/regulated-institution customers beyond the current named list, net revenue retention above 120%, and continued open-source community growth (GitHub stars, contributors) as a leading indicator of the top of the funnel.

### Founder bet

Salaün's payments-operations background (Selency) and Pradelles' security/compliance background (Alsid) is a sensible pairing for a ledger product that must be both developer-friendly and audit-grade. The bet is that this team can convert genuinely strong 2024-2025 momentum (10x revenue growth, PayPal Ventures co-lead) into a durable enterprise motion without losing the open-source developer trust that seeded its early adoption.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---|---|
| Fintechs and regulated institutions needing programmable ledger infrastructure | 8,000 | $80,000 | $640m | HCP assumption |
| Enterprise/bank-scale deployments | 500 | $400,000 | $200m | HCP assumption |
| **TAM** | | | **$840m** | Annual hosted-ledger revenue pool |
| HCP penetration | | | **19.9%** | ~1,150 scaled customers by 2032 |
| **2032 revenue opportunity** | | | **$167m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid customers | 40 | 100 | 210 | 380 | 600 | 850 | 1,150 |
| Avg. annual revenue/customer | $60k | $70k | $85k | $100k | $115k | $130k | $145k |
| **Revenue** | **$2** | **$7** | **$18** | **$38** | **$69** | **$111** | **$167** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Formance** | Open-source programmable core ledger | X ledger, connectivity, flows, reconciliation | Open-source, self-hosted or managed cloud | Open-source distribution plus hosted control plane | Open source; managed tiers undisclosed | $21m Series A; total undisclosed; PayPal Ventures, Portage, YC, Hoxton, Axeleo |
| Modern Treasury | Payment operations and ledger infrastructure | X ledger and payment-ops workflows; Partial open-source (closed product) | API | Bank-grade payment-ops depth and enterprise trust | Custom | Private; valuation not used |
| Unit | Banking-as-a-service with ledger components | X embedded banking infra incl. ledger; Partial standalone open-core ledger focus | API | BaaS breadth beyond pure ledger | Custom | Private; valuation not used |
| Increase | Banking infrastructure API | Partial ledger-adjacent (banking rails); No evidence dedicated open-source ledger | API | Direct bank-charter relationships | Custom | Private; capital data undisclosed here |
| nCino | Bank operating system, incl. ledger-adjacent workflows | Partial ledger-adjacent (loan/deposit workflows); No evidence open-source developer focus | Enterprise SaaS | Bank/credit-union incumbency | Custom | Public |
| Fiserv | Core banking, including ledger systems | X broad core-ledger systems; No evidence open-source, developer-first model | Enterprise platform | Massive bank distribution | Custom | Public |
| TigerBeetle | Open-source financial-transactions database | Partial (database, not full ledger-application layer); X open-source distribution | Open-source database | Performance-focused OSS database niche | Open source; commercial support undisclosed | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Fiserv](https://stockanalysis.com/stocks/fi/statistics/) | 2.63x | Core banking/ledger infrastructure at scale |
| [Marqeta](https://stockanalysis.com/stocks/mq/statistics/) | 1.76x | Payments/issuing infrastructure |
| [nCino](https://stockanalysis.com/stocks/ncno/statistics/) | 3.57x | Bank operating-system software |
| **Median** | **2.63x** | HCP uses 2.0x, below median, reflecting open-source monetization uncertainty |

| Return path | Base |
|---|---:|
| Entry post-money | $100m, HCP assumption |
| Initial ownership | 2.50% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.63% |
| 2032 revenue / exit multiple | $167m / 2.0x |
| Exit enterprise value | $334m |
| HCP proceeds / MOIC | $5.43m / **2.17x** |
| Downside / upside MOIC | 0.65x / 4.88x |

Downside detail: 60% of base revenue ($100.2m) at 1.0x floor = $100.2m EV, $1.63m proceeds, 0.65x — a capital-loss scenario. Upside detail: 150% of base revenue ($250.5m) at one turn more (3.0x) = $751.5m EV, $12.21m proceeds, 4.88x.

### Principal risks and why invest anyway

- **Open-source monetization risk:** self-hosted adopters may never convert to the paid hosted tier. Require cohort data on self-hosted-to-cloud conversion before finalizing valuation.
- **Full entry pricing:** at the $100m HCP assumed post-money (consistent with a roughly 4.75x multiple on the disclosed $21m raise), base MOIC is a modest 2.17x. Invest because PayPal Ventures' co-lead and the disclosed 10x revenue growth are unusually strong signals for this stage — but push for a lower effective entry price or a secondary discount given the full pricing.
- **Narrow growth data point:** "10x revenue growth" off an undisclosed (likely very small) base is a weak standalone signal. Require the absolute revenue figures behind that percentage.
- **Regulated-customer trust:** ledger infrastructure sits in a highly sensitive part of a regulated institution's stack. SOC 2/ISO 27001/DORA compliance is necessary but not sufficient — require reference calls with at least two regulated customers (e.g., Doctolib, Liberis) on reliability and audit experience.

---

## 9. Keep (swap for Moment)

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Diligence
**Links:** [Company](https://www.trykeep.com/) | [Funding announcement](https://www.prnewswire.com/news-releases/keep-raises-c108m-to-transform-small-business-banking-in-canada-302459385.html) | [Newswire coverage](https://www.newswire.ca/news-releases/keep-raises-c-108m-to-transform-small-business-banking-in-canada-879787919.html) | [Fintech.ca coverage](https://www.fintech.ca/2025/05/20/keep-emerges-stealth-transform-finance-small-business/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Oliver Takach | Co-founder and CEO | Named in the May 2025 funding press release; described as a two-time Y Combinator founder who previously bootstrapped a business to C$2m revenue by 2019. |
| Additional co-founder | Possibly Helson Taveras | A single lower-confidence aggregator source (Sacra) names a second co-founder; this could not be corroborated against a primary source and should be confirmed directly in diligence before being relied upon. |

### Product description

Keep is an all-in-one financial platform for Canadian small and mid-size businesses, combining a corporate credit card, expense management and automation, multi-currency banking, international payments, and growth-capital financing (up to $1m) in one product. Cards are issued by Peoples Trust Company under a Mastercard license, and the platform advertises credit limits 10-20x higher than typical small-business cards, an 8-minute application, and approvals within 72 hours. The company's own site states it is "trusted by 5,000-plus Canadian companies" (a figure that is higher than the 3,000-plus disclosed at the May 2025 funding announcement, consistent with continued growth) and has processed more than $90m in transactions.

### Thesis: why invest

Canadian SMBs are underserved by the same category of vertically-integrated card-and-spend-management platforms (Brex, Ramp) that have scaled in the U.S., partly because Canadian banking infrastructure and card economics differ enough that a U.S. product cannot simply expand north. Keep emerged from stealth in May 2025 with a C$108m funding package: C$33m in equity (roughly $24m USD) led by Tribe Capital, a C$71m credit facility from Treville Capital Group, and a C$4m venture-debt line from Silicon Valley Bank. The equity round also drew participation from Rebel Fund, Liquid2 Ventures, Cambrian, Assurant Ventures, and a notable roster of individual angels from Robinhood, Venmo, Stripe, Plaid, Chime, Coinbase, Ramp, and Alloy — a strong signal of operator conviction in the space. At the time of the announcement, Keep disclosed C$20m-plus in annualized revenue (2024), 300%-plus net dollar retention, and 3,000-plus SMBs onboarded — real, disclosed financial metrics, which is unusual and valuable for a company this early relative to most others in this batch.

**Exception note:** the C$33m (~$24m USD) equity component of this round is larger than a typical seed or small Series A, and Keep's post-stealth positioning suggests real operating history predates the public "emergence." HCP is including Keep as this batch's swap-in specifically because, despite the larger round size, it remains labeled a first institutional/Series A round with disclosed metrics still consistent with the fund's stage mandate (unlike Moment's actual Series C or DolarApp/ARQ's $70m round with $10bn in annualized volume), and because the disclosed revenue and retention figures give HCP unusually solid underwriting inputs for this batch.

**What must be true:** the disclosed 300%-plus net dollar retention must be durable as the customer base matures past early adopters; Keep must defend against Brex, Ramp, and Float entering or expanding in Canada; and the C$71m credit facility must remain available and appropriately priced as the card-receivables book scales.

**Next-round milestones:** C$40m-plus ARR, net dollar retention sustained above 150% on a larger base, 10,000-plus SMBs onboarded, and a disclosed equity valuation at the next round.

### Founder bet

Takach's track record (two-time YC founder, prior bootstrapped business to C$2m revenue) and the quality of the seed/Series A syndicate and angel roster (current and former operators from Stripe, Plaid, Chime, Ramp) are strong positive signals. The single-named-founder risk here is real: only Takach is confirmed via a primary source, and the co-founder question should be resolved before closing.

### Market, TAM, and revenue build

Keep's own disclosed 2024 figures (C$20m-plus ARR, 3,000-plus SMBs, implying roughly C$6,700 per customer, or about $4,800 USD at a 0.72 USD/CAD rate) anchor this build; all forward years are HCP projections.

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---|---|
| Canadian SMBs (incorporated businesses, meaningful revenue scale) | 400,000 | $3,000 (net revenue at platform scale) | $1.2bn | HCP assumption |
| **TAM** | 400,000 | | **$1.2bn** | Annual net-revenue pool |
| HCP penetration | | | **21.3%** | ~30,000 customers (7.5% of the TAM population) at a higher blended ACV by 2032 |
| **2032 revenue opportunity** | | | **$255m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| SMB customers | 4,500 | 7,000 | 10,500 | 15,000 | 20,000 | 25,000 | 30,000 |
| Avg. annual revenue/customer | $5.0k | $5.5k | $6.0k | $6.7k | $7.3k | $7.9k | $8.5k |
| **Revenue** | **$23** | **$39** | **$63** | **$101** | **$146** | **$198** | **$255** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Keep** | All-in-one SMB banking and corporate card (Canada) | X card, expense automation, multi-currency banking, growth capital | Web/app, card issued via Peoples Trust | Vertically integrated Canadian-specific banking stack | Interchange, subscription, credit-facility spread | C$108m package (C$33m equity, C$71m credit facility, C$4m venture debt); Tribe Capital led equity |
| Ramp | SMB/mid-market spend management and card | X card, expense automation, bill pay; No evidence Canada-specific banking depth | Web/app | Scale, brand, U.S. enterprise depth | Interchange-driven, free core product | Private; valuation not used |
| Brex | Corporate card and spend management | X card, expense automation; No evidence dedicated Canadian banking stack | Web/app | Enterprise/scale-up brand and scale | Interchange-driven | Private; valuation not used |
| Float | Canadian corporate card and spend management | X card, expense automation, Canada-native | Web/app | Canada-native incumbency in this specific niche | Interchange-driven | Private; capital data undisclosed here |
| Loop (Canada) | Cross-border payments for Canadian SMBs | Partial payments-adjacent; No evidence broad card/banking suite | Web/app | Cross-border payments focus | Custom | Private; capital data undisclosed here |
| RBC / major Canadian banks | Traditional SMB banking and cards | X broad banking; Partial modern expense-automation UX | Branch, web, app | Massive distribution and trust | Custom | Public (diversified financial institutions) |
| American Express Business | SMB corporate cards | X card and rewards; Partial modern spend-automation software | App/web | Brand, rewards network | Custom | Public |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Nu Holdings](https://stockanalysis.com/stocks/nu/statistics/) | 7.42x | Consumer/SMB-adjacent digital-first financial platform at scale |
| [Affirm](https://stockanalysis.com/stocks/afrm/statistics/) | 8.26x | Consumer/SMB credit-adjacent fintech at premium multiple |
| [SoFi](https://stockanalysis.com/stocks/sofi/statistics/) | 5.25x | Digital-first financial platform (reused from reference file) |
| **Median** | **7.42x** | HCP uses 3.0x, well below the comp set, reflecting Keep's single-country focus and intense competition from Brex/Ramp/Float |

| Return path | Base |
|---|---:|
| Entry post-money | $150m, HCP assumption |
| Initial ownership | 1.67% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.08% |
| 2032 revenue / exit multiple | $255m / 3.0x |
| Exit enterprise value | $765m |
| HCP proceeds / MOIC | $8.29m / **3.31x** |
| Downside / upside MOIC | 1.33x / 6.63x |

Downside detail: 60% of base revenue ($153m) at one turn less (2.0x) = $306m EV, $3.31m proceeds, 1.33x. Upside detail: 150% of base revenue ($382.5m) at one turn more (4.0x) = $1.53bn EV, $16.57m proceeds, 6.63x.

### Principal risks and why invest anyway

- **Large, full-priced round:** a $150m HCP-assumed post-money for a $2.5m check yields only 1.67% initial ownership. Invest because the disclosed revenue and 300%-plus net dollar retention are real, verifiable metrics rare in this batch — but this is a diligence case to confirm actual terms, not a blind Pursue.
- **Single-country concentration:** all disclosed revenue and customers are Canada-only. Verify whether U.S. or broader expansion is planned and how that would affect the licensing and card-issuing stack.
- **Credit-facility dependency:** C$71m of the C$108m package is a credit facility, not equity — Keep's card-receivables model depends on that facility remaining available on acceptable terms as the book scales.
- **Co-founder uncertainty:** only Oliver Takach is confirmed as a founder via a primary source. Resolve full founding-team composition before closing.

---

## 10. Layer

**Stage:** Seed
**Proposed HCP check:** $1.75m
**Recommendation:** Diligence
**Links:** [Company](https://www.layerfi.com/) | [Seed announcement](https://www.globenewswire.com/news-release/2025/07/09/3112479/0/en/Layer-Raises-6-6M-Led-by-Emergence-Capital-to-Bring-Embedded-Accounting-to-the-SMB-Software-Stack.html) | [Pre-seed coverage](https://techcrunch.com/2024/05/15/embedded-accounting-layer-2-3m-quickbooks/) | [Product overview](https://docs.layerfi.com/overview)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Justin Meretab | Co-founder | Named in seed-round coverage as co-founder of Layer, founded 2023, headquartered in San Francisco. |
| Daniel O'Neel | Co-founder | Named alongside Meretab in the same coverage. |

### Product description

Layer is embedded accounting infrastructure for SMB software platforms: point-of-sale systems, neobanks, and other vertical or horizontal software serving small businesses can embed Layer's accounting tools and full-service bookkeeping directly into their own product via API and pre-built JavaScript UI components. Layer offers two components — embedded accounting software that connects to a platform's transaction data, and white-labeled, human-backed bookkeeping (dedicated bookkeepers handling monthly reconciliation and reporting) — positioning the platform as "the financial home" for the SMB customer, rather than sending them to a separate QuickBooks-style product. Named customers include Moxie (medspa software), Nav, Duet, and Dripos, with Layer reporting over 40% bookkeeping adoption among new Moxie medspas and over 25% adoption within three months of launch for Nav and Duet.

### Thesis: why invest

Most SMB software platforms want to own the financial relationship with their customer but do not want to build accounting infrastructure themselves, which is exactly the wedge Layer is pursuing — similar in structure to Mercoa's embedded AP/AR thesis but for the accounting/bookkeeping layer instead of payments. Layer raised a $2.3m pre-seed in 2024 (Better Tomorrow Ventures leading, with executives from Square, Plaid, Unit, and Check participating as investors — a strong domain-relevant angel signal) and a $6.6m seed in July 2025 led by Emergence Capital, a growth-stage-oriented fund whose participation this early is a notable signal of conviction. The company reports quadrupling its SMB platform customer base over the year preceding the seed round and now supports more than 30,000 SMBs through its platform partners.

The moat, if it develops, is the same one embedded-finance products generally chase: once a platform's customers' books live inside Layer, both the platform and the SMB face real switching costs to move to a standalone tool. The disclosed adoption rates (25-40% of a platform's new customers opting in) are a genuinely useful, real metric — most companies in this batch disclose growth in relative terms without a comparable adoption benchmark.

**What must be true:** the 25-40% adoption rates must hold or improve as Layer expands beyond its initial handful of named platform partners; the human-bookkeeper-backed service must scale without linear headcount growth eating into gross margin; and Layer must win new platform partnerships against Intuit's QuickBooks ecosystem and other embedded-accounting entrants.

**Next-round milestones:** 15-plus live platform partnerships (versus 4 named today), $8m-$10m in annualized platform revenue, gross margin data showing the human-bookkeeping layer does not structurally cap software-like margins, and adoption-rate consistency across at least two new verticals beyond medspas and the initially named partners.

### Founder bet

Meretab and O'Neel assembled a domain-credible angel base (Square, Plaid, Unit, Check operators) at pre-seed and converted that into a growth-stage-caliber lead (Emergence Capital) at seed — an unusual and positive progression for a company only two years old. The real test is whether the initial strong adoption metrics at a handful of named platforms (Moxie, Nav, Duet, Dripos) generalize to a broader base of SMB software partners.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---|---|
| Vertical and horizontal SaaS platforms serving SMBs, addressable for embedded accounting | 8,000 | $70,000 (revenue at full partner scale) | $560m | HCP assumption |
| **TAM** | | | **$560m** | Annual embedded-accounting revenue pool |
| HCP penetration | | | **23.0%** | ~300 scaled platform partners by 2032 |
| **2032 revenue opportunity** | | | **$129m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Platform partners | 15 | 35 | 65 | 110 | 170 | 230 | 300 |
| Avg. annual revenue/partner | $40k | $70k | $120k | $190k | $270k | $350k | $430k |
| **Revenue** | **$1** | **$2** | **$8** | **$21** | **$46** | **$81** | **$129** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Layer** | Embedded accounting for SMB platforms | X embedded accounting software; X white-labeled human bookkeeping | API, JS UI components | Platform-partner switching cost via financial-home positioning | Undisclosed | $6.6m seed (2025) plus $2.3m pre-seed (2024); ~$9m total; Emergence Capital, Better Tomorrow Ventures |
| Intuit QuickBooks | SMB accounting software, direct and via app ecosystem | X broad accounting; Partial embeddable within third-party platforms | SaaS and app-ecosystem integrations | Massive SMB brand and ecosystem incumbency | Subscription | Public |
| Puzzle | AI-native accounting for startups/SMBs | X modern accounting software; No evidence dedicated embedded/white-label model | SaaS | AI-native ledger design | Subscription | Private; valuation not used |
| Digits | AI-powered accounting and bookkeeping | X AI bookkeeping automation; Partial embeddable for platforms | SaaS/API | AI-driven categorization and insights | Subscription | Private; valuation not used |
| Bench (Employer Solutions) | Outsourced bookkeeping | X human bookkeeping service; No evidence embeddable API for platforms | Service plus software | Human-backed bookkeeping brand | Subscription | Acquired/relaunched under Employer.com; capital status not comparable |
| Bill.com | AP/AR and adjacent SMB financial tools | Partial accounting-adjacent; No evidence dedicated embedded bookkeeping | SaaS/embedded | Payments-plus-financial-workflow breadth | Subscription plus transaction fees | Public |
| Xero | SMB accounting software | X broad accounting; Partial embeddable via API/app ecosystem | SaaS | International SMB accounting brand | Subscription | Public (ASX-listed; not in stockanalysis.com U.S. comp set) |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Intuit](https://stockanalysis.com/stocks/intu/statistics/) | 3.81x | Direct SMB accounting-software comp |
| [Bill.com](https://stockanalysis.com/stocks/bill/statistics/) | 2.60x | Adjacent embedded SMB financial-workflow comp (reused from Mercoa) |
| [BlackLine](https://stockanalysis.com/stocks/bl/statistics/) | 2.71x | Financial close/reconciliation automation comp (reused from Mercoa) |
| **Median** | **2.71x** | HCP uses 2.0x, below median, reflecting early revenue stage |

| Return path | Base |
|---|---:|
| Entry post-money | $40m, HCP assumption |
| Initial ownership | 4.38% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.84% |
| 2032 revenue / exit multiple | $129m / 2.0x |
| Exit enterprise value | $258m |
| HCP proceeds / MOIC | $7.34m / **4.19x** |
| Downside / upside MOIC | 1.26x / 9.43x |

Downside detail: 60% of base revenue ($77.4m) at 1.0x floor = $77.4m EV, $2.20m proceeds, 1.26x. Upside detail: 150% of base revenue ($193.5m) at one turn more (3.0x) = $580.5m EV, $16.51m proceeds, 9.43x.

### Principal risks and why invest anyway

- **Concentrated proof points:** the strong 25-40% adoption metrics come from a small number of named platform partners (Moxie, Nav, Duet, Dripos). Require evidence the rate holds as Layer signs materially different verticals.
- **Human-bookkeeping margin risk:** the white-labeled bookkeeping layer requires human labor that does not scale like pure software. Require a cost-to-serve breakdown separating the software and services revenue lines.
- **Incumbent bundling:** Intuit could extend QuickBooks into an embeddable, platform-friendly product. Layer's advantage should be platform-native design and faster integration — verify this against a direct Intuit embedded offering if one exists.
- **Why invest anyway:** the founder-to-Emergence-Capital progression, real (if narrow) adoption-rate evidence, and a reasonable $40m assumed entry price for a $1.75m check combine to make this one of the more evidence-backed cases in the batch, which is why HCP recommends Diligence rather than Watch or Pass.

---

## Source and assumption notes

1. Company facts are sourced to official company sites, primary financing announcements (PR Newswire, GlobeNewswire, BusinessWire, company blogs), and credible independent reporting (TechCrunch, QED Investors' own blog, Y Combinator's company directory). Where only aggregator data (Crunchbase, PitchBook, Tracxn, Sacra) was available — Straddle's funding terms and Keep's possible second co-founder — this is explicitly flagged in the relevant memo rather than presented as confirmed.
2. Public-company EV/LTM revenue multiples are point-in-time figures pulled from stockanalysis.com on July 18, 2026, and can change daily; refresh immediately before an investment committee meeting. Where a ticker also appears in the reference ten-company file (Payoneer, Remitly, dLocal, SoFi, Robinhood, Marqeta reused within this batch, Fiserv reused within this batch), HCP reused that cited figure rather than re-pulling it; all other tickers (Guidewire, Verisk, CCC Intelligent Solutions, Sapiens, Global Payments, Bill.com, BlackLine, Intuit, NerdWallet, Equifax, TransUnion, Fair Isaac, Western Union, nCino, Nu Holdings, Affirm, PayPal) were fetched fresh for this batch.
3. TAM calculations are HCP bottom-up underwriting models. Every unit count and per-unit price labeled HCP assumption is deliberately visible so the committee can replace it with management or third-party evidence in diligence.
4. No current-round post-money valuation is publicly disclosed for any of the ten companies in this batch. Every entry post-money figure in the return-path tables is an explicit HCP assumption for return testing, not a claim about actual financing terms.
5. Two companies carry unresolved factual conflicts that should be treated as live diligence items, not settled facts: Mercoa (a third-party aggregator claims the product is discontinued, directly contradicted by the company's own live site, product changelog through August 2025, and Y Combinator's "Active" status listing) and Keep (a second co-founder name appears in only one lower-confidence aggregator source and could not be corroborated).
6. The roster swap (Moment out; Keep in, after DolarApp/ARQ was also checked and rejected) is recorded at the top of this file and repeated here: Moment raised a $78m Series C in May 2026 (total funding $134m), and ARQ (formerly DolarApp) raised a $70m Series A in March 2026 with 2 million users and $10bn in company-reported annualized transaction volume — both outgrew this fund's $1.0m-$2.5m first-check mandate.
