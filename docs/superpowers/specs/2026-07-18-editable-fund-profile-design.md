# Editable Fund Profile → Backend Sourcing

**Date:** 2026-07-18
**Status:** Approved design

## Goal

Make the Fund profile page (`app/src/routes/fund/FundPage.tsx`) editable. The user can
change the **thesis, check size, criteria weights, sectors, stages, and geographies**.
Saving pushes the edits to the backend's in-memory `state.fundProfile`, which directly
shapes future web discovery and fund-fit ranking.

### Why this aids sourcing (verified in code)

- `buildDiscoveryQueries` (`brain/src/tools/discover.ts`) builds web-search queries from
  `thesisSummary`, `sectors`, and `stages`.
- `discoverCompanies` uses `thesisSummary` in the LLM extraction prompt.
- `fundfit.ts` scores candidates using `checkSize.min/max` and `criteria[].weight`.

So editing these fields and applying them to `state.fundProfile` genuinely changes what
gets sourced and how it ranks.

## Decisions (from brainstorming)

- **Editable fields:** thesis, check size, weights, sectors, stages, geographies.
- **Persistence:** in-memory only. A server restart resets to `snapshot.json`.
- **Weights vs learning loop:** manual edits are just another update; later feedback can
  still move them.
- **Edit UX:** explicit **Edit mode** with **Save changes / Cancel**; one API call per save.
- **Post-save:** just save — no "re-source now" prompt.

## Data flow & the key mapping problem

Today the page renders **fixture** weights (`store.weights`), whose criterion names may not
match the backend's real `criteria[]`. Mapping edits by name against mismatched names would
silently no-op.

**Fix:** when the brain API is up, the page loads the **live** backend profile so the user
edits the real criteria. Offline, it falls back to fixtures and a save is treated as failed
(reverted, with a toast), since there is no backend to persist to.

### Type impedance (handled explicitly)

| Field | App shape | Backend shape | Edit control |
|-------|-----------|---------------|--------------|
| Check size | `checkSize` string (`"$1M – $3M…"`) | `checkSize: {min, max}` numbers | Two `$M` number inputs (min/max) |
| Weights | `Record<name, number>` in [0,1] | `criteria[].weight` | Per-row slider (0–1) |
| Stages | `string[]` (display labels) | `z.array(CompanyStage)` enum | Toggle chips from the allowed enum set |
| Sectors / geographies | `string[]` | `z.array(z.string())` | Free-text chip editor |
| Thesis | `thesis` string | `thesisSummary` string | Textarea |

Weight mapping: backend matches by criterion **name** (exact, case-insensitive fallback),
clamps to [0,1], **no renormalization** (matches the current bar display, width `v*100%`).
Names not found in `criteria[]` are ignored and logged. Allowed `CompanyStage` values:
`pre_seed`, `seed`, `series_a`, `series_b`, `series_c_plus`, `growth`.

App `FundProfile` gains optional `checkSizeMin?` / `checkSizeMax?` (USD numbers), populated
when loaded live; the display formats them.

## Backend

New module `brain/src/fund/profileEdits.ts` (pure, unit-testable — keeps the ~400-line
`server.ts` tidy):

- `fundProfileToView(profile)` → editable slice:
  `{ thesis, checkSizeMin, checkSizeMax, stages, sectors, geographies, weights }`.
- `applyFundPatch(profile, patch)` → returns an updated copy: sets `thesisSummary`,
  `checkSize.min/max`, `stages` / `sectors` / `geographies`, and maps `weights` by criterion
  name (clamped). Ignores unknown criterion names.

New endpoints in `brain/src/server.ts`:

- `GET /api/fund` → `fundProfileToView(state.fundProfile)`.
- `POST /api/fund` → zod-validate the patch, `state.fundProfile = applyFundPatch(...)`,
  return the updated view.

## Frontend

- **`app/src/lib/types.ts`**: add `checkSizeMin?` / `checkSizeMax?` to `FundProfile`; add a
  `FundProfilePatch` type.
- **`app/src/lib/api/client.ts`**:
  - `getFund()` overlays the live slice onto the fixture base (keeps fixture `name` and
    `partners`, which are not editable) and sets `store.weights` from the live criteria.
  - `updateFund(patch)` POSTs to `/api/fund`; on success updates `store.weights` and sets a
    `learningNote` toast ("Fund profile updated — future sourcing and ranking will use it");
    on failure (API unreachable) reverts and toasts "Brain API unreachable — profile not
    saved."
- **`app/src/routes/fund/FundPage.tsx`**: add `isEditing` + a working draft. "Edit profile"
  button by the title. In edit mode: thesis → textarea; check size → two `$M` inputs;
  sectors/geographies → chip editors; stages → toggle chips; weights → per-row sliders
  (styled with the existing `bg-hero-glow`). Footer: **Save changes** + **Cancel** (reverts
  to the loaded snapshot). The read-only view is visually unchanged.
- Extract two small components for isolation (under `app/src/routes/fund/`): `ChipEditor`
  and `WeightSlider`.

## Testing

- **Backend unit test** (`brain/src/fund/profileEdits.test.ts`, vitest): `applyFundPatch`
  maps weights by name, clamps out-of-range values, updates thesis/checkSize/sectors, and
  ignores unknown criteria; `fundProfileToView` round-trips.
- **UI verification** via the `verify` skill: drive Edit → change a weight + thesis → Save →
  assert the POST body and that `GET /api/fund` reflects the change.

## Out of scope

Partner editing, persistence across restart, re-source-on-save, and adding/removing criteria
(only existing criteria are re-weighted).
