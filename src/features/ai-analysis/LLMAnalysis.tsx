import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Bot, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { decryptApiKey } from './llmCrypto';
import { loadLLMSettings } from './LLMSettings';
import { buildPrompt } from './llmPrompt';
import type { ScorePayload, PreviousPayload, AnalysisResult } from '../../types';

interface LLMAnalysisProps {
    scorePayload: ScorePayload;
    previous: PreviousPayload | null;
    locale: string;
    storedAnalysis: AnalysisResult | null;
    onAnalysisGenerated?: (analysis: AnalysisResult) => void;
    autoTrigger?: boolean;
}

export default function LLMAnalysis({
    scorePayload,
    previous,
    locale,
    storedAnalysis,
    onAnalysisGenerated,
    autoTrigger,
}: LLMAnalysisProps) {
    const t = useTranslations('llm');
    const [analysis,  setAnalysis]  = useState<AnalysisResult | null>(storedAnalysis || null);
    const [loading,   setLoading]   = useState(false);
    const [error,     setError]     = useState('');
    const [collapsed, setCollapsed] = useState(false);

    const getSettings = () => loadLLMSettings();
    const isConfigured = (() => {
        const s = getSettings();
        return !!s?.encryptedKey || s?.provider === 'ollama';
    })();

    useEffect(() => {
        if (autoTrigger && isConfigured && !analysis) {
            runAnalysis();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoTrigger]);

    const runAnalysis = async () => {
        const settings = getSettings();
        if (!settings) { setError(t('notConfigured')); return; }
        setLoading(true);
        setError('');
        try {
            let apiKey = '';
            if (settings.provider !== 'ollama') {
                apiKey = (await decryptApiKey(settings.encryptedKey || '')) ?? '';
                if (!apiKey) { setError(t('decryptError')); setLoading(false); return; }
            }

            const prompt = buildPrompt({ ...scorePayload, previous, locale });

            const res = await fetch('/api/llm', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    provider:  settings.provider,
                    apiKey,
                    model:     settings.model,
                    ollamaUrl: settings.ollamaUrl,
                    prompt,
                }),
            });

            if (!res.ok) {
                const { error: e } = await res.json().catch(() => ({}));
                throw new Error(e || `HTTP ${res.status}`);
            }

            const { analysis: text } = await res.json();
            const analysisObj: AnalysisResult = {
                timestamp: new Date().toISOString(),
                provider:  settings.provider,
                model:     settings.model,
                analysis:  text,
            };
            setAnalysis(analysisObj);
            onAnalysisGenerated?.(analysisObj);
        } catch (err: any) {
            setError(err.message || t('genericError'));
        } finally {
            setLoading(false);
        }
    };

    const escapeHtml = (raw: string): string =>
        raw
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

    const applyInline = (text: string): string =>
        escapeHtml(text)
            .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e2e8f0">$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code style="background:rgba(0,229,255,0.1);color:#00e5ff;padding:1px 4px;border-radius:3px;font-size:13px">$1</code>');

    const renderMarkdown = (text: string): React.ReactNode[] => {
        const lines = text.split('\n');
        const els: React.ReactNode[] = [];
        let listBuffer: string[] = [];

        const flushList = (flushIdx: number | string) => {
            if (listBuffer.length) {
                els.push(<ul key={`list-${flushIdx}`} style={{ paddingLeft: '20px', margin: '4px 0 10px' }}>
                    {listBuffer.map((item, i) => (
                        <li key={i} style={{ marginBottom: '4px', fontSize: '14px', lineHeight: 1.6, color: '#cbd5e0' }}
                            dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>);
                listBuffer = [];
            }
        };

        lines.forEach((line, idx) => {
            if (line.startsWith('## ')) {
                flushList(idx);
                els.push(<h3 key={`line-${idx}`} style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', margin: '16px 0 6px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>{line.slice(3)}</h3>);
            } else if (line.startsWith('### ') || line.startsWith('#### ')) {
                flushList(idx);
                const level = line.startsWith('#### ') ? 5 : 4;
                els.push(<h4 key={`line-${idx}`} style={{ fontSize: '14px', fontWeight: 700, color: '#00e5ff', margin: '12px 0 4px' }}>{line.slice(level)}</h4>);
            } else if (line.startsWith('**') && line.endsWith('**')) {
                flushList(idx);
                els.push(<p key={`line-${idx}`} style={{ fontWeight: 700, fontSize: '14px', color: '#e2e8f0', margin: '10px 0 2px' }}>{line.slice(2, -2)}</p>);
            } else if (/^[\-\*] /.test(line)) {
                listBuffer.push(applyInline(line.slice(2)));
            } else if (line.trim() === '' || line.startsWith('---')) {
                flushList(idx);
            } else if (line.trim()) {
                flushList(idx);
                els.push(<p key={`line-${idx}`} style={{ fontSize: '14px', lineHeight: 1.7, color: '#cbd5e0', margin: '4px 0' }}
                    dangerouslySetInnerHTML={{ __html: applyInline(line) }} />);
            }
        });
        flushList('end');
        return els;
    };

    const cardStyle: React.CSSProperties = {
        background: 'rgba(30, 33, 43, 0.95)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '28px',
        overflow: 'hidden',
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 28px',
        background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(123,97,255,0.08) 100%)',
        borderBottom: analysis ? '1px solid rgba(255,255,255,0.08)' : 'none',
        cursor: 'pointer',
    };

    return (
        <div className="llm-analysis-card" style={cardStyle}>
            <div className="llm-analysis-header" style={headerStyle} onClick={() => analysis && setCollapsed(c => !c)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Bot style={{ width: '22px', height: '22px', color: '#00e5ff', flexShrink: 0 }} />
                    <div>
                        <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#e2e8f0', fontFamily: 'Poppins, sans-serif' }}>
                            {t('analysisTitle')}
                        </h2>
                        {analysis && (() => {
                            const currentSettings = getSettings();
                            const providerChanged = currentSettings && (
                                currentSettings.provider !== analysis.provider ||
                                currentSettings.model !== analysis.model
                            );
                            return (
                                <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                                    {analysis.provider} · {analysis.model} · {new Date(analysis.timestamp).toLocaleString()}
                                    {providerChanged && (
                                        <span style={{
                                            marginLeft: '8px', background: 'rgba(251,191,36,0.15)',
                                            color: '#fbbf24', borderRadius: '4px',
                                            padding: '1px 6px', fontSize: '11px', fontWeight: 600,
                                        }}>
                                            {t('providerChanged', { provider: currentSettings.provider })}
                                        </span>
                                    )}
                                </p>
                            );
                        })()}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {analysis && !loading && (
                        <button
                            onClick={e => { e.stopPropagation(); runAnalysis(); }}
                            style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid rgba(0,229,255,0.5)', background: 'rgba(0,229,255,0.1)', color: '#00e5ff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                        >
                            {t('reanalyze')}
                        </button>
                    )}
                    {analysis && (collapsed
                        ? <ChevronDown style={{ width: '18px', height: '18px', color: '#64748b' }} />
                        : <ChevronUp   style={{ width: '18px', height: '18px', color: '#64748b' }} />
                    )}
                </div>
            </div>

            {!collapsed && (
                <div style={{ padding: '24px 28px' }}>
                    {!analysis && !loading && (
                        <div style={{ textAlign: 'center' }}>
                            {!isConfigured ? (
                                <p style={{ color: '#94a3b8', fontSize: '14px' }}>{t('notConfigured')}</p>
                            ) : (
                                <>
                                    <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>{t('analyzePrompt')}</p>
                                    <button
                                        onClick={runAnalysis}
                                        style={{
                                            padding: '12px 32px', borderRadius: '10px', border: 'none',
                                            background: 'linear-gradient(135deg, #00e5ff 0%, #7b61ff 100%)',
                                            color: '#0f111a', fontWeight: 700, cursor: 'pointer', fontSize: '15px',
                                        }}
                                    >
                                        {t('analyze')}
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {loading && (
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <Loader style={{ width: '32px', height: '32px', color: '#00e5ff', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
                            <p style={{ color: '#00e5ff', fontSize: '14px', marginTop: '12px' }}>{t('analyzing')}</p>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}

                    {error && (
                        <div style={{ background: 'rgba(252,129,129,0.1)', border: '1px solid rgba(252,129,129,0.4)', borderRadius: '8px', padding: '12px 16px', color: '#fc8181', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    {analysis && !loading && (
                        <div className="llm-analysis-scroll" style={{ paddingRight: '8px' }}>
                            {renderMarkdown(analysis.analysis)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
