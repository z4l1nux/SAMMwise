import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Trash2, AlertTriangle, X } from 'lucide-react';
import {
    BUSINESS_FUNCTIONS,
    PRACTICE_CATALOG,
} from './practiceCatalog';
import {
    loadActionPlans,
    createActionPlan,
    updateActionPlan,
    deleteActionPlan,
    isOverdue,
    ACTION_STATUSES,
    ACTION_PRIORITIES,
    type ActionPlan,
    type ActionStatus,
    type ActionPriority,
    type ActionPlanInput,
} from './actionPlans';

const PRIORITY_COLOR: Record<ActionPriority, string> = {
    low: '#68d391',
    medium: '#4299e1',
    high: '#f6ad55',
    critical: '#fc8181',
};

const STATUS_COLOR: Record<ActionStatus, string> = {
    pending: '#94a3b8',
    in_progress: '#4299e1',
    blocked: '#fc8181',
    done: '#68d391',
    cancelled: '#64748b',
};

const EMPTY_FORM: ActionPlanInput = {
    practice: PRACTICE_CATALOG[0].name,
    title: '',
    description: '',
    owner: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
};

/**
 * Full CRUD for remediation action plans, persisted to localStorage. Supports a
 * create form, inline status/priority editing, practice/status/priority filters
 * and overdue highlighting.
 */
export default function ActionPlansManager() {
    const t = useTranslations('maturity');
    const tCharts = useTranslations('charts');
    const [plans, setPlans] = useState<ActionPlan[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<ActionPlanInput>(EMPTY_FORM);
    const [formError, setFormError] = useState('');
    const [filterPractice, setFilterPractice] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');

    useEffect(() => {
        setPlans(loadActionPlans());
    }, []);

    const practiceLabel = (name: string) => {
        const key = `practices.${name}`;
        const val = tCharts(key);
        return val === key ? name : val;
    };
    const bfLabel = (name: string) => {
        const key = `businessFunctions.${name}`;
        const val = tCharts(key);
        return val === key ? name : val;
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setPlans(createActionPlan(plans, form));
            setForm(EMPTY_FORM);
            setShowForm(false);
            setFormError('');
        } catch (err) {
            setFormError(err instanceof Error ? err.message : t('formError'));
        }
    };

    const patch = (id: string, p: Partial<ActionPlanInput>) => setPlans(updateActionPlan(plans, id, p));

    const remove = (id: string) => {
        if (typeof window !== 'undefined' && !window.confirm(t('deleteConfirm'))) return;
        setPlans(deleteActionPlan(plans, id));
    };

    const filtered = useMemo(() => plans.filter(p =>
        (!filterPractice || p.practice === filterPractice) &&
        (!filterStatus || p.status === filterStatus) &&
        (!filterPriority || p.priority === filterPriority),
    ), [plans, filterPractice, filterStatus, filterPriority]);

    const practiceSelect = (value: string, onChange: (v: string) => void, includeAll = false) => (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/40"
        >
            {includeAll && <option value="">{t('filterAllPractices')}</option>}
            {BUSINESS_FUNCTIONS.map(bf => (
                <optgroup key={bf} label={bfLabel(bf)}>
                    {PRACTICE_CATALOG.filter(p => p.bf === bf).map(p => (
                        <option key={p.name} value={p.name}>{practiceLabel(p.name)}</option>
                    ))}
                </optgroup>
            ))}
        </select>
    );

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex flex-wrap gap-2 no-print">
                    {practiceSelect(filterPractice, setFilterPractice, true)}
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/40"
                    >
                        <option value="">{t('filterAllStatuses')}</option>
                        {ACTION_STATUSES.map(s => <option key={s} value={s}>{t(`status.${s}`)}</option>)}
                    </select>
                    <select
                        value={filterPriority}
                        onChange={e => setFilterPriority(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/40"
                    >
                        <option value="">{t('filterAllPriorities')}</option>
                        {ACTION_PRIORITIES.map(p => <option key={p} value={p}>{t(`priority.${p}`)}</option>)}
                    </select>
                </div>
                <button
                    onClick={() => { setShowForm(s => !s); setFormError(''); }}
                    className="no-print btn inline-flex items-center gap-1.5"
                >
                    {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showForm ? t('cancel') : t('addPlan')}
                </button>
            </div>

            {showForm && (
                <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
                    <h3 className="text-slate-200 font-semibold">{t('newPlan')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-xs text-slate-400">{t('practiceLabel')}</span>
                            <div className="mt-1">{practiceSelect(form.practice, v => setForm(f => ({ ...f, practice: v })))}</div>
                        </label>
                        <label className="block">
                            <span className="text-xs text-slate-400">{t('titleLabel')}</span>
                            <input
                                type="text" required minLength={2} maxLength={180}
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder={t('titlePlaceholder')}
                                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
                            />
                        </label>
                        <label className="block">
                            <span className="text-xs text-slate-400">{t('ownerLabel')}</span>
                            <input
                                type="text" maxLength={120}
                                value={form.owner}
                                onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
                                placeholder={t('ownerPlaceholder')}
                                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
                            />
                        </label>
                        <label className="block">
                            <span className="text-xs text-slate-400">{t('dueDateLabel')}</span>
                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/40"
                            />
                        </label>
                        <label className="block">
                            <span className="text-xs text-slate-400">{t('statusLabel')}</span>
                            <select
                                value={form.status}
                                onChange={e => setForm(f => ({ ...f, status: e.target.value as ActionStatus }))}
                                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/40"
                            >
                                {ACTION_STATUSES.map(s => <option key={s} value={s}>{t(`status.${s}`)}</option>)}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-xs text-slate-400">{t('priorityLabel')}</span>
                            <select
                                value={form.priority}
                                onChange={e => setForm(f => ({ ...f, priority: e.target.value as ActionPriority }))}
                                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/40"
                            >
                                {ACTION_PRIORITIES.map(p => <option key={p} value={p}>{t(`priority.${p}`)}</option>)}
                            </select>
                        </label>
                    </div>
                    <label className="block">
                        <span className="text-xs text-slate-400">{t('descriptionLabel')}</span>
                        <textarea
                            rows={2} maxLength={4000}
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40 resize-y"
                        />
                    </label>
                    {formError && <p className="text-red-400 text-sm">{formError}</p>}
                    <button type="submit" className="btn">{t('save')}</button>
                </form>
            )}

            {filtered.length === 0 ? (
                <div className="text-center py-10 px-4 bg-white/5 rounded-xl border border-dashed border-white/15">
                    <p className="text-slate-400">{plans.length === 0 ? t('noPlans') : t('noPlansForFilter')}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map(plan => {
                        const overdue = isOverdue(plan);
                        return (
                            <div key={plan.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="flex-1 min-w-[200px]">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span
                                                className="text-[11px] font-bold rounded-full px-2 py-0.5 uppercase tracking-wide"
                                                style={{ color: PRIORITY_COLOR[plan.priority], background: PRIORITY_COLOR[plan.priority] + '22' }}
                                            >
                                                {t(`priority.${plan.priority}`)}
                                            </span>
                                            <span className="text-slate-100 font-semibold">{plan.title}</span>
                                            {overdue && (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-300 bg-red-500/15 rounded-full px-2 py-0.5">
                                                    <AlertTriangle className="w-3 h-3" /> {t('overdue')}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">
                                            {practiceLabel(plan.practice)}
                                            {plan.owner ? ` · ${plan.owner}` : ''}
                                            {plan.dueDate ? ` · ${t('dueShort')} ${plan.dueDate}` : ''}
                                        </div>
                                        {plan.description && (
                                            <p className="text-sm text-slate-300 mt-2">{plan.description}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 no-print">
                                        <select
                                            value={plan.status}
                                            onChange={e => patch(plan.id, { status: e.target.value as ActionStatus })}
                                            className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-400/40"
                                            style={{ color: STATUS_COLOR[plan.status] }}
                                        >
                                            {ACTION_STATUSES.map(s => <option key={s} value={s} style={{ color: '#e2e8f0', background: '#1e212b' }}>{t(`status.${s}`)}</option>)}
                                        </select>
                                        <button
                                            onClick={() => remove(plan.id)}
                                            title={t('delete')}
                                            className="p-1.5 rounded-md text-slate-500 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
