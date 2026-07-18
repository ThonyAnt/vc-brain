# HCP 100-Company Source Ledger

**Access date for all sources:** July 18, 2026. Per-company ledgers below are grouped by research batch. URLs shared across companies are deduplicated in the index at the end.


---

# Batch 01

**Access date for all URLs (unless noted):** July 18, 2026

Ledger is organized by company in the same order as the memos file. Each row gives the source URL, its title, publication date (when known), access date, and the claims it supports. `graphMetrics` evidence notes are included per company at the end of each company's row block.

## Roster swaps (cross-cutting)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://exa.ai/blog/announcing-series-c | Exa blog: Series C announcement | 2026-05-20 (approx.) | 2026-07-18 | Exa raised $250m Series C led by a16z; basis for the Exa→Letta swap ("outgrown scope"). |
| https://www.bloomberg.com/news/articles/2026-05-20/andreessen-backed-ai-search-startup-exa-valued-at-2-2-billion | Bloomberg: Andreessen-Backed AI Search Startup Exa Valued at $2.2 Billion | 2026-05-20 | 2026-07-18 | Confirms $2.2bn valuation for Exa's Series C, independent of company self-report. |
| https://clickhouse.com/blog/clickhouse-raises-400-million-series-d-acquires-langfuse-launches-postgres | ClickHouse blog: $400M Series D and Langfuse acquisition | 2026-01-16 | 2026-07-18 | ClickHouse's $400m Series D and acquisition of Langfuse; basis for the Langfuse→HoneyHive swap. |
| https://siliconangle.com/2026/01/16/database-maker-clickhouse-raises-400m-acquires-ai-observability-startup-langfuse/ | SiliconANGLE: Database maker ClickHouse raises $400M, acquires AI observability startup Langfuse | 2026-01-16 | 2026-07-18 | Independent confirmation of the ClickHouse/Langfuse acquisition and ClickHouse's $15bn valuation. |
| https://langfuse.com/blog/joining-clickhouse | Langfuse blog: Langfuse joins ClickHouse | 2026-01-16 (approx.) | 2026-07-18 | Langfuse's own confirmation of the acquisition and continued open-source commitment. |

## 1. Letta (letta.com)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.letta.com/ | Letta homepage | Undated (current) | 2026-07-18 | Product description (Context Repositories, sleep-time compute), case studies (Bilt, 11x, Kognitos, Hunt Club), investor/angel list. |
| https://www.prnewswire.com/news-releases/berkeley-ai-research-lab-spinout-letta-raises-10m-seed-financing-led-by-felicis-to-build-ai-with-memory-302257004.html | PR Newswire: Berkeley AI Research Lab Spinout Letta Raises $10M Seed Financing Led by Felicis | 2024-09-23 | 2026-07-18 | $10m seed amount, lead investor Felicis, participating investors (Sunflower Capital, Essence VC), angel list. |
| https://techcrunch.com/2024/09/23/letta-one-of-uc-berkeleys-most-anticipated-ai-startups-has-just-come-out-of-stealth/ | TechCrunch: Letta, one of UC Berkeley's most anticipated AI startups, has just come out of stealth | 2024-09-23 | 2026-07-18 | Founders Charles Packer (CEO) and Sarah Wooders (CTO), MemGPT research lineage, Sky Computing Lab affiliation. |

**graphMetrics evidence:** ai_adoption 0.85 (core dependency for stateful agent frameworks, MemGPT lineage cited across the category including as a competitor reference point for Mem0); legacy_disruptiveness 0.5 (replaces ad hoc RAG/context management, per product description); technical_feasibility 0.8 (published MemGPT research underlying the product, Berkeley Sky Lab pedigree); proprietary_data_moat 0.45 (versioned memory accumulates but is portable/exportable via the open-source framework, moderating the moat); competition_intensity 0.75 (direct competitors Mem0, Zep, Cognee, LangMem, Supermemory identified in the reference file's own competitive table for the same category).

## 2. Firecrawl (firecrawl.dev)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.firecrawl.dev/ | Firecrawl homepage | Undated (current) | 2026-07-18 | Product description (scrape/crawl/search/interact), pricing tiers, current scale (1.25m+ developers, 150k+ companies, 152.8k GitHub stars), named customers (Apple, Canva, Shopify, Zapier, DoorDash, Replit, MongoDB, Snapchat, Coinbase). |
| https://techcrunch.com/2025/08/19/ai-crawler-firecrawl-raises-14-5m-is-still-looking-to-hire-agents-as-employees/ | TechCrunch: AI crawler Firecrawl raises $14.5M | 2025-08-19 | 2026-07-18 | $14.5m Series A, lead investor Nexus Venture Partners, oversubscribed round, 350,000+ developers and 48,000+ GitHub stars at time of raise. |
| https://www.firecrawl.dev/blog/firecrawl-v2-series-a-announcement | Firecrawl blog: Series A and v2 announcement | 2025-08-19 (approx.) | 2026-07-18 | CEO Caleb Peffer named; total funding $16.2m; investor list including Y Combinator, Tobias Lütke, Abhinav Asthana, Matt McClure; product v2 features. |
| https://github.com/firecrawl/firecrawl | Firecrawl GitHub repository | Undated (current) | 2026-07-18 | Co-founders Eric Ciarla and Nicolas Camara credited alongside Caleb Peffer; current star/fork counts; AGPL-3.0 licensing. |

**graphMetrics evidence:** ai_adoption 0.85 (purpose-built for AI data pipelines, per product description); legacy_disruptiveness 0.55 (replaces manual scraping/ETL scripts); technical_feasibility 0.8 (proprietary Fire-Engine, proven at 150k+ company scale per company site); proprietary_data_moat 0.3 (crawl infrastructure advantage exists but underlying data is public web, moderating the score); competition_intensity 0.75 (direct competitors Tavily, Exa, Apify identified in competitive table).

## 3. HoneyHive (honeyhive.ai)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.honeyhive.ai/ | HoneyHive homepage | Undated (current) | 2026-07-18 | Product description (tracing, monitoring, experiments, annotation, prompt management), named customers (Commonwealth Bank, NVIDIA, MongoDB, Pinecone), SOC 2/GDPR/HIPAA compliance claims. |
| https://www.prnewswire.com/news-releases/honeyhive-a-leadingai-agent-observability-and-evaluation-platform-announces-launch-and-7-4m-in-total-funding-led-by-insight-partners-302419249.html | PR Newswire: HoneyHive announces launch and $7.4M in total funding led by Insight Partners | 2025-04-08 | 2026-07-18 | $7.4m total funding ($5.5m seed + $1.9m pre-seed), lead investors Insight Partners and Zero Prime Ventures, founders Mohak Sharma (CEO) and Dhruv Singh (CTO), 50x request-volume growth in 2024, 50+ beta customers. |
| https://www.honeyhive.ai/post/honeyhive-raises-7-4m | HoneyHive blog: HoneyHive raises $7.4M | 2025-04-08 (approx.) | 2026-07-18 | Company's own account of the same funding round, corroborating the PR Newswire release. |

**graphMetrics evidence:** ai_adoption 0.8 (agent observability core use case); legacy_disruptiveness 0.45 (replaces ad hoc logging for AI-specific workflows); technical_feasibility 0.7 (OpenTelemetry-native architecture, SOC 2/HIPAA compliance evidencing enterprise readiness); proprietary_data_moat 0.35 (trace data accumulates per customer but is not uniquely proprietary at the platform level); competition_intensity 0.85 (highest in batch — direct comparables Langfuse and Helicone were both acquired within a two-month window in early 2026, and Braintrust/Patronus AI compete in the same batch, evidencing an unusually crowded, consolidating category).

## 4. E2B (e2b.dev)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://e2b.dev/ | E2B homepage | Undated (current) | 2026-07-18 | Product description (Firecracker microVM isolation, sub-200ms starts, multi-language support), named customers (Perplexity, Manus, Groq, Lindy, Rogo, Genspark, Hugging Face), 94% Fortune 100 adoption claim (current site figure). |
| https://e2b.dev/pricing | E2B pricing page | Undated (current) | 2026-07-18 | Hobby/Pro/Ultimate pricing tiers, usage-based cost structure. |
| https://www.prnewswire.com/news-releases/e2b-raises-a-21m-series-a-to-offer-cloud-for-ai-agents-to-fortune-100-302514540.html | PR Newswire: E2B Raises a $21M Series A to Offer Cloud for AI Agents to Fortune 100 | 2025 (per release) | 2026-07-18 | $21m Series A, lead investor Insight Partners, participants (Decibel, Sunflower Capital, Kaya), founders Vasek Mlejnsky and Tomas Valenta, founded 2023. |
| https://venturebeat.com/ai/how-e2b-became-essential-to-88-of-fortune-100-companies-and-raised-21-million | VentureBeat: How E2B became essential to 88% of Fortune 100 companies and raised $21 million | 2025 (per article) | 2026-07-18 | Independent confirmation of 88% Fortune 100 adoption figure at time of raise and $21m Series A total ($32m all-time). |

**graphMetrics evidence:** ai_adoption 0.9 (core dependency for agent code execution across multiple frontier AI companies per disclosed customer list); legacy_disruptiveness 0.55 (replaces self-managed container/VM infrastructure); technical_feasibility 0.85 (Firecracker microVM technology proven at Fortune 100 scale per two independent sources); proprietary_data_moat 0.25 (infrastructure layer with limited proprietary data accumulation); competition_intensity 0.75 (Modal, Daytona, and hyperscaler-native alternatives identified as competitors).

## 5. Tavily (tavily.com)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.tavily.com/ | Tavily homepage | Undated (current) | 2026-07-18 | Product description (search, extract, research endpoints), 180ms p50 latency claim, 99.99% uptime SLA, 2m+ developers, 300m+ monthly requests, named customers (Writer, MongoDB, Groq, LangChain, Monday, JetBrains, AWS, Mastercard, Ironclad, IBM, BCG, Troutman Pepper Locke, Extend). |
| https://www.tavily.com/pricing | Tavily pricing page | Undated (current) | 2026-07-18 | Researcher (free), Pay As You Go, Project, and Enterprise pricing tiers. |
| https://techcrunch.com/2025/08/06/tavily-raises-25m-to-connect-ai-agents-to-the-web/ | TechCrunch: Tavily raises $25M to connect AI agents to the web | 2025-08-06 | 2026-07-18 | $20m Series A within a $25m total raise, lead investors Insight Partners and Alpha Wave Global, prior $5m seed (July 2024), founders and headquarters. |
| https://www.insightpartners.com/ideas/tavily-raises-25-million-to-power-the-internet-of-agents/ | Insight Partners: Tavily Raises $25 Million to Power the Internet of Agents | 2025-08-06 (approx.) | 2026-07-18 | Independent (investor-published) confirmation of round size, investor list, and company traction claims. |

**graphMetrics evidence:** ai_adoption 0.85 (core web-access dependency for agent systems); legacy_disruptiveness 0.5 (replaces generic search APIs like Google/Bing Search API for agent use cases); technical_feasibility 0.8 (180ms p50 latency and 99.99% uptime SLA claims, 2m+ developer base); proprietary_data_moat 0.2 (search index built on public web data, limited proprietary moat); competition_intensity 0.8 (direct, dramatically better-capitalized competitor Exa at $2.2bn valuation, plus Firecrawl, Perplexity, SerpAPI).

## 6. LanceDB (lancedb.com)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.lancedb.com/ | LanceDB homepage | Undated (current) | 2026-07-18 | Product description (multimodal lakehouse, Lance format, 100k+ QPS, 70% FLOPS utilization claim), named customers (Runway, World Labs, CodeRabbit, Character.ai, Midjourney, Netflix, WeRide) with specific reported outcomes. |
| https://www.lancedb.com/blog/series-a-funding | LanceDB blog: Series A funding announcement | 2025-06-24 (approx.) | 2026-07-18 | $30m Series A led by Theory Ventures, participants (CRV, Y Combinator, Databricks Ventures). |
| https://www.ycombinator.com/companies/lancedb | Y Combinator: LanceDB company profile | Undated (current) | 2026-07-18 | Independent (YC-published) confirmation of company description and YC batch affiliation; founders Chang She (creator of Pandas) and Lei Xu (HDFS core contributor), founded December 2021. |

**graphMetrics evidence:** ai_adoption 0.85 (powers training/retrieval pipelines at Midjourney, Netflix, Character.ai per disclosed customer list); legacy_disruptiveness 0.6 (replaces siloed vector-database-plus-data-lake combinations with a unified file format); technical_feasibility 0.85 (Lance format proven at petabyte scale per named enterprise customers, including a specific 90x productivity claim from WeRide); proprietary_data_moat 0.25 (file-format-level differentiation, not proprietary data accumulation); competition_intensity 0.75 (Chroma, Pinecone, Weaviate, Qdrant, Databricks identified as competitors).

## 7. Browser Use (browser-use.com)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://browser-use.com/ | Browser Use homepage | Undated (current) | 2026-07-18 | Product description (text-structured page parsing, Stealth Browsers, Browser Use Box), Fortune 500/leading AI teams target customer framing. |
| https://techcrunch.com/2025/03/23/browser-use-the-tool-making-it-easier-for-ai-agents-to-navigate-websites-raises-17m/ | TechCrunch: Browser Use, the tool making it easier for AI 'agents' to navigate websites, raises $17M | 2025-03-23 | 2026-07-18 | $17m seed round, lead investor Felicis Ventures (Astasia Myers), participants (Paul Graham, A Capital, Nexus Venture Partners), founders Magnus Müller and Gregor Žunič, YC W25 batch, ETH Zurich Student Project House origin, adopter Butterfly Effect/Manus, 20+ YC W25 companies using the product. |
| https://github.com/browser-use/browser-use | Browser Use GitHub repository | Undated (current) | 2026-07-18 | Current star count (105,000) and fork count (11,600); founders credited; MIT license; Python/Playwright-based implementation. |

**graphMetrics evidence:** ai_adoption 0.85 (core browser-control dependency for agent workflows); legacy_disruptiveness 0.5 (replaces manual QA/RPA-style scripting per product description); technical_feasibility 0.7 (105k GitHub stars evidencing real adoption, though TechCrunch itself notes frequently changing sites like LinkedIn remain a challenge for agents, moderating the score); proprietary_data_moat 0.2 (no disclosed proprietary data asset); competition_intensity 0.8 (Browserbase, Skyvern, Playwright, and native model-vendor computer-use features identified as competitors).

## 8. Chroma (trychroma.com)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.trychroma.com/ | Chroma homepage | Undated (current) | 2026-07-18 | Product description (vector/sparse/full-text/regex/metadata search), performance benchmarks, pricing tiers (Cloud/OSS/Enterprise), named customers (Capital One, UnitedHealthcare, Weights & Biases, Mintlify, Propel AI, Cofounder, Medwise), community metrics (27k GitHub stars, 15M+ monthly downloads, 90k+ codebases). |
| https://www.trychroma.com/company/seed | Chroma blog: Chroma raises $18M seed round | 2023-04-17 | 2026-07-18 | $18m seed round led by Quiet Capital (Astasia Myers), angel list (Naval Ravikant, Max and Jack Altman, Jordan Tigani, Guillermo Rauch, Akshay Kothari, Amjad Masad, Spencer Kimball), prior 2022 pre-seed led by AIX Ventures and Bloomberg Beta. |
| https://github.com/chroma-core/chroma | Chroma GitHub repository | Undated (current) | 2026-07-18 | Confirms open-source project identity and founders Jeff Huber and Anton Troynikov as co-founders (cross-referenced with company podcast/press profiles). |

**graphMetrics evidence:** ai_adoption 0.85 (very large OSS adoption: 15M+ monthly downloads, 90k+ codebases per company site); legacy_disruptiveness 0.5 (replaces bespoke multi-tool retrieval stacks); technical_feasibility 0.8 (Rust-core rewrite with 4x performance improvement, disclosed benchmark latencies); proprietary_data_moat 0.2 (open-source infrastructure layer, minimal proprietary data accumulation); competition_intensity 0.75 (Pinecone, Weaviate, Qdrant, Milvus, and this batch's own LanceDB identified as competitors).

## 9. Patronus AI (patronus.ai)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.patronus.ai/ | Patronus AI homepage | Undated (current) | 2026-07-18 | Product description (Digital World Models, Lynx/FinanceBench/BLUR/GLIDER research models), 1M+ world data artifacts, 85% UI/UX feature parity claim, 5,000+ expert contributors, target customer segments. |
| https://www.prnewswire.com/news-releases/patronus-ai-raises-50-million-series-b-and-unveils-first-digital-world-models-for-ai-agent-training-and-simulation-302811248.html | PR Newswire: Patronus AI Raises $50 Million Series B and Unveils First Digital World Models | 2026-06-25 | 2026-07-18 | $50m Series B led by Greenfield Partners, participants (Notable Capital, Lightspeed, Datadog, Samsung, Factorial Capital), total funding $70m. |
| https://techcrunch.com/2026/06/25/patronus-ai-lands-50m-to-build-digital-worlds-that-stress-test-ai-agents/ | TechCrunch: Patronus AI lands $50M to build 'digital worlds' that stress-test AI agents | 2026-06-25 | 2026-07-18 | Independent confirmation of $50m Series B and $70m total funding; founders Anand Kannappan and Rebecca Qian (ex-Meta AI); 15x revenue growth over the prior year; "nearly all frontier AI labs" as customers (unnamed); Glenn Solomon (Notable Capital) quote on demand. |
| https://www.patronus.ai/blog/announcing-our-17-million-series-a | Patronus AI blog: Announcing our $17 million Series A | 2024 (per release) | 2026-07-18 | Prior $17m Series A led by Notable Capital (then GGV Capital), participants Lightspeed and Datadog, bringing total to $20m at that time. |

**graphMetrics evidence:** ai_adoption 0.9 ("nearly all frontier AI labs" as customers per TechCrunch, third-party reported); legacy_disruptiveness 0.6 (replaces manual QA/red-teaming with automated simulation); technical_feasibility 0.8 (published research models: Lynx, FinanceBench, BLUR, GLIDER; 15x revenue growth per TechCrunch); proprietary_data_moat 0.6 (1M+ proprietary world data artifacts per company site, the strongest data-moat evidence in this batch); competition_intensity 0.65 (moderate — Braintrust and HoneyHive compete in adjacent post-hoc evaluation, but the digital-world-simulation niche is less directly crowded).

## 10. Braintrust (braintrust.dev)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.braintrust.dev/ | Braintrust homepage | Undated (current) | 2026-07-18 | Product description (observability, evals, automation, Loop Agent, Brainstore), named customers with outcomes (Coursera 45x feedback, Notion <24hr deployment, Graphite 5% reduction, Vercel, Dropbox, Replit, Navan), SOC 2/GDPR/HIPAA compliance. |
| https://www.braintrust.dev/blog/announcing-series-a | Braintrust blog: Announcing our $36M Series A | 2024-10-08 | 2026-07-18 | $36m Series A, lead investor Martin Casado/a16z, participant list, $150m valuation, customer names (Notion, Stripe, Vercel, Airtable, Instacart, Zapier, Coda, The Browser Company). |
| https://www.axios.com/pro/enterprise-software-deals/2026/02/17/ai-observability-braintrust-80-million-800-million | Axios Pro: AI observability startup Braintrust raises $80M at an $800M valuation | 2026-02-17 | 2026-07-18 | $80m Series B, lead investor Iconiq, $800m post-money valuation — independent, non-company confirmation of the disclosed valuation used in the return model. |
| https://www.braintrust.dev/blog/announcing-series-b | Braintrust blog: Braintrust's series B — building the infrastructure for production AI | 2026-02-17 (approx.) | 2026-07-18 | Company's own account of the Series B, corroborating Axios; founder Ankur Goyal's framing of the round's purpose. |

**graphMetrics evidence:** ai_adoption 0.9 (blue-chip AI-native and Fortune-scale customer base — Notion, Stripe, Vercel, Cloudflare, Ramp, Dropbox, Replit); legacy_disruptiveness 0.6 (displaces general-purpose APM and ad hoc eval scripts for AI-specific quality monitoring); technical_feasibility 0.85 (proprietary Brainstore database and demonstrated customer outcomes, e.g. Coursera's 45x feedback claim); proprietary_data_moat 0.55 (accumulates evaluation/trace data across a large enterprise customer base, though data itself is largely customer-owned); competition_intensity 0.8 (competes directly with HoneyHive and Patronus AI within this same batch, plus Arize AI, LangSmith, and Datadog's own AI observability features).

## General / cross-cutting comps sources

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://stockanalysis.com/stocks/mdb/statistics/ | StockAnalysis: MongoDB (MDB) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 8.74x — reused from reference file citation for the same ticker. |
| https://stockanalysis.com/stocks/snow/statistics/ | StockAnalysis: Snowflake (SNOW) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 18.20x — reused from reference file. |
| https://stockanalysis.com/stocks/net/statistics/ | StockAnalysis: Cloudflare (NET) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 42.05x — reused from reference file. |
| https://stockanalysis.com/stocks/ddog/statistics/ | StockAnalysis: Datadog (DDOG) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 24.13x — reused from reference file. |
| https://stockanalysis.com/stocks/gtlb/statistics/ | StockAnalysis: GitLab (GTLB) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 4.15x — reused from reference file. |
| https://stockanalysis.com/stocks/u/statistics/ | StockAnalysis: Unity (U) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 6.67x — reused from reference file. |
| https://stockanalysis.com/stocks/estc/statistics/ | StockAnalysis: Elastic (ESTC) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 3.23x — fetched fresh; not covered by the reference file. |
| https://stockanalysis.com/stocks/fsly/statistics/ | StockAnalysis: Fastly (FSLY) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 5.07x — fetched fresh; not covered by the reference file. |
| https://stockanalysis.com/stocks/path/statistics/ | StockAnalysis: UiPath (PATH) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 2.97x — fetched fresh; not covered by the reference file. |
| https://stockanalysis.com/stocks/docn/statistics/ | StockAnalysis: DigitalOcean (DOCN) statistics | As of 2026-07-18 | 2026-07-18 | EV/LTM revenue multiple 13.89x — fetched fresh; not covered by the reference file. |
| https://stockanalysis.com/stocks/cflt/statistics/ | StockAnalysis: Confluent (CFLT) statistics | Delisted 2026-03-17 | 2026-07-18 | Confirms Confluent was acquired by IBM and delisted in March 2026; excluded as a live public comp for this reason. |

## Notes on excluded / disqualified alternates

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.geekwire.com/2024/seattle-startup-openpipe-raises-6-7m-to-help-companies-reduce-costs-for-llm-development/ | GeekWire: Seattle startup OpenPipe raises $6.7M | 2024 (per article) | 2026-07-18 | Background on OpenPipe's $6.7m seed round (founders David/Kyle Corbitt); OpenPipe was independently confirmed acquired by CoreWeave in September 2025 via search-aggregated company records, disqualifying it as this batch's first roster alternate. |

---

# Batch 02

**Access date for all URLs below:** July 18, 2026, unless a different access context is noted.

## Concourse

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.concourse.co/ | Concourse — AI Agents for Corporate Finance Teams | Undated (live site) | 2026-07-18 | Product description, feature list, customer names (Tecovas, Front, Palo Alto Networks, Lightmatter, Unify, CurbWaste, Instabase), performance metrics (75% manual-work reduction, 6x output). |
| https://www.prnewswire.com/news-releases/concourse-raises-12m-series-a-and-expands-access-to-its-enterprise-grade-ai-agents-for-finance-302670827.html | Concourse Raises $12M Series A and Expands Access to Its Enterprise-Grade AI Agents for Finance | 2026-01-27 | 2026-07-18 | $12m Series A amount, lead investor Standard Capital, participating investors (a16z, CRV, YC, SV Angel, FOG Ventures, Ritual Capital), CFO-angel investors. |
| https://www.concourse.co/insights/concourse-12m-series-a-launches-general-availability | Concourse Raises $12M Series A, Launches General Availability | 2026-01-27 | 2026-07-18 | 19x revenue growth, 13x customer growth, GA launch, free-tier onboarding. |

**graphMetrics evidence note:** ai_adoption 0.85 and technical_feasibility 0.8 reflect a shipped, GA product with named Fortune 500 and unicorn customers; competition_intensity 0.7 reflects a crowded FP&A-automation peer set (Mosaic, Runway, Abacum, Cube, Datarails, Vareto); proprietary_data_moat 0.35 reflects broad integration breadth without a uniquely proprietary dataset; regulatory_moat 0.15 reflects no meaningful regulatory barrier.

## Dust

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://dust.tt/ | Dust company site | Undated (live site) | 2026-07-18 | Company identity and URL confirmation (page content was JavaScript-rendered and not extractable via fetch; product facts sourced from press coverage instead). |
| https://techcrunch.com/2024/06/27/dust-grabs-another-16-million-for-its-enterprise-ai-assistants-connected-to-internal-data/ | Dust grabs another $16M for its enterprise AI assistants connected to internal data | 2024-06-27 | 2026-07-18 | $16m Series A, lead investor Sequoia Capital, participating investors, founders Stanislas Polu and Gabriel Hubert, Paris headquarters, product description (assistants connected to Notion, Google Drive, Intercom, Slack). |
| https://sifted.eu/articles/dust-series-b-40m | Sequoia backs AI agents scaleup Dust in $40m Series B | 2026-05-18 | 2026-07-18 | $40m Series B amount and date, lead investors Sequoia and Abstract. |
| https://www.numeric.io/ (cross-check omitted; see Numeric section) | — | — | — | — |

**Additional Series B detail source (search-result synthesis, not a single fetched page):** Axios/HackerNoon/TechNews180 coverage of the May 18, 2026 Series B confirms Snowflake Ventures and Datadog as participating investors, 3,000+ organizations, 51,000 monthly active users, zero churn in 2025, 300,000 agents deployed, and total funding over $60m.

**graphMetrics evidence note:** technical_feasibility 0.85 and legacy_disruptiveness 0.55 reflect the disclosed zero-churn-in-2025 and 3,000-organization figures; competition_intensity 0.8 reflects direct competition from Glean, Microsoft Copilot, and other well-funded enterprise AI assistant platforms; proprietary_data_moat 0.45 reflects deep workspace-integration context rather than a uniquely owned dataset.

## Squint

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.squint.ai/blog/series-a | Why We Raised $13M from Sequoia to Empower More Industrial Workers | Undated (2024/2025) | 2026-07-18 | $13m Series A, lead investor Sequoia Capital, participating investor Menlo Ventures, board addition Jess Lee, customers Colgate-Palmolive, Berkshire Hathaway Energy, Siemens, Volvo, product description (AR navigation, procedure generation). |
| https://fortune.com/2025/08/12/exclusive-squint-raises-40-million-at-265-million-valuation-to-modernize-manufacturing-for-companies-like-pepsi-and-michelin/ | Exclusive: Squint raises $40 million at $265 million valuation to modernize manufacturing for companies like Pepsi and Michelin | 2025-08-12 | 2026-07-18 | $40m Series B, disclosed $265m post-money valuation, lead investors The Westly Group and TCV, founder Devin Bhushan and background, customers PepsiCo, Michelin, Ford, scale ("tens of thousands of operators across hundreds of factories"). |

**graphMetrics evidence note:** proprietary_data_moat 0.55 reflects per-factory, per-customer procedural knowledge capture that is inherently hard to replicate generically; competition_intensity 0.5 (moderate) reflects a fragmented connected-worker category (Augmentir, Poka, Tulip) without a dominant winner; technical_feasibility 0.8 reflects Fortune 500-scale deployments already live.

## Kick

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.kick.co/ | Kick — Self-Driving Bookkeeping | Undated (live site) | 2026-07-18 | Company positioning as AI-native bookkeeping platform. |
| https://www.axios.com/pro/fintech-deals/2024/10/17/bookkeeping-startup-kick-9-million-ai | AI-driven bookkeeping startup Kick raises $9 million | 2024-10-17 | 2026-07-18 | $9m seed amount and date, founder Conrad Wadowski, investors General Catalyst and OpenAI Startup Fund. |
| https://medium.com/kickfinance/kick-raises-to-build-the-accounting-firm-of-the-future-10af7f38cabf | Kick has raised $20M to build the future of accounting | 2025-11-03 | 2026-07-18 | $20m cumulative funding, lead investors Felicis and GV, continued investors General Catalyst and OpenAI Startup Fund, 3,000+ businesses served. |
| https://www.kick.co/pricing | Kick Pricing | Undated (live site) | 2026-07-18 | Four-tier pricing structure (Free, $40/mo Basic, $100/mo Plus, custom Advanced), feature breakdown, integrations (Plaid, Stripe, PayPal, Mercury, Ramp, Gusto). |

**Note on round labeling:** no source reviewed explicitly labels the November 2025 round "Series A"; HCP characterizes it as a de facto Series A for underwriting purposes only, and the memo/JSON both flag this as an unconfirmed label.

**graphMetrics evidence note:** competition_intensity 0.75 and proprietary_data_moat 0.25 reflect the SMB bookkeeping category's history of failure (Bench shut down December 2024 after raising $100m+) and relatively low product differentiation versus incumbents like QuickBooks Live.

## Artisan

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.artisan.co/blog/artisan-series-a | Artisan raises $25M series A | 2025-04-09 (approx.) | 2026-07-18 | $25m Series A, lead investor Glade Brook Capital, participating investors, founder Jaspar Carmichael-Jack, $5m ARR, 250 customers, new CTO Ming Li (ex-Deel), customer SumUp with reported reply-rate metrics. |
| https://techcrunch.com/2025/04/09/artisan-the-stop-hiring-humans-ai-agent-startup-raises-25m-and-is-still-hiring-humans/ | Artisan, the 'stop hiring humans' AI agent startup, raises $25M — and is still hiring humans | 2025-04-09 | 2026-07-18 | Confirms $25m Series A, "stop hiring humans" positioning, product description of Ava, Aaron, and Aria roadmap. |

**graphMetrics evidence note:** competition_intensity 0.85 (highest in batch) reflects an unusually crowded AI-SDR category (11x, Regie.ai, Clay, and many others); proprietary_data_moat 0.3 reflects a real but moderately differentiated buying-signal context engine.

## Numeric

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.numeric.io/ | Numeric — AI-Powered Close Automation | Undated (live site) | 2026-07-18 | Product description (close management, cash management, analytics), customer names (Brex, Plaid, Wealthfront, Public.com, Stash, Riskified, Asana, Parafin), customer outcome metrics. |
| https://techcrunch.com/2024/10/10/numeric-grabs-28m-series-a-for-automating-accounting-with-ai/ | Numeric grabs $28M Series A to automate accounting using AI | 2024-10-10 | 2026-07-18 | $28m Series A, lead investor Menlo Ventures, participating investors IVP and Socii, founders Anthony Alvernaz, Parker Gilbert, Andrew Bihl, 2020 founding date, 4x revenue growth to "single-digit millions" pre-Series A. |
| https://www.numeric.io/blog/numeric-raises-51m-series-b | Numeric raises $51M Series B, led by IVP, to expand beyond close management | 2025-11-19 | 2026-07-18 | $51m Series B, lead investor IVP, participating investors (Menlo, Founders Fund, Alkeon, 8VC, Socii, Access Industries, and others), operator angels (Marc Huffman ex-BlackLine CEO, Ron Gill ex-NetSuite CFO), Parker Gilbert's Hearth VP of Finance background, total funding $89m, platform-expansion strategy. |

**graphMetrics evidence note:** proprietary_data_moat 0.4 reflects transaction-level financial data accumulated across close cycles; competition_intensity 0.65 reflects established incumbents (BlackLine, Workiva, FloQast, Trintech) rather than a greenfield category.

## HappyRobot

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.happyrobot.ai/ | HappyRobot company site | Undated (live site) | 2026-07-18 | Current product description ("AI workforce" positioning), 150+ enterprise customers, named customers (DHL, Kuehne+Nagel, Ryder, Schneider, Werner, Naturgy, CMA CGM, Uber Freight), compliance certifications (SOC 2, GDPR, HIPAA, EU AI Act, NIST CSF, DORA). |
| https://www.happyrobot.ai/blog/series-a-announcement | HappyRobot Series A announcement | 2024-12 (approx.) | 2026-07-18 | Founders Pablo (CEO), Luis (CTO), Javi (COO) with first names and role/background only, $15.6m Series A, $17.5m total at the time, customer metrics (50+ customers, 50% call-time reduction, one-third operational-cost cut). |
| https://www.prnewswire.com/news-releases/happyrobot-raises-15-6-million-series-a-funding-led-by-a16z-to-transform-logistics-with-agentic-ai-302322662.html | HappyRobot Raises $15.6 Million Series A Funding Led by a16z to Transform Logistics with Agentic AI | 2024-12 (approx.) | 2026-07-18 | Confirms $15.6m Series A, lead investor a16z, participating investor RyderVentures. |
| https://techfundingnews.com/happyrobot-44m-series-b-ai-workforce-supply-chain/ | HappyRobot lands $44M to build the AI teammates running the supply chain | 2025-09 (approx.) | 2026-07-18 | $44m Series B, lead investor Base10 Partners, participating investors, "approximately $500 million" valuation (reported, unconfirmed), total funding $62m, 10x revenue growth claim, 70+ enterprise customers at time of raise. |

**graphMetrics evidence note:** proprietary_data_moat 0.35 reflects operational call/transcript data across accounts, moderate because voice-AI infrastructure is increasingly commoditized; competition_intensity 0.55 (moderate) reflects both logistics-specific competitors (Parade, Vooma) and horizontal voice-AI infrastructure providers (Retell AI, Bland AI) that could enter the vertical.

## Spellbook

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://spellbook.com/ | Spellbook — AI Contract Review & Drafting | Undated (live site); roster hint spellbook.legal 301-redirects here | 2026-07-18 | Product description, customer logos (Dropbox, eBay, Asics, Fender, Crocs, Wealthsimple, Franklin Templeton, Lightspeed, Aritzia, Panasonic, Kennedys, and others), 4,500+ legal teams across 80+ countries. |
| https://www.businesswire.com/news/home/20251009110230/en/Spellbook-Raises-$50M-Series-B-to-Expand-AI-Contract-Review-Platform | Spellbook Raises $50M Series B to Expand AI Contract Review Platform | 2025-10-09 | 2026-07-18 | $50m Series B headline and date (page fetch timed out; title/date corroborated via SiliconANGLE's coverage of the same release). |
| https://siliconangle.com/2025/10/09/legal-ai-firm-spellbook-raises-50m-expand-contract-review-platform/ | Legal AI firm Spellbook raises $50M to expand contract review platform | 2025-10-09 | 2026-07-18 | $50m Series B, disclosed $350m post-money valuation, total funding over $80m, lead investor Keith Rabois/Khosla Ventures, founder Scott Stevenson (Co-founder and CEO) and quote, 10M+ contracts reviewed, customers Nestlé, eBay, Kennedys. |

**graphMetrics evidence note:** regulatory_moat 0.2 (higher than most companies in this batch) reflects legal-malpractice and bar-rule-adjacent switching friction once a firm's playbooks are encoded; competition_intensity 0.7 reflects well-funded peers Harvey, Ironclad, and Thomson Reuters CoCounsel.

## Basis

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.usebasis.co/ | Basis — Banking Data API for B2B Fintech | Undated (live site) | 2026-07-18 | Confirms the roster's URL hint (usebasis.co) resolves to a different, unrelated company (SMB/commercial banking-data API, backed by 8VC and Menlo Ventures) — not the AI-accounting-agent company profiled in this memo. |
| https://www.getbasis.ai/about | Basis — About | Undated (live site) | 2026-07-18 | Confirms getbasis.ai is the correct site for the AI-accounting-agent company; product description ("unified accounting intelligence," autonomous agents), target market (accounting firms, tax/audit/CAS). |
| https://siliconangle.com/2026/02/24/ai-accounting-startup-basis-secures-100m-1-15b-valuation-firms-adopt-agent-based-workflows/ | AI accounting startup Basis secures $100M at $1.15B valuation as firms adopt agent-based workflows | 2026-02-24 | 2026-07-18 | $100m Series B, disclosed $1.15bn post-money valuation, lead investors Accel and Google Ventures plus Lloyd Blankfein, participating investors (Khosla, NFDG, Better Tomorrow Ventures, Box Group, Avid Ventures, individual investors Adam D'Angelo, Amjad Masad, Clem Delangue), founder Matt Harpe (CEO), ~30% of Top 25 U.S. accounting firms using Basis agents, named customers (Boulay PLLP, Clark Nuber PS, MarksNelson LLC, Pinion LLC, UHY LLC), prior $34m Series A (December 2024). |
| https://www.citybiz.co/article/640958/basis-raises-34m-to-advance-ai-agents-for-accounting/ | Basis Raises $34M to Advance AI Agents for Accounting | 2024-12 (approx.) | 2026-07-18 | Confirms $34m Series A, lead investor Khosla Ventures, participating investors NFDG and individual investors (Larry Summers, Adam D'Angelo, Jeff Dean); page fetch returned HTTP 403, so this citation relies on the search-result summary rather than a direct page fetch. |
| https://nextplayso.substack.com/p/meet-the-team-that-raised-34m-from | Meet the team that raised $34m from Khosla to build AI agents for accountants | 2024-12 (approx.) | 2026-07-18 (via search-result summary only; page not independently fetched) | Reported founding research team (Zenna Tavares, Emily Mackevicius, Eli Bingham) and their academic/research backgrounds. Flagged in the memo and JSON as an unconfirmed secondary source, not verified against Basis's own materials. |

**graphMetrics evidence note:** regulatory_moat 0.25 (higher than most enterprise-AI peers in this batch) reflects audit/tax-standard compliance requirements; proprietary_data_moat 0.4 and technical_feasibility 0.85 reflect the disclosed ~30%-of-Top-25-firms adoption figure, a strong real-world validation signal independent of the pricing concern driving the Pass recommendation.

## Eve

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.eve.legal/company | About Eve | Undated (live site) | 2026-07-18 | Founders Jay Madheswaran (CEO), Matt Noe (CPO), David Zeng (Chief Architect/Head of Engineering) with backgrounds; product features (case intake, medical chronologies, drafting, discovery, EveOS, AI auditor). |
| https://www.prnewswire.com/news-releases/eve-secures-47-million-to-fuel-era-of-ai-native-law-firms-302353165.html | Eve Secures $47 Million to Fuel Era of AI-Native Law Firms | 2025-01-16 | 2026-07-18 | $47m Series A, lead investor Andreessen Horowitz, participating investors Lightspeed and Menlo, 100+ firms live, 500% YoY revenue growth, named customers (Mike Morse Law Firm, Atlanta Personal Injury Law Group, Barrett & Farahany, Frontier Law Center). |
| https://www.prnewswire.com/news-releases/eve-raises-103-million-at-1-billion-valuation-to-help-plaintiff-firms-deliver-justice-through-ai-transformation-302570807.html | Eve Raises $103 Million at $1 Billion Valuation to Help Plaintiff Firms Deliver Justice Through AI Transformation | 2025-09-30 | 2026-07-18 | $103m Series B, disclosed "$1 billion" post-money valuation (per headline), lead investor Spark Capital, participating investors a16z, Lightspeed, Menlo. |

**graphMetrics evidence note:** proprietary_data_moat 0.5 (highest in batch alongside Squint) reflects case-outcome and workflow data compounding across plaintiff firms as a structurally strong data moat; regulatory_moat 0.3 reflects bar-rule and sensitive-medical-data handling requirements; competition_intensity 0.45 (moderate-low) reflects a still-emerging, plaintiff-specific competitive set (EvenUp, Alexi) rather than a fully saturated category.

## Cross-batch comps (StockAnalysis.com, fetched July 18, 2026)

| Ticker | Company | EV/Sales | Used for |
|---|---|---|---|
| INTU | Intuit | 3.81x | Basis, Numeric, Kick |
| BILL | BILL Holdings | 2.60x | Concourse, Numeric, Kick |
| BL | BlackLine | 2.71x | Concourse, Numeric, Basis, Kick |
| WK | Workiva | 3.39x | Concourse, Numeric, Basis |
| DOCU | DocuSign | 2.87x | Spellbook, Eve |
| INTA | Intapp | 3.78x | Spellbook, Eve |
| TRI | Thomson Reuters | 5.76x | Spellbook, Eve, Basis |
| LAW | CS Disco | 1.01x | Spellbook, Eve |
| CHRW | C.H. Robinson | 1.61x | HappyRobot |
| DSGX | Descartes Systems | 7.95x | HappyRobot |
| TRMB | Trimble | 3.65x | HappyRobot |
| IOT | Samsara | 12.20x | HappyRobot, Squint |
| PTC | PTC Inc. | 5.11x | Squint |
| ROK | Rockwell Automation | 6.25x | Squint |
| PCOR | Procore Technologies | 4.69x | Squint |
| CRM | Salesforce | 3.98x | Artisan |
| FIVN | Five9 | 1.73x | Artisan |
| MDB, SNOW, NET, DDOG, GTLB | MongoDB, Snowflake, Cloudflare, Datadog, GitLab | 8.74x / 18.20x / 42.05x / 24.13x / 4.15x | Dust (reused verbatim from the reference file's Mem0 memo, same source and as-of date) |
| HUBS, GTM | HubSpot, ZoomInfo | 3.04x / 1.85x | Artisan (reused verbatim from the reference file's Mem0/Rwazi memos) |

All tickers above were fetched from stockanalysis.com/stocks/TICKER/statistics/ on July 18, 2026, except the reused reference-file tickers, which were sourced from the same site on the same date within the reference file itself.

## WebSearch budget note

This research session's shared WebSearch allowance (across all ten concurrent batch agents) was exhausted partway through Batch 02's research. All research after that point used WebFetch against specific URLs (company sites, financing announcements, and stockanalysis.com pages) rather than additional open-ended searches. No claim in the batch relies on a search that could not be completed; where a specific fact could not be independently verified via WebFetch (e.g., HappyRobot founders' full names, Concourse's founder identity, Basis's research-team founders), the memo, JSON record, and this ledger all say so explicitly rather than filling the gap.

---

# Batch 03

**Access date for all URLs below:** July 18, 2026 (unless a different access context is noted).
**Batch:** 03 — Anterior, Freed, Counsel Health, Summer Health, Millie, Fay, Sohar Health, Tandem Health, Synthpop, Legion Health.

## Anterior

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.anterior.com/ | Anterior company site | N/A | 2026-07-18 | Product description, "Florence" AI agent, general positioning |
| https://www.businesswire.com/news/home/20240610719247/en/Anterior-Secures-$20-Million-Series-A-to-Unlock-Administrative-Efficiencies-for-Healthcare-Payers | Anterior Secures $20 Million Series A | 2024-06-10 | 2026-07-18 | Series A amount ($20m), lead investor (NEA), participants (Sequoia, Blue Lion Global, Neo) |
| https://techcrunch.com/2024/06/08/anterior-grabs-20m-from-nea-at-95m-valuation-to-expedite-health-insurance-approvals-with-ai/ | Anterior grabs $20M from NEA at $95M valuation (TechCrunch) | 2024-06-08 | 2026-07-18 | Series A post-money valuation ($95m, disclosed), founder Abdel Mahmoud's background |
| https://www.anterior.com/insights/anterior-raises-40m-series | Anterior closes $40 Million to accelerate health plan AI adoption | 2026-02 (approx.) | 2026-07-18 | Series B amount ($40m), total funding ($64m), investors (NEA, Sequoia, FPV, Kinnevik), 50M covered lives, deployment metrics |
| https://www.fiercehealthcare.com/ai-and-machine-learning/payer-ai-company-anterior-banks-40m-funding-round | Payer AI company Anterior banks $40M funding round (Fierce Healthcare) | 2026-02 (approx.) | 2026-07-18 | Corroboration of Series B financing details |
| https://www.alleywatch.com/2026/03/anterior-health-insurance-clinical-ai-platform-prior-authorization-payer-workflow-administrative-efficiency-abdel-mahmoud/ | Anterior Raises $40M (AlleyWatch) | 2026-03 | 2026-07-18 | KLAS Research 99.24% accuracy validation, 182-second average approval time, 75% review-cycle reduction, Geisinger Health Plan and MedWatch deployments |
| https://www.sliceofhealthcare.com/anterior-secures-20m-series-a-to-revolutionize-healthcare-administration | Anterior Secures $20M Series A (Slice of Healthcare) | 2024 | 2026-07-18 | Attempted founder-list corroboration (page content not retrievable at fetch time; not used as a source for unconfirmed founder names) |

**graphMetrics evidence notes:** ai_adoption (0.85) and technical_feasibility (0.75) reflect the KLAS-validated 99.24% accuracy claim and production deployment at scale; regulatory_moat (0.7) reflects payer-facing, clinically consequential AI subject to emerging state AI-in-utilization-review regulation; competition_intensity (0.6) reflects multiple funded private competitors (Cohere Health, Rialtic, XSOLIS) plus incumbent payer/EHR-native tooling.

## Freed

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.getfreed.ai/ | Freed company site | N/A | 2026-07-18 | Product description, pricing ($39/mo scribe, $149/mo Front Desk), 26,000+ clinicians, 1,300+ clinics, 32.6m visits transcribed in 2025, 98% recall claim |
| https://www.getfreed.ai/press/freed-secures-30m-series-a-led-by-sequoia-capital-to-free-clinicians-from-administrative-burdens-with-ai-assistant | Freed Secures $30M Series A Led by Sequoia Capital | 2025-03-05 | 2026-07-18 | Series A amount ($30m), lead investor (Sequoia), participants, total funding ($34m) |
| https://www.cnbc.com/2025/03/05/freed-raises-30-million-led-by-sequoia-to-tackle-clinician-burnout.html | Ex-Facebook engineer tackling clinician burnout at Freed (CNBC) | 2025-03-05 | 2026-07-18 | Founder backgrounds (Erez Druk, Andrey Bannikov, former Meta engineers), founding story |

**graphMetrics evidence notes:** ai_adoption (0.9) reflects core ambient-AI product; competition_intensity (0.85) reflects a crowded, well-funded AI-scribe category (Abridge, Ambience, Nuance DAX, Suki, Nabla, Heidi Health); regulatory_moat (0.25) reflects that Freed has not pursued medical-device-level certification, unlike Tandem Health in this same batch.

## Counsel Health

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.counselhealth.com/ | Counsel Health company site | N/A | 2026-07-18 | General product positioning |
| https://www.counselhealth.com/about | About Us page | N/A | 2026-07-18 | Leadership team (Alagappan, Khakhkhar, Hughes), care model, HIPAA/SOC2 compliance |
| https://www.businesswire.com/news/home/20251016535098/en/Counsel-Health-Raises-$25M-to-Launch-Physician-Supervised-AI-Front-Door-for-Healthcare | Counsel Health Raises $25M (BusinessWire) | 2025-10-16 | 2026-07-18 | Series A amount ($25m), co-leads (a16z, GV), 100,000+ members served |
| https://a16z.com/announcement/investing-in-counsel-health/ | Investing in Counsel Health (a16z) | 2025-10 (approx.) | 2026-07-18 | Founder Muthu Alagappan's background (Stanford MD, Notable Health CMO, Beth Israel/UCSF attending physician) |
| https://pear.vc/dr-muthu-alagappan-ceo-and-founder-of-counsel-on-defining-a-new-healthcare-paradigm-in-asynchronous-care/ | Dr. Muthu Alagappan, CEO and Founder of Counsel (Pear VC) | N/A | 2026-07-18 | Confirms Alagappan as sole named founder; detailed background |
| https://www.fiercehealthcare.com/ai-and-machine-learning/counsel-health-raises-25m-series-rolls-out-consumer-chatbot | Counsel Health raises $25M Series A (Fierce Healthcare) | 2025-10 | 2026-07-18 | Pricing ($29/visit, $199/year), product mechanics |

**graphMetrics evidence notes:** competition_intensity (0.8) reflects a category with a mixed track record of prior entrants (K Health, 98point6); regulatory_moat (0.5) reflects physician-supervision model as a partial compliance differentiator without a unique regulatory barrier.

## Summer Health

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.summerhealth.com/ | Summer Health company site | N/A | 2026-07-18 | Product description (74-biomarker panel, $299/year), pediatrician credentials |
| https://www.prnewswire.com/news-releases/summer-health-announces-series-a-fundraise-from-7wireventures-and-lux-capital-302125060.html | Summer Health Announces Series A Fundraise (PR Newswire) | 2024-04-23 | 2026-07-18 | Series A amount ($11.65m), co-leads (7wireVentures, Lux Capital), participants, pricing ($45/month), founding date (July 2022) |
| https://www.fiercehealthcare.com/digital-health/summer-health-pockets-12m-series-grow-text-based-pediatric-service | Summer Health pockets $12M Series A (Fierce Healthcare) | 2024-04 | 2026-07-18 | Corroboration of Series A and text-based product model |
| https://femtechinsider.com/summer-health-series-a/ | Summer Health Secures $11.65M Series A (Femtech Insider) | 2024-04 | 2026-07-18 | Product description, investor list |
| https://www.7wireventures.com/perspectives/7wireventures-presents-top-of-the-ladder-featuring-summer-health-founder-and-ceo-ellen-dasilva/ | 7wireVentures profile of Ellen DaSilva | N/A | 2026-07-18 | Founder background (Hims & Hers employee #8, Twitter) |
| https://pearhealthcareplaybook.substack.com/p/lessons-from-ellen-dasilva-and-matthew | Lessons from Ellen DaSilva and Matthew Woo (Pear Healthcare Playbook) | N/A | 2026-07-18 | Co-founder Matthew Woo's background |

**graphMetrics evidence notes:** ai_adoption (0.3) reflects a messaging-workflow product without a disclosed core LLM/AI architecture claim; the absence of any publicly reported financing since April 2024 is treated as a caveat in the memo rather than a graphMetrics score, since it is a risk signal, not a company-kind attribute.

## Millie

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.millieclinic.com/ | Millie Clinic company site (correct domain; roster hint milliehealth.com is unrelated) | N/A | 2026-07-18 | Confirms this is the maternity-care company; domain correction |
| https://www.milliehealth.com/ | Moonshot Health Inc. "Millie" site | N/A | 2026-07-18 | Confirms milliehealth.com is a different, unrelated company (home-safety monitoring, pre-launch) — used only to document the domain collision, not as a source about the maternity-care company |
| https://www.millieclinic.com/about | About Our Clinic | N/A | 2026-07-18 | Clinic locations (Berkeley, South Bay), insurance acceptance |
| https://www.millieclinic.com/blog/why-we-built-millie | The Millie story: Better maternity care for all | N/A | 2026-07-18 | Founding story, founder names and roles (Anu Sharma, Talia Borgo, Sarah Reynolds), Sharma's 2019 postpartum health crisis |
| https://www.businesswire.com/news/home/20250220127655/en/Millie-Secures-$12M-Series-A-to-Continue-Closing-Gaps-in-Maternal-Healthcare | Millie Secures $12M Series A (BusinessWire) | 2025-02-20 | 2026-07-18 | Series A amount ($12m), co-leads (TMV, Foreground Capital), participants |
| https://techcrunch.com/2025/02/26/maternity-clinic-millie-nabs-12m-series-a-from-an-all-star-all-female-class-of-vcs/ | Maternity clinic Millie nabs $12M Series A (TechCrunch) | 2025-02-26 | 2026-07-18 | ~2,000 patients cared for, San Jose clinic plans, total funding (~$19m) |

**graphMetrics evidence notes:** ai_adoption (0.15) reflects a clinical-care-delivery model with limited disclosed AI/software centrality; legacy_disruptiveness (0.55) reflects the continuous-care model versus standard episodic obstetric care; competition_intensity (0.45) reflects a fragmented incumbent base with only a few well-funded direct comps (Pomelo Care, Maven Clinic, Ouma Health).

## Fay

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.faynutrition.com/ | Fay company site | N/A | 2026-07-18 | Product description, insurer partnerships |
| https://www.faynutrition.com/post/fay-emerges-with-25m-in-funding | Fay Emerges with $25M in Funding | 2024-05 (approx.) | 2026-07-18 | Series A amount ($20m), seed round, founders (Sammy Faycurry, Mark Stefanski), 1,000+ dietitians, 30+ specialties, insurer list |
| https://www.faynutrition.com/post/fay-series-b-announcement | Fay Announces $50M Series B Led by Goldman Sachs | 2025-02-05 | 2026-07-18 | Series B amount ($50m), disclosed $500m post-money valuation, lead investor (Goldman Sachs), total funding ($75m) |
| https://www.businesswire.com/news/home/20250205519644/en/Fay-Raises-$50M-Series-B-at-a-$500M-Valuation-to-Revolutionize-How-We-Think-and-Feel-About-Food | Fay Raises $50M Series B at a $500M Valuation (BusinessWire) | 2025-02-05 | 2026-07-18 | Corroboration of Series B amount and disclosed $500m valuation |
| https://www.fiercehealthcare.com/health-tech/startups-fay-and-berry-street-each-bank-50m-growing-investor-appetite-personalized | Startups Fay and Berry Street each bank $50M (Fierce Healthcare) | 2025-02 | 2026-07-18 | Category-level corroboration; competitor Berry Street's comparable raise |
| https://www.forerunnerventures.com/perspectives/how-fay-is-scaling-customized-nutrition-care-for-consumers-while-reshaping | Investing in Fay (Forerunner Ventures) | N/A | 2026-07-18 | Business-model description ("digitally native franchise"), founder motivation |

**graphMetrics evidence notes:** competition_intensity (0.75) reflects direct, similarly-funded competitors Berry Street and Nourish in the same insurance-billing-automation wedge; the $500m disclosed valuation is the load-bearing fact behind this memo's Pass recommendation and is treated as a disclosed fact, not an HCP assumption, per the schema's valuation field guidance.

## Sohar Health

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.soharhealth.com/ | Sohar Health company site | N/A | 2026-07-18 | Product features (discovery, verification, network status, cost estimate), named customers (Talkiatry, Rula, Headway, Mindful Health Solutions, Two Chairs), 5m+ checks/year, 96% accuracy |
| https://www.prnewswire.com/news-releases/sohar-health-lands-3-8m-to-open-the-front-door-to-faster-fairer-care-302414445.html | Sohar Health Lands $3.8M (PR Newswire) | 2025-03/04 (approx.) | 2026-07-18 | Seed amount ($3.8m), lead investor (Kindred Capital), participants, founder Ashish Mandavia, MD, "founded by a physician and an engineer in 2023" |
| https://www.soharhealth.com/products/verification | Verification product page | N/A | 2026-07-18 | Median 6-second response, 90% within 30 seconds, bulk API, 8:1 ROI, 12% conversion increase |
| https://www.ycombinator.com/companies/sohar-health | Sohar Health (Y Combinator) | N/A | 2026-07-18 | YC-backed status corroboration |

**graphMetrics evidence notes:** technical_feasibility (0.75) reflects disclosed sub-10-second median latency and bulk API architecture; regulatory_moat (0.3) reflects dependence on payer-published eligibility data rather than a proprietary regulatory barrier; competition_intensity (0.5) reflects established incumbents (Availity, Waystar) plus newer developer-first entrants (Stedi).

## Tandem Health

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://tandemhealth.ai/ | Tandem Health company site | N/A | 2026-07-18 | Product description, 5,000+ care organizations, 100+ EHR integrations, 50+ specialties, EU MDR Class IIa/GDPR/ISO 13485/ISO 27001/NHS DSPT compliance |
| https://sifted.eu/articles/tandem-series-a | Exclusive: AI startup Tandem Health raises $50m (Sifted) | 2026 (approx.) | 2026-07-18 | Series A amount ($50m), lead investor (Kinnevik), participants, founder Lukas Saari, 1,000+ organizations (at time of article), 200,000+ NHS professionals via Accurx, team growth (5 to 50) |
| https://www.kinnevik.com/insights/tandem-health-funding-round/ | Kinnevik leads Tandem Health's EUR 40m funding round | 2026 (approx.) | 2026-07-18 | Corroboration of Kinnevik-led round |
| https://siliconcanals.com/tandem-health-secures-42-6m/ | Sweden's Tandem Health secures €42.6M (Silicon Canals) | 2026 (approx.) | 2026-07-18 | Corroboration of funding amount in euros, Stockholm HQ |
| https://sifted.eu/articles/ai-startup-tandem-round-northzone-news | AI startup Tandem Health raises $9.5m (Sifted, earlier round) | Earlier (pre-Series A) | 2026-07-18 | Prior Northzone-led round ($9.5m), total funding reconciliation ($59.5m) |

**graphMetrics evidence notes:** regulatory_moat (0.7) reflects the disclosed EU MDR Class IIa medical-device certification, GDPR, ISO 13485, ISO 27001, and NHS DSPT compliance — a materially higher regulatory bar than most U.S. AI scribes; proprietary_data_moat (0.4) reflects large multi-country deployment scale without a disclosed unique data asset beyond documentation volume.

## Synthpop

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.synthpop.ai/ | Synthpop company site | N/A | 2026-07-18 | General product positioning |
| https://www.synthpop.ai/resources/synthpop-secures-5-6m-in-funding-to-revolutionize-ai-driven-healthcare-solution | Synthpop Secures $5.6M in Funding | 2024-06 (approx.) | 2026-07-18 | Seed amount ($5.6m), lead investors (Peterson Ventures, defy.vc), founders Elad Ferber and Jan Jannink with backgrounds (Spry Health/Itamar Medical acquisition, imeem/VoiceBase/Stanford) |
| https://www.businesswire.com/news/home/20260204938691/en/Synthpop-Raises-$15-Million-Series-A-to-Scale-AI-That-Makes-Healthcare-More-Human | Synthpop Raises $15 Million Series A (BusinessWire) | 2026-02-04 | 2026-07-18 | Series A amount ($15m), lead investor (Ansa Capital), total funding ($23m) |
| https://sleepreviewmag.com/sleep-diagnostics/connected-care/ai-machine-learning/healthcare-ai-company-synthpop-raises-15-million-to-automate-administrative-workflows/ | Healthcare AI Company Synthpop Raises $15 Million (Sleep Review) | 2026-02 | 2026-07-18 | DME/IDTF/infusion-therapy focus, product names (Fax Wrangler, Field Extractor, Order Validation, AI Caller), 2M+ patients processed, 8 EHR integrations, 40-minute-to-under-1-minute claim, 5x cost reduction |
| https://www.hmenews.com/article/synthpop-hits-23m-in-funding | Synthpop hits $23M in funding (HME News) | 2026-02 (approx.) | 2026-07-18 | Total funding corroboration ($23m), DME-industry trade-press corroboration |

**graphMetrics evidence notes:** competition_intensity (0.4) reflects a narrow, less-contested vertical relative to horizontal RCM platforms; regulatory_moat (0.35) reflects payer-specific DME coverage-rule complexity as a moderate, not category-defining, barrier.

## Legion Health

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.legionhealth.com/ | Legion Health company site (correct domain; roster hint legionhealth.ai does not resolve) | N/A | 2026-07-18 | Product description, conditions treated, insurance acceptance (Blue Cross, Aetna, Cigna, Magellan, Oscar, UnitedHealthcare), pricing ("as low as $0 with insurance"), YC-backed |
| https://bhbusiness.com/2024/10/16/legion-health-pivots-to-digital-ai-enabled-psychiatry-raises-over-6m/ | Legion Health Pivots to Digital AI-Enabled Psychiatry, Raises Over $6M (Behavioral Health Business) | 2024-10-16 | 2026-07-18 | Seed amount ($6.3m), investors (Alumni Ventures, YC, Acequia Capital, Soma Capital, angels), founders (Yash Patel, Arthur MacWaters, Daniel Wilson), 2022 founding date, pivot narrative, prior $2m raised, "95% of administrative work" automation claim |
| https://www.ycombinator.com/companies/legion-health | Legion Health (Y Combinator) | N/A | 2026-07-18 | YC-backed status corroboration |
| https://nextdigitalhealth.com/funding-news/legion-health-bags-6-3m-to-advance-ai-digital-platform-for-psychiatry-practice/ | Legion Health Bags $6.3M (Next Digital Health) | 2024-10 | 2026-07-18 | Corroboration of seed round details |

**graphMetrics evidence notes:** regulatory_moat (0.3) and competition_intensity (0.8) jointly reflect a crowded telepsychiatry category with real regulatory precedent (Cerebral and Done Global both drew DOJ/DEA scrutiny over controlled-substance prescribing, per widely reported public coverage of those companies — cited here as category context, not as claims about Legion Health itself).

## Batch-level notes

- Public-company EV/LTM revenue multiples were fetched from stockanalysis.com/stocks/&lt;ticker&gt;/statistics/ on 2026-07-18 for: Veeva Systems (VEEV, 7.39x), Evolent Health (EVH, 0.79x), HealthStream (HSTM, 2.50x), Definitive Healthcare (DH, 0.42x), Health Catalyst (HCAT, 0.75x), Certara (CERT, 2.94x), Waystar Holding (WAY, 4.84x), R1 RCM (RCM, 3.32x), Progyny (PGNY, 1.78x), agilon health (AGL, 0.34x), and Accolade (ACCD, 1.32x).
- Multiples for Hims & Hers (HIMS, 3.37x), LifeMD (LFMD, 0.89x), Teladoc (TDOC, 0.79x), Doximity (DOCS, 4.85x), and Privia Health (PRVA, 1.33x) were reused directly from the HCP reference memo's linked stockanalysis.com pages for the same tickers, per this batch's instructions, rather than re-fetched.
- No company in this batch required a roster substitution from the listed alternates (Develop Health, Solace); all ten assigned companies were verified as real, independent, in-scope, and free of overlap with each other or with the excluded reference-file companies (Mem0, Sekai, Alinea Invest, Sett, Tailor, Cedar Money, Bevel, Rwazi, Phia, Twentyeight Health).
- Two roster URL hints were corrected after verification: Millie's actual site is millieclinic.com (not milliehealth.com, which belongs to an unrelated company); Legion Health's actual site is legionhealth.com (not legionhealth.ai, which does not resolve).

---

# Batch 04

**Access date for all URLs below:** July 18, 2026, unless a different access context is noted.

## Roster swap note

Company 9, Moment (momentmarkets.com), was replaced with Keep (trykeep.com) after both Moment and the first-listed alternate, DolarApp (dolarapp.com), were found to have outgrown the fund's $1.0m-$2.5m check-size mandate. See `moment.com/series-c` and `arqfinance.com` rows below for the evidence.

## 1. Herald

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://www.heraldai.com/ | Herald official site (heraldapi.com redirects here) | Live site | Product description, current domain/branding |
| https://www.prnewswire.com/news-releases/herald-raises-12-million-to-revolutionize-insurance-connectivity-with-ai-powered-solutions-302277522.html | "Herald Raises $12 Million to Revolutionize Insurance Connectivity with AI-Powered Solutions" | Oct 16, 2024 | Series A amount, lead/participating investors, founder name (Matt Antoszyk, CEO), 8-of-top-25-brokerages and 35+ carrier/80+ product figures |
| https://www.heraldapi.com/blog/announcing-our-8m-seed-round-to-build-digital-infrastructure-for-commercial-insurance | Herald seed-round blog post | Dec 15, 2021 (per aggregator cross-reference) | Prior $8m seed round, bringing total funding to $20m |
| https://docs.heraldapi.com/ | Herald API Reference | Live site | Product/API structure confirmation |
| https://www.carriermanagement.com/news/2024/10/24/267980.htm | "Herald Raises $12M in Series A Funding Round" | Oct 24, 2024 | Independent corroboration of Series A terms |

**Evidence for graphMetrics:** ai_adoption 0.55 (AI-driven submission-data extraction is a named product feature, not the entire product); legacy_disruptiveness 0.7 (replaces manual per-carrier re-keying, a well-documented industry pain point); regulatory_moat 0.5 (insurance-adjacent but Herald itself is not a licensed carrier/broker); proprietary_data_moat 0.6 (carrier appetite/quoting data across 35+ carriers accumulates with usage); competition_intensity 0.5 (legacy AMS incumbents and newer insurtech API entrants both present, but Herald has disclosed top-25-brokerage traction incumbents lack).

## 2. Straddle

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://straddle.com/ | Straddle official site (straddle.io redirects here) | Live site | Product description (Pay by Bank, Watchtower, Embed, identity verification), location (Broomfield, CO) |
| https://straddle.com/pay-by-bank | Straddle Pay by Bank product page | Live site | Product feature detail |
| https://www.crunchbase.com/organization/straddle-db8e | Crunchbase company profile | Accessed via search snippet | Seed round amount ($1.25m), date (Aug 11, 2024), investor list (Bonfire Ventures, Veridical Ventures, Drive Capital, Kickstart) — aggregator-sourced; no primary press release located, flagged as a caveat |
| https://docs.straddle.com/guides/payments/funding | Straddle documentation | Live site | Product mechanics confirmation |

**Sourcing caveat:** No primary financing press release for Straddle's seed round was located despite multiple targeted searches; funding terms rest on convergent aggregator data (Crunchbase, PitchBook, Tracxn all independently report the same $1.25m/Aug 2024/Bonfire-led figures), which is a weaker sourcing tier than the primary press releases used for the rest of this batch.

**Evidence for graphMetrics:** ai_adoption 0.2 (no AI-centric feature disclosed; product is identity/payments infra); legacy_disruptiveness 0.55 (bank-pull payments replacing card rails is a real but incremental shift); regulatory_moat 0.5 (money-transmission/AML-adjacent infrastructure); proprietary_data_moat 0.4 (identity/fraud signal accumulates with transaction volume but company is early); competition_intensity 0.7 (Plaid, Astra, Trustly all compete directly).

## 3. Mercoa

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://mercoa.com/ | Mercoa official site | Live site | Product description (AP/AR, CardPay agent), named customers (Clyr, Joltly, Accountable, InBuild, Spacetil, Backdrop), active pricing/signup CTA evidencing ongoing operation |
| https://www.ycombinator.com/companies/mercoa | Y Combinator company profile | Live site | Status "Active," W23 batch, founder names (Sai Arora, Sandeep Dinesh) and Dinesh's background (Stripe, Furmacy YC W21, Google Cloud), product pivot description |
| https://mercoa.com/changelog | Mercoa product changelog | Entries through Aug 27, 2025 | Evidence of active, maintained product as recently as August 2025 |
| https://www.openbankingtracker.com/embedded-finance/mercoa | Mercoa review page | Accessed live | States "Mercoa has been discontinued" — directly contradicts the three sources above; treated as an unresolved conflict, not fact, per the memo's risk section |

**Sourcing caveat:** A material, unresolved conflict exists between a third-party aggregator claiming Mercoa is discontinued and three independent, more authoritative sources (Mercoa's own live site, its changelog with 2025 activity, and Y Combinator's "Active" status) showing it operating. This is flagged as the top diligence item in the memo and is the basis for the "Watch" recommendation rather than a stronger label.

**Evidence for graphMetrics:** ai_adoption 0.5 (AI bill-inbox processing and CardPay agent are named features); legacy_disruptiveness 0.65 (replaces manual check/ACH vendor payment processes); proprietary_data_moat 0.45 (vendor card-acceptance data is a genuine differentiator per the product's own framing); competition_intensity 0.75 (Bill.com, Melio, Routable all compete directly for embedded AP/AR).

## 4. Ansa

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://ansa.dev/ | Ansa official site (getansa.com redirects here) | Live site | Product description, Compass Coffee case study (30% visit-frequency increase), target verticals |
| https://techcrunch.com/2024/04/30/wallet-as-a-service-startup-ansa-raises-14m-with-female-investors-leading-the-way/ | "'Wallet-as-a-service' startup Ansa raises $14 million with female investors leading the way" | Apr 30, 2024 | Series A amount, lead/participating investors, founder backgrounds (Goldberg ex-Adyen, Cho ex-Affirm), prior $5.4m seed, ~$20m total funding, 95.6% female-investor stat, Q1 2024 customer-doubling claim |
| https://www.prnewswire.com/news-releases/ansa-raises-14-million-series-a-funding-to-redefine-merchant-transaction-solutions-302131675.html | Ansa Series A press release | Apr 2024 | Independent corroboration of Series A terms |

**Evidence for graphMetrics:** ai_adoption 0.15 (no AI-centric feature disclosed); legacy_disruptiveness 0.5 (stored value is an established mechanic; Ansa's contribution is infrastructure access, not a novel mechanism); proprietary_data_moat 0.4 (balance/loyalty data accumulates per merchant but no cross-merchant network effect disclosed); competition_intensity 0.6 (Fiserv/Marqeta-powered issuers and vertical loyalty players compete, but few direct white-label wallet-as-a-service peers disclosed).

## 5. Kudos

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://joinkudos.com | Kudos official site | Live site | Product tagline/positioning confirmation (page content limited beyond title) |
| https://techcrunch.com/2024/05/17/kudos-ai-smart-wallet-10m-credit-card/ | "Kudos lands $10M for an AI smart wallet that picks the best credit card for purchases" | May 17, 2024 | Series A amount, lead investor (QED), founder names/backgrounds (Anazodo, Ismail — Google/Affirm), user growth (1,000 to 200,000), GMV ($200m+ annualized), "still early stages of revenue generation" characterization |
| https://www.finextra.com/newsarticle/44168/kudos-raises-102m-for-ai-powered-smart-wallet | "Kudos raises $10.2m for AI-powered smart wallet" | May 2024 | Independent corroboration of Series A terms and total funding ($17.2m) |

**Evidence for graphMetrics:** ai_adoption 0.7 (MariaGPT LLM-based recommendation is the core product mechanism); legacy_disruptiveness 0.35 (automates a manual decision but does not displace an incumbent system); proprietary_data_moat 0.5 (spend-data-driven recommendation accuracy compounds with usage); competition_intensity 0.7 (NerdWallet, Credit Karma, MaxRewards, Extend all compete for card-optimization attention).

## 6. Baselayer

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://baselayer.com/ | Baselayer official site (baselayerhq.com redirects here) | Live site | Product feature detail, "2,200+ financial institutions" claim, customer-reported approval/manual-review improvement stats |
| https://www.businesswire.com/news/home/20240501810500/en/Baselayer-Raises-$6.5M-Seed-Round-to-Redefine-Business-Risk-with-AI-Risk-Engine | "Baselayer Raises $6.5M Seed Round to Redefine Business Risk with AI Risk Engine" | May 1, 2024 | Seed amount, "5x oversubscribed," investor list (Torch Capital, Afore Capital, Founder Collective, Picus Capital, Gilgamesh Ventures), named angel executives (Eric Woodward ex-Early Warning Services, Jason Mikula), founder names (Jonathan Awad, Timothy Hyde), 2023 founding |
| https://baselayer.com/business-verification/ | Baselayer KYB product page | Live site | Product mechanics (SoS matching, TIN validation, sanctions screening) |
| https://baselayer.com/identity-network/ | Baselayer Identity Network page | Live site | Fraud-consortium network-effect claim |

**Evidence for graphMetrics:** ai_adoption 0.65 (AI risk engine, industry prediction, and "Risk Co.Pilot" are named core features); legacy_disruptiveness 0.7 (replaces manual KYB underwriting processes); regulatory_moat 0.6 (KYB/AML/sanctions compliance is core to the product); proprietary_data_moat 0.7 (cross-institution fraud consortium is an explicit, disclosed network-effect mechanism); competition_intensity 0.7 (Middesk, Alloy, Persona, and bureau incumbents Equifax/TransUnion all compete).

## 7. Felix Pago

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://www.felixpago.com | Felix Pago official site | Live site | Current ten-country payout footprint, 40,000+ payout locations, 300,000+ users, referral-program terms |
| https://techcrunch.com/2024/05/28/felix-pago-raises-15-5-million-to-help-latino-workers-send-money-home-via-whatsapp/ | "Félix Pago raises $15.5 million to help Latino workers send money home via WhatsApp" | May 28, 2024 | Series A amount, lead investor (Castle Island Ventures), founder names (Manuel Godoy CEO, Bernardo García), USDC/Circle mechanism, original 3-country footprint, pricing ($2.50 flat fee), ~30% MoM growth at the time |
| https://www.qedinvestors.com/blog/why-we-invested-in-felix-pago | "Why QED Invested in Felix Pago" | 2024/2025 | Independent investor-perspective corroboration of thesis and traction |

**Evidence for graphMetrics:** ai_adoption 0.3 (company markets "AI and blockchain" broadly but the differentiated value driver is the WhatsApp UX and stablecoin rail, not a specific AI feature); legacy_disruptiveness 0.75 (directly displaces Western Union-style cash-pickup remittance flows); regulatory_moat 0.65 (money-transmission licensing across ten countries is a real barrier to replicate); competition_intensity 0.75 (Western Union, Remitly, Wise, Xoom all compete for the same flow).

## 8. Formance

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://www.formance.com/ | Formance official site | Live site | Product modules (Ledger, Connectivity, Flows, Reconciliation), named customers (Liberis, Doctolib, Payflip, Shares, Bastion, GetMomo, Stables), SOC 2/ISO 27001/DORA claims |
| https://www.formance.com/blog/company/formance-secures-21-million-dollar-in-series-a-funding-co-led-by-paypal-ventures-and-portage-ventures-to-expand-its-open-source-financial-infrastructure | Formance Series A announcement | Jan 29, 2025 | Series A amount and co-leads (PayPal Ventures, Portage Ventures), participants (YC, Hoxton Ventures, Axeleo Capital) |
| https://techcrunch.com/2025/01/29/formance-raises-21-million-to-build-the-aws-of-fintech-infrastructure/ | "Formance raises $21M to build the AWS for fintech infrastructure" | Jan 29, 2025 | Founder names/backgrounds (Clément Salaün ex-Selency, Anne-Sybille Pradelles ex-Alsid), 2021 founding, 10x revenue growth claim, headcount plans |
| https://github.com/formancehq/ledger | Formance Ledger GitHub repository | Live | Open-source core confirmation |

**Evidence for graphMetrics:** ai_adoption 0.15 (no AI-centric feature disclosed; core product is a deterministic programmable ledger); legacy_disruptiveness 0.55 (replaces costly in-house ledger builds, an established but real pain point); regulatory_moat 0.3 (Formance itself is infrastructure, not a regulated financial entity, though its certifications support regulated customers); competition_intensity 0.6 (Modern Treasury, Unit, and in-house builds all compete, but the open-source-plus-managed-cloud model is relatively differentiated).

## 9. Keep (swap for Moment)

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://moment.com/series-c | Moment Series C announcement | May 19, 2026 | Basis for the swap: $78m Series C led by Index Ventures, $134m total funding to date — confirms Moment has outgrown the fund's check-size mandate |
| https://arqfinance.com/ | ARQ (formerly DolarApp) official site | Live site | Basis for skipping the first alternate: confirms DolarApp rebrand to ARQ, 2 million users across Mexico/Argentina/Colombia/Brazil |
| (search-derived, ARQ Series A coverage: seedtable.com, cryip.co) | ARQ/DolarApp Series A reporting | Mar 3, 2026 | $70m Series A led by Sequoia Capital and Founders Fund, $10bn company-reported annualized transaction volume — confirms ARQ also outgrew the fund's mandate |
| https://www.trykeep.com/ | Keep official site | Live site | Product description, "5,000+ Canadian companies," $90m+ processed, card issuer (Peoples Trust/Mastercard), application/approval timelines |
| https://www.prnewswire.com/news-releases/keep-raises-c108m-to-transform-small-business-banking-in-canada-302459385.html | "Keep Raises C$108M to Transform Small Business Banking in Canada" | May 2025 | Funding package breakdown (C$33m equity/C$71m credit facility/C$4m venture debt), lead investor (Tribe Capital), founder name/background (Oliver Takach), C$20m+ 2024 ARR, 300%+ NRR, 3,000+ SMBs, founded 2022, Toronto HQ |
| https://www.newswire.ca/news-releases/keep-raises-c-108m-to-transform-small-business-banking-in-canada-879787919.html | Newswire.ca syndication of the same release | May 2025 | Independent corroboration of funding terms |
| https://www.fintech.ca/2025/05/20/keep-emerges-stealth-transform-finance-small-business/ | "Keep Emerges from Stealth with $108M to Transform Finance for Small Business" | May 20, 2025 | Independent trade-press corroboration |

**Sourcing caveat:** A single lower-confidence aggregator (sacra.com) names a possible second co-founder (Helson Taveras) and also misattributes the CEO title to "Rob Frohwein" (likely conflation with a different, unrelated company also named "Keep"). Only Oliver Takach is included as a verified founder in the JSON record; the memo flags the second-co-founder question as unresolved.

**Evidence for graphMetrics:** ai_adoption 0.35 (AI-powered transaction categorization is a named but not central feature); legacy_disruptiveness 0.5 (targets a real gap versus Canadian incumbent bank SMB products); regulatory_moat 0.45 (depends on a banking-as-a-service partner, Peoples Trust, for card issuance); proprietary_data_moat 0.4 (SMB spend data accumulates but not disclosed as a distinct network-effect mechanism); competition_intensity 0.75 (Brex, Ramp, Float, and incumbent Canadian banks all compete).

## 10. Layer

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://www.layerfi.com/ | Layer official site | Live site | Product description, named customers and adoption stats (Moxie 40%+, Nav and Duet 25%+ within three months, Dripos), San Francisco HQ |
| https://www.globenewswire.com/news-release/2025/07/09/3112479/0/en/Layer-Raises-6-6M-Led-by-Emergence-Capital-to-Bring-Embedded-Accounting-to-the-SMB-Software-Stack.html | "Layer Raises $6.6M Led by Emergence Capital to Bring Embedded Accounting to the SMB Software Stack" | Jul 9, 2025 | Seed amount, lead investor (Emergence Capital), participant (Better Tomorrow Ventures), founder names (Justin Meretab, Daniel O'Neel), 2023 founding, quadrupled customer base, 30,000+ SMBs supported |
| https://techcrunch.com/2024/05/15/embedded-accounting-layer-2-3m-quickbooks/ | "Embedded accounting startup Layer secures $2.3M toward goal of replacing QuickBooks" | May 15, 2024 | Prior pre-seed amount and investor detail (Better Tomorrow Ventures plus Square/Plaid/Unit/Check executive angels) |

**Sourcing caveat:** the roster's URL hint (golayer.io) resolves to an unrelated Google Sheets automation company (per Crunchbase, reportedly acquired by Sheetgo in 2023), not the embedded-accounting company described in the roster's segment label. HCP used layerfi.com, the correct company matching "embedded accounting API," and notes this URL correction explicitly.

**Evidence for graphMetrics:** ai_adoption 0.6 (AI-powered bookkeeping is a disclosed core capability); legacy_disruptiveness 0.55 (displaces the default QuickBooks-as-separate-tool pattern for SMB platforms); proprietary_data_moat 0.45 (embedded SMB financial data creates switching cost per platform partner); competition_intensity 0.65 (Intuit QuickBooks, Puzzle, Digits, and Bill.com all compete for SMB accounting attention).

## General / cross-cutting sources

| URL | Source title | Publication date | Claims supported |
|---|---|---|---|
| https://stockanalysis.com/stocks/gwre/statistics/ | Guidewire (GWRE) statistics | Jul 18, 2026 snapshot | EV/Sales 8.76x (Herald comp) |
| https://stockanalysis.com/stocks/vrsk/statistics/ | Verisk (VRSK) statistics | Jul 18, 2026 snapshot | EV/Sales 9.80x (Herald comp) |
| https://stockanalysis.com/stocks/cccs/statistics/ | CCC Intelligent Solutions (CCCS) statistics | Jul 18, 2026 snapshot | EV/Sales 4.51x (Herald comp) |
| https://stockanalysis.com/stocks/spns/statistics/ | Sapiens International (SPNS) statistics | Jul 18, 2026 snapshot | EV/Sales 4.24x (Herald comp) |
| https://stockanalysis.com/stocks/mq/statistics/ | Marqeta (MQ) statistics | Jul 18, 2026 snapshot | EV/Sales 1.76x (Straddle, Ansa, Formance comp) |
| https://stockanalysis.com/stocks/fi/statistics/ | Fiserv (FI) statistics | Jul 18, 2026 snapshot | EV/Sales 2.63x (Straddle, Ansa, Formance comp) |
| https://stockanalysis.com/stocks/gpn/statistics/ | Global Payments (GPN) statistics | Jul 18, 2026 snapshot | EV/Sales 4.41x (Straddle, Mercoa comp) |
| https://stockanalysis.com/stocks/bill/statistics/ | Bill.com (BILL) statistics | Jul 18, 2026 snapshot | EV/Sales 2.60x (Mercoa, Layer comp) |
| https://stockanalysis.com/stocks/avdx/statistics/ | AvidXchange (AVDX) statistics | Jul 18, 2026 snapshot | Confirms AVDX delisted Oct 15, 2025 (acquired by TPG/Corpay); excluded from live comp tables |
| https://stockanalysis.com/stocks/bl/statistics/ | BlackLine (BL) statistics | Jul 18, 2026 snapshot | EV/Sales 2.71x (Mercoa, Layer comp) |
| https://stockanalysis.com/stocks/nrds/statistics/ | NerdWallet (NRDS) statistics | Jul 18, 2026 snapshot | EV/Sales 0.68x (Kudos comp) |
| https://stockanalysis.com/stocks/efx/statistics/ | Equifax (EFX) statistics | Jul 18, 2026 snapshot | EV/Sales 4.17x (Baselayer comp) |
| https://stockanalysis.com/stocks/tru/statistics/ | TransUnion (TRU) statistics | Jul 18, 2026 snapshot | EV/Sales 4.30x (Baselayer comp) |
| https://stockanalysis.com/stocks/fico/statistics/ | Fair Isaac (FICO) statistics | Jul 18, 2026 snapshot | EV/Sales 14.45x (Baselayer comp) |
| https://stockanalysis.com/stocks/wu/statistics/ | Western Union (WU) statistics | Jul 18, 2026 snapshot | EV/Sales 1.11x (Felix Pago comp) |
| https://stockanalysis.com/stocks/ncno/statistics/ | nCino (NCNO) statistics | Jul 18, 2026 snapshot | EV/Sales 3.57x (Formance comp) |
| https://stockanalysis.com/stocks/nu/statistics/ | Nu Holdings (NU) statistics | Jul 18, 2026 snapshot | EV/Sales 7.42x (Keep comp) |
| https://stockanalysis.com/stocks/afrm/statistics/ | Affirm (AFRM) statistics | Jul 18, 2026 snapshot | EV/Sales 8.26x (Keep comp) |
| https://stockanalysis.com/stocks/intu/statistics/ | Intuit (INTU) statistics | Jul 18, 2026 snapshot | EV/Sales 3.81x (Mercoa, Layer comp) — flagged as an unusually low multiple relative to Intuit's typical historical range; used as-is per this project's convention of trusting the stockanalysis.com snapshot, but worth a manual spot-check before an investment committee meeting |
| https://stockanalysis.com/stocks/pypl/statistics/ | PayPal (PYPL) statistics | Jul 18, 2026 snapshot | EV/Sales 1.55x (Ansa comp) |
| Reused from the reference file (HCP_10_Investment_Memos_2026-07-18.md): PAYO 2.01x, RELY 2.59x, DLO 2.84x, SOFI 5.25x, HOOD 18.29x | — | Jul 18, 2026 snapshot (per reference file) | Straddle, Felix Pago, and Kudos/Keep comps, reused per the batch conventions rather than re-fetched |

---

# Batch 05

**Access date for all URLs:** July 18, 2026, unless otherwise noted.

## 1. Aembit

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://aembit.io/press-release/aembit-raises-25-million-in-series-a-funding-for-non-human-identity-and-access-management/ | Aembit Raises $25 Million in Series A Funding for Non-Human Identity and Access Management | Sept 12, 2024 | 2026-07-18 | Series A amount, lead/participating investors, total funding ("nearly $45 million"), founder names/titles, product description, Snowflake CISO customer reference |
| https://www.securityweek.com/non-human-iam-provider-aembit-raises-25-million/ | Non-Human IAM Provider Aembit Raises $25 Million | Sept 2024 | 2026-07-18 | Independent confirmation of Series A amount and investors |
| https://www.prnewswire.com/news-releases/cybersecurity-startup-aembit-launches-with-16-6m-in-total-funding-to-bring-identity-first-security-to-workloads-301776133.html | Cybersecurity Startup Aembit Launches with $16.6M in Total Funding | Mar 2023 | 2026-07-18 | Seed/pre-seed funding amount and Ballistic Ventures / Ten Eleven Ventures as seed investors |
| https://aembit.io/ | Aembit company site | n/a | 2026-07-18 | Product description, positioning |

**graphMetrics evidence notes:** ai_adoption 0.3 (agentic-AI-driven non-human identity growth is a stated tailwind, but the product itself is identity infrastructure, not an AI-native product); legacy_disruptiveness 0.6 (replaces static secrets/API keys, a well-established insecure pattern); technical_feasibility 0.8 (GA product with a named enterprise reference, Snowflake's CISO); regulatory_moat 0.3; proprietary_data_moat 0.3; competition_intensity 0.6 (SPIFFE/SPIRE open-source plus multiple funded NHI startups).

## 2. P0 Security

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.p0.dev/blog/15m-series-a | P0 Security Raises $15M Series A to Secure Cloud Access | Sept 2024 | 2026-07-18 | Series A amount, lead investor SYN Ventures, strategic investor Zscaler, existing investor Lightspeed, total funding ($20m), RSAC Innovation Sandbox finalist status |
| https://www.businesswire.com/news/home/20240910761539/en/P0-Security-Closes-$15M-Series-A-Funding-to-Help-Enterprises-Govern-and-Secure-Cloud-Access-for-All-Human-and-Machine-Identities-in-Minutes | P0 Security Closes $15M Series A Funding | Sept 10, 2024 | 2026-07-18 | Independent confirmation of Series A details |
| https://p0.dev/about/ | Why P0 - P0 Security | n/a | 2026-07-18 | Founder names and titles (Sehgal, Danyi, Brahms), product/mission description |
| https://p0.dev/outcomes/use-cases/access-management/just-in-time/ | Just-in-time (JIT) - P0 Security | n/a | 2026-07-18 | Product architecture: agentless, API-native, servers/databases/consoles/Kubernetes coverage |
| https://www.p0.dev/ | P0 Security company site | n/a | 2026-07-18 | General product description |

**graphMetrics evidence notes:** ai_adoption 0.3; legacy_disruptiveness 0.6 (replaces standing privileged access); technical_feasibility 0.8 (GA, cloud marketplace listings, RSAC Top Ten finalist); regulatory_moat 0.2; proprietary_data_moat 0.2; competition_intensity 0.7 (crowded PAM/JIT space with CyberArk-successor Palo Alto Networks, SailPoint, Okta, and multiple startups).

## 3. Nudge Security

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.nudgesecurity.com/press/nudge-security-raises-22-5m-series-a-to-secure-workforce-ai-and-saas | Nudge Security Raises $22.5M Series A to Secure Workforce AI and SaaS | Nov 18, 2025 | 2026-07-18 | Series A amount, lead investor Cerberus Ventures, participating investors, founder names/titles, 3x ARR growth for two consecutive years, ~200 customers, 60+ feature releases, Reddit CISO quote |
| https://www.prnewswire.com/news-releases/nudge-security-raises-22-5m-series-a-to-secure-workforce-ai-and-saas-302617997.html | Nudge Security Raises $22.5M Series A (PR Newswire) | Nov 18, 2025 | 2026-07-18 | Independent syndication confirming the same financing facts |
| https://www.nudgesecurity.com/about-us | About Us - Nudge Security | n/a | 2026-07-18 | Founder backgrounds at AlienVault/AT&T Cybersecurity, Open Threat Exchange co-founding |
| https://www.nudgesecurity.com/press/nudge-security-raises-7-million-in-seed-funding-led-by-ballistic-ventures-to-secure-the-modern-workforce | Nudge Security seed funding announcement | Apr 2022 | 2026-07-18 | $7m seed round, Ballistic Ventures lead |
| https://www.nudgesecurity.com/ | Nudge Security company site | n/a | 2026-07-18 | Product description |

**graphMetrics evidence notes:** ai_adoption 0.4 (expanding explicitly into AI/shadow-AI governance); legacy_disruptiveness 0.6; technical_feasibility 0.85 (strongest disclosed traction in the batch: repeat 3x ARR growth, ~200 customers, named Reddit CISO reference); regulatory_moat 0.2; proprietary_data_moat 0.4 (aggregated SaaS/AI usage graph across customer base); competition_intensity 0.65.

## 4. Tobiko Data

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://techcrunch.com/2024/06/05/with-21-8m-in-funding-tobiko-aims-to-build-a-modern-data-platform/ | With $21.8M in funding, Tobiko aims to build a modern data platform | June 5, 2024 | 2026-07-18 | Series A amount ($17.3m), lead investor Theory Ventures, individual investor CEOs (Fivetran, Census, MotherDuck), total funding, seed round amount ($4.5m, Unusual Ventures) |
| https://www.tobikodata.com/about | About Tobiko | n/a | 2026-07-18 | Founder names/titles (Tyson Mao, Toby Mao, Iaroslav Zeigerman), backgrounds at Airbnb/Netflix, SQLMesh/Tobiko Cloud product description, Dune customer reference |
| https://www.businesswire.com/news/home/20240605904710/en/CORRECTING-and-REPLACING-Data-Infrastructure-Startup-Tobiko-Data-Launches-with-%2421.8-Million-in-Funding | Data Infrastructure Startup Tobiko Data Launches with $21.8 Million in Funding | June 2024 | 2026-07-18 | Independent confirmation of total funding and round structure |
| https://www.tobikodata.com/ | Tobiko Data company site | n/a | 2026-07-18 | Product positioning |

**graphMetrics evidence notes:** ai_adoption 0.2 (classic data-engineering tool, not AI-native, though used by AI pipelines); legacy_disruptiveness 0.5 (challenges dbt's full-refresh model with state-aware processing); technical_feasibility 0.75 (real open-source adoption and one named migration customer, Dune); regulatory_moat 0.1; proprietary_data_moat 0.1; competition_intensity 0.7 (dbt Labs is a deeply entrenched incumbent; Dagster and Coalesce also compete).

## 5. Turso

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://turso.tech/investors | About Us / Investors - Turso | n/a | 2026-07-18 | Founder names/titles/backgrounds (Glauber Costa, Pekka Enberg), investor list (Norwest, Blumberg Capital, Mango Capital, and named technical angels) |
| https://turso.tech/what-is-turso | What is Turso? - The SQLite-compatible database for the agentic era | n/a | 2026-07-18 | Product architecture (libSQL, many-database model, edge replicas, MVCC, vector search), pricing tiers |
| https://tracxn.com/d/companies/turso/__9yiGkZbmMa-YcuYPa2835J-NujMZua-HZOqt-ap7kg8/funding-and-investors | Turso - Funding & Investors (Tracxn) | Accessed 2026-07-18 (site last updated per page: June 22, 2026) | 2026-07-18 | Third-party aggregator record used only to corroborate investor names (Norwest); could not confirm Series A amount/date from a primary source. Flagged as unconfirmed in the memo. |
| https://www.crunchbase.com/organization/chiselstrike | Turso (ChiselStrike) - Crunchbase | n/a | 2026-07-18 | Third-party aggregator reference to a reported ~$26m Series A and prior ChiselStrike/Turso company history; not independently confirmed by a company press release |
| https://turso.tech/ | Turso company site | n/a | 2026-07-18 | Product description |

**graphMetrics evidence notes:** ai_adoption 0.5 (explicitly positioned for "the agentic era," AI agent memory/state use case); legacy_disruptiveness 0.5; technical_feasibility 0.6 (technically credible team, but unverified funding recency and no disclosed revenue lower confidence); regulatory_moat 0.1; proprietary_data_moat 0.1; competition_intensity 0.7 (Cloudflare D1, Supabase, PlanetScale, Neon all compete for similar developer workloads).

## 6. Estuary

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.prnewswire.com/news-releases/estuary-raises-17m-series-a-to-power-ai-for-enterprises-with-right-time-data-movement-302586382.html | Estuary Raises $17M Series A to Power AI for Enterprises with Right-Time Data Movement | Oct 21, 2025 | 2026-07-18 | Series A amount, lead investor M13, participating investors Firstmark and Operator Partners, customer sectors (finance, healthcare, logistics, SaaS) |
| https://estuary.dev/blog/estuary-raises-17m-series-a-right-time-data/ | Why We Raised $17M: Powering AI for Enterprises with Right-Time Data Movement | Oct 2025 | 2026-07-18 | Company-authored confirmation of financing and use of funds |
| https://estuary.dev/blog/the-estuary-story-and-guiding-principles/ | The Estuary story and guiding principles | n/a | 2026-07-18 | Founder backgrounds (David Yaffe: LiveRamp/Arbor; Johnny Graettinger: Google/YouTube), founding history (2014 build, 2019 launch) |
| https://estuary.dev/product/ | Estuary Flow product page | n/a | 2026-07-18 | Product architecture (CDC, streaming, batch unification), connector list |
| https://estuary.dev/ | Estuary company site | n/a | 2026-07-18 | Product description |

**graphMetrics evidence notes:** ai_adoption 0.4 (markets explicitly as "AI-ready" data movement feeding vector databases/LLM pipelines); legacy_disruptiveness 0.5 (unifies batch and streaming, replacing multiple point tools); technical_feasibility 0.8 (200-plus connectors, disclosed multi-sector customer base); regulatory_moat 0.2; proprietary_data_moat 0.2; competition_intensity 0.7 (Fivetran and Confluent are established incumbents).

## 7. RunReveal

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://blog.runreveal.com/runreveal-raises-7m-ai-security-platform/ | RunReveal Raises $7M for AI Security Platform | 2025 | 2026-07-18 | $7m seed round, lead investor Costanoa Ventures, participating investors (Runtime Ventures, Modern Technical Fund, Okta Ventures), named customers (Cloudflare, Harvey, ClickHouse, Flexport, Cursor, Sentry, Temporal, DigitalOcean, AngelList, Weights & Biases), product architecture |
| https://www.finsmes.com/2025/08/runreveal-raises-7m-in-seed-funding.html | RunReveal Raises $7M in Seed Funding | Aug 2025 | 2026-07-18 | Independent confirmation of the $7m round and investors |
| https://www.finsmes.com/2024/05/runreveal-raises-2-5m-in-seed-funding.html | RunReveal Raises $2.5M in Seed Funding | May 2024 | 2026-07-18 | Confirmation of prior 2024 seed round, Costanoa Ventures as existing/lead investor |
| https://runreveal.com/ | RunReveal company site | n/a | 2026-07-18 | Product description, architecture, customer logos |

**graphMetrics evidence notes:** ai_adoption 0.6 (native AI chat/MCP-based investigation is core to the product); legacy_disruptiveness 0.7 (directly targets replacing legacy SIEM per-GB cost structure); technical_feasibility 0.75 (named customers including Cloudflare and ClickHouse); regulatory_moat 0.2; proprietary_data_moat 0.3 (security telemetry and detection library across customers); competition_intensity 0.6.

## 8. Twine Security

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://siliconangle.com/2024/11/20/ai-meets-cybersecurity-twine-launches-12m-funding-digital-cyber-employees/ | AI meets cybersecurity: Twine launches with $12M funding for digital cyber employees | Nov 20, 2024 | 2026-07-18 | $12m seed round, co-leads Ten Eleven Ventures and Dell Technologies Capital, Wiz co-founder angel investors (Assaf Rappaport, Roy Reznik), Tel Aviv/Seattle offices, 20+ employees |
| https://www.calcalistech.com/ctechnews/article/hy9k4eofkg | Claroty veterans launch Twine with $12M in Seed funding from Dell and Wiz founders to deploy AI cyber workers | Nov 2024 | 2026-07-18 | Founder names (Benny Porat, Omri Green, Justin Woody, Nadav Erez) and their shared background as former Claroty senior managers; founding year (2024) |
| https://twinesecurity.com/ | Twine Security company site | n/a | 2026-07-18 | Product description (Alex digital employee), disclosed pilot metrics (41% ticket reduction, 5,731 hours saved quarterly, 76% entitlement reduction), target customer sectors |

**graphMetrics evidence notes:** ai_adoption 0.9 (the core product is an autonomous AI "digital employee"); legacy_disruptiveness 0.7 (targets replacing manual IAM analyst labor); technical_feasibility 0.6 (quantified pilot results at named-anonymized Fortune 500 accounts, but autonomous remediation in production identity systems remains early and high-risk); regulatory_moat 0.2; proprietary_data_moat 0.3 (learns org-specific entitlement/access patterns); competition_intensity 0.6.

## 9. Edera

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.prnewswire.com/news-releases/edera-raises-15-million-series-a-to-transform-cloud-and-ai-infrastructure-security-302384242.html | Edera Raises $15 Million Series A to Transform Cloud and AI Infrastructure Security | Feb 25, 2025 | 2026-07-18 | Series A amount, lead investor M12, participating investors (Mantis VC, In-Q-Tel, Eniac Ventures, 645 Ventures, FPV Ventures, Precursor Ventures, Rosecliff Ventures), total funding ($20m), founder names/titles, Edera Protect AI launch |
| https://edera.dev/stories/series-a | Edera Raises $15M to Advance Cloud and AI Security | Feb 2025 | 2026-07-18 | Company-authored confirmation of financing details and founder backgrounds |
| https://www.securityweek.com/edera-banks-15m-for-kubernetes-workload-isolation-tech/ | Edera Banks $15M for Kubernetes Workload Isolation Tech | Feb 2025 | 2026-07-18 | Independent confirmation of round and technology description (Type 1 hypervisor, Rust) |
| https://edera.dev/ | Edera Meet Hardened Runtime | n/a | 2026-07-18 | Product description, customer case study (62% server consolidation, 40,000 to 15,200 servers) |
| https://www.prnewswire.com/news-releases/edera-raises-5m-seed-round-to-introduce-the-worlds-only-secure-by-design-kubernetes-and-ai-solution-302252011.html | Edera Raises $5M Seed Round | 2024 | 2026-07-18 | Seed round amount, confirming total funding math ($5m seed + $15m Series A = $20m total) |

**graphMetrics evidence notes:** ai_adoption 0.4 (extending specifically to AI/GPU workload security via Edera Protect AI); legacy_disruptiveness 0.7 (replaces namespace-based container isolation, addresses real disclosed NVIDIA container toolkit CVEs); technical_feasibility 0.75 (shipping product, In-Q-Tel/M12 strategic validation, quantified customer server-consolidation case study); regulatory_moat 0.35 (federal/In-Q-Tel backing suggests a public-sector go-to-market angle); proprietary_data_moat 0.1; competition_intensity 0.5 (fewer funded direct commercial competitors than in IAM/SIEM categories; Kata Containers/gVisor/Firecracker are open-source projects, not funded commercial rivals).

## 10. Prophet Security

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.businesswire.com/news/home/20250729681026/en/Prophet-Security-Raises-$30M-Series-A-Announces-Industrys-Most-Comprehensive-Agentic-AI-SOC-Platform-to-Transform-Security-Operations | Prophet Security Raises $30M Series A, Announces Industry's Most Comprehensive Agentic AI SOC Platform | July 29-30, 2025 | 2026-07-18 | Series A amount, lead investor Accel, participating investors Bain Capital Ventures and Citi Ventures, product platform description (AI SOC Analyst, AI Threat Hunter, AI Detection Advisor), disclosed metrics (1M+ investigations, 360,000 hours saved, 96% fewer false positives, 10x faster response) |
| https://www.prophetsecurity.ai/blog/prophet-security-raises-30-million-series-a-led-by-accel | Prophet Security Raises $30M Series A Led by Accel to Launch its Agentic AI SOC Platform | July 2025 | 2026-07-18 | Company-authored confirmation of financing and Cabinetworks customer case study |
| https://www.businesswire.com/news/home/20240423436213/en/Prophet-Security-Secures-$11M-in-Seed-Financing-to-Supercharge-Security-Operations | Prophet Security Secures $11M in Seed Financing | Apr 23, 2024 | 2026-07-18 | Confirms the $11m seed round used to compute cumulative disclosed funding (~$41m) |
| https://www.crunchbase.com/person/vibhav-sreekanti | Vibhav Sreekanti - Co-founder & CTO @ Prophet Security | n/a | 2026-07-18 | Founder background (StackRox VP Engineering, Red Hat Senior Director, Defend7 co-founder/CTO, Oracle) |
| https://www.citi.com/ventures/perspectives/pressrelease/investing-in-prophet-security-cybersecurity-SOC.html | Investing in Prophet Security to empower cybersecurity teams | 2025 | 2026-07-18 | Confirms Kamal Shah / Vibhav Sreekanti shared history at StackRox, acquired by Red Hat |
| https://www.prophetsecurity.ai/ | Prophet Security company site | n/a | 2026-07-18 | Product description |

**graphMetrics evidence notes:** ai_adoption 0.9 (core product is an agentic AI SOC analyst); legacy_disruptiveness 0.7 (replaces manual L1/L2 SOC analyst triage); technical_feasibility 0.8 (quantified scale metrics and a named customer, Cabinetworks); regulatory_moat 0.1; proprietary_data_moat 0.3 (detection tuning/telemetry feedback loop across customers); competition_intensity 0.85 (very crowded: CrowdStrike Charlotte AI, Palo Alto Cortex XSIAM, Microsoft Security Copilot, plus multiple well-funded startups).

## Public-company comparables (StockAnalysis, EV/LTM revenue, as of July 18, 2026)

| Ticker | Company | EV/Sales | URL | Reused from reference file? |
|---|---|---:|---|---|
| MDB | MongoDB | 8.74x | https://stockanalysis.com/stocks/mdb/statistics/ | Yes, reused from reference file |
| SNOW | Snowflake | 18.20x | https://stockanalysis.com/stocks/snow/statistics/ | Yes, reused from reference file |
| NET | Cloudflare | 42.05x | https://stockanalysis.com/stocks/net/statistics/ | Yes, reused from reference file |
| DDOG | Datadog | 24.13x | https://stockanalysis.com/stocks/ddog/statistics/ | Yes, reused from reference file |
| GTLB | GitLab | 4.15x | https://stockanalysis.com/stocks/gtlb/statistics/ | Yes, reused from reference file |
| CRWD | CrowdStrike | 39.86x | https://stockanalysis.com/stocks/crwd/statistics/ | No, fetched fresh for this batch |
| ZS | Zscaler | 7.11x | https://stockanalysis.com/stocks/zs/statistics/ | No, fetched fresh for this batch |
| OKTA | Okta | 7.94x | https://stockanalysis.com/stocks/okta/statistics/ | No, fetched fresh for this batch |
| CYBR | CyberArk | n/a (delisted; acquired by Palo Alto Networks, completed Feb 11, 2026) | https://stockanalysis.com/stocks/cybr/statistics/ | No, fetched fresh; excluded from comp sets due to delisting |
| SAIL | SailPoint | 7.60x | https://stockanalysis.com/stocks/sail/statistics/ | No, fetched fresh for this batch |
| PANW | Palo Alto Networks | 27.47x | https://stockanalysis.com/stocks/panw/statistics/ | No, fetched fresh for this batch |
| FTNT | Fortinet | 16.27x | https://stockanalysis.com/stocks/ftnt/statistics/ | No, fetched fresh for this batch |
| S | SentinelOne | 5.77x | https://stockanalysis.com/stocks/s/statistics/ | No, fetched fresh for this batch |
| RPD | Rapid7 | 1.29x | https://stockanalysis.com/stocks/rpd/statistics/ | No, fetched fresh for this batch |
| TENB | Tenable | 4.36x | https://stockanalysis.com/stocks/tenb/statistics/ | No, fetched fresh for this batch |
| CFLT | Confluent | 8.73x | https://stockanalysis.com/stocks/cflt/statistics/ | No, fetched fresh for this batch |
| ESTC | Elastic | 3.23x | https://stockanalysis.com/stocks/estc/statistics/ | No, fetched fresh for this batch |
| FSLY | Fastly | 5.07x | https://stockanalysis.com/stocks/fsly/statistics/ | No, fetched fresh for this batch |
| VRNS | Varonis | 7.70x | https://stockanalysis.com/stocks/vrns/statistics/ | No, fetched fresh for this batch |

## General assumption notes

1. No company in this batch discloses a current post-money valuation publicly. All entry post-money figures in the memo file are explicit HCP assumptions.
2. TAM bottom-up unit counts and per-account contract values are HCP assumptions unless directly attributed to a cited source.
3. Cumulative future dilution (35%) and the downside/upside revenue and multiple conventions are HCP assumptions applied uniformly across the batch, consistent with the reference ten-company memo set's conventions.
4. Where founder background could not be confirmed from public sources (Aembit's Goldschlag and Sapp; P0 Security's Sehgal; RunReveal's Johnson and Braithwaite; Twine Security's four co-founders' individual titles), this is stated explicitly in both the memo founders table and this ledger, and flagged as a diligence item rather than filled in with an assumed background.
5. Turso's Series A amount and date rely on third-party aggregator snippets (Crunchbase, PitchBook, Tracxn) because no company press release or primary news article confirming the round could be located. This is the single largest sourcing gap in the batch and is flagged prominently in both the memo and this ledger.

---

# Batch 06

**Access date for all sources:** July 18, 2026, unless noted otherwise.

## 1. Terminal49

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://terminal49.com/ | Terminal49 homepage | Undated | 2026-07-18 | Product positioning, container-tracking value proposition |
| https://www.prnewswire.com/news-releases/terminal49-secures-6-5m-series-a-to-power-ocean-freight-visibility-and-automation-301725978.html | Terminal49 Secures $6.5m Series A to Power Ocean Freight Visibility and Automation | 2023-01-23 | 2026-07-18 | Series A amount, lead investors (Stage 2 Capital, Grand Venture Partners), founding date (2015), founders (Akshay Dodeja, Philipp Gutheim) |
| https://terminal49.com/blog/series-a-announcement | Terminal49 has raised a Series A | 2023-01 | 2026-07-18 | Company-authored confirmation of Series A round |
| https://terminal49.com/container-tracking-api | Shipping Container Tracking API | Undated | 2026-07-18 | Product/API description |
| (search aggregation) | Web search results summarizing Terminal49 coverage | Various | 2026-07-18 | 98% ocean-freight/container-traffic coverage claim, customers (Wayfair, Hillebrand, Mazda USA), 1M+ containers tracked |
| https://stockanalysis.com/stocks/dsgx/statistics/ | Descartes Systems Group (DSGX) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 7.95x |
| https://stockanalysis.com/stocks/chrw/statistics/ | C.H. Robinson (CHRW) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 1.61x |
| https://stockanalysis.com/stocks/lstr/statistics/ | Landstar System (LSTR) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 1.44x |

**graphMetrics evidence:** legacy_disruptiveness 0.65 — replaces manual carrier-website/EDI checking with a unified API (product description, PRNewswire). technical_feasibility 0.85 — 98% ocean-freight coverage claim, 1M+ containers tracked, named enterprise customers (Wayfair, Mazda, Hillebrand). regulatory_moat 0.2 — pure software, no regulatory barrier identified. proprietary_data_moat 0.75 — integrations with every major ocean carrier and all major U.S./Canada terminals is a genuine, hard-to-replicate data asset. competition_intensity 0.55 — project44, FourKites, Portcast, and GoComet all compete, but most are broader multimodal platforms rather than ocean-specific specialists. ai_adoption omitted — no verified AI/ML-specific claim found in available sources.

## 2. Nira Energy

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.niraenergy.com/ | Nira homepage | Undated | 2026-07-18 | Product positioning |
| https://www.ycombinator.com/companies/nira-energy | Nira Energy | Y Combinator | Undated | 2026-07-18 | YC batch participation, $500k YC seed (2022), product description |
| https://www.prnewswire.com/news-releases/nira-energy-partners-with-energize-capital-to-scale-transmission-automation-software-302467710.html | Nira Energy Partners with Energize Capital to Scale Transmission Automation Software | 2025-05-29 | 2026-07-18 | 2025 Energize Capital growth investment (undisclosed size), board addition, "one of the larger investments" quote, profitability since founding, 100+ customers, 500+ GW of interconnection studies, $3bn+ cost discrepancies identified |
| https://www.latitudemedia.com/news/how-nira-energy-is-using-software-to-unclog-the-interconnection-queue/ | How Nira Energy is using software to unclog the interconnection queue | 2025 | 2026-07-18 | Founders (Chris Ariante CEO, Andy Chen ex-Palantir), founding year (2021), bootstrapped/profitable history, product mechanics, Denver location |
| (search aggregation) | Web search results including Crunchbase/startuphub.ai summaries | Various | 2026-07-18 | Secondary-source total funding estimate (~$12m); treated cautiously and not stated as verified in the memo |
| https://stockanalysis.com/stocks/bsy/statistics/ | Bentley Systems (BSY) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 7.19x |
| https://stockanalysis.com/stocks/vrsk/statistics/ | Verisk Analytics (VRSK) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 9.80x |
| https://stockanalysis.com/stocks/itri/statistics/ | Itron (ITRI) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 2.00x |

**graphMetrics evidence:** legacy_disruptiveness 0.75 — automates manual PSS/E-style engineering studies, "50 to 100x" speed claim (Latitude Media, company). technical_feasibility 0.85 — profitable since year one, 100+ customers including AES, Cypress Creek, Doral Renewables, 500+ GW analyzed. regulatory_moat 0.55 — deep grid/RTO/utility-specific domain data is a meaningful barrier though not a formal regulatory moat. proprietary_data_moat 0.75 — proprietary dataset from 500+ GW of completed studies and $3bn+ of identified cost discrepancies. competition_intensity 0.4 — few directly named competitors identified in available sources. ai_adoption omitted — sources describe "software" and "automation," not an explicit AI/ML claim.

## 3. Bayou Energy

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.bayou.energy/ | Bayou Energy homepage | Undated | 2026-07-18 | Product description, customer logos (Nautilus Solar, Arbor, CleanChoice Energy, Sunscription, Sealed, Elephant Energy, WattBot, Solstice, Glow Energy), public pricing ($24/meter/year, first 10 free), 95%+ reliability claim, customer testimonials |
| https://www.geekwire.com/2024/this-energy-startup-wants-to-make-utility-data-more-accessible-and-spur-creation-of-new-companies/ | This energy startup wants to make utility data more accessible | 2024 | 2026-07-18 | $1.2m pre-seed (April 2024), investors (Surface Ventures, CoFound Partners, Leap Forward Ventures, Stepchange Ventures, Very Serious Ventures), founders (James Gordey, Joris Van Hecke), founding year (2021), YC W22 batch |
| https://docs.bayou.energy/reference/getting-started-with-your-api | Getting Started With Bayou Energy's API | Undated | 2026-07-18 | API mechanics, integration description |
| https://stockanalysis.com/stocks/vrsk/statistics/ | Verisk Analytics (VRSK) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 9.80x |
| https://stockanalysis.com/stocks/csgp/statistics/ | CoStar Group (CSGP) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 3.54x |
| https://stockanalysis.com/stocks/itri/statistics/ | Itron (ITRI) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 2.00x |

**graphMetrics evidence:** legacy_disruptiveness 0.6 — replaces bespoke, per-utility integration work with a single API. technical_feasibility 0.85 — live product, eight named customer logos, public reliability and speed claims. regulatory_moat 0.3 — depends on utility data-access policy (Green Button Connect and similar standards) but is not itself a regulated entity. proprietary_data_moat 0.6 — breadth of utility coverage is a real, if not unique, asset (Arcadia/UtilityAPI has comparable breadth with more capital). competition_intensity 0.55 — Arcadia (UtilityAPI) and Urjanet are direct, better-capitalized competitors. ai_adoption omitted — product is a data API, not AI-branded in available sources.

## 4. Vooma

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.vooma.com/ | Vooma homepage | Undated | 2026-07-18 | Product positioning |
| https://www.businesswire.com/news/home/20241202150186/en/Vooma-Scores-Over-$16-Million-in-Seed-and-Series-A-Funding-Led-by-Index-and-Craft-Ventures | Vooma Scores Over $16 Million in Seed and Series A Funding Led by Index and Craft Ventures | 2024-12-02 | 2026-07-18 | Seed ($3.6m, Index Ventures) and Series A ($13m, Craft Ventures) amounts and leads, angel investors (Motive, project44, Ryder, Uber Freight executives), product suite (Quote, Build, Voice), customers (Echo, MODE, Arrive Logistics, NFI) |
| https://www.indexventures.com/perspectives/vooma-secures-166-million-to-build-an-ai-powered-agent-for-the-1t-trucking-industry/ | Vooma Secures $16.6 Million to Build an AI-Powered Agent for the $1T Trucking Industry | 2024-12 | 2026-07-18 | Founders (Jesse Buckingham, Mike Carter; Stanford graduates; prior roles at ASG LogisTech and Kodiak Robotics), 2023 launch date, 12.5x revenue growth, 32x+ transaction-volume growth |
| https://stockanalysis.com/stocks/dsgx/statistics/ | Descartes Systems Group (DSGX) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 7.95x |
| https://stockanalysis.com/stocks/chrw/statistics/ | C.H. Robinson (CHRW) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 1.61x |
| https://stockanalysis.com/stocks/rxo/statistics/ | RXO, Inc. statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 0.96x |

**graphMetrics evidence:** ai_adoption 0.85 — explicitly AI-agent-branded product across email, text, and voice channels. legacy_disruptiveness 0.7 — automates manual broker/carrier communication tasks. technical_feasibility 0.75 — 12.5x revenue growth and 32x+ transaction-volume growth disclosed at Series A, named enterprise customers. regulatory_moat 0.2 — pure software, no regulatory barrier. proprietary_data_moat 0.5 — accumulates freight-specific communication/transaction data across channels, a moderate moat. competition_intensity 0.7 — HappyRobot, Greenscreens.ai, Parade, Turvo, and DAT all compete for overlapping freight-automation budget.

## 5. Lithos Carbon

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.lithoscarbon.com/ | Lithos Carbon homepage | Undated | 2026-07-18 | Product description |
| https://www.geekwire.com/2022/carbon-removal-company-lithos-lands-6-3m-for-ag-focused-climate-tech/ | Lithos, a Seattle agtech startup... lands $6.3M | 2022-10-20 | 2026-07-18 | $6.29m seed round, lead investors (Union Square Ventures, Greylock Partners), participants (Bain Capital Ventures, Carbon Removal Partners, Fall Line Capital, Carbon Drawdown Initiative, Cavallo Ventures), founders (Noah Planavsky, Chris Reinhard, Mary Yap) |
| https://frontierclimate.com/writing/lithos | Frontier buyers sign world's first enhanced weathering offtake agreements with Lithos Carbon | 2023-12 | 2026-07-18 | $57.1m Frontier offtake/purchase agreement (explicitly confirmed as a carbon-removal purchase agreement, not equity), buyer coalition (Alphabet, H&M, JPMorgan, Shopify, Stripe, and others), 154,240 tons committed 2024-2028, CEO quote (Mary Yap) |
| https://www.businesswire.com/news/home/20251202793450/en/Lithos-Carbon-Delivers-5160-Registry-Certified-Tons-of-Carbon-Removal-in-Worlds-Largest-Enhanced-Rock-Weathering-Issuance-to-Date | Lithos Carbon Delivers 5,160 Registry-Certified Tons of Carbon Removal in World's Largest Enhanced Rock Weathering Issuance to Date | 2025-12-02 | 2026-07-18 | Delivered, registry-certified tonnage; "world's largest ERW issuance to date" claim |
| (Crunchbase/Tracxn aggregator search results) | Various funding-tracker summaries | Various | 2026-07-18 | Cross-checked and found to mislabel the Frontier offtake as a "Series A" equity round; corrected in this memo based on Frontier's own primary-source description |
| https://stockanalysis.com/stocks/ttek/statistics/ | Tetra Tech (TTEK) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 2.06x |
| https://stockanalysis.com/stocks/ntr/statistics/ | Nutrien (NTR) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 1.69x |
| https://stockanalysis.com/stocks/uls/statistics/ | UL Solutions (ULS) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 5.79x |

**graphMetrics evidence:** legacy_disruptiveness 0.5 — creates a new carbon-removal category rather than directly displacing an existing industry. technical_feasibility 0.55 — real registry-certified delivery (5,160 tons) but enhanced-weathering MRV precision remains a debated, evolving science. regulatory_moat 0.25 — operates in the voluntary carbon market with no regulatory mandate. proprietary_data_moat 0.55 — farm-network and MRV data specific to Lithos's process and geographies. competition_intensity 0.65 — Eion, UNDO Carbon, InPlanet, Mati Carbon, and Terradot are all active enhanced-weathering competitors. ai_adoption omitted — MRV relies on geochemistry/remote sensing, not a verified AI/ML-centric claim.

## 6. Paces

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.paces.com/ | Paces homepage | Undated | 2026-07-18 | Product description |
| https://www.paces.com/news/paces-raises-11-million-to-accelerate-clean-energy-development | Paces Raises $11 Million in Series A Funding to Accelerate Renewable Energy Projects | 2024-07-24 | 2026-07-18 | Series A amount ($11m), lead investor (Navitas Capital), participants (Suffolk Technologies, MCJ Collective, Resolute Ventures, Soma Capital, Y Combinator), founders (James Mcwalter, Charles Bai), founding year (2022), Project Search and Permitting Predictor products, customers (EDF Renewables, AES, Third Pillar Solar) |
| https://www.esgtoday.com/energy-infrastructure-software-startup-paces-raises-11-million-to-accelerate-green-energy-development/ | Clean Energy Infrastructure Software Startup Paces Raises $11 Million | 2024-07 | 2026-07-18 | Corroborates Series A details and product description |
| https://stockanalysis.com/stocks/bsy/statistics/ | Bentley Systems (BSY) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 7.19x |
| https://stockanalysis.com/stocks/csgp/statistics/ | CoStar Group (CSGP) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 3.54x |
| https://stockanalysis.com/stocks/vrsk/statistics/ | Verisk Analytics (VRSK) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 9.80x |

**graphMetrics evidence:** ai_adoption 0.8 — company describes AI-driven analysis of zoning/permitting/environmental data (Permitting Predictor). legacy_disruptiveness 0.65 — replaces manual, multi-jurisdiction GIS research with automated due diligence. technical_feasibility 0.8 — named large developer customers (EDF Renewables, AES). regulatory_moat 0.55 — deep, hard-to-replicate permitting/zoning dataset across jurisdictions. proprietary_data_moat 0.7 — aggregated interconnection, permitting, and environmental data is the core asset. competition_intensity 0.5 — Anza, Landgate, and Bentley Systems overlap partially but none directly replicate the full Project Search plus Permitting Predictor workflow per available sources.

## 7. Verse

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://verse.inc/ | Verse homepage | Undated | 2026-07-18 | Product positioning |
| https://verse.inc/press/verse-inc-secures-20-5-million-series-a-funding-led-by-gv/ | Verse Inc Secures $20.5 Million Series A Funding led by GV | 2024-05 | 2026-07-18 | Series A amount and lead (GV), participants (Coatue, CIV, MCJ Collective) |
| https://www.prnewswire.com/news-releases/verse-secures-20-5-million-in-series-a-funding-led-by-gv-to-help-organizations-reduce-electricity-costs--emissions-302152878.html | Verse Secures $20.5 Million in Series A Funding led by GV | 2024-05 | 2026-07-18 | Corroborates Series A terms; Aria platform, GenAI framing, 10%+ cost-reduction claim, founders (Seyed Madaeni, Matt Penfold), founding year (2022) |
| https://www.prnewswire.com/news-releases/clean-energy-procurement-and-management-software-provider-verse-closes-5-75m-seed-round-led-by-coatue-launches-first-product-and-signs-climeworks-as-customer-301879805.html | Clean Energy Procurement and Management Software Provider Verse Closes $5.75M Seed Round | 2023-07 | 2026-07-18 | Seed amount and lead (Coatue), first customer (Climeworks), first product launch |
| https://stockanalysis.com/stocks/wk/statistics/ | Workiva (WK) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 3.39x |
| https://stockanalysis.com/stocks/csgp/statistics/ | CoStar Group (CSGP) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 3.54x |
| https://stockanalysis.com/stocks/itri/statistics/ | Itron (ITRI) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 2.00x |

**graphMetrics evidence:** ai_adoption 0.75 — Aria platform explicitly described as generative-AI-driven. legacy_disruptiveness 0.55 — targets a broker/consultant-led manual process. technical_feasibility 0.8 — live product with a disclosed named customer (Climeworks) and two completed funding rounds. regulatory_moat 0.2 — no direct regulatory barrier; demand is policy-sensitive but the company itself is unregulated. proprietary_data_moat 0.5 — aggregates clean-energy market/pricing data across procurement activity. competition_intensity 0.7 — LevelTen Energy, Watershed, Persefoni, and large incumbents (Schneider Electric, Edison Energy) all compete for adjacent budget.

## 8. Texture

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.texturehq.com/ | Texture homepage | Undated | 2026-07-18 | Product positioning |
| https://www.texturehq.com/blog/texture-series-a | Texture raises $12.5M series A for the OS for energy | 2026-05 | 2026-07-18 | Series A amount ($12.5m), co-leads (VoLo Earth Ventures, Equal Ventures), participants (Lerer Hippeau, Abstract Ventures), founder (Sanjiv Sanghavi, CEO), customers (Vermont Electric Cooperative, sonnen), grid-visibility/grid-operations product description |
| https://www.powermag.com/texture-raises-12-5m-to-tackle-the-operational-complexity-of-the-modern-grid/ | Texture Raises $12.5M to Tackle the Operational Complexity of the Modern Grid | 2026-05-20 | 2026-07-18 | Total funding (~$23m), OEM integrations (Tesla, FranklinWH, Honeywell, Ecobee, SolarEdge, Leap Energy, WattTime), SOC 2 Type I/II certification, NRTC partnership (850 utility co-ops) |
| https://pulse2.com/texture-12-5-million-series-a/ | Texture: $12.5 Million Raised For Grid Software Platform For Utilities | 2026-05 | 2026-07-18 | Corroborates founder name (Sanjiv Sanghavi); other co-founders not fully named in this or other available sources |
| https://stockanalysis.com/stocks/itri/statistics/ | Itron (ITRI) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 2.00x |
| https://stockanalysis.com/stocks/enph/statistics/ | Enphase Energy (ENPH) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 3.69x |
| https://stockanalysis.com/stocks/stem/statistics/ | Stem, Inc. (STEM) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 2.54x; confirmed still actively trading |

**graphMetrics evidence:** ai_adoption 0.4 — grid-analytics/coordination platform; no strong explicit AI/ML claim found in available sources, scored moderate rather than high. legacy_disruptiveness 0.65 — unifies fragmented utility OMS/DERMS/manual workflows, particularly for underserved co-ops. technical_feasibility 0.75 — SOC 2 Type I/II certified, live utility/co-op customers, disclosed OEM integrations. regulatory_moat 0.35 — utility-grade security certification is a real but moderate barrier. proprietary_data_moat 0.65 — aggregates device-level data across many OEM integrations. competition_intensity 0.65 — Camus Energy, Uplight, Itron, Bidgely, and Kraken Technologies all compete for utility DER-software budget.

## 9. Cargado

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://cargado.com/ | Cargado homepage | Undated | 2026-07-18 | Product positioning |
| https://cargado.com/news | Series A Press Release | 2025-04-07 | 2026-07-18 | Series A amount ($12m), lead (LGVP), new investors (Conversion Capital, Assembly Ventures, Friends & Family Capital), existing investors (Primary Venture Partners, Ironspring Ventures, Zenda Capital, Proeza Ventures), founders (Matt Silver, Rylan Hawkins), founding date (January 2024), 200+ customers, 650+ vetted carriers |
| https://www.freightwaves.com/news/exclusive-cargado-raises-12m-to-boost-cross-border-trucking-marketplace | Exclusive: Cargado raises $12M to boost cross-border trucking marketplace | 2025-04 | 2026-07-18 | Corroborates Series A terms and traction figures |
| https://stockanalysis.com/stocks/chrw/statistics/ | C.H. Robinson (CHRW) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 1.61x |
| https://stockanalysis.com/stocks/lstr/statistics/ | Landstar System (LSTR) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 1.44x |
| https://stockanalysis.com/stocks/rxo/statistics/ | RXO, Inc. statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 0.96x |

**graphMetrics evidence:** ai_adoption 0.4 — search results reference a "Cargado Chat" feature suggesting some automation, but depth/AI-specificity not independently verified. legacy_disruptiveness 0.6 — digitizes phone/email-based cross-border freight brokering. technical_feasibility 0.75 — live marketplace with 200+ customers and 650+ vetted carriers within six months of launch. regulatory_moat 0.5 — cross-border customs and carrier-vetting compliance is a genuine, non-trivial barrier. proprietary_data_moat 0.55 — vetted-carrier trust/performance data specific to the MX-US corridor. competition_intensity 0.7 — Nuvocargo is a direct, well-funded competitor in the same corridor; DAT, Uber Freight, and J.B. Hunt 360 also compete for adjacent volume.

## 10. Isometric

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://isometric.com/ | Isometric homepage | Undated | 2026-07-18 | Product positioning, Certify and registry products |
| https://isometric.com/writing-articles/isometric-raises-40m-to-bring-agentic-certification-to-the-industrial-economy | Isometric raises $40M to bring agentic certification to the industrial economy | 2026-06-22 | 2026-07-18 | Series A amount ($40m), lead investor (AVP/AXA Venture Partners), anchor investor (AXA), founder (Eamon Jubbawy), prior Onfido exit ($650m), customers (Microsoft, Boeing, JPMorgan Chase, Anglo American), 16M+ tonnes contracted, 200+ projects |
| https://techfundingnews.com/isometric-40m-series-a-industrial-certification-ai/ | Onfido founder raises $40M to kill the 12-month certification bottleneck | 2026-06 | 2026-07-18 | Corroborates Series A terms, 12-months-to-hours claim, expansion into industrial certification |
| https://techcrunch.com/2023/07/17/isometric-taps-25m-to-build-a-registry-and-science-platform-focused-on-carbon-removal/ | Isometric taps $25M to build a registry and science platform focused on carbon removal | 2023-07-17 | 2026-07-18 | $25m seed round (2023), lead investors (Lowercarbon Capital, Plural) |
| https://isometric.com/about | Isometric team/about page | Undated | 2026-07-18 | Leadership team (Jennifer Wilcox, Chief Scientist; Stacy Kauk, Chief Science Officer; other executives), confirming these are leadership roles rather than founders |
| https://stockanalysis.com/stocks/uls/statistics/ | UL Solutions (ULS) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 5.79x |
| https://stockanalysis.com/stocks/mco/statistics/ | Moody's (MCO) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 12.08x |
| https://stockanalysis.com/stocks/vrsk/statistics/ | Verisk Analytics (VRSK) statistics | 2026-07-18 snapshot | 2026-07-18 | EV/LTM revenue = 9.80x |

**graphMetrics evidence:** ai_adoption 0.85 — Certify is explicitly an AI-agent-driven verification platform. legacy_disruptiveness 0.8 — 12-months-to-hours certification-speed claim directly targets a slow, manual incumbent process. technical_feasibility 0.7 — live registry with 16M+ tonnes contracted and 200+ projects, but broader industrial-certification expansion is unproven. regulatory_moat 0.45 — registry credibility and science-based protocols are a moat, though not a formal regulatory requirement. proprietary_data_moat 0.75 — evidence database (sensor, satellite, lab, supply-chain data) across 200+ certified projects. competition_intensity 0.7 — Verra and Gold Standard are entrenched incumbents; Puro.earth, BeZero Carbon, and Sylvera are active specialist competitors.

## General / cross-batch sources

| URL | Source title | Access date | Claims supported |
|---|---|---|---|
| https://stockanalysis.com/stocks/dsgx/statistics/, /chrw/, /lstr/, /rxo/, /vrsk/, /itri/, /bsy/, /csgp/, /uls/, /mco/, /ntr/, /ttek/, /wk/, /enph/, /stem/ | StockAnalysis.com statistics pages | 2026-07-18 | All EV/LTM revenue multiples used in this batch's public-comps tables, fetched directly since these tickers are not covered by the July 18, 2026 reference-memo snapshot |

---

# Batch 07

**Access date for all sources below: July 18, 2026** unless a different date is noted for the source's own publication.

**Batch note:** Flagship (onflagship.com) was dropped for cause and replaced with Yope (yope.app); see the swap note and sources at the top of `HCP_Memos_Batch_07.md` and in Yope's row below. The evidence that triggered the swap (Flagship's platform shutdown) is logged in this ledger for the record even though Flagship is not one of the ten companies carried forward.

## Beli

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://beliapp.com/ | Beli App — Restaurant List Keeping (official site) | Undated (current) | 2026-07-18 | Product description, positioning |
| https://beliapp.com/ourstory | Our Story \| Beli App | Undated (current) | 2026-07-18 | Founding story, founders' account of the product's origin |
| https://en.wikipedia.org/wiki/Beli_(app) | Beli (app) — Wikipedia | Updated periodically | 2026-07-18 | Founders' names/backgrounds, founding date, Series A amount ($5.3m, Nov 2023), Goodwater Capital, total raised ($12m by June 2025 incl. FirstMark), user metrics (75m+ reviews, 30,000 cities, Sept 2025) |
| https://www.today.com/food/trends/what-is-beli-app-rcna217748 | How the Beli App Is Turning Dining Out Into a Competitive Sport | 2025 (exact date not confirmed) | 2026-07-18 | Additional independent feature coverage of the product (identified via search; full text blocked from direct fetch — cited for the article's existence and headline framing only) |

**graphMetrics evidence notes (Beli):** legacy_disruptiveness 0.5 — comparative ranking model is a genuine mechanical difference from Yelp/Google star ratings, but incumbents remain dominant in overall category distribution. technical_feasibility 0.9 — shipped product with multi-year operating history and 75m+ logged reviews. proprietary_data_moat 0.6 — multi-year, comparative (not just absolute) taste graph is a real and not-trivially-replicable dataset. competition_intensity 0.7 — Yelp, Google Maps, OpenTable, and TikTok food content all compete for restaurant-discovery attention.

## Partiful

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://partiful.com/ | Partiful (official site) | Undated (current) | 2026-07-18 | Product description, positioning |
| https://fortune.com/2023/05/23/partiful-founders-startup-raises-series-a/ | Partiful's female founders overcame investor skepticism | 2023-05-23 | 2026-07-18 | Founders' names/backgrounds (Shreya Murthy, Joy Tao; met at Palantir), $20m Series A, a16z and Initialized Capital as investors, founding year (2020) |
| https://techcrunch.com/2024/11/18/partiful-is-googles-best-app-of-2024/ | Partiful is Google's 'best app' of 2024 | 2024-11-18 | 2026-07-18 | Third-party recognition/traction signal |

**graphMetrics evidence notes (Partiful):** legacy_disruptiveness 0.6 — SMS-native distribution is a real mechanical displacement of email/Facebook Events group-text coordination. technical_feasibility 0.95 — mature, widely used, independently recognized (Google's "best app" of 2024). proprietary_data_moat 0.5 — event/social graph accumulated over ~6 years of operation. competition_intensity 0.6 — Meta/Facebook Events, Evite, and Luma all compete for event-coordination usage.

## Posh

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://posh.vip/ | Posh (official site) | Undated (current) | 2026-07-18 | Product description, positioning, illustrative organizer revenue figures, app rating |
| https://www.forbes.com/sites/dariashunina/2024/07/23/posh-raises-22m-to-power-your-social-life/ | POSH Raises $22 Million To Power Your Social Life | 2024-07-23 | 2026-07-18 | Founders' names/backgrounds (Avante Price, Eli Taylor-Lemire), $22m Series A, Goodwater Capital lead, participating investors, 2M+ users, $95m+ processed ticket sales |
| https://fortune.com/2026/03/19/exclusive-posh-lands-37m-series-b-what-are-we-doing-tonight-problem/ | Exclusive: Posh lands $37M Series B to crack the 'what are we doing tonight?' problem | 2026-03-19 | 2026-07-18 | $37m Series B, $253m valuation, FirstMark Capital lead, founding year (2019), $40m cumulative revenue, $350m GMV, 25m tickets since inception |
| https://x.com/TradedVC/status/2034616647353254306 | Traded: Venture Capital (X post) | 2026 | 2026-07-18 | Corroborates Series B amount, lead investor, and $253m valuation figure |

**graphMetrics evidence notes (Posh):** legacy_disruptiveness 0.5 — algorithmic discovery feed for grassroots events is a real but partial displacement of static-listing incumbents (Eventbrite). technical_feasibility 0.85 — operating at meaningful scale (2M+ users, $350m GMV since inception) across three funding rounds. proprietary_data_moat 0.45 — event discovery/attendance graph, though less differentiated than dedicated matching products in this batch. competition_intensity 0.7 — Eventbrite, Dice, Resident Advisor, and social platforms (Instagram/TikTok) all compete for event discovery.

## Pickle

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.shoponpickle.com/ | Pickle (official site) | Undated (current) | 2026-07-18 | Confirms official domain (roster hint "shoppickle.com" is an inactive/for-sale domain, confirmed via redirect to hugedomains.com) |
| https://alleywatch.com/2025/04/pickle-peer-to-peer-clothing-rental-marketplace-brian-mcmahon/ | Pickle Secures $12M Series A to Scale its Peer-to-Peer Fashion Rental Marketplace | 2025-04 | 2026-07-18 | Founders' names/backgrounds (Brian McMahon, Julia O'Mara; ex-Blackstone), $12m Series A, FirstMark and Craft Ventures co-lead, $20m total raised, 200,000+ items/2,000+ brands, 4x revenue growth, 3x MAU growth, near-50% weekly-active share, business model (service fee) |
| https://techcrunch.com/2023/10/11/peer-to-peer-fashion-rental-marketplace-pickle-picks-up-8-million/ | Peer-to-peer fashion rental marketplace Pickle picks up $8 million | 2023-10-11 | 2026-07-18 | $8m seed round, Craft Ventures and FirstMark Capital as leads |

**graphMetrics evidence notes (Pickle):** legacy_disruptiveness 0.55 — P2P supply model is a structural departure from Rent the Runway's owned-inventory approach. technical_feasibility 0.85 — operating marketplace with disclosed growth metrics (4x revenue, 3x MAU YoY). proprietary_data_moat 0.4 — rental-transaction and fit data, moderate differentiation. competition_intensity 0.65 — Rent the Runway, Poshmark, ThredUp, and By Rotation all operate in adjacent apparel resale/rental categories.

## Pie

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://getpie.app/ | Pie \| people i enjoy (official site) | Undated (current) | 2026-07-18 | Confirms correct official domain — the roster hint "trypie.com" resolves to the unrelated company Pie Insurance, confirmed via direct fetch |
| https://techcrunch.com/2025/03/04/andy-dunns-new-app-pie-uses-ai-to-help-you-make-friends/ | Andy Dunn's new app Pie uses AI to help you make friends | 2025-03-04 | 2026-07-18 | Founders (Andy Dunn, Samir Mahafzah, Sam Stubbs), $11.5m Series A, official site URL, 130,000+ MAU, 2-city footprint (SF, Chicago), AI personality-quiz matching mechanic |
| https://techcrunch.com/2024/11/19/irl-social-app-pie-is-coming-to-sf-to-make-you-less-lonely/ | IRL social app Pie is coming to SF to make you less lonely | 2024-11-19 | 2026-07-18 | Earlier-stage company timeline and city-expansion context |
| https://pulse2.com/pie-social-app-company-raises-11-5-million-series-a/ | Pie: Social App Company Raises $11.5 Million (Series A) | 2025 | 2026-07-18 | $11.5m Series A, $24m total funding, investor list (Forerunner Ventures/Kirsten Green, Origin Ventures, Renegade Partners, Ev Williams) |

**graphMetrics evidence notes (Pie):** ai_adoption 0.5 — AI personality-quiz matching is core to the product mechanic, per TechCrunch. legacy_disruptiveness 0.4 — moderate displacement of open-RSVP meetup models via paid-organizer guarantee. technical_feasibility 0.75 — live product but still confined to two cities after ~18 months. proprietary_data_moat 0.35 — matching data exists but at small scale (130k MAU, 2 cities). competition_intensity 0.6 — Timeleft, 222, and Meetup all compete in the IRL-connection category.

## Timeleft

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://timeleft.com/ | Timeleft — Turn Strangers into Friends (official site) | Undated (current) | 2026-07-18 | Product description, positioning |
| https://timeleft.com/post/timelefts-london-debut-eclectic-dinners-in-the-uks-metropolis/ | The big London debut — Timeleft's dinners with strangers | 2025-12 (approx.) | 2026-07-18 | 200+ cities, 52 countries as of December 2025; London/Liverpool expansion |
| https://www.trysignalbase.com/news/funding/timeleft-raises-70m-series-a-funding | Timeleft Raises $7.0M Series A Funding | 2024-07-19 | 2026-07-18 | $7m Series A, July 2024 date, investor list (Redstone, EnjoyVenture, Smash Capital, FJ Labs, Global Founders Capital) — no primary press release located; flagged for diligence confirmation |
| https://www.temy.co/breaking-bread-building-bonds-how-maxime-barbiers-timeleft-is-redefining-connections-in-cities-worldwide/ | How Maxime Barbier's Timeleft Is Redefining Connections in Cities Worldwide | Undated | 2026-07-18 | Founder background (Maxime Barbier), company history/origin story, city/participant growth narrative, ~€18m ARR and 150,000 monthly participants (via secondary reporting referenced in the founder profile) |

**graphMetrics evidence notes (Timeleft):** legacy_disruptiveness 0.55 — recurring scheduled-ritual format is a structural departure from open-ended meetup/dating-app models. technical_feasibility 0.9 — proven at real scale (200+ cities, disclosed ARR). proprietary_data_moat 0.45 — multi-year compatibility-matching data across the largest city footprint in this batch's IRL-social sub-group. competition_intensity 0.65 — Pie, 222, and Bumble BFF all target overlapping loneliness/connection use cases.

## Chowdeck

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://chowdeck.com/ | Chowdeck (official site) | Undated (current) | 2026-07-18 | Product/service lines (food, grocery, pharmacy, Chowstore, Chowpass, Relay), city coverage confirmation |
| https://techcrunch.com/2025/08/11/nigeria-profitable-food-delivery-chowdeck-lands-9m-from-novastar-y-combinator/ | Profitable Nigerian food delivery Chowdeck lands $9M from Novastar, Y Combinator | 2025-08-11 | 2026-07-18 | Founders (Femi Aluko, Olumide Ojo, Lanre Yusuf), $9m Series A, Novastar Ventures lead, founding date (Oct 2021), 1.5m customers, 20,000+ riders, 11 cities, profitability claim, 6x 2024 GMV growth, quick-commerce dark-store plans |
| https://afrotech.com/chowdeck-closes-9m-series-a-round | Lagos, Nigeria-Based Chowdeck ... Raises $9M In Series A Funding Round | 2025-08 | 2026-07-18 | Corroborates Series A amount and investor list |

**graphMetrics evidence notes (Chowdeck):** legacy_disruptiveness 0.7 — organized delivery infrastructure replacing largely informal/absent prior delivery options in Nigeria/Ghana, a strong structural disruption. technical_feasibility 0.9 — operating profitably (per company/press) across 11 cities with 20,000+ riders. proprietary_data_moat 0.4 — logistics/dispatch and rider-routing data, moderate differentiation. competition_intensity 0.6 — Glovo and Bolt Food are the primary named multi-category competitors in the region.

## Bezel

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.getbezel.com/ | Bezel (official site) | Undated (current) | 2026-07-18 | Product description, positioning |
| https://www.getbezel.com/app | Bezel iOS App \| Luxury Watch Marketplace | Undated (current) | 2026-07-18 | Feature set (search, wishlist, collection tracking, market intelligence, concierge), authentication process |
| https://www.getbezel.com/post/bezel-seed-round | Bezel Announces Our $8M Seed Round | 2023 (~January) | 2026-07-18 | $8m seed round, investor list (BoxGroup, Courtside VC, Shrug Capital, Abstract Ventures, Operator Partners, celebrity investors), $100m+ inventory value at time of round |
| https://www.forbes.com/sites/daveknox/2024/10/14/how-bezel-is-redefining-the-luxury-watch-market-through-technology/ | How Bezel Is Redefining The Luxury Watch Market Through Technology | 2024-10-14 | 2026-07-18 | Founders (Quaid Walker, Chase Payan/Pion, Darryl Johnson), $500m+ inventory value, AOV above $10,000, "Series A" round-naming conflict (August 2021, per this source), "currently bootstrapping" statement |

**graphMetrics evidence notes (Bezel):** legacy_disruptiveness 0.5 — centralized in-house authentication is a real trust-model departure from fragmented dealer/grey-market watch trading. technical_feasibility 0.85 — operating marketplace with $500m+ listed inventory value. proprietary_data_moat 0.5 — authentication and transaction-based pricing/market-intelligence data is a genuine, hard-to-replicate asset. competition_intensity 0.65 — Chrono24, eBay (Authenticity Guarantee), WatchBox, and 1stDibs all compete in authenticated/curated watch resale.

## Yope (batch substitute for Flagship)

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://yope.app/ | Yope — friends-only photo app (official site) | Undated (current) | 2026-07-18 | Confirms official domain (a TechCrunch citation of "yope.tv" appears to be an alternate/marketing domain; yope.app is the live consumer-facing site), product description ("no feed, no likes, no algorithm"), feature set |
| https://techcrunch.com/2025/02/24/yope-is-sparking-genz-and-vc-interest-with-an-instagram-like-app-for-private-groups/ | Yope is sparking Gen Z (and VC) interest with an Instagram-like app for private groups | 2025-02-24 | 2026-07-18 | Founders (Bahram Ismailau, Paul Rudkouski; met at Belarusian State University), $4.65m seed at $50m valuation, Goodwater Capital lead (with Inovo VC, Redseed), 2.2m MAU / 800k DAU, 40% D7 retention, 30x six-month growth, founding year (2021) and 2024 pivot to the current product |
| https://en.wikipedia.org/wiki/YOPE | YOPE — Wikipedia | Updated periodically | 2026-07-18 | Independent corroboration of company background |

**Flagship shutdown evidence (reason for substitution):**

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.netinfluencer.com/flagship-shuts-down-e-commerce-platform-pivots-to-creator-search-engine/ | Flagship Shuts Down E-Commerce Platform, Pivots To Creator Search Engine | 2026 | 2026-07-18 | Confirms Flagship's creator-storefront marketplace shut down (final sales day July 16, 2026) and the company pivoted to an unrelated AI brand-creator search product ("Radar") — the basis for the batch substitution |

**graphMetrics evidence notes (Yope):** ai_adoption 0.55 — the product is described as "AI-native" with an ML-generated photo-collage feature, per the company's own site. legacy_disruptiveness 0.35 — moderate departure from public-feed social apps via private-group-only design. technical_feasibility 0.8 — real, large, fast-growing engagement (2.2m MAU, 40% D7 retention, 30x six-month growth). proprietary_data_moat 0.3 — private micro-community graph exists but no monetization has been applied to it, limiting confidence in a durable data moat. competition_intensity 0.7 — BeReal, Instagram (Close Friends), and Locket all compete for close-friend photo-sharing usage.

## 222

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://222.place/ | 222 (official site) | Undated (current) | 2026-07-18 | Product description, positioning ("meet new people, discover your city, & deepen your relationships"), matching mechanic references |
| https://www.fastcompany.com/91356813/222-aims-to-end-loneliness-by-engineering-chance | Social platform, 222 looks to connect strangers through AI | 2026 | 2026-07-18 | $10.1m Series A led by Upfront Ventures (Mark Suster), participating investors (Pioneer Fund, YC, General Catalyst, Offline Ventures, Greg Isenberg, Arash Ferdowsi), founders (Danial Hashemi, Keyan Kazemian, Arman Roshannai), founding year (2023), 16 employees, NYC HQ, LA-to-NY expansion |
| https://www.ycombinator.com/companies/222 | 222: the AI social facilitator for offline human to human interactions \| Y Combinator | Undated (current) | 2026-07-18 | Y Combinator company profile corroboration |

**graphMetrics evidence notes (222):** ai_adoption 0.6 — AI/ML personality-matching is described as the core mechanic of the product. legacy_disruptiveness 0.45 — moderate departure from profile-swiping dating/social apps via no-DM, curated-experience design. technical_feasibility 0.75 — live product but confined to two cities (LA, NYC) with a small (16-person) team. proprietary_data_moat 0.4 — personality-matching and outcome data exists but at an early, undisclosed scale. competition_intensity 0.65 — Timeleft, Pie, and Bumble BFF all compete in the same IRL-connection category.

## Public-company comparables (StockAnalysis.com, EV/LTM revenue, accessed 2026-07-18)

| Ticker | Company | EV/LTM revenue | Used in memo(s) |
|---|---|---:|---|
| BMBL | Bumble | 0.85x | Beli, Partiful, Timeleft, 222, Yope, Pie |
| SNAP | Snap | 1.48x | Beli, Partiful, Yope, Pie |
| EB | Eventbrite | 0.77x | Posh, Timeleft, 222 |
| SEAT | Vivid Seats | 0.63x | Posh |
| REAL | The RealReal | 2.34x | Bezel, Pickle |
| TDUP | ThredUp | 2.66x | Pickle |
| ETSY | Etsy | 3.32x | Pickle, Bezel |
| DASH | DoorDash | 5.30x | Chowdeck |
| JMIA | Jumia | 3.70x | Chowdeck |
| GRAB | Grab Holdings | 2.84x | Chowdeck |
| DIBS | 1stDibs | 1.06x | Bezel |
| EBAY | eBay | 4.58x | Bezel |

Reused from the reference file's July 18, 2026 snapshots (not re-fetched): Yelp (1.01x, Beli/Timeleft), Pinterest (2.95x, Beli/Partiful/Posh/222/Yope/Pie), Reddit (12.99x, Partiful/Yope/Pie), Shopify (12.49x, Posh/Bezel comp-set framing).

## General notes

- Several companies in this batch (Beli, Partiful, 222, Yope, Pie) have disclosed no revenue, pricing, or monetization model in any source HCP could locate. This is noted explicitly in each affected memo and in the batch-level source-and-assumption notes.
- Where source figures conflicted (Beli's Series A size; Bezel's round naming, timing, and total raised; Timeleft's founding year and the absence of a primary Series A press release), both/all conflicting figures are presented in the memo and this ledger rather than HCP selecting one silently.
- No company in this batch appears in the excluded reference-file list (Mem0, Sekai, Alinea Invest, Sett, Tailor, Cedar Money, Bevel, Rwazi, Phia, Twentyeight Health).

---

# Batch 08

**Access date for all URLs below: July 18, 2026**, unless a different access context is noted. Publication dates are shown where known. This ledger also documents the one-line evidence basis for each company's `graphMetrics` scores in the JSON companion file.

## Roster swap

Class Companion (classcompanion.com) was replaced with Lindy (lindy.ai) because Class Companion was acquired by Panorama Education on April 23, 2025, and is no longer an independent, fundable company.

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://www.panoramaed.com/blog/class-companion-joins-panorama | Panorama Acquires Class Companion to Boost Student Success Through AI | 2025-04-23 | Confirms acquisition, triggering the roster swap |
| https://www.businesswire.com/news/home/20250423563042/en/Panorama-Education-Acquires-Class-Companion-to-Advance-Personalized-Learning-and-Boost-Student-Success-Through-AI | Panorama Education Acquires Class Companion... | 2025-04-23 | Confirms deal terms undisclosed, prior scale (70,000 teachers, 1.7m students) |

## 1. Howie

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://howie.com/ | Howie — AI Calendar Secretary for Email Scheduling | n/a | Company site, product description |
| https://www.geekwire.com/2025/ai-scheduling-assistant-howie-raises-6m-launches-publicly-with-1000-paying-customers/ | AI scheduling assistant Howie raises $6M, launches publicly with 1,000+ paying customers | 2025-09 | $6m seed, 1,000+ paying customers, 5,000 meetings/week, founder background |
| https://www.webpronews.com/howie-ai-scheduler-raises-6m-from-sequoia-a16z-at-30m-valuation/ | Howie AI Scheduler Raises $6M from Sequoia, a16z at $30M Valuation | 2025-09 | Disclosed $30m post-money valuation, lead investors |
| https://www.thespl.it/p/howie-the-ai-secretary-austin-petersmith | Howie: The AI Secretary — Austin Petersmith, Co-founder and CEO | n/a | Founder role confirmation |

**graphMetrics evidence:** ai_adoption 0.85 (core product is the AI agent itself; 5,000 meetings/week disclosed); technical_feasibility 0.75 (live paying-customer base, human-in-loop backstop reduces failure risk); competition_intensity 0.7 (Calendly, Reclaim, Motion, native calendar AI all target the same job).

## 2. Chronicle

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://chroniclehq.com/ | Chronicle: AI Presentation Maker for Professional Slides & AI PPT | n/a | Product description, "trusted by 5,000+ teams," named customers |
| https://www.forbes.com/sites/charliefink/2025/06/10/chronicle-ai-presentations-launches-with-100000-user-waitlist/ | Chronicle AI Presentations Launches To 100,000 User Waitlist | 2025-06-10 | Founder names and backgrounds, $7.5m 2023 seed and investors, waitlist/business metrics |

**graphMetrics evidence:** competition_intensity 0.85 (Gamma, Canva, Beautiful.ai, and native Office/Workspace AI all target text-to-slide generation); technical_feasibility 0.65 (still seed-stage funding relative to stated ambition and scale of waitlist).

## 3. Fyxer

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://www.fyxer.com/ | Fyxer | n/a | Product description |
| https://sifted.eu/articles/ai-exec-assistant-startup-fyxer-raises-30m-to-expand-to-the-us | AI exec assistant startup Fyxer raises $30m to expand to the US | 2025-09 | $30m Series B, Madrona lead, ARR growth $1m to $17m, 180,000+ users, 90% 3-month retention |
| https://www.fyxer.com/blog/series-b-statement | Announcing our $30M Series B: Predicting your next email | 2025-09 | Company-authored financing statement |
| https://www.fyxer.com/pricing | Fyxer Pricing | n/a | Starter/Professional/Enterprise pricing tiers |
| https://www.madrona.com/fyxer-ai-productivity-tools-for-email-and-meetings/ | How Fyxer Built AI Productivity Tools... | n/a | Investor profile, ARR trajectory context |
| https://www.forbes.com/sites/jessicamendoza1/2025/11/18/4-growth-strategies-behind-a-10-month-jump-to-25-million/ | 4 Growth Strategies Behind A 10-Month Jump To $25 Million In Revenue | 2025-11-18 | $25m revenue figure used in JSON metrics.arr |
| https://www.crunchbase.com/person/richard-hollingsworth-fdf8 | Richard Hollingsworth — Co-Founder and CEO @ Fyxer AI | n/a | Founder role confirmation |

**graphMetrics evidence:** ai_adoption 0.8 and technical_feasibility 0.85 (disclosed ARR growth from ~$1m to ~$25m within roughly a year); proprietary_data_moat 0.4 (founders cite ~500,000 hours of proprietary EA-workflow training data); competition_intensity 0.8 (Superhuman, Read AI, Otter, native Gmail/Outlook Copilot all overlap).

## 4. Napkin

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://www.napkin.ai/ | Napkin AI — The visual AI for business storytelling | n/a | Product description |
| https://techcrunch.com/2024/08/07/napkin-turns-text-into-visuals-with-a-bit-of-generative-ai/ | Napkin turns text into visuals with a bit of generative AI | 2024-08-07 | Founders (Pramod Sharma, Jerome Scholler), backgrounds, $10m seed from Accel/CRV, product mechanics |
| https://www.napkin.ai/pricing/ | Napkin AI Pricing | n/a | Free/Plus $12/Pro $30/Enterprise tiers |

**graphMetrics evidence:** competition_intensity 0.85 (Canva, Gamma, Miro, Whimsical, and Microsoft Designer all overlap on text-to-visual generation); proprietary_data_moat 0.2 (no distinctive proprietary data source identified).

## 5. Happenstance

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://happenstance.ai/ | Happenstance — Search your network with AI | n/a | Product description, "400,000+ users" claim, named investors (Perplexity, YC, Brex, Accel as customers/backers) |
| https://www.ycombinator.com/companies/happenstance | Happenstance: People search powered by AI — Y Combinator | n/a | YC W24 batch confirmation, founder identification, team size (3) |
| https://getlatka.com/companies/happenstance.ai | Happenstance Revenue, Valuation & Funding History | n/a | Third-party funding estimate ($2.5m vs. $500k discrepancy) — used to flag disputed figures, not as a confirmed fact |
| https://www.linkedin.com/in/alexteichman/ | Alex Teichman — Founder & CEO of Happenstance | n/a | Founder background (Stanford CS PhD, self-driving perception work) |

**graphMetrics evidence:** proprietary_data_moat 0.5 (cross-platform OAuth-aggregated relationship graph is a genuine, hard-to-replicate data asset); technical_feasibility 0.6 (small three-person team, disputed/thin funding record); regulatory_moat 0.15 (OAuth access across multiple platforms carries real but modest privacy/compliance considerations).

## 6. Delphi

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://www.delphi.ai/ | Delphi: Create Your Digital Mind | n/a | Product description |
| https://www.delphi.ai/blog/delphi-raises-16m-series-a-from-sequoia | Delphi Raises $16M Series A from Sequoia Capital to Pioneer "Digital Minds" | 2025-06-24 | $16m Series A, investor list, 2,000+ creators, revenue/headcount growth, prior $2.7m seed |
| https://www.fastcompany.com/91356476/delphi-ai-digital-mind | Meet Delphi, the AI startup that lets experts turn themselves into chatbots | n/a | Founder backgrounds (Ladjevardian's Friday exit, C3 AI, OpenStore) |
| https://www.delphi.ai/pricing | Delphi Pricing | n/a | Free/Builder $79/Scaler $299/Immortal tiers |

**graphMetrics evidence:** proprietary_data_moat 0.45 (each digital mind is trained on a specific creator's proprietary content corpus, not transferable); competition_intensity 0.55 (Character.AI, HeyGen, Tolan overlap only partially on the specific creator-monetization use case).

## 7. SchoolAI

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://schoolai.com/ | SchoolAI | n/a | Product description |
| https://www.globenewswire.com/news-release/2025/04/02/3054126/0/en/SchoolAI-Secures-25-Million-to-Help-Teachers-and-Schools-Reach-Every-Student.html | SchoolAI Secures $25 Million to Help Teachers and Schools Reach Every Student | 2025-04-02 | $25m Series A led by Insight Partners, $32m total, 1M classrooms, 400+ districts, 80+ countries, 150,000+ AI tools created |
| https://schoolai.com/pricing | SchoolAI Pricing | n/a | Free trial/Pro/Scale tier structure, ESSA/FERPA/COPPA/SOC2/1EdTech certifications |
| https://pangeaglobe.com/interviews/caleb-hicks-founder-and-ceo-schoolai/ | Caleb Hicks, Founder and CEO, SchoolAI | n/a | Founder background |

**graphMetrics evidence:** regulatory_moat 0.4 (FERPA, COPPA, SOC 2 Type 2, 1EdTech, and ESSA Level III validation form a genuine compliance moat for U.S. public-school procurement); proprietary_data_moat 0.35 (150,000+ educator-created AI tools/Spaces represent platform-specific accumulated content); competition_intensity 0.7 (MagicSchool AI, Khanmigo, Brisk Teaching, Google/Microsoft native tools).

## 8. Brisk Teaching

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://www.briskteaching.com/ | Brisk Teaching | n/a | Product description |
| https://www.prnewswire.com/news-releases/brisk-teaching-raises-15-million-to-reinvent-classroom-technology-for-the-ai-era-302412034.html | Brisk Teaching Raises $15 Million to Reinvent Classroom Technology for the AI Era | 2025-03-26 | $15m Series A led by Bessemer, $20m total (incl. $5m Sept 2024 seed), 1M educators, 100+ countries |
| https://www.bvp.com/news/giving-teachers-their-time-back-our-investment-in-brisk-teaching | Giving teachers their time back: Our investment in Brisk Teaching | n/a | Bessemer investor perspective |
| https://www.forbes.com/profile/arman-jaffer/ | Arman Jaffer — Forbes profile | n/a | Founder background (White House OCTO, Google, CZI, Forbes 30 Under 30) |

**graphMetrics evidence:** ai_adoption 0.8 (1M+ educators using an embedded, daily-workflow product); regulatory_moat 0.25 (education-data privacy considerations present but less certification evidence disclosed than SchoolAI); competition_intensity 0.75 (direct overlap with SchoolAI, MagicSchool AI, Khanmigo, and native Google/Microsoft education AI).

## 9. Lindy (roster-swap replacement for Class Companion)

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://www.lindy.ai/ | Lindy — AI work assistant | n/a | Product description, "400,000+ professionals," pricing tiers |
| https://www.clay.com/dossier/lindy-funding | Lindy AI Funding Summary | n/a | $49.9m aggregate across seed/Series A/Series B tranches, Battery Ventures lead — cited as one of two conflicting third-party accounts |
| https://saasclub.io/podcast/lindy-flo-crivello-450/ | How Repositioning This AI SaaS Unlocked 7-Figure Growth | n/a | Founder interview: "high seven figures" revenue, TeamFlow pivot history, team size, most funding inherited from TeamFlow |
| https://www.crunchbase.com/organization/lindy | Lindy — Crunchbase Company Profile & Funding | n/a | Referenced in prior web-search synthesis for the alternate "$50M Series A" framing (page itself returned 403 on direct fetch; treated as a secondary citation only) |

**graphMetrics evidence:** technical_feasibility 0.6 (disclosed revenue and user claims are real but not independently confirmed, and financing history is unusually unclear); competition_intensity 0.85 (Zapier, n8n, Gumloop, Make, and Microsoft Copilot Studio all compete directly for SMB no-code AI agent workflows); proprietary_data_moat 0.15 (no distinctive proprietary data source identified beyond general product usage).

## 10. Ello

| URL | Source title | Publication date | Claim supported |
|---|---|---|---|
| https://www.ello.com/ | Ello: Reading & Math Built Around Your Child | n/a | Product description |
| https://www.globenewswire.com/news-release/2023/09/07/2739711/0/en/Ello-World-s-Most-Advanced-AI-Reading-Coach-Raises-15M-Series-A.html | Ello, World's Most Advanced AI Reading Coach, Raises $15M Series A | 2023-09-07 | $15m Series A, Goodwater lead, full investor list, board additions |
| https://techcrunch.com/2023/09/07/ai-reading-coach-startup-ello-raises-15-million-to-bolster-child-literacy/ | AI reading coach startup Ello raises $15M to bolster child literacy | 2023-09-07 | 10,000 families, 300,000+ books read, speech-recognition claims (vs. Whisper/Google Cloud) |
| https://pulse2.com/ello-profile-elizabeth-adams-interview/ | Ello: Interview With Co-Founder & CXO Elizabeth Adams | n/a | Co-founder background confirmation |

**graphMetrics evidence:** proprietary_data_moat 0.35 (accumulated child reading/speech interaction data); regulatory_moat 0.2 (children's-data-privacy compliance requirements create a modest barrier for well-resourced competitors); technical_feasibility 0.6 (child speech recognition is a genuinely hard problem; company claims of outperforming Whisper/Google Cloud are unverified by HCP).

## Public-comps sources (stockanalysis.com, all as of 2026-07-18)

| Ticker | URL | Used in memo(s) | EV/LTM revenue |
|---|---|---|---:|
| MNDY | https://stockanalysis.com/stocks/mndy/statistics/ | Fyxer, Howie, Napkin, Chronicle, Lindy | 1.80x |
| ASAN | https://stockanalysis.com/stocks/asan/statistics/ | Fyxer, Howie, Lindy | 1.97x |
| BOX | https://stockanalysis.com/stocks/box/statistics/ | Fyxer, Howie | 3.57x |
| DBX | https://stockanalysis.com/stocks/dbx/statistics/ | Fyxer, Howie | 3.91x |
| ADBE | https://stockanalysis.com/stocks/adbe/statistics/ | Napkin, Chronicle | 3.80x |
| FIG | https://stockanalysis.com/stocks/fig/statistics/ | Napkin, Chronicle | 9.54x |
| DUOL | https://stockanalysis.com/stocks/duol/statistics/ | Ello, SchoolAI, Brisk Teaching, Delphi | 4.62x |
| CHGG | https://stockanalysis.com/stocks/chgg/statistics/ | Ello, SchoolAI | 0.24x |
| COUR | https://stockanalysis.com/stocks/cour/statistics/ | Ello, SchoolAI, Brisk Teaching | 1.04x |
| LRN | https://stockanalysis.com/stocks/lrn/statistics/ | SchoolAI, Brisk Teaching | 1.32x |
| PATH | https://stockanalysis.com/stocks/path/statistics/ | Lindy | 2.97x |
| UDMY | https://stockanalysis.com/stocks/udmy/statistics/ | Brisk Teaching | 0.42x |
| SPOT | https://stockanalysis.com/stocks/spot/statistics/ | Delphi | 4.53x |

Reused from `HCP_10_Investment_Memos_2026-07-18.md` (not re-fetched, per batch instructions): HubSpot (HUBS) 3.04x — Fyxer, Chronicle, Napkin, Lindy; ZoomInfo (GTM) 1.85x — Happenstance; Similarweb (SMWB) 2.02x — Happenstance; Semrush (SEMR) 3.49x — Happenstance; Gartner (IT) 1.71x — Happenstance; Pinterest (PINS) 2.95x — Delphi; Reddit (RDDT) 12.99x — Delphi.

## Notes on excluded public comps

PowerSchool and Instructure were considered for the SchoolAI and Brisk Teaching comp sets but excluded: both were formerly public K-12/higher-ed software companies taken private in 2024 (PowerSchool by Bain Capital; Instructure by KKR), and are therefore not usable as current public-market EV/LTM comps.

---

# Batch 09

**Access date for all URLs:** July 18, 2026, unless otherwise noted.

## Roster-swap and stage-progression sources

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://deeptechnation.ch/dtn-news/amazon-acquires-rivr-how-an-eth-zurich-lab-built-the-robot-that-delivers-your-packages/ | Amazon Acquires RIVR: How an ETH Zurich Lab Built the Robot That Delivers Your Packages | 2026 | 2026-07-18 | RIVR founded 2023 as ETH Zurich Robotic Systems Lab spinout; acquired by Amazon; basis for disqualifying RIVR and swapping in Cartken |
| https://www.swissinfo.ch/eng/workplace/amazon-acquires-swiss-robotics-start-up-rivr/91144826 | Amazon acquires Swiss robotics start-up Rivr | 2026 | 2026-07-18 | Independent confirmation of Amazon's acquisition of RIVR (formerly Swiss-Mile), March 2026 |
| https://theaiinsider.tech/2026/04/01/amazon-acquires-swiss-robotics-company-rivr/ | Amazon Acquires Swiss Robotics Company RIVR | 2026-04-01 | 2026-07-18 | Further confirmation of RIVR acquisition and prior $22m seed round led by Bezos Expeditions and HongShan |

## Theseus

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.theseus.us/ | Theseus (company site) | n/a | 2026-07-18 | Product name (Cyclops), technical description, MAVLink/EO-LWIR integration, US Air Force testimonial, mission statement |
| https://www.ycombinator.com/companies/theseus | Theseus | Y Combinator | n/a | 2026-07-18 | Y Combinator portfolio confirmation; founding story |
| https://techcrunch.com/2025/04/17/defense-tech-theseus-landed-y-combinator-the-us-special-forces-and-4-3m-from-a-tweet/ | Defense tech Theseus landed Y Combinator, the US Special Forces, and $4.3M from a tweet | 2025-04-17 | 2026-07-18 | Founders (Ian Laffey, Sacha Lévy, Carl Schoeller), $4.3m seed round (First Round Capital, YC, Lux Capital), Special Forces testing/LOI/DoD-interest claims, founding hackathon story |

Evidence note for graphMetrics: technical_feasibility (0.65) and legacy_disruptiveness (0.7) reflect the US Air Force testimonial and Special Forces testing relationship cited above; regulatory_moat (0.55) reflects the dual-use/export-control nature of defense navigation technology; proprietary_data_moat (0.4) and competition_intensity (0.45) reflect the absence of disclosed proprietary datasets and a moderately crowded PNT/navigation-alternatives field (Anduril, Xona).

## Anyware Robotics

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://anyware-robotics.com/ | Anyware Robotics (company site) | n/a | 2026-07-18 | Company overview, Pixmo product description |
| https://www.prnewswire.com/news-releases/anyware-robotics-secures-12m-seed-funding-deploys-pixmo-commercially-302401361.html | Anyware Robotics Secures $12M Seed Funding, Deploys Pixmo Commercially | 2025-03 | 2026-07-18 | $12m seed round (GFT Ventures lead; Foothill Ventures, Black Forest Ventures, Alumni Ventures), Western Post US as first commercial customer, patent-pending conveyor "pull" mechanism |
| https://spectrum.ieee.org/anyware-robotics-pixmo | Anyware Robotics' Pixmo Takes Unique Approach to Trailer Unloading | 2025 | 2026-07-18 | Independent technical description of Pixmo's AMR + cobot + perception architecture and conveyor-pull innovation |
| https://anyware-robotics.com/company/ | Company – Anyware Robotics | n/a | 2026-07-18 | Founder names and backgrounds (Thomas Tang, Bruce Fan, FANUC and UC Berkeley PhD backgrounds) |

Evidence note for graphMetrics: technical_feasibility (0.6) and legacy_disruptiveness (0.65) reflect the FANUC-trained founding team and patent-pending mechanical innovation; proprietary_data_moat (0.4) reflects early-stage deployment with a single named customer; competition_intensity (0.6) reflects multiple funded competitors (Contoro, Pickle Robot, Dexterity, Boston Dynamics) in the same workflow.

## Daedalus

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.daedalus.de/ | Daedalus | AI-Driven Precision Manufacturing (company site) | n/a | 2026-07-18 | Company name/domain confirmation (daedalus.de, not .com as in roster hint) |
| https://techcrunch.com/2024/02/08/daedalus-manufacturing-jonas-schneider-openai-robotics-raises-21-million/ | Daedalus, which is building precision-manufacturing factories powered by AI, raises $21M | 2024-02-08 | 2026-07-18 | $21m Series A (NGP Capital lead, Addition, Khosla Ventures, YC), founder Jonas Schneider background, Karlsruhe factory, target sectors (semiconductor, defense, energy, e-mobility, medical) |
| https://www.ngpcap.com/insights/daedalus-a-startup-led-by-former-openai-technical-lead-secures-21m-to-redefine-manufacturing-with-ai | Daedalus, a startup led by former OpenAI technical lead, secures $21M to redefine manufacturing with AI | 2024 | 2026-07-18 | Confirms Jonas Schneider's OpenAI/Stripe background, total funding ~$38.5-40m, team composition (OpenAI/Google/SpaceX/Blue Horizon alumni) |

Evidence note for graphMetrics: ai_adoption (0.65) and legacy_disruptiveness (0.7) reflect the AI-driven shop-floor orchestration replacing manual scheduling in a traditionally low-tech industry; technical_feasibility (0.55) reflects real production deployment but unproven multi-factory scale; proprietary_data_moat (0.5) reflects accumulating shop-floor telemetry from an operating factory.

## Cartken

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.cartken.com/ | Cartken (company site) | n/a | 2026-07-18 | Company overview, current product lines |
| https://www.cartken.com/about-us | About Us | n/a | 2026-07-18 | Founder names/backgrounds (Christian Bersch, Jonas Witt, Anjali Naik), founding story (2019, ex-Google), company locations |
| https://www.cartken.com/press-release/cartken-announces-22-5m-in-aggregate-funding-to-advance-ai-based-technology-stack-enabling-autonomous-delivery-robots | Cartken Announces $22.5M in Funding for AI-Powered Delivery Robots | 2024-07 | 2026-07-18 | $22.5m aggregate Series A funding, lead investor 468 Capital, other investors (LDV Partners, Magna Technology Investments, Mitsubishi Electric, Plug and Play) |
| https://techcrunch.com/2025/07/20/why-cartken-pivoted-its-focus-from-last-mile-delivery-to-industrial-robots/ | Why Cartken pivoted its focus from last-mile delivery to industrial robots | 2025-07-20 | 2026-07-18 | Strategic pivot to industrial robotics, ZF Lifetec customer origin story, Cartken Hauler/Runner products, Melco Mobility Solutions ~100-robot order, total funding >$20m |

Evidence note for graphMetrics: technical_feasibility (0.65) reflects multi-year fleet-operations history since 2019; legacy_disruptiveness (0.55) and competition_intensity (0.6) reflect a crowded field (Serve Robotics, Starship, Locus) and a recent, unproven strategic pivot; proprietary_data_moat (0.45) reflects accumulated delivery-fleet operating data.

## Contoro

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://contoro.com/ | Autonomous Trailer & Container Unloading - Contoro (company site) | n/a | 2026-07-18 | Company overview, Duo-Grasp product description |
| https://www.globenewswire.com/news-release/2025/03/25/3049120/0/en/Contoro-Robotics-Secures-12M-Series-A-to-Bring-AI-Powered-Trailer-Unloading-to-Scale.html | Contoro Robotics Secures $12M Series A to Bring AI-Powered Trailer Unloading to Scale | 2025-03-25 | 2026-07-18 | $12m Series A, $22m total funding, investor list (Doosan, Coupang, Amazon Industrial Innovation Fund, IMM, SV Investment, KB Investment, Kakao Ventures, Future Play), founder quote, 99%+ success rate, pay-per-container pricing model |
| https://www.freightwaves.com/news/contoro-robotics-raises-12m-to-scale-ai-powered-trailer-unloading | Contoro Robotics raises $12M to scale AI-powered trailer unloading | 2025-03 | 2026-07-18 | Independent confirmation of funding round and unloading-speed/labor-savings claims |
| https://theorg.com/org/contoro-robotics/org-chart/youngmok-yun | Youngmok Yun - Ceo/founder at Contoro Robotics | n/a | 2026-07-18 | Founder background: Harmonic Bionics CEO/CTO role, FDA-approved rehab robot, NSF/NASA/UT Austin research support |

Evidence note for graphMetrics: technical_feasibility (0.6) reflects the disclosed 99%+ success rate claim (company-reported, not independently verified); proprietary_data_moat (0.45) reflects the human-in-the-loop correction-data flywheel; competition_intensity (0.6) reflects direct overlap with Anyware Robotics and other unloading-robot startups.

## Chef Robotics

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.chefrobotics.ai/ | Chef Robotics (company site) | n/a | 2026-07-18 | Company overview, RaaS positioning |
| https://www.chefrobotics.ai/post/weve-raised-43-1m-to-accelerate-our-ai-enabled-robot-deployments | We've Raised a $43.1M Series A to Accelerate Our AI-Enabled Robot Deployments | 2025-03-31 | 2026-07-18 | $43.1m Series A ($20.6m equity + $22.5m equipment debt), investor list (Avataar Venture Partners lead, Construct Capital, Bloomberg Beta, Promus Ventures, MFV Partners, HCVC, Alumni Ventures, MaC Venture Capital, and others), SVB/First Citizens debt financing, total capital ~$65.6m, customer names (Cafe Spice, Project Open Hand, Amy's Kitchen, Chef Bombay, Sunbasket), "more than 44 million servings" figure as of the announcement |
| https://www.cnbc.com/2025/03/31/chef-robotics-raises-20point6-million-to-continue-building-ai-robot-arms.html | Chef Robotics raises $20.6 million to continue building AI robot arms | 2025-03-31 | 2026-07-18 | Independent confirmation of the $20.6m equity tranche, founder Rajat Bhageria background (Prototype Capital, ThirdEye, UPenn/Wharton education), "more than 40 million meals" figure at announcement |
| https://www.chefrobotics.ai/company | About us \| Chef Robotics | n/a | 2026-07-18 | Current company page: "more than 70 million" food servings claim (updated from the March 2025 announcement figure), mission statement, RaaS solution description |

Evidence note for graphMetrics: ai_adoption (0.55) and legacy_disruptiveness (0.6) reflect the embodied-AI food-manipulation model deployed across named production customers; technical_feasibility (0.55) reflects real production deployment (70m+ servings) without a disclosed revenue metric; proprietary_data_moat (0.5) reflects production data across nearly 2,000 ingredients; competition_intensity (0.45) reflects a still-limited set of direct food-assembly-robotics competitors (Soft Robotics, Dexterity, Nimble Robotics).

## Sereact

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://sereact.ai/ | One Brain. Any Robot. \| Sereact (company site) | n/a | 2026-07-18 | Company overview, VLAM product description |
| https://sereact.ai/posts/sereact-fundraising-series-a | Sereact raises €25M to boost AI-powered robotics | 2025-01-20 | 2026-07-18 | €25m Series A (Creandum lead, Point Nine, Air Street Capital, angel investors), founders Ralf Gulde and Marc Tuscher (University of Stuttgart), customers (Daimler Truck, Bol, MS Direct, Active Ants) |
| https://siliconangle.com/2026/04/27/sereact-raises-110m-scale-ai-robotic-brain-expand-us/ | AI Startup Sereact Raises $110 Million for Robots That Predict Consequences | 2026-04-27 | 2026-07-18 | $110m Series B (Headline VC lead, Bullhound Capital, Felix Capital, Daphni, existing investors), 200+ systems deployed, 1bn+ production picks, ~1-in-53,000 intervention rate, >$140m total funding, Boston office/US expansion plan |
| https://tech.eu/2026/04/27/german-robotics-startup-sereact-raises-110m/ | German robotics startup Sereact raises $110M | 2026-04-27 | 2026-07-18 | Independent confirmation of Series B terms and company scale (~100 employees, Stuttgart HQ), customer BMW |

Evidence note for graphMetrics: ai_adoption (0.75) and technical_feasibility (0.75) reflect the disclosed 1bn+ production picks and low intervention rate at real industrial customers (BMW, Daimler Truck); proprietary_data_moat (0.65) reflects the cross-vendor production-data asset; competition_intensity (0.55) reflects a moderately crowded robot-manipulation-AI field (Covariant, Dexterity, Physical Intelligence).

## Isembard

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.isembard.com/ | Isembard - Faster, Cheaper, Greener Manufacturing (company site) | n/a | 2026-07-18 | Company overview, MasonOS description |
| https://techcrunch.com/2025/04/24/british-startup-isembard-lands-9m-to-reshore-manufacturing-for-critical-industries/ | British startup Isembard lands $9M to reshore manufacturing for critical industries | 2025-04-24 | 2026-07-18 | £7m (~$9m) seed round led by Notion Capital, distributed-factory model description, first London factory |
| https://www.isembard.com/blogs-and-articles/isembard-raises-50m-series-a-to-open-25-ai-powered-factories-serving-aerospace-and-defence | Isembard Raises $50m Series A to Open 25 AI-Powered Factories Serving Aerospace and Defence | 2026-03-09 | 2026-07-18 | $50m Series A led by Union Square Ventures (Tamarack Global, IQ Capital, Notion Capital, CIV, angel investors), 25-factories-by-end-of-2026 plan, US/Germany/France/Ukraine expansion, $1.8T market claim |
| https://www.insidermedia.com/news/south-west/after-one-call-with-alex-fitzgerald-the-ceo-and-founder-of-isembard-i-just-knew-it-was-the-right-move-within-four-months-the-factory-was-up-and-running-here-in-exeter | (Insider Media article on Isembard CEO and Exeter factory) | n/a | 2026-07-18 | Founder identification: Alexander Fitzgerald, CEO and founder |

Evidence note for graphMetrics: legacy_disruptiveness (0.65) reflects the reshoring/distributed-factory thesis targeting an aging incumbent base; technical_feasibility (0.5) reflects unproven franchise-quality consistency at the 25-factory target scale; regulatory_moat (0.5) reflects the defense/aerospace-adjacent customer base and associated qualification requirements; competition_intensity (0.4) reflects a still-nascent distributed-manufacturing-software category.

## Orbital Materials

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.orbitalindustries.com/ | Orbital Industries (company site, current) | n/a | 2026-07-18 | Current company name/branding, "AI Industrial" positioning, data-center cooling product line |
| https://techcrunch.com/2024/02/21/this-startup-is-using-ai-to-discover-new-materials/ | This startup is using AI to discover new materials | 2024-02-21 | 2026-07-18 | $16m Series A (Radical Ventures lead, Toyota Ventures), founder Jonathan Godwin (ex-DeepMind), LINUS model description, carbon-capture sorbent application, 13-person team, London/New Jersey labs |
| https://fortune.com/2026/05/28/exclusive-orbital-industries-raises-50-million-series-b-funding-round-ai-to-discover-exotic-new-materials/ | Exclusive: Orbital Industries, which uses AI to discover new materials, raises $50 million Series B | 2026-05-28 | 2026-07-18 | $50m Series B led by Plural; confirms rebrand from Orbital Materials to Orbital Industries |
| https://radical.vc/revolutionizing-materials-discovery-with-ai-why-we-invested-in-orbital-materials/ | Revolutionizing Materials Discovery with AI: Why we invested in Orbital Materials | n/a | 2026-07-18 | Radical Ventures investment rationale; additional co-founders James Gin-Pollock and Daniel Miodovnik named in related founding coverage |

Evidence note for graphMetrics: ai_adoption (0.75) reflects the AI-native foundation-model discovery approach; legacy_disruptiveness (0.55) and technical_feasibility (0.5) reflect a credible but commercially unproven approach (no disclosed revenue); proprietary_data_moat (0.55) reflects the combined simulation-plus-wet-lab validation dataset; competition_intensity (0.35) reflects a still-small set of direct AI-materials-discovery competitors.

## Matic

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://maticrobots.com/ | Matic Robots (company site) | n/a | 2026-07-18 | Company/product overview |
| https://maticrobots.com/blog | Matic comes out of stealth with $30M in funding to launch fully autonomous indoor robots | 2023-11-02 | 2026-07-18 | Stealth-launch funding disclosure; confirms founding narrative |
| https://maticrobots.com/product | Shop Matic | n/a | 2026-07-18 | Pricing ($1,245-$2,490 configurations), Bag Pass/Care add-on pricing, feature list (55dB noise, 2.5-3hr battery, on-device privacy) |
| https://sacra.com/c/matic/ | Matic funding, news & analysis | n/a | 2026-07-18 | Third-party-reported funding history: $5.6m seed, $24m Series A (Nov 2023), $77.3m Series A Prime across two tranches (July 2025), ~$650m post-money valuation, ~$106.6m total funding, angel investor list (Nat Friedman, Collison brothers, Matt Rogers, Jack Dorsey, Naval Ravikant, Joe Lonsdale) — flagged as third-party, not company-confirmed |
| https://vacuumwars.com/matic-robot-vacuum-review/ | Matic Robot Vacuum Review: A New Approach to Robot Vacuum and Mop Design | n/a | 2026-07-18 | Independent test results: 8.11 kPa suction (highest recorded by reviewer across ~200 units tested), 55dB noise level, product trade-off assessment |
| https://stockanalysis.com/stocks/irbt/ | iRobot (IRBTQ) stock page | n/a | 2026-07-18 | iRobot Chapter 11 bankruptcy filing (Dec 2025), delisting to OTC, pending acquisition by Picea Robotics — used as a consumer-robotics cautionary comp |

Evidence note for graphMetrics: technical_feasibility (0.6) reflects independently verified product test results; legacy_disruptiveness (0.45) reflects incremental (not category-redefining) improvement over lidar-based incumbents; competition_intensity (0.75) reflects a crowded, low-margin consumer-appliance category including a recent bankruptcy (iRobot); ai_adoption (0.4) reflects on-device computer vision without a differentiated software/data business model.

## Public-company comps (stockanalysis.com, "Statistics" pages, EV/Sales, accessed 2026-07-18)

| URL | Ticker | EV/LTM Revenue | Used for |
|---|---|---:|---|
| https://stockanalysis.com/stocks/sym/statistics/ | Symbotic (SYM) | 9.09x | Anyware Robotics, Daedalus (context), Contoro, Chef Robotics, Cartken, Sereact comps |
| https://stockanalysis.com/stocks/zbra/statistics/ | Zebra Technologies (ZBRA) | 2.77x | Anyware Robotics, Contoro, Chef Robotics, Cartken, Sereact comps |
| https://stockanalysis.com/stocks/cgnx/statistics/ | Cognex (CGNX) | 9.97x | Anyware Robotics, Contoro, Chef Robotics, Cartken, Sereact comps |
| https://stockanalysis.com/stocks/rok/statistics/ | Rockwell Automation (ROK) | 6.25x | Anyware Robotics, Daedalus, Chef Robotics comps |
| https://stockanalysis.com/stocks/midd/statistics/ | Middleby (MIDD) | 2.34x | Chef Robotics comp |
| https://stockanalysis.com/stocks/irbt/statistics/ | iRobot (IRBTQ) | 0.38x | Matic comp (distressed, excluded from median) |
| https://stockanalysis.com/stocks/sn/statistics/ | SharkNinja (SN) | 3.37x | Matic comp |
| https://stockanalysis.com/stocks/whr/statistics/ | Whirlpool (WHR) | 0.59x | Matic comp |
| https://stockanalysis.com/stocks/hele/statistics/ | Helen of Troy (HELE) | 0.77x | Matic comp |
| https://stockanalysis.com/stocks/serv/statistics/ | Serve Robotics (SERV) | 38.69x | Cartken comp (context; excluded from median due to small revenue base) |
| https://stockanalysis.com/stocks/xmtr/statistics/ | Xometry (XMTR) | 7.64x | Daedalus, Isembard comps |
| https://stockanalysis.com/stocks/prlb/statistics/ | Proto Labs (PRLB) | 3.10x | Daedalus, Isembard comps |
| https://stockanalysis.com/stocks/fn/statistics/ | Fabrinet (FN) | 3.83x | Daedalus, Isembard comps |
| https://stockanalysis.com/stocks/avav/statistics/ | AeroVironment (AVAV) | 3.73x | Theseus comp |
| https://stockanalysis.com/stocks/ktos/statistics/ | Kratos Defense & Security Solutions (KTOS) | 5.19x | Theseus, Isembard comps |
| https://stockanalysis.com/stocks/rdw/statistics/ | Redwire (RDW) | 5.38x | Theseus comp |
| https://stockanalysis.com/stocks/pltr/statistics/ | Palantir (PLTR) | 59.25x | Theseus comp (context only, excluded from median) |
| https://stockanalysis.com/stocks/rxrx/statistics/ | Recursion Pharmaceuticals (RXRX) | 14.77x | Orbital Materials comp (context; different end market, excluded from median) |
| https://stockanalysis.com/stocks/cbt/statistics/ | Cabot Corporation (CBT) | 1.60x | Orbital Materials comp |
| https://stockanalysis.com/stocks/ecvt/statistics/ | Ecovyst (ECVT) | 2.12x | Orbital Materials comp |

**Note:** iRobot's ticker on stockanalysis.com displays as IRBTQ, reflecting its December 2025 Chapter 11 bankruptcy filing and delisting to OTC markets; its 0.38x multiple is shown for cautionary context in Matic's memo but excluded from that comp set's median because it is not a going-concern comparable. Serve Robotics' 38.69x and Palantir's 59.25x are similarly shown for context and excluded from their respective medians because a very small revenue base (Serve) or a fundamentally different software-margin business model (Palantir) would distort a median intended to represent typical hardware/robotics economics.

---

# Batch 10

**Batch:** B2B SaaS across models and go-to-market motions
**Companies:** Tofu, Default, Thena, Dock, Kula, Metaview, Campfire, Doss, Sequence, Gradient Labs
**Access date for all sources below:** July 18, 2026, unless otherwise noted.
**No swaps performed.** All ten assigned companies were verified and retained; alternates (Solidroad, Complete) were not used.

Public-company EV/LTM revenue multiples were fetched from stockanalysis.com on July 18, 2026 (or, where noted, reused directly from `HCP_10_Investment_Memos_2026-07-18.md`'s July 18, 2026 snapshot for the same ticker). All other multiples in this batch (Paylocity, Dayforce, ZipRecruiter, Freshworks, DocuSign, Asana, Zuora, BILL Holdings, nCino, Q2 Holdings) were fetched fresh for this batch.

---

## 1. Tofu

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.tofuhq.com/ | Tofu — Ship Integrated Campaigns 8x Faster | Undated (current site) | 2026-07-18 | Product positioning, "8x faster" claim |
| https://www.tofuhq.com/platform | Tofu Platform — AI Demand Gen Agents for B2B Marketing | Undated (current site) | 2026-07-18 | Product description, agentic campaign workflow |
| https://www.prnewswire.com/news-releases/tofu-raises-12m-series-a-to-consolidate-martech-for-enterprise-gtm-teams-302375706.html | Tofu Raises $12M Series A to Consolidate Martech for Enterprise GTM Teams | 2025-02-13 | 2026-07-18 | Series A amount, lead/participating investors, founder name (EJ Cho), co-founders (Elaine, Honglei), growth metrics (12x revenue, 36x content), customer names |
| https://www.tofuhq.com/post/tofu-raises-12m-series-a-to-cut-martech-bloat-for-gtm-teams | Tofu raises $12M Series A to cut martech bloat for GTM teams | 2025 (post-Series A) | 2026-07-18 | Corroborates Series A details and customer names |
| https://www.indexventures.com/perspectives/tofu-raises-5m-seed-round-to-put-b2b-marketing-on-autopilot-with-ai/ | Tofu raises $5M Seed Round | 2024 (pre-Series A) | 2026-07-18 | Prior seed round amount and lead investor (Index Ventures) |
| https://stockanalysis.com/stocks/smwb/statistics/ | Similarweb (SMWB) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 2.02x — reused from reference file |
| https://stockanalysis.com/stocks/semr/statistics/ | Semrush (SEMR) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.49x — reused from reference file |
| https://stockanalysis.com/stocks/gtm/statistics/ | ZoomInfo (GTM) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.85x — reused from reference file |
| https://stockanalysis.com/stocks/it/statistics/ | Gartner (IT) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.71x — reused from reference file |
| https://stockanalysis.com/stocks/hubs/statistics/ | HubSpot (HUBS) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.04x — reused from reference file |

**graphMetrics evidence:** ai_adoption 0.7 (product is agent-native by design, per platform page); legacy_disruptiveness 0.5 (targets tool-sprawl, not a single dominant incumbent); technical_feasibility 0.75 (LLM content generation is a mature capability); competition_intensity 0.8 (HubSpot, 6sense, Jasper, Mutiny all compete for the same budget); proprietary_data_moat 0.4 (brand/product knowledge base is a real but early-stage data asset).

---

## 2. Default

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.default.com/ | Default — AI infrastructure for revenue teams | Undated (current site) | 2026-07-18 | Product positioning |
| https://www.default.com/post/agent-launch | Announcing Our Series A to Close the Gap Between Agents and GTM Execution | 2025/2026 (undated in-page) | 2026-07-18 | Series A lead (8VC), participants (Craft, Jack Altman), $20m cumulative funding, founder name (Nico Ferreyra), product description, customer names (Perplexity, Owner, Cortex) |
| https://www.contentgrip.com/default-agentic-gtm-platform/ | Default's $20M funding and the rise of agentic GTM orchestration | 2025/2026 | 2026-07-18 | Corroborates $20m cumulative funding and agentic GTM platform positioning |
| https://www.demandgenreport.com/industry-news/default-launches-ai-powered-inbound-sales-funnel-reveals-6-6m-seed-funding/8099/ | Default Launches AI-Powered Inbound Sales Funnel; Reveals $6.6M Seed Funding | 2023-11 | 2026-07-18 | Prior seed round amount ($6.6m), original product framing |
| https://stockanalysis.com/stocks/hubs/statistics/ | HubSpot (HUBS) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.04x — reused from reference file |
| https://stockanalysis.com/stocks/gtm/statistics/ | ZoomInfo (GTM) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.85x — reused from reference file |
| https://stockanalysis.com/stocks/asan/statistics/ | Asana (ASAN) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.97x — fetched fresh |
| https://stockanalysis.com/stocks/docu/statistics/ | DocuSign (DOCU) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 2.87x — fetched fresh |

**graphMetrics evidence:** ai_adoption 0.7 (Dot agent is core to the product, not a bolt-on); legacy_disruptiveness 0.45 (consolidates point tools rather than replacing an entrenched suite); technical_feasibility 0.7 (real-time data-layer plus agent orchestration is achievable with current tooling); competition_intensity 0.75 (Chili Piper, Clay, Common Room, Warmly, HubSpot all overlap); proprietary_data_moat 0.35 (unified GTM data layer is a moderate, still-developing asset).

---

## 3. Thena

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.thena.ai/ | Thena — AI customer support for B2B teams | Undated (current site) | 2026-07-18 | Product description, pricing tiers ($79/user/mo Starter/Standard, $119+/user/mo Enterprise), customer testimonial (Clarify) |
| https://www.thena.ai/solutions/customer-support | Omni-channel support for B2B teams — Slack, Email, & Chat | Undated (current site) | 2026-07-18 | Customer names referenced (Vercel, Amplitude, FOX, Etsy, LaunchDarkly) |
| https://www.thena.ai/slack | Slack ticketing, helpdesk & customer support | Undated (current site) | 2026-07-18 | Slack-native ticketing capability |
| https://getlatka.com/companies/thena | Thena Revenue 2024: $20M Est. ARR, $60M Valuation | 2024 (as dated by source) | 2026-07-18 | Third-party (unverified) ARR and valuation estimate — explicitly flagged as not company-disclosed and not used as the entry valuation in the return model |
| https://stockanalysis.com/stocks/frsh/statistics/ | Freshworks (FRSH) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 2.61x — fetched fresh |
| https://stockanalysis.com/stocks/hubs/statistics/ | HubSpot (HUBS) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.04x — reused from reference file |
| https://stockanalysis.com/stocks/asan/statistics/ | Asana (ASAN) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.97x — fetched fresh |
| https://stockanalysis.com/stocks/gtm/statistics/ | ZoomInfo (GTM) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.85x — reused from reference file |

Funding history (pre-seed $2.2m co-led by Pear VC/Tenacity, seed $5m co-led by Lightspeed India/Sequoia, $600k Dec 2023 tranche; $7.8m total) is drawn from aggregator profiles (Crunchbase, Tracxn) cross-referenced against a LinkedIn funding-announcement post; no single company press release enumerating all three rounds was found. Founder names (Mike Molinet, Govind Kavaturi, Unmukt Raizada, Satyavrat Bondre) are drawn from third-party company-profile sourcing, not a company "about" page directly fetched.

**graphMetrics evidence:** ai_adoption 0.55 (AI routing and an AI chat agent are present but the core wedge is channel-native delivery, not AI); legacy_disruptiveness 0.4 (competes with well-entrenched Zendesk/Freshdesk/Intercom); technical_feasibility 0.7 (Slack/Teams integration and AI routing are proven patterns); competition_intensity 0.75 (crowded helpdesk category with large incumbents).

---

## 4. Dock

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.dock.us/ | Dock — AI Revenue Enablement that Sellers & Buyers Love | Undated (current site) | 2026-07-18 | Product description, customer logos, case-study metrics (25% win-rate lift, 22% more deals closed) |
| https://www.dock.us/about-us | About Dock — Our History & Investors | Undated (current site) | 2026-07-18 | Founder names (Alex Kracov, Luc, Victor) and Lattice background, investor list |
| https://www.dock.us/library/seed-round | Dock raises $3m to streamline the B2B buyer and customer experience | 2022-05-02 | 2026-07-18 | Seed round amount, lead investor (Altman Capital), founder background detail |
| https://www.dock.us/library/craft-ventures-fundraising-announcement | Dock raises $3.5m from Craft Ventures | 2023-06 | 2026-07-18 | Second seed tranche amount and lead investor, cumulative $6.5m total |
| https://medium.com/craft-ventures/why-we-invested-in-dock-f8d2b193cd21 | Why We Invested in Dock | 2023 | 2026-07-18 | Corroborates Craft Ventures investment rationale and product positioning |
| https://stockanalysis.com/stocks/docu/statistics/ | DocuSign (DOCU) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 2.87x — fetched fresh |
| https://stockanalysis.com/stocks/hubs/statistics/ | HubSpot (HUBS) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.04x — reused from reference file |
| https://stockanalysis.com/stocks/asan/statistics/ | Asana (ASAN) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.97x — fetched fresh |
| https://stockanalysis.com/stocks/gtm/statistics/ | ZoomInfo (GTM) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.85x — reused from reference file |

**graphMetrics evidence:** ai_adoption 0.45 (Dock AI is a newer addition to an originally non-AI workspace product); legacy_disruptiveness 0.35 (competes against decks/email, a low-tech baseline, more than a single dominant incumbent); technical_feasibility 0.75 (workspace-plus-CRM-integration is a proven pattern); competition_intensity 0.65 (Highspot/Seismic dominate enterprise; several smaller point competitors exist).

---

## 5. Kula

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.kula.ai/ | Kula — The Only AI-Native ATS | Undated (2026 copyright notice on current site) | 2026-07-18 | Product description, customer logos (Dapper Labs, Varo, Vidyard, Cover Genius, Healthie, and 30+ others), confirms active/operating status |
| https://www.kula.ai/blog/seed-funding | Behind Kula's $12M Seed Funding | 2022-08-31 | 2026-07-18 | Seed round amount, lead investors (Sequoia Capital India, Square Peg Capital), founder name and background (Achuthanand Tanjore Ravi, ex-Stripe/Uber/Freshworks) |
| https://techcrunch.com/2022/08/30/kula-makes-the-job-recruitment-process-less-exhausting/ | Kula makes the job recruitment process less exhausting | 2022-08-30 | 2026-07-18 | Independent corroboration of seed round and product positioning |
| https://www.forbes.com/sites/davidprosser/2024/09/19/why-kula-believes-ai-can-change-the-face-of-recruitment-forever/ | Why Kula Believes AI Can Change The Face Of Recruitment Forever | 2024-09-19 | 2026-07-18 | 70% year-over-year revenue growth claim, company headcount growth |
| https://www.prnewswire.com/news-releases/kula-the-recruitment-automation-platform-raises-2-7m-in-pre-seed-to-make-recruiting-effortless-301463917.html | Kula raises $2.7M in pre-seed | 2022-01 | 2026-07-18 | Pre-seed round amount and investors |
| https://stockanalysis.com/stocks/wday/statistics/ | Workday (WDAY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.57x — reused from reference file |
| https://stockanalysis.com/stocks/pcty/statistics/ | Paylocity (PCTY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.81x — fetched fresh |
| https://stockanalysis.com/stocks/day/statistics/ | Dayforce (DAY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 6.22x — fetched fresh |
| https://stockanalysis.com/stocks/zip/statistics/ | ZipRecruiter (ZIP) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.09x — fetched fresh |

No disclosed institutional financing event was found after the August 2022 seed round despite a dedicated search; this funding-disclosure gap is treated as a material, explicitly flagged risk rather than a basis for exclusion, since the company's live site and customer roster confirm ongoing operations.

**graphMetrics evidence:** ai_adoption 0.65 (AI resume screening and AI interview notetaker are core, disclosed features); legacy_disruptiveness 0.45 (targets legacy ATS-plus-point-tool stacks); technical_feasibility 0.7 (proven ATS-plus-AI-screening pattern); competition_intensity 0.7 (Greenhouse, Lever, Ashby, SmartRecruiters all compete directly).

---

## 6. Metaview

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.metaview.ai/ | Metaview: AI recruiting platform | Undated (current site) | 2026-07-18 | Product description (notetaker, reports, job posts, candidate search) |
| https://www.metaview.ai/resources/blog/fresh-capital-announcement | Fresh capital to build AI that radically enhances hiring | 2024-03 | 2026-07-18 | Series A amount ($7m), lead investor (Plural) |
| https://www.metaview.ai/resources/blog/series-b | New capital. Same mission: better hiring, powered by AI | 2025-06-25 | 2026-07-18 | Series B amount ($35m), lead investor (GV), founder names and backgrounds (Siadhal Magos, Shahriar Tajbakhsh, ex-Uber/Palantir), customer count (3,000+), interviews captured (3M+), customer names (Deel, Brex, Deliveroo, Quora) |
| https://www.gv.com/news/metaview-ai-hiring | The Power of Vertical AI in Hiring | 2025 | 2026-07-18 | GV investment rationale, category framing |
| https://siliconangle.com/2025/06/25/ai-hiring-startup-metaview-raises-35m-automate-recruiters-admin-work/ | AI hiring startup Metaview raises $35M to automate recruiters' admin work | 2025-06-25 | 2026-07-18 | Independent corroboration of Series B amount and lead investor |
| https://stockanalysis.com/stocks/wday/statistics/ | Workday (WDAY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.57x — reused from reference file |
| https://stockanalysis.com/stocks/pcty/statistics/ | Paylocity (PCTY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.81x — fetched fresh |
| https://stockanalysis.com/stocks/day/statistics/ | Dayforce (DAY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 6.22x — fetched fresh |
| https://stockanalysis.com/stocks/zip/statistics/ | ZipRecruiter (ZIP) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 1.09x — fetched fresh |

**Stage exception:** roster flagged Series A; company closed a $35m Series B in June 2025. Retained per batch mandate with exception explained in the memo; return model uses an HCP-assumed $150m post-money since the Series B valuation was not disclosed in any source found.

**graphMetrics evidence:** ai_adoption 0.75 (AI transcript analysis is the entire product); legacy_disruptiveness 0.5 (targets unstructured note-taking, not a single incumbent); technical_feasibility 0.75 (LLM-based transcript structuring is proven); competition_intensity 0.6 (narrower category than general helpdesk/ATS, fewer direct pure-play competitors); proprietary_data_moat 0.6 (3M+ captured interviews is a genuine, evidenced structured dataset).

---

## 7. Campfire

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://meetcampfire.com/ | Campfire — AI-native ERP | Undated (current site) | 2026-07-18 | Product positioning |
| https://www.prnewswire.com/news-releases/campfire-raises-35-million-series-a-led-by-accel-to-build-the-next-generation-ai-driven-erp-302494153.html | Campfire Raises $35 Million Series A Led by Accel | 2025-06-30 | 2026-07-18 | Series A amount and lead investor, founder name (John Glasgow), company founding year (2023) |
| https://techcrunch.com/2025/06/30/tiny-ai-erp-startup-campfire-is-winning-so-many-startups-from-netsuite-accel-led-a-35m-series-a/ | Tiny AI ERP startup Campfire is winning so many startups from NetSuite | 2025-06-30 | 2026-07-18 | Customer count at seed stage (~100), 15-day-to-3-day close example, founder framing |
| https://www.prnewswire.com/news-releases/campfire-raises-65-million-series-b-to-redefine-how-finance-works-in-the-ai-era-302585077.html | Campfire Raises $65 Million Series B | 2025-10 | 2026-07-18 | Series B amount, co-leads (Accel, Ribbit Capital), disclosed $375m post-money valuation, "10x'd revenue YTD" claim, customer names (Decagon, Replit, PostHog, Heidi Health, CloudZero) |
| https://news.crunchbase.com/venture/ai-fintech-campfire-raise-seriesa-accel-ribbit/ | Why Accel Led A Round For Fintech Startup Campfire For The Second Time In Under 4 Months | 2025-10 | 2026-07-18 | Independent corroboration of back-to-back financing timeline and $375m valuation |
| https://stockanalysis.com/stocks/orcl/statistics/ | Oracle (ORCL) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 7.42x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/sap/statistics/ | SAP statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 4.24x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/wday/statistics/ | Workday (WDAY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.57x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/manh/statistics/ | Manhattan Associates (MANH) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 8.62x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/shop/statistics/ | Shopify (SHOP) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 12.49x — reused directly from reference file's Tailor memo |

**Stage exception:** roster flagged Series A; company raised a $35m Series A (June 2025) and, twelve weeks later, a $65m Series B (October 2025) at a disclosed $375m post-money. Retained per batch mandate with exception explained; return model uses the disclosed $375m post-money directly.

**graphMetrics evidence:** ai_adoption 0.75 (AI-native close automation is the core product); legacy_disruptiveness 0.65 (directly, evidenced displacement of NetSuite with a specific 15-day-to-3-day close example); technical_feasibility 0.7 (LLM-assisted reconciliation and close workflows are achievable); competition_intensity 0.55 (fewer AI-native direct competitors than in martech/support categories; Rillet is the closest analog).

---

## 8. Doss

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.doss.com/ | Doss — Adaptive Resource Platform | Undated (current site) | 2026-07-18 | Product positioning |
| https://www.doss.com/news/announcing-our-18m-series-a | Doss Raises $18M Series A | 2025-04-15 | 2026-07-18 | Series A amount, lead investor (Theory Ventures), founder names (Wiley Jones, Arnav), founding story |
| https://www.businesswire.com/news/home/20250410507128/en/Doss-Raises-$18-Million-Series-A-from-Theory-Ventures-for-Next-generation-ERP-Alternative | Doss Raises $18 Million Series A from Theory Ventures | 2025-04-10 | 2026-07-18 | Independent corroboration of Series A details, implied ~$75m post-Series-A valuation |
| https://www.doss.com/news/doss-raises-55m-series-b | Doss $55M Series B | 2026-03-24 | 2026-07-18 | Series B amount, co-leads (Madrona, Premji Invest), disclosed $250m post-money, cumulative $73m total |
| https://techcrunch.com/2026/03/24/doss-raises-55m-for-ai-inventory-management-that-plugs-into-erp/ | Doss raises $55M for AI inventory management that plugs into ERP | 2026-03-24 | 2026-07-18 | Independent corroboration of Series B amount and valuation |
| https://www.madrona.com/investing-in-doss-a-new-form-of-ai-native-enterprise-application/ | Investing in Doss: A New Form of AI-Native Enterprise Application | 2026-03 | 2026-07-18 | ICP detail (mid-market physical-goods companies, $20m-$250m revenue), headcount (~123 employees) |
| https://stockanalysis.com/stocks/orcl/statistics/ | Oracle (ORCL) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 7.42x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/sap/statistics/ | SAP statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 4.24x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/wday/statistics/ | Workday (WDAY) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.57x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/manh/statistics/ | Manhattan Associates (MANH) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 8.62x — reused directly from reference file's Tailor memo |
| https://stockanalysis.com/stocks/shop/statistics/ | Shopify (SHOP) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 12.49x — reused directly from reference file's Tailor memo |

**Stage exception:** roster flagged Seed/Series A; company raised an $18m Series A (April 2025) and a $55m Series B (March 2026) at a disclosed $250m post-money. Retained per batch mandate with exception explained; return model uses the disclosed $250m post-money directly.

**graphMetrics evidence:** ai_adoption 0.7 (composable, agent-reconfigurable architecture is the core technical claim); legacy_disruptiveness 0.6 (directly targets NetSuite implementation failure rates for a specific niche); technical_feasibility 0.65 (agent-reconfigurable ERP architecture is more ambitious/less proven than simpler AI-native workflows, hence a lower score than Campfire); competition_intensity 0.5 (narrower mid-market physical-goods niche has fewer direct AI-native competitors than horizontal ERP).

---

## 9. Sequence

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://www.sequencehq.com/ | Sequence — Quoting, Billing & Accounts Receivable Solution | Undated (current site) | 2026-07-18 | Product positioning |
| https://www.sequencehq.com/blog/sequence-announces-series-a | Sequence Secures $20M Series A to Scale Revenue Automation | 2025-12-16 | 2026-07-18 | Series A amount and date, lead investor (645 Ventures), participants (a16z, Firstminute Capital), founder names (Riya Grover, Eamon, Enda), cumulative $38m total, 10x ARR growth claim, customer names (Cognition, Legora, Bridge, 11x, incident.io, Runway, Moonpay), CFO-investor detail (Decagon, Klaviyo, Wise) |
| https://www.sequencehq.com/blog/introducing-sequence-20 | Introducing Sequence 2.0: AI-Native Revenue Automation | 2025/2026 | 2026-07-18 | Product breadth (CPQ, billing, revenue recognition) |
| https://www.sequencehq.com/products/billing | Sequence Billing — Usage-based Billing for B2B SaaS | Undated (current site) | 2026-07-18 | Usage-based billing capability |
| https://stockanalysis.com/stocks/zuo/statistics/ | Zuora (ZUO) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.07x — fetched fresh |
| https://stockanalysis.com/stocks/bill/statistics/ | BILL Holdings statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 2.60x — fetched fresh |
| https://stockanalysis.com/stocks/docu/statistics/ | DocuSign (DOCU) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 2.87x — fetched fresh |
| https://stockanalysis.com/stocks/hubs/statistics/ | HubSpot (HUBS) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.04x — reused from reference file |

**graphMetrics evidence:** ai_adoption 0.6 (AI-native billing engine is a 2025/2026-era rebuild, not the original 2022-era product); legacy_disruptiveness 0.4 (targets spreadsheets and fragmented tools, not one dominant incumbent); technical_feasibility 0.75 (usage-metering and automated rev-rec are proven patterns); competition_intensity 0.7 (Zuora, Chargebee, Maxio, Stripe Billing all compete directly).

---

## 10. Gradient Labs

| URL | Source title | Publication date | Access date | Claims supported |
|---|---|---|---|---|
| https://gradient-labs.ai/ | Gradient Labs — AI for Customer Operations in Finance | Undated (current site) | 2026-07-18 | Product description, customer names (Zego, SteadyPay, Pockit, Plum, Morse, Wise), metrics (80-90% peak resolution, 98% CSAT, 32M end users), regulatory/compliance claims (SOC 2 Type II, GDPR, FCA Consumer Duty, CONC, Reg E/Z, PSD2, EU AI Act) |
| https://gradient-labs.ai/blog/series-a-announcement | $13M Series A to scale customer operations | 2025-07 | 2026-07-18 | Original Series A amount, lead investor (Redpoint Ventures) |
| https://gradient-labs.ai/blog/weve-raised-26m-to-bring-autonomous-customer-operations-to-financial-services | We've raised $26M to build specialist AI agents for finance | 2026-06-01 (per Sifted); published 2026-07-17 | 2026-07-18 | Series A extension to $26m total, new investors (Octopus Ventures, CommerzVentures), founder names and backgrounds (Dimitri Masin, Neal Lathia, Danai Antoniou, ex-Monzo), 900% revenue growth claim, U.S. customer expansion (Current, Stash, Rho) |
| https://sifted.eu/articles/gradient-labs-doubles-series-a | AI-powered finance startup Gradient Labs doubles Series A to $26m | 2026-06 | 2026-07-18 | Independent corroboration of Series A extension amount and investors |
| https://techfundingnews.com/ex-monzo-teams-gradient-labs-doubles-series-a-to-26m-as-ai-agents-take-over-financial-operations/ | Ex-Monzo team's Gradient Labs doubles Series A to $26M | 2026-06 | 2026-07-18 | Independent corroboration of founder Monzo background and funding amount |
| https://stockanalysis.com/stocks/ncno/statistics/ | nCino (NCNO) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 3.57x — fetched fresh |
| https://stockanalysis.com/stocks/qtwo/statistics/ | Q2 Holdings (QTWO) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 4.14x — fetched fresh |
| https://stockanalysis.com/stocks/frsh/statistics/ | Freshworks (FRSH) statistics | Live snapshot | 2026-07-18 | EV/LTM revenue 2.61x — fetched fresh |

**graphMetrics evidence:** ai_adoption 0.8 (specialist AI agents are the entire product, deployed across email/text/voice); legacy_disruptiveness 0.55 (automates manual, compliance-heavy operations teams rather than replacing a single software incumbent); technical_feasibility 0.65 (reliable AI agent behavior under regulatory constraint is harder than general-purpose support automation, hence a moderate rather than high score); regulatory_moat 0.75 (evidenced, specific compliance claims — FCA Consumer Duty, CONC, Reg E/Z, PSD2, EU AI Act, SOC 2 Type II — built by ex-Monzo compliance operators); proprietary_data_moat 0.4 (32M end-user interactions is a meaningful but not fully verified proprietary dataset); competition_intensity 0.5 (narrower regulated-fintech niche has fewer direct competitors than horizontal AI-support vendors).

---

## General notes on research discipline

1. WebSearch budget was exhausted partway through this batch's research (after gathering funding, founder, and product data for all ten companies via search, plus several follow-up queries). All remaining research — founder-name verification, product-detail confirmation, and Kula's live-status check — was completed via direct WebFetch of official company pages and press releases rather than additional search queries.
2. Several founders across this batch are identified in public sources by first name only, with full surnames undisclosed: Tofu (Elaine, Honglei), Dock (Luc, Victor), Doss (Arnav), Sequence (Eamon, Enda). This is noted in each memo's founder table and should be resolved directly with each company in diligence.
3. Three companies (Metaview, Campfire, Doss) progressed from the roster's assumed Series A stage to Series B by the time of this research (July 2026). Each is retained per the batch mandate allowing Series B companies with an explained exception, and each memo prices its return model off the most current disclosed or assumed post-money valuation.
4. Two companies (Dock, Kula) show no disclosed institutional financing event for roughly three and four years, respectively, as of July 2026. Both companies' websites and product roadmaps show clear evidence of ongoing operations; the funding-disclosure gap itself, not product viability, is flagged as the key open risk in each memo.
5. Thena's only third-party financial estimate (Latka: $20m ARR, $60m valuation) is explicitly flagged as unverified and is not used as the entry valuation in the return model.

---

# Deduplicated shared-source index

Total URL citations across ledgers: 573. Unique URLs: 521. Sources cited by more than one company:

| URL | Citations |
|---|---:|
| https://stockanalysis.com/stocks/vrsk/statistics/ | 5 |
| https://stockanalysis.com/stocks/hubs/statistics/ | 5 |
| https://stockanalysis.com/stocks/itri/statistics/ | 4 |
| https://stockanalysis.com/stocks/asan/statistics/ | 4 |
| https://stockanalysis.com/stocks/gtm/statistics/ | 4 |
| https://stockanalysis.com/stocks/wday/statistics/ | 4 |
| https://stockanalysis.com/stocks/dsgx/statistics/ | 3 |
| https://stockanalysis.com/stocks/chrw/statistics/ | 3 |
| https://stockanalysis.com/stocks/csgp/statistics/ | 3 |
| https://stockanalysis.com/stocks/docu/statistics/ | 3 |
| https://stockanalysis.com/stocks/mdb/statistics/ | 2 |
| https://stockanalysis.com/stocks/snow/statistics/ | 2 |
| https://stockanalysis.com/stocks/net/statistics/ | 2 |
| https://stockanalysis.com/stocks/ddog/statistics/ | 2 |
| https://stockanalysis.com/stocks/gtlb/statistics/ | 2 |
| https://stockanalysis.com/stocks/estc/statistics/ | 2 |
| https://stockanalysis.com/stocks/fsly/statistics/ | 2 |
| https://stockanalysis.com/stocks/path/statistics/ | 2 |
| https://stockanalysis.com/stocks/cflt/statistics/ | 2 |
| https://www.numeric.io/ | 2 |
| https://stockanalysis.com/stocks/bill/statistics/ | 2 |
| https://stockanalysis.com/stocks/ncno/statistics/ | 2 |
| https://stockanalysis.com/stocks/lstr/statistics/ | 2 |
| https://stockanalysis.com/stocks/bsy/statistics/ | 2 |
| https://stockanalysis.com/stocks/rxo/statistics/ | 2 |
| https://stockanalysis.com/stocks/uls/statistics/ | 2 |
| https://stockanalysis.com/stocks/frsh/statistics/ | 2 |
| https://stockanalysis.com/stocks/pcty/statistics/ | 2 |
| https://stockanalysis.com/stocks/day/statistics/ | 2 |
| https://stockanalysis.com/stocks/zip/statistics/ | 2 |
| https://stockanalysis.com/stocks/orcl/statistics/ | 2 |
| https://stockanalysis.com/stocks/sap/statistics/ | 2 |
| https://stockanalysis.com/stocks/manh/statistics/ | 2 |
| https://stockanalysis.com/stocks/shop/statistics/ | 2 |
