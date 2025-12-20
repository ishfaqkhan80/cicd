# CI/CD Learning Project - Todos

## ✅ FASE 0: Fundament - Git & GitHub setup
- [x] Installere Git, Node.js, VS Code
- [x] Lage GitHub repository
- [x] Koble lokalt repo til GitHub
- [x] Første commit og push
- [x] Lage .gitignore fil

## ✅ FASE 1: Minimal applikasjon (Books API)
- [x] Initialisere Node.js prosjekt (package.json)
- [x] Installere dependencies (Express, TypeScript, Vitest)
- [x] Lage TypeScript konfigurasjon
- [x] Skrive første endpoint: GET /health
- [x] Skrive første test med Vitest + Supertest
- [x] Teste at alt fungerer lokalt
- [x] Commit og push til GitHub

## 🔄 FASE 2: Første CI Pipeline med Quality Gates
- [ ] Forstå hva GitHub Actions er
- [ ] Lage .github/workflows/ci.yml
- [ ] Definere workflow: checkout → install → test
- [ ] Pushe og se workflow kjøre på GitHub
- [ ] Verifisere at tester kjører i CI
- [ ] Lage branch protection regel (quality gate)
- [ ] Teste at pull requests må ha grønn CI

## ⏳ FASE 3: Database & Integrasjonstester
- [ ] Sette opp SQLite database
- [ ] Lage Books CRUD endpoints (POST, GET, PUT, DELETE)
- [ ] Skrive unit tests for database queries
- [ ] Skrive integration tests for hele API flow
- [ ] Oppdatere CI til å kjøre database migrations
- [ ] Oppdatere CI til å kjøre integration tests

## ⏳ FASE 4: Code Quality Gates (Linting, TypeScript)
- [ ] Sette opp ESLint
- [ ] Sette opp Prettier
- [ ] Legge til lint steg i CI
- [ ] Legge til TypeScript typecheck i CI
- [ ] Fikse alle linting/type errors
- [ ] Verifisere at CI feiler ved linting errors

## ⏳ FASE 5: Security Scanning
- [ ] Aktivere GitHub Dependabot
- [ ] Legge til npm audit i CI
- [ ] Sette opp GitHub CodeQL (SAST)
- [ ] Aktivere secret scanning
- [ ] Fikse eventuelle sårbarheter
- [ ] Forstå security scanning resultater

## ⏳ FASE 6: Test Environment Deployment
- [ ] Sette opp Render.com konto
- [ ] Sette opp PostgreSQL database (Supabase)
- [ ] Konfigurere environment variables
- [ ] Lage CD workflow for deploy til test
- [ ] Legge til smoke tests etter deploy
- [ ] Verifisere at API fungerer i test-miljø

## ⏳ FASE 7: E2E Testing
- [ ] VALGFRITT: Lage enkel frontend (HTML + JS)
- [ ] Installere Playwright
- [ ] Skrive E2E tester
- [ ] Kjøre E2E tests mot test-miljø i CI
- [ ] Verifisere at user flows fungerer

## ⏳ FASE 8: Production Deployment med approval
- [ ] Lage separat prod environment på Render
- [ ] Sette opp GitHub Environments med approval
- [ ] Lage prod deployment workflow
- [ ] Teste manual approval flow
- [ ] Deploy til prod første gang
- [ ] Dokumentere rollback prosedyre

---

## 🤔 Spørsmål og avklaringer

### Frontend?
**Beslutning:** Starter uten frontend, fokuserer på API + CI/CD læring.
- Kan legges til senere i Fase 7 (E2E testing) hvis ønskelig
- Ikke nødvendig for å lære CI/CD konsepter

### Test-struktur?
**Beslutning:** Beholder tester i src/ ved siden av koden (moderne tilnærming).
- Enklere å finne tester
- Standard i Vitest/Jest prosjekter
- Kan refaktoreres senere hvis prosjektet vokser

### Neste steg?
**FASE 2: GitHub Actions CI Pipeline** - Automatisk testing ved hver push!

---

## 📚 Læringspunkter per fase

### Fase 0-1 (✅ Ferdig)
- Git basics (add, commit, push)
- npm/Node.js økosystem
- TypeScript fundamentals
- REST API med Express
- Unit testing med Vitest
- HTTP testing med Supertest

### Fase 2 (🔄 Neste)
- CI/CD konsepter
- GitHub Actions workflows
- YAML syntax
- Quality gates
- Branch protection
- Trunk-Based Development

### Fase 3-8 (⏳ Kommende)
- Database migrations
- Integration testing
- Code quality tools
- Security scanning
- Deployment strategies
- Environment management
- Production readiness
