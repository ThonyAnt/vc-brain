# HCP Investment Memos: Ten Seed and Series A Software Companies

**Prepared:** July 18, 2026  
**Scope:** Public-source underwriting only; no Crunchbase or PitchBook access  
**Target initial check:** $1.0 million to $2.5 million  
**Important:** Financing terms, ownership, revenue, penetration, dilution, and exit values labeled **HCP assumption** are underwriting inputs, not company disclosures. All dollars are U.S. dollars unless noted.

## Portfolio summary

| Rank | Company | Segment | Round screened | Proposed check | Base MOIC | Recommendation |
|---:|---|---|---|---:|---:|---|
| 1 | Mem0 | AI infrastructure | Series A | $2.5m | 21.8x | Pursue |
| 2 | Sekai | Consumer creation | Series A | $2.5m | 14.4x | Pursue, high variance |
| 3 | Alinea Invest | Consumer fintech | Series A | $2.0m | 11.9x | Pursue |
| 4 | Sett | Vertical AI, gaming | Series A | $2.5m | 10.2x | Pursue |
| 5 | Tailor | Enterprise ERP | Series A | $2.5m | 9.4x | Pursue |
| 6 | Cedar Money | Cross-border fintech | Seed | $2.0m | 9.0x | Pursue |
| 7 | Bevel | Consumer health | Series A | $2.0m | 8.6x | Diligence |
| 8 | Rwazi | Decision intelligence | Series A | $2.5m | 6.5x | Diligence |
| 9 | Phia | Consumer commerce | Series A | $2.5m | 5.3x | Price-sensitive |
| 10 | Twentyeight Health | Digital health | Series A | $2.0m | 5.1x | Diligence |

### Common model conventions

- Revenue is built from operating units, not a top-down market-growth percentage. Forecasts represent an HCP base case and are not management guidance.
- Entry ownership equals check divided by post-money valuation. Exit ownership equals entry ownership multiplied by one minus cumulative dilution.
- Exit enterprise value equals 2032 revenue multiplied by the selected EV/LTM revenue multiple. HCP proceeds equal exit enterprise value multiplied by exit ownership. MOIC equals proceeds divided by check. The model excludes preference effects, taxes, fees, secondary sales, and follow-on reserves.
- Public-comps multiples are snapshots as of July 18, 2026 from the linked StockAnalysis pages, whose financial statistics cite S&P Global Market Intelligence. Balance-sheet-heavy financial institutions are used cautiously because enterprise value is less comparable.
- Downside uses 60% of base exit revenue and one turn less on the multiple, with a 1.0x floor. Upside uses 150% of base exit revenue and one turn more. Dilution is held constant.
- Competitive tables use **X** only where the capability is verified, **Partial** where the product covers only part of the workflow, **No evidence** where public material does not support the claim, and **Undisclosed** for unavailable commercial or capital data.

---

## 1. Mem0

**Stage:** Series A  
**Proposed HCP check:** $2.5m  
**Recommendation:** Pursue  
**Links:** [Company](https://mem0.ai/) | [Documentation](https://docs.mem0.ai/introduction) | [Financing](https://techcrunch.com/2025/10/28/mem0-raises-24m-from-yc-peak-xv-and-basis-set-to-build-the-memory-layer-for-ai-apps/) | [Research paper](https://arxiv.org/abs/2504.19413)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Taranjeet Singh | Co-founder and CEO | Built Mem0 from an open-source project into a commercial memory layer; the company profile describes prior engineering and product experience. |
| Other founding team | Technical founding group | Public sources establish a small, engineering-led team, but the financing article is the cleanest source for current team composition. Confirm titles and vesting in diligence. |

### Product description

Mem0 provides a persistent memory layer for AI applications. Developers can store, retrieve, and update user, session, and agent memories without rebuilding that logic inside every application. The company offers a managed service, an open-source package, framework integrations, and OpenMemory for portable personal context. Its wedge is narrower than a vector database: Mem0 determines what should be remembered, how memories change, and which context should be retrieved. The product can reduce prompt size and latency while improving personalization across assistants, support agents, coding tools, and multi-agent systems.

### Thesis: why invest

The strongest infrastructure companies own a control point that every application repeatedly touches. Memory is becoming such a point for long-lived agents. Mem0 combines open-source distribution with a hosted control plane and is already showing developer pull: the October 2025 financing report cited 41,000 GitHub stars, 13 million package downloads, and API calls increasing from 35 million in Q1 to 186 million in Q3. The company now reports more than 100,000 developers and 58,000 GitHub stars on its [about page](https://mem0.ai/about-us).

The moat is not raw storage. It is the memory lifecycle: extraction, consolidation, conflict resolution, retrieval, evaluation, and observability across models and frameworks. The published paper reports better answer quality with materially lower latency and token cost, although HCP should reproduce those benchmarks on customer workloads. If Mem0 becomes the model-neutral memory standard, usage can compound as each customer adds agents, end users, and retained context.

**What must be true:** managed revenue must grow faster than self-hosted substitution; memory quality must remain differentiated as model vendors add native features; and enterprise buyers must accept a third party in a sensitive data path.

**Next-round milestones:** at least $15m to $20m ARR, net revenue retention above 130%, five or more referenceable deployments above $250k ARR, and evidence that gross margin remains above 75% after inference and storage costs.

### Founder bet

The bet is that an engineering-first team can turn unusually strong open-source adoption into an enterprise platform without alienating its community. The lean team and rapid API growth are positive signals. Diligence should focus on ownership of the core repository, security leadership, enterprise sales depth, and whether benchmark-driven developer enthusiasm converts into durable paid workloads.

### Market, TAM, and revenue build

The [CNCF and SlashData 2026 report](https://www.cncf.io/announcements/2026/03/24/cncf-and-slashdata-report-finds-cloud-native-community-reaches-nearly-20-million-developers/) estimates 19.9 million cloud-native developers, about 39% of developers globally. HCP narrows this to 250,000 production AI teams, then segments by spend.

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Small production AI teams | 220,000 | $6,000 | $1.32bn | HCP assumption: team plan plus usage |
| Mid-market AI platforms | 27,000 | $60,000 | $1.62bn | HCP assumption: multi-application deployment |
| Large enterprise AI estates | 3,000 | $500,000 | $1.50bn | HCP assumption: security, scale, and support |
| **TAM** | 250,000 |  | **$4.44bn** | One annual memory-platform pool |
| HCP penetration |  |  | **9.5% of TAM revenue** | 2,000 scaled accounts plus self-serve usage; aggressive but below 1% of global developer population |
| **2032 revenue opportunity** |  |  | **$420m** | HCP base case |

| Revenue driver, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid teams / enterprise accounts | 500 | 1,300 | 2,700 | 4,800 | 7,500 | 10,500 | 14,000 |
| Blended ARR per account | $12k | $14k | $17k | $19k | $23k | $27k | $30k |
| **Revenue** | **$6** | **$18** | **$45** | **$90** | **$170** | **$280** | **$420** |

### Competitive landscape

| Category / company | Model and primary user | Capability and workflow | Infrastructure / delivery | ICP and hardest-to-copy moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| Memory platform / **Mem0** | Usage SaaS plus OSS; AI developers | X extraction, update, retrieval, graph memory, evaluation | Managed API, OSS, integrations | Model-neutral memory lifecycle plus OSS distribution | Public tiers; enterprise custom | $20m Series A; $24m total; valuation undisclosed; Basis Set, Peak XV, Kindred, YC, GitHub Fund |
| Memory platform / Zep | SaaS plus OSS; agent teams | X temporal knowledge graph and memory | Cloud and self-hosted | Temporal context graph | Public and custom | Private; latest, total, and valuation undisclosed here |
| Agent architecture / Letta | SaaS plus OSS; developers | X stateful agents; Partial standalone memory service | Cloud and OSS | Stateful-agent research lineage | Public and custom | Private; valuation undisclosed |
| Knowledge engine / Cognee | SaaS plus OSS; data and AI teams | X graph-based memory and retrieval | Cloud and self-hosted | Data-ingestion-to-graph workflow | Undisclosed | Private; capital data undisclosed here |
| Framework feature / LangMem | OSS; LangGraph developers | Partial cross-framework memory; X within LangGraph | Library | Native LangChain ecosystem integration | Open source | Product of private LangChain |
| Personal memory / Supermemory | SaaS/API; developers and users | X personal content memory; Partial enterprise lifecycle | Hosted API and apps | Consumer content ingestion and retrieval | Public tiers | Private; valuation undisclosed |
| Storage substitute / Pinecone | Usage SaaS; developers | X vector retrieval; Partial memory lifecycle | Managed vector database | Scale, reliability, installed base | Usage based | Private; funding public, current valuation undisclosed |

**Position:** Mem0 can own memory policy above databases and below applications. The category risk is compression from both directions: databases can add memory features, while model and framework vendors can bundle them.

### Public comps and exit model

| Public comp | EV/LTM revenue | Relevance |
|---|---:|---|
| [MongoDB](https://stockanalysis.com/stocks/mdb/statistics/) | 8.74x | Developer database platform |
| [Snowflake](https://stockanalysis.com/stocks/snow/statistics/) | 18.20x | Cloud data platform |
| [Cloudflare](https://stockanalysis.com/stocks/net/statistics/) | 42.05x | Developer infrastructure at premium growth |
| [Datadog](https://stockanalysis.com/stocks/ddog/statistics/) | 24.13x | Usage-oriented developer platform |
| [GitLab](https://stockanalysis.com/stocks/gtlb/statistics/) | 4.15x | Open-core developer software |
| **Median** | **18.20x** | HCP uses 8.0x, a 56% discount |

| Return path | Base |
|---|---:|
| Entry post-money | $100m, HCP assumption |
| Initial ownership | 2.50% |
| Cumulative future dilution | 35%, HCP assumption |
| Exit ownership | 1.63% |
| 2032 revenue / exit multiple | $420m / 8.0x |
| Exit enterprise value | $3.36bn |
| HCP proceeds / MOIC | $54.6m / **21.8x** |
| Downside / upside MOIC | 11.5x / 36.9x |

### Principal risks and why invest anyway

- **Bundling:** OpenAI, Anthropic, Google, or agent frameworks can bundle memory. Invest because portability, governance, and cross-model persistence remain neutral-platform advantages.
- **OSS monetization:** adoption may not convert. Require cohort evidence for cloud conversion and paid expansion.
- **Security and privacy:** memories can contain sensitive data. Require SOC 2, deletion guarantees, regional controls, encryption, and prompt-injection testing.
- **Benchmark risk:** published results may not generalize. Reproduce evaluations on three production workloads before closing.

---

## 2. Sekai

**Stage:** Series A  
**Proposed HCP check:** $2.5m  
**Recommendation:** Pursue, high variance  
**Links:** [Company](https://sekai.ai/) | [Financing](https://www.axios.com/2026/06/01/sekai-mini-app-startup-funding) | [Product-growth account](https://www.geekwire.com/contributor-content/how-sekai-became-tiktok-for-software-in-under-three-months/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Lucky Zhang | Founder and CEO | Previously founded Yi+ AI, acquired by Apple, and Blacktail, acquired by ByteDance; Axios reports Sekai was founded in 2024. |

### Product description

Sekai is a consumer platform for creating, playing, and remixing AI-generated mini-apps. A user describes an interactive idea, the system builds an executable experience, and the result enters a feed where others can use or modify it. The product collapses coding, hosting, discovery, and collaboration into one loop. Unlike developer-first app builders, Sekai is designed for people who may never identify as programmers. Its most important asset could become a behavioral graph connecting prompts, components, remixes, play sessions, and creator followings across a new category of executable media.

### Thesis: why invest

AI makes software creation abundant, but distribution remains scarce. Sekai joins generation and distribution in a single consumer loop, similar to how TikTok joined video creation with an interest graph. Axios reported a $20m Series A in June 2026, co-led by Khosla Ventures and Connect Ventures, with a16z Speedrun, Mayfield, A*, MVP, 359 Capital, Parable, and 645 Ventures participating. A company-authored GeekWire contribution said Sekai was on track for two million mini-apps in under three months; treat this as a company claim until cohort data is reviewed.

The moat is not the coding model. It is the remix graph and distribution engine: which ideas convert, which components are reused, who plays them, and which creators retain an audience. If that loop compounds, model improvements lower creation cost for Sekai and competitors alike, while Sekai retains consumer demand.

**What must be true:** mini-apps must drive repeat play rather than novelty; creators must earn status or money; moderation must scale; and Sekai must monetize without choking the remix loop.

**Next-round milestones:** 10 million monthly active users, D30 creator retention above 20%, more than 25% of sessions from remixes or follows, $15m annualized revenue, and clear content-safety economics.

### Market, TAM, and revenue build

HCP uses a creator-spend model. The market is not all app-development spending; it is the subset of consumers and prosumers willing to pay for creation tools plus platform economics.

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Hobby creators | 40m | $60 | $2.40bn | HCP assumption: global addressable creator subset |
| Power creators / small studios | 5m | $300 | $1.50bn | HCP assumption |
| Platform take on creator commerce | $5bn GMV | 10% | $0.50bn | HCP assumption; avoids counting all digital goods |
| **TAM** |  |  | **$4.40bn** | Subscription and take-rate pool |
| HCP penetration |  |  | **9.1%** | 3.5m paid creators plus commerce take |
| **2032 revenue opportunity** |  |  | **$400m** | HCP base case |

| Revenue, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Subscription plus take rate | 6 | 18 | 45 | 90 | 160 | 260 | 400 |
| Illustrative paid creators | 100k | 280k | 650k | 1.2m | 2.0m | 2.8m | 3.5m |

### Competitive landscape

| Company | Category / user | Workflow coverage | Delivery | Hardest-to-copy advantage | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Sekai** | Consumer mini-app network | X create, host, discover, remix | Web and mobile | Consumer remix and interest graph | Undisclosed | $20m Series A; valuation and total funding undisclosed; Khosla, Connect, a16z Speedrun, Mayfield, A* |
| Roblox | UGC gaming platform | X create, distribute, monetize; Partial prompt-to-app | Apps plus Studio | Creator economy and massive player graph | Revenue share | Public |
| Replit | Developer app builder | X generate, deploy; Partial consumer discovery | Web/cloud | Integrated coding and deployment | Public tiers | Private; valuation not used |
| Lovable | Prompt-to-web-app builder | X generation and deployment; No evidence consumer feed | Web/cloud | Fast natural-language build loop | Public tiers | Private; valuation not used |
| Emergent | Agentic app builder | X generation and deployment; Partial discovery | Web/cloud | Full-stack autonomous build | Public tiers | Private; capital data undisclosed here |
| Anything | Mobile AI app builder | X mobile generation; Partial distribution | Mobile/web | Mobile-native creation | Public tiers | Private; capital data undisclosed here |
| Figma Make | Design-to-prototype | Partial executable apps; X collaborative design | Web/cloud | Design-system and team installed base | Bundled subscription | Public company product |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Roblox](https://stockanalysis.com/stocks/rblx/statistics/) | 6.72x |
| [Unity](https://stockanalysis.com/stocks/u/statistics/) | 6.67x |
| [AppLovin](https://stockanalysis.com/stocks/app/statistics/) | 23.31x |
| [Playtika](https://stockanalysis.com/stocks/pltk/statistics/) | 1.17x |
| [Take-Two](https://stockanalysis.com/stocks/ttwo/statistics/) | 6.75x |
| **Median** | **6.72x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $90m HCP assumption / 2.78% |
| Future dilution / exit ownership | 35% / 1.81% |
| 2032 revenue / multiple / EV | $400m / 5.0x / $2.00bn |
| HCP proceeds / MOIC | $36.1m / **14.4x** |
| Downside / upside MOIC | 6.9x / 26.0x |

### Principal risks and why invest anyway

- **Novelty decay:** mini-app creation may be a demo, not a habit. Gate investment on cohort retention and organic consumption.
- **Platform safety:** executable user content introduces fraud, IP, malware, and child-safety risk. Require sandboxing and moderation evidence.
- **Incumbent response:** Roblox, Apple, Google, and Meta own distribution. Sekai's chance rests on a new content primitive and remix graph, not superior foundation models.
- **Unproven monetization:** base revenue is entirely HCP-modeled. Structure milestones around paid conversion and creator economics.

---

## 3. Alinea Invest

**Stage:** Series A  
**Proposed HCP check:** $2.0m  
**Recommendation:** Pursue  
**Links:** [Company](https://www.alinea-invest.com/) | [Series A report](https://www.forbes.com/sites/nicolecasperson/2025/04/09/how-fintech-alinea-invest-used-storytelling-to-raise-104-million/) | [2026 financing update](https://www.alinea-invest.com/press/wealth-management-platform-alinea-secures-22-5-million-in-user-acquisition-financing-from-financial-services-firm-pvx-partners)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Eve Halimi | Co-founder and co-CEO | Built Alinea around accessible, culturally native investing for younger users. |
| Anam Lakhani | Co-founder and co-CEO | Leads the same consumer-finance mission; Forbes identifies both founders and the Series A syndicate. |

### Product description

Alinea is an SEC-registered investment adviser and mobile wealth platform aimed at first-time, younger investors, especially women. It packages investing into guided portfolios, thematic baskets, automation, education, and community rather than presenting a trading terminal. Brokerage custody is provided through infrastructure partners, allowing Alinea to focus on acquisition, advice, and experience. The wedge is behavioral: translate financial goals and cultural interests into a repeatable investing habit. In February 2026 the company reported more than two million downloads and secured $22.5m of user-acquisition financing from PVX Partners.

### Thesis: why invest

The April 2025 $10.4m Series A was led by Play Ventures with GFR, Y Combinator, Gaingels, FoundersX, F7 Ventures, and Visible Connect participating. Alinea can become the relationship layer for a cohort that distrusts traditional wealth brands but still needs to move from first deposit to retirement, credit, and advice. The differentiated asset is a high-intent behavioral dataset on novice investors and an acquisition engine tailored to their language and communities.

**What must be true:** funded-account conversion must rise faster than paid acquisition cost; assets and subscription revenue must expand with age; advice must remain compliant; and users must not graduate directly to free incumbent brokers.

**Next-round milestones:** 500,000 funded accounts, more than $1bn in advised assets, $20m annualized net revenue, CAC payback below 12 months, and 12-month funded-account retention above 70%.

### Market, TAM, and revenue build

The [U.S. Census Bureau](https://www.census.gov/newsroom/press-releases/2026/vintage-2025-pop-estimates.html) provides current age-cohort population estimates. HCP uses a narrower 40 million digital-first, investable U.S. prospect pool as an explicit underwriting assumption rather than treating an entire generation as addressable.

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Emerging investors | 32m | $60 | $1.92bn | HCP assumption: subscription and net platform revenue |
| Affluent emerging investors | 8m | $240 | $1.92bn | HCP assumption: higher balances and advice |
| **TAM** | 40m |  | **$3.84bn** | U.S. annual revenue pool |
| HCP penetration |  |  | **5.7%** | 2.8m monetized accounts, 7% of prospect pool |
| **2032 revenue opportunity** |  |  | **$220m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Monetized accounts | 200k | 330k | 550k | 900k | 1.4m | 2.0m | 2.8m |
| Net annual revenue/account | $60 | $67 | $73 | $78 | $79 | $80 | $79 |
| **Revenue, $m** | **12** | **22** | **40** | **70** | **110** | **160** | **220** |

### Competitive landscape

| Company | Category / use | Workflow | Delivery | ICP / moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Alinea** | Guided investing for first-time investors | X onboarding, portfolios, automation, education | Mobile RIA with partner custody | Gen Z women; culturally native acquisition and behavior graph | Public terms should be confirmed | $10.4m Series A; valuation and total equity undisclosed; Play Ventures, GFR, YC, Gaingels |
| Robinhood | Self-directed brokerage | X trading and cash; Partial guided advice | Mobile/web broker | Scale, liquidity, product breadth | Subscription plus transaction economics | Public |
| Acorns | Automated saving/investing | X roundups, portfolios, retirement | Mobile/web RIA | Habit automation and household bundle | Public subscription tiers | Private; valuation not used |
| Public | Social brokerage | X trading and community; Partial advice | Mobile/web broker | Investor community and multi-asset access | Membership and transaction economics | Private; valuation not used |
| Ellevest | Wealth platform for women | X advice and managed portfolios | Digital plus human advice | Brand and planning tailored to women | Public advisory pricing | Private; capital data undisclosed here |
| Wealthfront | Automated wealth management | X portfolios, cash, planning | Digital RIA | Tax automation and mature planning stack | AUM fee | Private subsidiary / transaction status should be refreshed |
| Betterment | Automated wealth management | X portfolios, retirement, adviser tools | Digital RIA | Scale and tax-aware automation | AUM and subscription fees | Private; valuation not used |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Robinhood](https://stockanalysis.com/stocks/hood/statistics/) | 18.29x |
| [SoFi](https://stockanalysis.com/stocks/sofi/statistics/) | 5.25x |
| [Coinbase](https://stockanalysis.com/stocks/coin/statistics/) | 6.19x |
| [Payoneer](https://stockanalysis.com/stocks/payo/statistics/) | 2.01x |
| **Median** | **5.72x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $60m HCP assumption / 3.33% |
| Future dilution / exit ownership | 35% / 2.17% |
| 2032 revenue / multiple / EV | $220m / 5.0x / $1.10bn |
| HCP proceeds / MOIC | $23.8m / **11.9x** |
| Downside / upside MOIC | 5.7x / 21.4x |

### Principal risks and why invest anyway

- **Economics:** downloads can mask low funded-account conversion. Underwrite only against account cohorts, contribution margin, and CAC payback.
- **Commodity execution:** incumbents can copy features. Alinea must own trust, community, and lifecycle data rather than baskets alone.
- **Regulatory:** personalized advice and social content create supervision risk. Require compliance testing and complaint data.
- **Financing quality:** PVX funding is user-acquisition financing, not validation of equity value. Model its covenants and repayment priority.

---

## 4. Sett

**Stage:** Series A  
**Proposed HCP check:** $2.5m  
**Recommendation:** Pursue  
**Links:** [Company](https://www.sett.ai/) | [Series A report](https://techcrunch.com/2025/05/07/game-sett-funding-a-startup-building-ai-agents-for-game-development-emerges-from-stealth-with-27m/) | [Investor profile](https://www.bvp.com/news/meet-the-founders-of-sett-amit-carmi-and-yoni-blumenfeld)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Amit Carmi | Co-founder | Gaming and technology operator building agentic creative workflows. |
| Yoni Blumenfeld | Co-founder | Co-developed Sett's performance-oriented AI approach; Bessemer profiles the pair. |

### Product description

Sett builds AI agents for mobile-game growth teams. Customers provide game assets and performance context; the platform produces video ads and interactive playable ads, then uses campaign outcomes to improve subsequent creative. This is more specific than a general image or video generator. Sett aims to own the closed loop from game understanding and asset generation to ad variation, deployment-ready output, and performance learning. The company starts in user acquisition, where return on ad spend is measurable, and can expand into live operations, in-game content, and broader studio workflows.

### Thesis: why invest

Sett emerged from stealth in May 2025 with $27m total funding, including a $15m Series A led by Bessemer Venture Partners and a prior $12m seed. Saga, vgames, F2 Venture Capital, and Akin also participated. Gaming is an attractive vertical for agentic software because outputs are digital, iteration is constant, and value is directly measured through acquisition economics.

The moat is the performance feedback loop. Generic models can generate assets, but Sett can learn which mechanics, pacing, characters, and messages convert for a specific game and audience. If customers let the platform see campaign results, every production cycle improves the next.

**What must be true:** generated playables must materially shorten production cycles; creative lift must persist after novelty; platform and ad-network policy must allow scaled deployment; and Sett must broaden beyond a narrow UA budget.

**Next-round milestones:** $20m ARR, more than 100 studio customers, 130% net retention, gross margin above 75%, and statistically credible improvement in cost per install or return on ad spend.

### Market, TAM, and revenue build

| Bottom-up step | Units | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Emerging mobile studios | 8,000 | $60,000 | $480m | HCP assumption: creative automation package |
| Scaled publishers | 1,500 | $400,000 | $600m | HCP assumption: multiple titles and teams |
| Global platforms / majors | 200 | $2.0m | $400m | HCP assumption: enterprise deployment |
| **TAM** | 9,700 |  | **$1.48bn** | Annual software and managed-generation pool |
| HCP penetration |  |  | **16.9% of TAM revenue** | About 500 scaled customer equivalents |
| **2032 revenue opportunity** |  |  | **$250m** | HCP base case |

| Revenue, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 6 | 16 | 35 | 70 | 120 | 180 | 250 |
| Illustrative customers | 40 | 80 | 150 | 250 | 350 | 430 | 500 |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Sett** | AI game-growth agents | X video and playable creation; X performance loop if integrated | SaaS | Game-specific feedback data | Undisclosed | $15m Series A; $27m total; valuation undisclosed; Bessemer, Saga, vgames, F2, Akin |
| AppLovin SparkLabs | Ad creative inside ad stack | X creative and distribution | Cloud platform | Advertiser and auction data | Spend based | Public company product |
| Unity | Game engine and ads | X creation infrastructure; Partial automated UA creative | Engine and cloud | Installed base and engine telemetry | Subscription and ad economics | Public |
| Layer AI | Game-asset generation | X asset workflows; Partial performance loop | SaaS | Studio asset consistency | Undisclosed | Private; capital data undisclosed here |
| Scenario | Custom game-image models | X consistent assets; No evidence end-to-end UA | SaaS/API | Style-consistent custom models | Public tiers | Private; valuation undisclosed |
| Ludo.ai | Game ideation and research | X ideation; Partial production | SaaS | Game-design intelligence corpus | Public tiers | Private; capital data undisclosed here |
| Promethean AI | 3D environment production | X art-production assistance; No evidence UA loop | Desktop integrations | 3D scene workflow | Public/custom | Private; capital data undisclosed here |

### Public comps and exit model

The selected gaming-tech group is [Roblox](https://stockanalysis.com/stocks/rblx/statistics/) 6.72x, [Unity](https://stockanalysis.com/stocks/u/statistics/) 6.67x, [AppLovin](https://stockanalysis.com/stocks/app/statistics/) 23.31x, [Playtika](https://stockanalysis.com/stocks/pltk/statistics/) 1.17x, and [Take-Two](https://stockanalysis.com/stocks/ttwo/statistics/) 6.75x. Median EV/LTM revenue is **6.72x**; HCP uses 5.0x.

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $80m HCP assumption / 3.13% |
| Future dilution / exit ownership | 35% / 2.03% |
| 2032 revenue / multiple / EV | $250m / 5.0x / $1.25bn |
| HCP proceeds / MOIC | $25.4m / **10.2x** |
| Downside / upside MOIC | 4.9x / 18.3x |

### Principal risks and why invest anyway

- **Platform capture:** AppLovin and Unity control distribution. Sett must prove independent optimization produces enough lift to overcome bundling.
- **Creative saturation:** competitors may converge on the same model outputs. Proprietary performance data and game-specific learning are the defense.
- **Customer concentration:** large publishers can dominate revenue. Cap single-customer exposure and test renewal economics.
- **IP:** training data and generated assets may create ownership claims. Require provenance, indemnification, and studio permissions.

---

## 5. Tailor

**Stage:** Series A  
**Proposed HCP check:** $2.5m  
**Recommendation:** Pursue  
**Links:** [Company](https://www.tailor.tech/) | [Series A report](https://techcrunch.com/2025/06/30/tailor-a-headless-erp-startup-raises-22m-series-a/) | [Headless ERP product](https://www.tailor.tech/headless-erp)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Yo Shibata | Co-founder and CEO | Enterprise-software founder leading a U.S. and Japan go-to-market. |
| Misato Takahashi | Co-founder and CTO | Technical leader behind Tailor's API-first transaction architecture. |

### Product description

Tailor is a headless, composable enterprise resource planning platform. Rather than forcing a retailer or business-to-business operator into a monolithic suite, it exposes inventory, order, procurement, fulfillment, and finance workflows through granular APIs and configurable applications. It integrates with systems such as Shopify, Odoo, and QuickBooks and is designed for real-time synchronization and agent access. The wedge is operational flexibility: customers can replace a painful workflow first, preserve existing systems, and expand modules over time without undertaking a single high-risk ERP migration.

### Thesis: why invest

Tailor raised a $22m Series A in June 2025 from ANRI, JIC Venture Growth Investments, NEA, Spiral Capital, and Y Combinator, among others. TechCrunch reported roughly 50 employees and operations across San Francisco and Tokyo. The timing is compelling: AI agents need clean, permissioned read-and-write access to orders, inventory, suppliers, and financial events. Legacy ERP APIs were built mainly for integration, not autonomous action.

Tailor's moat can be workflow ownership without forcing full system replacement, similar to the Krida pattern. Once Tailor becomes the transaction layer connecting commerce and finance, customers accumulate schemas, permissions, integrations, and operating logic that are hard to move.

**What must be true:** modular adoption must expand into a system of record; implementation must remain partner-scalable; the product must win against modern mid-market suites, not only legacy frustration; and agent access must be auditable.

**Next-round milestones:** $20m ARR, 100 enterprise customers, more than 120% net retention, implementation under 90 days for the core package, and at least 30% of customers using three or more modules.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Mid-market commerce operators | 35,000 | $60,000 | $2.10bn | HCP assumption: U.S. and Japan initial ICP |
| Larger multi-entity operators | 8,000 | $250,000 | $2.00bn | HCP assumption |
| Enterprise deployments | 1,000 | $1.0m | $1.00bn | HCP assumption |
| **TAM** | 44,000 |  | **$5.10bn** | Annual software pool |
| HCP penetration |  |  | **4.7%** | Roughly 800 blended customers |
| **2032 revenue opportunity** |  |  | **$240m** | HCP base case |

| Revenue, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 6 | 14 | 30 | 60 | 105 | 165 | 240 |
| Illustrative customers | 60 | 115 | 210 | 350 | 500 | 650 | 800 |

### Competitive landscape

| Company | Category / use | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Tailor** | Composable ERP | X inventory, orders, procurement, integrations | API-first cloud | Incremental workflow ownership plus agent-ready transaction graph | Undisclosed | $22m Series A; valuation and total undisclosed; ANRI, JIC VGI, NEA, Spiral, YC |
| NetSuite | Cloud ERP | X broad ERP | Multi-tenant cloud | Suite breadth and installed base | Custom | Oracle product |
| SAP Business One | Mid-market ERP | X broad ERP | Cloud/partner hosted | Global channel and process depth | Custom | SAP product |
| Microsoft Dynamics 365 | ERP/CRM suite | X broad workflows | Cloud | Microsoft distribution and ecosystem | Public modules/custom | Microsoft product |
| Acumatica | Cloud ERP | X mid-market ERP | Cloud and partner channel | Industry editions and channel | Custom | Private business; capital status not relevant here |
| Odoo | Open-core ERP | X broad modular workflows | Cloud/self-hosted | Module breadth and open ecosystem | Public tiers | Private; valuation not used |
| Cin7 | Inventory and order management | X commerce operations; Partial finance | Cloud | Commerce integrations | Public/custom | Private; valuation not used |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Oracle](https://stockanalysis.com/stocks/orcl/statistics/) | 7.42x |
| [SAP](https://stockanalysis.com/stocks/sap/statistics/) | 4.24x |
| [Workday](https://stockanalysis.com/stocks/wday/statistics/) | 3.57x |
| [Manhattan Associates](https://stockanalysis.com/stocks/manh/statistics/) | 8.62x |
| [Shopify](https://stockanalysis.com/stocks/shop/statistics/) | 12.49x |
| **Median** | **7.42x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $100m HCP assumption / 2.50% |
| Future dilution / exit ownership | 35% / 1.63% |
| 2032 revenue / multiple / EV | $240m / 6.0x / $1.44bn |
| HCP proceeds / MOIC | $23.4m / **9.4x** |
| Downside / upside MOIC | 4.7x / 16.4x |

### Principal risks and why invest anyway

- **Implementation drag:** ERP businesses can become services-heavy. Require gross margin by cohort and partner-delivered implementation evidence.
- **Suite response:** incumbents can expose more APIs. Tailor must prove faster configuration and safer agent write access.
- **Fragmented product:** headless flexibility can shift complexity to customers. Standardized industry packages are essential.
- **Geographic split:** U.S. and Japan expansion can dilute focus. Tie capital to one repeatable ICP and a clear partner strategy.

---

## 6. Cedar Money

**Stage:** Seed  
**Proposed HCP check:** $2.0m  
**Recommendation:** Pursue  
**Links:** [Company](https://www.cedar.money/us) | [Company financing announcement](https://www.cedar.money/news-updates/cedar-money-raises-9-9m-seed-to-simplify-high-volume-cross-border-b2b-payments-for-africans) | [Financing report](https://techcrunch.com/2025/01/30/qed-seeds-9-9m-in-cedar-money-a-stablecoin-payment-platform/)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Benjy Feinberg | Founder and CEO | Built Cedar after experiencing cross-border payment friction in African trade; public sources identify him as founder. |

### Product description

Cedar Money provides high-value, cross-border business payments for companies operating in and around African markets. Customers use conventional fiat workflows for virtual accounts, collections, foreign exchange, invoice settlement, and bulk payouts, while Cedar can use stablecoin rails behind the scenes to improve speed and liquidity. The product reaches more than 130 countries and targets importers, exporters, and other businesses moving repeated, high-value payments. Its value is not exposure to crypto. It is a compliant abstraction layer across fragmented banking, foreign-exchange, local-payout, and treasury infrastructure.

### Thesis: why invest

Cedar raised a $9.9m seed round in January 2025 led by QED Investors, with Lattice, NIV, Stellar, Wischoff Ventures, and others. TechCrunch reported tens of millions of dollars in monthly payment volume. The opportunity is to own the invoice-to-settlement workflow for businesses that are poorly served by correspondent banking and consumer remittance products.

The moat is corridor depth: compliance rules, bank and liquidity relationships, local payout performance, treasury routing, and failure-resolution data. Stablecoins reduce settlement friction but are not themselves durable differentiation. Cedar wins if customers see a reliable treasury product and never need to manage the rail.

**What must be true:** take rate and gross profit must survive competition; compliance must scale across corridors; stablecoin partners must not create hidden counterparty risk; and volumes must be diversified across customers and currencies.

**Next-round milestones:** $3bn annualized payment volume, $12m net revenue run rate, gross take rate above 35 basis points, positive contribution margin after losses and compliance, and no customer above 15% of volume.

### Market, TAM, and revenue build

HCP uses eligible payment volume rather than a third-party market-research estimate.

| Bottom-up step | Annual flow | Eligible share | Net take | Result | Basis |
|---|---:|---:|---:|---:|---|
| Africa-linked import and supplier payments | $500bn | 20% | 0.35% | $350m | HCP assumption; high-value business flows suitable for Cedar |
| Regional and global service payments | $150bn | 25% | 0.45% | $169m | HCP assumption |
| **TAM** |  |  |  | **$519m** | One annual net-revenue pool |
| HCP penetration |  |  |  | **38.5%** | $50bn to $60bn volume at a blended 35 to 40 bps; high and requires category leadership |
| **2032 revenue opportunity** |  |  |  | **$200m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Payment volume, $bn | 0.8 | 2.1 | 4.8 | 10 | 20 | 34 | 53 |
| Net take rate | 0.38% | 0.38% | 0.38% | 0.40% | 0.38% | 0.37% | 0.38% |
| **Revenue, $m** | **3** | **8** | **18** | **40** | **75** | **125** | **200** |

### Competitive landscape

| Company | Category / primary use | Workflow | Infrastructure | ICP / moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Cedar Money** | Africa-linked B2B payments | X collection, FX, invoice settlement, payouts | Fiat UX with stablecoin and banking rails; registered with FinCEN and FINTRAC per company site | Importers/exporters; corridor compliance and routing | FX/take rate; exact pricing undisclosed | $9.9m seed; valuation and total undisclosed; QED, Lattice, NIV, Stellar, Wischoff |
| Airwallex | Global business accounts and payments | X accounts, cards, FX, payouts | Proprietary global payments network | Broad licenses, product suite, scale | Public/custom | Private; latest valuation not used |
| Wise Business | International transfers and accounts | X FX and payouts; Partial Africa corridor depth | Bank and local-payment network | Brand, liquidity, low-cost routing | Transparent transaction fees | Public |
| Verto | Emerging-market B2B FX/payments | X FX, accounts, payouts | Banking and liquidity network | Emerging-market corridor specialization | Custom | Private; valuation undisclosed |
| BVNK | Stablecoin payments infrastructure | X stablecoin orchestration; Partial invoice workflow | API and treasury network | Stablecoin liquidity and enterprise APIs | Custom | Private; valuation not used |
| Conduit | Cross-border B2B payment network | X treasury and settlement | Stablecoin-enabled API/network | Emerging-market treasury routing | Custom | Private; capital data undisclosed here |
| dLocal | Emerging-market merchant payments | X pay-ins and payouts; Partial importer workflow | Local payment network | Country coverage and enterprise distribution | Take rate | Public |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Payoneer](https://stockanalysis.com/stocks/payo/statistics/) | 2.01x |
| [Flywire](https://stockanalysis.com/stocks/flyw/statistics/) | 2.77x |
| [dLocal](https://stockanalysis.com/stocks/dlo/statistics/) | 2.84x |
| [Remitly](https://stockanalysis.com/stocks/rely/statistics/) | 2.59x |
| **Median** | **2.68x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $40m HCP assumption / 5.00% |
| Future dilution / exit ownership | 40% / 3.00% |
| 2032 revenue / multiple / EV | $200m / 3.0x / $600m |
| HCP proceeds / MOIC | $18.0m / **9.0x** |
| Downside / upside MOIC | 3.6x / 18.0x |

### Principal risks and why invest anyway

- **Compliance and licensing:** a failure can halt corridors. Map every regulated entity, sponsor bank, safeguarding arrangement, and customer-money flow.
- **Stablecoin dependency:** depegs, freezes, or partner failures can create losses. Require exposure limits and reconciled, short-duration treasury.
- **Low gross margins:** high volume can hide weak economics. Underwrite gross profit after FX, liquidity, fraud, and operations.
- **Working capital:** settlement timing can consume cash. Stress test five-day disruptions and top-corridor closures.

---

## 7. Bevel

**Stage:** Series A  
**Proposed HCP check:** $2.0m  
**Recommendation:** Diligence  
**Links:** [Company](https://www.bevel.health/) | [Series A report](https://techcrunch.com/2025/10/30/bevel-raises-10m-series-a-from-general-catalyst-for-its-ai-health-companion/) | [Pricing](https://help.bevel.health/en/articles/11583937) | [Company profile](https://www.bevel.health/about-us)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Grey Nguyen | Co-founder | Product and engineering leader building a unified consumer-health interface. |
| Ben Yang | Co-founder | Co-built Bevel's consumer product and data experience. |
| Aditya Agarwal | Co-founder / board member | Experienced technology executive; TechCrunch reports his involvement at the Series A. |

### Product description

Bevel is a consumer health application that turns data from phones, wearables, health records, and user inputs into a daily health companion. It combines recovery, sleep, strain, stress, nutrition, strength training, biological-age, and AI guidance in one interface. Bevel does not require proprietary hardware and can work with existing devices, which lowers adoption friction and expands its data surface. The product is positioned above dashboards: it seeks to maintain a longitudinal health graph, explain tradeoffs, and recommend actions that connect fitness, sleep, nutrition, and medical context.

### Thesis: why invest

Bevel raised a $10m Series A from General Catalyst in October 2025. TechCrunch reported more than 100,000 daily active users, eightfold annual growth, average use of eight opens per day, and more than 80% 90-day retention. Those are unusually strong disclosed engagement signals for a paid consumer-health application, although HCP must verify definitions and cohorts.

Hardware independence is strategically useful. Oura and Whoop optimize around their own sensors; Apple and Garmin optimize ecosystems. Bevel can become the interpretation and action layer across them. Its moat would be a permissioned, longitudinal health graph combined with high-frequency user feedback, not any single readiness score.

**What must be true:** engagement must convert to paid subscriptions; recommendations must be trusted and safe; platform APIs must remain available; and device makers must not fully absorb the interpretation layer.

**Next-round milestones:** 250,000 paying subscribers, $25m ARR, annual churn below 25%, blended CAC payback below nine months, and validated improvement in at least two user outcomes.

### Market, TAM, and revenue build

| Bottom-up step | Users | Annual value | Result | Basis |
|---|---:|---:|---:|---|
| Engaged wearable and quantified-self users | 25m | $100 | $2.50bn | HCP assumption: U.S. and English-speaking priority markets |
| Premium health-coaching users | 5m | $240 | $1.20bn | HCP assumption: advanced AI and records tier |
| **TAM** | 30m |  | **$3.70bn** | Subscription revenue pool |
| HCP penetration |  |  | **5.9%** | 1.8m blended paid users |
| **2032 revenue opportunity** |  |  | **$220m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Paid users | 40k | 100k | 210k | 410k | 750k | 1.2m | 1.8m |
| Net annual revenue/user | $100 | $100 | $105 | $110 | $113 | $117 | $122 |
| **Revenue, $m** | **4** | **10** | **22** | **45** | **85** | **140** | **220** |

Bevel's published Pro price is $14.99 monthly or $99.99 annually. The modeled net value allows annual-plan mix, app-store fees, discounts, and a future premium tier.

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Bevel** | Cross-device health companion | X recovery, sleep, strain, nutrition, AI, records | iOS app using device and health-data integrations | Longitudinal cross-device health graph and engagement | Free; Pro $14.99 monthly or $99.99 annual | $10m Series A; total and valuation undisclosed; General Catalyst |
| Oura | Ring plus health app | X sleep/recovery; Partial nutrition and training | Proprietary hardware and app | Sensor data, installed base, research | Hardware plus membership | Private; valuation not used |
| Whoop | Strap plus coaching | X strain/recovery/sleep | Proprietary hardware and app | Athlete brand and high-frequency sensor data | Membership | Private; valuation not used |
| Apple Health / Fitness | Device health ecosystem | X data aggregation; Partial cross-domain coaching | Native iOS/watchOS | Default distribution and device data | Bundled/hardware | Public company product |
| Athlytic | Apple Watch analytics | X recovery and training; Partial health records | iOS app | Focused Apple Watch analytics | Public subscription | Private/independent; capital undisclosed |
| Gentler Streak | Fitness and recovery app | X activity guidance; Partial medical context | Apple ecosystem app | Consumer design and training guidance | Public subscription | Private/independent; capital undisclosed |
| Welltory | Health and stress analytics | X stress and wearable aggregation; Partial unified coaching | Mobile app | Broad device integrations | Freemium subscription | Private; valuation undisclosed |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Hims & Hers](https://stockanalysis.com/stocks/hims/statistics/) | 3.37x |
| [LifeMD](https://stockanalysis.com/stocks/lfmd/statistics/) | 0.89x |
| [Teladoc](https://stockanalysis.com/stocks/tdoc/statistics/) | 0.79x |
| [Doximity](https://stockanalysis.com/stocks/docs/statistics/) | 4.85x |
| **Median** | **2.13x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $50m HCP assumption / 4.00% |
| Future dilution / exit ownership | 35% / 2.60% |
| 2032 revenue / multiple / EV | $220m / 3.0x / $660m |
| HCP proceeds / MOIC | $17.2m / **8.6x** |
| Downside / upside MOIC | 3.4x / 17.2x |

### Principal risks and why invest anyway

- **Platform dependency:** Apple, Oura, and Garmin can restrict data or bundle analysis. Diversify integrations and measure data-source concentration.
- **Clinical boundary:** wellness recommendations can drift toward medical claims. Require clinical governance and conservative product language.
- **Retention quality:** verify that the reported 90-day figure refers to representative activated cohorts, not a selected segment.
- **IP litigation:** a 2026 report describes a Whoop suit involving Bevel. Obtain counsel's view on claims, insurance, cost, and product-design exposure before investing.

---

## 8. Rwazi

**Stage:** Series A  
**Proposed HCP check:** $2.5m  
**Recommendation:** Diligence  
**Links:** [Company](https://www.rwazi.com/) | [Series A report](https://techcrunch.com/2025/07/15/rwazi-raises-12m-series-a-to-help-companies-with-consumer-insights-and-intelligence/) | [Lumora product](https://rwazi.com/products/lumora) | [About](https://www.rwazi.com/about)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Joseph Rutakangwa | Co-founder and CEO | Built Rwazi around real-world, zero-party consumer data and decision intelligence. |
| Eric Sewankambo | Co-founder | Co-developed the company's distributed data and market-insight operation. |

### Product description

Rwazi is a decision-intelligence platform that combines proprietary, directly reported consumer data with AI analysis. Its Lumora product helps brands detect demand shifts, compare competitors, test expansion, and decide where to allocate commercial resources. The company says its data coverage spans more than 190 countries and cites customers including Coca-Cola, Pampers, Visa, and Nestlé. Unlike web-traffic or panel-only tools, Rwazi emphasizes zero-party observations from people in physical markets, then turns that evidence into recommendations for strategy, product, marketing, and distribution teams.

### Thesis: why invest

Rwazi raised a $12m Series A led by Bonfire Ventures in July 2025, with Santa Barbara Venture Partners, Newfund, and Alumni Ventures participating; TechCrunch reported a prior $4m seed. Traditional market research is slow, project-based, and backward-looking. Rwazi can transform it into a persistent software workflow where new observations update decisions continuously.

The moat is the combination of a verified collection network, historical physical-world data, and a decision layer trained on which recommendations prove useful. A chatbot over syndicated data is easy to copy. A trusted network that can collect a new, targeted observation in Lagos, Jakarta, or Lima and connect it to a customer's decision is harder.

**What must be true:** data must be representative and fraud-resistant; customers must renew as software rather than projects; AI recommendations must be traceable to evidence; and collection economics must support software margins.

**Next-round milestones:** $20m ARR, 100 enterprise customers, net retention above 120%, at least 70% recurring subscription revenue, gross margin above 70%, and documented decision impact at ten global accounts.

### Market, TAM, and revenue build

| Bottom-up step | Accounts | Annual contract | Result | Basis |
|---|---:|---:|---:|---|
| Regional consumer brands | 8,000 | $75,000 | $600m | HCP assumption |
| Global brands and financial-services firms | 2,000 | $350,000 | $700m | HCP assumption |
| Strategic enterprise platforms | 300 | $1.0m | $300m | HCP assumption |
| **TAM** | 10,300 |  | **$1.60bn** | Annual software and data pool |
| HCP penetration |  |  | **12.5%** | Roughly 500 blended accounts |
| **2032 revenue opportunity** |  |  | **$200m** | HCP base case |

| Revenue, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 9 | 18 | 35 | 60 | 95 | 140 | 200 |
| Illustrative customers | 60 | 100 | 170 | 250 | 340 | 420 | 500 |

### Competitive landscape

| Company | Category / use | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Rwazi** | Decision AI using zero-party data | X collection, analysis, recommendations | SaaS plus distributed data network | Proprietary physical-world observations and verification | Undisclosed | $12m Series A; at least $16m disclosed total; valuation undisclosed; Bonfire, Santa Barbara, Newfund, Alumni |
| Ipsos | Global research and panels | X collection and analysis; Partial always-on software | Services plus platforms | Global panels, methods, brand | Custom/project | Public |
| NIQ / GfK | Consumer and retail measurement | X syndicated measurement | Data subscriptions | Retail data relationships and longitudinal coverage | Custom | Private enterprise; capital not comparable |
| Kantar | Brand and consumer research | X research and analytics | Services/data platforms | Global benchmarks and customer relationships | Custom | Private enterprise |
| Euromonitor | Market intelligence | X syndicated data; Partial primary zero-party collection | Subscription platform | Global category database | Custom | Private enterprise |
| Attest | Agile consumer research | X survey collection and analysis | SaaS/panel | Fast self-serve research workflow | Custom | Private; valuation undisclosed |
| Toluna | Consumer panels and insights | X global panel and research workflow | SaaS/services | Panel scale and enterprise distribution | Custom | Private; capital data undisclosed here |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Similarweb](https://stockanalysis.com/stocks/smwb/statistics/) | 2.02x |
| [Semrush](https://stockanalysis.com/stocks/semr/statistics/) | 3.49x |
| [ZoomInfo](https://stockanalysis.com/stocks/gtm/statistics/) | 1.85x |
| [Gartner](https://stockanalysis.com/stocks/it/statistics/) | 1.71x |
| [HubSpot](https://stockanalysis.com/stocks/hubs/statistics/) | 3.04x |
| **Median** | **2.02x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $60m HCP assumption / 4.17% |
| Future dilution / exit ownership | 35% / 2.71% |
| 2032 revenue / multiple / EV | $200m / 3.0x / $600m |
| HCP proceeds / MOIC | $16.3m / **6.5x** |
| Downside / upside MOIC | 2.6x / 13.0x |

### Principal risks and why invest anyway

- **Data quality:** distributed collection invites fraud and bias. Audit sampling, geolocation, identity, incentives, and independent validation.
- **Services leakage:** custom studies can inflate revenue but depress scalability. Separate subscription, data, and service gross margin.
- **Incumbent datasets:** NIQ, Kantar, and Ipsos have deeper history. Rwazi must win on speed, hard-to-reach markets, and decision workflow.
- **AI explainability:** recommendations without source traceability will not support high-stakes decisions. Require evidence-linked outputs and human review.

---

## 9. Phia

**Stage:** Series A  
**Proposed HCP check:** $2.5m  
**Recommendation:** Price-sensitive  
**Links:** [Company](https://phia.com/) | [Official Series A announcement](https://www.globenewswire.com/news-release/2026/01/27/3226735/0/en/Phia-Raises-35M-Series-A-to-Build-the-AI-Alignment-Layer-for-Commerce.html)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Phoebe Gates | Co-founder | Consumer and brand leader building a cross-retailer shopping product. |
| Sophia Kianni | Co-founder | Co-built Phia's consumer acquisition and mission-driven brand. |

### Product description

Phia is an AI shopping platform that helps consumers compare products and prices across retailers while giving brands a performance channel. The company describes an alignment layer connecting shopper preferences with more than 6,200 brands. Consumers use Phia to discover alternatives and make purchase decisions; brands use the platform to improve acquisition, conversion, order value, and returns. The core asset is a normalized, real-time product graph joined to intent and transaction signals. If successful, Phia becomes an intermediary between search, social discovery, merchant catalogs, and checkout rather than another affiliate-content site.

### Thesis: why invest

Phia announced a $35m Series A in January 2026 at a $185m valuation, led by Notable Capital with Khosla Ventures and Kleiner Perkins. The company said it launched in April 2025, had more than one million users and 6,200 brands, facilitated billions of dollars in GMV exposure, generated monthly sales in the millions, and grew revenue elevenfold. It also reported brand outcomes including higher conversion and order value and lower returns. These are company-reported metrics and require data-room validation.

The product can benefit from a two-sided learning loop: consumer actions improve ranking and matching; brand integrations deepen catalog, inventory, and conversion data; better matches increase consumer trust and merchant ROI. The concern is price. At the disclosed $185m valuation, even a strong operating outcome produces only a mid-single-digit base MOIC for a $2.5m check.

**What must be true:** consumer retention must be independent of paid influencers; merchant economics must be incremental; affiliate dependence must not cap margin; and product data must remain accurate across retailers.

**Next-round milestones:** five million monthly active shoppers, $50m annualized net revenue, more than 50% direct merchant integrations, positive contribution margin, and repeat-shopping cohorts showing durable frequency.

### Market, TAM, and revenue build

| Bottom-up step | Commerce volume | Monetizable share | Net rate | Result | Basis |
|---|---:|---:|---:|---:|---|
| Fashion, beauty, and lifestyle e-commerce | $500bn | 20% | 5% | $5.0bn | HCP assumption: attributable Phia-influenced GMV |
| Brand software / insights | 10,000 brands |  | $50,000 ACV | $0.5bn | HCP assumption |
| **TAM** |  |  |  | **$5.50bn** | One net-revenue pool |
| HCP penetration |  |  |  | **9.1%** | Roughly $9bn monetized GMV plus brand software |
| **2032 revenue opportunity** |  |  |  | **$500m** | HCP base case |

| Revenue, $m | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Base case | 18 | 45 | 90 | 160 | 250 | 360 | 500 |
| Illustrative monetized GMV, $bn at 5% | 0.36 | 0.90 | 1.8 | 3.2 | 5.0 | 7.2 | 10.0 |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Phia** | AI shopping and brand alignment | X discovery, comparison, matching; Partial checkout | Consumer app/extension plus brand channel | Cross-retailer product graph and intent loop | Consumer free; brand economics undisclosed | $35m Series A at $185m valuation; total undisclosed; Notable, Khosla, Kleiner Perkins |
| Google Shopping | Product search | X discovery and comparison | Search/web | Query scale, merchant feeds, auction | Ads/free listings | Alphabet product |
| Klarna | Shopping and payments | X discovery, comparison, checkout, credit | App/web/merchant network | Payment relationships and transaction data | Merchant and credit economics | Public |
| Lyst | Fashion discovery | X search and affiliate conversion | App/web | Fashion catalog and audience | Affiliate/merchant | Private; valuation not used |
| Beni | Resale comparison | X secondhand alternatives; Partial new retail | Browser extension/app | Resale catalog normalization | Affiliate | Private; capital data undisclosed here |
| Daydream | AI fashion search | X natural-language discovery; Partial merchant tools | Web/app | Fashion-focused search experience | Undisclosed | Private; valuation undisclosed |
| Shopify Shop | Merchant discovery and checkout | X discovery, tracking, checkout | Mobile app/platform | Merchant network and Shop Pay identity | Merchant platform economics | Shopify product |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Ibotta](https://stockanalysis.com/stocks/ibta/statistics/) | 1.75x |
| [Pinterest](https://stockanalysis.com/stocks/pins/statistics/) | 2.95x |
| [Reddit](https://stockanalysis.com/stocks/rddt/statistics/) | 12.99x |
| [Yelp](https://stockanalysis.com/stocks/yelp/statistics/) | 1.01x |
| [Shopify](https://stockanalysis.com/stocks/shop/statistics/) | 12.49x |
| **Median** | **2.95x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $185m disclosed valuation / 1.35% |
| Future dilution / exit ownership | 35% / 0.88% |
| 2032 revenue / multiple / EV | $500m / 3.0x / $1.50bn |
| HCP proceeds / MOIC | $13.2m / **5.3x** |
| Downside / upside MOIC | 2.1x / 10.5x |

### Principal risks and why invest anyway

- **Entry price:** base returns do not meet a 10x target. Seek a lower effective price, secondary discount, ownership protection, or evidence supporting upside.
- **Attribution:** brand-reported lift may reflect selection effects. Validate matched cohorts and incrementality.
- **Platform disintermediation:** Google, Shopify, Klarna, and social platforms own demand or checkout. Phia must retain independent consumer intent.
- **Affiliate concentration:** commission changes can impair revenue. Track direct merchant contracts and revenue concentration.

---

## 10. Twentyeight Health

**Stage:** Series A  
**Proposed HCP check:** $2.0m  
**Recommendation:** Diligence  
**Links:** [Company](https://www.twentyeighthealth.com/) | [Series A announcement](https://www.prnewswire.com/news-releases/twentyeight-health-secures-10m-in-series-a-funding--launches-new-payer-partnerships-amidst-surge-of-user-interest-lowering-barriers-to-sexual--reproductive-care-in-43-states-302342130.html) | [Pricing and coverage FAQ](https://www.twentyeighthealth.com/faq) | [About](https://www.twentyeighthealth.com/about)

### Founders and company

| Founder | Role | Relevant evidence |
|---|---|---|
| Bruno Van Tuykom | Co-founder and CEO | Built the payer and operating model around access for underserved patients. |
| Amy Fan | Co-founder | Co-developed the inclusive women's-health product and consumer experience. Confirm current operating role in diligence. |

### Product description

Twentyeight Health is a virtual women's-health platform designed for underserved and lower-income communities, including Medicaid members. It provides reproductive and sexual-health access, prescriptions, provider messaging, and related care across 43 states. Its model combines direct-to-consumer access with insurer and Medicaid reimbursement rather than relying only on cash-pay subscriptions. The company has expanded through the acquisition of SimpleHealth and assets from The Pill Club. Its strategic wedge is payer-connected, culturally inclusive access for populations that mainstream cash-pay telehealth companies often under-serve.

### Thesis: why invest

Twentyeight announced a $10m Series A in January 2025 and said it had served more than 100,000 users as of October 2024. The same announcement highlighted 43-state reach and payer expansion. Its FAQ states that in-network members pay no membership fee, out-of-network users pay $19.99 per month, and Medicaid is accepted in 18 listed states.

The opportunity is to build the digital front door for a high-need population whose care is fragmented across clinics, pharmacies, and payer directories. The moat is operational, not merely virtual prescribing: payer contracting, Medicaid eligibility, culturally competent acquisition, state coverage, provider operations, and pharmacy fulfillment.

**What must be true:** reimbursement must cover clinical delivery and acquisition; Medicaid engagement must retain; state and pharmacy operations must remain compliant; and broader care categories must increase revenue without eroding quality.

**Next-round milestones:** 250,000 annual active patients, $25m net revenue, positive contribution margin by payer cohort, 80% prescription renewal where clinically appropriate, and at least three multi-state payer contracts.

### Market, TAM, and revenue build

The company financing announcement cites 19 million women living in U.S. contraceptive deserts. HCP adds adjacent underserved patients with access but poor affordability or convenience.

| Bottom-up step | Eligible people | Annual net revenue | Result | Basis |
|---|---:|---:|---:|---|
| Contraceptive-desert population | 19m | $240 | $4.56bn | Company-cited population; HCP reimbursement assumption |
| Adjacent underserved population | 11m | $240 | $2.64bn | HCP assumption |
| **TAM** | 30m |  | **$7.20bn** | Annual net-care revenue pool |
| HCP penetration |  |  | **2.4%** | About 730,000 annual active patient equivalents |
| **2032 revenue opportunity** |  |  | **$175m** | HCP base case |

| Revenue driver | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
|---|---:|---:|---:|---:|---:|---:|---:|
| Annual active patients | 42k | 75k | 133k | 229k | 354k | 521k | 729k |
| Net annual revenue/patient | $240 | $240 | $240 | $240 | $240 | $240 | $240 |
| **Revenue, $m** | **10** | **18** | **32** | **55** | **85** | **125** | **175** |

### Competitive landscape

| Company | Category / user | Workflow | Delivery | Moat | Pricing | Capital status |
|---|---|---|---|---|---|---|
| **Twentyeight Health** | Inclusive virtual women's health | X intake, provider, prescription, messaging; X Medicaid in listed states | Telehealth plus pharmacy/payer network | Payer access and underserved-community operations | $0 in-network membership; $19.99 monthly out-of-network | $10m Series A; valuation and total undisclosed; investor list in announcement |
| Nurx | Broad sexual and reproductive telehealth | X consultation and prescription | Telehealth/pharmacy | Consumer brand and condition breadth | Insurance/cash fees | Private subsidiary; capital not comparable |
| Wisp | Cash-pay sexual and reproductive health | X asynchronous care and fulfillment | Telehealth/pharmacy | Fast consumer access and brand | Public cash pricing | Private; valuation undisclosed |
| Pandia Health | Birth-control telehealth | X prescription and delivery | Telehealth/pharmacy | Specialist positioning and continuity | Insurance/cash | Private; capital data undisclosed here |
| Hers | Consumer digital health | X consultation and fulfillment; broad categories | Telehealth platform | National brand and acquisition scale | Subscription/cash | Hims & Hers product; public parent |
| Planned Parenthood Direct | Reproductive-health access | X selected services; coverage varies | App and clinic network | Trust, clinical network, mission | Varies | Nonprofit network |
| Hey Jane | Virtual abortion care | X abortion-care workflow; Partial broad women's health | Telehealth | Specialized clinical operations and advocacy | Insurance/cash | Private; valuation undisclosed |

### Public comps and exit model

| Public comp | EV/LTM revenue |
|---|---:|
| [Hims & Hers](https://stockanalysis.com/stocks/hims/statistics/) | 3.37x |
| [LifeMD](https://stockanalysis.com/stocks/lfmd/statistics/) | 0.89x |
| [Teladoc](https://stockanalysis.com/stocks/tdoc/statistics/) | 0.79x |
| [Privia Health](https://stockanalysis.com/stocks/prva/statistics/) | 1.33x |
| [Doximity](https://stockanalysis.com/stocks/docs/statistics/) | 4.85x |
| **Median** | **1.33x** |

| Return path | Base |
|---|---:|
| Entry post-money / ownership | $45m HCP assumption / 4.44% |
| Future dilution / exit ownership | 35% / 2.89% |
| 2032 revenue / multiple / EV | $175m / 2.0x / $350m |
| HCP proceeds / MOIC | $10.1m / **5.1x** |
| Downside / upside MOIC | 1.5x / 11.4x |

### Principal risks and why invest anyway

- **Reimbursement:** payer mix may create low or delayed collections. Review allowed amounts, denials, days sales outstanding, and contribution margin by plan.
- **Clinical and regulatory:** state rules and reproductive-health policy can change quickly. Require current counsel review and resilient clinical protocols.
- **Integration:** acquired patient bases and systems may not retain. Separate organic from acquired cohorts.
- **Return profile:** base MOIC is modest. Price discipline and evidence of multi-condition expansion are necessary.

---

## Cross-company decision framework

| Company | Core control point | Most important diligence test | 2032 revenue | Exit multiple | Base MOIC |
|---|---|---|---:|---:|---:|
| Mem0 | Memory lifecycle across AI apps | Paid cloud conversion and enterprise retention | $420m | 8.0x | 21.8x |
| Sekai | Creation plus remix distribution graph | Consumption and creator retention cohorts | $400m | 5.0x | 14.4x |
| Alinea | Guided-investing relationship with Gen Z | Funded-account cohorts and CAC payback | $220m | 5.0x | 11.9x |
| Sett | Performance feedback loop for game creative | Incremental ad performance and renewal | $250m | 5.0x | 10.2x |
| Tailor | Agent-ready enterprise transaction layer | Expansion from first module to system of record | $240m | 6.0x | 9.4x |
| Cedar Money | Africa-linked invoice-to-settlement workflow | Net take rate after all losses and liquidity cost | $200m | 3.0x | 9.0x |
| Bevel | Cross-device longitudinal health graph | Verified paid retention and platform dependence | $220m | 3.0x | 8.6x |
| Rwazi | Verified physical-world data to decision workflow | Recurring software mix and data validity | $200m | 3.0x | 6.5x |
| Phia | Shopper-product-brand alignment graph | Incremental merchant ROI at disclosed entry price | $500m | 3.0x | 5.3x |
| Twentyeight Health | Medicaid-connected underserved care access | Contribution margin by payer and patient cohort | $175m | 2.0x | 5.1x |

## Investment committee conclusion

HCP should prioritize Mem0, Sett, Tailor, Cedar Money, and Alinea for direct diligence. Each has a specific control point, credible public financing evidence, and a plausible path to meaningful ownership within the check range. Sekai also merits pursuit, but its outcome distribution is much wider because retention, safety, and monetization are not publicly established. Bevel and Rwazi warrant data-room work before valuation discussion. Phia and Twentyeight Health may become attractive investments, but the modeled base return is currently too dependent on either a lower entry price or a materially better operating case.

No memo should advance on public evidence alone. The next step is a standardized data request covering cap table and terms, monthly revenue and gross margin, customer or user cohorts, acquisition channels, retention, security and compliance, pipeline, product telemetry, and reference calls. Private and stealth competitors identified during founder and customer calls should be added manually before final investment committee approval.

## Source and assumption notes

1. Company facts are sourced to official pages, financing announcements, TechCrunch, Forbes, Axios, Bessemer, and product documentation linked within each memo. Company-reported operating metrics are explicitly identified and should be verified.
2. Public-company EV/LTM revenue multiples are point-in-time figures and can change daily. Refresh them immediately before an investment committee meeting.
3. TAM calculations are HCP bottom-up underwriting models. Unit counts and prices labeled HCP assumption are deliberately visible so the committee can replace them with management or third-party evidence.
4. The current-round valuation is publicly disclosed only for Phia in this set. All other post-money values are HCP assumptions for return testing, not claims about actual terms.
5. Valuation references for competitors are intentionally omitted when reliable current public evidence was unavailable. No blank field should be interpreted as zero.
