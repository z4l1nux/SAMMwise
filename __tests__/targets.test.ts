import {
  clampTarget,
  loadTargets,
  saveTargets,
  setTarget,
  resetTarget,
  clearTargets,
  TARGETS_STORAGE_KEY,
  type TargetsMap,
} from '../src/features/maturity/targets'

describe('targets', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('clampTarget', () => {
    it('clamps below 0 up to 0', () => {
      expect(clampTarget(-1)).toBe(0)
    })
    it('clamps above 3 down to 3', () => {
      expect(clampTarget(5)).toBe(3)
    })
    it('rounds to the nearest 0.25 step', () => {
      expect(clampTarget(1.1)).toBe(1)
      expect(clampTarget(1.13)).toBe(1.25)
      expect(clampTarget(2.6)).toBe(2.5)
    })
    it('returns 0 for non-finite input', () => {
      expect(clampTarget(NaN)).toBe(0)
      expect(clampTarget(Infinity)).toBe(0)
    })
  })

  describe('load/save round-trip', () => {
    it('returns {} when nothing is stored', () => {
      expect(loadTargets()).toEqual({})
    })

    it('persists and reloads a valid map', () => {
      const map: TargetsMap = { 'Strategy and Metrics': { target: 2, notes: 'goal' } }
      saveTargets(map)
      expect(loadTargets()).toEqual(map)
    })

    it('drops unknown practices on load', () => {
      window.localStorage.setItem(
        TARGETS_STORAGE_KEY,
        JSON.stringify({ 'Bogus Practice': { target: 2 }, 'Secure Build': { target: 1 } }),
      )
      const loaded = loadTargets()
      expect(loaded['Bogus Practice']).toBeUndefined()
      expect(loaded['Secure Build']).toEqual({ target: 1, notes: undefined })
    })

    it('clamps out-of-range targets on load', () => {
      window.localStorage.setItem(
        TARGETS_STORAGE_KEY,
        JSON.stringify({ 'Secure Build': { target: 9 } }),
      )
      expect(loadTargets()['Secure Build'].target).toBe(3)
    })

    it('survives malformed JSON', () => {
      window.localStorage.setItem(TARGETS_STORAGE_KEY, '{not json')
      expect(loadTargets()).toEqual({})
    })
  })

  describe('setTarget', () => {
    it('upserts and persists a target', () => {
      const next = setTarget({}, 'Threat Assessment', 1.5, 'reach defined')
      expect(next['Threat Assessment']).toEqual({ target: 1.5, notes: 'reach defined' })
      expect(loadTargets()['Threat Assessment'].target).toBe(1.5)
    })

    it('ignores unknown practices', () => {
      const next = setTarget({}, 'Nope', 2)
      expect(next).toEqual({})
    })

    it('clamps the value', () => {
      const next = setTarget({}, 'Secure Build', 4)
      expect(next['Secure Build'].target).toBe(3)
    })
  })

  describe('resetTarget', () => {
    it('removes a target and persists', () => {
      const seeded = setTarget({}, 'Secure Build', 2)
      const next = resetTarget(seeded, 'Secure Build')
      expect(next['Secure Build']).toBeUndefined()
      expect(loadTargets()['Secure Build']).toBeUndefined()
    })
  })

  describe('clearTargets', () => {
    it('wipes all targets', () => {
      saveTargets({ 'Secure Build': { target: 2 } })
      clearTargets()
      expect(loadTargets()).toEqual({})
    })
  })
})
