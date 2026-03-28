<p align="center">
    <img style="background-color:grey" src="https://owasp.org/assets/images/logo.svg" height="128">
    <h1 align="center">AISVSwise</h1>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2.1-black?style=for-the-badge&logo=next.js">
  <img alt="React" src="https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript">
  <img alt="License" src="https://img.shields.io/github/license/owaspsamm/AISVSwise?style=for-the-badge">
</p>

## 🚀 Introduction

**AISVSwise** is an open-source, browser-based assessment tool for the [OWASP Artificial Intelligence Security Verification Standard (AISVS)](https://owasp.org/www-project-artificial-intelligence-security-verification-standard/).

OWASP AISVS is an open framework for verifying the security of AI systems — including LLMs, agents, RAG pipelines, and model infrastructure. AISVSwise walks your organization through all 14 AISVS controls, scores your maturity across 97 sub-controls, and provides AI-powered improvement recommendations — all without uploading any data to a server.

## ✨ What's New in This Version

### 🔒 Security Enhancements
- ✅ **XSS protection** — LLM output sanitized with HTML escaping before markdown rendering
- ✅ **Zero vulnerabilities** — All dependencies updated and secured
- ✅ **Next.js 16.2** — Turbopack enabled with enhanced performance
- ✅ **GitHub Actions** — Automated security scanning: Semgrep, TruffleHog, Vet
- ✅ **AES-GCM encrypted API keys** — Stored only on your device, never transmitted to our servers

### 🌍 Internationalization (i18n)
- ✅ **Full Portuguese (PT-BR) survey** — All 14 control pages, 97 panel names, and answer choices translated
- ✅ **Complete i18n parity** — `en.json` and `pt.json` fully in sync (validated by CI tests)
- ✅ **Accessibility strings** — Alt text and `aria-label` attributes fully translated (`a11y` namespace)
- ✅ **LLM provider labels** — Provider names translated via `providers` namespace

### 🎨 Design & UI — Dark Glassmorphism Theme
- ✅ **Dark theme** — consistent `#0f111a` background with glassmorphism cards
- ✅ **Tailwind CSS v4** — CSS-first configuration, zero legacy CSS modules
- ✅ **Feature Slices architecture** — code organized by domain
- ✅ **Framer Motion** — smooth animations on buttons, navbar, and interactive elements
- ✅ **Responsive design** — works on desktop and mobile

### 🛠️ Technical Upgrades
- ✅ **TypeScript 5.7** — Full codebase migration
- ✅ **i18n via next-intl v4** — English & Portuguese (BR)
- ✅ **Unit Tests** — Jest 30 + React Testing Library (122 tests)
- ✅ **Docker port aligned** — Dockerfile, docker-compose, and npm scripts all use port **3600**

### 🤖 AI-Powered Analysis
- ✅ **Multi-provider LLM** — Anthropic, OpenAI, Gemini, and Ollama support
- ✅ **Encrypted API keys** — AES-GCM encryption stored only on your device
- ✅ **Auto or manual analysis** — Toggle automatic analysis per report
- ✅ **Persisted with report** — AI analysis saved inside the JSON report file
- ✅ **Comparison support** — Analysis reloaded when importing previous reports

## 📋 Prerequisites

- **Node.js** 20.9.0 or higher
- **npm** 10.x or higher

## 🚀 Getting Started

### Using Docker (Recommended)

```bash
# Pull the image
docker pull z4l1nux/AISVSwise:latest

# Run the container
docker run -d -p 3600:3600 --name AISVSwise-app z4l1nux/AISVSwise:latest
```

### Using Docker Compose

```bash
docker-compose up
```

### Using Node.js

1. **Install dependencies:**
```bash
npm install
```

2. **Run in development mode:**
```bash
npm run dev
```

3. **Or build for production:**
```bash
npm run build
npm start
```

The application will be available at **http://localhost:3600**

## 🌍 Internationalization (i18n)

AISVSwise supports multiple languages via **next-intl v4**.

### Supported Languages
- 🇺🇸 **English** (default)
- 🇧🇷 **Português** (Brazilian Portuguese)

### Features
- **Language Switcher** in the navbar with animated dropdown
- **Survey fully translated** — panel names, page titles, and answer choices all localized
- **SEO optimized** — page titles and meta descriptions per language
- **Easy to extend** — add new languages by creating `src/messages/<locale>.json` and adding the locale to `next.config.js`

## 📊 Features

### Assessment Page (`/assessment`)
- **14 AISVS Controls** covering the full AI security lifecycle:
  - C1 Training Data · C2 Input Validation · C3 Model Lifecycle · C4 Infrastructure
  - C5 Access Control · C6 Supply Chain · C7 Model Behavior · C8 Memory & Vectors
  - C9 Agentic Actions · C10 MCP Security · C11 Adversarial Robustness · C12 Privacy
  - C13 Monitoring · C14 Human Oversight
- **97 sub-control panels** with 454 individual verification questions
- **4-point scale** per question: No / Yes, for some / Yes, for most / Yes, for all
- **Progress Tracking** — Save and resume assessments at any time
- **Import/Export** — Share results in JSON format
- **Panel navigation** — Previous/Next buttons within each control

### Results Page (`/results`)
- **Visual Analytics:**
  - 🎯 Gauge Chart — Overall maturity score (0–3 scale)
  - 📊 Bar Charts — Response distribution and control scores
  - 🕸️ Radar Charts — Multi-dimensional view across all 14 controls
  - 📋 Practice Breakdown Table — Color-coded maturity levels (Initial / Managed / Defined / Optimized)
- **Comparison Mode** — Compare current vs. previous assessments
- **Export Options** — Download results as JSON or PDF
- **AI Analysis** — Detailed insights and improvement roadmap via LLM

### AI Settings Page (`/ai`)
- **Provider Selection** — Anthropic, OpenAI, Gemini, or Ollama (fully local)
- **Dynamic Model Fetching** — Models fetched live from the provider API
- **Encrypted Storage** — API keys encrypted with AES-GCM, stored only on device
- **Auto-Analysis Toggle** — Optionally trigger analysis automatically after completing an assessment

## 🎯 Usage Guide

1. **Start Assessment** — Navigate to `/assessment`
2. **Complete Questions** — Answer verification questions across all 14 AISVS controls
3. **Save Progress** — Use "Save Responses" to back up your work at any time
4. **View Results** — Navigate to `/results` to see charts and your maturity score
5. **AI Analysis** — Configure a provider at `/ai`, then click "Analyze Results"
6. **Compare** — Upload a previous JSON report to visualize improvements over time

## 🏗️ Project Structure

```
AISVSwise/
├── src/
│   ├── pages/                  # Next.js pages (TypeScript)
│   │   ├── index.tsx           # Home page
│   │   ├── assessment.tsx      # Assessment survey
│   │   ├── results.tsx         # Results dashboard
│   │   ├── ai.tsx              # AI settings
│   │   ├── about.tsx           # About AISVS
│   │   └── api/                # API proxy routes (LLM)
│   ├── features/               # Feature slices (domain logic)
│   │   ├── assessment/         # Survey engine, panels, navigation
│   │   │   ├── graphs/         # Chart class definitions (.ts)
│   │   │   └── surveys/
│   │   │       ├── surveypages/    # c01.ts … c14.ts (control pages)
│   │   │       ├── surveypanels/   # c01/ … c14/ (sub-control panels)
│   │   │       ├── translations-pt.ts  # PT translations + translateSurvey()
│   │   │       └── totalsurvey.ts  # Aggregates all 14 controls
│   │   ├── results/            # GaugeChart component
│   │   └── ai-analysis/        # LLM integration (settings, analysis, crypto, prompt)
│   ├── components/             # Shared UI components
│   │   ├── navbar.tsx          # Sticky glassmorphism navbar
│   │   ├── footer.tsx          # OWASP footer
│   │   ├── LanguageSwitcher.tsx# Animated language dropdown
│   │   ├── inputfile.tsx       # Drag-and-drop file upload
│   │   └── buttons/            # NavButton, SurveyButton, DropdownButton
│   ├── types/                  # Shared TypeScript types (index.ts)
│   ├── messages/               # i18n translation files (en.json, pt.json)
│   └── styles/                 # Global CSS (Tailwind v4, SurveyJS dark overrides)
├── __tests__/                  # Jest unit tests (122 tests)
└── public/                     # Static assets
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

Copyright 2021-2026 OWASP Foundation.

## 🔗 Resources

- **OWASP AISVS**: [https://owasp.org/www-project-artificial-intelligence-security-verification-standard/](https://owasp.org/www-project-artificial-intelligence-security-verification-standard/)
- **OWASP Foundation**: [https://owasp.org](https://owasp.org)
- **OWASP Slack**: Join the community for support and discussions

## 🐛 Known Issues

- Some legacy browsers may have compatibility issues with glassmorphism effects
- Print/PDF layout is optimized for A4 paper size

## 🎉 Acknowledgments

- OWASP Foundation for the AISVS framework
- Modernization, redesign, and AI integration by the OWASP community

## 📈 Version History

- **v2.5.0** (2026) — Security, i18n & test hardening
  - XSS fix: HTML escaping applied to all LLM output before `dangerouslySetInnerHTML`
  - Portuguese survey fully translated: 14 control pages, 97 panel names, all choice labels
  - `translateSurvey()` now correctly called in `totalsurvey.ts` (was orphaned)
  - New `a11y` and `providers` i18n namespaces; alt text and aria-labels fully localized
  - Initial `navbarState` corrected from `'Governance'` (stale SAMM value) to `'Control 1'`
  - Docker port unified to **3600** across Dockerfile, docker-compose, and npm scripts
  - Test suite updated for AISVS structure: 14 controls, 97 panels, real `q_c*` question names

- **v2.4.0** (2026) — Full TypeScript migration
  - Migrated all 62 source files from `.js`/`.jsx` to `.ts`/`.tsx`
  - Added `src/types/index.ts` with shared domain types
  - Expanded test suite to 122 tests (Jest 30 + React Testing Library)

- **v2.3.0** (2026) — Framework upgrade & Turbopack
  - Upgraded to Next.js 16.2.1 with Turbopack
  - Node.js minimum bumped to v20.9.0

- **v2.2.0** (2026) — Dark glassmorphism redesign
  - Full dark theme with Tailwind CSS v4
  - Feature Slices architecture
  - AI auto-trigger guard (`freshCompletion` flag)

- **v2.1.0** (2026) — AI integration
  - Multi-provider LLM analysis (Anthropic, OpenAI, Gemini, Ollama)
  - AES-GCM encrypted API key storage
  - Practice breakdown table with maturity bands

- **v2.0.0** (2026) — Major modernization
  - AISVS framework adoption (14 controls replacing SAMM 5-domain model)
  - Next.js 15, React 18, i18n support (EN/PT-BR)

- **v0.1.0** (2021–2023) — Original release
  - Next.js 10, React 16, basic SAMM assessment functionality

---

<p align="center">Made with ❤️ by the OWASP Community</p>
# AISVSwise
