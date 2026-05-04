# Changelog

## 2026-04-16
- chore(deps): bump dompurify from 3.3.3 to 3.4.0

## 2026-04-11
- chore: full rollback (AISVS content → SAMM content restored from commit `0991713`)
- fix: name app (SAMMwise branding throughout)
- chore: change name in README and code references

## 2026-04-10
- chore(deps): bump next from 16.2.1 to 16.2.3
- chore(deps): bump next-intl from 4.3.12 to 4.9.1
- chore(deps): bump lodash from 4.17.23 to 4.18.1

## 2026-03-28
- feat: create aisvswise (later reverted on 2026-04-11 — see rollback above)

## 2026-03-27
- chore(deps): bump brace-expansion

## 2026-03-26
- chore(deps): bump picomatch

## 2026-03-23
- chore: update README
- chore: eslint and prettier config
- feat: migrate entire codebase to TypeScript

## 2026-03-22
- feat: implement jspdf for PDF export
- fix: errors in reports and Survey component
- chore: sync package-lock.json with updated package.json
- chore: dockerfile node version bump
- fix: onclick botão next
- docs: update README with Next.js 16 version history and prerequisites
- fix(results): refactor deprecated ReactToPrint component to useReactToPrint hook
- chore: upgrade Next.js to 16.2.1
- chore: remove settings
- fix: dockerfile and docker hub errors
- chore: i18n all components
- chore: gitignore
- feat: re-design (dark glassmorphism theme)

## 2026-03-21
- fix: remove flag legacy
- fix: update node 24 actions version
- feat: add trufflehog action
- fix: update vet actions version
- fix: update actions version
- feat: update components, add LLM, API routes and tests

## 2025-10-27
- chore: vet policy default
- fix: rollback version vet ci
- chore: fail-on-findings true
- chore: workflow vet sca
- feat: add SCA vet workflow
- feat: add CI Semgrep SAST

## 2025-10-21
- fix: set default container name
- fix: adicionar arquivos de internacionalização ao Docker

## 2025-10-20
- fix: change score pizza chart
- feat: Sharp opcional para otimização de imagens
- fix: next page navigation working
- chore: send to Docker Hub
- chore: auth Docker Hub
- fix: Dockerfile error
- fix: next page not work
- fix: libs and errors
- feat: new sammwise (initial modernized version)

## Histórico anterior

Commits anteriores a 2025-10-20 são do projeto upstream original do OWASP SAMM e podem ser consultados via `git log --before=2025-10-20`.
