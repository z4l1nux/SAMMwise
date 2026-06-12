/**
 * Builds the LLM prompt for SAMM assessment analysis.
 */

import type { ScorePayload, PreviousPayload } from '../../types';
import type { GapSummary } from '../maturity/gapAnalysis';
import { topGaps } from '../maturity/gapAnalysis';

const PRACTICE_DESCRIPTIONS: Record<string, string> = {
    'Strategy and Metrics':    'Defining security strategy, goals, and metrics to measure progress.',
    'Policy and Compliance':   'Establishing security policies and ensuring regulatory compliance.',
    'Education and Guidance':  'Training staff and providing security guidance across the org.',
    'Threat Assessment':       'Identifying and modelling threats to software assets.',
    'Security Requirements':   'Deriving and validating security requirements from business needs.',
    'Security Architecture':   'Designing secure system architectures and applying security principles.',
    'Secure Build':            'Integrating security into the build process and supply chain.',
    'Secure Deployment':       'Hardening deployment pipelines and runtime environments.',
    'Defect Management':       'Tracking, triaging, and remediating security defects.',
    'Architecture Assessment': 'Reviewing architectures for security weaknesses.',
    'Requirements Testing':    'Testing that security requirements are met by implementation.',
    'Security Testing':        'Performing security-focused functional and penetration tests.',
    'Incident Management':     'Detecting, responding to, and learning from security incidents.',
    'Environment Management':  'Securing operational infrastructure and configuration.',
    'Operations Management':   'Managing operational security processes and change control.',
};

interface BuildPromptParams extends ScorePayload {
    previous: PreviousPayload | null;
    locale: string;
    gaps?: GapSummary | null;
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
    gaps,
}: BuildPromptParams): string {
    const lang = locale === 'pt'
        ? 'Respond entirely in Brazilian Portuguese (pt-BR).'
        : 'Respond in English.';

    const projectLine = [company, project].filter(Boolean).join(' — ');

    const bfLines = bfNames.map((name, i) =>
        `  • ${name}: ${bfScores[i].toFixed(2)}/3`
    ).join('\n');

    const practiceLines = practiceNames.map((name, i) => {
        const desc = PRACTICE_DESCRIPTIONS[name] || '';
        return `  • ${name} (${bfNames[Math.floor(i / 3)]}): ${practiceScores[i].toFixed(2)}/3${desc ? ` — ${desc}` : ''}`;
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

Business Function changes:
${prevBfLines}
`;
    }

    let gapSection = '';
    const hasTargets = !!gaps && gaps.coverage.practicesWithTarget > 0;
    if (hasTargets && gaps) {
        const gapLines = topGaps(gaps, 10)
            .map(g => `  • ${g.practice} (${g.bf}): ${g.current.toFixed(2)} → target ${g.target.toFixed(2)} (gap +${g.gap.toFixed(2)})`)
            .join('\n');
        gapSection = `
## Maturity Targets & Gaps
The organization has set explicit maturity targets for ${gaps.coverage.practicesWithTarget} of ${gaps.coverage.totalPractices} practices.
Overall: current ${gaps.overall.current.toFixed(2)}/3 → target ${gaps.overall.target.toFixed(2)}/3 (gap ${gaps.overall.gap >= 0 ? '+' : ''}${gaps.overall.gap.toFixed(2)})

Largest shortfalls against target (prioritise these):
${gapLines || '  • (current scores already meet or exceed every target)'}
`;
    }

    return `You are an expert OWASP SAMM (Software Assurance Maturity Model) security advisor.
${lang}

Analyze the following SAMM assessment results${projectLine ? ` for "${projectLine}"` : ''} and provide:

1. **Executive Summary** — What the overall score means in practical terms (2–3 sentences).
2. **Strengths** — Top 3 practices where the organization is doing well and why that matters.
3. **Priority Improvements** — ${hasTargets ? 'Focus on the practices with the largest gap to their target (listed below). For each' : 'Top 5 practices with the lowest scores. For each'}: explain what the gap implies, provide 2–3 concrete actionable improvement steps, and reference industry best practices (NIST, ISO 27001, OWASP, etc.) where relevant.
4. **Quick Wins** — 2–3 actions that could raise the score significantly in the short term.
5. **Roadmap Suggestion** — A brief 3-phase improvement roadmap (immediate / 3 months / 6 months)${hasTargets ? ', sequenced to close the highest-priority gaps first' : ''}.
${previous ? '6. **Trend Analysis** — Comment on what improved, what regressed, and what remains stagnant.' : ''}

---
## Assessment Data

Overall Score: ${overallScore.toFixed(2)} / 3.0
(Scale: 0 = not practiced, 1 = initial/ad-hoc, 2 = defined/managed, 3 = optimized/advanced)

### Business Function Scores (0–3):
${bfLines}

### Practice Scores (0–3):
${practiceLines}

### Response Distribution (${totalAnswers} answers):
${distributionLines}
${comparisonSection}${gapSection}
---
Keep the response structured with clear headings. Be specific and actionable.`;
}
