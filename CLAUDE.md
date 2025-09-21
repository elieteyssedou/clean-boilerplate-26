# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Clean Architecture Boilerplate** for building AI-powered SaaS applications with TypeScript.

### Core Features
- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **Example Resource CRUD**: Complete example implementation with ExampleResource entity
- **AI Service Integration**: Simplified AI service with conversation management
- **File Upload System**: S3-based file upload with team-based access control
- **GraphQL API**: Type-safe GraphQL with auto-generated client types
- **Authentication**: Stack Auth integration with JWT tokens
- **Multi-tenant**: Team-based access control throughout the application
- **Testing**: Comprehensive test suite with Mocha, Chai, and Sinon

## Monorepo Structure

This is a full-stack TypeScript monorepo with clean architecture principles:
- `back/` - Node.js GraphQL API with Express (see `back/CLAUDE.md`)
- `front/` - Next.js React application (see `front/CLAUDE.md`)
- `back/test/` - Testing infrastructure and guidelines (see `back/test/CLAUDE.md`)
- Root `Procfile` orchestrates all services via Overmind

## Common Development Commands

### Build and Development
- `overmind s` - Start all services (web, worker, graphiql, front, front-graphql-codegen)
- `overmind start -l web,front` - Start specific processes only

### Backend (from `back/` directory)
- `yarn start-web` - Start GraphQL web server (port 5100)
- `yarn start-worker` - Start background worker
- `yarn test` - Run test suite using Mocha
- `yarn run migrate-mongo create <migration-name>` - Create new migration
- `yarn run migrate-mongo up` - Run migrations
- `yarn run migrate-mongo down` - Rollback migrations

### Frontend (from `front/` directory)
- `yarn dev` - Start Next.js development server (port 5200)
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn graphql-codegen-compile` - Generate GraphQL types
- `yarn graphql-codegen-watch` - Watch for GraphQL changes

### Linting
- Backend and frontend both use ESLint with Airbnb TypeScript config
- Backend: `yarn lint` command from back directory
- Frontend: `yarn lint` from front directory

## Development Requirements
- MongoDB 7.0+ running in replica set mode
- Redis server
- Node.js v20
- Yarn package manager
- Overmind for process management

## Key Files to Reference
- `back/src/frameworks/container.ts` - Dependency injection setup
- `back/src/frameworks/web/app.ts` - Express app configuration
- `front/src/app/_config/` - Client-side providers and configuration
- `front/codegen.ts` - GraphQL code generation config
- `Procfile` - Process definitions for all services

## Code Quality Standards
- **ALWAYS run ESLint after any significant code changes** to ensure code quality
- **ALWAYS run tests before pushing** to ensure nothing is broken
- **ALWAYS follow ALL ESLint rules** configured in the project (Airbnb TypeScript configs)
- Use `npx eslint <file>` or `yarn lint` to check for linting errors
- Use `yarn test` to run the full test suite
- Fix any ESLint errors before committing changes

## Automated Code Quality (Claude Code Hooks)
This project uses Claude Code hooks for automatic linting and type checking:

### Hook Configuration (`.claude/settings.json`)
- **PostToolUse hooks** automatically run after Edit/Write/MultiEdit operations
- **Automatic ESLint formatting** fixes spacing, quotes, indentation, and other fixable issues
- **TypeScript type checking** runs on all .ts/.tsx files
- **Monorepo-aware** - only processes files in the `back/` directory
- **Git integration** - detects modified, added, and untracked files using `git status --porcelain`

### Hook Behavior
- ✅ **Auto-fixes**: Spacing around operators, single quotes, object formatting, indentation
- ✅ **Type checking**: Runs `yarn typecheck` on TypeScript files automatically
- ✅ **Error handling**: Gracefully handles deleted files and non-fixable ESLint errors
- ✅ **Untracked files**: Works with new files not yet added to git
- ❌ **Manual fixes required**: Unused variables, complex linting violations still need manual attention

### When Hooks Run
Hooks execute automatically when Claude Code performs:
- `Edit` operations on existing files
- `Write` operations for new files  
- `MultiEdit` operations for batch changes
- Only affects backend files matching: `back/**/*.{ts,tsx,js,jsx}`

## Cross-Cutting Guidelines
- All files must end with a newline
- Use TypeScript strict mode with `noImplicitAny: true`
- Follow Airbnb TypeScript ESLint rules
- Never use `any` type - always define proper TypeScript interfaces/types
- Use default exports for single-export files (classes, interfaces)
- Use `??` nullish coalescing operator instead of `||` when appropriate
- **When adding new libraries to the project**, always fetch their documentation to understand best practices and proper usage patterns before implementing

## Architecture-Specific Documentation
- **Backend Architecture**: See `back/CLAUDE.md` for clean architecture, GraphQL, and domain patterns
- **Frontend Patterns**: See `front/CLAUDE.md` for Next.js, HeroUI, and Apollo Client configuration
- **Testing Guidelines**: See `back/test/CLAUDE.md` for testing infrastructure and best practices
- **Development History**: See `DEVELOPMENT_HISTORY.md` for completed feature implementations


#
- Simplify the getters in the resource
- See to change stack auth for next auth