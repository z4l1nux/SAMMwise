# Requirements — Maturity Targets, Gap Analysis & Action Plans

**Scale:** MEDIUM (P → R → E → V)
**Date:** 2026-06-12

## Why

SAMMwise scores the *current* maturity of a SAMM assessment, but gives no way to
express where the organization *wants* to be, nor to track the work to get there.
This feature adds the planning layer that turns a one-shot assessment into a
managed improvement loop: **targets → gap → action plans**.

It is a backport of the planning capabilities that the SEK "Governance Maturity"
module built on top of the same SAMM engine, adapted to SAMMwise's zero-server,
browser-only architecture (no database, no auth).

## Scope (in)

1. **Maturity Targets** — set a desired maturity (0–3, 0.25 steps) per SAMM
   practice, with optional notes. Durable, device-local (`localStorage`),
   cross-assessment. New page `/targets`.
2. **Gap Analysis** — on `/results`, compare current scores to targets: overall
   KPIs (current / target / gap / coverage), a current-vs-target radar, a
   "largest gaps" bar chart, and a shortfall table. Empty state when no targets.
3. **Action Plans** — CRUD remediation tasks attached to a practice
   (title, owner, due date, status, priority, description). Durable, device-local.
   New page `/action-plans`. Overdue highlighting, practice/status/priority filters.
4. **AI awareness** — when targets exist, the LLM analysis prompt is enriched with
   the gap summary so "Priority Improvements" target the biggest gaps first.

## Scope (out / deferred)

- Server-side persistence, multi-user, RLS, audit logging (contradicts the
  zero-server mission — these stay SEK-platform-only).
- Cross-assessment trend history and assessment-similarity vectors (require a
  persistent store of many assessments; SAMMwise keeps only the current one).
- Including targets/plans inside the exported JSON report (kept separate so the
  report file stays an assessment snapshot; targets/plans are device config).

## Decisions

- **Storage:** `localStorage` (`sammwise_targets`, `sammwise_action_plans`) —
  consistent with AGENTS.md ("localStorage only for durable config"). Targets and
  plans are organisation-level intent, not assessment data, so they must outlive a
  single assessment in `sessionStorage`.
- **Practice identity:** the canonical English practice name (e.g.
  `"Strategy and Metrics"`) is the key, identical to `assessmentCalculator`
  output and the `charts.practices` i18n keys. A new `practiceCatalog.ts` is the
  single source of truth and is guarded against drift by a unit test.
- **Gap math:** practices without an explicit target are treated as on-target
  (target = current, gap = 0); `coverage` reports how many practices actually have
  a goal. BF/overall targets are the mean of their practice targets.
- **No new chart libs:** reuse Chart.js (Radar/Bar) already in the project.

## NFRs

- `tsc --noEmit` = 0 errors; full Jest suite green; i18n EN/PT parity preserved.
- SSR-safe: all storage access guarded by `typeof window`, performed in effects.
- No new runtime dependencies.
