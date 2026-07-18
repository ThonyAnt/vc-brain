# HCP Sources — Batch 04: Fintech and Financial Infrastructure

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
