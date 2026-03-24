import type { NextApiRequest, NextApiResponse } from 'next';

type LLMProvider = 'anthropic' | 'openai' | 'gemini' | 'ollama';

interface ModelsRequestBody {
  provider: LLMProvider;
  apiKey?: string;
  ollamaUrl?: string;
}

interface ModelsResponseBody {
  models?: string[];
  error?: string;
}

/**
 * Proxy route to list available models for each LLM provider.
 * Avoids CORS issues when calling provider APIs from the browser.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ModelsResponseBody>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { provider, apiKey, ollamaUrl } = req.body as ModelsRequestBody;

    if (!provider) {
        return res.status(400).json({ error: 'provider is required' });
    }

    try {
        let models: string[] = [];

        if (provider === 'anthropic') {
            const r = await fetch('https://api.anthropic.com/v1/models', {
                headers: {
                    'x-api-key': apiKey!,
                    'anthropic-version': '2023-06-01',
                },
            });
            if (!r.ok) return res.status(r.status).json({ error: await r.text() });
            const data = await r.json();
            models = (data.data || [])
                .map((m: any) => m.id as string)
                .filter((id: string) => id.startsWith('claude'));

        } else if (provider === 'openai') {
            const r = await fetch('https://api.openai.com/v1/models', {
                headers: { Authorization: `Bearer ${apiKey}` },
            });
            if (!r.ok) return res.status(r.status).json({ error: await r.text() });
            const data = await r.json();
            models = (data.data || [])
                .map((m: any) => m.id as string)
                .filter((id: string) => /^gpt-/.test(id))
                .sort();

        } else if (provider === 'gemini') {
            const r = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
            );
            if (!r.ok) return res.status(r.status).json({ error: await r.text() });
            const data = await r.json();
            models = (data.models || [])
                .filter((m: any) => (m.supportedGenerationMethods || []).includes('generateContent'))
                .map((m: any) => (m.name as string).replace('models/', ''))
                .filter((id: string) => /gemini/.test(id));

        } else if (provider === 'ollama') {
            const base = (ollamaUrl || 'http://localhost:11434').replace(/\/$/, '');
            const r = await fetch(`${base}/api/tags`);
            if (!r.ok) return res.status(r.status).json({ error: await r.text() });
            const data = await r.json();
            models = (data.models || []).map((m: any) => m.name as string);

        } else {
            return res.status(400).json({ error: `Unknown provider: ${provider}` });
        }

        return res.status(200).json({ models });
    } catch (err: any) {
        console.error('[llm-models]', err);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
}
