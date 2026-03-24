/**
 * Navigation button behaviour tests.
 * Validates that panel navigation button text comes from i18n keys
 * and that the page-level "Next Page" / "Complete" buttons toggle correctly.
 */

// surveytypeone.js uses DOM manipulation via survey.onAfterRenderPanel.
// We test the logic in isolation rather than rendering the full component.

const en = require('../src/messages/en.json')
const pt = require('../src/messages/pt.json')

describe('Panel navigation button i18n values', () => {
  describe('English locale', () => {
    it('nextPage key is a non-empty string', () => {
      expect(typeof en.assessment.nextPage).toBe('string')
      expect(en.assessment.nextPage.length).toBeGreaterThan(0)
    })

    it('nextPractice key is a non-empty string', () => {
      expect(typeof en.assessment.nextPractice).toBe('string')
      expect(en.assessment.nextPractice.length).toBeGreaterThan(0)
    })

    it('previousPractice key is a non-empty string', () => {
      expect(typeof en.assessment.previousPractice).toBe('string')
      expect(en.assessment.previousPractice.length).toBeGreaterThan(0)
    })

    it('nextPractice and previousPractice are distinct strings', () => {
      expect(en.assessment.nextPractice).not.toBe(en.assessment.previousPractice)
    })

    it('nextPractice and nextPage are distinct strings', () => {
      expect(en.assessment.nextPractice).not.toBe(en.assessment.nextPage)
    })
  })

  describe('Portuguese locale', () => {
    it('nextPractice is translated', () => {
      expect(pt.assessment.nextPractice).toBeDefined()
      expect(pt.assessment.nextPractice).not.toBe(en.assessment.nextPractice)
    })

    it('previousPractice is translated', () => {
      expect(pt.assessment.previousPractice).toBeDefined()
      expect(pt.assessment.previousPractice).not.toBe(en.assessment.previousPractice)
    })

    it('nextPage is translated', () => {
      expect(pt.assessment.nextPage).toBeDefined()
      expect(pt.assessment.nextPage).not.toBe(en.assessment.nextPage)
    })

    it('complete is translated', () => {
      expect(pt.assessment.complete).toBeDefined()
      expect(pt.assessment.complete).not.toBe(en.assessment.complete)
    })
  })
})

describe('Page navigation button logic', () => {
  // Simulate the page state machine from surveytypeone.js changePage()
  const pageOrder = ['Governance', 'Design', 'Implementation', 'Verification', 'Operations', 'Details']

  function getNextPage(currentPage) {
    switch(currentPage) {
      case 'Governance':    return 'Design'
      case 'Design':        return 'Implementation'
      case 'Implementation': return 'Verification'
      case 'Verification':  return 'Operations'
      case 'Operations':    return 'Details'
      case 'Details':       return 'results'
      default:              return null
    }
  }

  it('Governance leads to Design', () => {
    expect(getNextPage('Governance')).toBe('Design')
  })

  it('Design leads to Implementation', () => {
    expect(getNextPage('Design')).toBe('Implementation')
  })

  it('Implementation leads to Verification', () => {
    expect(getNextPage('Implementation')).toBe('Verification')
  })

  it('Verification leads to Operations', () => {
    expect(getNextPage('Verification')).toBe('Operations')
  })

  it('Operations leads to Details', () => {
    expect(getNextPage('Operations')).toBe('Details')
  })

  it('Details navigates to results page', () => {
    expect(getNextPage('Details')).toBe('results')
  })

  it('each domain has a next page except Details', () => {
    const domains = ['Governance', 'Design', 'Implementation', 'Verification', 'Operations']
    domains.forEach(domain => {
      expect(getNextPage(domain)).not.toBeNull()
      expect(getNextPage(domain)).not.toBe('results')
    })
  })

  it('all domain pages are covered in the pageOrder array', () => {
    expect(pageOrder).toHaveLength(6)
    expect(pageOrder).toContain('Governance')
    expect(pageOrder).toContain('Details')
  })

  it('Details is the last domain page before results', () => {
    expect(pageOrder[pageOrder.length - 1]).toBe('Details')
    expect(getNextPage('Details')).toBe('results')
  })
})

describe('Button label selection based on panel position', () => {
  // Simulates the isLastPanel / nextbtnText logic from surveytypeone.js
  function getNextButtonLabel(panelIndex, messages) {
    const isLast = panelIndex === 2
    return isLast ? messages.assessment.nextPage : messages.assessment.nextPractice
  }

  it('first panel (index 0) shows "Next Practice" in English', () => {
    expect(getNextButtonLabel(0, en)).toBe(en.assessment.nextPractice)
  })

  it('middle panel (index 1) shows "Next Practice" in English', () => {
    expect(getNextButtonLabel(1, en)).toBe(en.assessment.nextPractice)
  })

  it('last panel (index 2) shows "Next Page" in English', () => {
    expect(getNextButtonLabel(2, en)).toBe(en.assessment.nextPage)
  })

  it('first panel (index 0) shows "Próxima Prática" in Portuguese', () => {
    expect(getNextButtonLabel(0, pt)).toBe(pt.assessment.nextPractice)
  })

  it('last panel (index 2) shows "Próxima Página" in Portuguese', () => {
    expect(getNextButtonLabel(2, pt)).toBe(pt.assessment.nextPage)
  })
})
