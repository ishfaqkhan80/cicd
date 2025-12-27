# Docker Deployment Guide

This guide explains how to run the Books API in Docker containers with separate test and production environments.

## Prerequisites

- Docker Desktop installed and running
- Download: https://www.docker.com/products/docker-desktop/

## Architecture

```
┌─────────────────────────────────────┐
│         Docker Compose              │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Test Environment           │  │
│  │   Port: 3000                 │  │
│  │   Database: test-data volume │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Production Environment     │  │
│  │   Port: 3001                 │  │
│  │   Database: prod-data volume │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

## Quick Start

### 1. Build Docker Images

```bash
npm run docker:build
```

This creates Docker images for both environments.

### 2. Start Containers

```bash
npm run docker:up
```

Both test and production containers start in the background.

### 3. Verify Services

**Test Environment:**
```bash
curl http://localhost:3000/health
```

**Production Environment:**
```bash
curl http://localhost:3001/health
```

### 4. View Logs

```bash
npm run docker:logs
```

Press Ctrl+C to exit logs.

### 5. Stop Containers

```bash
npm run docker:down
```

## Available URLs

| Environment | URL | Database |
|-------------|-----|----------|
| Test | http://localhost:3000 | Separate volume |
| Production | http://localhost:3001 | Separate volume |

## Docker Commands

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build Docker images |
| `npm run docker:up` | Start containers |
| `npm run docker:down` | Stop and remove containers |
| `npm run docker:logs` | View container logs |
| `npm run docker:restart` | Restart containers |

## Manual Docker Commands

If you prefer using Docker directly:

```bash
# Build images
docker-compose build

# Start containers (detached)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# View running containers
docker ps

# Enter a container
docker exec -it books-api-test sh
docker exec -it books-api-prod sh
```

## Testing the Deployment

### Test Environment (Port 3000)

```bash
# Health check
curl http://localhost:3000/health

# Get all books
curl http://localhost:3000/api/books

# Create a book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Test Author","year":2024}'
```

### Production Environment (Port 3001)

```bash
# Health check
curl http://localhost:3001/health

# Get all books
curl http://localhost:3001/api/books

# Create a book
curl -X POST http://localhost:3001/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Prod Book","author":"Prod Author","year":2024}'
```

## Data Persistence

Each environment has its own Docker volume for SQLite database:

- **test-data**: Stores test environment database
- **prod-data**: Stores production environment database

Data persists even when containers are stopped/restarted.

To clear data:
```bash
docker-compose down -v  # Remove containers AND volumes
```

## Troubleshooting

### Port Already in Use

If ports 3000 or 3001 are in use:

1. Stop other services using those ports
2. Or edit `docker-compose.yml` to use different ports:
   ```yaml
   ports:
     - "3002:3000"  # External:Internal
   ```

### Container Won't Start

Check logs:
```bash
docker-compose logs books-api-test
docker-compose logs books-api-prod
```

### Rebuild After Code Changes

```bash
docker-compose down
npm run docker:build
npm run docker:up
```

## CI/CD Integration

Docker containers can be integrated with CI/CD pipeline:

1. **Build**: CI builds Docker image
2. **Test**: Run tests against test container
3. **Deploy Test**: Start test container
4. **E2E Tests**: Run against test container
5. **Approval**: Manual approval gate
6. **Deploy Prod**: Start production container

## Production Best Practices

For real production deployment:

1. **Use environment variables** for configuration
2. **External database** instead of SQLite volumes
3. **Load balancer** for multiple instances
4. **Monitoring** with Prometheus/Grafana
5. **Logging** with ELK stack or similar
6. **Secrets management** with Docker secrets or Vault

## Docker Image Size

The multi-stage Dockerfile optimizes image size:

- **Builder stage**: Includes dev dependencies for building
- **Production stage**: Only runtime dependencies
- **Final image**: ~150MB (Node.js Alpine + app)

## Health Checks

Docker Compose includes health checks:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

View health status:
```bash
docker ps
```

Look for "healthy" in the STATUS column.
