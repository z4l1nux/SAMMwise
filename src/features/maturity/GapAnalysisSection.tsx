import React, { useEffect, useMemo, useState } from 'react';
import { Radar, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, RadialLinearScale,
    PointElement, LineElement, BarElement,
    Title, Tooltip, Legend, Filler,
} from 'chart.js';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Target } from 'lucide-react';
import { computeGap, topGaps, type GapSummary } from './gapAnalysis';
import { loadTargets } from './targets';
import type { ScorePayload } from '../../types';

ChartJS.register(
    CategoryScale, LinearScale, RadialLinearScale,
    PointElement, LineElement, BarElement,
    Title, Tooltip, Legend, Filler,
);

interface GapAnalysisSectionProps {
    scorePayload: ScorePayload;
}

function gapColor(gap: number): string {
    if (gap <= 0) return '#68d391';      // met or exceeded target
    if (gap < 0.75) return '#f6ad55';    // small shortfall
    if (gap < 1.5) return '#fc8181';     // moderate shortfall
    return '#e53e3e';                    // large shortfall
}

/**
 * Renders the current-vs-target gap analysis on the results page. Reads the
 * locally-stored maturity targets, compares them to the current assessment, and
 * shows a radar overlay, a "largest gaps" bar chart and a sortable shortfall
 * table. Renders an empty state (with a link to /targets) when no goals are set.
 */
export default function GapAnalysisSection({ scorePayload }: GapAnalysisSectionProps) {
    const t = useTranslations('maturity');
    const tCharts = useTranslations('charts');
    const [summary, setSummary] = useState<GapSummary | null>(null);

    useEffect(() => {
        const targets = loadTargets();
        setSummary(computeGap({
            practiceNames: scorePayload.practiceNames,
            practiceScores: scorePayload.practiceScores,
            overallScore: scorePayload.overallScore,
            targets,
        }));
    }, [scorePayload]);

    const practiceLabel = (name: string) => {
        const key = `practices.${name}`;
        const label = tCharts(key);
        return label === key ? name : label;
    };

    const radarData = useMemo(() => {
        if (!summary) return null;
        return {
            labels: summary.byPractice.map(p => practiceLabel(p.practice)),
            datasets: [
                {
                    label: t('gapCurrent'),
                    data: summary.byPractice.map(p => p.current),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                },
                {
                    label: t('gapTarget'),
                    data: summary.byPractice.map(p => p.target),
                    backgroundColor: 'rgba(0, 229, 255, 0.15)',
                    borderColor: 'rgba(0, 229, 255, 0.9)',
                    pointBackgroundColor: 'rgba(0, 229, 255, 0.9)',
                    pointBorderColor: '#fff',
                },
            ],
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [summary]);

    const top = useMemo(() => (summary ? topGaps(summary, 10) : []), [summary]);

    const barData = useMemo(() => ({
        labels: top.map(p => practiceLabel(p.practice)),
        datasets: [{
            label: t('gapColumn'),
            data: top.map(p => p.gap),
            backgroundColor: top.map(p => gapColor(p.gap)),
            borderColor: top.map(p => gapColor(p.gap)),
            borderWidth: 1,
        }],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [top]);

    const radarOptions = {
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 3,
                grid: { color: 'rgba(255, 255, 255, 0.15)' },
                angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                ticks: { color: '#94a3b8', backdropColor: 'transparent', font: { size: 11 } },
                pointLabels: { color: '#e2e8f0', font: { size: 11 } },
            },
        },
        plugins: { legend: { labels: { color: '#e2e8f0' } } },
    };

    const barOptions = {
        indexAxis: 'y' as const,
        aspectRatio: 1.6,
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: { suggestedMin: 0, suggestedMax: 3, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#e2e8f0' } },
        },
        plugins: { legend: { display: false }, title: { color: '#e2e8f0' } },
    };

    if (!summary) return null;

    const hasTargets = summary.coverage.practicesWithTarget > 0;
    const targetedRows = summary.byPractice
        .filter(p => p.hasTarget)
        .sort((a, b) => b.gap - a.gap);

    return (
        <div id="gapAnalysisSection" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 mb-7 shadow-xl">
            <h2 className="m-0 mb-1 flex items-center gap-2 text-slate-200 font-[Poppins] font-semibold text-lg">
                <Target className="w-5 h-5 text-cyan-400" /> {t('gapTitle')}
            </h2>
            <p className="text-slate-400 text-sm mb-5">{t('gapSubtitle')}</p>

            {!hasTargets ? (
                <div className="text-center py-8 px-4 bg-white/5 rounded-xl border border-dashed border-white/15">
                    <p className="text-slate-300 mb-4">{t('gapNoTargets')}</p>
                    <Link href="/targets" className="no-print btn inline-block">{t('gapSetTargets')}</Link>
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex-1 min-w-[150px] bg-white/5 rounded-xl p-4 text-center">
                            <div className="text-xs uppercase tracking-wide text-slate-400">{t('overallCurrent')}</div>
                            <div className="text-2xl font-bold text-slate-100">{summary.overall.current.toFixed(2)}</div>
                        </div>
                        <div className="flex-1 min-w-[150px] bg-white/5 rounded-xl p-4 text-center">
                            <div className="text-xs uppercase tracking-wide text-slate-400">{t('overallTarget')}</div>
                            <div className="text-2xl font-bold text-cyan-300">{summary.overall.target.toFixed(2)}</div>
                        </div>
                        <div className="flex-1 min-w-[150px] bg-white/5 rounded-xl p-4 text-center">
                            <div className="text-xs uppercase tracking-wide text-slate-400">{t('overallGap')}</div>
                            <div className="text-2xl font-bold" style={{ color: gapColor(summary.overall.gap) }}>
                                {summary.overall.gap > 0 ? '+' : ''}{summary.overall.gap.toFixed(2)}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[150px] bg-white/5 rounded-xl p-4 text-center">
                            <div className="text-xs uppercase tracking-wide text-slate-400">{t('coverageLabel')}</div>
                            <div className="text-2xl font-bold text-slate-100">
                                {summary.coverage.practicesWithTarget}/{summary.coverage.totalPractices}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-2">
                        <div className="flex-[1_1_45%] min-w-[280px]">
                            <h3 className="text-sm text-slate-400 font-semibold mb-3 uppercase tracking-[0.05em]">{t('gapRadarTitle')}</h3>
                            {radarData && <Radar data={radarData} options={radarOptions} />}
                        </div>
                        {top.length > 0 && (
                            <div className="flex-[1_1_45%] min-w-[280px]">
                                <h3 className="text-sm text-slate-400 font-semibold mb-3 uppercase tracking-[0.05em]">{t('gapTopTitle')}</h3>
                                <Bar data={barData} options={barOptions} />
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto mt-6">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-white/5">
                                    <th className="px-3.5 py-2.5 text-left text-slate-400 font-bold border-b-2 border-white/10">{t('practiceLabel')}</th>
                                    <th className="px-3.5 py-2.5 text-center text-slate-400 font-bold border-b-2 border-white/10">{t('overallCurrent')}</th>
                                    <th className="px-3.5 py-2.5 text-center text-slate-400 font-bold border-b-2 border-white/10">{t('overallTarget')}</th>
                                    <th className="px-3.5 py-2.5 text-center text-slate-400 font-bold border-b-2 border-white/10">{t('gapColumn')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targetedRows.map((row, i) => (
                                    <tr key={row.practice} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/3'}>
                                        <td className="px-3.5 py-2 text-slate-300 font-medium border-b border-white/5">{practiceLabel(row.practice)}</td>
                                        <td className="px-3.5 py-2 text-center text-slate-300 border-b border-white/5">{row.current.toFixed(2)}</td>
                                        <td className="px-3.5 py-2 text-center text-cyan-300 border-b border-white/5">{row.target.toFixed(2)}</td>
                                        <td className="px-3.5 py-2 text-center border-b border-white/5">
                                            {row.gap <= 0 ? (
                                                <span className="text-xs font-semibold text-green-400">{t('onTarget')}</span>
                                            ) : (
                                                <span className="font-bold rounded-full px-2.5 py-0.5" style={{ color: gapColor(row.gap), background: gapColor(row.gap) + '30' }}>
                                                    +{row.gap.toFixed(2)}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="no-print text-center mt-5">
                        <Link href="/targets" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">{t('gapEditTargets')} →</Link>
                    </div>
                </>
            )}
        </div>
    );
}
