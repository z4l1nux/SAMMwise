# Plan — Maturity Targets, Gap Analysis & Action Plans

## Group 1 — Domain layer (`src/features/maturity/`)
1. `practiceCatalog.ts` — canonical 5 BF × 3 practices catalogue, single source of
   truth; helpers `bfOfPractice`, `findPractice`, `PRACTICE_NAMES`, `MAX_SCORE`.
2. `targets.ts` — `localStorage` targets (`sammwise_targets`): load/save/set/reset/
   clear + `clampTarget` (0–3, 0.25 step). SSR-safe.
3. `gapAnalysis.ts` — pure `computeGap()` → per-practice / per-BF / overall +
   `coverage`; `topGaps()` helper. No I/O.
4. `actionPlans.ts` — `localStorage` CRUD (`sammwise_action_plans`): create/update/
   delete + `isOverdue` + `openPlanCountByPractice`. SSR-safe.

## Group 2 — Tests (`__tests__/`)
5. `practiceCatalog.test.ts` — 15/5 shape + **drift guard vs assessmentCalculator**.
6. `targets.test.ts` — clamp, round-trip, sanitisation, malformed JSON.
7. `gapAnalysis.test.ts` — positive/negative gaps, BF/overall aggregation, topGaps.
8. `actionPlans.test.ts` — CRUD, validation, overdue, open-count.

## Group 3 — UI (`src/features/maturity/`)
9.  `GapAnalysisSection.tsx` — results-page gap block (KPIs, radar, bar, table).
10. `TargetEditor.tsx` — per-practice sliders + notes + presets, auto-save.
11. `ActionPlansManager.tsx` — CRUD form, inline status edit, filters, overdue.

## Group 4 — Pages & wiring
12. `pages/targets.tsx`, `pages/action-plans.tsx` (SSG, `getStaticProps` messages).
13. `navbar.tsx` — add Targets + Action Plans links.
14. `results.tsx` — render `<GapAnalysisSection>` inside the PDF-export ref.
15. `llmPrompt.ts` + `LLMAnalysis.tsx` — feed gap summary to the LLM prompt.

## Group 5 — i18n & docs
16. `messages/en.json` + `pt.json` — `maturity` namespace + `nav`/`meta` keys (parity).
17. `CHANGELOG.md`, `specs/roadmap.md` (Phase 10 ✅), `README.md`.

## Validation
- `npm run typecheck` (proxied with `tsc --noEmit`) = 0 errors.
- `npm test` green incl. i18n parity.
- `next build` succeeds; `/targets` and `/action-plans` prerender.
