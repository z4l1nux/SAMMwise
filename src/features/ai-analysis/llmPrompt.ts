/**
 * Builds the LLM prompt for AISVS assessment analysis.
 */

import type { ScorePayload, PreviousPayload } from '../../types';

interface BuildPromptParams extends ScorePayload {
    previous: PreviousPayload | null;
    locale: string;
}

export function buildPrompt({
    overallScore,
    bfNames,
    bfScores,
    practiceNames,
    practiceScores,
    responseCount,
    company,
    project,
    previous,
    locale,
}: BuildPromptParams): string {
    const lang = locale === 'pt'
        ? 'Respond entirely in Brazilian Portuguese (pt-BR).'
        : 'Respond in English.';

    const projectLine = [company, project].filter(Boolean).join(' — ');

    const bfLines = bfNames.map((name, i) =>
        `  • ${name}: ${bfScores[i].toFixed(2)}/3`
    ).join('\n');

    const practiceLines = practiceNames.map((name, i) => {
        return `  • ${name}: ${practiceScores[i].toFixed(2)}/3`;
    }).join('\n');

    const totalAnswers = Object.values(responseCount).reduce((a, b) => a + b, 0);
    const distributionLines = Object.entries(responseCount)
        .map(([k, v]) => `  • ${k}: ${v} (${totalAnswers > 0 ? ((v / totalAnswers) * 100).toFixed(1) : 0}%)`)
        .join('\n');

    let comparisonSection = '';
    if (previous) {
        const prevBfLines = (previous.bfNames || bfNames).map((name, i) =>
            `  • ${name}: ${(previous.bfScores[i] || 0).toFixed(2)}/3 → ${bfScores[i].toFixed(2)}/3 (${bfScores[i] - (previous.bfScores[i] || 0) >= 0 ? '+' : ''}${(bfScores[i] - (previous.bfScores[i] || 0)).toFixed(2)})`
        ).join('\n');
        comparisonSection = `
## Comparison with Previous Assessment
Previous overall score: ${(previous.overallScore || 0).toFixed(2)}/3 → Current: ${overallScore.toFixed(2)}/3 (${overallScore - (previous.overallScore || 0) >= 0 ? '+' : ''}${(overallScore - (previous.overallScore || 0)).toFixed(2)})

Control changes:
${prevBfLines}
`;
    }

    return `You are an expert OWASP AISVS (Artificial Intelligence Security Verification Standard) security advisor.
${lang}

Analyze the following AISVS assessment results${projectLine ? ` for "${projectLine}"` : ''} and provide:

1. **Executive Summary** — What the overall score means in practical terms for their AI security posture (2–3 sentences).
2. **Strengths** — Top 3 areas/controls where the organization is doing well and why that matters for AI workloads.
3. **Priority Improvements** — Top 5 sub-controls with the lowest scores. For each: explain what the low score implies, provide 2–3 concrete actionable improvement steps, and reference industry best practices regarding AI Security.
4. **Quick Wins** — 2–3 actions that could raise the security posture significantly in the short term.
5. **Roadmap Suggestion** — A brief 3-phase improvement roadmap (immediate / 3 months / 6 months) to achieve robust AI security.
${previous ? '6. **Trend Analysis** — Comment on what improved, what regressed, and what remains stagnant.' : ''}

---
## Assessment Data

Overall Score: ${overallScore.toFixed(2)} / 3.0
(Scale: 0 = not practiced, 1 = initial/ad-hoc, 2 = defined/managed, 3 = optimized/advanced)

### AISVS Control Scores (0–3):
${bfLines}

### AISVS Sub-control Scores (0–3):
${practiceLines}

### Response Distribution (${totalAnswers} answers):
${distributionLines}
${comparisonSection}
---
Keep the response structured with clear headings. Be specific and actionable. Focus on AI security, LLM risks, and related infrastructure.`;
}
