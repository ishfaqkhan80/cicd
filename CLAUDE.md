# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a new CI/CD project repository. The specific technology stack and architecture will be determined during initial setup.

## Token Usage Best Practices

When working in this repository, follow these principles for sustainable token usage:

- Use the Task tool with specialized agents (Explore, Plan) for complex multi-file analysis rather than reading files individually
- Leverage Glob and Grep for targeted searches before reading full files
- When exploring unfamiliar code, use the Explore agent to understand structure before making changes
- Read files selectively - only request the sections needed using offset/limit parameters for large files
- Make parallel tool calls when operations are independent to minimize round trips

## Industry Standard Libraries

When selecting dependencies for this project, prioritize:

- Well-maintained libraries with active communities and regular security updates
- Industry-standard solutions over custom implementations for common problems (authentication, validation, logging, etc.)
- Libraries with minimal transitive dependencies to reduce supply chain risk
- Tools with strong TypeScript/type support where applicable
- Official SDKs and libraries from service providers over third-party alternatives

## Software Best Practices

This repository follows these core principles:

- **Security First**: Validate all external inputs, follow OWASP guidelines, keep dependencies updated
- **Simplicity Over Complexity**: Avoid over-engineering; implement only what's needed
- **Code Quality**: Write self-documenting code; add comments only where logic is non-obvious
- **Testing**: Focus on integration tests for CI/CD pipelines; unit tests for complex logic
- **Version Control**: Clear, descriptive commit messages; atomic commits that represent complete changes

## Architecture Notes

Architecture details will be documented here as the project evolves. Focus on:

- Pipeline orchestration patterns
- Deployment strategies and environments
- Integration points with external systems
- Configuration management approach
- Secret handling and security boundaries
