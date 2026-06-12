/**
 * Gap analysis — compares the current assessment scores against the saved
 * maturity targets and aggregates the shortfall per practice, per business
 * function, and overall. Pure & deterministic (no storage, no I/O) so it can be
 * unit-tested in isolation and reused by the results view and the LLM prompt.
 */

import { BUSINESS_FUNCTIONS, PRACTICE_CATALOG, bfOfPractice } from './practiceCatalog';
import type { TargetsMap } from './targets';

export interface PracticeGap {
  practice: string;
  bf: string;
  current: number;
  /** Target on the 0–3 scale. Falls back to `current` when none is set. */
  target: number;
  /** `target - current` (positive = shortfall, negative = exceeding target). */
  gap: number;
  hasTarget: boolean;
}

export interface BfGap {
  bf: string;
  current: number;
  target: number;
  gap: number;
}

export interface GapSummary {
  byPractice: PracticeGap[];
  byBf: BfGap[];
  overall: { current: number; target: number; gap: number };
  coverage: { practicesWithTarget: number; totalPractices: number };
}

export interface GapInput {
  practiceNames: string[];
  practiceScores: number[];
  overallScore: number;
  targets: TargetsMap;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Builds a full gap summary. Practices without an explicit target are treated as
 * "on target" (target = current, gap = 0) so they never create artificial gaps,
 * while `coverage` reports how many practices actually have a goal set.
 */
export function computeGap({ practiceNames, practiceScores, overallScore, targets }: GapInput): GapSummary {
  const currentByPractice = new Map<string, number>();
  practiceNames.forEach((name, i) => {
    currentByPractice.set(name, practiceScores[i] ?? 0);
  });

  const byPractice: PracticeGap[] = PRACTICE_CATALOG.map(({ name, bf }) => {
    const current = round2(currentByPractice.get(name) ?? 0);
    const entry = targets[name];
    const hasTarget = typeof entry?.target === 'number';
    const target = hasTarget ? round2(entry!.target) : current;
    return { practice: name, bf, current, target, gap: round2(target - current), hasTarget };
  });

  const byBf: BfGap[] = BUSINESS_FUNCTIONS.map(bf => {
    const rows = byPractice.filter(p => bfOfPractice(p.practice) === bf);
    const current = round2(avg(rows.map(r => r.current)));
    const target = round2(avg(rows.map(r => r.target)));
    return { bf, current, target, gap: round2(target - current) };
  });

  const overallTarget = round2(avg(byBf.map(b => b.target)));
  const overallCurrent = round2(overallScore);

  return {
    byPractice,
    byBf,
    overall: { current: overallCurrent, target: overallTarget, gap: round2(overallTarget - overallCurrent) },
    coverage: {
      practicesWithTarget: byPractice.filter(p => p.hasTarget).length,
      totalPractices: PRACTICE_CATALOG.length,
    },
  };
}

/** The practices with the largest positive shortfall, most urgent first. */
export function topGaps(summary: GapSummary, limit = 10): PracticeGap[] {
  return summary.byPractice
    .filter(p => p.hasTarget && p.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, limit);
}

function avg(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
