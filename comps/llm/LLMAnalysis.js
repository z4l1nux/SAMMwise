import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { decryptApiKey } from './llmCrypto';
import { loadLLMSettings } from './LLMSettings';
import { buildPrompt } from './llmPrompt';

/**
 * Renders LLM analysis (stored or on-demand) for a SAMM assessment.
 *
 * Props:
 *   scorePayload  — { overallScore, bfNames, bfScores, practiceNames, practiceScores, responseCount, company, project }
 *   previous      — same shape for previous assessment, or null
 *   locale        — 'en' | 'pt'
 *   storedAnalysis — { timestamp, provider, model, analysis } | null (from JSON)
 *   onAnalysisGenerated — callback(analysisObj) so parent can persist in JSON
 */
export default function LLMAnalysis({ scorePayload, previous, locale, storedAnalysis, onAnalysisGenerated, autoTrigger }) {
    const t = useTranslations('llm');
    const [analysis,   setAnalysis]   = useState(storedAnalysis || null);
    const [loading,    setLoading]    = useState(false);
    const [error,      setError]      = useState('');
    const [collapsed,  setCollapsed]  = useState(false);

    const settings = loadLLMSettings();
    const isConfigured = !!settings?.encryptedKey || settings?.provider === 'ollama';

    // Auto-trigger analysis on mount if requested
    useEffect(() => {
        if (autoTrigger && isConfigured && !analysis) {
            runAnalysis();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoTrigger]);

    const runAnalysis = async () => {
        if (!settings) { setError(t('notConfigured')); return; }
        setLoading(true);
        setError('');
        try {
            let apiKey = '';
            if (settings.provider !== 'ollama') {
                apiKey = await decryptApiKey(settings.encryptedKey || '');
                if (!apiKey) { setError(t('decryptError')); setLoading(false); return; }
            }

            const prompt = buildPrompt({
                ...scorePayload,
                previous,
                locale,
            });

            const res = await fetch('/api/llm', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    provider:   settings.provider,
                    apiKey,
                    model:      settings.model,
                    ollamaUrl:  settings.ollamaUrl,
                    prompt,
                }),
            });

            if (!res.ok) {
                const { error: e } = await res.json().catch(() => ({}));
                throw new Error(e || `HTTP ${res.status}`);
            }

            const { analysis: text } = await res.json();
            const analysisObj = {
                timestamp: new Date().toISOString(),
                provider:  settings.provider,
                model:     settings.model,
                analysis:  text,
            };
            setAnalysis(analysisObj);
            onAnalysisGenerated?.(analysisObj);
        } catch (err) {
            setError(err.message || t('genericError'));
        } finally {
            setLoading(false);
        }
    };

    // Minimal markdown-to-HTML: bold, headers, bullets (no external lib needed)
    const renderMarkdown = (text) => {
        const lines = text.split('\n');
        const els = [];
        let listBuffer = [];
        const flushList = () => {
            if (listBuffer.length) {
                els.push(<ul key={els.length} style={{ paddingLeft: '20px', margin: '4px 0 10px' }}>
                    {listBuffer.map((item, i) => <li key={i} style={{ marginBottom: '4px', fontSize: '14px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: item }} />)}
                </ul>);
                listBuffer = [];
            }
        };
        lines.forEach((line, idx) => {
            if (line.startsWith('## ')) {
                flushList();
                els.push(<h3 key={idx} style={{ fontSize: '16px', fontWeight: 700, color: '#2d3748', margin: '16px 0 6px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>{line.slice(3)}</h3>);
            } else if (line.startsWith('### ')) {
                flushList();
                els.push(<h4 key={idx} style={{ fontSize: '14px', fontWeight: 700, color: '#4a5568', margin: '12px 0 4px' }}>{line.slice(4)}</h4>);
            } else if (line.startsWith('**') && line.endsWith('**')) {
                flushList();
                els.push(<p key={idx} style={{ fontWeight: 700, fontSize: '14px', color: '#2d3748', margin: '10px 0 2px' }}>{line.slice(2, -2)}</p>);
            } else if (/^[\-\*] /.test(line)) {
                listBuffer.push(applyInline(line.slice(2)));
            } else if (line.trim() === '' || line.startsWith('---')) {
                flushList();
            } else if (line.trim()) {
                flushList();
                els.push(<p key={idx} style={{ fontSize: '14px', lineHeight: 1.7, color: '#4a5568', margin: '4px 0' }} dangerouslySetInnerHTML={{ __html: applyInline(line) }} />);
            }
        });
        flushList();
        return els;
    };

    const applyInline = (text) =>
        text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code style="background:#f0f4f8;padding:1px 4px;border-radius:3px;font-size:13px">$1</code>');

    const cardStyle = {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(102,126,234,0.15)',
        marginBottom: '28px',
        overflow: 'hidden',
    };

    const headerStyle = {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 28px',
        background: 'linear-gradient(135deg, #f6f9fe 0%, #eef2ff 100%)',
        borderBottom: analysis ? '1px solid rgba(102,126,234,0.12)' : 'none',
        cursor: 'pointer',
    };

    return (
        <div style={cardStyle}>
            <div style={headerStyle} onClick={() => analysis && setCollapsed(c => !c)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px' }}>🤖</span>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#2d3748', fontFamily: 'Poppins, sans-serif' }}>
                            {t('analysisTitle')}
                        </h2>
                        {analysis && (
                            <p style={{ margin: 0, fontSize: '12px', color: '#718096' }}>
                                {analysis.provider} · {analysis.model} · {new Date(analysis.timestamp).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {analysis && !loading && (
                        <button
                            onClick={e => { e.stopPropagation(); runAnalysis(); }}
                            style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #667eea', background: '#fff', color: '#667eea', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                        >
                            {t('reanalyze')}
                        </button>
                    )}
                    {analysis && <span style={{ fontSize: '16px', color: '#a0aec0' }}>{collapsed ? '▼' : '▲'}</span>}
                </div>
            </div>

            {!collapsed && (
                <div style={{ padding: '24px 28px' }}>
                    {!analysis && !loading && (
                        <div style={{ textAlign: 'center' }}>
                            {!isConfigured ? (
                                <p style={{ color: '#718096', fontSize: '14px' }}>{t('notConfigured')}</p>
                            ) : (
                                <>
                                    <p style={{ color: '#718096', fontSize: '14px', marginBottom: '16px' }}>{t('analyzePrompt')}</p>
                                    <button
                                        onClick={runAnalysis}
                                        style={{
                                            padding: '12px 32px', borderRadius: '10px', border: 'none',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '15px',
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
                            <div style={{ fontSize: '32px', animation: 'spin 1s linear infinite' }}>⟳</div>
                            <p style={{ color: '#667eea', fontSize: '14px', marginTop: '12px' }}>{t('analyzing')}</p>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}

                    {error && (
                        <div style={{ background: '#fff5f5', border: '1px solid #fc8181', borderRadius: '8px', padding: '12px 16px', color: '#c53030', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    {analysis && !loading && (
                        <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '8px' }}>
                            {renderMarkdown(analysis.analysis)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
