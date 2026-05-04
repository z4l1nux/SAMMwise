# Tech Stack

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript 5.7 | Tipagem estática, ecossistema React, refactor seguro |
| Framework | Next.js 16.2 (Pages Router) | SSG/SSR, Turbopack para dev, Pages Router por compat com SurveyJS |
| UI library | React 18.3 | Concurrent features, suporte completo a Next.js 16 |
| Survey engine | survey-core / survey-react-ui 1.12 | Renderização de questionário SAMM com painéis dinâmicos |
| Charts | Chart.js 4.4 + react-chartjs-2 | Radar/barras/donut, performante em canvas |
| Styling | Tailwind CSS v4 (@tailwindcss/postcss) | CSS-first config, dark glassmorphism theme |
| Animations | Framer Motion 12 | Animações de entrada/hover sem boilerplate |
| PDF export | jsPDF 4 + html-to-image | Captura visual + paginação inteligente client-side |
| i18n | next-intl 4 | EN/PT-BR, namespaces (nav, home, assessment, results, charts, llm…) |
| Type-check | tsgo (@typescript/native-preview) | ~3x mais rápido que tsc para CI/local |

## State Management

Sem store global. Estado vive em `sessionStorage` com chaves:
- `assessmentState` — respostas do questionário + metadata
- `userState` — dados do usuário/projeto
- `dataResults`, `prevResults`, `loadedResults` — datasets para charts/comparação
- `sammwise_llm_settings` (localStorage) — config LLM do usuário
- `sammwise_enc_key` (localStorage) — JWK AES-GCM device-bound

## Testing

- **Jest 30** + **@testing-library/react 16** — unit/integration de componentes e libs
- **babel-jest 30** — transpilação para o ambiente de teste (jsdom)
- **@types/jest 30** — globals tipados (describe, it, expect, jest)
- Cobertura atual: 123 testes em 5 suites. Scripts: `npm test`, `npm run test:watch`, `npm run test:coverage`.

## Type-checking

- `npm run typecheck` — `tsgo --noEmit`
- `npm run typecheck:watch` — `tsgo --noEmit --watch`
- tsconfig fixa `"types": ["jest", "node"]` para garantir resolução em moduleResolution=bundler

## CSS / UI

- **Mobile-first** com dark theme `#0f111a` (glassmorphism cards)
- Tailwind v4 sem CSS modules legado
- SurveyJS dark theme via overrides de CSS variables
- Charts adaptados para fundo escuro (legends, gridlines, axes)

## LLM Integration (opcional)

- 4 providers: Anthropic Claude, OpenAI GPT, Google Gemini, Ollama (local)
- API keys criptografadas com **AES-GCM 256-bit** via Web Crypto API, JWK persistida em localStorage
- Proxy server-side em `pages/api/llm.ts` para evitar CORS
- Análise persiste embutida no JSON de resultados para reaparecer no import

## Security (Shift-Left)

| Categoria | Ferramenta | Workflow |
|---|---|---|
| **SAST** | Semgrep (`--config auto`, PARANOIA_LEVEL configurável) | `.github/workflows/cicd.semgrep-reusable.yml` |
| **SCA** | safedep/vet-action | `.github/workflows/vet-sca-reusable.yml` |
| **Secrets** | TruffleHog (`--results=verified,unknown,unverified`) | `.github/workflows/trufflehog.yml` |
| **Container** | Docker build + push (Hub + GHCR) | `.github/workflows/action.yml` |

### Comandos locais

```bash
# SAST
semgrep --config auto src/

# SCA (npm-native)
npm audit --audit-level=high

# Secrets (filesystem completo + histórico git)
trufflehog filesystem . --only-verified
trufflehog git file://. --since-commit HEAD~10
```

> Os scans rodam automaticamente em todo push/PR no CI. Localmente: rodar antes do commit em mudanças de superfície de ataque (rotas, deps, configs).

## Dependency Pinning

- Lockfile (`package-lock.json`) commitado obrigatoriamente
- Atualizações via Dependabot — PRs revisados manualmente, não merge automático
- Versões com `^` aceitáveis em devDependencies; produção monitorada por SCA

## Deploy

- Container Docker (multi-stage `docker/Dockerfile`)
- Imagens publicadas em Docker Hub e GHCR (`sammwise:latest`)
- `docker-compose.yml` para orquestração local em `127.0.0.1:3600`

## Architecture (Feature Slices)

```
src/
├── components/         ← shared UI (navbar, footer, buttons)
├── features/
│   ├── assessment/     ← surveytypeone, surveynav, totalsurvey, surveypages/, surveypanels/
│   ├── ai-analysis/    ← LLMAnalysis, LLMSettings, llmCrypto, llmPrompt
│   └── (results vive em pages/results.tsx por histórico)
├── lib/                ← exportPdf
├── messages/           ← en.json, pt.json
├── pages/              ← Next.js Pages Router (index, assessment, results, about, ai, api/)
└── types/
```
