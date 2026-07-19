# Outreach and Scheduling Automation

This document defines a safe production path for turning a sourced company into a founder meeting without turning VC Brain into an unsupervised email bot.

## Product principle

Automate the mechanical work; keep the investor in control of external commitments.

- A founder’s verified business contact, source, and confidence are stored in the backend.
- AI drafts a grounded, editable email from structured company and fund context.
- The user chooses whether a campaign is **draft-only**, **review-before-send**, or **pre-approved auto-send**.
- An inbound reply is classified and a reply is drafted. Only an explicit positive scheduling intent can enter scheduling.
- The system offers a small set of free/busy-safe slots, creates the calendar event only after a slot is confirmed, then notifies the investor.

Never make up a founder’s background, a portfolio connection, availability, or a commitment. Never expose calendar event details in the founder-facing email.

## MVP scope

Build a narrow, dependable vertical slice first:

1. User selects one sourced company and a verified founder work email.
2. Backend creates an outreach record and produces one editable draft.
3. User approves and sends through their connected Gmail or Microsoft account.
4. Mail webhook ingests the reply and ties it to that outreach thread.
5. On a positive reply, the system drafts a short scheduling response with 3–5 available times.
6. When the founder selects a time, create an event on the investor’s chosen calendar, invite the founder, and send an in-app/email notification to the investor.

Do **not** begin with scraping, bulk sending, automated follow-up sequences, multi-attendee coordination, or natural-language calendar negotiation. Those can follow after the event model and audit trail are reliable.

## Recommended architecture

```text
Sourcing / CRM                 Investor UI
company + contact ──► API ◄── review / approve / settings
                         │
                         ├── Postgres: companies, contacts, outreach, threads,
                         │             scheduling holds, calendar events, audit log
                         ├── Queue / worker: drafting, sending, webhook processing,
                         │                 availability lookup, notifications
                         ├── LLM service: structured JSON only, grounded context
                         ├── Email provider: Gmail API or Microsoft Graph
                         └── Calendar provider: Google Calendar or Microsoft Graph
                                      ▲
                            signed webhooks / history sync
```

Use a durable job queue (e.g. BullMQ + Redis, Cloud Tasks, Temporal) and idempotency keys. Email sends, calendar creation, and webhook retries must be safe to run more than once.

### Integration order

1. **Google first:** Gmail API for thread-aware sending and Google Calendar free/busy + event creation. Use OAuth with incremental scopes.
2. Add **Microsoft Graph** second for Outlook and Microsoft 365 calendars.
3. Use a contact-data provider only where its terms, the person’s jurisdiction, and the fund’s policy permit it. Retain the source URL/provider, retrieval date, confidence, and an opt-out/suppression record.

Keep provider implementations behind `EmailProvider` and `CalendarProvider` interfaces so the workflow is provider-neutral.

## Data model

Store normalized records rather than burying workflow state inside chat history.

```text
companies(id, name, website, stage, thesis_context, owner_id)
contacts(id, company_id, name, title, email, email_status, source, source_url,
         confidence, consent_basis, do_not_contact_at)
outreach(id, company_id, contact_id, owner_id, status, mode, thread_id,
         subject, body, model_version, approved_at, sent_at, reply_intent,
         last_error, idempotency_key)
outreach_messages(id, outreach_id, provider_message_id, direction, received_at,
                  raw_ref, sanitized_text, classification_json)
scheduling_requests(id, outreach_id, calendar_id, timezone, duration_minutes,
                    status, offered_slots_json, expires_at, selected_slot_at)
calendar_events(id, scheduling_request_id, provider_event_id, join_url,
                start_at, end_at, status)
audit_log(id, actor_type, actor_id, action, entity_type, entity_id, payload,
          created_at)
```

Useful `outreach.status` values:

```text
DRAFT → PENDING_APPROVAL → QUEUED → SENT → REPLIED
                                   ↘ FAILED
REPLIED → QUALIFYING → AWAITING_SLOT → SLOT_SELECTED → EVENT_CREATED → NOTIFIED
REPLIED → NOT_INTERESTED | NEEDS_HUMAN_REVIEW | UNSUBSCRIBED
```

Store all timestamps in UTC and always retain the founder’s stated timezone plus the investor’s display timezone.

## Workflow details

### 1. Prepare and draft

Before drafting, enforce server-side checks:

- The contact is a verified business email, has no suppression/opt-out, and is within the configured daily/domain limits.
- The company has enough evidence to support personalization: product, stage, source, and one or two fund-relevant facts.
- The selected sender identity and calendar are connected and valid.

Have the LLM return validated structured output, not a free-form action:

```json
{
  "subject": "Quick question about {{company_name}}",
  "body": "…",
  "personalization_facts": ["…"],
  "claims_requiring_review": [],
  "confidence": 0.91
}
```

Render the final email using templates and variables such as `{{company_name}}`, `{{founder_first_name}}`, `{{investor_name}}`, and `{{fund_name}}`. Display the source evidence alongside the draft. If facts are missing, use a neutral sentence rather than inventing a claim.

### 2. Send

Default to **review-before-send**. A user may enable auto-send only for a saved, approved template and a narrowly defined segment. Apply:

- Per-user and per-domain rate limits; start at 10–20/day.
- Send windows based on recipient timezone.
- A plain-text opt-out mechanism where required and immediate suppression handling.
- Thread headers and provider message IDs so replies are reliably correlated.
- An immutable audit event recording who approved, what was sent, and the exact rendered content.

### 3. Process replies

Subscribe to provider webhooks (Gmail watch/history or Microsoft Graph subscriptions). Verify webhook signatures, fetch the canonical message through the provider, deduplicate by message ID, and process in a worker.

Classify replies into a constrained schema:

```json
{
  "intent": "positive|proposes_time|declines|question|out_of_office|unsubscribe|ambiguous",
  "explicit_slots": [{"start": "ISO-8601", "end": "ISO-8601", "timezone": "America/Los_Angeles"}],
  "needs_human_review": false,
  "reason": "short explanation"
}
```

Rules:

- `unsubscribe`, `declines`, `question`, and `ambiguous` never trigger an automatic scheduling reply.
- Only a positive reply or explicit proposed time starts scheduling.
- LLM output is advisory; validate all parsed datetimes with deterministic code.
- Preserve the original message securely; send only sanitized, minimal context to the model.

### 4. Find availability and propose times

Use the calendar API’s free/busy endpoint for the investor’s selected calendar. Generate 3–5 slots using user settings: meeting duration (e.g. 25 minutes), working hours, buffers, minimum notice, booking horizon, and blackout events/calendars.

Do not send meeting titles, attendee names, descriptions, or other event metadata in availability requests or replies. The email should state the founder’s timezone clearly, for example:

> I can make Tuesday at 10:00 AM PT, 1:30 PM PT, or Wednesday at 11:00 AM PT. Does one work for you?

For a faster second iteration, include a secure booking link backed by short-lived held slots. A hold is not a meeting: expire it automatically and recheck free/busy immediately before event creation.

### 5. Confirm, create, and notify

Treat a time as confirmed only when the founder explicitly selects it or books it. On confirmation:

1. Recheck free/busy inside a transaction/lock.
2. Create the event on the selected calendar with the founder as attendee.
3. Set a clear title, duration, conferencing setting, and minimal description.
4. Persist the provider event ID before responding.
5. Send the confirmation reply and notify the investor in-app (and optionally by email/Slack).
6. If creation fails or a conflict appears, do not bluff: mark `NEEDS_HUMAN_REVIEW` and offer fresh slots.

## API shape

```text
POST /api/companies/:companyId/outreach/draft
POST /api/outreach/:id/approve
POST /api/outreach/:id/send
POST /api/webhooks/gmail
POST /api/webhooks/microsoft
POST /api/outreach/:id/scheduling/propose
POST /api/scheduling/:id/confirm
GET  /api/outreach?status=…
```

Authorization belongs on every route: a user can access only their fund/workspace and authorized sender identities/calendars. Webhooks must be separated from user-authenticated APIs and validate provider signatures.

## AI guardrails

- Use retrieval from the selected company, contact, fund thesis, and approved templates only; cite the facts in the UI.
- Give the model no direct permission to send email or write calendar events. It proposes typed actions; server policy and user approval execute them.
- Schema-validate all model responses. Limit recipients to the selected contact; reject new addresses returned by the model.
- Detect prompt injection in inbound email and treat message text as untrusted data, never instructions.
- Record prompt/template version and model version for every draft, without logging OAuth tokens or raw sensitive calendar data.

## Compliance and privacy baseline

Get counsel for the fund’s jurisdictions and policies before enabling sending. At minimum: document a lawful basis for business-contact processing, provide an opt-out/suppression mechanism, honor deletion requests, respect provider terms, encrypt OAuth tokens at rest, rotate encryption keys, and use least-privilege OAuth scopes. Email outreach laws differ by location (including CAN-SPAM, CASL, GDPR/UK GDPR, and local rules); product controls should be configurable, not hard-coded legal advice.

## Build sequence and acceptance tests

### Phase 1 — human-in-the-loop (1–2 weeks)

- Company/contact records, draft generation, edit/review UI, Gmail send, audit log.
- Test: an approved draft sends once, appears in the correct Gmail thread, and cannot send to a suppressed contact.

### Phase 2 — reply inbox (1 week)

- Webhook ingestion, thread matching, intent view, manual “propose times” action.
- Test: duplicate webhooks never produce duplicate messages; unsubscribe immediately blocks future sends.

### Phase 3 — assisted scheduling (1 week)

- Calendar free/busy, proposed slots, confirmation, event creation, investor notification.
- Test: no busy time is offered; a selected slot creates exactly one event and the investor receives the notification.

### Phase 4 — constrained automation (after reliability review)

- Optional auto-reply only for high-confidence positive replies, observability dashboard, approval policy per user.
- Test: every non-positive or ambiguous response is routed to the review queue; all automated actions have an audit trail and a kill switch.

## Product UI

Add an **Outreach** drawer to a company page with four tabs:

1. **Contact** — founder name/title, verified work email, source, confidence, do-not-contact control.
2. **Draft** — editable subject/body, cited personalization facts, send mode, approval button.
3. **Thread** — sent/replied messages, classified intent, escalation state.
4. **Schedule** — connected calendar, duration/timezone rules, offered slots, event status, notify preference.

Surface a global “Automation paused” kill switch and a review queue. Metrics worth tracking: draft-to-send approval rate, delivery/bounce rate, reply rate, positive-reply rate, booking conversion, median scheduling time, unsubscribe rate, duplicate-send count (target: zero), and human-escalation rate.
