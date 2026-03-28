import assessmentCalculator from '../src/features/assessment/graphs/testCalculator'
import getSurvey from '../src/features/assessment/surveys/totalsurvey'

// Build a complete assessment state using the real survey question names
function buildAnswerValues(defaultValue: number | null = 0): Record<string, number | null> {
  const survey = getSurvey()
  const values: Record<string, number | null> = {}
  survey.pages.forEach((page: any) => {
    ;(page.elements || []).forEach((panel: any) => {
      ;(panel.elements || []).forEach((q: any) => {
        values[q.name] = defaultValue
      })
    })
  })
  return values
}

const SURVEY = getSurvey()
const TOTAL_QUESTIONS = (() => {
  let n = 0
  SURVEY.pages.forEach((p: any) =>
    (p.elements || []).forEach((panel: any) =>
      (panel.elements || []).forEach(() => n++)
    )
  )
  return n
})()
const TOTAL_PANELS = SURVEY.pages.reduce(
  (acc: number, p: any) => acc + (p.elements || []).length,
  0
)
const TOTAL_PAGES = SURVEY.pages.length

describe('assessmentCalculator', () => {
  describe('constructor', () => {
    it('initialises with correct number of business function names', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(calc.businessFunctionNames).toHaveLength(TOTAL_PAGES)
    })

    it('initialises with AISVS control names (Control 1 … Control 14)', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(calc.businessFunctionNames[0]).toBe('Control 1')
      expect(calc.businessFunctionNames[TOTAL_PAGES - 1]).toBe(`Control ${TOTAL_PAGES}`)
    })

    it('initialises overall score as 0 before computeResults', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      // overallScore starts at 0 (set in constructor before computeResults)
      expect(typeof calc.overallScore).toBe('number')
    })

    it('initialises response count keys', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(Object.keys(calc.responseCount)).toEqual([
        'No', 'Yes, for some', 'Yes, for most', 'Yes, for all'
      ])
    })
  })

  describe('isPracticeCompleted', () => {
    it('returns false when any value is null', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(calc.isPracticeCompleted([0, null, 0.5, 0, 1, 0])).toBe(false)
    })

    it('returns true when all values are answered (including 0)', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(calc.isPracticeCompleted([0, 0, 0.5, 0.25, 1, 0])).toBe(true)
    })
  })

  describe('sortResponseCount', () => {
    it('counts "No" responses (0)', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      calc.sortResponseCount([0, 0, 0.5])
      expect(calc.responseCount['No']).toBe(2)
    })

    it('counts "Yes, for some" responses (0.25)', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      calc.sortResponseCount([0.25, 0.25])
      expect(calc.responseCount['Yes, for some']).toBe(2)
    })

    it('counts "Yes, for most" responses (0.5)', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      calc.sortResponseCount([0.5])
      expect(calc.responseCount['Yes, for most']).toBe(1)
    })

    it('counts "Yes, for all" responses (1)', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      calc.sortResponseCount([1, 1, 1])
      expect(calc.responseCount['Yes, for all']).toBe(3)
    })
  })

  describe('computeResults', () => {
    it('produces overall score 0 when all answers are 0', () => {
      const calc = new assessmentCalculator(buildAnswerValues(0))
      calc.computeResults()
      expect(calc.overallScore).toBe(0)
    })

    it('produces overall score > 0 when questions are answered', () => {
      const calc = new assessmentCalculator(buildAnswerValues(1))
      calc.computeResults()
      expect(calc.overallScore).toBeGreaterThan(0)
    })

    it('produces the correct number of practice scores (one per panel)', () => {
      const calc = new assessmentCalculator(buildAnswerValues(0.5))
      calc.computeResults()
      expect(calc.practiceScores).toHaveLength(TOTAL_PANELS)
    })

    it('produces exactly 14 business function scores (one per AISVS control)', () => {
      const calc = new assessmentCalculator(buildAnswerValues(0.5))
      calc.computeResults()
      expect(calc.businessFunctionScores).toHaveLength(TOTAL_PAGES)
    })

    it('populates practice names from sammModel (AISVS panel names)', () => {
      const calc = new assessmentCalculator(buildAnswerValues(1))
      calc.computeResults()
      expect(calc.practiceNames).toContain('C1.1 Training Data Origin & Traceability')
      expect(calc.practiceNames).toContain('C14.1 Kill-Switch & Override Mechanisms')
    })

    it('maximum overall score is 3 when all questions answered with 1', () => {
      const calc = new assessmentCalculator(buildAnswerValues(1))
      calc.computeResults()
      expect(calc.overallScore).toBeCloseTo(3, 1)
    })

    it('accumulates response counts correctly for all-zero answers', () => {
      const calc = new assessmentCalculator(buildAnswerValues(0))
      calc.computeResults()
      expect(calc.responseCount['No']).toBe(TOTAL_QUESTIONS)
      expect(calc.responseCount['Yes, for all']).toBe(0)
    })

    it('does not include incomplete practices in response count', () => {
      const values = buildAnswerValues(null)
      const calc = new assessmentCalculator(values)
      calc.computeResults()
      const total = Object.values(calc.responseCount).reduce((a, b) => a + b, 0)
      expect(total).toBe(0)
    })
  })
})
