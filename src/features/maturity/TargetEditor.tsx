import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, RotateCcw } from 'lucide-react';
import {
    BUSINESS_FUNCTIONS,
    PRACTICE_CATALOG,
    MAX_SCORE,
    type BusinessFunction,
} from './practiceCatalog';
import {
    loadTargets,
    saveTargets,
    setTarget,
    resetTarget,
    clearTargets,
    clampTarget,
    type TargetsMap,
} from './targets';

const PRESETS = [1, 2, 3] as const;

/**
 * Per-practice maturity target editor. Auto-persists to localStorage on every
 * change (targets are durable, device-local config). Grouped by business
 * function, with presets ("set all to N") and per-row reset.
 */
export default function TargetEditor() {
    const t = useTranslations('maturity');
    const tCharts = useTranslations('charts');
    const [targets, setTargets] = useState<TargetsMap>({});
    const [savedFlash, setSavedFlash] = useState(false);

    useEffect(() => {
        setTargets(loadTargets());
    }, []);

    const flashSaved = () => {
        setSavedFlash(true);
        window.setTimeout(() => setSavedFlash(false), 1500);
    };

    const label = (ns: 'practices' | 'businessFunctions', name: string) => {
        const key = `${ns}.${name}`;
        const val = tCharts(key);
        return val === key ? name : val;
    };

    const onTargetChange = (practice: string, raw: number) => {
        const next = setTarget(targets, practice, raw, targets[practice]?.notes);
        setTargets(next);
        flashSaved();
    };

    const onNotesChange = (practice: string, notes: string) => {
        const current = targets[practice]?.target;
        if (typeof current !== 'number') return; // notes only meaningful with a target
        const next = setTarget(targets, practice, current, notes);
        setTargets(next);
    };

    const onReset = (practice: string) => {
        const next = resetTarget(targets, practice);
        setTargets(next);
        flashSaved();
    };

    const applyPreset = (value: number) => {
        const next: TargetsMap = {};
        for (const p of PRACTICE_CATALOG) {
            next[p.name] = { target: clampTarget(value), notes: targets[p.name]?.notes };
        }
        saveTargets(next);
        setTargets(next);
        flashSaved();
    };

    const onClearAll = () => {
        clearTargets();
        setTargets({});
        flashSaved();
    };

    const coverage = Object.keys(targets).length;

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className="text-slate-400 text-sm">
                    {t('coverageSummary', { count: coverage, total: PRACTICE_CATALOG.length })}
                    {savedFlash && (
                        <span className="ml-3 inline-flex items-center gap-1 text-green-400 text-xs font-semibold">
                            <Check className="w-3.5 h-3.5" /> {t('saved')}
                        </span>
                    )}
                </p>
                <div className="flex items-center gap-2 no-print">
                    <span className="text-xs text-slate-500">{t('presetLabel')}</span>
                    {PRESETS.map(p => (
                        <button
                            key={p}
                            onClick={() => applyPreset(p)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-sm hover:bg-white/10 transition-colors"
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={onClearAll}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        {t('clearAll')}
                    </button>
                </div>
            </div>

            {BUSINESS_FUNCTIONS.map((bf: BusinessFunction) => (
                <div key={bf} className="mb-7">
                    <h3 className="text-sm text-cyan-400 font-semibold mb-3 uppercase tracking-[0.05em]">
                        {label('businessFunctions', bf)}
                    </h3>
                    <div className="space-y-3">
                        {PRACTICE_CATALOG.filter(p => p.bf === bf).map(practice => {
                            const entry = targets[practice.name];
                            const value = entry?.target ?? 0;
                            const hasTarget = typeof entry?.target === 'number';
                            return (
                                <div key={practice.name} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex-1 min-w-[180px] text-slate-200 font-medium">
                                            {label('practices', practice.name)}
                                        </div>
                                        <div className="flex items-center gap-3 flex-1 min-w-[220px]">
                                            <input
                                                type="range"
                                                min={0}
                                                max={MAX_SCORE}
                                                step={0.25}
                                                value={value}
                                                onChange={e => onTargetChange(practice.name, parseFloat(e.target.value))}
                                                className="flex-1 accent-cyan-400 cursor-pointer"
                                                aria-label={label('practices', practice.name)}
                                            />
                                            <span
                                                className="w-12 text-center font-bold rounded-md px-2 py-0.5 text-sm"
                                                style={{
                                                    color: hasTarget ? '#00e5ff' : '#64748b',
                                                    background: hasTarget ? 'rgba(0,229,255,0.1)' : 'transparent',
                                                }}
                                            >
                                                {hasTarget ? value.toFixed(2) : '—'}
                                            </span>
                                            <button
                                                onClick={() => onReset(practice.name)}
                                                disabled={!hasTarget}
                                                title={t('reset')}
                                                className="no-print p-1.5 rounded-md text-slate-500 hover:text-red-300 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    {hasTarget && (
                                        <input
                                            type="text"
                                            value={entry?.notes ?? ''}
                                            onChange={e => onNotesChange(practice.name, e.target.value)}
                                            placeholder={t('notesPlaceholder')}
                                            maxLength={2000}
                                            className="mt-3 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
