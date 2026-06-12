/**
 * Action plans — remediation tasks attached to a SAMM practice, used to close the
 * gap between current maturity and the target. Persisted in `localStorage` so they
 * survive across assessments on the same device, in keeping with SAMMwise's
 * zero-server, privacy-first design.
 */

import { findPractice } from './practiceCatalog';

export const ACTION_PLANS_STORAGE_KEY = 'sammwise_action_plans';

export const ACTION_STATUSES = ['pending', 'in_progress', 'blocked', 'done', 'cancelled'] as const;
export type ActionStatus = (typeof ACTION_STATUSES)[number];

export const ACTION_PRIORITIES = ['low', 'medium', 'high', 'critical'] as const;
export type ActionPriority = (typeof ACTION_PRIORITIES)[number];

export interface ActionPlan {
  id: string;
  /** Canonical practice name this task helps remediate. */
  practice: string;
  title: string;
  description?: string;
  owner?: string;
  /** Due date as `YYYY-MM-DD`, or empty if none. */
  dueDate?: string;
  status: ActionStatus;
  priority: ActionPriority;
  /** ISO timestamp of creation. */
  createdAt: string;
}

export interface ActionPlanInput {
  practice: string;
  title: string;
  description?: string;
  owner?: string;
  dueDate?: string;
  status?: ActionStatus;
  priority?: ActionPriority;
}

const CLOSED_STATUSES: ActionStatus[] = ['done', 'cancelled'];

function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `ap_${Date.now().toString(36)}${Math.floor(Math.random() * 1e9).toString(36)}`;
}

function isStatus(value: unknown): value is ActionStatus {
  return typeof value === 'string' && (ACTION_STATUSES as readonly string[]).includes(value);
}

function isPriority(value: unknown): value is ActionPriority {
  return typeof value === 'string' && (ACTION_PRIORITIES as readonly string[]).includes(value);
}

/** Reads saved action plans. SSR-safe — returns `[]` on the server. */
export function loadActionPlans(): ActionPlan[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(ACTION_PLANS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p): p is ActionPlan =>
      !!p && typeof p === 'object' &&
      typeof (p as ActionPlan).id === 'string' &&
      typeof (p as ActionPlan).title === 'string' &&
      isStatus((p as ActionPlan).status) &&
      isPriority((p as ActionPlan).priority),
    );
  } catch {
    return [];
  }
}

/** Persists the full list. No-op on the server. */
export function saveActionPlans(plans: ActionPlan[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ACTION_PLANS_STORAGE_KEY, JSON.stringify(plans));
}

/** Creates a plan from validated input and returns the new list. Throws on bad input. */
export function createActionPlan(plans: ActionPlan[], input: ActionPlanInput, now = new Date()): ActionPlan[] {
  if (!findPractice(input.practice)) throw new Error(`Unknown practice: ${input.practice}`);
  const title = input.title.trim();
  if (title.length < 2) throw new Error('Title must be at least 2 characters');

  const plan: ActionPlan = {
    id: newId(),
    practice: input.practice,
    title: title.slice(0, 180),
    description: input.description?.trim().slice(0, 4000) || undefined,
    owner: input.owner?.trim().slice(0, 120) || undefined,
    dueDate: input.dueDate || undefined,
    status: input.status && isStatus(input.status) ? input.status : 'pending',
    priority: input.priority && isPriority(input.priority) ? input.priority : 'medium',
    createdAt: now.toISOString(),
  };
  const next = [plan, ...plans];
  saveActionPlans(next);
  return next;
}

/** Patches a plan by id and returns the new list. */
export function updateActionPlan(plans: ActionPlan[], id: string, patch: Partial<ActionPlanInput>): ActionPlan[] {
  const next = plans.map(p => {
    if (p.id !== id) return p;
    return {
      ...p,
      ...(patch.title !== undefined ? { title: patch.title.trim().slice(0, 180) } : {}),
      ...(patch.description !== undefined ? { description: patch.description.trim().slice(0, 4000) || undefined } : {}),
      ...(patch.owner !== undefined ? { owner: patch.owner.trim().slice(0, 120) || undefined } : {}),
      ...(patch.dueDate !== undefined ? { dueDate: patch.dueDate || undefined } : {}),
      ...(patch.status && isStatus(patch.status) ? { status: patch.status } : {}),
      ...(patch.priority && isPriority(patch.priority) ? { priority: patch.priority } : {}),
    };
  });
  saveActionPlans(next);
  return next;
}

/** Deletes a plan by id and returns the new list. */
export function deleteActionPlan(plans: ActionPlan[], id: string): ActionPlan[] {
  const next = plans.filter(p => p.id !== id);
  saveActionPlans(next);
  return next;
}

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** A plan is overdue when its due date is past and it is neither done nor cancelled. */
export function isOverdue(plan: ActionPlan, today = new Date()): boolean {
  if (!plan.dueDate) return false;
  if (CLOSED_STATUSES.includes(plan.status)) return false;
  return plan.dueDate < toISODate(today);
}

/** Counts open (not done/cancelled) plans attached to a practice. */
export function openPlanCountByPractice(plans: ActionPlan[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of plans) {
    if (CLOSED_STATUSES.includes(p.status)) continue;
    counts[p.practice] = (counts[p.practice] ?? 0) + 1;
  }
  return counts;
}
