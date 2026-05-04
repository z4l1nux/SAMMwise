# Roadmap

Fases marcadas com ✅ já estão implementadas (reconstruídas a partir do git log e do código atual).
Próxima fase a ser definida em sessão futura.

## Phase 1 — Core Assessment Engine ✅
- [x] Survey engine com survey-core/survey-react-ui
- [x] 5 funções de negócio SAMM (Governance, Design, Implementation, Verification, Operations) + Details
- [x] 15 práticas com painéis (`surveypanels/<domain>/<practice>.ts`)
- [x] Cálculo de score por prática/função/geral em `features/assessment/graphs/testCalculator.ts`
- [x] Persistência via sessionStorage (`assessmentState`)

## Phase 2 — Visualização & Comparação ✅
- [x] Radar (Spider) por função e por prática
- [x] Bar chart por função e por prática
- [x] Donut de distribuição de respostas
- [x] Comparação com avaliação anterior carregada via JSON
- [x] Bandas interpretativas (Initial / Managed / Defined / Optimized)

## Phase 3 — i18n EN/PT-BR ✅
- [x] next-intl v4 com namespaces (nav, home, assessment, results, charts, upload, footer, buttons, errors, llm, meta)
- [x] survey-core locale registrado em `survey-pt.ts`
- [x] Função `translateSurvey` em `translations-pt.ts` para traduzir conteúdo do questionário

## Phase 4 — PDF Export ✅
- [x] jsPDF + html-to-image em `lib/exportPdf.ts`
- [x] `prepareForCapture` (Tailwind color resolution + backdrop-filter neutralization)
- [x] Page-break inteligente baseado em rows de fundo (`calculatePageBreaks`)
- [x] Composição de chart canvases para preservar nitidez
- [x] 123 testes cobrindo as funções públicas

## Phase 5 — LLM Analysis ✅
- [x] 4 providers (Anthropic, OpenAI, Gemini, Ollama)
- [x] AES-GCM 256-bit com Web Crypto, JWK em localStorage
- [x] Proxy `pages/api/llm.ts` para evitar CORS
- [x] Auto-analysis toggle persistido com `sammwise_llm_settings`
- [x] Análise embutida no JSON de resultados (persiste no import)

## Phase 6 — TypeScript Migration ✅
- [x] Migração completa JS→TS (commit `3b07bb3`)
- [x] tsconfig com `moduleResolution: bundler`, `jsx: react-jsx`, `strict: false` (legado)
- [x] tsgo (`@typescript/native-preview`) configurado em `npm run typecheck`
- [x] `@types/jest` + `"types": ["jest", "node"]` para resolução em tests
- [x] 0 erros no `tsgo --noEmit`

## Phase 7 — Security Scanning (Shift-Left) ✅
- [x] Semgrep workflow (`cicd.semgrep-reusable.yml`) com PARANOIA_LEVEL=2
- [x] Vet (safedep) workflow para SCA (`vet-sca-reusable.yml`)
- [x] TruffleHog workflow com `--results=verified,unknown,unverified` (`trufflehog.yml`)
- [x] Docker build & push (Hub + GHCR) em `action.yml`

## Phase 8 — Dark Theme Redesign ✅
- [x] Glassmorphism `#0f111a` em todas as páginas
- [x] Tailwind v4 CSS-first (sem CSS modules legado)
- [x] Framer Motion em interações
- [x] SurveyJS overrides de CSS variables para dark
- [x] Charts adaptados (legends, gridlines, axes para dark)

## Phase 9 — SDSD Adoption ✅
- [x] specs/mission.md, tech-stack.md, roadmap.md
- [x] AGENTS.md (fonte única de regras) + CLAUDE.md (export)
- [x] CHANGELOG.md inicial

## Próximas Fases

Definidas em sessão futura. Candidatas levantadas mas não priorizadas:

- **Polish & UX**: cobertura de testes em pages/, acessibilidade WCAG AA, performance budget, validação server-side de inputs.
- **Verification Levels (importado do AISVS fork)**: heatmap L1/L2/L3 e compliance % adaptado para SAMM (se fizer sentido conceitualmente para o modelo SAMM).
- **CI/CD reforçado**: matrix de Node versions, smoke test E2E (Playwright), lighthouse-ci.
