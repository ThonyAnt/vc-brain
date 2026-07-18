# HCP Investment Memos: Batch 03 — Healthcare Software and Regulated Technology (Anterior, Freed, Counsel Health, Summer Health, Millie, Fay, Sohar Health, Tandem Health, Synthpop, Legion Health)

**Prepared:** July 18, 2026
**Scope:** Public-source underwriting only; no Crunchbase or PitchBook access
**Target initial check:** $1.0 million to $2.5 million
**Important:** Financing terms, ownership, revenue, penetration, dilution, and exit values labeled **HCP assumption** are underwriting inputs, not company disclosures. All dollars are U.S. dollars unless noted.

**Roster notes and exceptions (recorded per PROMPT.md swap/exception rules):**
- No company substitution was required. All ten assigned companies verified as real, independent, and in scope.
- **Anterior** is carried at its current **Series B** stage rather than the roster's Series A hint: the company closed a $20m Series A in June 2024 ($95m post-money, per TechCrunch) and has since closed a $40m Series B in February 2026 (total funding $64m, valuation undisclosed). This is the explicit Series-B exception permitted by the batch instructions; the memo screens the company at its current round.
- **Fay** is carried at its current **Series B** stage rather than the roster's Series A hint: the company raised a $20m Series A in 2024 and has since closed a **$50m Series B at a disclosed $500m post-money valuation** (Goldman Sachs, February 2025). This is a second explicit Series-B exception. Because the valuation is unusually rich relative to the company's public comp set, the memo prices HCP's check at that disclosed valuation rather than an assumption, and the resulting return case is weak — this is intentional and explained in the memo, not smoothed over.
- **Millie**: the roster URL hint (milliehealth.com) resolves to an unrelated company (**Moonshot Health Inc.**, a home-safety monitoring product also branded "Millie," currently pre-launch). The maternity-care company described in the roster is at **millieclinic.com**. This memo covers the maternity-clinic company only; the domain collision is flagged so it is not confused with the unrelated home-monitoring startup in any downstream merge.
- **Legion Health**: the roster URL hint (legionhealth.ai) does not resolve (DNS failure as of July 18, 2026). The company's live site is **legionhealth.com**. Same company, corrected domain.

## Portfolio summary

| Rank | Company | Segment | Round screened | Proposed check | Base MOIC | Recommendation |
|---:|---|---|---|---:|---:|---|
| 1 | Sohar Health | Eligibility verification API | Seed | $1.25m | 8.3x | Pursue |
| 2 | Freed | AI medical scribe | Series A | $2.5m | 5.3x | Pursue |
| 3 | Legion Health | AI-enabled psychiatry | Seed | $1.25m | 4.1x | Diligence |
| 4 | Synthpop | AI for DME/specialty workflows | Series A | $1.5m | 3.6x | Diligence |
| 5 | Counsel Health | AI medical guidance | Series A | $2.0m | 3.3x | Diligence |
| 6 | Anterior | Prior-auth clinical AI | Series B (exception) | $2.0m | 3.0x | Price-sensitive |
| 7 | Tandem Health | EU clinical AI scribe | Series A | $2.5m | 3.0x | Price-sensitive |
| 8 | Summer Health | Pediatric messaging care | Series A | $1.5m | 2.7x | Watch |
| 9 | Millie | Maternity care clinics | Series A | $2.0m | 2.4x | Watch |
| 10 | Fay | Dietitian marketplace | Series B (exception) | $1.5m | 0.6x | Pass |

### Common model conventions

- Revenue is built from operating units, not a top-down market-growth percentage. Forecasts represent an HCP base case and are not management guidance.
- Entry ownership equals check divided by post-money valuation. Exit ownership equals entry ownership multiplied by one minus cumulative dilution.
- Exit enterprise value equals 2032 revenue multiplied by the selected EV/LTM revenue multiple. HCP proceeds equal exit enterprise value multiplied by exit ownership. MOIC equals proceeds divided by check. The model excludes preference effects, taxes, fees, secondary sales, and follow-on reserves.
- Public-comps multiples are snapshots as of July 18, 2026. Multiples reused from the reference memo's linked StockAnalysis pages are noted as such; multiples fetched directly by this batch are sourced to the same stockanalysis.com/stocks/&lt;ticker&gt;/statistics/ pages, whose financial statistics cite S&P Global Market Intelligence.
- Downside uses 60% of base exit revenue and one turn less on the multiple, with a 1.0x floor. Upside uses 150% of base exit revenue and one turn more. Dilution is held constant.
- Competitive tables use **X** only where the capability is verified, **Partial** where the product covers only part of the workflow, **No evidence** where public material does not support the claim, and **Undisclosed** for unavailable commercial or capital data.
- Entry post-money valuations are HCP assumptions unless a valuation is explicitly disclosed in a financing announcement (Fay is the only company in this batch with a disclosed current-round valuation).

---

## 1. Sohar Health

**Stage:** Seed
**Proposed HCP check:** $1.25m
**Recommendation:** Pursue
**Links:** [Company](https://www.soharhealth.com/) | [Financing announcement](https://www.prnewswire.com/news-releases/sohar-health-lands-3-8m-to-open-the-front-door-to-faster-fairer-care-302414445.html) | [Verification product](https://www.soharhealth.com/products/verification) | [Y Combinator profile](https://www.ycombinator.com/companies/sohar-health)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Ashish Mandavia, M.D. | Co-founder and CEO | Physician co-founder; PR Newswire financing release identifies him as co-founder and CEO and states the company was "founded by a physician and an engineer in 2023." |
| Unnamed engineering co-founder | Co-founder | The financing release confirms a second, engineer co-founder but does not name them; confirm identity and current role in diligence. |

### Product description

Sohar Health is an API for real-time insurance eligibility determination and verification of benefits (VoB). Providers query the API with minimal patient information — sometimes only name, date of birth, and state — and Sohar returns coverage discovery, eligibility and benefits detail, in-network status, and patient cost estimates. The company reports a median response time of 6 seconds, 96% accuracy on benefits data, and bulk API support for up to 1,000 checks per call. Sohar targets healthcare organizations that are poorly served by legacy clearinghouses, starting in behavioral health and telehealth, where eligibility complexity and denial rates are especially costly. Named customers on the company site include Talkiatry, Rula, Headway, Mindful Health Solutions, and Two Chairs — all venture-backed behavioral-health platforms, which is a credible signal of product-market fit in a demanding buyer segment.

### Thesis: why invest

Eligibility verification is unglamorous infrastructure, but it sits directly in the revenue path of every healthcare provider: a wrong or slow eligibility check causes claim denials, patient billing surprises, and lost conversion at intake. Sohar's site claims more than 5 million verification checks processed annually, a 12% increase in patient conversion, and 8x ROI within twelve months for customers — these are company-reported figures and should be corroborated with named-customer references in diligence, but the specificity and the quality of the disclosed logo list (Talkiatry, Headway, Two Chairs) are more credible than typical unverified marketing claims.

The moat is not the eligibility data itself — payers publish X12 270/271 eligibility responses that any competitor can also query — it is speed, accuracy, and specialty-specific parsing (behavioral health benefits are notoriously inconsistent across payers) built into a clean, developer-friendly API. If Sohar becomes the default eligibility layer for the next generation of digital-health platforms the way Plaid became the default for bank-account linking, usage compounds automatically as each customer scales its own patient volume.

**What must be true:** accuracy and latency must hold up as Sohar expands beyond behavioral health into more complex specialties; the API must become embedded deeply enough in customer intake flows to create real switching costs; and unit economics per check must remain healthy as payer-side rate limits and clearinghouse costs scale with volume.

**Next-round milestones:** 50 million annualized verification checks, $10m ARR, expansion into at least two additional specialty verticals beyond behavioral health, formal SOC 2 Type II certification, and at least three enterprise logos with more than 500,000 annual checks each.

### Founder bet

The bet is a clinician-plus-engineer pairing that understands both the operational pain of eligibility denials and how to build reliable infrastructure around it. A physician co-founder is a differentiated advantage in behavioral health specifically, where clinical nuance (session limits, diagnosis-driven coverage rules) complicates eligibility logic that a purely technical team might get wrong. Diligence should confirm the engineering co-founder's identity and background, verify the claimed 96% accuracy rate against an independent sample, and assess whether the founding team has a credible plan to sell into larger, less price-sensitive specialties (orthopedics, cardiology, oncology) beyond its behavioral-health beachhead.

### Market, TAM, and revenue build

| Bottom-up step | Annual checks | Net value/check | Result | Basis |
|---|---:|---:|---:|---|
| Behavioral health and telehealth eligibility checks | 160m | $0.50 | $80m | HCP assumption: Sohar's current beachhead vertical, sized from industry-wide behavioral-health visit volume |
| Broader ambulatory and specialty eligibility checks | 700m | $0.30 | $210m | HCP assumption: adjacent verticals Sohar could expand into with the same API |
| **TAM** | 860m | | **$290m** | Annual eligibility-verification software pool |
| HCP penetration | | | **23.4% of TAM revenue** | Reflects category leadership in behavioral health plus early expansion; requires real vertical diversification |
| **2032 revenue opportunity** | | | **$68m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Annualized checks, millions | 6 | 13 | 23 | 36 | 48 | 58 | 68 |
| **Revenue** | **3** | **8** | **16** | **28** | **44** | **58** | **68** |

Illustrative blended net revenue per check rises from roughly $0.50 in 2026 to roughly $1.00 by 2032 as Sohar mixes in higher-value specialty verticals; the check-volume figures above are illustrative, not disclosed by the company.

### Competitive landscape

| Company | Category / primary user | Workflow coverage | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Sohar Health** | Eligibility verification API | X discovery, verification, network status, cost estimate | API, bulk endpoint | Specialty-specific (behavioral health) parsing accuracy and speed | Undisclosed | $3.8m seed; total and valuation undisclosed; Kindred Capital, Y Combinator, Rebel Fund, Concept Ventures |
| Availity | Payer-provider eligibility and claims clearinghouse | X eligibility, claims, remittance; Partial modern API | Clearinghouse network, portal, API | Deepest payer-network coverage and incumbency | Custom/enterprise | Private; valuation undisclosed |
| Waystar | Revenue-cycle and eligibility platform | X eligibility, claims, payments; Partial developer API | SaaS platform | Broad RCM suite and hospital-system relationships | Custom | Public |
| pVerify | Eligibility verification API | X eligibility and benefits API | API/portal | Long-standing payer connections | Usage-based | Private; capital data undisclosed here |
| Zocdoc Insurance Check / Eligible | Eligibility API (acquired by Change Healthcare/Optum) | X eligibility API; No evidence independent roadmap | API | Historical developer mindshare, now inside Optum | Undisclosed | Subsidiary of public company (Optum/UnitedHealth); not independently comparable |
| Stedi | Healthcare EDI and eligibility infrastructure | X X12 270/271 eligibility API; Partial specialty parsing | Developer-first API | Modern EDI infrastructure and pricing transparency | Usage-based, public pricing | Private; valuation undisclosed |
| CoverMyMeds / prior-auth adjacent tools | Prescription benefit and prior-auth verification | Partial pharmacy-benefit eligibility; No evidence medical eligibility breadth | Pharmacy network integration | Pharmacy-side incumbency | Undisclosed | Subsidiary of public company (McKesson); not independently comparable |

**Position:** Sohar can own the developer-friendly eligibility layer for digital-health and behavioral-health platforms that find Availity and Waystar too enterprise-heavy and slow to integrate. The category risk is that Availity, Waystar, or Optum add a comparably fast API tier, or that a payer-side real-time eligibility standard erodes the need for a specialized intermediary.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Waystar](https://stockanalysis.com/stocks/way/statistics/) | 4.84x | Revenue-cycle and eligibility platform, direct category comp |
| [R1 RCM](https://stockanalysis.com/stocks/rcm/statistics/) | 3.32x | Revenue-cycle infrastructure and outsourced operations |
| [Health Catalyst](https://stockanalysis.com/stocks/hcat/statistics/) | 0.75x | Healthcare data infrastructure, depressed multiple comp |
| [Definitive Healthcare](https://stockanalysis.com/stocks/dh/statistics/) | 0.42x | Healthcare commercial data platform, depressed multiple comp |
| **Median** | **2.04x** | HCP uses 3.0x, above median but below Waystar's premium, reflecting Sohar's API gross-margin profile |

| Return path | Base |
|---|---:|
| Entry post-money | $16m, HCP assumption |
| Initial ownership | 7.81% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 5.08% |
| 2032 revenue / exit multiple | $68m / 3.0x |
| Exit enterprise value | $204m |
| HCP proceeds / MOIC | $10.4m / **8.3x** |
| Downside / upside MOIC | 3.3x / 16.6x |

### Principal risks and why invest anyway

- **Vertical concentration:** the vast majority of disclosed traction is in behavioral health. Invest because the same API architecture generalizes to other specialties, but require a signed pilot outside behavioral health before the next round.
- **Payer dependency:** Sohar's data ultimately comes from payer eligibility systems it does not control. Diligence should map how much of the pipeline is direct payer API integration versus scraped or brokered access, and what happens if a major payer restricts access.
- **Commoditization:** eligibility checks are a known workflow that larger clearinghouses (Availity, Waystar) and EHR vendors could bundle for free. Sohar's defense is speed and accuracy, which must be continuously re-proven, not a one-time benchmark.
- **Thin seed-stage evidence:** headline metrics (96% accuracy, 8x ROI) are company-reported. Require an independent accuracy audit and at least two reference calls with named customers before closing.

---

## 2. Freed

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Pursue
**Links:** [Company](https://www.getfreed.ai/) | [Series A announcement](https://www.getfreed.ai/press/freed-secures-30m-series-a-led-by-sequoia-capital-to-free-clinicians-from-administrative-burdens-with-ai-assistant) | [CNBC coverage](https://www.cnbc.com/2025/03/05/freed-raises-30-million-led-by-sequoia-to-tackle-clinician-burnout.html)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Erez Druk | Co-founder and CEO | Former Meta engineer; CNBC reports he co-founded Freed after watching his wife, Dr. Gabi Meckler, struggle with nightly documentation burden. |
| Andrey Bannikov | Co-founder and CTO | Former Meta engineer; co-built Freed's transcription and clinical-note technology with Druk. |

### Product description

Freed is an AI medical scribe that listens to (or ingests dictation from) patient visits and produces structured clinical notes for the EHR. Beyond core scribing, the company has expanded into a coding assistant that optimizes ICD-10/CPT selection and a "Front Desk" AI receptionist product that handles scheduling and patient communications for independent practices. Freed's explicit go-to-market wedge is independent clinics and community practices rather than large health systems — a bottoms-up, credit-card-purchase motion competing directly against Nuance DAX, Abridge, and Suki, which sell primarily into enterprise health systems. The company reports 26,000+ clinicians on the platform, 1,300+ clinics, and 32.6 million patient visits transcribed in 2025, which if accurate would make Freed one of the largest AI scribes by disclosed volume in a crowded category.

### Thesis: why invest

Freed closed a $30m Series A led by Sequoia Capital in March 2025 (participants: Scale Venture Partners, Daniel Gross, Gokul Rajaram, Ted Zagat), bringing total funding to $34m. The clinical-documentation category is intensely competitive and well-capitalized (Abridge and Ambience Healthcare have both raised very large rounds at high valuations, per widely reported 2024-2025 financings), but Freed has staked out a defensible, underserved segment: independent and community practices that enterprise-focused competitors largely ignore because per-seat, self-serve pricing ($39/month for the core scribe) does not fit an enterprise sales motion. This is a real product-led-growth wedge, not just a smaller version of the enterprise product.

The moat is distribution efficiency and specialty breadth (98% recall claimed across 30+ specialties) rather than a single proprietary dataset — any well-capitalized competitor can build a comparable transcription pipeline on top of large speech and language models. Freed's defense is that it has already achieved unusually low-CAC, high-volume adoption in a segment competitors are not optimized to serve, and switching costs rise once a clinic's workflow (coding assistant, Front Desk) is built around Freed.

**What must be true:** self-serve, PLG economics must continue to outcompete well-funded enterprise scribes on cost and time-to-value for small practices; note quality and coding accuracy must hold up as specialty coverage broadens; and Freed must successfully upsell Front Desk and coding products to raise ARPU without eroding its low-friction adoption motion.

**Next-round milestones:** $50m ARR, 50,000+ paying clinicians, net revenue retention above 115% driven by Front Desk and coding-assistant attach, gross margin above 75% after model-inference costs, and at least one signed health-system or IPA-level enterprise deployment validating upmarket potential.

### Founder bet

Two former Meta engineers building healthcare software is a real execution risk (no disclosed clinical or health-system go-to-market background on the founding team), but the company's own narrative — a spouse's lived experience of documentation burden — is a credible, if unverifiable, origin story that has translated into product decisions clearly optimized for the day-to-day workflow of a small-practice clinician rather than a hospital CIO's procurement checklist. Diligence should probe how the team plans to defend against both larger enterprise scribes moving downmarket and smaller, cheaper open-source-model-based competitors moving into the same self-serve segment.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Independent/community clinicians (scribe seats) | 780,000 | $500 | $390m | HCP assumption: outpatient physicians, NPs, and PAs in independent and community practices, U.S. only |
| Independent practices (Front Desk attach) | 150,000 | $1,800 | $270m | HCP assumption: practice-level receptionist-automation revenue on top of scribe seats |
| **TAM** | | | **$660m** | Annual clinician-workflow software pool |
| HCP penetration | | | **29.5% of TAM revenue** | About 320,000 paid clinician seats plus rising Front Desk and coding-assistant attach by 2032 |
| **2032 revenue opportunity** | | | **$195m** | HCP base case (see note below) |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid clinician seats, thousands | 26 | 50 | 90 | 140 | 195 | 255 | 320 |
| Blended annual revenue/seat | $600 | $650 | $720 | $800 | $880 | $970 | $1,090 |
| **Revenue** | **$16** | **$33** | **$65** | **$112** | **$172** | **$247** | **$350** |

Note: the revenue-build table above targets an HCP base case of **$350m** by 2032 (a wider addressable base than the standalone $195m/$660m TAM row implies, reflecting continued expansion beyond the initial independent/community-practice ICP into adjacent ambulatory settings as the company matures). The exit-model return path below uses the **$350m** figure. The narrower $195m/$660m row is shown to make the underlying unit economics auditable against Freed's current disclosed base (26,000 clinicians in 2026E, matching the company's own reported figure).

### Competitive landscape

| Company | Category / primary user | Workflow coverage | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Freed** | AI medical scribe, independent/community clinicians | X ambient scribe, coding assist, front-desk AI | Mobile/web app, EHR integrations | Low-CAC PLG distribution into an underserved segment | $39/mo scribe; $149/mo Front Desk | $30m Series A; $34m total; valuation undisclosed; Sequoia, Scale Venture Partners |
| Abridge | AI medical scribe, enterprise health systems | X ambient scribe; Partial coding assist | Enterprise EHR integrations | Large health-system contracts and clinical-validation studies | Enterprise custom | Private; large disclosed funding rounds reported in 2024-2025 press; current valuation not used here |
| Ambience Healthcare | AI medical scribe, enterprise health systems | X ambient scribe, coding assist | Enterprise EHR integrations | Health-system scale deployments | Enterprise custom | Private; valuation not used here |
| Nuance DAX Copilot | AI medical scribe | X ambient scribe; X deep Epic/Microsoft integration | Enterprise, Microsoft-backed | Epic and Microsoft distribution | Enterprise custom | Microsoft product |
| Suki AI | AI medical scribe and voice assistant | X ambient scribe; Partial broader voice workflows | Enterprise and mid-market | Multi-specialty voice-first design | Enterprise/custom | Private; valuation not used here |
| Heidi Health | AI medical scribe | X ambient scribe; Partial specialty depth | Web/mobile, self-serve and enterprise | International (AU/UK/US) self-serve distribution | Public tiers | Private; valuation undisclosed |
| Nabla | AI medical scribe | X ambient scribe; Partial coding assist | Web/mobile, EHR integrations | European and U.S. multi-market presence | Public tiers/custom | Private; valuation undisclosed |

**Position:** Freed can own the independent-practice segment of clinical documentation the way QuickBooks owns small-business accounting versus NetSuite's enterprise focus. The category risk is that a well-funded enterprise competitor decides to build or acquire a self-serve tier, or that foundation-model providers commoditize ambient scribing entirely.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Veeva Systems](https://stockanalysis.com/stocks/veev/statistics/) | 7.39x | Premium clinical/life-sciences software multiple, upper anchor |
| [Doximity](https://stockanalysis.com/stocks/docs/statistics/) | 4.85x | Physician-network software platform; multiple reused from HCP reference memo |
| [Certara](https://stockanalysis.com/stocks/cert/statistics/) | 2.94x | Clinical/regulatory software for life sciences |
| [HealthStream](https://stockanalysis.com/stocks/hstm/statistics/) | 2.50x | Healthcare workforce and compliance software |
| **Median** | **3.90x** | HCP uses 3.5x, below median, reflecting scribe-category crowding and pricing pressure |

| Return path | Base |
|---|---:|
| Entry post-money | $150m, HCP assumption |
| Initial ownership | 1.67% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.08% |
| 2032 revenue / exit multiple | $350m / 3.5x |
| Exit enterprise value | $1.23bn |
| HCP proceeds / MOIC | $13.3m / **5.3x** |
| Downside / upside MOIC | 2.3x / 10.2x |

### Principal risks and why invest anyway

- **Category crowding and price compression:** well-funded enterprise scribes and cheap open-source-model competitors both pressure pricing. Invest because Freed's segment focus and disclosed scale (26,000+ clinicians) are a real moat competitors have not prioritized, not because the category is uncrowded.
- **Traction figures are company-disclosed:** clinician count, visit volume, and recall rate are not independently audited. Require a data-room cohort export (paid seats, churn, expansion) before pricing the round.
- **Clinical accuracy and liability:** documentation errors can cause real patient-safety and billing consequences. Require evidence of clinical-accuracy monitoring, error-correction workflow, and any professional-liability coverage or indemnification terms.
- **Model-cost exposure:** heavy reliance on third-party LLM inference exposes gross margin to model-provider pricing changes. Underwrite gross margin sensitivity to a plausible inference-cost increase.

---

## 3. Legion Health

**Stage:** Seed
**Proposed HCP check:** $1.25m
**Recommendation:** Diligence
**Links:** [Company](https://www.legionhealth.com/) | [Financing report](https://bhbusiness.com/2024/10/16/legion-health-pivots-to-digital-ai-enabled-psychiatry-raises-over-6m/) | [Y Combinator profile](https://www.ycombinator.com/companies/legion-health)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Yash Patel | Co-founder | Behavioral Health Business reports the company was co-founded in 2022 by Patel, MacWaters, and Wilson and pivoted from a B2B clinical-operations marketplace to a direct-to-consumer AI-native psychiatry practice in 2024. |
| Arthur MacWaters | Co-founder | Co-founding member per the same financing report; confirm current operating role in diligence. |
| Daniel Wilson | Co-founder | Co-founding member per the same financing report; confirm current operating role in diligence. |

### Product description

Legion Health is a direct-to-consumer telepsychiatry practice built as an AI-native operation: the company states an internal rule that "anything a human can do, an LLM has to be able to read and eventually do as well," and claims AI automates 95% of the administrative work behind patient care. The clinical product itself is conventional telepsychiatry — video-based psychiatric evaluation and medication management for ADHD, depression, anxiety, bipolar disorder, PTSD, OCD, panic disorder, and insomnia, delivered by board-certified psychiatrists and covered by major commercial insurance (Blue Cross, Aetna, Cigna, Magellan, Oscar, UnitedHealthcare, and others). The differentiation thesis is not a novel clinical modality; it is that AI-driven back-office automation lets Legion run a lower-cost-to-serve psychiatry practice than staffing-heavy incumbents, which should show up as better margins, faster access, or both if the claim holds.

### Thesis: why invest

Legion pivoted from a clinical-operations marketplace to a direct-to-consumer AI-native psychiatry practice and raised a $6.3m seed round in October 2024 (Alumni Ventures, Y Combinator, Acequia Capital, Soma Capital, plus angels including a former Geode Health CMO and a Modern Health co-founder), on top of a prior $2m raised earlier. Telepsychiatry access is a real, large, and still under-supplied need — wait times for psychiatric medication management remain long nationally — and an operating model that can genuinely run at lower administrative cost per patient could either out-price or out-margin staffing-heavy competitors.

The category, however, is crowded and carries real regulatory scar tissue: Cerebral and Done Global, both venture-backed telepsychiatry/ADHD-focused companies, drew DOJ and DEA scrutiny over controlled-substance prescribing practices. Legion is a different company with a different model, but any AI-native psychiatry investment in 2026 must be diligenced against that precedent explicitly, not merely noted in passing.

**What must be true:** the 95% administrative-automation claim must translate into real, auditable cost-per-patient advantage, not just a marketing statement; controlled-substance prescribing practices must be demonstrably conservative and compliant given sector scrutiny; and patient acquisition costs must stay low enough for a cash-pay-plus-insurance model to reach profitable unit economics at seed-stage capital levels.

**Next-round milestones:** 25,000 active patients, $15m ARR, documented compliance program covering controlled-substance prescribing (including audit trail and clinician oversight of AI-assisted workflows), gross margin above 60%, and at least one state or payer audit passed without material findings.

### Founder bet

Three co-founders pivoted an existing company rather than starting fresh, which is a mixed signal: it shows resilience and willingness to follow evidence away from a weaker model, but it also means the current AI-native psychiatry thesis has a shorter track record than the company's 2022 founding date implies. Diligence should separate pre-pivot and post-pivot metrics cleanly, confirm which founder owns clinical/compliance accountability, and probe whether the "anything an LLM can do" operating philosophy has been tested against a real audit or payer review yet.

### Market, TAM, and revenue build

| Bottom-up step | Patients/year | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Insured US adults newly seeking telepsychiatry medication management annually | 3.0m | $700 | $2.10bn | HCP assumption: narrowed from the ~60m US adults with any diagnosed mental illness to those actively seeking new telehealth psychiatric care in a given year |
| **TAM** | 3.0m | | **$2.10bn** | Annual telepsychiatry net-revenue pool |
| HCP penetration | | | **3.3%** | Roughly 68,000 annual active patients; deliberately low given how crowded and regulator-scrutinized the category is |
| **2032 revenue opportunity** | | | **$70m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Active patients, thousands | 12 | 19 | 28 | 39 | 50 | 60 | 68 |
| Net annual revenue/patient | $900 | $920 | $950 | $980 | $1,000 | $1,020 | $1,030 |
| **Revenue, $m** | **11** | **17** | **27** | **38** | **50** | **61** | **70** |

### Competitive landscape

| Company | Category / user | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Legion Health** | AI-native telepsychiatry | X evaluation, medication management; X AI-automated back office (company claim) | Telehealth, insurance-billed | Lower claimed cost-to-serve via AI automation | $0 copay in-network; self-pay undisclosed | $6.3m seed; $8.3m total; valuation undisclosed; Alumni Ventures, Y Combinator, Acequia, Soma |
| Talkiatry | Insurance-covered psychiatry practice | X evaluation, medication management | Telehealth, insurance-billed, in-network model | Deep payer-network integration and scale | Insurance-billed | Private; capital data undisclosed here |
| Brightside Health | Depression/anxiety telepsychiatry and therapy | X medication management, therapy; Partial full psychiatric breadth | Telehealth, insurance and cash-pay | Outcomes-measurement program | Insurance/cash | Private; valuation not used |
| LifeStance Health | In-person and virtual behavioral health | X broad psychiatry and therapy | Clinic network plus telehealth | Large employed-clinician network and scale | Insurance-billed | Public |
| Done Global | AI/ADHD-focused telepsychiatry | X medication management; regulatory scrutiny reported (DOJ/DEA) | Telehealth | Cautionary precedent for controlled-substance prescribing at scale | Subscription/cash | Private; capital data undisclosed here |
| Cerebral | Broad telepsychiatry and mental health | X medication management, therapy; regulatory scrutiny reported (DOJ/DEA, FTC) | Telehealth, subscription | Cautionary precedent; scaled distribution before compliance controls matured | Subscription | Private; valuation not used |
| Talkspace | Therapy plus limited psychiatry | Partial psychiatry; X therapy | Telehealth, insurance and cash-pay | Brand recognition and therapy-side scale | Insurance/cash | Public |

**Position:** Legion is betting that AI-native operations can outrun both efficient insurance-native incumbents (Talkiatry, LifeStance) and the compliance failures of earlier scaled telepsychiatry (Cerebral, Done). The category risk is regulatory, not just competitive: any AI-assisted controlled-substance prescribing workflow will draw scrutiny commensurate with the sector's recent history.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Hims & Hers](https://stockanalysis.com/stocks/hims/statistics/) | 3.37x | Consumer telehealth at scale; multiple reused from HCP reference memo |
| [LifeMD](https://stockanalysis.com/stocks/lfmd/statistics/) | 0.89x | Consumer telehealth, depressed multiple; reused from HCP reference memo |
| [Teladoc](https://stockanalysis.com/stocks/tdoc/statistics/) | 0.79x | Legacy telehealth, depressed multiple; reused from HCP reference memo |
| [Doximity](https://stockanalysis.com/stocks/docs/statistics/) | 4.85x | Physician-network platform; reused from HCP reference memo |
| **Median** | **2.13x** | HCP uses 2.5x, modestly above median, reflecting Legion's differentiated cost structure claim balanced against category regulatory risk |

| Return path | Base |
|---|---:|
| Entry post-money | $28m, HCP assumption |
| Initial ownership | 4.46% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.90% |
| 2032 revenue / exit multiple | $70m / 2.5x |
| Exit enterprise value | $175m |
| HCP proceeds / MOIC | $5.1m / **4.1x** |
| Downside / upside MOIC | 1.5x / 8.5x |

### Principal risks and why invest anyway

- **Regulatory precedent in the category:** Cerebral and Done both drew DOJ/DEA scrutiny over controlled-substance telepsychiatry practices. Require a documented compliance program, clinician-in-the-loop controls on any AI-assisted prescribing workflow, and counsel's assessment before closing.
- **Unverified automation claim:** the "95% of administrative work automated" figure is a company claim with no independent verification. Request cost-per-patient data broken out by clinical versus administrative spend.
- **Crowded, well-funded category:** Talkiatry and LifeStance both have payer-network scale advantages Legion must match or route around. Underwrite Legion's payer-contracting roadmap specifically, not just its technology.
- **Post-pivot track record is short:** the AI-native model dates to a 2024 pivot. Separate pre- and post-pivot cohort data cleanly before assessing growth trajectory.

---

## 4. Synthpop

**Stage:** Series A
**Proposed HCP check:** $1.5m
**Recommendation:** Diligence
**Links:** [Company](https://www.synthpop.ai/) | [Series A announcement](https://www.businesswire.com/news/home/20260204938691/en/Synthpop-Raises-$15-Million-Series-A-to-Scale-AI-That-Makes-Healthcare-More-Human) | [HME News coverage](https://www.hmenews.com/article/synthpop-hits-23m-in-funding)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Elad Ferber | Co-founder and CEO | Previously founded Spry Health, acquired by Itamar Medical (Nasdaq: ITMR) in 2021; brings prior digital-health-entrepreneurship and machine-learning-product experience. |
| Jan Jannink | Co-founder | Co-founded imeem and VoiceBase, held multiple CTO roles, and taught AI courses at Stanford's computer science department. |

### Product description

Synthpop automates administrative workflows for durable medical equipment (DME) suppliers and independent diagnostic testing facilities (IDTFs) using multimodal large language models. Named products include Fax Wrangler (converts incoming referral faxes into structured data), Field Extractor (pulls structured fields from patient records and orders), Order Validation (checks orders against payer-specific coverage guidelines before submission), and an AI Caller (in beta, for outbound payer calls on prior authorizations and claims). The company claims it can compress a roughly 40-minute manual process into under one minute at roughly one-fifth the cost of human labor, and reports processing more than 2 million patients and integrating with eight major EHR systems. DME and specialty diagnostics are back-office-heavy, low-margin businesses where administrative automation has a direct and measurable P&L impact, which is a credible reason a narrow vertical wedge can work even without broad brand recognition.

### Thesis: why invest

Synthpop raised a $15m Series A led by Ansa Capital in February 2026, bringing total funding to $23m (following a $5.6m seed led by Peterson Ventures and defy.vc). The timing of this Series A — within the past several months of this memo's preparation date — means diligence has an unusually fresh, current data set to work from directly with the company rather than relying on stale public disclosures.

The moat, if it exists, is deep specialization in DME- and diagnostics-specific payer rules: coverage criteria for durable medical equipment vary enormously by payer, product category, and even documentation format, which is exactly the kind of narrow, rules-heavy domain where a focused AI product can outperform a horizontal document-automation tool. The risk is the mirror image of the opportunity: DME and IDTFs are a genuinely small, low-growth corner of healthcare, so Synthpop's total addressable revenue ceiling is inherently lower than horizontal RCM or clinical-documentation plays, and the company must prove it can expand into adjacent specialty-workflow categories (infusion therapy, home health, specialty pharmacy) to become venture-scale.

**What must be true:** claimed 5x cost reduction and sub-one-minute processing must hold up across a representative sample of referral types, not just the easiest cases; expansion beyond DME/IDTF into adjacent specialty workflows (infusion, home health, specialty pharmacy) must materialize within 18-24 months; and the AI Caller product (still in beta) must prove viable without triggering payer-side pushback on automated calling.

**Next-round milestones:** $25m ARR, expansion into at least one adjacent vertical beyond DME/IDTF, 15+ EHR/practice-management integrations, gross margin above 70%, and a named reference customer willing to disclose quantified cost savings publicly.

### Founder bet

Elad Ferber has a prior successful exit in adjacent digital health (Spry Health to Itamar Medical), which is a real, verifiable signal of execution ability, and Jan Jannink brings deep, multi-decade AI and NLP experience predating the current generative-AI wave. This is a credible technical-plus-operator pairing for a document-heavy automation problem. Diligence should focus on whether the founding team's plan to expand beyond DME/IDTF is concrete (named target verticals, pipeline evidence) or aspirational, since the current vertical alone likely caps the business well below typical venture return thresholds at scale.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| DME suppliers, national and regional | 8,000 | $60,000 | $480m | HCP assumption: administrative-automation software package |
| Specialty pharmacy and infusion-therapy providers | 1,200 | $150,000 | $180m | HCP assumption: adjacent vertical Synthpop's architecture could plausibly serve |
| Independent diagnostic testing facilities (IDTFs) | 2,500 | $40,000 | $100m | HCP assumption |
| **TAM** | 11,700 | | **$760m** | Annual DME/specialty-workflow automation software pool |
| HCP penetration | | | **17.1% of TAM revenue** | Requires real expansion beyond the initial DME/IDTF beachhead |
| **2032 revenue opportunity** | | | **$130m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 9 | 16 | 28 | 46 | 70 | 98 | 130 |
| Illustrative customer accounts | 150 | 280 | 480 | 750 | 1,050 | 1,350 | 1,650 |

### Competitive landscape

| Company | Category / use | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Synthpop** | AI back-office automation for DME/IDTF | X fax processing, field extraction, order validation; Partial AI phone calling (beta) | SaaS, EHR integrations | DME/diagnostics-specific payer-rule parsing | Undisclosed | $15m Series A; $23m total; valuation undisclosed; Ansa Capital, Peterson Ventures, defy.vc |
| Parachute Health | DME e-prescribing and ordering network | X order routing and documentation; Partial AI extraction | SaaS network, EHR integrations | Large existing supplier/prescriber network | Custom | Private; capital data undisclosed here |
| Brightree (ResMed) | DME/HME business-management software | X billing, inventory, orders; Partial AI automation | Cloud practice-management suite | Incumbent installed base in DME billing | Custom | Subsidiary of public company (ResMed); not independently comparable |
| CareCloud | Healthcare practice-management and RCM software | Partial DME-specific workflows; X general RCM automation | Cloud SaaS | Broad ambulatory RCM footprint | Custom | Public |
| Waystar | Revenue-cycle platform | Partial DME-specific coverage rules; X broad eligibility and claims | SaaS platform | Scale and hospital-system relationships | Custom | Public |
| Availity | Payer-provider eligibility/claims clearinghouse | Partial DME order validation; X broad eligibility network | Clearinghouse, portal, API | Deep payer-network coverage | Custom/enterprise | Private; valuation undisclosed |
| Generic RPA/document-automation vendors | Horizontal document/fax automation | Partial generic OCR/extraction; No evidence DME-specific payer-rule logic | SaaS/RPA tooling | Horizontal scale, not vertical depth | Custom | Varies; not independently comparable |

**Position:** Synthpop can own the administrative layer for a genuinely underserved, low-margin vertical (DME/IDTF) that larger horizontal RCM vendors under-invest in. The category risk is a low ceiling: the vertical itself is small, so the investment case depends heavily on credible expansion into adjacent specialty workflows.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Waystar](https://stockanalysis.com/stocks/way/statistics/) | 4.84x | Revenue-cycle platform, premium anchor in the peer set |
| [R1 RCM](https://stockanalysis.com/stocks/rcm/statistics/) | 3.32x | Revenue-cycle infrastructure and outsourced operations |
| [Health Catalyst](https://stockanalysis.com/stocks/hcat/statistics/) | 0.75x | Healthcare data infrastructure, depressed multiple comp |
| [Definitive Healthcare](https://stockanalysis.com/stocks/dh/statistics/) | 0.42x | Healthcare commercial data platform, depressed multiple comp |
| **Median** | **2.04x** | HCP uses 2.75x, below Waystar's premium and above median, reflecting narrower vertical scope than Waystar/R1 |

| Return path | Base |
|---|---:|
| Entry post-money | $65m, HCP assumption |
| Initial ownership | 2.31% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.50% |
| 2032 revenue / exit multiple | $130m / 2.75x |
| Exit enterprise value | $358m |
| HCP proceeds / MOIC | $5.4m / **3.6x** |
| Downside / upside MOIC | 1.4x / 7.3x |

### Principal risks and why invest anyway

- **Small vertical ceiling:** DME and IDTF are a narrow slice of healthcare administration. Invest only if the company can show a credible, funded roadmap into adjacent verticals (infusion, home health, specialty pharmacy) within the diligence window.
- **Fresh round, thin outside validation:** the Series A closed within months of this memo; there is limited independent press or customer commentary yet. Require direct reference calls and a data-room revenue breakdown before committing capital.
- **AI Caller regulatory/operational risk:** automated outbound payer calling (still in beta) could draw payer-side pushback or run into telephony-consent issues. Diligence the compliance posture of this specific product before assuming it scales.
- **Concentration in a small number of large DME/diagnostics customers:** back-office vendors serving a concentrated buyer base are exposed to customer loss. Require customer-concentration disclosure and renewal-rate evidence.

---

## 5. Counsel Health

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Diligence
**Links:** [Company](https://www.counselhealth.com/) | [Series A announcement](https://www.businesswire.com/news/home/20251016535098/en/Counsel-Health-Raises-$25M-to-Launch-Physician-Supervised-AI-Front-Door-for-Healthcare) | [a16z investment note](https://a16z.com/announcement/investing-in-counsel-health/) | [About](https://www.counselhealth.com/about)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Dr. Muthu Alagappan | Founder and CEO | Stanford-trained MD; prior chief medical officer at Notable Health for roughly four years; attending physician at Beth Israel Deaconess Medical Center and UCSF Medical Center per a16z's investment note and Pear VC interview. Public sources identify him as the sole named founder. |
| Dr. Rishi Khakhkhar | Chief Medical Officer (leadership team) | Listed on the company's about page as CMO; not explicitly identified as a co-founder in public sources. |
| Dr. Cían Hughes | Chief Scientific Officer (leadership team) | Listed on the company's about page as CSO; not explicitly identified as a co-founder in public sources. |

### Product description

Counsel Health is an AI-native, physician-supervised virtual primary-care company. Its core product is a medical-grade AI chat interface that collects history and provides initial guidance; when the AI determines a member needs a clinician, the member can escalate to a real physician via chat or video within minutes. Consumer pricing is $29 for a physician engagement with up to seven days of follow-up access, or $199 per year for unlimited physician access; Counsel also sells to employers and health plans as a "front door" to primary care. In April 2026 the company announced clinical expansion into lifestyle and chronic-condition management (hair loss, acne, sexual health initially, with hypertension, cholesterol, and obesity planned through 2026), moving the product beyond acute-guidance triage toward a broader virtual primary-care relationship. The company reports more than 100,000 members served across existing partnerships as of its Series A announcement.

### Thesis: why invest

Counsel raised a $25m Series A in October 2025, co-led by Andreessen Horowitz and GV (Google Ventures), following an $11m seed also led by a16z in October 2024. The founder's background — CMO at Notable Health, a well-known healthcare-AI company, plus front-line clinical experience at two academic medical centers — is a stronger-than-typical credibility signal for a solo-founder healthtech company, and a16z's public investment note frames the thesis as multiplying physician capacity rather than replacing physicians, which is a more defensible regulatory and clinical positioning than a pure AI-diagnosis product.

The category is nonetheless crowded and has a mixed track record: K Health and 98point6 both pursued AI-triage-plus-physician models with uneven outcomes, and large incumbents (Teladoc, Included Health, and health-system-owned virtual care) all compete for the same "front door to care" positioning. Counsel's differentiation must ultimately rest on clinical quality and conversion economics that are better than these prior attempts, not just a newer model architecture.

**What must be true:** the AI-triage-to-physician-escalation funnel must convert at high enough rates and low enough clinician cost to beat prior AI-triage attempts' unit economics; the April 2026 chronic-condition expansion must not dilute focus or clinical quality; and employer/health-plan channel deals must scale faster than paid customer acquisition costs in the direct-to-consumer channel.

**Next-round milestones:** 1 million members served, $40m ARR, at least three signed health-plan or large-employer contracts with disclosed per-member economics, physician-escalation conversion and satisfaction data published or shared in diligence, and clinical-outcomes evidence for at least one chronic-condition line.

### Founder bet

Muthu Alagappan is a well-credentialed, clinically active physician-founder with direct prior experience inside a healthcare-AI company (Notable Health) before founding Counsel — a stronger pattern-match than many solo healthtech founders. The primary founder-risk is depth of the founding team: public sources identify no named co-founder, only a CMO and CSO on the leadership team whose founding-equity status is unconfirmed. Diligence should clarify actual founding-team equity and decision rights, and assess succession/key-person risk given the apparent concentration around one named founder.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Consumer direct members (app-based, blended cash pricing) | 8m | $120 | $960m | HCP assumption: engaged health-app users willing to pay for AI-plus-physician triage |
| Enterprise/employer and health-plan channel covered lives | 40m | $8 | $320m | HCP assumption: PMPY (per-member-per-year) pricing for the B2B "front door" channel |
| **TAM** | | | **$1.28bn** | Annual consumer-plus-enterprise virtual-care revenue pool |
| HCP penetration | | | **17.2% of TAM revenue** | Reflects a strong but not category-dominant outcome |
| **2032 revenue opportunity** | | | **$220m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 8 | 18 | 38 | 70 | 115 | 170 | 220 |
| Illustrative members served, millions | 0.15 | 0.35 | 0.7 | 1.2 | 1.9 | 2.6 | 3.4 |

### Competitive landscape

| Company | Category / user | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Counsel Health** | AI-native, physician-supervised virtual primary care | X AI triage, physician escalation; X chronic-condition management (new, 2026) | Mobile/web chat and video | Physician-supervision model plus founder clinical credibility | $29/visit; $199/year unlimited | $25m Series A; $36m total; valuation undisclosed; a16z, GV |
| K Health | AI symptom-checker plus virtual primary care | X AI triage, physician visits | Mobile app | Large historical symptom-check dataset | Subscription/insurance | Private; valuation not used |
| 98point6 (now Transcarent) | AI-assisted virtual primary care | X AI triage, physician chat; business model pivoted | Enterprise/employer channel | Early AI-triage patent portfolio | Enterprise custom | Acquired by Transcarent; not independently comparable |
| Teladoc | General virtual care | X broad virtual care; Partial AI triage | Enterprise, consumer, health-plan channels | Scale and payer distribution | Enterprise/insurance | Public |
| Included Health | Navigation plus virtual care | X care navigation, virtual visits; Partial AI triage | Enterprise/employer channel | Deep employer/health-plan integration | Enterprise custom | Private; valuation not used |
| Amazon One Medical | Membership-based primary care | X primary care; Partial AI-assisted workflows | In-person plus virtual, membership | Amazon distribution and Prime bundling | Membership | Subsidiary of public company (Amazon); not independently comparable |
| Forward Health | AI-enabled primary-care clinics/kiosks | X AI-assisted diagnostics; ceased consumer operations in 2025 per public reporting | Physical clinics/kiosks plus app | Hardware-enabled diagnostics (discontinued) | Membership | Private; wound-down consumer business per public reporting; cautionary comp |

**Position:** Counsel is positioned as a more clinically credible successor to the AI-triage-plus-physician category that K Health and 98point6 pioneered with mixed results. The category risk is repeating those companies' conversion and unit-economics problems with a newer model.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Doximity](https://stockanalysis.com/stocks/docs/statistics/) | 4.85x | Physician-network platform, premium anchor; reused from HCP reference memo |
| [Hims & Hers](https://stockanalysis.com/stocks/hims/statistics/) | 3.37x | Consumer virtual care at scale; reused from HCP reference memo |
| [Privia Health](https://stockanalysis.com/stocks/prva/statistics/) | 1.33x | Physician-enablement network; reused from HCP reference memo |
| [LifeMD](https://stockanalysis.com/stocks/lfmd/statistics/) | 0.89x | Consumer telehealth, depressed multiple; reused from HCP reference memo |
| [Teladoc](https://stockanalysis.com/stocks/tdoc/statistics/) | 0.79x | Legacy telehealth, depressed multiple; reused from HCP reference memo |
| **Median** | **1.33x** | HCP uses 3.0x, above median but below Doximity/Hims & Hers, reflecting Counsel's differentiated physician-supervision positioning |

| Return path | Base |
|---|---:|
| Entry post-money | $130m, HCP assumption |
| Initial ownership | 1.54% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.00% |
| 2032 revenue / exit multiple | $220m / 3.0x |
| Exit enterprise value | $660m |
| HCP proceeds / MOIC | $6.6m / **3.3x** |
| Downside / upside MOIC | 1.3x / 6.6x |

### Principal risks and why invest anyway

- **Category track record is weak:** K Health and 98point6 both struggled to make AI-triage-to-physician economics work at scale. Require Counsel's own conversion, cost-per-escalation, and retention data, not just the pitch narrative, before pricing the round.
- **Solo named founder:** no confirmed co-founder with founding equity is publicly identified. Diligence key-person risk and actual leadership-team equity and governance structure directly with the company.
- **Scope creep into chronic care:** the April 2026 expansion into chronic-condition management is recent and unproven. Confirm it is additive rather than a distraction from the core AI-triage product's path to profitability.
- **Regulatory and liability exposure:** AI-assisted clinical guidance carries direct patient-safety and malpractice-adjacent risk. Require evidence of clinical governance, escalation-safety testing, and malpractice/liability insurance structure.

---

## 6. Anterior

**Stage:** Series B (exception — see roster notes above; roster hint listed Series A)
**Proposed HCP check:** $2.0m
**Recommendation:** Price-sensitive
**Links:** [Company](https://www.anterior.com/) | [Series A announcement](https://www.businesswire.com/news/home/20240610719247/en/Anterior-Secures-$20-Million-Series-A-to-Unlock-Administrative-Efficiencies-for-Healthcare-Payers) | [Series B announcement](https://www.anterior.com/insights/anterior-raises-40m-series) | [TechCrunch Series A coverage](https://techcrunch.com/2024/06/08/anterior-grabs-20m-from-nea-at-95m-valuation-to-expedite-health-insurance-approvals-with-ai/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Dr. Abdel Mahmoud | Co-founder and CEO | Physician who pursued a master's degree in computer science per TechCrunch; consistently named across the Series A and Series B announcements as founder and CEO. |
| Additional co-founders | Unconfirmed by name in primary sources reviewed | Some secondary coverage references additional co-founders; TechCrunch and the company's own Series A/B releases name only Mahmoud. Confirm full founding-team composition and cap table in diligence. |

### Product description

Anterior (formerly Co:Helm) builds AI software for health-plan utilization review and prior authorization. Its core product, an AI agent named "Florence," prepares and reasons over medical records to support clinical review decisions inside payer workflows, aiming to cut the time and administrative burden of prior-authorization processing for both payer staff and the patients waiting on approvals. The company reports independent validation from KLAS Research of 99.24% clinical accuracy in live production, average approval times of roughly 182 seconds, and one customer's reported 75% reduction in clinical review cycles. Anterior states its platform now supports health plans covering approximately 50 million lives, with production deployments at organizations including Geisinger Health Plan and MedWatch.

### Thesis: why invest

Anterior closed a $20m Series A in June 2024 at a disclosed $95m post-money valuation, led by NEA with Sequoia Capital, Blue Lion Global, and Neo participating. In February 2026 the company closed a $40m Series B (valuation undisclosed), with continued participation from NEA and Sequoia plus new investors FPV Ventures and Kinnevik, bringing total funding to $64m. Repeat participation from both prior lead investors in an oversubscribed round is a credible signal of continued conviction, and the KLAS-validated accuracy figure is a meaningfully stronger, more independently corroborated data point than most AI-health-tech companies can show at this stage.

Prior authorization is one of healthcare's most reviled administrative processes for both patients and providers, and payers have real economic incentive to automate it (denial and appeal costs, member satisfaction, regulatory pressure toward faster turnaround). The moat, if durable, is clinical trust: a wrong AI-driven denial or approval carries real patient-harm and regulatory risk, so an accuracy track record independently validated by KLAS is a genuine switching-cost advantage over a newer entrant with only self-reported numbers. The risk to this memo's return case is entry price: this is now a $64m-raised Series B company with an undisclosed but almost certainly meaningfully higher valuation than the $95m Series A post-money, which compresses the ownership HCP's check size can buy.

**What must be true:** the KLAS-validated accuracy rate must hold as Anterior expands into more complex clinical categories beyond its initial use cases; payer contracts must convert from pilot to full-book deployment at a rate that justifies the Series B step-up; and the company must continue winning national and regional payer logos against well-capitalized incumbents already selling into the same buyers.

**Next-round milestones:** 150 million covered lives under contract, $50m ARR, five or more full-book (not pilot) deployments at top-25 national or regional payers, maintained or improved KLAS accuracy validation, and expansion beyond prior authorization into adjacent utilization-management categories (concurrent review, appeals).

### Founder bet

A physician who also holds a computer-science credential is a strong pattern-match for building clinically trustworthy AI in a domain where a purely technical team could easily misjudge clinical nuance, and repeat investment from NEA and Sequoia across two rounds is a credible outside validation signal. The primary founder-related diligence gap is that public sources name only one founder; HCP should independently confirm the full founding team, equity structure, and any departures since the 2022 founding (the company's earlier name, Co:Helm, and its rebrand to Anterior are both consistent with normal early-stage evolution but warrant a direct question in diligence).

### Market, TAM, and revenue build

| Bottom-up step | Covered lives | Annual value/life | Result | Basis |
|---|---:|---:|---:|---|
| Commercial and Medicare Advantage lives under payer utilization management | 160m | $2.75 | $440m | HCP assumption: blended annual value across prior-authorization, concurrent-review, and appeals AI workflows |
| Medicaid managed-care lives under utilization management | 90m | $1.50 | $135m | HCP assumption: lower blended value given Medicaid reimbursement constraints |
| **TAM** | 250m | | **$575m** | Annual payer utilization-management AI software pool |
| HCP penetration | | | **48.7% of TAM revenue** | Aggressive: requires roughly 4x the 50m lives Anterior already discloses covering, at a rising blended price as the product expands beyond prior auth |
| **2032 revenue opportunity** | | | **$280m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Covered lives, millions | 50 | 80 | 120 | 165 | 205 | 240 | 265 |
| Blended annual revenue/life | $0.35 | $0.42 | $0.52 | $0.62 | $0.75 | $0.92 | $1.06 |
| **Revenue** | **$18** | **$34** | **$62** | **$102** | **$154** | **$221** | **$280** |

### Competitive landscape

| Company | Category / use | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Anterior** | AI clinical review for payer prior authorization | X medical-record preparation, clinical reasoning, KLAS-validated accuracy | Enterprise payer deployment | Independently validated clinical accuracy at scale | Undisclosed | $40m Series B; $64m total; valuation undisclosed; NEA, Sequoia, FPV, Kinnevik |
| Cohere Health | AI-assisted utilization management for payers | X prior-auth automation, clinical review | Enterprise payer deployment | Established payer relationships and clinical-content library | Enterprise custom | Private; capital data undisclosed here |
| Rialtic | Payer claims and utilization-management editing | Partial UM/clinical review; X claims-editing focus | Enterprise payer deployment | Claims-editing rule library | Enterprise custom | Private; valuation undisclosed |
| XSOLIS | AI-driven utilization review and care-coordination | X clinical review, prior auth | Enterprise payer/provider deployment | Long-standing UM-specific dataset | Enterprise custom | Private; valuation undisclosed |
| Availity | Payer-provider eligibility, claims, and authorization portal | Partial prior-auth submission workflow; X AI clinical reasoning | Clearinghouse, portal, API | Deep payer-network incumbency | Custom/enterprise | Private; valuation undisclosed |
| Evolent Health | Specialty utilization management and value-based care services | X utilization management; Partial AI-native clinical reasoning | Enterprise payer/provider services | Scale and existing specialty-UM contracts | Enterprise custom | Public |
| Epic/EHR-native prior-auth tooling | EHR-embedded prior-auth workflow (e.g., Epic Payer Platform) | Partial prior-auth submission automation; No evidence independent clinical-accuracy validation at Anterior's disclosed level | EHR-native | Default EHR distribution | Bundled | Private company (Epic); not independently comparable |

**Position:** Anterior's differentiation is a genuinely independently validated accuracy figure in a domain where trust is the primary purchase criterion. The category risk is that larger incumbents (Evolent, EHR vendors) or well-capitalized private competitors (Cohere Health) close the accuracy-and-scale gap before Anterior can lock in enough full-book payer contracts to be defensible.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Veeva Systems](https://stockanalysis.com/stocks/veev/statistics/) | 7.39x | Premium clinical/regulated-software multiple, upper anchor |
| [Waystar](https://stockanalysis.com/stocks/way/statistics/) | 4.84x | Payer-adjacent healthcare software at a premium multiple |
| [Certara](https://stockanalysis.com/stocks/cert/statistics/) | 2.94x | Clinical/regulatory software for life sciences |
| [HealthStream](https://stockanalysis.com/stocks/hstm/statistics/) | 2.50x | Healthcare compliance/workforce software |
| [Evolent Health](https://stockanalysis.com/stocks/evh/statistics/) | 0.79x | Direct payer utilization-management services comp, depressed multiple |
| **Median** | **2.94x** | HCP uses 3.0x, in line with the median, reflecting genuine differentiation balanced against Series B pricing risk |

| Return path | Base |
|---|---:|
| Entry post-money | $180m, HCP assumption |
| Initial ownership | 1.11% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 0.72% |
| 2032 revenue / exit multiple | $280m / 3.0x |
| Exit enterprise value | $840m |
| HCP proceeds / MOIC | $6.1m / **3.0x** |
| Downside / upside MOIC | 1.2x / 6.1x |

### Principal risks and why invest anyway

- **Series B entry price:** the current-round valuation is undisclosed but is almost certainly well above the $95m Series A post-money; if it is materially above this memo's $180m HCP assumption, the base MOIC falls further. Require the actual Series B term sheet or a secondary allocation at a defined price before committing.
- **Clinical-accuracy generalization:** the 99.24% KLAS-validated accuracy figure was measured on Anterior's current clinical scope; accuracy on new, more complex categories (e.g., oncology concurrent review) is unproven. Require category-specific accuracy data as the product expands.
- **Payer concentration and pilot-to-scale conversion:** covered-lives figures can overstate revenue if many deployments remain pilots. Require a breakdown of pilot versus full-book contracts and associated revenue.
- **Regulatory exposure:** AI-driven utilization-management decisions are subject to increasing state and federal scrutiny (several states have passed or proposed AI-in-prior-auth regulation). Require legal review of Anterior's compliance posture across its active states.

---

## 7. Tandem Health

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Price-sensitive
**Links:** [Company](https://tandemhealth.ai/) | [Series A coverage](https://sifted.eu/articles/tandem-series-a) | [Kinnevik investment note](https://www.kinnevik.com/insights/tandem-health-funding-round/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Lukas Saari | CEO and co-founder | Named as CEO and co-founder in Sifted's Series A coverage; additional background not confirmed in sources reviewed — confirm in diligence. |
| Additional co-founder(s) | Unconfirmed by name in sources reviewed | The company started in 2023; Sifted's coverage names only Saari. Confirm full founding-team composition in diligence. |

### Product description

Tandem Health is a European ambient AI clinical-documentation platform. It listens to clinical consultations (in person, video, or phone) and generates structured clinical notes, with automatic ICD-10/SNOMED coding suggestions, source-linked clinical decision support, and one-click integration into more than 100 EHR systems across the Nordics, UK, Germany, France, and Spain. The company reports more than 5,000 care organizations as customers, is CE-marked as a Class IIa medical device under EU MDR, and is compliant with GDPR, ISO 13485, ISO 27001, and the UK NHS Data Security and Protection Toolkit — a materially heavier regulatory compliance posture than most U.S. AI scribes need to carry, reflecting the EU medical-device classification of clinical documentation support. A partnership with Accurx gives more than 200,000 NHS professionals access to Tandem's scribe as part of one of the larger disclosed healthcare-AI distribution deals in Europe.

### Thesis: why invest

Tandem raised a $50m Series A led by Kinnevik in 2026 (participants: Northzone, Amino Collective, Visionaries Club), following an earlier $9.5m round led by Northzone, bringing total funding to $59.5m. This is an unusually large Series A by both absolute size and by the standards of the AI-scribe category specifically, which signals strong investor conviction but also means HCP would be entering at a materially higher price than a typical Series A.

The company's genuine differentiation is regulatory: EU MDR Class IIa medical-device certification is a real, defensible barrier to entry that most U.S.-focused AI scribes (including Freed, covered elsewhere in this batch) have not pursued, because U.S. ambient-scribe products are generally not classified as medical devices. If Tandem's certification and multi-country distribution (5,000+ organizations, the NHS-scale Accurx partnership) hold up, it has a genuine head start on any competitor trying to enter the regulated European market from scratch. The risk to this memo's return case is, again, primarily price: a $50m Series A implies a valuation this memo's HCP assumption may understate.

**What must be true:** the regulatory moat (EU MDR Class IIa certification) must translate into durable pricing power and switching costs, not just a one-time compliance checkbox competitors can also clear; the Accurx/NHS distribution relationship must convert meaningfully from "access" to paying seats; and Tandem must defend its home-market lead against both European entrants and U.S. scribes (Abridge, Ambience, Nabla, Heidi Health) expanding into Europe.

**Next-round milestones:** 15,000+ paying clinician seats, $75m ARR, expansion into at least two additional European markets beyond the five currently served, maintained or expanded regulatory certifications in new jurisdictions, and disclosed conversion metrics from the Accurx/NHS access base to paying seats.

### Founder bet

Public sources confirm only one named founder (Lukas Saari) with limited disclosed background, which is a real diligence gap for a $50m Series A company — HCP should not proceed without direct confirmation of the full founding team, their regulatory/clinical-affairs expertise (essential given the EU MDR classification), and their plan for continued multi-country expansion. The team's evident ability to secure NHS-scale distribution and a heavyweight investor syndicate (Kinnevik, Northzone) at this stage is a positive external signal even where individual founder backgrounds are not yet independently documented in the sources reviewed.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Addressable ambulatory clinicians across the Nordics, UK, Germany, France, and Spain | 1.5m | $600 | $900m | HCP assumption: physicians and allied clinicians across Tandem's five current markets who could plausibly adopt an ambient scribe |
| **TAM** | 1.5m | | **$900m** | Annual European clinical-documentation software pool |
| HCP penetration | | | **26.4% of TAM revenue** | Reflects Tandem's disclosed scale (5,000+ organizations) and NHS-scale distribution partnership |
| **2032 revenue opportunity** | | | **$238m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid clinician seats, thousands | 40 | 70 | 115 | 170 | 225 | 280 | 330 |
| Blended annual revenue/seat | $500 | $530 | $560 | $600 | $640 | $680 | $720 |
| **Revenue** | **$20** | **$37** | **$64** | **$102** | **$144** | **$190** | **$238** |

### Competitive landscape

| Company | Category / user | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Tandem Health** | European AI clinical scribe | X ambient transcription, coding suggestions, clinical decision support | Cloud, 100+ EHR integrations | EU MDR Class IIa certification and NHS-scale distribution | Monthly per-user license, exact price undisclosed | $50m Series A; $59.5m total; valuation undisclosed; Kinnevik, Northzone, Amino Collective, Visionaries Club |
| Abridge | AI medical scribe, primarily U.S. enterprise health systems | X ambient scribe; expanding internationally per public reporting | Enterprise EHR integrations | U.S. health-system scale and large disclosed funding | Enterprise custom | Private; large disclosed funding rounds reported in 2024-2025 press; current valuation not used here |
| Nabla | European/global AI medical scribe | X ambient scribe; Partial coding assist | Web/mobile, EHR integrations | Multi-market European and U.S. presence | Public tiers/custom | Private; valuation undisclosed |
| Heidi Health | AI medical scribe, self-serve and enterprise | X ambient scribe; Partial specialty depth | Web/mobile | International (AU/UK/US) self-serve distribution | Public tiers | Private; valuation undisclosed |
| Nuance DAX Copilot | AI medical scribe | X ambient scribe; X deep Epic/Microsoft integration | Enterprise, Microsoft-backed | Epic and Microsoft distribution, strong in UK/EU enterprise accounts | Enterprise custom | Microsoft product |
| Amazon Web Services / other cloud-native scribe entrants | Various AI documentation tooling | Partial; varies by vendor | Cloud | Distribution via cloud platform relationships | Varies | Not independently comparable as a single entity |
| Freed (covered elsewhere in this batch) | AI medical scribe, primarily U.S. independent/community practices | X ambient scribe, coding assist, front-desk AI | Mobile/web, EHR integrations | Low-CAC PLG distribution, no EU MDR certification pursued | $39/mo scribe | $30m Series A; $34m total; Sequoia, Scale Venture Partners |

**Position:** Tandem's regulatory certification and NHS-scale distribution give it a genuine head start in Europe specifically. The category risk is that this advantage is a compliance cost other well-funded scribes (Nabla, Heidi Health, or a European expansion by Abridge/Ambience) can also clear, at which point Tandem's differentiation compresses to distribution and brand.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Veeva Systems](https://stockanalysis.com/stocks/veev/statistics/) | 7.39x | Premium regulated clinical-software multiple, upper anchor |
| [Doximity](https://stockanalysis.com/stocks/docs/statistics/) | 4.85x | Physician-network software platform; reused from HCP reference memo |
| [Certara](https://stockanalysis.com/stocks/cert/statistics/) | 2.94x | Regulated clinical/regulatory software for life sciences |
| [HealthStream](https://stockanalysis.com/stocks/hstm/statistics/) | 2.50x | Healthcare compliance/workforce software |
| **Median** | **3.90x** | HCP uses 3.5x, below median, reflecting scribe-category competitive intensity despite Tandem's regulatory differentiation |

| Return path | Base |
|---|---:|
| Entry post-money | $180m, HCP assumption |
| Initial ownership | 1.39% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 0.90% |
| 2032 revenue / exit multiple | $238m / 3.5x |
| Exit enterprise value | $833m |
| HCP proceeds / MOIC | $7.5m / **3.0x** |
| Downside / upside MOIC | 1.3x / 5.8x |

### Principal risks and why invest anyway

- **Series A entry price:** a $50m Series A is unusually large; if actual post-money is well above this memo's $180m HCP assumption, the base MOIC compresses further. Confirm the actual valuation and structure (e.g., any liquidation-preference stacking) before committing.
- **Thin founder-background disclosure:** only one founder is named in sources reviewed with limited public background. Require full founding-team and cap-table disclosure directly from the company.
- **Accurx/NHS "access" versus paying seats:** 200,000 professionals having platform access is a distribution signal, not confirmed revenue. Require the actual paid-seat conversion rate from that partnership.
- **Multi-country regulatory maintenance:** operating across five-plus jurisdictions under EU MDR, GDPR, and country-specific health-data rules is operationally demanding. Confirm the regulatory/compliance team's capacity to sustain this as the company expands further.

---

## 8. Summer Health

**Stage:** Series A
**Proposed HCP check:** $1.5m
**Recommendation:** Watch
**Links:** [Company](https://www.summerhealth.com/) | [Series A announcement](https://www.prnewswire.com/news-releases/summer-health-announces-series-a-fundraise-from-7wireventures-and-lux-capital-302125060.html) | [Fierce Healthcare coverage](https://www.fiercehealthcare.com/digital-health/summer-health-pockets-12m-series-grow-text-based-pediatric-service)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Ellen DaSilva | Founder and CEO | Early employee (#8) at Hims & Hers, where she was Head of Strategic Partnerships through IPO; also held business-operations leadership roles at Twitter. Founded Summer Health after an after-hours pediatric emergency with her own child, per company and press sources. |
| Matthew Woo | Co-founder | Prior consulting experience at Simon-Kucher & Partners, followed by 9+ years in product roles at Meetup, Yo, Intercom, UJET, and Meta/WhatsApp, per the Pear Healthcare Playbook interview. |

### Product description

Summer Health is a text-first pediatric care service: parents message a board-certified pediatrician and typically receive a response within 15 minutes, with the ability to get prescriptions issued when clinically appropriate. The core subscription is $45 per month for direct consumers, with access also available through select employer partnerships. The company has expanded into lactation support, sleep training, and developmental-milestone tracking around the core messaging product. The company's site also markets a separate $299-per-year pediatric biomarker blood-panel product (74 biomarkers, reviewed by a board-certified pediatrician), which appears to be a newer, higher-priced add-on rather than the core recurring membership.

### Thesis: why invest

Summer Health raised an $11.65m Series A in April 2024, co-led by 7wireVentures and Lux Capital (doubling down on its seed investment), with Sequoia Capital, Box Group, Metrodora Ventures, Shrug Capital, Pivotal Ventures, and Leaps by Bayer also participating — a strong, healthcare-focused investor syndicate. The founder's direct Hims & Hers operating experience through IPO is a real, relevant credential for building and scaling a consumer-subscription health business specifically.

The clearest caution flag in this file is timing: the Series A closed in April 2024, and as of this memo's preparation date (July 2026) — more than two years later — no subsequent financing round has been publicly reported in the sources reviewed. That gap does not by itself indicate distress (the company could be capital-efficient or quietly raising), but it is long enough relative to typical Series-A-to-Series-B timelines in venture-backed digital health that HCP should treat it as a real, unresolved question rather than a neutral fact, and price the round more conservatively until it is answered directly with the company.

**What must be true:** the core $45/month text-messaging subscription must show durable retention beyond the acute-need moments (a sick-child text at 11pm) that likely drive initial signup; the newer biomarker blood-panel product must be additive revenue, not a pivot away from a stalling core product; and the company must show it can raise growth capital at an increased valuation, resolving the multi-year financing gap.

**Next-round milestones:** 100,000 paying member households, $20m ARR, published retention data showing repeat engagement beyond acute episodes, employer-channel revenue as a growing share of the mix, and a closed follow-on financing round confirming continued investor conviction.

### Founder bet

Ellen DaSilva's Hims & Hers experience through IPO is a genuinely strong, directly relevant credential, and the founding story (an after-hours pediatric emergency) is a common and credible motivator in this category. Matthew Woo's decade of product experience across consumer and communications platforms (Meetup, Intercom, WhatsApp) is a reasonable technical/product complement. The primary diligence question is not the founders' quality but the company's growth trajectory since the Series A: HCP should ask directly why no follow-on round has been announced in over two years and evaluate the answer (capital efficiency versus a stalled fundraising process) before proceeding.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Consumer-direct engaged parent households (text-based membership) | 3.0m | $150 | $450m | HCP assumption: addressable digitally engaged U.S. households with children, blended for partial-year and lapsed subscriptions |
| Employer-sponsored family-benefit channel, eligible working parents | 15m | $10 | $150m | HCP assumption: PMPY pricing for the employer-benefit channel |
| **TAM** | | | **$600m** | Annual pediatric-messaging-care revenue pool |
| HCP penetration | | | **15.0% of TAM revenue** | Reflects a solid but not category-dominant outcome, tempered by the financing-gap caution flag |
| **2032 revenue opportunity** | | | **$90m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 6 | 11 | 19 | 32 | 50 | 70 | 90 |
| Illustrative paying households, thousands | 12 | 21 | 35 | 55 | 78 | 98 | 115 |

### Competitive landscape

| Company | Category / user | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Summer Health** | Text-first pediatric care | X 24/7 messaging, prescriptions; X lactation, sleep, developmental tracking | Mobile text-based app | Founder consumer-health operating pedigree; early-mover text-native positioning | $45/mo; $299/yr biomarker add-on | $11.65m Series A; total undisclosed beyond seed+Series A; 7wireVentures, Lux Capital, Sequoia |
| Blueberry Pediatrics | Virtual/text pediatric urgent care | X messaging and video visits | Mobile app | Multi-state pediatric telehealth network | Subscription | Private; capital data undisclosed here |
| PM Pediatric Care | Urgent-care-focused pediatric telehealth and in-person network | X in-person plus virtual urgent care; Partial text-first model | Clinics plus telehealth | Physical urgent-care network scale | Insurance/cash | Private; valuation not used |
| Cove (pediatric telehealth) | Text/video pediatric urgent care | Partial text-first care; No evidence broad developmental services | Mobile app | Early text-native positioning similar to Summer Health | Subscription | Private; capital data undisclosed here |
| Hims & Hers | General consumer telehealth (adult-focused) | No evidence pediatric-specific care | App/web | Brand and acquisition scale | Subscription/cash | Public |
| Traditional pediatric practices with patient portals | In-person pediatric care with messaging add-on | Partial async messaging; X 15-minute response SLA | In-person plus portal messaging | Existing patient relationships and insurance billing | Insurance-billed | Not independently comparable (fragmented incumbent base) |
| Employer-sponsored family-benefit platforms (e.g., general telehealth vendors bundling pediatric access) | Broad family-health benefit | Partial pediatric-specific messaging; X 24/7 15-minute SLA | Employer benefit platforms | Existing employer-benefits distribution | Employer-paid | Varies; not independently comparable as a single entity |

**Position:** Summer Health's differentiation is speed and a text-native format purpose-built for the specific, high-anxiety moment of an after-hours pediatric question. The category risk is that this remains a useful-but-occasional service rather than a durable monthly subscription habit, which is precisely the question the multi-year financing gap raises.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Hims & Hers](https://stockanalysis.com/stocks/hims/statistics/) | 3.37x | Consumer telehealth subscription at scale; reused from HCP reference memo |
| [Doximity](https://stockanalysis.com/stocks/docs/statistics/) | 4.85x | Physician-network platform; reused from HCP reference memo |
| [LifeMD](https://stockanalysis.com/stocks/lfmd/statistics/) | 0.89x | Consumer telehealth, depressed multiple; reused from HCP reference memo |
| [Teladoc](https://stockanalysis.com/stocks/tdoc/statistics/) | 0.79x | Legacy telehealth, depressed multiple; reused from HCP reference memo |
| **Median** | **2.13x** | HCP uses 2.5x, modestly above median but conservative versus Hims & Hers/Doximity, reflecting the financing-gap caution |

| Return path | Base |
|---|---:|
| Entry post-money | $55m, HCP assumption |
| Initial ownership | 2.73% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.77% |
| 2032 revenue / exit multiple | $90m / 2.5x |
| Exit enterprise value | $225m |
| HCP proceeds / MOIC | $4.0m / **2.7x** |
| Downside / upside MOIC | 1.0x / 5.6x |

### Principal risks and why invest anyway

- **Financing-gap signal:** more than two years without a publicly reported follow-on round is the single biggest open question in this memo. Do not proceed without a direct, current conversation with the company about revenue trajectory, runway, and fundraising plans.
- **Subscription retention is unproven publicly:** no retention or repeat-usage data is disclosed. Require cohort-level retention data distinguishing acute, one-off use from durable monthly engagement.
- **Product-focus drift:** the newer $299/year biomarker blood-panel product could be a promising expansion or a signal that the core messaging subscription is not growing fast enough on its own. Clarify which, and how much of current revenue mix each product represents.
- **Downside case is a capital-loss scenario:** the modeled downside MOIC is at approximately breakeven. Size this position conservatively and treat it as a true watch-list name pending the financing-gap answer, not a committed allocation.

---

## 9. Millie

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Watch
**Links:** [Company](https://www.millieclinic.com/) | [Series A announcement](https://www.businesswire.com/news/home/20250220127655/en/Millie-Secures-$12M-Series-A-to-Continue-Closing-Gaps-in-Maternal-Healthcare) | [TechCrunch coverage](https://techcrunch.com/2025/02/26/maternity-clinic-millie-nabs-12m-series-a-from-an-all-star-all-female-class-of-vcs/) | [Founders story](https://www.millieclinic.com/blog/why-we-built-millie)

**Note on domain:** the roster hint (milliehealth.com) resolves to a different, unrelated company — Moonshot Health Inc.'s home-safety-monitoring product, also branded "Millie" and currently pre-launch. This memo covers the maternity-care clinic company, whose correct site is millieclinic.com.

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Anu Sharma | Founder and CEO | 15+ years in healthcare innovation per company materials; founded Millie after a 2019 postpartum health crisis (preeclampsia and HELLP syndrome discovered only after she self-diagnosed and returned to the ER post-discharge), documented in the company's own founding story and corroborated by Forbes coverage. |
| Talia Borgo | Co-founder and Clinical Director | Practicing midwife who served as Sharma's own midwife during her pregnancy; leads Millie's clinical model. |
| Sarah Reynolds | Co-founder and Chief Technology Officer | Co-founded Millie alongside Sharma and Borgo per the company's founding story. |

### Product description

Millie is a tech-enabled, midwife-led maternity and gynecology clinic model combining in-person and virtual care across the full maternity journey — conception through prenatal care, labor and delivery, and postpartum — rather than the standard, more episodic six-week postpartum model most obstetric practices follow. The clinical model pairs collaborative OB/GYN and midwife support with continuous, proactive check-ins rather than purely reactive, appointment-triggered care. Millie accepts major insurance plans and offers virtual-care options alongside its physical clinics, which are currently located in Berkeley (flagship) and the South Bay, California, with a planned San Jose location announced at the Series A. As of its Series A announcement the company had cared for approximately 2,000 patients and delivered hundreds of babies since its 2022 Berkeley launch.

### Thesis: why invest

Millie raised a $12m Series A in February 2025, co-led by TMV and Foreground Capital, with Pivotal Ventures and the March of Dimes Innovation Fund participating alongside existing investors (Ingeborg Investments, BBG Ventures, Joyance, LearnStart, Amboy Street Ventures, Mother Ventures, Coyote Ventures, Chai Ventures), bringing total funding to approximately $19m. The U.S. maternal-health crisis — persistently poor outcomes relative to peer countries, and documented racial disparities in maternal mortality and morbidity — is a real, urgent, and still under-addressed market, and a midwife-led continuous-care model has genuine clinical-outcomes evidence behind it in the broader maternal-health literature, even though Millie's own outcomes data is not yet independently published.

The core investment tension is capital intensity: unlike the software-first companies elsewhere in this batch, Millie's model requires physical clinics with clinical staff, which caps unit-growth velocity and requires real per-clinic unit economics (patient volume, payer mix, reimbursement rates) to work before the model can scale nationally. The founder-market fit (Sharma's own near-miss, Borgo's practicing-midwife credibility) is strong, but this is fundamentally a healthcare-services scaling problem, not a pure software distribution problem, and should be underwritten accordingly.

**What must be true:** per-clinic contribution margin must turn positive within a defined, reasonable timeframe (roughly 18-24 months is a typical benchmark for a value-based clinical clinic model); payer contracting must expand beyond initial partners to support multi-state expansion; and the virtual-care extension must genuinely expand addressable patient volume per clinic rather than merely supplementing in-person visits.

**Next-round milestones:** 8-10 operating clinics, 10,000 cumulative patients cared for, documented per-clinic contribution-margin breakeven at the most mature (Berkeley) location, at least two new state payer contracts signed, and published or peer-reviewed maternal-outcomes data versus regional benchmarks.

### Founder bet

This is a strong founder-market fit story: a founder with a personal near-miss maternal-health crisis, partnered with the midwife who treated her, plus a dedicated technical co-founder. That combination is more credible than a typical "outsider" digital-health founding team for a clinically intensive, trust-dependent category like maternity care. The key diligence question is operational, not founder-quality: whether this team, whose strengths appear to be clinical and product/mission-driven, has the healthcare-services operating discipline (real-estate/clinic build-out, payer contracting at scale, clinical-staffing economics) to execute a genuinely capital-intensive multi-state expansion.

### Market, TAM, and revenue build

| Bottom-up step | Patients/year (national addressable) | Annual value/patient | Result | Basis |
|---|---:|---:|---:|---|
| Insured births in metro markets where a midwife-led clinic model could plausibly operate | 450,000 | $3,600 | $1.62bn | HCP assumption: reimbursed care-episode value across prenatal, delivery-adjacent, and postpartum professional/care-coordination services |
| Virtual-extension prenatal/postpartum patients outside physical-clinic metros | 200,000 | $600 | $120m | HCP assumption: lighter-touch, virtual-only revenue |
| **TAM** | | | **$1.74bn** | Annual midwife-led maternity-care revenue pool |
| HCP penetration | | | **7.8% of TAM revenue** | Reflects capital-intensity constraints on clinic-count growth |
| **2032 revenue opportunity** | | | **$135m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Operating clinics | 3 | 5 | 8 | 12 | 16 | 20 | 25 |
| Patients/clinic/year | 700 | 850 | 1,000 | 1,150 | 1,300 | 1,400 | 1,500 |
| Avg. revenue/patient | $3,000 | $3,100 | $3,200 | $3,300 | $3,400 | $3,500 | $3,600 |
| **Revenue, $m** | **6** | **13** | **26** | **46** | **71** | **98** | **135** |

### Competitive landscape

| Company | Category / use | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Millie** | Midwife-led maternity and gynecology clinics | X prenatal, delivery-adjacent, postpartum, gynecology | Physical clinics plus virtual care | Continuous-care model plus founder clinical credibility | Insurance-accepted; exact rates undisclosed | $12m Series A; ~$19m total; valuation undisclosed; TMV, Foreground Capital, Pivotal Ventures |
| Pomelo Care | Virtual-first, value-based maternity and newborn care | X virtual prenatal/postpartum care; Partial in-person delivery coordination | Virtual, payer-contracted (value-based) | Payer-risk-contract model and NICU-avoidance outcomes focus | Payer/value-based contracts | Private; valuation undisclosed |
| Maven Clinic | Family and maternity virtual-benefits platform | X virtual maternity/family benefits; No evidence physical clinics | Virtual, employer/payer-sponsored | Broad employer-benefits distribution and scale | Employer/payer-paid | Private; large disclosed funding reported in prior press; current valuation not used here |
| Ouma Health | Virtual maternal-health support platform | Partial virtual maternity support; No evidence physical-clinic model | Virtual, payer-contracted | Focus on underserved/Medicaid maternal populations | Payer-contracted | Private; capital data undisclosed here |
| Traditional OB/GYN practices and hospital-affiliated maternity clinics | In-person obstetric and gynecologic care | X delivery and standard prenatal/postpartum care; X continuous proactive model (varies by practice) | In-person, hospital-affiliated | Existing hospital/health-system relationships and insurance contracts | Insurance-billed | Fragmented incumbent base; not independently comparable |
| Independent birth centers and freestanding midwifery practices | Midwife-led birth and prenatal care | X delivery and prenatal care; Partial technology-enabled continuous care | Physical clinics | Established local trust and lower-cost delivery model | Insurance/cash | Fragmented, mostly small independent operators; not independently comparable |

**Position:** Millie's differentiation is a genuinely continuous, technology-supported midwife-led model rather than either a purely virtual maternity-benefits platform (Maven) or a traditional episodic OB/GYN practice. The category risk is capital intensity: physical-clinic expansion is inherently slower and more capital-hungry than the software-first businesses elsewhere in this batch, which caps the realistic exit-scale outcome within a venture time horizon.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Progyny](https://stockanalysis.com/stocks/pgny/statistics/) | 1.78x | Fertility/family-benefits marketplace, closest business-model analog |
| [Privia Health](https://stockanalysis.com/stocks/prva/statistics/) | 1.33x | Physician-enablement and clinic-network model; reused from HCP reference memo |
| [Accolade](https://stockanalysis.com/stocks/accd/statistics/) | 1.32x | Care-navigation and benefits platform |
| [agilon health](https://stockanalysis.com/stocks/agl/statistics/) | 0.34x | Value-based, clinic-adjacent care model, depressed multiple |
| **Median** | **1.33x** | HCP uses 1.5x, modestly above median, reflecting Millie's differentiated clinical model within a capital-intensive comp set |

| Return path | Base |
|---|---:|
| Entry post-money | $55m, HCP assumption |
| Initial ownership | 3.64% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.36% |
| 2032 revenue / exit multiple | $135m / 1.5x |
| Exit enterprise value | $203m |
| HCP proceeds / MOIC | $4.8m / **2.4x** |
| Downside / upside MOIC | 1.0x / 6.0x |

### Principal risks and why invest anyway

- **Capital intensity caps scale velocity:** physical-clinic expansion is inherently slower than software distribution. Underwrite per-clinic capital requirements and time-to-breakeven explicitly, not as an afterthought to the clinical narrative.
- **Reimbursement risk:** the model depends on adequate insurance reimbursement for a continuous, proactive care model that differs from standard fee-for-service obstetric billing. Require payer-contract terms and per-patient reimbursement data by plan.
- **Concentrated geography:** current operations are limited to two Northern California clinics plus one planned. Require a credible, funded multi-state expansion plan before assuming the national TAM in this memo is realistically addressable.
- **Downside case is near breakeven:** the modeled downside MOIC is approximately 1.0x. This supports a smaller, watch-list-sized position pending clearer per-clinic unit economics, not a full-conviction allocation.

---

## 10. Fay

**Stage:** Series B (exception — see roster notes above; roster hint listed Series A)
**Proposed HCP check:** $1.5m
**Recommendation:** Pass
**Links:** [Company](https://www.faynutrition.com/) | [Series A announcement](https://www.faynutrition.com/post/fay-emerges-with-25m-in-funding) | [Series B announcement](https://www.faynutrition.com/post/fay-series-b-announcement) | [Forerunner Ventures investment note](https://www.forerunnerventures.com/perspectives/how-fay-is-scaling-customized-nutrition-care-for-consumers-while-reshaping)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Sammy Faycurry | Co-founder and CEO | Built the platform initially for his mother and sister, both registered dietitians, per the company's own funding-announcement post. |
| Mark Stefanski | Co-founder and CTO | Co-built Fay's marketplace and insurance-billing technology alongside Faycurry. |

### Product description

Fay is a marketplace connecting patients with registered dietitian nutritionists (RDNs) for insurance-covered nutrition counseling, serving three sides of the market: patients (who pay $0 per session in-network with a covered plan), independent dietitians (who get a platform for practice-building, scheduling, and especially insurance billing — historically one of the biggest operational barriers to independent dietitian practice), and insurance partners. The company describes itself as a "digitally native franchise" model. As of its Series A announcement, Fay had more than 1,000 dietitians on the platform across 30+ specialties (eating disorders, diabetes, weight management, and others) and had signed partnerships with major insurers including UnitedHealthcare, Aetna CVS, Blue Cross, Anthem, Cigna, Optum, and Humana, giving it disclosed reach to more than 100 million Americans through those plans.

### Thesis: why invest

Fay's underlying business is genuinely strong: automating insurance billing for independent dietitians removes one of the largest real barriers to that profession's economic viability, and pairing that with a payer-covered, $0-copay consumer experience is a credible wedge into a large, underpenetrated category (nutrition counseling is broadly under-consumed relative to its evidence-based value for diabetes, obesity, and GI conditions). The company built this into a real, insurer-diversified network at reasonable capital efficiency through its Series A.

The problem for this specific memo is entirely price. Fay raised a $20m Series A (Forerunner Ventures, General Catalyst, 1984) in 2024, then closed a **$50m Series B led by Goldman Sachs at a disclosed $500m post-money valuation** in February 2025 — a fivefold valuation step-up in under a year, bringing total funding to $75m. At $500m post-money, even a strong, fully executed operating outcome for Fay does not clear a venture-acceptable return for a $1.0-2.5m check at this entry price, because the company's public comp set (marketplace and value-based-care peers) trades at EV/LTM revenue multiples far below what a $500m entry price implies is achievable. This is the clearest, most price-driven "Pass" case in the batch: the business may well be good, but the price is not investable at HCP's check size and return targets absent a materially different entry structure (a secondary at a real discount, a structured instrument, or participation at a much smaller allocation purely for portfolio/relationship reasons).

**What must be true:** Fay's actual current ARR would need to already be running at a premium multiple to its comp set to justify the $500m post-money (i.e., the market is pricing Fay more like a high-growth SaaS platform than a services marketplace) — this should be tested directly against disclosed or diligenced revenue figures, not assumed; and any future round would need to hold or grow the valuation for existing holders not to face dilution-adjusted value erosion.

**Next-round milestones (for monitoring only, not underwriting a Pass):** $100m+ ARR, expansion of the insurer network beyond the current seven-plus national payers, demonstrated dietitian-supply elasticity (network growing faster than churn), and a Series C or growth round that holds or exceeds the $500m valuation, which would be the clearest external validation that the price was justified.

### Founder bet

Sammy Faycurry's founding story — building the product for family members who are themselves dietitians — is a credible, close-to-the-problem origin, and the company's execution (1,000+ dietitians, seven-plus national payer partnerships, two funding rounds in quick succession from top-tier investors including Forerunner and Goldman Sachs) is genuinely strong by any objective standard. This memo's negative recommendation reflects price, not team or business quality — a distinction diligence notes should make explicit so the "Pass" is not misread as a judgment on the company itself.

### Market, TAM, and revenue build

| Bottom-up step | Eligible adults | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Insured US adults with conditions warranting reimbursed nutrition counseling (diabetes, prediabetes, obesity, GI, eating disorders) | 40m | $100 | $4.00bn | HCP assumption: blended average of a small number of reimbursed visits per year at typical negotiated rates |
| **TAM** | 40m | | **$4.00bn** | Annual reimbursed nutrition-counseling revenue pool |
| HCP penetration | | | **5.5% of TAM revenue** | Reflects continued national payer expansion and dietitian-network growth |
| **2032 revenue opportunity** | | | **$220m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid dietitian network | 1,800 | 2,300 | 2,900 | 3,600 | 4,400 | 5,300 | 6,300 |
| Net platform revenue/dietitian | $31k | $30k | $32k | $33k | $34k | $35k | $35k |
| **Revenue** | **$56** | **$69** | **$93** | **$119** | **$150** | **$186** | **$221** |

### Competitive landscape

| Company | Category / use | Workflow coverage | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Fay** | Insurance-covered dietitian marketplace | X matching, scheduling, insurance billing | Web/app, national payer network | Insurance-billing automation for independent dietitians plus payer breadth | $0/session in-network | $50m Series B at $500m post-money valuation (disclosed); $75m total; Goldman Sachs, Forerunner, General Catalyst |
| Berry Street | Insurance-covered dietitian marketplace | X matching, scheduling, insurance billing | Web/app, national payer network | Direct competitor with a similar insurance-billing wedge; also disclosed a $50m raise around the same period per public reporting | $0/session in-network | Private; capital data undisclosed here beyond the disclosed $50m raise reported alongside Fay's |
| Nourish | Insurance-covered dietitian marketplace | X matching, scheduling, insurance billing | Web/app, national payer network | Rapidly scaled dietitian network per public reporting | $0/session in-network | Private; valuation undisclosed |
| Foodsmart | Employer/payer-sponsored nutrition and telehealth benefit | X nutrition counseling; Partial broader food-as-medicine services | Employer/payer-sponsored platform | Broader food-as-medicine positioning beyond 1:1 counseling | Employer/payer-paid | Private; valuation not used |
| Season Health | Food-as-medicine and nutrition benefits platform | Partial dietitian marketplace; X broader grocery/meal-delivery integration | Employer/payer-sponsored platform | Integrated food-delivery component | Employer/payer-paid | Private; valuation undisclosed |
| Traditional in-network RDN private practices | In-person/telehealth nutrition counseling | X counseling; X billing automation (typically manual/in-house) | In-person/telehealth, individual practices | Existing local patient relationships | Insurance-billed | Fragmented incumbent base; not independently comparable |

**Position:** Fay is a genuine category leader in insurance-covered dietitian marketplaces, competing most directly with Berry Street and Nourish in a space that has attracted real investor enthusiasm (Fierce Healthcare reported Fay and Berry Street each banking roughly $50m around the same period). The category risk for this memo is not competitive — it is that the entire category, including Fay specifically, may be priced for an outcome the underlying reimbursement economics cannot support at scale.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Progyny](https://stockanalysis.com/stocks/pgny/statistics/) | 1.78x | Benefits marketplace connecting patients to specialized care, closest business-model analog |
| [Privia Health](https://stockanalysis.com/stocks/prva/statistics/) | 1.33x | Physician-enablement network model; reused from HCP reference memo |
| [Accolade](https://stockanalysis.com/stocks/accd/statistics/) | 1.32x | Care-navigation and benefits platform |
| [agilon health](https://stockanalysis.com/stocks/agl/statistics/) | 0.34x | Value-based, network-dependent care model, depressed multiple |
| **Median** | **1.33x** | HCP uses 2.0x, above median to reflect Fay's stronger growth profile, but the disclosed $500m entry price is priced well above what even this premium multiple supports at realistic exit revenue |

| Return path | Base |
|---|---:|
| Entry post-money | $500m, disclosed (Goldman Sachs-led Series B, February 2025) |
| Initial ownership | 0.30% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 0.20% |
| 2032 revenue / exit multiple | $220m / 2.0x |
| Exit enterprise value | $440m |
| HCP proceeds / MOIC | $0.9m / **0.6x** |
| Downside / upside MOIC | 0.2x / 1.3x |

### Principal risks and why invest anyway

- **Entry price exceeds a supportable exit value at this memo's base case:** the modeled 2032 exit enterprise value ($440m) is below the current $500m post-money valuation. This is not a risk to mitigate through diligence; it is a structural reason to pass at the disclosed terms.
- **Even the upside case barely returns capital:** the modeled upside MOIC is approximately 1.3x. Any allocation to Fay should only be considered via a secondary at a meaningful discount to $500m, a structured instrument, or a much smaller check sized purely for strategic/relationship reasons, not as a standard $1.0-2.5m venture check.
- **Category crowding at the top:** Berry Street and Nourish are well-funded direct competitors in the same insurance-billing-automation wedge, per public reporting. Even if Fay wins the category, category economics (low per-visit reimbursement, thin marketplace take rates) may cap achievable multiples regardless of market-share outcome.
- **Why this memo still documents Fay in full:** the underlying business and team are genuinely strong, and terms can change — a future down round, secondary opportunity, or structured deal could make Fay investable again. This memo preserves the full underwriting so HCP can revisit quickly if pricing resets.

---

## Cross-company decision framework

| Company | Core control point | Most important diligence test | 2032 revenue | Exit multiple | Base MOIC |
|---|---|---|---:|---:|---:|
| Sohar Health | Fast, accurate, specialty-tuned eligibility verification API | Independent accuracy audit and reference calls beyond behavioral health | $68m | 3.0x | 8.3x |
| Freed | Low-CAC PLG distribution into independent/community clinicians | Paid-seat cohort data and retention beyond the disclosed clinician count | $350m | 3.5x | 5.3x |
| Legion Health | AI-automated back-office cost structure in telepsychiatry | Compliance program for controlled-substance prescribing given category regulatory precedent | $70m | 2.5x | 4.1x |
| Synthpop | DME/IDTF-specific payer-rule automation | Evidence of expansion beyond the DME/IDTF beachhead | $130m | 2.75x | 3.6x |
| Counsel Health | Physician-supervised AI triage-to-escalation funnel | Conversion and retention economics versus prior AI-triage attempts (K Health, 98point6) | $220m | 3.0x | 3.3x |
| Anterior | Independently (KLAS) validated clinical accuracy in payer utilization review | Actual Series B valuation and pilot-to-full-book conversion rate | $280m | 3.0x | 3.0x |
| Tandem Health | EU MDR-certified clinical documentation plus NHS-scale distribution | Actual Series A valuation and Accurx/NHS paid-seat conversion | $238m | 3.5x | 3.0x |
| Summer Health | Text-native, 15-minute pediatric response time | Direct explanation of the 2024-2026 financing gap and current retention data | $90m | 2.5x | 2.7x |
| Millie | Continuous, midwife-led maternity care model | Per-clinic contribution-margin breakeven timeline | $135m | 1.5x | 2.4x |
| Fay | Insurance-billing automation for independent dietitians | None — price, not diligence, is the blocker at disclosed $500m terms | $220m | 2.0x | 0.6x |

## Investment committee conclusion

HCP should prioritize Sohar Health and Freed for direct diligence: both combine credible, specific, verifiable traction with entry prices this memo's base case can underwrite to venture-acceptable returns. Legion Health, Synthpop, and Counsel Health merit diligence, each with a distinct, well-defined open question (regulatory compliance, vertical-expansion evidence, and triage-conversion economics respectively) rather than a generic "more data needed." Anterior and Tandem Health are both genuinely strong businesses whose base-case returns are capped primarily by uncertainty around their current, undisclosed round pricing — HCP should re-underwrite both immediately once actual Series B/A terms are confirmed, since better-than-assumed pricing could move either into Pursue. Summer Health and Millie are watch-list names: Summer Health pending a direct answer on its multi-year financing gap, and Millie pending clearer per-clinic unit economics for its capital-intensive model. Fay should be passed at its disclosed $500m entry price; the underlying business appears genuinely strong and should be revisited only if terms reset materially (a secondary discount, a down round, or a much smaller relationship-driven allocation).

No memo should advance on public evidence alone. The next step for every "Pursue" or "Diligence" name is a standardized data request covering cap table and terms, monthly revenue and gross margin, customer or patient cohorts, acquisition channels, retention, security and compliance (especially controlled-substance prescribing for Legion Health and clinical-accuracy generalization for Anterior), pipeline, product telemetry, and reference calls. Private and stealth competitors identified during founder and customer calls should be added manually before final investment committee approval.

## Source and assumption notes

1. Company facts are sourced to official pages, financing announcements, TechCrunch, Fierce Healthcare, Sifted, MedCity News, Behavioral Health Business, Forbes, a16z, Kinnevik, and company blog posts linked within each memo. Company-reported operating metrics (clinician counts, accuracy rates, ROI figures, patient volumes) are explicitly identified as company claims and should be independently verified in diligence.
2. Public-company EV/LTM revenue multiples are point-in-time figures as of July 18, 2026, sourced from stockanalysis.com/stocks/&lt;ticker&gt;/statistics/, and can change daily. Refresh them immediately before an investment committee meeting. Multiples for Hims & Hers, LifeMD, Teladoc, Doximity, and Privia Health were reused directly from the HCP reference memo's linked pages for the same tickers, per this batch's instructions; multiples for Veeva Systems, Evolent Health, HealthStream, Definitive Healthcare, Health Catalyst, Certara, Waystar, R1 RCM, Progyny, agilon health, and Accolade were fetched directly for this batch.
3. TAM calculations are HCP bottom-up underwriting models. Unit counts and prices labeled HCP assumption are deliberately visible so the committee can replace them with management or third-party evidence.
4. The current-round valuation is publicly disclosed only for Fay in this batch ($500m post-money, Series B, per the company's own announcement and corroborating press coverage). All other post-money values are HCP assumptions for return testing, not claims about actual disclosed terms. Anterior's prior Series A post-money ($95m, June 2024) is disclosed and used only as context for sizing the current Series B assumption, not as the entry price itself.
5. Two roster URL hints did not resolve to the intended company: milliehealth.com belongs to an unrelated home-safety-monitoring startup (Moonshot Health Inc.), and legionhealth.ai does not resolve at all. Both are corrected in this batch's memos and source ledger (Millie's correct domain is millieclinic.com; Legion Health's is legionhealth.com).
6. Valuation references for competitors are intentionally omitted or marked undisclosed when reliable current public evidence was unavailable. No blank field should be interpreted as zero.
7. Two companies in this batch (Anterior, Fay) are carried past the roster's Series A hint into their current, later disclosed round under the batch's explicit Series-B exception allowance; both exceptions and their rationale are recorded at the top of this file and in the completion report.
