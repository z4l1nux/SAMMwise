<p align="center">
    <img style="background-color:grey" src="https://owasp.org/assets/images/logo.svg" height="128">
    <h1 align="center">SAMMwise - Modernized Edition</h1>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2.1-black?style=for-the-badge&logo=next.js">
  <img alt="React" src="https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript">
  <img alt="License" src="https://img.shields.io/github/license/owaspsamm/sammwise?style=for-the-badge">
</p>

## 🚀 Introduction

The mission of OWASP Software Assurance Maturity Model (SAMM) is to be the prime maturity model for software assurance that provides an effective and measurable way for all types of organizations to analyze and improve their software security posture. OWASP SAMM supports the complete software lifecycle, including development and acquisition, and is technology and process agnostic. It is intentionally built to be evolutive and risk-driven in nature.

**SAMMwise** is an open source Web App to calculate the Maturity score of an individual, enterprise, or project using the SAMM model. The application walks you through the assessment, allows you to save and re-use previously completed assessments, and presents the results in a similar style to the spreadsheet.

## ✨ What's New in This Version

This is a **modernized, redesigned, and security-hardened version** of SAMMwise with significant improvements:

### 🔒 Security Enhancements
- ✅ **Zero vulnerabilities** - All dependencies updated and secured
- ✅ **Next.js 16.2** - Turbopack enabled with enhanced performance and cache APIs
- ✅ **React 18.3** - Modern React with concurrent features
- ✅ **Chart.js 4.4** - Latest charting library
- ✅ **GitHub Actions** - Automated security scanning: Semgrep, TruffleHog, Vet

### 🎨 Design & UI — Dark Glassmorphism Theme
- ✅ **Dark theme** — consistent `#0f111a` background with glassmorphism cards across all pages
- ✅ **Tailwind CSS v4** — CSS-first configuration, zero legacy CSS modules
- ✅ **Feature Slices architecture** — code organized by domain (`features/assessment/`, `features/results/`, `features/ai-analysis/`)
- ✅ **Framer Motion** — smooth animations on buttons, navbar, and interactive elements
- ✅ **Ambient background glows** — fixed cyan/purple decorative glows clipped to viewport
- ✅ **Sticky glassmorphism navbar** — `backdrop-blur-md` with proper scroll offset for all pages
- ✅ **Responsive design** — works on desktop and mobile
- ✅ **SurveyJS dark theme** — survey questions inherit the dark palette via CSS variable overrides
- ✅ **Chart dark theme** — radar, bar, and donut charts styled for dark backgrounds

### 🛠️ Technical Upgrades
- ✅ **TypeScript 5.7** - Full codebase migration (62 files: `.ts`/`.tsx`)
- ✅ **Survey-React-UI 1.12** - Modern survey components
- ✅ **Custom Gauge Charts** - Built with Chart.js for better compatibility
- ✅ **Improved Performance** - Faster load times and rendering
- ✅ **i18n Support** - Multi-language support (English & Portuguese) via next-intl v4
- ✅ **Unit Tests** - Jest 30 + React Testing Library (123 tests)
- ✅ **scroll-padding-top** — global CSS offset ensures sticky navbar never overlaps scrollIntoView targets

### 🤖 AI-Powered Analysis
- ✅ **Multi-provider LLM** — Anthropic, OpenAI, Gemini, and Ollama support
- ✅ **Encrypted API keys** — AES-GCM encryption stored only on your device
- ✅ **Auto or manual analysis** — Toggle automatic analysis per report
- ✅ **Fresh-completion guard** — AI auto-trigger only fires after completing a new assessment, not on page reload
- ✅ **Persisted with report** — AI analysis saved inside the JSON report file
- ✅ **Comparison support** — Analysis reloaded when importing previous reports
- ✅ **Dark-themed analysis card** — Markdown rendering with proper contrast on dark backgrounds

## 📋 Prerequisites

- **Node.js** 20.9.0 or higher
- **npm** 10.x or higher

## 🚀 Getting Started

### Using Docker (Recommended)

```bash
# Pull the image
docker pull z4l1nux/sammwise:latest

# Run the container with custom name
docker run -d -p 3500:3500 --name sammwise-app z4l1nux/sammwise:latest

# Or run without custom name (will get random name like "sweet_hugle")
docker run -d -p 3500:3500 z4l1nux/sammwise:latest
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

The application will be available at **http://localhost:3500**

## 🌍 Internationalization (i18n)

SAMMwise supports multiple languages!

### Supported Languages
- 🇺🇸 **English** (default)
- 🇧🇷 **Português** (Brazilian Portuguese)

### Features
- **Language Switcher** in the navbar with animated dropdown (Framer Motion)
- **Persistent preference** saved in localStorage
- **SEO optimized** for each language
- **Easy to extend** - add new languages by creating a new file in `src/messages/`

See [I18N Documentation](docs/I18N.md) for details on adding new languages.

## 📊 Features

### Assessment Page (`/assessment`)
- **Comprehensive Survey** - Evaluate your organization across 5 domains:
  - 🏛️ **Governance** - Security policies and organization
  - 🎨 **Design** - Security architecture and threat modeling
  - 💻 **Implementation** - Secure coding and build practices
  - ✅ **Verification** - Security testing and reviews
  - ⚙️ **Operations** - Incident management and environment security

- **Progress Tracking** - Save and resume assessments
- **Import/Export** - Share results in JSON format
- **Panel navigation** - Previous/Next Practice buttons within each domain
- **Domain navigation** - Dot-based navbar to jump between domains with scroll-to-top

### Results Page (`/results`)
- **Visual Analytics** - Beautiful charts and graphs:
  - 🎯 Gauge Chart - Overall maturity score (0–3 scale)
  - 📊 Bar Charts - Response distribution and domain scores (dark-themed)
  - 🕸️ Radar Charts - Multi-dimensional analysis (dark-themed, visible grid lines)
  - 📋 Practice Breakdown Table - Color-coded maturity levels per practice

- **Score Interpretation** - Maturity band legend (Initial / Managed / Defined / Optimized)
- **Comparison Mode** - Compare current vs. previous assessments
- **Export Options** - Download results as JSON or PDF
- **AI Analysis** - Detailed insights and improvement roadmap via LLM

### AI Settings Page (`/ai`)
- **Provider Selection** - Choose from Anthropic, OpenAI, Gemini, or Ollama
- **Dynamic Model Fetching** - Models are fetched live from the provider API
- **Encrypted Storage** - API keys encrypted with AES-GCM, stored only on device
- **Auto-Analysis Toggle** - Optionally generate analysis only on fresh assessment completion

## 🎯 Usage Guide

1. **Start Assessment** - Navigate to `/assessment`
2. **Complete Questions** - Answer questions across all 5 domains and Details
3. **Save Progress** - Use "Save Responses" to backup your work at any time
4. **View Results** - Navigate to `/results` to see charts and your maturity score
5. **AI Analysis** - Configure a provider at `/ai`, then click "Analyze Results"
6. **Compare** - Upload a previous JSON report to visualize improvements

## 🏗️ Project Structure

```
sammwise/
├── src/
│   ├── pages/                  # Next.js pages (TypeScript)
│   │   ├── index.tsx           # Home page
│   │   ├── assessment.tsx      # Assessment survey
│   │   ├── results.tsx         # Results dashboard
│   │   ├── ai.tsx              # AI settings
│   │   ├── about.tsx           # About SAMM
│   │   └── api/                # API proxy routes (LLM)
│   ├── features/               # Feature slices (domain logic)
│   │   ├── assessment/         # Survey engine, panels, navigation
│   │   │   ├── graphs/         # Chart class definitions (.ts)
│   │   │   └── surveys/        # Survey JSON (panels, pages, translations)
│   │   ├── results/            # GaugeChart component (.tsx)
│   │   └── ai-analysis/        # LLM integration (settings, analysis, crypto, prompt)
│   ├── components/             # Shared UI components (TypeScript)
│   │   ├── layout.tsx          # App shell (navbar + footer + glows)
│   │   ├── navbar.tsx          # Sticky glassmorphism navbar
│   │   ├── footer.tsx          # OWASP footer
│   │   ├── LanguageSwitcher.tsx# Animated language dropdown
│   │   ├── inputfile.tsx       # Drag-and-drop file upload
│   │   └── buttons/            # NavButton, SurveyButton, DropdownButton
│   ├── types/                  # Shared TypeScript types (index.ts)
│   ├── messages/               # i18n translation files (en.json, pt.json)
│   └── styles/                 # Global CSS (Tailwind v4, SurveyJS dark overrides)
├── __tests__/                  # Jest unit tests (123 tests)
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

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

Copyright 2021-2026 Datacom NZ Ltd.

## 🔗 Resources

- **OWASP SAMM Website**: [https://owaspsamm.org](https://owaspsamm.org)
- **OWASP SAMM Documentation**: [https://owaspsamm.org/about/](https://owaspsamm.org/about/)
- **OWASP Slack**: Join the community for support and discussions

## 🐛 Known Issues

- Some legacy browsers may have compatibility issues
- Print layout is optimized for A4 paper size

## 🎉 Acknowledgments

- Original project by **Datacom NZ Ltd.**
- Modernization, redesign and AI integration by the community
- OWASP Foundation for the SAMM framework

## 📈 Version History

- **v2.4.0** (2026) - Full TypeScript Migration
  - Migrated all 62 source files from `.js`/`.jsx` to `.ts`/`.tsx`
  - Added `tsconfig.json` with `strict: false`, `allowJs: true`, `moduleResolution: bundler`
  - Created `src/types/index.ts` with shared domain types (LLM, scores, survey, charts)
  - Expanded test suite from 78 to 123 tests (all `.test.ts`)
  - Fixed framer-motion, react-dropzone, and next-intl v4 type compatibility issues

- **v2.3.0** (2026) - Framework Upgrade & Turbopack
  - Upgraded Next.js from 15.5 to 16.2.1 and enabled Turbopack for ultra-fast builds
  - Bumped ESLint to 9.0 and removed deprecated `next lint` CLI command
  - Node.js minimum requirement bumped to v20.9.0
  - Refactored `react-to-print` logic to `useReactToPrint` hook to prevent React #130 client-side crash

- **v2.2.0** (2026) - Dark glassmorphism redesign & architecture refactor
  - Full dark theme with Tailwind CSS v4 across all pages
  - Feature Slices architecture (`features/assessment/`, `features/results/`, `features/ai-analysis/`)
  - SurveyJS dark theme via CSS variable overrides (`--sjs-*`)
  - Radar and bar charts with dark-compatible Chart.js options
  - AI analysis card migrated from light to dark theme
  - `scroll-padding-top` for sticky navbar compatibility
  - Survey domain navigation with automatic scroll-to-top
  - AI auto-trigger guard (`freshCompletion` flag) — only fires after completing a new assessment
  - Removed `titleLocation: "left"` from all 90 survey questions (fixes two-column layout)
  - Ambient background glows clipped to viewport (no extra scroll space below footer)
  - Global `routeChangeComplete` scroll-to-top for client-side navigation

- **v2.1.0** (2026) - AI integration and quality improvements
  - Multi-provider LLM analysis (Anthropic, OpenAI, Gemini, Ollama)
  - AES-GCM encrypted API key storage
  - Practice breakdown table with maturity bands
  - Score interpretation legend
  - Dynamic model fetching from provider APIs
  - Mobile responsive improvements
  - 78 unit tests (Jest 30 + React Testing Library)
  - Panel navigation buttons unified inside survey panels

- **v2.0.0** (2026) - Major modernization update
  - Updated to Next.js 15, React 18
  - Security vulnerabilities fixed
  - Modern UI/UX redesign
  - i18n support (EN/PT-BR)
  - Custom chart components

- **v0.1.0** (2021-2023) - Original release
  - Next.js 10, React 16
  - Basic functionality

---

<p align="center">Made with ❤️ by the OWASP Community</p>
