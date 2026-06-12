# Validation — Maturity Targets, Gap Analysis & Action Plans

## Definition of Done

### Targets (`/targets`)
- [x] All 15 practices listed, grouped by the 5 business functions.
- [x] Slider sets a target 0–3 in 0.25 steps; value clamped & rounded on load/save.
- [x] Notes field appears once a target is set; persisted with the target.
- [x] Presets ("set all to 1/2/3") and per-row reset + "clear all" work.
- [x] Changes auto-persist to `localStorage` and survive reload.

### Gap Analysis (`/results`)
- [x] Empty state with a link to `/targets` when no targets are set.
- [x] KPIs: overall current / target / gap / coverage (n of 15).
- [x] Radar overlays current vs target across the 15 practices.
- [x] "Largest gaps" bar lists only positive, targeted shortfalls (≤10).
- [x] Table lists targeted practices sorted by gap desc; "On target" for gap ≤ 0.
- [x] Section sits inside the PDF-export ref (exports with the report).

### Action Plans (`/action-plans`)
- [x] Create form: practice, title (≥2 chars), owner, due date, status, priority, description.
- [x] List newest-first; inline status change; delete with confirm.
- [x] Overdue badge when due date is past and status is open.
- [x] Filters by practice / status / priority; distinct empty states.
- [x] All changes persist to `localStorage`.

### AI
- [x] When targets exist, the prompt includes the gap summary and re-frames
      "Priority Improvements" around the largest gaps.

## Automated checks
- [x] `tsc --noEmit` → 0 errors.
- [x] `npm test` → 9 suites / 168 tests green (was 5 / 123).
- [x] i18n parity test green (EN/PT same keys & count).
- [x] `next build` → success; `/targets` and `/action-plans` prerendered (SSG).

## Manual checks
- [x] SSR-safe: pages render with empty state on the server; storage read in effects.
- [ ] Visual smoke in `npm run dev` (EN + PT) — recommended before release tag.
