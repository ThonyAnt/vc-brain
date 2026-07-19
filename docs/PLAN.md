# Meridian — Product Plan

We are building Meridian, an AI-native operating system for venture capital firms that learns how a specific fund thinks, automatically discovers relevant startups, evaluates them using the fund's historical decision-making patterns, and supports the entire investment workflow from sourcing through diligence and investment committee review.

The product begins by ingesting a fund's prior investment memos, rejected deals, portfolio companies, stated thesis, check size, preferred stages, sectors, geographies, partner preferences, and historical outcomes. From this information, it creates a fund-specific investment system rather than relying on a generic startup scoring model.

## Core Product Experience

The main interface is an interactive graph-based brain.

Nodes can represent:

- Startups
- Founders
- Markets
- Competitors
- Portfolio companies
- Past investments
- Rejected deals
- Investment criteria
- Risks
- Technologies
- Customers
- Partners
- Historical outcomes

Edges represent relationships such as similarity, competition, shared markets, matching investment criteria, founder connections, portfolio overlap, historical precedent, or common risk factors.

Spatial distance should have meaning. Companies positioned close together are strategically, semantically, or financially similar. The graph should allow users to visually understand how a new company relates to previous investments, rejected deals, competitors, and the broader market.

## Automated Sourcing

The system searches startup databases, public company information, accelerator cohorts, founder profiles, and other available sources to identify companies that match the fund's investment patterns.

Sourcing should be conviction-driven rather than generic. For every surfaced company, the system explains:

- Why the company fits the fund
- Which prior investments it resembles
- Which rejected deals it resembles
- Whether it matches the fund's check size and stage
- Whether there are portfolio conflicts or synergies
- Which investment criteria are satisfied
- Which risks remain unresolved
- Why the opportunity may be timely

The user can investigate, pass, save, or generate outreach for each company.

## Startup Analysis

When a startup is selected or its pitch deck is uploaded, the system should automatically generate:

- Company summary
- Founder background
- Market overview
- Competitor landscape
- Historical analogues
- Fund-fit score
- Key risks
- Missing diligence questions
- Portfolio conflicts and synergies
- Potential acquirers
- Investment thesis
- Reasons to invest
- Reasons to pass

The system should identify the closest successful portfolio company, closest failed or rejected deal, and closest external competitor. It should explain both similarities and important differences.

## Competitor Landscape

The product should generate a visual competitor graph or market map showing:

- Direct competitors
- Adjacent competitors
- Incumbents
- Emerging startups
- Potential partners
- Potential acquirers
- Crowded market clusters
- Areas of strategic white space

The new startup should be positioned within this landscape based on factors such as customer type, business model, pricing, technology, market segment, and product scope.

## Financial Modeling

The system should automatically generate an editable financial model based on the company's business model.

For SaaS or recurring-revenue companies, the model should include:

- ARR growth
- Customer growth
- Churn
- Gross retention
- Net revenue retention
- Expansion revenue
- CAC
- CAC payback period
- Gross margin
- Burn
- Runway
- Future financing rounds
- Dilution
- Exit multiple
- IRR
- MOIC
- Expected fund return

Different templates can eventually support marketplaces, hardware companies, biotech, consumer products, and other business models.

The model should be viewable in the application and exportable as an Excel file.

## Scenario and Return Simulation

The user should be able to change assumptions such as growth, churn, margins, valuation, dilution, exit multiple, and time to exit.

The system should dynamically update:

- Expected return
- Bull, base, and bear cases
- Ownership at exit
- Probability-weighted outcomes
- IRR
- MOIC
- Probability of returning the fund
- Effect on the broader portfolio

A future-facing visualization can show multiple possible company outcomes branching from the current investment decision.

## Outreach and Scheduling

Once the investor approves a sourced company, the system can:

- Find the founder's contact information
- Draft personalized outreach
- Explain why the company is relevant to the fund
- Simulate or send the message
- Track the founder's response
- Coordinate availability
- Schedule a meeting
- Add the meeting to the investor's calendar

For the hackathon, some parts of this flow can be simulated if live integrations are too expensive or unreliable.

For the implementation sequence, backend workflow/state model, provider integration approach, AI guardrails, and compliance controls, see [Outreach Automation](OUTREACH_AUTOMATION.md).

## Pre-Meeting Intelligence

Before the meeting, the system generates a concise briefing containing:

- Company overview
- Founder background
- Market context
- Competitor landscape
- Historical analogues
- Key financial assumptions
- Risks
- Open questions
- Recommended diligence questions
- Why the company may fit the fund

The goal is for the investor to enter the meeting already understanding the company and the most important unresolved questions.

## Meeting Copilot

During the meeting, the system can act as a VC analyst by:

- Taking structured notes
- Extracting claims and metrics
- Tracking unanswered questions
- Detecting contradictions
- Suggesting follow-up questions
- Identifying missing diligence information
- Comparing founder statements with the pitch deck and financial model

Example questions might cover:

- Current fundraising amount
- Valuation expectations
- Equity offered
- Revenue quality
- Customer concentration
- Churn
- Distribution strategy
- Scalability
- Regulatory risk
- Competitive differentiation
- Ownership of intellectual property
- Capital requirements

## Post-Meeting Output

After the meeting, the system should automatically produce:

- Structured meeting notes
- Updated company profile
- Draft investment memo
- Investment thesis
- Reasons to invest
- Reasons to pass
- Updated financial model
- Updated return scenarios
- Risk analysis
- Missing diligence items
- Recommended next steps
- Preliminary investment recommendation

The memo should follow the format and reasoning style learned from the fund's prior investment memos.

## Learning and Feedback Loop

The investor can approve, reject, or modify the system's recommendations. These actions become feedback signals that update the fund brain.

Possible feedback includes:

- Interested
- Not interested
- Meeting accepted
- Meeting declined
- Advanced to diligence
- Passed
- Invested
- Company later succeeded
- Company later underperformed
- Partner changed the recommendation

For the hackathon, this can be implemented as preference learning, weighted scoring, or a contextual bandit rather than a complex production-grade reinforcement learning system.

The visible result should be that the graph and recommendation weights update after feedback. For example:

> "The fund now places greater weight on technical founder credibility in regulated healthcare investments."

## Partner-Specific Intelligence

Each partner may have a separate investment profile.

The system can show:

- Which partners are likely to support the deal
- Which partners are likely to oppose it
- Why they may disagree
- What the likely investment committee debate will be
- Which evidence could change each partner's view

This creates a realistic simulation of internal fund decision-making.

## Key Differentiation

The product is not simply:

- A startup search engine
- A CRM
- A meeting recorder
- A pitch deck summarizer
- A financial modeling tool
- An automated outreach platform

It combines all of these around a proprietary fund-specific reasoning layer.

The core differentiation is that the system learns how one fund evaluates investments, preserves institutional memory, connects new opportunities to historical decisions, and improves through feedback.

## Recommended Hackathon Demo

The demo should follow one clear narrative:

1. Upload prior investment memos and fund criteria.
2. Generate the visual fund brain.
3. Automatically source several companies.
4. Select one company and explain why it surfaced.
5. Place it near similar portfolio companies and rejected deals.
6. Generate a competitor landscape.
7. Identify risks and missing diligence questions.
8. Generate an editable recurring-revenue financial model.
9. Show bull, base, and bear return scenarios.
10. Draft founder outreach and simulate scheduling a meeting.
11. Generate a pre-meeting brief.
12. Simulate meeting notes or upload a transcript.
13. Generate an investment memo and recommendation.
14. Let the investor approve or reject the recommendation.
15. Visibly update the fund brain based on that feedback.

## Main Hackathon Wow Factors

- A visually impressive graph-based fund brain
- Spatial company similarity
- Historical investment analogues
- Competitor landscape visualization
- Automatic financial and return modeling
- Fund-specific investment memo generation
- Partner disagreement analysis
- Visible learning from investor feedback
- Automated sourcing tied directly to historical conviction

## Product Positioning

> "An AI investment brain for venture capital firms that learns how a fund thinks, discovers matching startups, maps the market, models returns, prepares diligence, and improves after every decision."

The central idea is a living institutional memory and reasoning system for venture investing.
