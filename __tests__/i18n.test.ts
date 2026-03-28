/**
 * i18n completeness tests — ensures every key in en.json has a Portuguese counterpart
 * and validates critical translation keys exist.
 */

const en = require('../src/messages/en.json')
const pt = require('../src/messages/pt.json')

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      acc.push(...flattenKeys(value, fullKey))
    } else {
      acc.push(fullKey)
    }
    return acc
  }, [])
}

const enKeys = flattenKeys(en)
const ptKeys = flattenKeys(pt)

describe('i18n message files', () => {
  describe('structural completeness', () => {
    it('pt.json has all the keys present in en.json', () => {
      const missing = enKeys.filter(k => !ptKeys.includes(k))
      expect(missing).toEqual([])
    })

    it('en.json has all the keys present in pt.json (no orphaned PT keys)', () => {
      const extra = ptKeys.filter(k => !enKeys.includes(k))
      expect(extra).toEqual([])
    })

    it('both files have the same number of translation keys', () => {
      expect(enKeys.length).toBe(ptKeys.length)
    })
  })

  describe('assessment namespace — navigation button keys', () => {
    it('en.json has assessment.nextPractice', () => {
      expect(en.assessment.nextPractice).toBeDefined()
      expect(typeof en.assessment.nextPractice).toBe('string')
    })

    it('en.json has assessment.previousPractice', () => {
      expect(en.assessment.previousPractice).toBeDefined()
      expect(typeof en.assessment.previousPractice).toBe('string')
    })

    it('pt.json translates assessment.nextPractice', () => {
      expect(pt.assessment.nextPractice).toBeDefined()
      expect(pt.assessment.nextPractice).not.toBe(en.assessment.nextPractice)
    })

    it('pt.json translates assessment.previousPractice', () => {
      expect(pt.assessment.previousPractice).toBeDefined()
      expect(pt.assessment.previousPractice).not.toBe(en.assessment.previousPractice)
    })

    it('pt.json translates assessment.nextPage', () => {
      expect(pt.assessment.nextPage).toBeDefined()
      expect(pt.assessment.nextPage).not.toBe(en.assessment.nextPage)
    })
  })

  describe('charts namespace', () => {
    it('has all response label keys', () => {
      const requiredKeys = ['no', 'yesForSome', 'yesForMost', 'yesForAll']
      requiredKeys.forEach(key => {
        expect(en.charts.responseLabels[key]).toBeDefined()
        expect(pt.charts.responseLabels[key]).toBeDefined()
      })
    })

    it('has all maturity label keys', () => {
      const requiredKeys = ['bad', 'lessThanIdeal', 'okay', 'good']
      requiredKeys.forEach(key => {
        expect(en.charts.maturityLabels[key]).toBeDefined()
        expect(pt.charts.maturityLabels[key]).toBeDefined()
      })
    })

    it('has all 14 AISVS control labels', () => {
      for (let i = 1; i <= 14; i++) {
        const key = `Control ${i}`
        expect(en.charts.businessFunctions[key]).toBeDefined()
        expect(pt.charts.businessFunctions[key]).toBeDefined()
      }
    })

    it('has all 15 practice labels', () => {
      const practices = [
        'Strategy and Metrics', 'Policy and Compliance', 'Education and Guidance',
        'Threat Assessment', 'Security Requirements', 'Security Architecture',
        'Secure Build', 'Secure Deployment', 'Defect Management',
        'Architecture Assessment', 'Requirements Testing', 'Security Testing',
        'Incident Management', 'Environment Management', 'Operations Management',
      ]
      practices.forEach(p => {
        expect(en.charts.practices[p]).toBeDefined()
        expect(pt.charts.practices[p]).toBeDefined()
      })
    })

    it('pt translates currentAssessment differently from en', () => {
      expect(pt.charts.currentAssessment).not.toBe(en.charts.currentAssessment)
    })

    it('pt translates previousAssessment differently from en', () => {
      expect(pt.charts.previousAssessment).not.toBe(en.charts.previousAssessment)
    })
  })

  describe('upload namespace', () => {
    it('en has upload.dropzone', () => {
      expect(en.upload.dropzone).toBeDefined()
    })

    it('en has upload.errorFormat', () => {
      expect(en.upload.errorFormat).toBeDefined()
    })

    it('pt translates upload.dropzone', () => {
      expect(pt.upload.dropzone).not.toBe(en.upload.dropzone)
    })
  })

  describe('notFound namespace', () => {
    it('has title, subtitle and redirect keys in both locales', () => {
      ;['title', 'subtitle', 'redirect'].forEach(key => {
        expect(en.notFound[key]).toBeDefined()
        expect(pt.notFound[key]).toBeDefined()
      })
    })
  })

  describe('translation quality', () => {
    it('no translation value is an empty string', () => {
      const emptyEN = enKeys.filter(k => {
        const parts = k.split('.')
        let val = en
        for (const p of parts) val = val[p]
        return val === ''
      })
      expect(emptyEN).toEqual([])
    })

    it('pt nav translations differ from en (actually translated)', () => {
      expect(pt.nav.home).not.toBe(en.nav.home)
      expect(pt.nav.assessment).not.toBe(en.nav.assessment)
      expect(pt.nav.results).not.toBe(en.nav.results)
    })
  })
})
