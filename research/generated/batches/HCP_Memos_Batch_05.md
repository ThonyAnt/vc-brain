# HCP Investment Memos, Batch 05: Cybersecurity and Data Infrastructure

**Companies:** Aembit, P0 Security, Nudge Security, Tobiko Data, Turso, Estuary, RunReveal, Twine Security, Edera, Prophet Security

**Prepared:** July 18, 2026
**Scope:** Public-source underwriting only; no Crunchbase or PitchBook account access. Where an aggregator snippet was the only available source for a fact, that is stated explicitly.
**Target initial check:** $1.0 million to $2.5 million
**Important:** Financing terms, ownership, revenue, penetration, dilution, and exit values labeled **HCP assumption** are underwriting inputs, not company disclosures. All dollars are U.S. dollars unless noted.

## Portfolio summary

| Rank | Company | Segment | Round screened | Proposed check | Base MOIC | Recommendation |
|---:|---|---|---|---:|---:|---|
| 1 | RunReveal | Security data platform | Seed | $2.0m | 12.6x | Pursue |
| 2 | Edera | Secure container/AI isolation | Series A | $2.5m | 9.1x | Pursue |
| 3 | Twine Security | AI security employees (IAM) | Seed | $2.0m | 8.5x | Diligence |
| 4 | Estuary | Real-time data pipelines | Series A | $2.5m | 7.9x | Pursue |
| 5 | Nudge Security | SaaS/shadow-IT security | Series A | $2.5m | 7.8x | Pursue |
| 6 | Prophet Security | AI SOC analyst | Series A | $2.5m | 6.4x | Diligence |
| 7 | P0 Security | Cloud access governance | Series A | $2.0m | 5.4x | Diligence |
| 8 | Aembit | Workload identity | Series A | $2.5m | 5.4x | Diligence |
| 9 | Tobiko Data | Data transformation (SQLMesh) | Series A | $2.0m | 4.3x | Price-sensitive |
| 10 | Turso | Edge SQLite platform | Series A | $2.0m | 2.9x | Watch |

### Common model conventions

- Revenue is built from operating units (paid accounts, workloads, or usage), not a top-down market-growth percentage. Forecasts represent an HCP base case and are not management guidance.
- Entry ownership equals check divided by post-money valuation. Exit ownership equals entry ownership multiplied by one minus cumulative dilution.
- Exit enterprise value equals 2032 revenue multiplied by the selected EV/LTM revenue multiple. HCP proceeds equal exit enterprise value multiplied by exit ownership. MOIC equals proceeds divided by check. The model excludes preference effects, taxes, fees, secondary sales, and follow-on reserves.
- Public-comps multiples are snapshots as of July 18, 2026 from the linked StockAnalysis pages. Multiples reused from the reference ten-company memo set (MongoDB, Snowflake, Cloudflare, Datadog, GitLab) carry the same as-of date and source. All other tickers in this batch were fetched fresh from StockAnalysis for this memo set.
- Downside uses 60% of base exit revenue and one turn less on the multiple, with a 1.0x floor. Upside uses 150% of base exit revenue and one turn more. Dilution is held constant at 35%, an HCP assumption consistent with the reference memo set.
- Competitive tables use **X** only where the capability is verified from a public source, **Partial** where the product covers only part of the workflow, **No evidence** where public material does not support the claim, and **Undisclosed** for unavailable commercial or capital data.
- No company in this batch discloses a current post-money valuation publicly. Every entry post-money figure in this batch is an explicit HCP assumption, generally 4.2x to 5.7x the most recently disclosed round size, consistent with the multiple implied by the reference memo set's one disclosed-valuation case (Phia, priced at roughly 5.3x its round size).

---

## 1. RunReveal

**Stage:** Seed
**Proposed HCP check:** $2.0m
**Recommendation:** Pursue
**Links:** [Company](https://runreveal.com/) | [Financing announcement](https://blog.runreveal.com/runreveal-raises-7m-ai-security-platform/) | [Additional coverage](https://www.finsmes.com/2025/08/runreveal-raises-7m-in-seed-funding.html)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Evan Johnson | Co-founder | Named as a co-founder on the company's own funding announcement; specific prior employer not confirmed in available public sources. Confirm background in diligence. |
| Alan Braithwaite | Co-founder | Named as a co-founder on the company's own funding announcement; specific prior employer not confirmed in available public sources. Confirm background in diligence. |

### Product description

RunReveal is a unified security data platform built as a modern alternative to legacy SIEM. The platform combines a security data lake (ingestion, storage, and query across terabytes of security logs), pipelines (routing, filtering, transforming, and enriching logs before storage to control cost), and detections plus AI-assisted investigation (detection-as-code and conversational analysis through chat and a Model Context Protocol server that supports bring-your-own-LLM access to Claude, ChatGPT, Gemini, and other models). The company's own materials list Cloudflare, ClickHouse, Flexport, Harvey, Cursor, Sentry, Temporal, DigitalOcean, AngelList, and Weights & Biases as customers. RunReveal's wedge is architectural: legacy SIEMs charge premium per-gigabyte ingestion prices and still require heavy manual correlation, while RunReveal is built on a modern data-stack cost structure with AI-native investigation from day one.

### Thesis: why invest

RunReveal has raised twice at seed: a $2.5m round in 2024 and a $7m round in mid-2025 led by existing investor Costanoa Ventures, with new participation from Runtime Ventures, Modern Technical Fund, Okta Ventures, and angel investors. Two seed rounds from credible security-focused funds, plus Okta Ventures as a strategic investor, is a meaningful signal that sophisticated identity and security investors see a real wedge here. The named customer list (Cloudflare, ClickHouse, Flexport, Harvey) is unusually strong for a seed-stage security company and suggests genuine technical buyer pull rather than a purely aspirational roadmap.

The moat, if it forms, is the combination of a cost-efficient data architecture with a detection and investigation layer that improves as more security teams contribute detection logic and as the AI investigation assistant is tuned against real incident data. Security data platforms are sticky once log pipelines and detections are wired into a team's workflow, which raises switching costs over time.

**What must be true:** ingestion and storage costs must remain durably lower than legacy SIEM at comparable retention; AI-assisted investigation must reduce real analyst toil, not just summarize logs; the detection-as-code library must keep pace with evolving attacker techniques; and the current logo list must convert into expanding, multi-year contracts rather than one-off pilots.

**Next-round milestones:** $8m to $10m ARR, 75 or more paying security teams, at least ten referenceable logos above $100k ACV, net revenue retention above 120%, and published evidence that AI-assisted investigation measurably cuts mean time to triage.

### Founder bet

The bet is that two security engineering operators can out-execute both legacy SIEM incumbents (Splunk, now part of Cisco) and a growing set of well-funded security-data challengers by shipping a genuinely cheaper, AI-native architecture fast enough to win logo commitments from sophisticated engineering-led buyers before the category consolidates. The credibility signal is the customer list; the risk is that "unified security data platform" is now a crowded positioning claim and RunReveal must prove durable differentiation beyond price.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market security teams | 15,000 | $30,000 | $450m | HCP assumption: teams replacing a legacy SIEM tier |
| Enterprise security teams | 4,000 | $120,000 | $480m | HCP assumption |
| Large enterprise / MSSP | 600 | $500,000 | $300m | HCP assumption |
| **TAM** | 19,600 | | **$1.23bn** | Annual security-data-platform software pool |
| HCP penetration | | | **13.8% of TAM revenue** | Roughly 1,900 blended accounts |
| **2032 revenue opportunity** | | | **$170m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid security teams | 30 | 80 | 190 | 400 | 750 | 1,250 | 1,900 |
| Blended ARR per account | $30k | $38k | $45k | $53k | $62k | $73k | $89k |
| **Revenue** | **$1** | **$3** | **$9** | **$21** | **$47** | **$91** | **$170** |

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **RunReveal** | AI-native security data platform; security engineers | X ingestion/data lake, X pipelines, X detections, X AI investigation | Cloud SaaS, MCP/BYO-LLM | Modern-data-stack cost structure plus AI-native investigation | Undisclosed | $2.5m and $7m seed rounds ($9.5m disclosed total); valuation undisclosed; Costanoa, Runtime Ventures, Okta Ventures |
| Splunk (Cisco) | Legacy SIEM; enterprise SOC | X ingestion, detection, investigation | On-prem/cloud | Decades of installed base and content library | Per-GB/tiered licensing | Public parent (Cisco) |
| Panther | Cloud-native SIEM | X detection-as-code; Partial AI investigation | Cloud SaaS | Security-data-lake-first architecture | Undisclosed | Private; capital data undisclosed here |
| Cribl | Security/observability data routing | X pipelines and routing; Partial native detections | Self-hosted/cloud | Vendor-neutral data routing installed base | Undisclosed | Private; capital data undisclosed here |
| Google SecOps (Chronicle) | Cloud-scale SIEM | X detection, investigation; X ingestion | Cloud (GCP) | Google-scale ingestion and threat intelligence | Bundled/custom | Alphabet product |
| Datadog Security | Observability-native security | Partial detection; X ingestion within Datadog | Cloud SaaS | Cross-sell into existing observability installed base | Usage-based | [Public](https://stockanalysis.com/stocks/ddog/statistics/) |
| Hydrolix | Streaming log/data-lake infra | Partial pipelines; No evidence native detections | Cloud/self-hosted | High-cardinality log storage cost efficiency | Undisclosed | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Datadog](https://stockanalysis.com/stocks/ddog/statistics/) | 24.13x | Usage-based observability and security data platform |
| [Fortinet](https://stockanalysis.com/stocks/ftnt/statistics/) | 16.27x | Broad security platform with detection content |
| [Tenable](https://stockanalysis.com/stocks/tenb/statistics/) | 4.36x | Vulnerability/exposure data platform |
| [Elastic](https://stockanalysis.com/stocks/estc/statistics/) | 3.23x | Search-based SIEM and observability alternative |
| [Rapid7](https://stockanalysis.com/stocks/rpd/statistics/) | 1.29x | Legacy-adjacent SIEM/detection vendor |
| **Median** | **4.36x** | HCP uses 4.0x, near median but reflecting log-management commoditization risk |

| Return path | Base |
|---|---:|
| Entry post-money | $35m, HCP assumption |
| Initial ownership | 5.71% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 3.71% |
| 2032 revenue / exit multiple | $170m / 4.0x |
| Exit enterprise value | $680m |
| HCP proceeds / MOIC | $25.3m / **12.6x** |
| Downside / upside MOIC | 5.7x / 23.7x |

### Principal risks and why invest anyway

- **Category crowding:** "security data platform" now includes Panther, Cribl, Hydrolix, and cloud-native SIEM offerings from Google and Microsoft. Invest because the disclosed customer list (Cloudflare, ClickHouse, Flexport, Harvey) is unusually strong evidence of technical buyer conviction at this stage, and price is attractive given the early entry point.
- **Founder background gaps:** public sources do not confirm the founders' prior employers or track record. Close this gap before wiring funds; a thin public founder record at seed is a real diligence flag even with strong investors and customers.
- **Cost-structure durability:** RunReveal's pitch depends on remaining structurally cheaper than legacy SIEM as data volumes grow. Underwrite gross margin at scale, not just list pricing.
- **AI investigation reliability:** conversational AI analysis over security data can hallucinate or miss context. Require evidence of investigation accuracy and false-negative rates before relying on the AI layer for customer references.

---

## 2. Edera

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Pursue
**Links:** [Company](https://edera.dev/) | [Financing announcement](https://www.prnewswire.com/news-releases/edera-raises-15-million-series-a-to-transform-cloud-and-ai-infrastructure-security-302384242.html) | [Company financing story](https://edera.dev/stories/series-a)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Emily Long | Co-founder and CEO | Previously at Chainguard prior to founding Edera, per company financing materials. |
| Alex Zenla | Co-founder and CTO | Described in company and press coverage as an experienced systems/cybersecurity engineer; specific prior employers not detailed in the sources reviewed. Confirm in diligence. |

### Product description

Edera builds Edera Protect, a hardened runtime that brings virtual-machine-grade isolation to containers without the operational overhead of running full VMs. Instead of relying on shared-kernel Linux namespaces the way standard containers and Kubernetes pods do, Edera uses a Rust-rewritten Type 1 (Xen-derived) hypervisor so each container runs with no shared kernel state, closing the container-escape and lateral-movement risk that namespace isolation leaves open. The company has extended the same approach to AI infrastructure with Edera Protect AI, which automates GPU detection, configuration, and isolation to address vulnerabilities disclosed in NVIDIA's container toolkit. One disclosed customer case reduced infrastructure sprawl by 62%, going from roughly 40,000 servers to about 15,200, by consolidating workloads onto Edera's secure multi-tenancy.

### Thesis: why invest

Edera raised a $5m seed round followed three months later by a $15m Series A in February 2025, led by M12 (Microsoft's venture fund) with participation from Mantis VC, In-Q-Tel, and existing investors Eniac Ventures, 645 Ventures, FPV Ventures, Precursor Ventures, and Rosecliff Ventures. Total disclosed funding is $20m. The combination of a hyperscaler strategic fund (M12) and In-Q-Tel, which invests on behalf of the U.S. intelligence community, is a strong dual signal: commercial cloud relevance plus a credible path into federal and regulated multi-tenant workloads, markets that pay a premium for verified isolation guarantees.

The moat is technical and hard to replicate quickly: rewriting a hypervisor in a memory-safe language while preserving container-native developer ergonomics and Kubernetes compatibility is a multi-year systems engineering effort. As GPU-backed AI infrastructure scales and multi-tenant AI workloads become common, the isolation gap Edera addresses gets more valuable, not less, because the blast radius of a compromised shared GPU host is larger than a compromised web server.

**What must be true:** hypervisor-grade isolation must not meaningfully degrade GPU/container performance at production scale; Kubernetes-ecosystem compatibility must remain seamless as the upstream project evolves; the federal go-to-market must convert In-Q-Tel's backing into actual contract awards; and open-source alternatives (Kata Containers, gVisor) must not close the isolation gap for free.

**Next-round milestones:** $10m to $15m ARR, three or more reference federal or regulated accounts with public case studies, gross margin above 70%, demonstrated GPU workload isolation deployed at a named AI infrastructure customer, and evidence of net-new logo growth beyond the initial commercial design partners.

### Founder bet

The bet is that a security-industry operator (Chainguard alumna) paired with a systems engineer building genuinely new hypervisor infrastructure can win both commercial platform teams and federal buyers who need provably stronger isolation than namespace containers offer. The pairing of product/GTM and deep-systems technical skill mirrors the pattern that built prior infrastructure security winners; the key unknown is sales-cycle length in the federal channel, which tends to be long even with In-Q-Tel's backing.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market platform teams running Kubernetes | 20,000 | $25,000 | $500m | HCP assumption |
| Enterprise multi-tenant / regulated Kubernetes operators | 6,000 | $100,000 | $600m | HCP assumption |
| Federal and large AI-infrastructure (GPU cluster) operators | 800 | $500,000 | $400m | HCP assumption |
| **TAM** | 26,800 | | **$1.50bn** | Annual workload-isolation software pool |
| HCP penetration | | | **12.7% of TAM revenue** | Roughly 1,450 blended accounts |
| **2032 revenue opportunity** | | | **$190m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 25 | 65 | 150 | 320 | 600 | 1,000 | 1,450 |
| Blended ARR per account | $40k | $48k | $57k | $67k | $78k | $92k | $131k |
| **Revenue** | **$1** | **$3** | **$9** | **$21** | **$47** | **$92** | **$190** |

Blended ACV rises through the forecast as the mix shifts toward larger federal and AI-infrastructure (GPU cluster) deployments, an HCP assumption.

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Edera** | Hypervisor-grade container/AI isolation; platform and MLOps teams | X container isolation, X GPU/AI workload isolation, X multi-tenancy | Kubernetes-native runtime | Rust-rewritten Type 1 hypervisor with no shared kernel state | Undisclosed | $15m Series A; $20m total; valuation undisclosed; M12, In-Q-Tel, Mantis VC |
| Kata Containers | Open-source lightweight VM isolation | X VM-based isolation; Partial AI/GPU-specific tooling | Self-managed OSS | OpenInfra Foundation project maturity | Open source | Open-source project; no commercial capital status |
| gVisor | Open-source sandboxed container runtime | X user-space kernel isolation; No evidence GPU-specific automation | Self-managed OSS | Google-maintained, widely deployed | Open source | Google open-source project |
| AWS Firecracker | Open-source microVM runtime | X microVM isolation; No evidence Kubernetes-native product | Self-managed OSS | Powers AWS Lambda/Fargate at hyperscale | Open source | Amazon open-source project |
| Chainguard | Secure container images and supply chain | Partial adjacent (image hardening, not runtime isolation) | Cloud/registry | Minimal/hardened base-image catalog and distribution | Subscription | Private; capital data undisclosed here |
| Palo Alto Networks (Prisma Cloud) | Cloud-native security platform | Partial container/workload posture; No evidence hypervisor-grade isolation | Cloud SaaS | Platform breadth and installed base | Custom | [Public](https://stockanalysis.com/stocks/panw/statistics/) |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Cloudflare](https://stockanalysis.com/stocks/net/statistics/) | 42.05x | Developer/infrastructure security at premium growth |
| [Palo Alto Networks](https://stockanalysis.com/stocks/panw/statistics/) | 27.47x | Cloud-native and workload security platform |
| [Fortinet](https://stockanalysis.com/stocks/ftnt/statistics/) | 16.27x | Infrastructure security incumbent |
| [Zscaler](https://stockanalysis.com/stocks/zs/statistics/) | 7.11x | Zero-trust infrastructure security |
| [SentinelOne](https://stockanalysis.com/stocks/s/statistics/) | 5.77x | Endpoint/workload security challenger |
| **Median** | **16.27x** | HCP uses 5.5x, a roughly 66% discount reflecting Edera's early stage versus these platform-scale comps |

| Return path | Base |
|---|---:|
| Entry post-money | $75m, HCP assumption |
| Initial ownership | 3.33% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.17% |
| 2032 revenue / exit multiple | $190m / 5.5x |
| Exit enterprise value | $1.05bn |
| HCP proceeds / MOIC | $22.6m / **9.1x** |
| Downside / upside MOIC | 4.4x / 16.1x |

### Principal risks and why invest anyway

- **Free open-source substitutes:** Kata Containers, gVisor, and Firecracker are free and Foundation- or hyperscaler-maintained. Invest because Edera's pitch is a managed, Kubernetes-native product with automated GPU isolation, not raw hypervisor tooling; validate this convenience gap holds up against a determined internal-platform team.
- **Federal sales-cycle length:** In-Q-Tel backing does not guarantee near-term contracts. Model a longer, lumpier federal revenue ramp and do not treat the strategic investment itself as revenue evidence.
- **Performance overhead:** any perceptible latency or throughput penalty versus standard containers will slow adoption on performance-sensitive AI workloads. Require independent benchmark data before committing.
- **Talent and execution risk:** hypervisor engineering is a small, specialized talent pool. Confirm engineering team depth and key-person risk beyond the two founders.

---

## 3. Twine Security

**Stage:** Seed
**Proposed HCP check:** $2.0m
**Recommendation:** Diligence
**Links:** [Company](https://twinesecurity.com/) | [Financing announcement](https://siliconangle.com/2024/11/20/ai-meets-cybersecurity-twine-launches-12m-funding-digital-cyber-employees/) | [Additional coverage](https://www.calcalistech.com/ctechnews/article/hy9k4eofkg)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Benny Porat, Omri Green, Justin Woody, Nadav Erez | Co-founders | CTech (Calcalist) reports all four were senior managers at Claroty, a cyber unicorn, before founding Twine in 2024. Public sources reviewed did not confirm which individual holds CEO/CTO titles; confirm exact roles in diligence. |

### Product description

Twine Security builds AI "digital employees" that perform recurring cybersecurity operations tasks, starting with identity and access management. Its first product, Alex, detects identity and access issues, analyzes the underlying risk and data, plans a remediation approach, and executes remediation. Disclosed use cases include user access reviews, stale-account cleanup, entitlement optimization, identity lifecycle management, least-privilege enforcement, account-ownership verification, and MFA enforcement for SaaS applications. The company's own site reports a 41% reduction in ticket load within 180 days at a Fortune 500 client, 5,731 hours saved quarterly across its combined customer base, and a 76% entitlement reduction after deploying agentic user access reviews at a Fortune 500 healthcare customer; these are company-reported figures and should be independently verified.

### Thesis: why invest

Twine launched from stealth in November 2024 with $12m in seed funding co-led by Ten Eleven Ventures and Dell Technologies Capital, with Wiz co-founders Assaf Rappaport and Roy Reznik participating as investors. Backing from two of Wiz's founders (Wiz itself became one of the fastest-growing cybersecurity companies in recent years before its 2025 acquisition by Google) is a strong signal from operators who have direct experience scaling a cybersecurity company from zero. The founding team's shared Claroty background gives them direct experience selling into skeptical, security-conscious enterprise buyers, which matters for a product asking customers to grant an AI agent access to identity and entitlement systems.

The category thesis is that IAM teams face a persistent staffing shortage for high-volume, repetitive tasks (access reviews, stale-account cleanup) that are well-defined enough for an AI agent to execute reliably under human oversight. If Twine can prove safe, auditable autonomous remediation in identity systems specifically, a domain where mistakes are costly, it has a credible path to expand into adjacent security operations tasks.

**What must be true:** autonomous remediation must not introduce access-control errors that create new security incidents; enterprise buyers must trust an AI agent with write access to identity systems, not just read/analyze access; the disclosed pilot metrics must generalize beyond the two named Fortune 500 accounts; and Twine must expand from IAM into adjacent SOC or GRC workflows to grow account value over time.

**Next-round milestones:** 15 to 20 enterprise customers with paid, non-pilot contracts, $6m to $8m ARR, published safety/audit framework for autonomous remediation actions, at least one large regulated-industry reference customer willing to go public, and evidence of expansion revenue within existing accounts.

### Founder bet

The bet is that four operators who spent years selling identity and OT security into large enterprises at Claroty can translate that trust and distribution instinct into selling autonomous AI labor for one of the most sensitive workflows in the enterprise: who has access to what. The Wiz-founder angel participation is a meaningful vote of confidence from people who understand both cybersecurity go-to-market and AI product risk, but the team's public track record as founders (rather than as operators inside someone else's company) is still unproven.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market enterprises with dedicated IAM operations | 15,000 | $40,000 | $600m | HCP assumption |
| Large enterprise IAM/security operations | 4,000 | $150,000 | $600m | HCP assumption |
| Fortune 500 / regulated enterprise | 500 | $600,000 | $300m | HCP assumption |
| **TAM** | 19,500 | | **$1.50bn** | Annual agentic-IAM-labor software pool |
| HCP penetration | | | **10.7% of TAM revenue** | Roughly 1,150 blended accounts |
| **2032 revenue opportunity** | | | **$160m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 15 | 45 | 110 | 240 | 450 | 800 | 1,150 |
| Blended ARR per account | $60k | $70k | $80k | $95k | $110k | $125k | $139k |
| **Revenue** | **$1** | **$3** | **$9** | **$23** | **$50** | **$100** | **$160** |

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Twine Security** | Agentic AI IAM operations; enterprise identity/security teams | X detect, X analyze, X plan, X remediate identity/access issues | Cloud SaaS, agentic execution | Autonomous remediation trust and audit trail in a high-sensitivity workflow | Undisclosed | $12m seed; valuation and total beyond seed undisclosed; Ten Eleven, Dell Technologies Capital, Wiz founder angels |
| SailPoint | Identity governance and administration | X access reviews, entitlement management; Partial agentic automation | Cloud/on-prem | Large installed base and IGA depth | Custom | [Public](https://stockanalysis.com/stocks/sail/statistics/) |
| Okta (Identity Governance) | Workforce identity and governance | X lifecycle management; Partial agentic remediation | Cloud SaaS | Broad identity platform distribution | Custom | [Public](https://stockanalysis.com/stocks/okta/statistics/) |
| Opal Security | Access management and IGA-lite | X access requests and reviews; Partial autonomous remediation | Cloud SaaS | Developer-friendly access workflow | Undisclosed | Private; capital data undisclosed here |
| Zilla Security | Identity governance automation | X access reviews and entitlement cleanup; Partial full agentic execution | Cloud SaaS | Automated access-review workflows | Undisclosed | Private; capital data undisclosed here |
| Torq | Security automation / agentic SOC | Partial IAM-specific workflows; X broader security automation | Cloud SaaS | Hyperautomation platform breadth | Custom | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Varonis](https://stockanalysis.com/stocks/vrns/statistics/) | 7.70x | Data/identity access governance |
| [Okta](https://stockanalysis.com/stocks/okta/statistics/) | 7.94x | Workforce identity platform |
| [SailPoint](https://stockanalysis.com/stocks/sail/statistics/) | 7.60x | Identity governance and administration |
| [Zscaler](https://stockanalysis.com/stocks/zs/statistics/) | 7.11x | Zero-trust access adjacency |
| [Fortinet](https://stockanalysis.com/stocks/ftnt/statistics/) | 16.27x | Broad security platform |
| **Median** | **7.70x** | HCP uses 4.5x, roughly a 42% discount for an unproven agentic-execution category |

| Return path | Base |
|---|---:|
| Entry post-money | $55m, HCP assumption |
| Initial ownership | 3.64% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 2.36% |
| 2032 revenue / exit multiple | $160m / 4.5x |
| Exit enterprise value | $720m |
| HCP proceeds / MOIC | $17.0m / **8.5x** |
| Downside / upside MOIC | 4.0x / 15.6x |

### Principal risks and why invest anyway

- **Autonomous-action trust:** granting an AI agent write access to identity and entitlement systems is a high-consequence decision for any CISO. Invest because the founding team's Claroty background and the disclosed customer case studies suggest a credible enterprise trust motion, but require a documented human-in-the-loop and rollback framework before closing.
- **Thin public founder record:** available sources do not confirm individual founder titles or specific prior roles beyond "senior managers at Claroty." Close this in diligence with direct reference calls.
- **Metric verification:** the 41%, 76%, and 5,731-hour figures are company-reported and unaudited. Request underlying data and independent customer references.
- **Category crowding risk:** general-purpose agentic security automation platforms (Torq and others) could subsume IAM-specific point solutions like Twine. Twine's defense is depth and trust in one sensitive workflow rather than platform breadth; test whether that depth is durable in year-two renewal conversations.

---

## 4. Estuary

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Pursue
**Links:** [Company](https://estuary.dev/) | [Financing announcement](https://www.prnewswire.com/news-releases/estuary-raises-17m-series-a-to-power-ai-for-enterprises-with-right-time-data-movement-302586382.html) | [Company financing post](https://estuary.dev/blog/estuary-raises-17m-series-a-right-time-data/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| David Yaffe | Co-founder and CEO | Previously COO of LiveRamp and co-founder/CEO of Arbor, which LiveRamp acquired in 2016, per company and investor materials. |
| Johnny Graettinger | Co-founder and CTO | Prior infrastructure engineering experience at Google and YouTube, per company and investor materials. |

### Product description

Estuary Flow is a unified "right-time" data platform that merges change data capture, streaming, and batch data movement into a single runtime, built on the company's open-source Gazette broker technology. The platform captures, transforms, and synchronizes data across more than 200 source and destination systems (disclosed sources include Oracle, MySQL, PostgreSQL, S3, Salesforce, HubSpot, NetSuite, Kafka, and Pub/Sub; disclosed destinations include Snowflake, BigQuery, Redshift, Databricks, MongoDB, Elasticsearch, Pinecone, and OpenAI) with sub-100ms latency and exactly-once delivery guarantees. Its wedge is architectural consolidation: most competitors force a choice between a batch-ELT tool and a separate streaming/CDC tool, while Estuary's decoupled storage-compute design serves both from one pipeline definition. The company markets the product explicitly toward AI use cases, positioning fresh, continuously synchronized data as a requirement for retrieval-augmented generation and agentic pipelines that batch-only tools cannot serve.

### Thesis: why invest

Estuary raised a $17m Series A in October 2025 led by M13, with participation from Firstmark and Operator Partners. The company states customers across finance, healthcare, logistics, and SaaS already run production workloads on the platform, though specific named accounts were not disclosed in the sources reviewed. Real-time data movement is a proven, large enterprise software category (Fivetran, a private company, and Confluent, a public one, both operate at meaningful scale), and Estuary's pitch to unify batch and streaming addresses a genuine architectural pain point rather than a purely aspirational one.

The moat is the unified runtime itself: building a system that handles both millisecond-latency streaming and traditional batch ELT with the same connector and transformation model is a substantial engineering investment that point-solution competitors would need years to replicate. If Estuary becomes the default ingestion layer for a customer's AI and operational pipelines, connector configuration, transformation logic, and downstream dependencies create real switching costs.

**What must be true:** the unified batch/streaming architecture must hold up at enterprise data volumes without the complexity or cost tradeoffs it claims to avoid; the 200-plus connector library must stay current as source systems change; enterprise data and security teams must trust a newer vendor over incumbent Fivetran or Airbyte; and AI-driven demand for fresher data must convert into paid upgrades, not just interest.

**Next-round milestones:** $15m to $20m ARR, 150 or more paying enterprise customers, net revenue retention above 120%, at least five named reference customers across the disclosed verticals (finance, healthcare, logistics, SaaS), and gross margin above 70% after compute and storage costs.

### Founder bet

The bet is that two Google/YouTube/LiveRamp infrastructure veterans, one of whom has already built and sold a data company (Arbor to LiveRamp), can out-architect both the batch-ELT incumbents and the pure-streaming vendors by refusing to force customers to choose. The founders have been building the underlying technology since 2014 and only launched commercially in 2019, suggesting a deliberate, engineering-first approach rather than a rushed go-to-market; the risk is that this long gestation has left less time to build enterprise sales muscle relative to newer, faster-moving competitors.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market data teams | 20,000 | $20,000 | $400m | HCP assumption |
| Enterprise data platforms | 6,000 | $80,000 | $480m | HCP assumption |
| Large enterprise / regulated (finance, healthcare, logistics) | 1,000 | $400,000 | $400m | HCP assumption |
| **TAM** | 27,000 | | **$1.28bn** | Annual data-movement software pool |
| HCP penetration | | | **17.2% of TAM revenue** | Roughly 3,400 blended accounts |
| **2032 revenue opportunity** | | | **$220m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 80 | 200 | 450 | 850 | 1,500 | 2,400 | 3,400 |
| Blended ARR per account | $25k | $30k | $35k | $42k | $50k | $58k | $65k |
| **Revenue** | **$2** | **$6** | **$16** | **$36** | **$75** | **$139** | **$220** |

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Estuary** | Unified batch/streaming data movement; data engineering teams | X CDC, X streaming, X batch ELT, X 200-plus connectors | Cloud SaaS | Single runtime for batch and sub-100ms streaming | Undisclosed | $17m Series A; valuation and total undisclosed; M13, Firstmark, Operator Partners |
| Fivetran | Batch ELT connectors | X batch ELT; Partial CDC; No evidence unified low-latency streaming | Cloud SaaS | Connector breadth and enterprise installed base | Usage-based | Private; valuation not used |
| Confluent | Kafka-based streaming platform | X streaming; Partial batch ELT via connectors | Cloud/self-managed | Kafka ecosystem standard and enterprise scale | Usage-based | [Public](https://stockanalysis.com/stocks/cflt/statistics/) |
| Airbyte | Open-source ELT connectors | X batch ELT (OSS and cloud); Partial CDC | Cloud/self-hosted OSS | Open-source connector community | Open source plus usage tiers | Private; valuation not used |
| Debezium | Open-source CDC | X CDC; No evidence unified batch/streaming product | Self-hosted OSS | Widely adopted open-source CDC standard | Open source | Open-source project (Red Hat-sponsored) |
| Snowflake (Snowpipe/Openflow) | Cloud data platform with ingestion tooling | Partial ingestion; No evidence standalone unified pipeline product | Cloud platform | Massive existing warehouse installed base | Bundled/usage | [Public](https://stockanalysis.com/stocks/snow/statistics/) |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Snowflake](https://stockanalysis.com/stocks/snow/statistics/) | 18.20x | Cloud data platform, adjacent ingestion demand |
| [Confluent](https://stockanalysis.com/stocks/cflt/statistics/) | 8.73x | Direct real-time streaming data comp |
| [MongoDB](https://stockanalysis.com/stocks/mdb/statistics/) | 8.74x | Developer-oriented data infrastructure |
| [Datadog](https://stockanalysis.com/stocks/ddog/statistics/) | 24.13x | Usage-based developer/data platform |
| [Elastic](https://stockanalysis.com/stocks/estc/statistics/) | 3.23x | Search and data-pipeline-adjacent infrastructure |
| **Median** | **8.74x** | HCP uses 5.0x, reflecting Fivetran's continued private dominance and pricing competition in the category |

| Return path | Base |
|---|---:|
| Entry post-money | $90m, HCP assumption |
| Initial ownership | 2.78% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.81% |
| 2032 revenue / exit multiple | $220m / 5.0x |
| Exit enterprise value | $1.10bn |
| HCP proceeds / MOIC | $19.9m / **7.9x** |
| Downside / upside MOIC | 3.8x / 14.3x |

### Principal risks and why invest anyway

- **Incumbent gravity:** Fivetran and Confluent both have large installed bases and are default choices for many buyers. Invest because Estuary's unified architecture is a genuine technical differentiation, not a repackaging; require evidence that customers switch from, not just supplement, existing tools.
- **Connector maintenance burden:** a 200-plus connector library is expensive to keep current as source APIs change. Underwrite connector-team headcount and reliability metrics, not just connector count.
- **Long product gestation:** the founders spent five years building before commercial launch (2014 to 2019) and this is their first Series A roughly a decade after starting, later than typical for the stage. Evaluate whether the go-to-market motion has matured as much as the technology.
- **Named customers undisclosed:** the "finance, healthcare, logistics, and SaaS" customer claim in the financing announcement lacks specific company names. Request a reference list before finalizing terms.

---

## 5. Nudge Security

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Pursue
**Links:** [Company](https://www.nudgesecurity.com/) | [Financing announcement](https://www.nudgesecurity.com/press/nudge-security-raises-22-5m-series-a-to-secure-workforce-ai-and-saas) | [Additional coverage](https://www.prnewswire.com/news-releases/nudge-security-raises-22-5m-series-a-to-secure-workforce-ai-and-saas-302617997.html)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Russell Spitler | Co-founder and CEO | Held product and strategy leadership roles at AlienVault and AT&T Cybersecurity prior to co-founding Nudge; co-founded the Open Threat Exchange with Jaime Blasco. |
| Jaime Blasco | Co-founder and CTO | Security researcher who led AT&T Alien Labs (formerly AlienVault Labs) prior to co-founding Nudge; thirteen-year working history with Spitler predating the company. |

### Product description

Nudge Security is a SaaS and AI security governance platform focused on what it calls the "Workforce Edge," the point where employees adopt and use business applications and AI tools day to day. The platform continuously discovers SaaS and AI applications in use across an organization (the company claims to surface 20 to 30 times more apps than customers knew existed), assesses the risk and security posture of each, manages associated identities, and delivers real-time behavioral guidance to employees through browser notifications and workplace chat tools rather than relying solely on blocking controls. This positions Nudge as continuous and behavior-based rather than a periodic audit or a hard-block gatekeeper.

### Thesis: why invest

Nudge Security raised a $22.5m Series A in November 2025, led by Cerberus Ventures with participation from existing investors Ballistic Ventures, Forgepoint Capital, and Squadra Ventures, following a $7m seed round in 2022. The company discloses genuinely strong operating metrics for this batch: 3x annual recurring revenue growth for two consecutive years, nearly 200 customers onboarded since its October 2022 launch, and more than 60 feature releases in the past 12 months. Reddit's CISO is quoted in the financing announcement describing complete SaaS-footprint visibility within hours of deployment, a named enterprise reference that most seed-to-Series-A cybersecurity companies cannot produce.

The founders' shared history building threat intelligence products at AlienVault (acquired by AT&T) gives them direct experience turning a research-driven security product into an enterprise sales motion, and their prior working relationship reduces founding-team execution risk relative to newly formed teams. Shadow IT and shadow AI adoption inside enterprises is a genuinely growing problem as employees independently adopt AI tools, giving Nudge tailwind beyond its original SaaS-discovery wedge.

**What must be true:** the disclosed 3x ARR growth rate must be sustainable, not a base-effect artifact of a small starting ARR; the behavioral-nudge approach must produce measurable risk reduction, not just visibility; the platform must keep pace as shadow-AI adoption patterns evolve faster than shadow-SaaS did; and the nearly 200 customers must expand contract value over time rather than churn at renewal.

**Next-round milestones:** $20m to $25m ARR (consistent with continued 2x to 3x growth off the current base), 350 or more customers, net revenue retention above 125%, at least five additional named Fortune 500 references beyond Reddit, and disclosed reduction-in-incident evidence tied to the nudge-based governance model.

### Founder bet

The bet is that two operators with thirteen years of shared history building and scaling AlienVault's threat-intelligence business can repeat that pattern in SaaS and AI governance, a category with a real and growing enterprise pain point. This is the strongest disclosed-traction profile in the batch (repeat 3x ARR growth, named enterprise reference, nearly 200 customers), which meaningfully de-risks the founder-market fit question relative to earlier-stage peers in this set.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market organizations (500 to 2,500 employees) | 40,000 | $15,000 | $600m | HCP assumption |
| Enterprise organizations (2,500-plus employees) | 10,000 | $60,000 | $600m | HCP assumption |
| Global / regulated large enterprise | 1,500 | $200,000 | $300m | HCP assumption |
| **TAM** | 51,500 | | **$1.50bn** | Annual SaaS/AI security governance software pool |
| HCP penetration | | | **14.7% of TAM revenue** | Roughly 4,400 blended accounts |
| **2032 revenue opportunity** | | | **$220m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 300 | 550 | 950 | 1,500 | 2,300 | 3,300 | 4,400 |
| Blended ARR per account | $25k | $30k | $35k | $40k | $45k | $50k | $50k |
| **Revenue** | **$8** | **$17** | **$33** | **$60** | **$104** | **$165** | **$220** |

The 300 accounts modeled for 2026 is broadly consistent with the disclosed "nearly 200 customers" as of the Series A announcement plus continued 3x-style growth; the company does not disclose a precise current customer count for 2026, so this row is an HCP assumption anchored to disclosed history.

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Nudge Security** | SaaS/AI security posture management; IT and security teams | X SaaS/AI discovery, X risk assessment, X identity, X behavioral nudges | Cloud SaaS, browser/chat-delivered | Continuous discovery plus behavior-change delivery mechanism | Undisclosed | $22.5m Series A; ~$40m total disclosed (seed plus Series A); valuation undisclosed; Cerberus, Ballistic, Forgepoint, Squadra |
| Obsidian Security | SaaS security posture management | X SaaS discovery and posture; Partial AI-tool governance | Cloud SaaS | Established SSPM installed base | Custom | Private; capital data undisclosed here |
| Reco | SaaS security and identity governance | X SaaS discovery, identity risk; Partial behavioral nudges | Cloud SaaS | Identity-centric SaaS risk graph | Custom | Private; capital data undisclosed here |
| Wing Security | SaaS security and app governance | X SaaS discovery and risk scoring; Partial AI governance | Cloud SaaS | Automated app risk remediation workflows | Custom | Private; capital data undisclosed here |
| Grip Security | SaaS identity and security governance | X SaaS/identity discovery; Partial AI-tool governance | Cloud SaaS | Identity-first SaaS risk analytics | Custom | Private; capital data undisclosed here |
| Zscaler | Zero-trust/SASE with app-visibility features | Partial shadow-IT visibility; No evidence dedicated behavioral-nudge workflow | Cloud SaaS | Broad zero-trust platform distribution | Custom | [Public](https://stockanalysis.com/stocks/zs/statistics/) |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Cloudflare](https://stockanalysis.com/stocks/net/statistics/) | 42.05x | Premium-growth infrastructure/security comp |
| [Datadog](https://stockanalysis.com/stocks/ddog/statistics/) | 24.13x | Usage-based SaaS platform at scale |
| [Okta](https://stockanalysis.com/stocks/okta/statistics/) | 7.94x | Identity-adjacent SaaS security |
| [Zscaler](https://stockanalysis.com/stocks/zs/statistics/) | 7.11x | Zero-trust/SASE security platform |
| [CrowdStrike](https://stockanalysis.com/stocks/crwd/statistics/) | 39.86x | Best-in-class growth security platform (outlier, included for range) |
| **Median** | **24.13x** | HCP uses 6.0x, a roughly 75% discount given SSPM/shadow-AI governance is still an early, unconsolidated category |

| Return path | Base |
|---|---:|
| Entry post-money | $110m, HCP assumption |
| Initial ownership | 2.27% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.48% |
| 2032 revenue / exit multiple | $220m / 6.0x |
| Exit enterprise value | $1.32bn |
| HCP proceeds / MOIC | $19.5m / **7.8x** |
| Downside / upside MOIC | 3.9x / 13.7x |

### Principal risks and why invest anyway

- **Nudge fatigue:** behavioral guidance delivered through browser notifications and chat can lose effectiveness as employees learn to dismiss it. Invest because the company's own reported 3x ARR growth across two consecutive years is direct market evidence the model is working commercially today; require churn and engagement data by cohort in diligence.
- **Shadow-AI category shift risk:** the product's origin is SaaS discovery; shadow-AI governance is newer and less proven for Nudge specifically. Confirm what fraction of new bookings is AI-governance-driven versus legacy SaaS-discovery renewal.
- **Platform bundling:** Okta, Zscaler, or Microsoft could bundle basic shadow-IT/shadow-AI visibility into existing platforms. Nudge's defense is the behavior-change delivery layer and depth of discovery, not visibility alone.
- **Growth-rate durability:** 3x ARR growth is easier to sustain off a small base. Underwrite the next two years assuming deceleration toward more typical Series A growth rates (60% to 100%) rather than extrapolating 3x indefinitely.

---

## 6. Prophet Security

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Diligence
**Links:** [Company](https://www.prophetsecurity.ai/) | [Financing announcement](https://www.businesswire.com/news/home/20250729681026/en/Prophet-Security-Raises-$30M-Series-A-Announces-Industrys-Most-Comprehensive-Agentic-AI-SOC-Platform-to-Transform-Security-Operations) | [Company financing post](https://www.prophetsecurity.ai/blog/prophet-security-raises-30-million-series-a-led-by-accel)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Kamal Shah | Co-founder and CEO | Previously CEO of StackRox, a Kubernetes-native security company acquired by Red Hat. |
| Vibhav Sreekanti | Co-founder and CTO | Previously VP of Engineering at StackRox alongside Shah, then Senior Director of Software Engineering at Red Hat; earlier co-founder and CTO of Defend7, an early container-security startup, and Senior Director of Software Development at Oracle. |

### Product description

Prophet Security's Agentic AI SOC Platform automates security operations center workflows across three components: Prophet AI SOC Analyst, which autonomously triages, investigates, and responds to security alerts; Prophet AI Threat Hunter, which generates hypotheses and conducts proactive investigations across environments; and Prophet AI Detection Advisor, which analyzes telemetry to find detection gaps and recommends fixes aligned to the MITRE ATT&CK framework. The company reports that over a six-month period its AI SOC Analyst performed more than one million investigations, saved 360,000 hours of investigation toil, delivered ten-times-faster response times, and cut false positives by 96%; these are company-disclosed figures. A disclosed customer, Cabinetworks, reported reducing investigation time from hours to minutes using the platform.

### Thesis: why invest

Prophet Security raised an $11m seed round in April 2024, followed by a $30m Series A in July 2025 led by Accel with participation from Bain Capital Ventures and Citi Ventures, bringing disclosed total funding to roughly $41m. The founding team's direct StackRox-to-Red-Hat pedigree is a strong signal: Shah and Sreekanti already built and sold one cybersecurity infrastructure company together, and container/Kubernetes security expertise translates reasonably well to understanding modern cloud-native attack surfaces that a SOC analyst platform must reason about.

The disclosed operating metrics (one million-plus investigations, 360,000 hours saved, 96% false-positive reduction) are the most quantitatively detailed public traction figures in this batch, which is a genuine positive. The risk is that "agentic AI SOC analyst" is now one of the most crowded positioning claims in cybersecurity, with CrowdStrike, Palo Alto Networks, and Microsoft all shipping native agentic SOC copilots bundled into existing platforms customers already own.

**What must be true:** Prophet's stand-alone platform must remain differentiated enough that SOC teams choose it over a bundled agentic feature already included in their existing CrowdStrike, Palo Alto, or Microsoft license; the disclosed accuracy and time-savings metrics must hold up across a broader, more diverse customer base than the current design partners; and the company must convert Series A capital into durable enterprise contracts fast enough to justify the round's size and implied valuation.

**Next-round milestones:** $25m to $30m ARR, 40 or more enterprise customers with contracts above $150k ACV, independently verified false-positive and time-to-response metrics from at least three customers, and clear evidence of retention against bundled incumbent alternatives at renewal.

### Founder bet

The bet is that Shah and Sreekanti can repeat their StackRox playbook: build a technically credible product in a hot, well-funded category, grow it fast, and either scale independently or become an attractive acquisition target for a larger platform. Their track record together is a genuine positive; the countervailing risk is that this exact playbook (agentic AI SOC analyst) is now being run by CrowdStrike, Palo Alto Networks, and multiple other well-capitalized startups simultaneously, which compresses the window for an independent winner to emerge.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market SOC teams | 15,000 | $50,000 | $750m | HCP assumption |
| Enterprise SOC teams | 5,000 | $200,000 | $1.00bn | HCP assumption |
| Large enterprise / MSSP | 700 | $700,000 | $490m | HCP assumption |
| **TAM** | 20,700 | | **$2.24bn** | Annual AI-SOC-automation software pool |
| HCP penetration | | | **12.5% of TAM revenue** | Roughly 2,200 blended accounts |
| **2032 revenue opportunity** | | | **$280m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 60 | 150 | 350 | 700 | 1,200 | 1,900 | 2,200 |
| Blended ARR per account | $70k | $85k | $100k | $115k | $130k | $142k | $127k |
| **Revenue** | **$4** | **$13** | **$35** | **$80** | **$156** | **$270** | **$280** |

Blended ACV moderates in the final year as the customer mix broadens from early enterprise design partners toward a larger base of mid-market SOC teams, an HCP assumption.

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Prophet Security** | Agentic AI SOC platform; SOC analysts and managers | X triage, X investigation, X threat hunting, X detection tuning | Cloud SaaS | MITRE ATT&CK-aligned detection tuning plus quantified accuracy metrics | Undisclosed | $30m Series A; ~$41m total disclosed; valuation undisclosed; Accel, Bain Capital Ventures, Citi Ventures |
| CrowdStrike (Charlotte AI) | Endpoint/XDR platform with agentic AI features | X triage and investigation within Falcon platform | Cloud SaaS | Massive endpoint telemetry base and existing customer installed base | Bundled/platform | [Public](https://stockanalysis.com/stocks/crwd/statistics/) |
| Palo Alto Networks (Cortex XSIAM) | SOC platform with agentic AI features | X triage, investigation, automated response | Cloud SaaS | Platform breadth (network, cloud, endpoint) feeding one data model | Bundled/platform | [Public](https://stockanalysis.com/stocks/panw/statistics/) |
| Dropzone AI | Standalone AI SOC analyst | X triage and investigation; Partial threat hunting | Cloud SaaS | Independent, tool-agnostic AI analyst positioning | Undisclosed | Private; capital data undisclosed here |
| Radiant Security | AI-powered SOC co-pilot | X triage and investigation; Partial detection tuning | Cloud SaaS | Alert-to-resolution automation depth | Undisclosed | Private; capital data undisclosed here |
| Microsoft Security Copilot | AI assistant across Microsoft security stack | Partial triage/investigation within Microsoft ecosystem | Cloud SaaS (Azure) | Deep Microsoft 365/Defender ecosystem integration | Consumption-based | Microsoft product |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [CrowdStrike](https://stockanalysis.com/stocks/crwd/statistics/) | 39.86x | Best-in-class growth SOC/endpoint platform |
| [Palo Alto Networks](https://stockanalysis.com/stocks/panw/statistics/) | 27.47x | Direct Cortex XSIAM competitor at platform scale |
| [Fortinet](https://stockanalysis.com/stocks/ftnt/statistics/) | 16.27x | Broad security operations incumbent |
| [SentinelOne](https://stockanalysis.com/stocks/s/statistics/) | 5.77x | Endpoint/SOC challenger |
| [Rapid7](https://stockanalysis.com/stocks/rpd/statistics/) | 1.29x | Legacy-adjacent detection/response vendor |
| **Median** | **16.27x** | HCP uses 6.0x, a roughly 63% discount reflecting both stage and intense incumbent bundling risk |

| Return path | Base |
|---|---:|
| Entry post-money | $170m, HCP assumption |
| Initial ownership | 1.47% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 0.96% |
| 2032 revenue / exit multiple | $280m / 6.0x |
| Exit enterprise value | $1.68bn |
| HCP proceeds / MOIC | $16.1m / **6.4x** |
| Downside / upside MOIC | 3.2x / 11.2x |

### Principal risks and why invest anyway

- **Bundling risk:** CrowdStrike, Palo Alto Networks, and Microsoft can all give away agentic SOC features as part of existing platform contracts. Invest because Prophet's founders have already proven they can build independently valuable security infrastructure (StackRox) inside a crowded category; require evidence Prophet wins net-new competitive evaluations against these bundled alternatives, not just displaces manual process.
- **Entry price sensitivity:** the $30m Series A round size implies a rich HCP-assumed post-money relative to peers in this batch, which caps the base MOIC below several earlier-stage names here. Push for the lowest defensible entry price and structure (pro rata rights, information rights) given the pricing risk.
- **Metric verification:** the disclosed 96% false-positive reduction and 360,000 hours-saved figures are company-reported and time-boxed to six months at what was likely a small number of design-partner customers. Independently verify with named references before relying on these numbers in the investment case.
- **Autonomous response risk:** the platform performs "responses," not just triage. Require a clear description of guardrails, human sign-off requirements, and any documented false-positive-driven remediation incidents.

---

## 7. P0 Security

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Diligence
**Links:** [Company](https://www.p0.dev/) | [Financing announcement](https://www.p0.dev/blog/15m-series-a) | [Additional coverage](https://www.businesswire.com/news/home/20240910761539/en/P0-Security-Closes-$15M-Series-A-Funding-to-Help-Enterprises-Govern-and-Secure-Cloud-Access-for-All-Human-and-Machine-Identities-in-Minutes)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Shashwat Sehgal | Co-founder and CEO | Presented publicly as CEO in P0's RSAC Innovation Sandbox finalist appearance; specific prior employer history not detailed in the sources reviewed. Confirm in diligence. |
| Gergely Danyi | Co-founder and CTO | Named on the company's own about page as co-founder and CTO; prior background not detailed in the sources reviewed. |
| Nathan Brahms | Co-founder and VP Engineering | Named on the company's own about page as co-founder and VP of Engineering; prior background not detailed in the sources reviewed. |

### Product description

P0 Security provides an "AuthZ Control Plane" that replaces standing cloud privileges with automated, time-boxed, just-in-time access. Built on agentless, API-native integrations with AWS, GCP, and Azure, the platform grants short-lived, auditable access to servers (SSH and sudo), databases (Postgres, MySQL, CloudSQL), cloud consoles, and Kubernetes clusters (EKS, GKE, AKS) through Slack, CLI, or automated workflows, with access expiring automatically when a task is complete. The platform consolidates identity metadata across human users, non-human identities, and AI agents into one governance layer, extending the just-in-time model beyond human engineers to the machine and agent identities that increasingly touch production systems. P0 was named an RSAC Innovation Sandbox Top Ten finalist ahead of its Series A raise.

### Thesis: why invest

P0 Security raised a $5m seed round followed by a $15m Series A in September 2024, ten months after emerging from stealth and four months after its RSAC Innovation Sandbox recognition. The round was led by SYN Ventures with participation from Zscaler and existing investor Lightspeed Venture Partners, bringing total disclosed funding to $20m. Zscaler's strategic participation is a meaningful signal: a public zero-trust platform vendor investing directly suggests either a partnership motion or a genuine belief that just-in-time cloud access is complementary, not competitive, to Zscaler's own product.

Standing cloud privileges are a well-understood, widely exploited attack vector, and P0's agentless deployment model (minutes to deploy, per the financing materials) lowers the adoption barrier relative to legacy privileged access management tools built for on-premises infrastructure. Extending the just-in-time model to non-human and AI-agent identities, not just human engineers, positions P0 to ride the same non-human-identity growth trend benefiting Aembit elsewhere in this batch.

**What must be true:** agentless deployment must remain reliable as cloud provider APIs evolve; the just-in-time workflow must not create developer friction severe enough to trigger workarounds; the AI-agent identity governance extension must convert into real paid demand, not just roadmap messaging; and P0 must differentiate clearly against both legacy PAM vendors modernizing their products and newer JIT-focused entrants.

**Next-round milestones:** $10m to $12m ARR, 60 or more enterprise customers, net revenue retention above 120%, a public reference customer using the AI-agent identity governance capability specifically, and expansion of the RSAC-level industry recognition into analyst-firm coverage (Gartner or Forrester).

### Founder bet

The bet is that a three-person founding team with direct product, engineering, and infrastructure ownership can win the just-in-time cloud access category before larger identity and PAM incumbents fully modernize their own offerings. The RSAC Innovation Sandbox recognition and Zscaler's strategic investment are credible third-party validation signals; the gap in this record is verified individual founder track records, which available public sources did not confirm.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market cloud-first companies | 20,000 | $10,000 | $200m | HCP assumption |
| Enterprise cloud operators | 6,000 | $50,000 | $300m | HCP assumption |
| Large / regulated enterprise (Fortune 2000) | 1,000 | $200,000 | $200m | HCP assumption |
| **TAM** | 27,000 | | **$700m** | Annual just-in-time cloud access software pool |
| HCP penetration | | | **18.6% of TAM revenue** | Roughly 2,500 blended accounts |
| **2032 revenue opportunity** | | | **$130m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 40 | 110 | 260 | 550 | 1,000 | 1,650 | 2,500 |
| Blended ARR per account | $18k | $22k | $27k | $32k | $38k | $44k | $52k |
| **Revenue** | **$1** | **$2** | **$7** | **$18** | **$38** | **$73** | **$130** |

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **P0 Security** | Agentless just-in-time cloud access; security and platform engineering teams | X JIT access, X human and non-human identities, X Slack/CLI workflows | Agentless cloud SaaS | Unified human plus non-human JIT governance across AWS/GCP/Azure | Undisclosed | $15m Series A; $20m total; valuation undisclosed; SYN Ventures, Zscaler, Lightspeed |
| SailPoint | Identity governance and administration | X access reviews and lifecycle; Partial cloud-native JIT | Cloud/on-prem | Large enterprise IGA installed base | Custom | [Public](https://stockanalysis.com/stocks/sail/statistics/) |
| Okta | Workforce identity platform | Partial JIT-adjacent workflows; X broad identity governance | Cloud SaaS | Identity platform distribution and ecosystem | Custom | [Public](https://stockanalysis.com/stocks/okta/statistics/) |
| Britive | Cloud privilege management and JIT access | X JIT access, cloud-native PAM | Cloud SaaS | Early mover in cloud-native, agentless JIT PAM | Custom | Private; capital data undisclosed here |
| Apono | Cloud access governance and JIT | X JIT access; Partial non-human identity coverage | Cloud SaaS | Developer-friendly self-service access workflows | Custom | Private; capital data undisclosed here |
| Teleport | Infrastructure access platform | X JIT access to servers/Kubernetes/databases; Partial full cloud-console coverage | Agent-based/agentless hybrid | Broad infrastructure-access protocol support | Custom | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Palo Alto Networks](https://stockanalysis.com/stocks/panw/statistics/) | 27.47x | Cloud security platform (acquired CyberArk PAM business in 2026) |
| [Fortinet](https://stockanalysis.com/stocks/ftnt/statistics/) | 16.27x | Broad security platform incumbent |
| [Okta](https://stockanalysis.com/stocks/okta/statistics/) | 7.94x | Workforce identity platform |
| [SailPoint](https://stockanalysis.com/stocks/sail/statistics/) | 7.60x | Identity governance and administration |
| [Zscaler](https://stockanalysis.com/stocks/zs/statistics/) | 7.11x | Strategic investor and zero-trust access adjacency |
| **Median** | **7.94x** | HCP uses 4.5x, roughly a 43% discount reflecting a narrower point-solution scope than these platform comps |

| Return path | Base |
|---|---:|
| Entry post-money | $70m, HCP assumption |
| Initial ownership | 2.86% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.86% |
| 2032 revenue / exit multiple | $130m / 4.5x |
| Exit enterprise value | $585m |
| HCP proceeds / MOIC | $10.9m / **5.4x** |
| Downside / upside MOIC | 2.5x / 10.0x |

### Principal risks and why invest anyway

- **Founder track record gap:** available public sources do not confirm the founders' prior companies or roles beyond current titles. Invest cautiously (Diligence, not Pursue) until direct reference calls close this gap, weighed against the credible RSAC and Zscaler signals already in hand.
- **Incumbent modernization:** CyberArk's PAM business, now under Palo Alto Networks following CyberArk's 2026 acquisition and delisting, and SailPoint could both extend into agentless JIT cloud access. P0's defense is deployment speed and a cloud-native architecture built without legacy on-prem assumptions; test this directly against a live incumbent bake-off in diligence.
- **Point-solution risk:** JIT cloud access alone may not be a large enough standalone budget line for many buyers, who may prefer it bundled into a broader identity or PAM suite. Confirm average contract value trends and whether deals are standalone or attach to a larger deal.
- **Stale-round risk:** the last disclosed round is from September 2024, nearly two years before this memo. Confirm current fundraising status, runway, and whether a bridge or new round is already in motion before committing capital.

---

## 8. Aembit

**Stage:** Series A
**Proposed HCP check:** $2.5m
**Recommendation:** Diligence
**Links:** [Company](https://aembit.io/) | [Financing announcement](https://aembit.io/press-release/aembit-raises-25-million-in-series-a-funding-for-non-human-identity-and-access-management/) | [Additional coverage](https://www.securityweek.com/non-human-iam-provider-aembit-raises-25-million/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| David Goldschlag | Co-founder and CEO | Named on the company's own Series A press release as co-founder and CEO. Confirm detailed prior background in diligence; available public sources did not provide a verified employment history. |
| Kevin Sapp | Co-founder | Named on the company's own Series A press release as co-founder. Confirm role and prior background in diligence. |

### Product description

Aembit provides non-human identity and access management (IAM), giving workloads (services, scripts, CI/CD jobs, and AI agents) policy-based, secretless, just-in-time access to the sensitive resources they call, rather than relying on long-lived API keys or credentials embedded in code. The platform authenticates workload identity and posture at request time and issues short-lived credentials scoped to exactly what is needed, aiming to shrink the standing attack surface created by static secrets. Aembit cites Snowflake's CISO as a customer reference in its Series A announcement. The company frames the category shift explicitly: as AI agents and automated workloads proliferate, non-human identities already outnumber human identities in most cloud environments, and most organizations still manage them with the same insecure patterns (hardcoded credentials, shared secrets in chat and email) that human IAM solved years ago.

### Thesis: why invest

Aembit launched publicly with $16.6m in combined pre-seed and seed financing from Ballistic Ventures and Ten Eleven Ventures, then raised a $25m Series A in September 2024 led by Acrew Capital with participation from Ballistic Ventures, Ten Eleven Ventures, Okta Ventures, and the CrowdStrike Falcon Fund, bringing total disclosed capital to nearly $45m per the company's own release. Strategic participation from both Okta Ventures and CrowdStrike Falcon Fund is a strong double signal from two of the largest identity and endpoint security platforms, suggesting they see non-human identity as either complementary to their own roadmaps or a credible acquisition-track category to watch.

The non-human identity thesis is well-supported directionally: agentic AI workloads are a genuine, accelerating driver of machine-to-machine and machine-to-resource access that legacy secrets management was never designed to govern at this scale. Aembit's wedge (secretless, policy-based, workload-identity-driven access) addresses a real and growing operational security gap, and having a public reference customer as sophisticated as Snowflake's security organization is a credible, if singular, proof point.

**What must be true:** secretless workload authentication must integrate cleanly across the fragmented mix of cloud, SaaS, CI/CD, and on-prem systems most enterprises actually run; policy management must scale without becoming its own operational burden; the CrowdStrike and Okta strategic relationships must translate into distribution, not just capital; and Aembit must maintain differentiation as SPIFFE/SPIRE-based open-source approaches and platform-native identity features mature.

**Next-round milestones:** $12m to $15m ARR, 40 or more enterprise customers with at least five public references beyond Snowflake, net revenue retention above 120%, demonstrated integration depth across at least three major CI/CD and cloud platforms, and evidence of a working Okta or CrowdStrike distribution partnership.

### Founder bet

The bet is that a two-person founding team, operating with strong specialist cybersecurity-fund backing from first check (Ballistic Ventures' first-ever investment, per the fund's own materials) through Series A, can define and own the non-human identity category as it becomes a board-level concern. The strategic capital from Okta and CrowdStrike is a genuine positive signal; the corresponding risk is that available public sources do not verify the founders' specific prior operating history, which diligence must close before underwriting founder-market fit with confidence.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market cloud-native companies | 25,000 | $12,000 | $300m | HCP assumption |
| Large enterprises with complex multi-cloud/agent estates | 8,000 | $60,000 | $480m | HCP assumption |
| Global regulated enterprises (finance, healthcare, government, Fortune 500) | 1,200 | $300,000 | $360m | HCP assumption |
| **TAM** | 34,200 | | **$1.14bn** | Annual non-human identity software pool |
| HCP penetration | | | **17.5% of TAM revenue** | Roughly 3,000 blended accounts |
| **2032 revenue opportunity** | | | **$200m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 50 | 140 | 320 | 650 | 1,200 | 2,000 | 3,000 |
| Blended ARR per account | $20k | $25k | $30k | $37k | $44k | $52k | $67k |
| **Revenue** | **$1** | **$4** | **$10** | **$24** | **$53** | **$104** | **$200** |

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Aembit** | Non-human identity and access management; platform, DevOps, and security teams | X secretless auth, X policy-based access, X JIT workload credentials | Cloud SaaS, agentless | Workload-identity-first architecture with public enterprise reference | Undisclosed | $25m Series A; ~$45m total disclosed; valuation undisclosed; Acrew Capital, Ballistic, Ten Eleven, Okta Ventures, CrowdStrike Falcon Fund |
| SPIFFE/SPIRE | Open-source workload identity standard | X workload identity issuance; No evidence managed policy/governance layer | Self-hosted OSS | CNCF-graduated open standard, broad ecosystem adoption | Open source | Open-source project (CNCF) |
| HashiCorp Vault | Secrets management and workload identity | X secrets management; Partial workload-identity-native access | Self-hosted/cloud | Large existing secrets-management installed base | Custom | Public (parent HashiCorp; product-level EV/revenue not separately quoted) |
| Astrix Security | Non-human identity security | X NHI discovery and risk; Partial policy-based access issuance | Cloud SaaS | NHI-specific risk detection depth | Undisclosed | Private; capital data undisclosed here |
| Oasis Security | Non-human identity lifecycle management | X NHI discovery, lifecycle, and governance; Partial secretless issuance | Cloud SaaS | NHI lifecycle governance breadth | Undisclosed | Private; capital data undisclosed here |
| Natoma | Non-human/agentic identity access | X agentic identity access; Partial full workload-to-workload coverage | Cloud SaaS | Early focus specifically on AI-agent identity | Undisclosed | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [CrowdStrike](https://stockanalysis.com/stocks/crwd/statistics/) | 39.86x | Strategic investor and endpoint/identity-adjacent platform (outlier, included for range) |
| [Palo Alto Networks](https://stockanalysis.com/stocks/panw/statistics/) | 27.47x | Broad identity-adjacent security platform |
| [Fortinet](https://stockanalysis.com/stocks/ftnt/statistics/) | 16.27x | Broad security platform incumbent |
| [SailPoint](https://stockanalysis.com/stocks/sail/statistics/) | 7.60x | Identity governance and administration |
| [Okta](https://stockanalysis.com/stocks/okta/statistics/) | 7.94x | Strategic investor and workforce identity platform |
| **Median** | **16.27x** | HCP uses 5.0x, a roughly 69% discount reflecting Aembit's early stage and unconsolidated category |

| Return path | Base |
|---|---:|
| Entry post-money | $120m, HCP assumption |
| Initial ownership | 2.08% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.35% |
| 2032 revenue / exit multiple | $200m / 5.0x |
| Exit enterprise value | $1.00bn |
| HCP proceeds / MOIC | $13.5m / **5.4x** |
| Downside / upside MOIC | 2.6x / 9.8x |

### Principal risks and why invest anyway

- **Open-source substitution:** SPIFFE/SPIRE is a free, CNCF-graduated standard that sophisticated platform teams can self-host. Invest because Aembit sells the managed policy, governance, and secretless-issuance layer on top, not the raw identity primitive, but confirm in diligence how much of the sales cycle is spent justifying build-versus-buy against SPIFFE.
- **Founder track record gap:** as with several companies in this batch, available public sources do not confirm the founders' detailed prior employment history. Close this with direct reference calls before finalizing terms.
- **Single named reference:** the only public customer reference is Snowflake's CISO. Request a broader reference list and verify deal sizes and renewal status for at least three additional accounts.
- **Stale round risk:** the Series A closed in September 2024, nearly two years before this memo, with no publicly confirmed subsequent round. Confirm current runway and fundraising status; a large gap between rounds at this stage can indicate either disciplined capital efficiency or slower-than-expected growth, and diligence should determine which.

---

## 9. Tobiko Data

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Price-sensitive
**Links:** [Company](https://www.tobikodata.com/) | [Financing announcement](https://techcrunch.com/2024/06/05/with-21-8m-in-funding-tobiko-aims-to-build-a-modern-data-platform/) | [Company about page](https://www.tobikodata.com/about)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Tyson Mao | Co-founder and CEO | Named on the company's own about page as co-founder and CEO; specific prior operating background not detailed in the sources reviewed. |
| Toby Mao | Co-founder and CTO | Previously senior staff engineer at Airbnb, where he led the XP experimentation platform and Minerva metrics platform; earlier led the XP platform at Netflix, where he met co-founder Iaroslav Zeigerman. |
| Iaroslav Zeigerman | Co-founder and Chief Architect | Previously a senior software engineer on Netflix's data team, where he worked with Toby Mao before co-founding Tobiko. |

### Product description

Tobiko Data builds SQLMesh, an open-source data transformation and modeling framework positioned as a next-generation alternative to dbt, plus SQLGlot, a widely used open-source SQL parser and transpiler. SQLMesh's core technical differentiation is state-aware, incremental processing: rather than recomputing full data transformations on every run the way dbt's default model does, SQLMesh tracks what has actually changed and only reprocesses what is necessary, which the company says materially lowers data-warehouse compute costs and shortens compilation times. Tobiko Cloud is the company's paid, enterprise-grade layer on top of the open-source core, adding team collaboration, virtual data environments, and governance features. The company's own materials cite Dune (a blockchain analytics platform) as a customer that switched from dbt to Tobiko.

### Thesis: why invest

Tobiko Data raised a $4.5m seed round from Unusual Ventures, followed by a $17.3m Series A in June 2024 led by Theory Ventures, with participation from Fivetran CEO George Fraser, Census CEO Boris Jabes, and MotherDuck CEO Jordan Tigani as individual investors, bringing total disclosed funding to $21.8m. Having the sitting CEOs of three well-known data-infrastructure companies invest personally is a meaningful signal of technical credibility within the data engineering community specifically, even though it does not resolve the harder commercial question of open-source-to-paid conversion.

The technical thesis, that state-aware incremental processing is a genuine improvement over dbt's default full-refresh model, is credible and well-articulated, and the founding team's combined Airbnb and Netflix data-platform experience is directly relevant. The core risk for this investment is not the technology; it is that dbt Labs remains the deeply entrenched incumbent in this exact category, with years of ecosystem lock-in, and open-source-to-commercial conversion in developer tooling is historically difficult to underwrite with confidence at this stage without disclosed revenue figures.

**What must be true:** SQLMesh's state-aware architecture must translate into large enough, provable cost savings that data teams actively migrate off dbt, which has high switching costs of its own; Tobiko Cloud must convert a meaningful share of the open-source user base into paying enterprise customers; the company must publish or disclose revenue and customer-count metrics that are currently absent from public sources; and the product must keep pace as dbt Labs continues to invest in its own incumbent platform.

**Next-round milestones:** disclosed ARR of at least $5m, 30 or more paying enterprise customers beyond Dune, published data on warehouse cost savings from real customer deployments, net revenue retention data, and continued open-source adoption growth (GitHub stars, downloads) as a leading indicator of the funnel.

### Founder bet

The bet is that three data-infrastructure engineers with direct Airbnb and Netflix platform-building experience can win developer mindshare away from dbt through demonstrably better technology, then convert that mindshare into a paid enterprise product before dbt Labs closes the technical gap. The personal investment from three sitting data-infrastructure CEOs is a strong credibility signal within the category; the absence of any disclosed revenue, ARR, or customer-count metric beyond one named logo (Dune) is the central gap that keeps this a price-sensitive call rather than a clear pursue.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market data engineering teams | 25,000 | $10,000 | $250m | HCP assumption |
| Enterprise data platforms | 6,000 | $50,000 | $300m | HCP assumption |
| Large / regulated enterprise data platforms | 800 | $250,000 | $200m | HCP assumption |
| **TAM** | 31,800 | | **$750m** | Annual data-transformation software pool |
| HCP penetration | | | **18.7% of TAM revenue** | Roughly 3,000 blended accounts |
| **2032 revenue opportunity** | | | **$140m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid accounts | 60 | 150 | 350 | 700 | 1,300 | 2,100 | 3,000 |
| Blended ARR per account | $15k | $18k | $22k | $27k | $32k | $37k | $47k |
| **Revenue** | **$1** | **$3** | **$8** | **$19** | **$42** | **$78** | **$140** |

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Tobiko Data** | Open-core data transformation; data/analytics engineers | X state-aware transformation, X open-source core, X managed cloud | OSS plus cloud SaaS | State-aware incremental processing reducing warehouse compute cost | Open source (SQLMesh/SQLGlot free); Tobiko Cloud pricing undisclosed | $17.3m Series A; $21.8m total; valuation undisclosed; Theory Ventures, Unusual Ventures |
| dbt Labs | Data transformation and modeling (dbt / dbt Cloud) | X transformation and modeling; No evidence state-aware incremental processing at SQLMesh's depth | OSS core plus cloud SaaS | Category-defining incumbent with the largest ecosystem and community | Free core; paid cloud tiers | Private; valuation not used |
| Dagster | Data orchestration with asset-aware modeling | X orchestration and asset lineage; Partial transformation-layer overlap | OSS plus cloud SaaS | Software-defined-assets orchestration model | Free core; paid cloud tiers | Private; capital data undisclosed here |
| Coalesce | Visual, git-backed data transformation | X transformation with visual/low-code layer; No evidence open-source core | Cloud SaaS | Visual data-modeling workflow for Snowflake-centric teams | Custom | Private; capital data undisclosed here |
| Snowflake (native transformation tooling) | Cloud data platform with built-in transformation features | Partial transformation; No evidence standalone state-aware framework | Cloud platform | Massive existing warehouse installed base | Bundled/usage | [Public](https://stockanalysis.com/stocks/snow/statistics/) |
| Y42 | Data transformation and orchestration platform | X transformation; Partial orchestration | Cloud SaaS | dbt-compatible managed platform | Custom | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Snowflake](https://stockanalysis.com/stocks/snow/statistics/) | 18.20x | Cloud data platform, adjacent transformation demand |
| [MongoDB](https://stockanalysis.com/stocks/mdb/statistics/) | 8.74x | Developer-oriented, open-source-rooted data infrastructure |
| [Confluent](https://stockanalysis.com/stocks/cflt/statistics/) | 8.73x | Open-core data infrastructure at public scale |
| [GitLab](https://stockanalysis.com/stocks/gtlb/statistics/) | 4.15x | Open-core developer software, direct monetization-model analog |
| [Elastic](https://stockanalysis.com/stocks/estc/statistics/) | 3.23x | Open-core developer/data infrastructure |
| **Median** | **8.73x** | HCP uses 4.0x, reflecting real open-source-to-paid conversion risk against the entrenched dbt incumbent |

| Return path | Base |
|---|---:|
| Entry post-money | $85m, HCP assumption |
| Initial ownership | 2.35% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.53% |
| 2032 revenue / exit multiple | $140m / 4.0x |
| Exit enterprise value | $560m |
| HCP proceeds / MOIC | $8.6m / **4.3x** |
| Downside / upside MOIC | 1.9x / 8.0x |

### Principal risks and why invest anyway

- **dbt incumbency:** dbt Labs owns the category dbt created and has years of ecosystem lock-in (packages, integrations, trained practitioners). Invest cautiously, at a lower entry price than the base case if possible, because the technical differentiation (state-aware processing) is real, but require disclosed revenue or paid-customer-count evidence before increasing conviction beyond Price-sensitive.
- **No disclosed commercial metrics:** public sources reviewed contain zero disclosed ARR, customer count, or revenue figures for Tobiko Cloud, the actual monetization vehicle, beyond one named open-source-to-paid logo (Dune). This is the single largest gap in this batch and the primary reason for the Price-sensitive label.
- **Open-source monetization risk:** SQLMesh and SQLGlot are free and can be self-hosted indefinitely. Underwrite the realistic conversion rate from open-source users to Tobiko Cloud customers using comparable open-core companies' disclosed conversion benchmarks in diligence, since none are available for Tobiko itself.
- **Investor signal versus commercial signal:** personal investment from three data-infrastructure CEOs (Fivetran, Census, MotherDuck) is a credibility signal within the practitioner community, not evidence of revenue. Do not substitute it for a data-room review of actual bookings.

---

## 10. Turso

**Stage:** Series A
**Proposed HCP check:** $2.0m
**Recommendation:** Watch
**Links:** [Company](https://turso.tech/) | [Funding aggregator record, unconfirmed by a company press release](https://tracxn.com/d/companies/turso/__9yiGkZbmMa-YcuYPa2835J-NujMZua-HZOqt-ap7kg8/funding-and-investors) | [Product overview](https://turso.tech/what-is-turso) | [Investors page](https://turso.tech/investors)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Glauber Costa | Co-founder and CEO | Company investors page identifies him as former VP of Field Engineering at ScyllaDB and a former staff engineer at Datadog. |
| Pekka Enberg | Co-founder and CTO | Company investors page identifies him as an early ScyllaDB employee and a former Linux kernel maintainer. |

### Product description

Turso is a Rust-rewritten, SQLite-compatible database (built on the company's open-source libSQL engine) designed around a "many-database" architecture: instead of one shared server process, each database is a lightweight, independently addressable file that can be created instantly, replicated globally, or synced to a device. This is aimed squarely at workloads traditional single-server databases handle poorly, including per-tenant database isolation for multi-tenant SaaS, per-agent memory and state for AI agents, edge applications needing low-latency local reads (Turso replicates across more than 35 regions), and on-device or local-first applications. Turso adds features standard SQLite lacks natively, including concurrent writes via multi-version concurrency control and built-in vector search for embeddings and retrieval-augmented generation. Pricing is self-serve and usage-based: a free tier supports up to 100 databases, a Developer plan is $4.99 per month for unlimited databases, and Scaler and Pro plans target growing and production teams respectively.

### Thesis: why invest

Turso (originally built under the name ChiselStrike before the product and company were renamed) has raised a $7m seed round and, per Crunchbase and PitchBook aggregator profiles, a roughly $26m Series A reported in early 2024; HCP found no company-issued press release or primary news article confirming the exact amount, date, or full investor list for the Series A, so this figure should be treated as third-party reported and unconfirmed pending diligence. Confirmed investors from the company's own investors page include Norwest Venture Partners, Blumberg Capital, Mango Capital, and a notable roster of individual technical angels (including the founders of Vercel, GitHub, Netlify, InfluxDB, Redpanda, and MotherDuck), which is a genuine positive signal of credibility within the developer-infrastructure community specifically.

The "many small databases" architecture is a real technical differentiation for multi-tenant SaaS and AI-agent workloads, and the founders' ScyllaDB and Linux-kernel systems background is directly relevant to building a credible database engine. The core concern is monetization: the product's own pricing page leads with a free tier (100 databases) and a $4.99-per-month developer tier, which is consistent with a self-serve, usage-based business that typically requires very high volume to produce meaningful revenue, and no disclosed ARR, revenue, or paying-customer figures were found in public sources.

**What must be true:** the free and near-free tiers must convert a meaningful share of high-volume developer usage into paid, revenue-generating accounts as usage scales; enterprise and platform-scale accounts (the higher-ACV segment in the model) must materialize beyond the self-serve base; Cloudflare D1 and other well-capitalized platform-native alternatives must not commoditize the edge-SQLite category before Turso reaches scale; and the company must confirm and clarify its funding status, which is unusually opaque for a company of this profile.

**Next-round milestones:** disclosed ARR of at least $8m to $10m, a clearly articulated enterprise/platform-tier customer base beyond self-serve developer accounts, confirmation of current funding status and runway, and evidence that per-tenant database volume is converting to paid usage at a rate that supports the unit economics the model assumes.

### Founder bet

The bet is that two credible systems engineers (ScyllaDB alumni, one a former Linux kernel maintainer) can turn a technically elegant reimagining of SQLite into a large self-serve developer business, the way other successful open-source-rooted infrastructure companies have. The strong angel investor roster from respected developer-tool founders supports the technical credibility case; the unresolved question, given the absence of any confirmed recent primary-source funding announcement and no disclosed revenue metrics, is whether the commercial motion is keeping pace with the technology.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Individual developers / small teams (self-serve, low ACV) | 200,000 | $600 | $120m | HCP assumption |
| Mid-market SaaS platforms (per-tenant database isolation) | 15,000 | $20,000 | $300m | HCP assumption |
| Enterprise / AI-platform accounts (agent memory, large multi-tenant scale) | 2,000 | $100,000 | $200m | HCP assumption |
| **TAM** | | | **$620m** | Annual edge/embedded database software pool |
| HCP penetration | | | **17.7% of TAM revenue** | Blended self-serve plus platform accounts |
| **2032 revenue opportunity** | | | **$110m** | HCP base case |

| Revenue, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 2 | 5 | 12 | 26 | 50 | 80 | 110 |
| Illustrative paid organizations (mostly low-ACV self-serve, with a growing enterprise tail) | 3k | 7k | 15k | 28k | 45k | 65k | 85k |

### Competitive landscape

| Company | Category / user | Capability and workflow | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Turso** | Edge SQLite-compatible database; app and AI-agent developers | X per-tenant DB isolation, X edge replication, X vector search | Cloud SaaS, OSS core (libSQL) | Rust-rewritten SQLite engine with a many-databases architecture | Free tier; $4.99/mo Developer; Scaler and Pro tiers undisclosed pricing | ~$7m seed plus a third-party-reported ~$26m Series A (unconfirmed by primary source); total and valuation undisclosed; Norwest, Blumberg Capital, Mango Capital |
| Cloudflare D1 | Edge-native SQLite database | X edge SQLite database; Partial per-tenant isolation at Turso's depth | Cloudflare Workers platform | Bundled distribution into Cloudflare's existing developer platform | Usage-based, bundled | [Public](https://stockanalysis.com/stocks/net/statistics/) |
| Supabase | Postgres-based backend-as-a-service | Partial SQLite-adjacent (Postgres, not SQLite); X broader backend platform | Cloud SaaS | Full backend-as-a-service bundle (auth, storage, functions) | Free tier plus paid | Private; capital data undisclosed here |
| PlanetScale | Serverless MySQL-compatible database | Partial multi-tenant scale; No evidence SQLite-compatible edge model | Cloud SaaS | Branching/schema-change workflow for MySQL | Usage-based | Private; valuation not used |
| Neon | Serverless Postgres | Partial per-branch database isolation; No evidence SQLite compatibility | Cloud SaaS | Instant branching and autoscaling for Postgres, acquired by Databricks in 2025 per public reporting | Usage-based | Private (Databricks subsidiary); capital not comparable |
| Fly.io (LiteFS) | Edge app hosting with distributed SQLite replication | X distributed SQLite replication; Partial standalone database-as-a-service product | Self-hosted on Fly.io platform | Deep integration with Fly.io's edge compute platform | Usage-based | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [Cloudflare](https://stockanalysis.com/stocks/net/statistics/) | 42.05x | Direct edge-infrastructure comp and D1 competitor |
| [Snowflake](https://stockanalysis.com/stocks/snow/statistics/) | 18.20x | Cloud data platform at premium growth |
| [Datadog](https://stockanalysis.com/stocks/ddog/statistics/) | 24.13x | Usage-based developer infrastructure |
| [MongoDB](https://stockanalysis.com/stocks/mdb/statistics/) | 8.74x | Developer-oriented database platform |
| [Fastly](https://stockanalysis.com/stocks/fsly/statistics/) | 5.07x | Edge/CDN developer infrastructure at smaller scale |
| **Median** | **18.20x** | HCP uses 4.5x, a roughly 75% discount reflecting unconfirmed funding recency, no disclosed revenue, and heavy free-tier cannibalization risk |

| Return path | Base |
|---|---:|
| Entry post-money | $110m, HCP assumption |
| Initial ownership | 1.82% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.18% |
| 2032 revenue / exit multiple | $110m / 4.5x |
| Exit enterprise value | $495m |
| HCP proceeds / MOIC | $5.8m / **2.9x** |
| Downside / upside MOIC | 1.4x / 5.4x |

### Principal risks and why invest anyway

- **Unconfirmed funding recency and terms:** HCP could not locate a company press release or primary news article confirming the Series A amount, date, or full investor list; all figures beyond the seed round and the investors page are third-party aggregator reports. Do not proceed without the company directly confirming current cap table, last round terms, and runway.
- **Free-tier cannibalization:** a $4.99-per-month developer tier and a generous free tier are attractive for adoption but create a real risk that usage grows faster than revenue. Underwrite the free-to-paid conversion rate explicitly and stress-test the model against a scenario where most usage stays on free or near-free tiers.
- **Platform-native competition:** Cloudflare can bundle D1 into a developer platform millions of engineers already use, at effectively zero incremental distribution cost. Turso's differentiation must be genuinely superior architecture, not just first-mover advantage, to survive this.
- **No disclosed revenue:** public sources contain no ARR, revenue, or paying-customer figures for Turso. Given this and the funding-recency gap, the appropriate posture is Watch: revisit only after the company discloses current metrics and confirms its funding status directly.

---

## Cross-batch decision framework

| Company | Core control point | Most important diligence test | 2032 revenue | Exit multiple | Base MOIC |
|---|---|---|---:|---:|---:|
| RunReveal | AI-native, cost-efficient security data platform | Founder background verification and gross margin durability at scale | $170m | 4.0x | 12.6x |
| Edera | Hypervisor-grade container/AI workload isolation | Performance overhead versus namespace containers and federal contract conversion | $190m | 5.5x | 9.1x |
| Twine Security | Trusted autonomous execution in identity/access workflows | Safety and audit framework for autonomous remediation actions | $160m | 4.5x | 8.5x |
| Estuary | Unified batch and streaming data movement runtime | Named enterprise references and switching evidence from incumbents | $220m | 5.0x | 7.9x |
| Nudge Security | Continuous SaaS/AI discovery plus behavioral governance | Durability of 3x ARR growth as base scales | $220m | 6.0x | 7.8x |
| Prophet Security | Agentic SOC triage with quantified accuracy metrics | Independent verification of disclosed metrics and win rate versus bundled incumbents | $280m | 6.0x | 6.4x |
| P0 Security | Agentless just-in-time cloud access for humans and machines | Founder background verification and current fundraising status | $130m | 4.5x | 5.4x |
| Aembit | Secretless, policy-based non-human identity | Reference breadth beyond Snowflake and current fundraising status | $200m | 5.0x | 5.4x |
| Tobiko Data | State-aware data transformation challenging dbt | Disclosed revenue and open-source-to-paid conversion evidence | $140m | 4.0x | 4.3x |
| Turso | Many-database architecture for multi-tenant and agentic apps | Confirmed funding status and free-to-paid conversion rate | $110m | 4.5x | 2.9x |

## Investment committee conclusion

HCP should prioritize RunReveal, Edera, Estuary, and Nudge Security for direct diligence; each combines a specific, defensible control point with credible investor or customer validation at an attractive assumed entry price. Twine Security and Prophet Security merit diligence with a specific focus on independently verifying disclosed operating metrics and, for Prophet, testing pricing sensitivity given its richer assumed entry valuation. P0 Security and Aembit are respectable non-human-identity and access plays worth pursuing at a lower price or with tighter terms, but both carry an unusual gap in verified founder background and a stale last-round date that diligence must close first. Tobiko Data has genuine technical credibility but no disclosed commercial metrics, warranting a lower entry price before increasing conviction. Turso should move to Watch until the company confirms its actual funding status and discloses basic revenue metrics; HCP should not underwrite meaningful capital against unconfirmed, aggregator-only financing data.

No memo should advance on public evidence alone. The next step for every company in this batch is a standardized data request covering cap table and terms, monthly revenue and gross margin, customer or account cohorts, retention, security and compliance posture, pipeline, and reference calls that specifically verify founder background where public sources left gaps (Aembit, P0 Security, RunReveal, Twine Security).

## Source and assumption notes

1. Company facts are sourced to official company pages, financing announcements, and independent reporting (TechCrunch, SecurityWeek, SiliconANGLE, Businesswire, PR Newswire, FinSMEs, CTech/Calcalist) linked within each memo. Company-reported operating metrics (customer counts, ARR growth rates, investigation counts, hours saved, and similar figures) are explicitly identified as company-reported and should be independently verified in diligence.
2. Public-company EV/LTM revenue multiples are point-in-time figures fetched from StockAnalysis on July 18, 2026, and can change daily. Refresh them immediately before an investment committee meeting. Multiples for MongoDB, Snowflake, Cloudflare, Datadog, and GitLab are reused from the reference ten-company memo set's same as-of date; all other tickers (CrowdStrike, Zscaler, Okta, SailPoint, Palo Alto Networks, Fortinet, SentinelOne, Rapid7, Tenable, Confluent, Elastic, Fastly, Varonis) were fetched fresh for this batch.
3. TAM calculations are HCP bottom-up underwriting models built from operating units (accounts, workloads, or usage) and assumed annual contract values. Unit counts and prices labeled HCP assumption are deliberately visible so the committee can replace them with management or third-party evidence.
4. No company in this batch publicly discloses a current post-money valuation. Every entry post-money figure is an HCP assumption for return testing, not a claim about actual financing terms; diligence should replace these with actual cap table data before any investment decision.
5. Turso's Series A amount and date could not be confirmed against a company press release or primary news article; HCP relied on Crunchbase and PitchBook aggregator snippets and the company's own (round-agnostic) investors page. This is flagged in the memo and should be resolved directly with the company before proceeding.
6. CyberArk (CYBR) was excluded from this batch's public comps because it was delisted following its acquisition by Palo Alto Networks, completed in February 2026 per StockAnalysis; its acquisition is noted qualitatively where relevant (P0 Security memo) instead.
7. Valuation references for competitors are intentionally omitted or marked undisclosed when reliable current public evidence was unavailable. No blank field should be interpreted as zero.
