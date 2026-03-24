import type { NextApiRequest, NextApiResponse } from 'next';

type LLMProvider = 'anthropic' | 'openai' | 'gemini' | 'ollama';

interface LLMRequestBody {
  provider: LLMProvider;
  apiKey?: string;
  model?: string;
  prompt: string;
  ollamaUrl?: string;
}

interface LLMResponseBody {
  analysis?: string;
  error?: string;
}

/**
 * API proxy for LLM providers — avoids CORS issues on the client.
 * Supported providers: anthropic, openai, gemini, ollama
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LLMResponseBody>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { provider, apiKey, model, prompt, ollamaUrl } = req.body as LLMRequestBody;

    if (!provider || !prompt) {
        return res.status(400).json({ error: 'provider and prompt are required' });
    }

    try {
        let responseText: string;

        if (provider === 'anthropic') {
            const r = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey!,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    model: model || 'claude-haiku-4-5-20251001',
                    max_tokens: 8192,
                    messages: [{ role: 'user', content: prompt }],
                }),
            });
            if (!r.ok) {
                const err = await r.text();
                return res.status(r.status).json({ error: err });
            }
            const data = await r.json();
            responseText = data.content?.[0]?.text || '';

        } else if (provider === 'openai') {
            const r = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    model: model || 'gpt-4o-mini',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 8192,
                }),
            });
            if (!r.ok) {
                const err = await r.text();
                return res.status(r.status).json({ error: err });
            }
            const data = await r.json();
            responseText = data.choices?.[0]?.message?.content || '';

        } else if (provider === 'gemini') {
            const geminiModel = model || 'gemini-1.5-flash';
            const r = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { maxOutputTokens: 8192 },
                    }),
                }
            );
            if (!r.ok) {
                const err = await r.text();
                return res.status(r.status).json({ error: err });
            }
            const data = await r.json();
            responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        } else if (provider === 'ollama') {
            const base = (ollamaUrl || 'http://localhost:11434').replace(/\/$/, '');
            const r = await fetch(`${base}/api/generate`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    model: model || 'llama3',
                    prompt,
                    stream: false,
                }),
            });
            if (!r.ok) {
                const err = await r.text();
                return res.status(r.status).json({ error: err });
            }
            const data = await r.json();
            responseText = data.response || '';

        } else {
            return res.status(400).json({ error: `Unknown provider: ${provider}` });
        }

        return res.status(200).json({ analysis: responseText });
    } catch (err: any) {
        console.error('[llm proxy]', err);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
}
