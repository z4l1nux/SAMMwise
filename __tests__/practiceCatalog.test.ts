import {
  PRACTICE_CATALOG,
  PRACTICE_NAMES,
  BUSINESS_FUNCTIONS,
  bfOfPractice,
  findPractice,
} from '../src/features/maturity/practiceCatalog'
import assessmentCalculator from '../src/features/assessment/graphs/testCalculator'

// Build a complete assessment state so the calculator emits its practice names.
function buildAnswerValues(defaultValue = 0) {
  const values: Record<string, number> = {}
  for (let i = 1; i <= 90; i++) values[`question${i}`] = defaultValue
  return values
}

describe('practiceCatalog', () => {
  it('lists exactly 15 practices across 5 business functions', () => {
    expect(PRACTICE_CATALOG).toHaveLength(15)
    expect(BUSINESS_FUNCTIONS).toHaveLength(5)
    expect(PRACTICE_NAMES).toHaveLength(15)
  })

  it('assigns a sequential index that matches array position', () => {
    PRACTICE_CATALOG.forEach((p, i) => expect(p.index).toBe(i))
  })

  it('stays byte-for-byte in sync with assessmentCalculator practice names/order', () => {
    const calc = new assessmentCalculator(buildAnswerValues(1))
    calc.computeResults()
    expect(PRACTICE_NAMES).toEqual(calc.practiceNames)
  })

  it('matches assessmentCalculator business function order', () => {
    const calc = new assessmentCalculator(buildAnswerValues(1))
    expect([...BUSINESS_FUNCTIONS]).toEqual(calc.businessFunctionNames)
  })

  it('maps each practice to the correct business function', () => {
    expect(bfOfPractice('Strategy and Metrics')).toBe('Governance')
    expect(bfOfPractice('Threat Assessment')).toBe('Design')
    expect(bfOfPractice('Secure Build')).toBe('Implementation')
    expect(bfOfPractice('Security Testing')).toBe('Verification')
    expect(bfOfPractice('Incident Management')).toBe('Operations')
  })

  it('returns null for unknown practices', () => {
    expect(bfOfPractice('Not A Practice')).toBeNull()
    expect(findPractice('Not A Practice')).toBeNull()
  })

  it('has exactly 3 practices per business function', () => {
    BUSINESS_FUNCTIONS.forEach(bf => {
      expect(PRACTICE_CATALOG.filter(p => p.bf === bf)).toHaveLength(3)
    })
  })
})
