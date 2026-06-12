/**
 * Maturity targets — a per-device, cross-assessment goal for each SAMM practice.
 *
 * Targets are organisation-level intent (not tied to a single assessment), so we
 * persist them in `localStorage` like other durable config (see AGENTS.md), not
 * `sessionStorage`. They round-trip on the 0–3 SAMM scale in 0.25 steps, matching
 * the granularity of computed practice scores.
 */

import { MAX_SCORE, findPractice } from './practiceCatalog';

export const TARGETS_STORAGE_KEY = 'sammwise_targets';

export interface PracticeTarget {
  /** Desired maturity on the 0–3 scale (0.25 steps). */
  target: number;
  /** Optional free-text rationale (≤ 2000 chars). */
  notes?: string;
}

/** Map keyed by canonical practice name → target. */
export type TargetsMap = Record<string, PracticeTarget>;

/** Clamps a raw number into the valid target range and rounds to a 0.25 step. */
export function clampTarget(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const bounded = Math.min(MAX_SCORE, Math.max(0, value));
  return Math.round(bounded * 4) / 4;
}

function sanitizeNotes(notes: string | undefined): string | undefined {
  if (!notes) return undefined;
  const trimmed = notes.slice(0, 2000);
  return trimmed.length ? trimmed : undefined;
}

/** Reads the saved targets map. SSR-safe — returns `{}` on the server. */
export function loadTargets(): TargetsMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(TARGETS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    const out: TargetsMap = {};
    for (const [name, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!findPractice(name)) continue;
      const entry = value as Partial<PracticeTarget>;
      if (typeof entry?.target !== 'number') continue;
      out[name] = { target: clampTarget(entry.target), notes: sanitizeNotes(entry.notes) };
    }
    return out;
  } catch {
    return {};
  }
}

/** Persists the whole targets map. No-op on the server. */
export function saveTargets(map: TargetsMap): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TARGETS_STORAGE_KEY, JSON.stringify(map));
}

/** Upserts one practice target and returns the updated map. */
export function setTarget(
  map: TargetsMap,
  practiceName: string,
  target: number,
  notes?: string,
): TargetsMap {
  if (!findPractice(practiceName)) return map;
  const next: TargetsMap = { ...map, [practiceName]: { target: clampTarget(target), notes: sanitizeNotes(notes) } };
  saveTargets(next);
  return next;
}

/** Removes one practice target and returns the updated map. */
export function resetTarget(map: TargetsMap, practiceName: string): TargetsMap {
  if (!(practiceName in map)) return map;
  const next = { ...map };
  delete next[practiceName];
  saveTargets(next);
  return next;
}

/** Clears every target. */
export function clearTargets(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(TARGETS_STORAGE_KEY);
}
