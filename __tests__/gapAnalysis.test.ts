import { computeGap, topGaps, type GapInput } from '../src/features/maturity/gapAnalysis'
import { PRACTICE_NAMES } from '../src/features/maturity/practiceCatalog'
import type { TargetsMap } from '../src/features/maturity/targets'

// All 15 practices scored at `value`, in catalogue order.
function flatScores(value = 1): GapInput {
  return {
    practiceNames: [...PRACTICE_NAMES],
    practiceScores: PRACTICE_NAMES.map(() => value),
    overallScore: value,
    targets: {},
  }
}

function gapFor(summary: ReturnType<typeof computeGap>, practice: string) {
  const row = summary.byPractice.find(p => p.practice === practice)
  if (!row) throw new Error(`missing ${practice}`)
  return row
}

describe('computeGap', () => {
  it('produces one row per catalogue practice plus 5 BF rows', () => {
    const summary = computeGap(flatScores(1))
    expect(summary.byPractice).toHaveLength(15)
    expect(summary.byBf).toHaveLength(5)
  })

  it('reports zero gaps and zero coverage when no targets are set', () => {
    const summary = computeGap(flatScores(1.5))
    summary.byPractice.forEach(p => {
      expect(p.hasTarget).toBe(false)
      expect(p.gap).toBe(0)
      expect(p.target).toBe(p.current)
    })
    expect(summary.coverage.practicesWithTarget).toBe(0)
    expect(summary.coverage.totalPractices).toBe(15)
    expect(summary.overall.gap).toBe(0)
  })

  it('computes a positive shortfall when target exceeds current', () => {
    const targets: TargetsMap = { 'Secure Build': { target: 2 } }
    const summary = computeGap({ ...flatScores(1), targets })
    const sb = gapFor(summary, 'Secure Build')
    expect(sb.hasTarget).toBe(true)
    expect(sb.current).toBe(1)
    expect(sb.target).toBe(2)
    expect(sb.gap).toBe(1)
    expect(summary.coverage.practicesWithTarget).toBe(1)
  })

  it('computes a negative gap when current already exceeds target', () => {
    const targets: TargetsMap = { 'Threat Assessment': { target: 0.5 } }
    const summary = computeGap({ ...flatScores(1), targets })
    expect(gapFor(summary, 'Threat Assessment').gap).toBe(-0.5)
  })

  it('aggregates BF current/target as the mean of its practices', () => {
    const targets: TargetsMap = { 'Secure Build': { target: 2 } } // Implementation BF
    const summary = computeGap({ ...flatScores(1), targets })
    const impl = summary.byBf.find(b => b.bf === 'Implementation')!
    expect(impl.current).toBe(1)
    expect(impl.target).toBeCloseTo((2 + 1 + 1) / 3, 2) // 1.33
    expect(impl.gap).toBeCloseTo(0.33, 2)
  })

  it('falls back missing practice scores to 0', () => {
    const input: GapInput = {
      practiceNames: ['Secure Build'],
      practiceScores: [2],
      overallScore: 0,
      targets: {},
    }
    const summary = computeGap(input)
    expect(gapFor(summary, 'Secure Build').current).toBe(2)
    expect(gapFor(summary, 'Strategy and Metrics').current).toBe(0)
  })
})

describe('topGaps', () => {
  it('returns only positive, targeted gaps, largest first', () => {
    const targets: TargetsMap = {
      'Secure Build': { target: 3 },        // gap 2
      'Threat Assessment': { target: 2 },   // gap 1
      'Policy and Compliance': { target: 0.5 }, // gap -0.5 (excluded)
    }
    const summary = computeGap({ ...flatScores(1), targets })
    const top = topGaps(summary)
    expect(top.map(p => p.practice)).toEqual(['Secure Build', 'Threat Assessment'])
  })

  it('respects the limit', () => {
    const targets: TargetsMap = Object.fromEntries(
      PRACTICE_NAMES.map(name => [name, { target: 3 }]),
    )
    const summary = computeGap({ ...flatScores(0), targets })
    expect(topGaps(summary, 3)).toHaveLength(3)
  })
})
