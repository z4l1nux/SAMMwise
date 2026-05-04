# AGENTS.md

Fonte única de regras do projeto SAMMwise para qualquer agente de IA (Claude Code, Cursor, Copilot, Windsurf, Codex).
Edite **somente este arquivo**. Use o prompt abaixo para re-exportar para outras ferramentas:

```
Leia o AGENTS.md e exporte as regras para [Cursor / Copilot / Windsurf],
criando o arquivo de destino no formato esperado.
```

---

## Workflow SDSD

Este projeto segue **Spec-Driven Secure Development (SDSD)**. Toda funcionalidade nova começa com specs em `specs/`.

| Escala | Fases | Quando usar |
|---|---|---|
| QUICK | E → V | Bugfix, ajuste de texto, fix visual pequeno |
| SMALL | P → E → V | Feature simples, nova rota sem lógica complexa |
| MEDIUM | P → R → E → V | Feature regular, nova entidade, integração externa |
| LARGE | P → R → E → V → C | Sistema complexo, múltiplos stakeholders, compliance |

**Regra de ouro:** spec é fonte da verdade, código implementa o spec, CHANGELOG registra o histórico. Nunca codar sem spec; nunca alterar código sem sincronizar o spec.

## Estrutura de Pastas

```
specs/                              ← Constituição + specs de feature
├── mission.md                      ← Por que existimos
├── tech-stack.md                   ← Stack e razões
├── roadmap.md                      ← Fases (✅ já feitas, [ ] pendentes)
└── YYYY-MM-DD-nome-feature/        ← Uma pasta por feature
    ├── plan.md                     ← Grupos numerados de tarefas
    ├── requirements.md             ← Escopo + decisões + NFRs
    ├── validation.md               ← Definition of Done
    └── security.md                 ← Entry points + riscos + DoD security

src/
├── components/                     ← Shared UI
├── features/<dominio>/             ← Feature slices (assessment, ai-analysis)
├── lib/                            ← Utilitários cross-feature (exportPdf)
├── messages/                       ← i18n (en.json, pt.json)
├── pages/                          ← Next.js Pages Router
└── types/

__tests__/                          ← Jest test suites (espelha src/)
```

## Code Rules

### TypeScript
- `tsgo --noEmit` deve ser **0 erros** sempre. Rode `npm run typecheck` antes do commit.
- Não use `any` exceto em casts de mock de teste (`as unknown as X`).
- Use `jest.mocked()` para mocks tipados — não `as jest.Mock` solto.
- Path alias `@/*` aponta para a raiz; prefira import relativo dentro de `features/`.

### React / Next.js
- **Pages Router** — não migre para App Router sem ADR explícito (impacto em SurveyJS).
- Componentes server-safe por padrão; marque `"use client"` somente quando necessário.
- Evite re-renders custosos em pages/results.tsx (charts são pesados).

### i18n
- Toda string de UI passa por `useTranslations(<namespace>)`.
- Namespaces existentes: `nav`, `home`, `assessment`, `results`, `charts`, `upload`, `notFound`, `footer`, `buttons`, `errors`, `practices`, `meta`, `llm`.
- Adicionar string em `en.json` **obriga** adicionar em `pt.json` na mesma posição. Teste `__tests__/i18n.test.ts` valida isso.
- Conteúdo do questionário SAMM: traduzir via `translateSurvey` em `translations-pt.ts`, não via i18n namespace.

### State
- `sessionStorage` para dados do assessment em uso (`assessmentState`, `userState`, `dataResults`, `prevResults`, `loadedResults`).
- `localStorage` apenas para configs persistentes (`sammwise_llm_settings`, `sammwise_enc_key`).
- **Nunca** armazenar API key em texto plano. Use `encryptApiKey`/`decryptApiKey` de `features/ai-analysis/llmCrypto.ts`.

### Survey panels
- Botões de navegação criados em `survey.onAfterRenderPanel.add()` (DOM, não JSX).
- Strings traduzidas devem ser capturadas **antes** do callback — `useTranslations()` não funciona dentro do callback DOM.
- Painéis vivem em `features/assessment/surveys/surveypanels/<domain>/<practice>.ts` e páginas em `surveypages/<domain>.ts`.

### Tailwind v4
- CSS-first (`@tailwindcss/postcss`) — sem `tailwind.config.js` clássico.
- Tema dark base: `#0f111a` com glassmorphism (`bg-white/5`, `backdrop-blur-md`, `border-white/10`).
- Charts e SurveyJS herdam dark via CSS variable overrides.

## Comandos

```bash
npm run dev                  # Next.js Turbopack em :3600
npm run build                # Production build
npm run typecheck            # tsgo --noEmit (0 erros obrigatório)
npm run typecheck:watch      # tsgo em watch
npm test                     # Jest (123/123 deve passar)
npm run test:watch           # Jest em watch
npm run test:coverage        # Jest com coverage report
npm run lint                 # ESLint
```

## Security

### Ferramentas (documentadas em `specs/tech-stack.md`)
- **SAST**: Semgrep — `semgrep --config auto src/`
- **SCA**: safedep/vet — roda no CI; localmente `npm audit --audit-level=high`
- **Secrets**: TruffleHog — `trufflehog filesystem . --only-verified`

### Workflows
- `.github/workflows/cicd.semgrep-reusable.yml`
- `.github/workflows/vet-sca-reusable.yml`
- `.github/workflows/trufflehog.yml`

### Antes de commitar mudanças que tocam:
- **Rotas API** (`pages/api/*`) → rodar Semgrep local
- **Dependências** (`package.json`) → rodar `npm audit`
- **Configs e ENV** → checar com TruffleHog filesystem

### Se um secret for encontrado
1. Revogar credencial no painel do serviço (não esperar)
2. Rotar (gerar nova, atualizar em `.env`/CI)
3. `git filter-repo --replace-text` para limpar histórico
4. Auditar logs de uso da credencial
5. Documentar incidente

## Workflow de Feature

1. **Pegar próxima fase** em `specs/roadmap.md` (primeiro `[ ]`)
2. **Branch**: `git checkout -b YYYY-MM-DD-nome-kebab`
3. **Specs primeiro** (P): `specs/YYYY-MM-DD-nome/{plan,requirements,validation,security}.md`
4. **AskUserQuestion** agrupada em 3 antes de escrever no disco
5. **Implementar** (E) seguindo grupos do `plan.md`
6. **Validar** (V): `npm run typecheck` + `npm test` + verificação manual + scans de segurança
7. **Atualizar specs** se algo mudou — sempre em sincronia com código
8. **Confirmar** (C): marcar fase ✅ no roadmap, atualizar CHANGELOG, commit, merge `--no-ff`, deletar branch

## Anti-patterns

- ❌ Codar sem spec → criar spec primeiro
- ❌ Spec e código dessincronizados → sincronizar e documentar decisão em `requirements.md`
- ❌ Branch longa com múltiplas features → uma feature = uma branch = um merge
- ❌ Versão flutuante em prod (`^`/`~` em deps críticas) → fixar
- ❌ Cache sem TTL, listener sem cleanup, conexão sem close → revisar checklist da PARTE 8 do guia SDSD
- ❌ Mock sem tipagem em testes (`as any`) → `jest.mocked()` ou `as unknown as X`

## Convenções de Commit

Seguir a tradição existente do repo (Conventional Commits leve):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `chore:` manutenção, bumps, configs
- `docs:` documentação
- `test:` adição/ajuste de testes
- `refactor:` reorganização sem mudança de comportamento

Sem requisito de scope obrigatório. Mensagens em PT ou EN aceitáveis (manter consistência por commit).
