<p align="center">
    <img style="background-color:grey" src="https://owasp.org/assets/images/logo.svg" height="128">
    <h1 align="center">SAMMwise - Modernized Edition</h1>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js">
  <img alt="React" src="https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react">
  <img alt="License" src="https://img.shields.io/github/license/owaspsamm/sammwise?style=for-the-badge">
</p>

## 🚀 Introduction

The mission of OWASP Software Assurance Maturity Model (SAMM) is to be the prime maturity model for software assurance that provides an effective and measurable way for all types of organizations to analyze and improve their software security posture. OWASP SAMM supports the complete software lifecycle, including development and acquisition, and is technology and process agnostic. It is intentionally built to be evolutive and risk-driven in nature.

**SAMMwise** is an open source Web App to calculate the Maturity score of an individual, enterprise, or project using the SAMM model. The application walks you through the assessment, allows you to save and re-use previously completed assessments, and presents the results in a similar style to the spreadsheet.

## ✨ What's New in This Version

This is a **modernized and security-hardened version** of SAMMwise with significant improvements:

### 🔒 Security Enhancements
- ✅ **Zero vulnerabilities** - All dependencies updated and secured
- ✅ **Next.js 15.5** - Latest stable version with enhanced security
- ✅ **React 18.3** - Modern React with concurrent features
- ✅ **Chart.js 4.4** - Latest charting library

### 🎨 Design Improvements
- ✅ **Modern UI/UX** - Completely redesigned with gradient backgrounds
- ✅ **Responsive Design** - Works seamlessly on all devices
- ✅ **Enhanced Accessibility** - Better color contrast and navigation
- ✅ **Smooth Animations** - Professional transitions and hover effects

### 🛠️ Technical Upgrades
- ✅ **Survey-React-UI 1.12** - Modern survey components
- ✅ **Custom Gauge Charts** - Built with Chart.js for better compatibility
- ✅ **Improved Performance** - Faster load times and rendering
- ✅ **i18n Support** - Multi-language support (English & Portuguese)
- ✅ **Unit Tests** - Jest 30 + React Testing Library (78 tests)

### 🤖 AI-Powered Analysis
- ✅ **Multi-provider LLM** - Anthropic, OpenAI, Gemini, and Ollama support
- ✅ **Encrypted API keys** - AES-GCM encryption stored only on your device
- ✅ **Auto or manual analysis** - Toggle automatic analysis per report
- ✅ **Persisted with report** - AI analysis saved inside the JSON report file
- ✅ **Comparison support** - Analysis reloaded when importing previous reports

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

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
- **Language Switcher** in the navbar
- **Persistent preference** saved in localStorage
- **SEO optimized** for each language
- **Easy to extend** - add new languages by creating a new file in `messages/`

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
- **Auto-save** - Responses saved automatically on every answer

### Results Page (`/results`)
- **Visual Analytics** - Beautiful charts and graphs:
  - 🎯 Gauge Chart - Overall maturity score (0–3 scale)
  - 📊 Bar Charts - Response distribution and domain scores
  - 🕸️ Radar Charts - Multi-dimensional analysis
  - 📋 Practice Breakdown Table - Color-coded maturity levels per practice

- **Score Interpretation** - Maturity band legend (Initial / Managed / Defined / Optimized)
- **Comparison Mode** - Compare current vs. previous assessments
- **Export Options** - Download results as JSON or PDF
- **AI Analysis** - Detailed insights and improvement roadmap via LLM

### AI Settings Page (`/ai`)
- **Provider Selection** - Choose from Anthropic, OpenAI, Gemini, or Ollama
- **Dynamic Model Fetching** - Models are fetched live from the provider API
- **Encrypted Storage** - API keys encrypted with AES-GCM, stored only on device
- **Auto-Analysis Toggle** - Optionally generate analysis on every report view

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
├── pages/              # Next.js pages
│   ├── index.js        # Home page
│   ├── assessment.js   # Assessment survey
│   ├── results.js      # Results dashboard
│   ├── ai.js           # AI settings
│   ├── about.js        # About SAMM
│   └── api/            # API proxy routes (LLM)
├── comps/              # React components
│   ├── charts/         # Chart components
│   ├── llm/            # LLM integration (settings, analysis, crypto, prompt)
│   ├── surveyDisplay/  # Survey logic and graph classes
│   └── buttons/        # UI components
├── messages/           # i18n translation files (en.json, pt.json)
├── styles/             # CSS modules and global styles
├── __tests__/          # Jest unit tests (78 tests)
└── public/             # Static assets
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
- Modernization and security updates by the community
- OWASP Foundation for the SAMM framework

## 📈 Version History

- **v2.1.0** (2026) - AI integration and quality improvements
  - Multi-provider LLM analysis (Anthropic, OpenAI, Gemini, Ollama)
  - AES-GCM encrypted API key storage
  - Practice breakdown table with maturity bands
  - Score interpretation legend
  - Dynamic model fetching from provider APIs
  - Mobile responsive improvements
  - 78 unit tests (Jest 30 + React Testing Library)
  - Panel navigation buttons unified inside survey panels

- **v2.0.0** (2025) - Major modernization update
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
