# HCP Sources — Batch 01: AI Infrastructure and Developer Tools

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
