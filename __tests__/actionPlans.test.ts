import {
  loadActionPlans,
  saveActionPlans,
  createActionPlan,
  updateActionPlan,
  deleteActionPlan,
  isOverdue,
  openPlanCountByPractice,
  ACTION_PLANS_STORAGE_KEY,
  type ActionPlan,
} from '../src/features/maturity/actionPlans'

describe('actionPlans', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('load/save', () => {
    it('returns [] when nothing is stored', () => {
      expect(loadActionPlans()).toEqual([])
    })

    it('survives malformed JSON', () => {
      window.localStorage.setItem(ACTION_PLANS_STORAGE_KEY, 'not json')
      expect(loadActionPlans()).toEqual([])
    })

    it('drops entries with invalid status/priority', () => {
      window.localStorage.setItem(
        ACTION_PLANS_STORAGE_KEY,
        JSON.stringify([
          { id: 'a', title: 'ok', practice: 'Secure Build', status: 'pending', priority: 'high' },
          { id: 'b', title: 'bad', practice: 'Secure Build', status: 'nope', priority: 'high' },
        ]),
      )
      const loaded = loadActionPlans()
      expect(loaded).toHaveLength(1)
      expect(loaded[0].id).toBe('a')
    })
  })

  describe('createActionPlan', () => {
    it('creates a plan with defaults and persists it', () => {
      const next = createActionPlan([], { practice: 'Secure Build', title: 'Harden CI' })
      expect(next).toHaveLength(1)
      expect(next[0]).toMatchObject({
        practice: 'Secure Build',
        title: 'Harden CI',
        status: 'pending',
        priority: 'medium',
      })
      expect(next[0].id).toBeTruthy()
      expect(loadActionPlans()).toHaveLength(1)
    })

    it('prepends new plans (newest first)', () => {
      let list = createActionPlan([], { practice: 'Secure Build', title: 'First' })
      list = createActionPlan(list, { practice: 'Secure Build', title: 'Second' })
      expect(list[0].title).toBe('Second')
    })

    it('rejects unknown practices', () => {
      expect(() => createActionPlan([], { practice: 'Nope', title: 'x' })).toThrow()
    })

    it('rejects titles shorter than 2 chars', () => {
      expect(() => createActionPlan([], { practice: 'Secure Build', title: 'a' })).toThrow()
    })

    it('honours explicit status and priority', () => {
      const next = createActionPlan([], {
        practice: 'Secure Build',
        title: 'Task',
        status: 'in_progress',
        priority: 'critical',
      })
      expect(next[0].status).toBe('in_progress')
      expect(next[0].priority).toBe('critical')
    })
  })

  describe('updateActionPlan', () => {
    it('patches an existing plan', () => {
      const created = createActionPlan([], { practice: 'Secure Build', title: 'Task' })
      const id = created[0].id
      const updated = updateActionPlan(created, id, { status: 'done', owner: 'Diego' })
      expect(updated[0].status).toBe('done')
      expect(updated[0].owner).toBe('Diego')
      expect(loadActionPlans()[0].status).toBe('done')
    })

    it('ignores invalid status patches', () => {
      const created = createActionPlan([], { practice: 'Secure Build', title: 'Task' })
      const updated = updateActionPlan(created, created[0].id, { status: 'bogus' as never })
      expect(updated[0].status).toBe('pending')
    })
  })

  describe('deleteActionPlan', () => {
    it('removes a plan by id', () => {
      const created = createActionPlan([], { practice: 'Secure Build', title: 'Task' })
      const next = deleteActionPlan(created, created[0].id)
      expect(next).toHaveLength(0)
      expect(loadActionPlans()).toHaveLength(0)
    })
  })

  describe('isOverdue', () => {
    const base: ActionPlan = {
      id: 'x', practice: 'Secure Build', title: 'Task',
      status: 'pending', priority: 'medium', createdAt: '2026-01-01T00:00:00.000Z',
    }
    const today = new Date('2026-06-12T12:00:00.000Z')

    it('is true for a past due date on an open plan', () => {
      expect(isOverdue({ ...base, dueDate: '2026-06-01' }, today)).toBe(true)
    })
    it('is false for a future due date', () => {
      expect(isOverdue({ ...base, dueDate: '2026-12-01' }, today)).toBe(false)
    })
    it('is false with no due date', () => {
      expect(isOverdue(base, today)).toBe(false)
    })
    it('is false when done or cancelled even if past due', () => {
      expect(isOverdue({ ...base, dueDate: '2026-06-01', status: 'done' }, today)).toBe(false)
      expect(isOverdue({ ...base, dueDate: '2026-06-01', status: 'cancelled' }, today)).toBe(false)
    })
  })

  describe('openPlanCountByPractice', () => {
    it('counts only open plans per practice', () => {
      const plans: ActionPlan[] = [
        { ...{ id: '1', practice: 'Secure Build', title: 't', priority: 'low', createdAt: '' }, status: 'pending' },
        { ...{ id: '2', practice: 'Secure Build', title: 't', priority: 'low', createdAt: '' }, status: 'done' },
        { ...{ id: '3', practice: 'Threat Assessment', title: 't', priority: 'low', createdAt: '' }, status: 'in_progress' },
      ]
      const counts = openPlanCountByPractice(plans)
      expect(counts['Secure Build']).toBe(1)
      expect(counts['Threat Assessment']).toBe(1)
    })
  })
})
