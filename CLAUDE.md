# Claude Code — SAMMwise

Este arquivo é uma **exportação** do `AGENTS.md` (fonte única de regras).
Para alterar regras, edite `AGENTS.md` e re-exporte:

```
Leia o AGENTS.md e re-gere o CLAUDE.md mantendo o mesmo conteúdo.
```

---

## Quick Reference

- **Stack**: Next.js 16.2 (Pages Router) + React 18.3 + TypeScript 5.7 + Tailwind v4 + survey-core + Chart.js
- **Type-check**: `npm run typecheck` (tsgo) — 0 erros obrigatório
- **Testes**: `npm test` — 123/123 passando
- **Dev**: `npm run dev` — Turbopack em http://localhost:3600
- **i18n**: EN/PT-BR via next-intl
- **Specs**: `specs/` (mission, tech-stack, roadmap + uma pasta por feature)

## Workflow SDSD

| Escala | Fases | Quando |
|---|---|---|
| QUICK | E → V | Bugfix, ajuste pequeno |
| SMALL | P → E → V | Feature simples |
| MEDIUM | P → R → E → V | Feature regular |
| LARGE | P → R → E → V → C | Sistema complexo |

**P (Plan)** = criar `specs/YYYY-MM-DD-nome/{plan,requirements,validation,security}.md`
**R (Review)** = validar arquitetura/riscos antes de codar
**E (Execute)** = implementar grupos do `plan.md` em ordem
**V (Validate)** = typecheck + testes + scans + verificação manual
**C (Confirm)** = roadmap ✅ + CHANGELOG + commit + merge `--no-ff` + deletar branch

## Regras Críticas

1. **Nunca codar sem spec.** Se não existe, criar primeiro.
2. **Nunca alterar código sem sincronizar o spec.**
3. **AskUserQuestion agrupada em 3** antes de escrever em disco em fluxo SDSD.
4. **`tsgo --noEmit` em 0 erros** sempre.
5. **123/123 testes passando** sempre.
6. **Mock tipado** em testes: `jest.mocked()` ou `as unknown as X`. Nunca `as any`.
7. **Strings de UI**: i18n via `useTranslations()`. Strings de questionário SAMM: `translateSurvey()`.
8. **Secrets**: zero hardcoded. Se vazar, revogar imediatamente + `git filter-repo`.

## Estrutura

```
specs/         ← Constituição + specs de feature (a fonte da verdade)
src/
├── components/         shared UI
├── features/
│   ├── assessment/     surveytypeone, surveynav, totalsurvey, surveypages, surveypanels
│   └── ai-analysis/    LLMAnalysis, LLMSettings, llmCrypto, llmPrompt
├── lib/                exportPdf
├── messages/           en.json, pt.json
├── pages/              Next.js Pages Router (+ api/)
└── types/
__tests__/              Jest suites
```

## State Storage

| Chave | Storage | Conteúdo |
|---|---|---|
| `assessmentState` | sessionStorage | Respostas SAMM em curso |
| `userState`, `navbarState` | sessionStorage | Estado de UI |
| `dataResults`, `prevResults`, `loadedResults` | sessionStorage | Datasets para charts |
| `sammwise_llm_settings` | localStorage | Provider, model, ollamaUrl, autoAnalysis |
| `sammwise_enc_key` | localStorage | JWK AES-GCM device-bound |

## Security Tooling

- **SAST**: Semgrep — local: `semgrep --config auto src/`
- **SCA**: safedep/vet (CI) + `npm audit --audit-level=high` (local)
- **Secrets**: TruffleHog — `trufflehog filesystem . --only-verified`

Workflows em `.github/workflows/`: `cicd.semgrep-reusable.yml`, `vet-sca-reusable.yml`, `trufflehog.yml`.

## Convenções de Commit

`feat:` / `fix:` / `chore:` / `docs:` / `test:` / `refactor:`. Mensagens em PT ou EN, manter consistência por commit.

## Detalhes Completos

Para regras detalhadas (TypeScript patterns, survey panel quirks, Tailwind v4, anti-patterns, etc.), leia [AGENTS.md](./AGENTS.md).

Para o framework SDSD completo (workflow de feature, skills, agentes especializados, multi-ferramenta), leia o guia técnico do time.
