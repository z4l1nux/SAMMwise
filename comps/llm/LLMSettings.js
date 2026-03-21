import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { encryptApiKey, decryptApiKey } from './llmCrypto';

const SETTINGS_KEY = 'sammwise_llm_settings';

const PROVIDERS = [
    { id: 'anthropic', label: 'Anthropic (Claude)' },
    { id: 'openai',    label: 'OpenAI (GPT)' },
    { id: 'gemini',    label: 'Google Gemini' },
    { id: 'ollama',    label: 'Ollama (local)' },
];

const MODELS = {
    anthropic: ['claude-haiku-4-5-20251001', 'claude-sonnet-4-6', 'claude-opus-4-6'],
    openai:    ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo'],
    gemini:    ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash'],
    ollama:    ['llama3', 'llama3.1', 'mistral', 'phi3', 'gemma2'],
};

export function loadLLMSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch { return null; }
}

async function saveSettings({ provider, encryptedKey, model, ollamaUrl, autoAnalysis }) {
    const settings = { provider, encryptedKey, model, ollamaUrl, autoAnalysis };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export default function LLMSettings({ onClose, onSaved }) {
    const t = useTranslations('llm');
    const [provider,     setProvider]     = useState('anthropic');
    const [apiKey,       setApiKey]       = useState('');
    const [model,        setModel]        = useState(MODELS.anthropic[0]);
    const [ollamaUrl,    setOllamaUrl]    = useState('http://localhost:11434');
    const [autoAnalysis, setAutoAnalysis] = useState(false);
    const [saving,       setSaving]       = useState(false);
    const [status,       setStatus]       = useState('');

    useEffect(() => {
        const stored = loadLLMSettings();
        if (!stored) return;
        setProvider(stored.provider || 'anthropic');
        setModel(stored.model || MODELS[stored.provider || 'anthropic'][0]);
        setOllamaUrl(stored.ollamaUrl || 'http://localhost:11434');
        setAutoAnalysis(stored.autoAnalysis || false);
        // Don't show decrypted key — show placeholder
        if (stored.encryptedKey) setApiKey('••••••••••••••••');
    }, []);

    const handleProviderChange = (p) => {
        setProvider(p);
        setModel(MODELS[p][0]);
        setApiKey('');
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus('');
        try {
            let encryptedKey = '';
            const stored = loadLLMSettings();
            if (apiKey && apiKey !== '••••••••••••••••') {
                encryptedKey = await encryptApiKey(apiKey);
            } else if (stored?.encryptedKey) {
                encryptedKey = stored.encryptedKey;
            }
            await saveSettings({ provider, encryptedKey, model, ollamaUrl, autoAnalysis });
            setStatus('saved');
            onSaved?.({ provider, model, ollamaUrl, autoAnalysis });
            setTimeout(onClose, 800);
        } catch (err) {
            setStatus('error');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleClear = () => {
        localStorage.removeItem(SETTINGS_KEY);
        setApiKey('');
        setStatus('cleared');
        onSaved?.(null);
    };

    const overlay = {
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
    };
    const modal = {
        background: '#fff', borderRadius: '16px', padding: '32px',
        width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        fontFamily: 'Poppins, sans-serif',
    };
    const label = { display: 'block', fontWeight: 600, fontSize: '13px', color: '#4a5568', marginBottom: '6px' };
    const input = {
        width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0',
        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box',
        outline: 'none',
    };
    const select = { ...input };
    const section = { marginBottom: '18px' };

    return (
        <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
            <div style={modal}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', color: '#2d3748' }}>{t('settingsTitle')}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#718096' }}>✕</button>
                </div>

                {/* Auto-analysis toggle */}
                <div style={{ ...section, display: 'flex', alignItems: 'center', gap: '12px', background: '#f7fafc', borderRadius: '10px', padding: '14px 16px' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#2d3748' }}>{t('autoAnalysis')}</div>
                        <div style={{ fontSize: '12px', color: '#718096', marginTop: '2px' }}>{t('autoAnalysisDesc')}</div>
                    </div>
                    <button
                        onClick={() => setAutoAnalysis(v => !v)}
                        style={{
                            width: '48px', height: '26px', borderRadius: '13px', border: 'none', cursor: 'pointer',
                            background: autoAnalysis ? '#667eea' : '#cbd5e0',
                            position: 'relative', transition: 'background 0.2s',
                        }}
                    >
                        <span style={{
                            position: 'absolute', top: '3px',
                            left: autoAnalysis ? '25px' : '3px',
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: '#fff', transition: 'left 0.2s',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                        }} />
                    </button>
                </div>

                {/* Provider */}
                <div style={section}>
                    <label style={label}>{t('provider')}</label>
                    <select style={select} value={provider} onChange={e => handleProviderChange(e.target.value)}>
                        {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                </div>

                {/* API Key (hidden for Ollama) */}
                {provider !== 'ollama' && (
                    <div style={section}>
                        <label style={label}>{t('apiKey')}</label>
                        <input
                            type="password"
                            style={input}
                            value={apiKey}
                            onChange={e => setApiKey(e.target.value)}
                            placeholder={t('apiKeyPlaceholder')}
                            autoComplete="off"
                        />
                        <p style={{ fontSize: '11px', color: '#a0aec0', marginTop: '4px' }}>{t('apiKeyNote')}</p>
                    </div>
                )}

                {/* Ollama URL */}
                {provider === 'ollama' && (
                    <div style={section}>
                        <label style={label}>{t('ollamaUrl')}</label>
                        <input style={input} value={ollamaUrl} onChange={e => setOllamaUrl(e.target.value)} />
                    </div>
                )}

                {/* Model */}
                <div style={section}>
                    <label style={label}>{t('model')}</label>
                    <select style={select} value={model} onChange={e => setModel(e.target.value)}>
                        {MODELS[provider].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            flex: 1, padding: '11px', borderRadius: '8px', border: 'none',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        {saving ? t('saving') : t('save')}
                    </button>
                    <button
                        onClick={handleClear}
                        style={{
                            padding: '11px 20px', borderRadius: '8px',
                            border: '1px solid #fc8181', background: '#fff',
                            color: '#e53e3e', fontWeight: 600, cursor: 'pointer', fontSize: '14px',
                        }}
                    >
                        {t('clear')}
                    </button>
                </div>

                {status === 'saved'   && <p style={{ color: '#38a169', marginTop: '10px', fontSize: '13px', textAlign: 'center' }}>{t('settingsSaved')}</p>}
                {status === 'cleared' && <p style={{ color: '#718096', marginTop: '10px', fontSize: '13px', textAlign: 'center' }}>{t('settingsCleared')}</p>}
                {status === 'error'   && <p style={{ color: '#e53e3e', marginTop: '10px', fontSize: '13px', textAlign: 'center' }}>{t('settingsError')}</p>}
            </div>
        </div>
    );
}
