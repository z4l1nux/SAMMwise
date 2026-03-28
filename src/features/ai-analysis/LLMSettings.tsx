import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { encryptApiKey, decryptApiKey } from './llmCrypto';
import type { LLMProvider, LLMSettingsType } from '../../types';

const SETTINGS_KEY = 'AISVSwise_llm_settings';

const PROVIDER_IDS: LLMProvider[] = ['anthropic', 'openai', 'gemini', 'ollama'];

export function loadLLMSettings(): LLMSettingsType | null {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as LLMSettingsType;
    } catch { return null; }
}

async function persistSettings(payload: LLMSettingsType): Promise<void> {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
}

interface LLMSettingsProps {
    onSaved?: (cfg: LLMSettingsType | null) => void;
}

export default function LLMSettings({ onSaved }: LLMSettingsProps) {
    const t = useTranslations('llm');
    const tProviders = useTranslations('providers');
    const tA11y = useTranslations('a11y');

    const [provider, setProvider] = useState<LLMProvider>('anthropic');
    const [apiKey, setApiKey] = useState('');
    const [apiKeyMasked, setApiKeyMasked] = useState(false);
    const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
    const [autoAnalysis, setAutoAnalysis] = useState(false);
    const [models, setModels] = useState<string[]>([]);
    const [model, setModel] = useState('');
    const [fetchingModels, setFetchingModels] = useState(false);
    const [modelError, setModelError] = useState('');
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const stored = loadLLMSettings();
        if (!stored) return;
        setProvider(stored.provider || 'anthropic');
        setOllamaUrl(stored.ollamaUrl || 'http://localhost:11434');
        setAutoAnalysis(stored.autoAnalysis || false);
        if (stored.encryptedKey) {
            setApiKeyMasked(true);
            setApiKey('');
        }
        if (stored.model) {
            setModels([stored.model]);
            setModel(stored.model);
        }
    }, []);

    const handleProviderChange = (p: LLMProvider) => {
        setProvider(p);
        setModels([]);
        setModel('');
        setModelError('');
        setApiKey('');
        setApiKeyMasked(false);
    };

    const handleApiKeyChange = (v: string) => {
        setApiKey(v);
        setApiKeyMasked(false);
        setModels([]);
        setModel('');
        setModelError('');
    };

    const fetchModels = async () => {
        setFetchingModels(true);
        setModelError('');
        setModels([]);
        setModel('');
        try {
            let resolvedKey = apiKey;
            if (apiKeyMasked || !apiKey) {
                const stored = loadLLMSettings();
                if (stored?.encryptedKey) {
                    resolvedKey = (await decryptApiKey(stored.encryptedKey)) ?? '';
                }
            }
            const res = await fetch('/api/llm-models', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ provider, apiKey: resolvedKey, ollamaUrl }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            if (!data.models?.length) throw new Error(t('noModelsFound'));
            setModels(data.models);
            setModel(data.models[0]);
        } catch (err: any) {
            setModelError(err.message);
        } finally {
            setFetchingModels(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus('');
        try {
            const stored = loadLLMSettings();
            let encryptedKey = stored?.encryptedKey || '';
            if (apiKey && !apiKeyMasked) {
                encryptedKey = await encryptApiKey(apiKey);
            }
            const payload: LLMSettingsType = { provider, encryptedKey, model, ollamaUrl, autoAnalysis };
            await persistSettings(payload);
            setStatus('saved');
            setApiKeyMasked(!!encryptedKey);
            setApiKey('');
            onSaved?.(payload);
        } catch {
            setStatus('error');
        } finally {
            setSaving(false);
        }
    };

    const handleClear = () => {
        localStorage.removeItem(SETTINGS_KEY);
        setApiKey('');
        setApiKeyMasked(false);
        setModels([]);
        setModel('');
        setStatus('cleared');
        onSaved?.(null);
    };

    const canFetchModels = provider === 'ollama' || !!apiKey || apiKeyMasked;

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '10px 14px',
        border: '1px solid #e2e8f0', borderRadius: '8px',
        fontSize: '14px', boxSizing: 'border-box', outline: 'none',
        fontFamily: 'Poppins, sans-serif',
    };
    const labelStyle: React.CSSProperties = {
        display: 'block', fontWeight: 600, fontSize: '13px',
        color: '#4a5568', marginBottom: '6px',
    };
    const sectionStyle: React.CSSProperties = { marginBottom: '22px' };
    const rowStyle: React.CSSProperties = { display: 'flex', gap: '10px', alignItems: 'flex-end' };

    return (
        <div style={{ maxWidth: '560px', margin: '0 auto', fontFamily: 'Poppins, sans-serif' }}>

            {/* Auto-analysis toggle */}
            <div style={{
                ...sectionStyle,
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'linear-gradient(135deg, #f6f9fe 0%, #eef2ff 100%)',
                borderRadius: '12px', padding: '16px 20px',
                border: '1px solid rgba(102,126,234,0.15)',
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#2d3748' }}>{t('autoAnalysis')}</div>
                    <div style={{ fontSize: '13px', color: '#718096', marginTop: '3px' }}>{t('autoAnalysisDesc')}</div>
                </div>
                <button
                    onClick={() => setAutoAnalysis(v => !v)}
                    aria-label={tA11y('toggleAutoAnalysis')}
                    style={{
                        width: '52px', height: '28px', borderRadius: '14px', border: 'none',
                        cursor: 'pointer', flexShrink: 0,
                        background: autoAnalysis ? '#667eea' : '#cbd5e0',
                        position: 'relative', transition: 'background 0.2s',
                    }}
                >
                    <span style={{
                        position: 'absolute', top: '4px',
                        left: autoAnalysis ? '28px' : '4px',
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: '#fff', transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }} />
                </button>
            </div>

            {/* Provider */}
            <div style={sectionStyle}>
                <label style={labelStyle}>{t('provider')}</label>
                <select style={inputStyle} value={provider} onChange={e => handleProviderChange(e.target.value as LLMProvider)}>
                    {PROVIDER_IDS.map(id => <option key={id} value={id}>{tProviders(id)}</option>)}
                </select>
            </div>

            {/* Ollama URL */}
            {provider === 'ollama' && (
                <div style={sectionStyle}>
                    <label style={labelStyle}>{t('ollamaUrl')}</label>
                    <input
                        style={inputStyle}
                        value={ollamaUrl}
                        onChange={e => setOllamaUrl(e.target.value)}
                    />
                </div>
            )}

            {/* API Key */}
            {provider !== 'ollama' && (
                <div style={sectionStyle}>
                    <label style={labelStyle}>{t('apiKey')}</label>
                    <input
                        type="password"
                        style={inputStyle}
                        value={apiKeyMasked ? '' : apiKey}
                        placeholder={apiKeyMasked ? t('apiKeySaved') : t('apiKeyPlaceholder')}
                        onChange={e => handleApiKeyChange(e.target.value)}
                        autoComplete="off"
                    />
                    <p style={{ fontSize: '12px', color: '#a0aec0', margin: '5px 0 0' }}>
                        {t('apiKeyNote')}
                    </p>
                </div>
            )}

            {/* Model */}
            <div style={sectionStyle}>
                <label style={labelStyle}>{t('model')}</label>
                <div style={rowStyle}>
                    <select
                        style={{ ...inputStyle, flex: 1 }}
                        value={model}
                        onChange={e => setModel(e.target.value)}
                        disabled={models.length === 0}
                    >
                        {models.length === 0
                            ? <option value="">{t('modelFetchFirst')}</option>
                            : models.map(m => <option key={m} value={m}>{m}</option>)
                        }
                    </select>
                    <button
                        onClick={fetchModels}
                        disabled={fetchingModels || !canFetchModels}
                        style={{
                            padding: '10px 18px', borderRadius: '8px', border: 'none',
                            background: canFetchModels ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0',
                            color: canFetchModels ? '#fff' : '#a0aec0',
                            fontWeight: 600, fontSize: '13px',
                            cursor: fetchingModels || !canFetchModels ? 'not-allowed' : 'pointer',
                            whiteSpace: 'nowrap', flexShrink: 0,
                        }}
                    >
                        {fetchingModels ? t('fetchingModels') : t('fetchModels')}
                    </button>
                </div>
                {modelError && (
                    <p style={{ color: '#e53e3e', fontSize: '13px', margin: '6px 0 0' }}>{modelError}</p>
                )}
                {models.length > 0 && (
                    <p style={{ color: '#38a169', fontSize: '12px', margin: '5px 0 0' }}>
                        {models.length} {t('modelsLoaded')}
                    </p>
                )}
            </div>

            {/* Save / Clear */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={handleSave}
                    disabled={saving || (!model && provider !== 'ollama')}
                    style={{
                        flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff', fontWeight: 700, fontSize: '15px',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        opacity: (!model && provider !== 'ollama') ? 0.5 : 1,
                    }}
                >
                    {saving ? t('saving') : t('save')}
                </button>
                <button
                    onClick={handleClear}
                    style={{
                        padding: '12px 22px', borderRadius: '10px',
                        border: '1px solid #fc8181', background: '#fff',
                        color: '#e53e3e', fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                    }}
                >
                    {t('clear')}
                </button>
            </div>

            {status === 'saved' && <p style={{ color: '#38a169', marginTop: '14px', fontSize: '14px', textAlign: 'center' }}>{t('settingsSaved')}</p>}
            {status === 'cleared' && <p style={{ color: '#718096', marginTop: '14px', fontSize: '14px', textAlign: 'center' }}>{t('settingsCleared')}</p>}
            {status === 'error' && <p style={{ color: '#e53e3e', marginTop: '14px', fontSize: '14px', textAlign: 'center' }}>{t('settingsError')}</p>}
        </div>
    );
}
