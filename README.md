# CI/CD Books API

A learning project demonstrating complete CI/CD pipeline with Trunk-Based Development, automated testing, and deployment strategies.

## 🎯 Project Goals

Learn practical CI/CD from code to production:
- ✅ Trunk-Based Development (direct push to main)
- ✅ Automated quality gates
- ✅ Unit, integration, and E2E testing
- ✅ Security scanning
- ✅ Automated deployments
- ✅ Production approval workflows

## 🏗️ Architecture

**Tech Stack:**
- **Runtime:** Node.js 22 + TypeScript
- **Framework:** Express.js
- **Database:** SQLite (file-based)
- **Testing:** Vitest (unit/integration), Playwright (E2E)
- **CI/CD:** GitHub Actions
- **Hosting:** Render.com
- **Code Quality:** ESLint + TypeScript strict mode
- **Security:** npm audit + Dependabot

## 🚀 API Endpoints

**Base URL:** https://cicd-books-api.onrender.com

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/api/books` | List all books |
| GET | `/api/books/:id` | Get specific book |
| POST | `/api/books` | Create new book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

## 📊 CI/CD Pipeline

```
Push to main
    ↓
CI Pipeline (GitHub Actions)
├── Install dependencies
├── Security audit (npm audit)
├── Linting (ESLint)
├── TypeScript compilation
├── Unit & Integration tests (Vitest)
└── Coverage report (GitHub Pages)
    ↓
Deploy to Test (Render)
    ↓
E2E Tests (Playwright)
    ↓
Manual Approval
    ↓
Deploy to Production
```

## 🧪 Testing Strategy

**Unit & Integration Tests:** 19 tests
- Health endpoint
- CRUD operations
- Validation
- Error handling

**E2E Tests:** 8 tests
- Real API testing against deployed environment
- Full request/response cycle
- Database persistence

**Coverage:** ~94%
- View at: https://ishfaqkhan80.github.io/cicd/

## 🛡️ Quality Gates

All pushes must pass:
1. **Security Audit** - No high/critical vulnerabilities
2. **Linting** - Code quality standards
3. **TypeScript** - Type safety
4. **Tests** - All tests passing
5. **Coverage** - Tracked and reported

## 📦 Local Development

**Prerequisites:**
- Node.js 22+
- npm

**Setup:**
```bash
# Clone repository
git clone https://github.com/ishfaqkhan80/cicd.git
cd cicd

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests (requires API running)
npm run test:e2e

# Lint code
npm run lint
```

## 🔄 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

**Quick Deploy to Production:**
1. Go to Actions → Deploy to Production
2. Enter version tag (e.g., `v1.0.0`)
3. Wait for approval
4. Approve and deploy

## 📁 Project Structure

```
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Main CI pipeline
│   │   ├── e2e.yml             # E2E tests
│   │   └── deploy-production.yml  # Production deployment
│   └── dependabot.yml          # Dependency updates
├── e2e/                        # E2E tests
├── src/
│   ├── db/                     # Database setup
│   ├── models/                 # Data models & repositories
│   ├── routes/                 # API routes
│   ├── app.ts                  # Express app
│   └── index.ts                # Server entry point
├── coverage/                   # Test coverage reports
├── playwright.config.ts        # E2E test configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # Linting rules
└── render.yaml                # Render deployment config
```

## 🔐 Security

- **Automated security scanning** via npm audit
- **Dependabot** for automatic dependency updates
- **No secrets in code** - Environment variables used
- **Input validation** on all API endpoints

## 📚 Learning Outcomes

This project demonstrates:
1. **Trunk-Based Development** - Small, frequent commits to main
2. **Quality Gates** - Automated checks prevent bad code
3. **Test Pyramid** - Unit → Integration → E2E
4. **Security First** - Automated vulnerability scanning
5. **Deployment Strategies** - Test → Production with approval
6. **Monitoring** - Health checks and test reports

## 🤝 Contributing

This is a learning project. To practice CI/CD:
1. Fork the repository
2. Make changes
3. Watch CI/CD pipeline run
4. Learn from any failures

## 📄 License

ISC
