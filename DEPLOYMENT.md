# Deployment Guide

## Overview

This project uses Trunk-Based Development with two deployment stages:

1. **Test Environment** - Auto-deployed on every push to main
2. **Production Environment** - Manual approval required

## Environments

### Test Environment
- **URL:** https://cicd-books-api.onrender.com
- **Deployment:** Automatic on push to main
- **Purpose:** Validate changes before production

### Production Environment
- **URL:** https://cicd-books-api.onrender.com (same as test for free tier)
- **Deployment:** Manual trigger with approval
- **Purpose:** Stable production releases

## Deployment Flow

```
┌─────────────────┐
│   Push to main  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   CI Pipeline   │
│  - Lint         │
│  - Build        │
│  - Test         │
│  - Security     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deploy to Test │
│  (Automatic)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   E2E Tests     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Ready for Prod │
└─────────────────┘
```

## How to Deploy to Production

### Prerequisites
- All CI tests must pass
- E2E tests must pass
- Manual approval required

### Steps

1. **Ensure all changes are in main and tests pass**
   ```bash
   git status
   # Should be clean and synced with origin/main
   ```

2. **Go to GitHub Actions**
   - Navigate to: https://github.com/ishfaqkhan80/cicd/actions
   - Select "Deploy to Production" workflow
   - Click "Run workflow"

3. **Enter version tag**
   - Format: `v1.0.0`
   - Follow semantic versioning

4. **Approve deployment**
   - Workflow will wait for approval
   - Designated reviewer must approve
   - Click "Review deployments" → "Approve and deploy"

5. **Verify production**
   - Check https://cicd-books-api.onrender.com/health
   - Verify API functionality
   - Check GitHub Release was created

## Rollback Procedure

If issues are found in production:

1. **Identify last working version**
   - Check GitHub Releases
   - Find last stable tag (e.g., `v0.9.0`)

2. **Deploy previous version**
   - Run "Deploy to Production" workflow
   - Enter previous version tag
   - Get approval and deploy

3. **Fix and redeploy**
   - Fix issues in main branch
   - Let CI/CD pipeline validate
   - Deploy new version when ready

## Quality Gates

All deployments must pass:

| Gate | Description | Failure Action |
|------|-------------|----------------|
| Linting | Code quality checks | Blocks CI |
| TypeScript | Type safety | Blocks CI |
| Unit Tests | Component tests | Blocks CI |
| Security Audit | Dependency vulnerabilities | Blocks CI |
| Test Deploy | Deploy to test environment | Blocks E2E |
| E2E Tests | End-to-end API tests | Warning only |
| Manual Approval | Human review | Blocks production |

## Semantic Versioning

Use semantic versioning for releases:

- **MAJOR** (v2.0.0): Breaking changes
- **MINOR** (v1.1.0): New features, backwards compatible
- **PATCH** (v1.0.1): Bug fixes

## Emergency Procedures

### Critical Bug in Production
1. Fix in main branch
2. Fast-track through CI
3. Emergency deployment with approval
4. Post-mortem analysis

### Service Outage
1. Check Render dashboard: https://dashboard.render.com
2. Check GitHub Actions status
3. Review application logs in Render
4. Rollback if needed
