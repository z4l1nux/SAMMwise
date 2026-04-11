import assessmentCalculator from '../src/features/assessment/graphs/testCalculator'

// Build a complete assessment state with all 90 questions answered
function buildAnswerValues(defaultValue = 0) {
  const values = {}
  for (let i = 1; i <= 90; i++) {
    values[`question${i}`] = defaultValue
  }
  return values
}

describe('assessmentCalculator', () => {
  describe('constructor', () => {
    it('initialises with correct business function names', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(calc.businessFunctionNames).toEqual([
        'Governance', 'Design', 'Implementation', 'Verification', 'Operations'
      ])
    })

    it('initialises overall score as null', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(calc.overallScore).toBeNull()
    })

    it('initialises response count keys', () => {
      const calc = new assessmentCalculator(buildAnswerValues())
      expect(Object.keys(calc.responseCount)).toEqual([
        'No', 'Yes, for some', 'Yes, for most', 'Yes, for all'
      ])
    })
  })

  describe('getAnswerMap', () => {
    it('returns a Map with 6 entries starting at the given question number', () => {
      const values = buildAnswerValues(0.5)
      const calc = new assessmentCalculator(values)
      const map = calc.getAnswerMap(1)
      expect(map.size).toBe(6)
      expect(map.has('question1')).toBe(true)
      expect(map.has('question6')).toBe(true)
      expect(map.has('question7')).toBe(false)
    })

    it('maps to the correct answer values', () => {
      const values = buildAnswerValues()
      values['question7'] = 1
      const calc = new assessmentCalculator(values)
      const map = calc.getAnswerMap(7)
      expect(map.get('question7')).toBe(1)
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

    it('produces exactly 15 practice scores', () => {
      const calc = new assessmentCalculator(buildAnswerValues(0.5))
      calc.computeResults()
      expect(calc.practiceScores).toHaveLength(15)
    })

    it('produces exactly 5 business function scores', () => {
      const calc = new assessmentCalculator(buildAnswerValues(0.5))
      calc.computeResults()
      expect(calc.businessFunctionScores).toHaveLength(5)
    })

    it('populates practice names from sammModel', () => {
      const calc = new assessmentCalculator(buildAnswerValues(1))
      calc.computeResults()
      expect(calc.practiceNames).toContain('Strategy and Metrics')
      expect(calc.practiceNames).toContain('Threat Assessment')
      expect(calc.practiceNames).toContain('Incident Management')
    })

    it('maximum overall score is 3 when all questions answered with 1', () => {
      const calc = new assessmentCalculator(buildAnswerValues(1))
      calc.computeResults()
      expect(calc.overallScore).toBeCloseTo(3, 1)
    })

    it('accumulates response counts correctly for all-zero answers', () => {
      const calc = new assessmentCalculator(buildAnswerValues(0))
      calc.computeResults()
      // 90 questions, all zero → all 90 should count as "No"
      expect(calc.responseCount['No']).toBe(90)
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
