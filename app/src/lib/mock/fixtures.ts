import type {
  Company,
  CriteriaWeights,
  ExecutionItem,
  Founder,
  FundGraph,
  FundProfile,
  GraphEdge,
  GraphNode,
} from '../types'

/* ------------------------------------------------------------------ */
/* Demo fund: Meridian — seed-stage B2B software/AI                   */
/* ------------------------------------------------------------------ */

export const fundProfile: FundProfile = {
  name: 'Meridian',
  thesis:
    'Technical founders building system-of-record software and AI-native workflow tools for unglamorous B2B markets. We believe the next decade of enterprise value comes from vertical depth, not horizontal platforms.',
  checkSize: '$1M – $3M initial, $5M reserve per winner',
  stages: ['Pre-seed', 'Seed', 'Series A'],
  sectors: ['B2B SaaS', 'Fintech infra', 'Healthcare data', 'Dev infra', 'Logistics', 'Security'],
  geographies: ['North America', 'Western Europe'],
  partners: [
    { name: 'Dana Whitfield', focus: 'Dev infra, data tooling', leans: 'Momentum and product velocity; will pay up for breakout usage.' },
    { name: 'Marcus Oyelaran', focus: 'Fintech, compliance', leans: 'Valuation discipline; allergic to thin-margin marketplaces.' },
    { name: 'Priya Ramachandran', focus: 'Healthcare, regulated markets', leans: 'Founder quality over market; wants domain insiders.' },
  ],
}

export const criteriaWeights: CriteriaWeights = {
  'Technical founder credibility': 0.8,
  'Founder-market fit': 0.75,
  'Product velocity': 0.7,
  'Capital efficiency': 0.65,
  'Repeat founder': 0.6,
  'Market timing': 0.55,
  'Competitive moat': 0.5,
  'Regulated-market experience': 0.4,
}

/* ------------------------------------------------------------------ */
/* Founders                                                            */
/* ------------------------------------------------------------------ */

export const founders: Founder[] = [
  {
    id: 'f-mara',
    name: 'Mara Voss',
    companyId: 's-aureline',
    role: 'CEO, Aureline',
    background: 'Ex-Stripe revenue platform PM; built Corepay-adjacent billing tooling. Second-time founder (first exited small).',
    score: 88,
    justification:
      'Scores high on founder-market fit and technical credibility: shipped revenue infra at Stripe, and her first company sold into the same buyer. Pattern-matches Corepay and Quillon founders at seed.',
    signals: ['Shipped v1 in 11 weeks', '4 design partners incl. two Meridian portfolio cos', 'Repeat founder'],
  },
  {
    id: 'f-jun',
    name: 'Jun Park',
    companyId: 's-aureline',
    role: 'CTO, Aureline',
    background: 'Staff engineer at Databricks, ML systems. First-time founder.',
    score: 82,
    justification:
      'Strong technical signal (Databricks ML infra), unproven as founder. The fund historically discounts first-time CTOs less when paired with a repeat CEO.',
    signals: ['Databricks ML infra', 'Published eval tooling OSS, 3.1k stars'],
  },
  {
    id: 'f-tomas',
    name: 'Tomás Iglesias',
    companyId: 's-ledgerline',
    role: 'CEO, Ledgerline',
    background: 'Former controller at two growth-stage startups, taught himself to code, built the first close-automation prototype solo.',
    score: 76,
    justification:
      'Unusual profile: domain insider who became technical rather than the reverse. The fund has no precedent for this shape; nearest analogue is the Nimbuslane pass (founder concerns) — worth revisiting whether that precedent should apply.',
    signals: ['Domain insider', 'Solo-built prototype', '12 paying pilots'],
  },
  {
    id: 'f-adaeze',
    name: 'Adaeze Okafor',
    companyId: 's-solstice',
    role: 'CEO, Solstice Health',
    background: 'Led revenue-cycle ops at a 40-clinic group; MBA; hired a strong technical co-founder from Vantage Health.',
    score: 79,
    justification:
      'High founder-market fit in a regulated market. The Brighttide pass (regulatory fear, company now thriving) argues the fund under-weights operators like her; this score deliberately corrects upward.',
    signals: ['Ran RCM at 40 clinics', 'Co-founder poached from portfolio co Vantage Health'],
  },
  {
    id: 'f-silas',
    name: 'Silas Grey',
    companyId: 's-perch',
    role: 'CEO, Perch Security',
    background: 'Former SOC lead at CrowdStrike, first-time founder, strong open-source following.',
    score: 71,
    justification:
      'Technical credibility is high but the SMB security market resembles Opsloop (rejected: crowded, tool fatigue). Score capped by market precedent, not the founder.',
    signals: ['CrowdStrike SOC lead', 'OSS detection rules repo widely used'],
  },
  {
    id: 'f-noor',
    name: 'Noor Haddad',
    companyId: 's-graphlet',
    role: 'CEO, Graphlet',
    background: 'PhD in knowledge representation, ex-Palantir deployment lead.',
    score: 74,
    justification:
      'Deep technical moat matches the fund’s Meshgrid bet — which is struggling. The justification hinges on whether Graphlet’s buyer (enterprise data teams) pulls harder than Meshgrid’s did.',
    signals: ['KR PhD', 'Palantir deployments', '2 Fortune-500 pilots'],
  },
  {
    id: 'f-elin',
    name: 'Elin Sørensen',
    companyId: 's-tessellate',
    role: 'CEO, Tessellate',
    background: 'Compliance lead at Adyen, then early PM at a RegTech unicorn.',
    score: 81,
    justification:
      'Regulated-market experience plus fintech infra pedigree — the exact profile Marcus has historically championed (Corepay, Arcadia Metrics).',
    signals: ['Adyen compliance', 'RegTech unicorn early PM', 'EU + US regulatory coverage'],
  },
]

/* ------------------------------------------------------------------ */
/* Companies                                                           */
/* ------------------------------------------------------------------ */

const base = {
  founderIds: [] as string[],
  analogues: [] as Company['analogues'],
  risks: [] as string[],
  diligenceQuestions: [] as string[],
  reasonsToInvest: [] as string[],
  reasonsToPass: [] as string[],
  competitors: [] as Company['competitors'],
}

export const companies: Company[] = [
  /* ---- Portfolio (8) ---- */
  {
    ...base,
    id: 'p-corepay',
    name: 'Corepay',
    type: 'portfolio',
    oneLiner: 'Usage-based billing infrastructure for B2B SaaS.',
    sector: 'Fintech infra',
    stage: 'Series C',
    location: 'New York',
    fitScore: 96,
    summary: 'Meridian seed 2019. Marked up 12x. The fund’s canonical win: technical repeat founder, boring-critical infra, capital efficient to Series A.',
    outcome: 'Winner — 12x markup',
  },
  {
    ...base,
    id: 'p-signalist',
    name: 'Signalist',
    type: 'portfolio',
    oneLiner: 'Sales intelligence from product usage signals.',
    sector: 'B2B SaaS',
    stage: 'Acquired',
    location: 'San Francisco',
    fitScore: 88,
    summary: 'Seed 2020, acquired by HubSpot 2024 for 6x. Fast product velocity, mediocre moat — exited before the category commoditized.',
    outcome: 'Acquired — 6x',
  },
  {
    ...base,
    id: 'p-vantage',
    name: 'Vantage Health',
    type: 'portfolio',
    oneLiner: 'Clinical data platform for multi-site provider groups.',
    sector: 'Healthcare data',
    stage: 'Series B',
    location: 'Boston',
    fitScore: 91,
    summary: 'Seed 2021. Slow start through compliance, now compounding. Proof the fund can win in regulated markets when the founder is a domain insider.',
    outcome: 'Compounding — 5x',
  },
  {
    ...base,
    id: 'p-driftline',
    name: 'Driftline',
    type: 'portfolio',
    oneLiner: 'Freight visibility and exception management.',
    sector: 'Logistics',
    stage: 'Series A',
    location: 'Chicago',
    fitScore: 78,
    summary: 'Seed 2021. Steady but unspectacular; logistics sales cycles longer than modeled.',
    outcome: 'Steady — 2x',
  },
  {
    ...base,
    id: 'p-quillon',
    name: 'Quillon',
    type: 'portfolio',
    oneLiner: 'AI contract analysis for mid-market legal teams.',
    sector: 'B2B SaaS',
    stage: 'Series B',
    location: 'Toronto',
    fitScore: 93,
    summary: 'Seed 2022. Breakout: AI-native workflow tool with a wedge into system-of-record. The template for current AI-workflow sourcing.',
    outcome: 'Breakout — 9x',
  },
  {
    ...base,
    id: 'p-meshgrid',
    name: 'Meshgrid',
    type: 'portfolio',
    oneLiner: 'Service mesh observability for platform teams.',
    sector: 'Dev infra',
    stage: 'Series A',
    location: 'Seattle',
    fitScore: 70,
    summary: 'Seed 2022. Deep tech, thin pull. Buyer fatigue in dev tooling; bridge round likely. Cautionary precedent for moat-first theses.',
    outcome: 'Struggling',
  },
  {
    ...base,
    id: 'p-arcadia',
    name: 'Arcadia Metrics',
    type: 'portfolio',
    oneLiner: 'Real-time risk analytics for embedded lending.',
    sector: 'Fintech infra',
    stage: 'Series A',
    location: 'London',
    fitScore: 80,
    summary: 'Seed 2023. Flat-to-up; strong logo retention, slow expansion. Marcus’s deal.',
    outcome: 'Flat — 1.5x',
  },
  {
    ...base,
    id: 'p-loamly',
    name: 'Loamly',
    type: 'portfolio',
    oneLiner: 'Marketplace for regenerative-ag inputs.',
    sector: 'Logistics',
    stage: 'Wound down',
    location: 'Denver',
    fitScore: 45,
    summary: 'Seed 2020, written off 2023. Off-thesis marketplace bet; thin margins, no repeat buyer. The pass-rule Marcus cites in every IC.',
    outcome: 'Written off',
  },

  /* ---- Rejected (6) ---- */
  {
    ...base,
    id: 'r-fernbase',
    name: 'Fernbase',
    type: 'rejected',
    oneLiner: 'Postgres-native vector search cloud.',
    sector: 'Dev infra',
    stage: 'Passed at Seed (2022)',
    location: 'Berlin',
    fitScore: 74,
    summary: 'Passed on valuation ($28M cap pre-revenue). Raised a $40M A eight months later. The fund’s most-cited miss; Dana argues the momentum signal was the tell.',
    outcome: 'Miss — now Series B',
  },
  {
    ...base,
    id: 'r-cartouche',
    name: 'Cartouche',
    type: 'rejected',
    oneLiner: 'Social commerce for collectors.',
    sector: 'B2B SaaS',
    stage: 'Passed at Seed (2021)',
    location: 'Los Angeles',
    fitScore: 22,
    summary: 'Off-thesis consumer social. Shut down 2023. Clean pass — validates the thesis filter.',
    outcome: 'Correct pass — shut down',
  },
  {
    ...base,
    id: 'r-opsloop',
    name: 'Opsloop',
    type: 'rejected',
    oneLiner: 'Incident response automation for SMB IT.',
    sector: 'Security',
    stage: 'Passed at Seed (2022)',
    location: 'Austin',
    fitScore: 55,
    summary: 'Passed on crowded market and tool fatigue. Died 2024. The precedent currently capping SMB-security scores.',
    outcome: 'Correct pass — shut down',
  },
  {
    ...base,
    id: 'r-brighttide',
    name: 'Brighttide',
    type: 'rejected',
    oneLiner: 'AI prior-auth automation for payers.',
    sector: 'Healthcare data',
    stage: 'Passed at Seed (2022)',
    location: 'Nashville',
    fitScore: 68,
    summary: 'Passed on regulatory risk. Now at $14M ARR. The regret driving Priya’s push to re-weight regulated-market operators.',
    outcome: 'Miss — thriving',
  },
  {
    ...base,
    id: 'r-pallet',
    name: 'Pallet',
    type: 'rejected',
    oneLiner: 'Spot-freight marketplace for LTL shippers.',
    sector: 'Logistics',
    stage: 'Passed at Seed (2021)',
    location: 'Atlanta',
    fitScore: 40,
    summary: 'Passed on thin marketplace margins (the Loamly rule). Zombie. Correct pass.',
    outcome: 'Correct pass — zombie',
  },
  {
    ...base,
    id: 'r-nimbuslane',
    name: 'Nimbuslane',
    type: 'rejected',
    oneLiner: 'Vertical SaaS for HVAC contractors.',
    sector: 'B2B SaaS',
    stage: 'Passed at Seed (2023)',
    location: 'Phoenix',
    fitScore: 62,
    summary: 'Market fit was there; passed on founder concerns (non-technical CEO, agency-built product). Acquihired 2025. Ambiguous precedent.',
    outcome: 'Ambiguous — acquihired',
  },

  /* ---- Sourced (10) ---- */
  {
    id: 's-aureline',
    name: 'Aureline',
    type: 'sourced',
    oneLiner: 'AI revenue-operations copilot that closes the quote-to-cash loop for B2B SaaS.',
    sector: 'B2B SaaS',
    stage: 'Seed',
    location: 'New York',
    raising: '$3.5M at $18M cap',
    fitScore: 91,
    dealStage: 'Meeting',
    summary:
      'Aureline sits between CRM and billing: it watches quotes, contracts, invoices, and usage, flags revenue leakage, and drafts the fixes. Four design partners including two Meridian portfolio companies. ARR $340k, 11 weeks from v1.',
    founderIds: ['f-mara', 'f-jun'],
    analogues: [
      { companyId: 'p-corepay', kind: 'portfolio', note: 'Same buyer (RevOps/finance), same wedge-into-infra motion Corepay ran in 2019. Corepay is also a design partner.' },
      { companyId: 'p-quillon', kind: 'portfolio', note: 'AI-native workflow tool with a system-of-record wedge — the Quillon template, two years later.' },
      { companyId: 'r-fernbase', kind: 'rejected', note: 'Valuation shape echoes Fernbase ($18M cap, early ARR). Fernbase taught the fund that momentum can justify the cap.' },
    ],
    whySurfaced: [
      'Two portfolio companies (Corepay, Signalist alumni network) independently adopted it as design partners',
      'Founder profile matches the Corepay/Quillon seed pattern: repeat technical CEO + infra CTO',
      'Check and stage fit: raising $3.5M seed, Meridian writes $1–3M',
      'Market timing: usage-based pricing adoption makes quote-to-cash leakage acute',
    ],
    risks: [
      'CRM incumbents (Salesforce RevenueCloud) could bundle a good-enough version',
      'ARR concentrated: 62% from two design partners',
      'Jun is a first-time founder CTO; retention risk if acquihire offers come',
    ],
    diligenceQuestions: [
      'What % of flagged leakage do customers actually act on?',
      'Pricing: seat-based today, but value scales with GMV — will they reprice?',
      'How much of the pipeline came from the Corepay relationship vs cold?',
      'Data access: does losing Salesforce API partnership status kill the product?',
    ],
    reasonsToInvest: [
      'Pattern-match to the fund’s two best outcomes (Corepay, Quillon)',
      'Unusually fast product velocity with real usage evidence',
      'Portfolio synergy: two existing companies are already customers',
    ],
    reasonsToPass: [
      'Cap is rich for $340k ARR if momentum stalls',
      'Category could consolidate into CPQ/billing incumbents',
    ],
    competitors: [
      { name: 'Salesforce Revenue Cloud', kind: 'incumbent', note: 'Bundled CPQ + billing; slow, but owns the CRM data.' },
      { name: 'Metronome', kind: 'adjacent', note: 'Usage-based billing infra; could move up-stack.' },
      { name: 'Cacheflow', kind: 'direct', note: 'Quote-to-cash automation, SMB-focused, no AI leakage detection.' },
      { name: 'Tabs', kind: 'emerging', note: 'AI revenue automation, 6 months older, NYC — closest direct rival.' },
      { name: 'Corepay', kind: 'adjacent', note: 'Portfolio co; partner today, potential acquirer later.' },
    ],
    model: {
      arr: 340_000,
      growthPct: 18,
      churnPct: 2,
      nrrPct: 128,
      grossMarginPct: 78,
      cac: 22_000,
      cacPaybackMonths: 14,
      burnMonthly: 140_000,
      runwayMonths: 19,
      valuation: 18_000_000,
      checkSize: 2_500_000,
      exitMultiple: 8,
      yearsToExit: 7,
    },
    memo: undefined,
    meetings: [
      { id: 'm1', date: '2026-07-21', title: 'Partner call — Mara Voss (scheduled)' },
    ],
  },
  {
    ...base,
    id: 's-tessellate',
    name: 'Tessellate',
    type: 'sourced',
    oneLiner: 'Compliance automation layer for fintech infrastructure companies.',
    sector: 'Fintech infra',
    stage: 'Seed',
    location: 'Amsterdam',
    raising: '$2.8M at $14M cap',
    fitScore: 84,
    dealStage: 'Outreach',
    summary: 'Turns regulatory change into code: monitors EU/US fintech regulation and generates policy diffs for compliance teams. Elin Sørensen (ex-Adyen) founding.',
    founderIds: ['f-elin'],
    analogues: [
      { companyId: 'p-corepay', kind: 'portfolio', note: 'Sells into the same fintech-infra buyer network.' },
      { companyId: 'p-arcadia', kind: 'portfolio', note: 'Marcus’s territory; Arcadia’s compliance team is a natural design partner.' },
    ],
    whySurfaced: ['Founder profile matches Marcus’s championed deals', 'EU regulatory wave creates timing', 'Check size fits'],
    risks: ['Compliance budgets are cyclical', 'Long enterprise sales for a seed team'],
    diligenceQuestions: ['Is the reg-monitoring corpus defensible?', 'Services-heavy onboarding?'],
    reasonsToInvest: ['Regulated-market insider founder', 'Portfolio synergy with Arcadia'],
    reasonsToPass: ['Category historically exits small'],
    competitors: [
      { name: 'ComplyAdvantage', kind: 'incumbent', note: 'AML-focused, adjacent.' },
      { name: 'Norm Ai', kind: 'direct', note: 'Reg-to-code, US-first, better funded.' },
    ],
  },
  {
    ...base,
    id: 's-ledgerline',
    name: 'Ledgerline',
    type: 'sourced',
    oneLiner: 'AI month-end close automation for startup CFO stacks.',
    sector: 'B2B SaaS',
    stage: 'Seed',
    location: 'Mexico City',
    raising: '$2M at $10M cap',
    fitScore: 77,
    dealStage: 'Diligence',
    summary: 'Controller-turned-engineer founder automating the close. 12 paying pilots, $9k MRR, priced against staff hours not software budgets.',
    founderIds: ['f-tomas'],
    analogues: [
      { companyId: 'r-nimbuslane', kind: 'rejected', note: 'Founder-shape concern echoes Nimbuslane — but inverted: Tomás became technical rather than outsourcing.' },
      { companyId: 'p-quillon', kind: 'portfolio', note: 'AI-workflow wedge into a system of record (the GL).' },
    ],
    whySurfaced: ['Wedge-into-system-of-record pattern', 'Capital-efficient: $9k MRR on $180k raised'],
    risks: ['Solo founder', 'LatAm seed → US Series A path unproven for the fund'],
    diligenceQuestions: ['Accuracy on messy books?', 'Who signs: CFO or controller?'],
    reasonsToInvest: ['Extreme capital efficiency', 'Domain-insider founder'],
    reasonsToPass: ['Solo-founder risk', 'Crowded AI-accounting field'],
    competitors: [
      { name: 'Numeric', kind: 'direct', note: 'Close automation, better funded.' },
      { name: 'Ramp', kind: 'incumbent', note: 'Could bundle close tooling.' },
    ],
  },
  {
    ...base,
    id: 's-solstice',
    name: 'Solstice Health',
    type: 'sourced',
    oneLiner: 'Revenue-cycle AI for independent clinic groups.',
    sector: 'Healthcare data',
    stage: 'Seed',
    location: 'Nashville',
    raising: '$3M at $15M cap',
    fitScore: 82,
    dealStage: 'Sourced',
    summary: 'Denial prediction and appeal drafting for 10–50 clinic groups. CEO ran RCM ops at a 40-clinic group; CTO hired from Vantage Health.',
    founderIds: ['f-adaeze'],
    analogues: [
      { companyId: 'p-vantage', kind: 'portfolio', note: 'Same buyer sophistication; CTO literally from Vantage.' },
      { companyId: 'r-brighttide', kind: 'rejected', note: 'The Brighttide regret: same regulatory shape the fund wrongly passed on.' },
    ],
    whySurfaced: ['Brighttide-regret pattern: regulated-market operator with insider CTO', 'Vantage Health network signal'],
    risks: ['Payer API access', 'Services creep in RCM'],
    diligenceQuestions: ['Appeal win-rate lift vs baseline?', 'Does Vantage see channel conflict?'],
    reasonsToInvest: ['Corrects a known fund blind spot', 'Insider founder pair'],
    reasonsToPass: ['RCM is consultant-saturated'],
    competitors: [
      { name: 'Availity', kind: 'incumbent', note: 'Clearinghouse giant.' },
      { name: 'Adonis', kind: 'direct', note: 'RCM intelligence, Series B.' },
    ],
  },
  {
    ...base,
    id: 's-graphlet',
    name: 'Graphlet',
    type: 'sourced',
    oneLiner: 'Knowledge-graph infrastructure for enterprise AI teams.',
    sector: 'Dev infra',
    stage: 'Seed',
    location: 'Palo Alto',
    raising: '$4M at $22M cap',
    fitScore: 66,
    dealStage: 'Sourced',
    summary: 'Entity resolution and graph context for RAG pipelines. Two Fortune-500 pilots. Deep tech, unclear pull.',
    founderIds: ['f-noor'],
    analogues: [
      { companyId: 'p-meshgrid', kind: 'portfolio', note: 'Moat-first infra with slow buyer pull — the Meshgrid warning.' },
      { companyId: 'r-fernbase', kind: 'rejected', note: 'Data-infra hype cycle; Fernbase says don’t auto-pass on price.' },
    ],
    whySurfaced: ['Technical founder depth', 'AI-infra adjacency to fund network'],
    risks: ['Meshgrid-pattern buyer fatigue', 'Above check-size sweet spot'],
    diligenceQuestions: ['Pilot-to-contract conversion?', 'Why not a feature of vector DBs?'],
    reasonsToInvest: ['Category-defining if RAG persists'],
    reasonsToPass: ['Fund already has a struggling moat-first infra bet'],
    competitors: [
      { name: 'Neo4j', kind: 'incumbent', note: 'Graph DB incumbent moving into AI context.' },
      { name: 'WhyHow', kind: 'emerging', note: 'KG-for-RAG startup.' },
    ],
  },
  {
    ...base,
    id: 's-perch',
    name: 'Perch Security',
    type: 'sourced',
    oneLiner: 'Autonomous SOC for 100–1000 employee companies.',
    sector: 'Security',
    stage: 'Seed',
    location: 'Remote (US)',
    raising: '$3M at $16M cap',
    fitScore: 63,
    dealStage: 'Sourced',
    summary: 'AI triage over existing alert streams; replaces MDR retainers. Founder ex-CrowdStrike with real OSS following.',
    founderIds: ['f-silas'],
    analogues: [{ companyId: 'r-opsloop', kind: 'rejected', note: 'SMB-security tool fatigue — the Opsloop precedent caps conviction.' }],
    whySurfaced: ['Founder technical credibility', 'OSS distribution signal'],
    risks: ['Opsloop-pattern market', 'MDR incumbents own the channel'],
    diligenceQuestions: ['False-positive rate vs human SOC?', 'Churn on the first 20 customers?'],
    reasonsToInvest: ['Credible founder, real wedge'],
    reasonsToPass: ['Fund precedent says this market kills seed tools'],
    competitors: [
      { name: 'Arctic Wolf', kind: 'incumbent', note: 'MDR giant.' },
      { name: 'Dropzone AI', kind: 'direct', note: 'AI SOC analyst, better funded.' },
    ],
  },
  {
    ...base,
    id: 's-kelpwatch',
    name: 'Kelpwatch',
    type: 'sourced',
    oneLiner: 'Maritime cargo intelligence from AIS + port data.',
    sector: 'Logistics',
    stage: 'Pre-seed',
    location: 'Copenhagen',
    raising: '$1.2M at $8M cap',
    fitScore: 58,
    dealStage: 'Sourced',
    summary: 'Predictive ETAs and demurrage alerts for freight forwarders. Early: 3 pilots, pre-revenue.',
    analogues: [{ companyId: 'p-driftline', kind: 'portfolio', note: 'Driftline’s slow logistics sales cycles temper enthusiasm.' }],
    whySurfaced: ['Driftline adjacency; check size fits pre-seed'],
    risks: ['Long sales cycles', 'Data licensing costs'],
    diligenceQuestions: ['Data moat vs Windward/project44?'],
    reasonsToInvest: ['Cheap entry into a real gap'],
    reasonsToPass: ['Fund’s logistics record is mediocre'],
    competitors: [{ name: 'project44', kind: 'incumbent', note: 'Visibility platform.' }],
  },
  {
    ...base,
    id: 's-muster',
    name: 'Muster',
    type: 'sourced',
    oneLiner: 'Workforce OS for commercial field-service contractors.',
    sector: 'B2B SaaS',
    stage: 'Seed',
    location: 'Columbus',
    raising: '$2.5M at $12M cap',
    fitScore: 61,
    dealStage: 'Sourced',
    summary: 'Scheduling, certs, and payroll for electrical/mechanical contractors. Echoes Nimbuslane’s market with a technical team this time.',
    analogues: [{ companyId: 'r-nimbuslane', kind: 'rejected', note: 'Same vertical shape the fund passed on for founder reasons — founder objection resolved here.' }],
    whySurfaced: ['Nimbuslane market signal with the objection fixed'],
    risks: ['SMB churn', 'ServiceTitan shadow'],
    diligenceQuestions: ['Why now vs ServiceTitan moving down-market?'],
    reasonsToInvest: ['Validated market, corrected founder profile'],
    reasonsToPass: ['ServiceTitan gravity'],
    competitors: [{ name: 'ServiceTitan', kind: 'incumbent', note: 'Category king moving down-market.' }],
  },
  {
    ...base,
    id: 's-umbra',
    name: 'Umbra',
    type: 'sourced',
    oneLiner: 'Data clean rooms for mid-market retail media.',
    sector: 'Dev infra',
    stage: 'Seed',
    location: 'San Francisco',
    raising: '$3M at $20M cap',
    fitScore: 52,
    dealStage: 'Sourced',
    summary: 'Privacy-safe audience matching without enterprise price tags. Competent team, no fund-network signal.',
    analogues: [],
    whySurfaced: ['Keyword match to data-infra thesis only — weak conviction'],
    risks: ['No network validation', 'Category depends on ad-privacy regulation timing'],
    diligenceQuestions: ['Who is the desperate first buyer?'],
    reasonsToInvest: ['Cheap option on retail media growth'],
    reasonsToPass: ['No historical analogue; low conviction score'],
    competitors: [{ name: 'LiveRamp', kind: 'incumbent', note: 'Identity/clean-room incumbent.' }],
  },
  {
    ...base,
    id: 's-fondant',
    name: 'Fondant',
    type: 'sourced',
    oneLiner: 'Procurement automation for restaurant groups.',
    sector: 'B2B SaaS',
    stage: 'Seed',
    location: 'Miami',
    raising: '$2M at $11M cap',
    fitScore: 48,
    dealStage: 'Sourced',
    summary: 'Order consolidation across food distributors. Marketplace-adjacent economics — trips the Loamly/Pallet rule.',
    analogues: [
      { companyId: 'p-loamly', kind: 'portfolio', note: 'Thin-margin supply-chain economics — the written-off Loamly pattern.' },
      { companyId: 'r-pallet', kind: 'rejected', note: 'Same pass-rule fired on Pallet.' },
    ],
    whySurfaced: ['Growth signal only; conviction low — surfaced to show the contrast'],
    risks: ['Margin structure', 'Distributor power'],
    diligenceQuestions: ['Software margins or disguised brokerage?'],
    reasonsToInvest: ['Real operator pain'],
    reasonsToPass: ['Two historical precedents say no'],
    competitors: [{ name: 'Choco', kind: 'direct', note: 'Restaurant ordering, consumer-grade UX.' }],
  },
]

/* ------------------------------------------------------------------ */
/* Execution queue                                                     */
/* ------------------------------------------------------------------ */

export const executionQueue: ExecutionItem[] = [
  { id: 'e1', kind: 'call', title: 'Partner call — Mara Voss (Aureline)', due: 'Today 14:00', companyId: 's-aureline' },
  { id: 'e2', kind: 'memo', title: 'Pre-meeting brief — Aureline', due: 'Today 13:00', companyId: 's-aureline' },
  { id: 'e3', kind: 'outreach', title: 'Send outreach — Tomás Iglesias (Ledgerline)', due: 'Today', companyId: 's-ledgerline' },
  { id: 'e4', kind: 'schedule', title: 'Coordinate intro — Elin Sørensen (Tessellate)', due: 'Tomorrow', companyId: 's-tessellate' },
  { id: 'e5', kind: 'memo', title: 'IC memo review — Solstice Health', due: 'Fri', companyId: 's-solstice' },
]

/* ------------------------------------------------------------------ */
/* Graph                                                               */
/* ------------------------------------------------------------------ */

const markets = [
  { id: 'mk-revops', label: 'Revenue Ops', pos: [0, 10, 0] as [number, number, number] },
  { id: 'mk-fintech', label: 'Fintech Infra', pos: [55, 5, -20] as [number, number, number] },
  { id: 'mk-health', label: 'Healthcare Data', pos: [-55, 0, -25] as [number, number, number] },
  { id: 'mk-devinfra', label: 'Dev Infra', pos: [25, -15, 45] as [number, number, number] },
  { id: 'mk-logistics', label: 'Logistics', pos: [-40, -10, 40] as [number, number, number] },
  { id: 'mk-security', label: 'Security', pos: [50, 20, 35] as [number, number, number] },
]

const sectorToMarket: Record<string, (typeof markets)[number]> = {
  'B2B SaaS': markets[0],
  'Fintech infra': markets[1],
  'Healthcare data': markets[2],
  'Dev infra': markets[3],
  Logistics: markets[4],
  Security: markets[5],
}

/* Deterministic jitter so layout is stable across reloads */
function jitter(seed: string, spread: number): [number, number, number] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const r = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return (((h ^= h >>> 16) >>> 0) / 4294967296 - 0.5) * 2
  }
  return [r() * spread, r() * spread, r() * spread]
}

export function buildGraph(): FundGraph {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  for (const m of markets) {
    nodes.push({ id: m.id, type: 'market', label: m.label, position: m.pos })
  }

  for (const c of companies) {
    const m = sectorToMarket[c.sector] ?? markets[0]
    const j = jitter(c.id, 22)
    nodes.push({
      id: c.id,
      type: c.type,
      label: c.name,
      score: c.fitScore,
      position: [m.pos[0] + j[0], m.pos[1] + j[1], m.pos[2] + j[2]],
    })
    edges.push({ source: c.id, target: m.id, kind: 'market', weight: 0.4 })
    for (const a of c.analogues) {
      edges.push({ source: c.id, target: a.companyId, kind: 'precedent', weight: 0.8 })
    }
  }

  for (const f of founders) {
    const company = companies.find((c) => c.id === f.companyId)
    const cPos = nodes.find((n) => n.id === f.companyId)?.position ?? [0, 0, 0]
    const j = jitter(f.id, 10)
    nodes.push({
      id: f.id,
      type: 'founder',
      label: f.name,
      score: f.score,
      position: [cPos[0] + j[0], cPos[1] + j[1] + 6, cPos[2] + j[2]],
    })
    if (company) edges.push({ source: f.id, target: company.id, kind: 'founder', weight: 0.6 })
  }

  /* similarity edges inside each market cluster */
  for (const m of markets) {
    const members = companies.filter((c) => (sectorToMarket[c.sector] ?? markets[0]).id === m.id)
    for (let i = 0; i < members.length - 1; i++) {
      edges.push({ source: members[i].id, target: members[i + 1].id, kind: 'similarity', weight: 0.3 })
    }
  }

  return { nodes, edges, weights: { ...criteriaWeights } }
}
