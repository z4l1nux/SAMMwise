# Security — Maturity Targets, Gap Analysis & Action Plans

## Entry points
- New pages `/targets`, `/action-plans` (client-rendered, no server data).
- New `localStorage` keys: `sammwise_targets`, `sammwise_action_plans`.
- No new API routes, no network calls, no new dependencies.
- The LLM prompt gains a gap-summary section (still flows through the existing
  `/api/llm` proxy; no new outbound endpoints).

## Risks & mitigations
- **Untrusted `localStorage` content** (could be edited by hand or another script):
  - `loadTargets` rejects unknown practices, non-numeric targets, clamps range,
    truncates notes, and swallows malformed JSON → `{}`.
  - `loadActionPlans` drops entries lacking a valid id/title/status/priority, and
    swallows malformed JSON → `[]`.
- **XSS:** all user-entered text (notes, plan title/description/owner) is rendered
  as plain React text nodes — never via `dangerouslySetInnerHTML`. (The existing
  LLM markdown renderer is unchanged; gap data injected into the prompt is numeric/
  catalogue-derived, not free user text.)
- **Input bounds:** title ≤180, description ≤4000, owner ≤120, notes ≤2000 chars;
  target clamped 0–3. Enforced in the domain layer, not just the UI.
- **Privacy:** targets/plans never leave the device; consistent with SAMMwise's
  zero-server model. No secrets are introduced.

## DoD (security)
- [x] No `dangerouslySetInnerHTML` on user-supplied target/plan content.
- [x] All persisted reads validated/sanitised before use.
- [x] No new dependencies (`npm audit` surface unchanged).
- [x] No secrets added (TruffleHog surface unchanged).
- [ ] `semgrep --config auto src/features/maturity` before release (no API routes
      touched, so not a blocker for this change).
