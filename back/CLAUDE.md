# Backend CLAUDE.md

This file provides backend-specific guidance for the Node.js GraphQL API with clean architecture principles.

## Backend Architecture (Clean Architecture)

### Domain Layer (`src/domain/`)
- **`entities/`** - Core business entities (User, Team, Component)
- **`repositories/`** - Repository interfaces for data access
- **`services/`** - Service interfaces for external integrations
- **`errors/`** - Custom error classes extending BaseError
- **`types/`** - Shared type definitions (AuthenticatedContext)

### Use Cases Layer (`src/use-cases/`)
- **`authentication/`** - Auth-related business logic (VerifyAuthToken, LoadAuthenticatedContext)
- **`users/`** - User-related business logic (GetMe)
- **`components/`** - Component business logic (GenerateComponent, ListTeamComponents, GetComponent, DeleteComponent)

### Frameworks Layer (`src/frameworks/`)
- **`container.ts`** - Dependency injection with TSyringe
- **`database/`** - Mongoose MongoDB connection and repositories
- **`queues/`** - BullMQ Redis job processing
- **`web/`** - Express + GraphQL HTTP layer
- **`worker.ts`** - Background job worker

## Code Style Guidelines

### File Naming
- Use **PascalCase** for files that export default classes or interfaces: `AiService.ts`, `BaseError.ts`, `AuthWebService.ts`
- Use **kebab-case** for utility files that export functions: `logger.ts`, `load-gql-context.ts`, `format-gql-error.ts`

### Import Aliases
- Use `@/*` alias for imports from `src/` directory (configured in tsconfig.json)
- Use `@test/*` alias for imports from `test/` directory
- Use `type` keyword for type-only imports: `import type { AIService } from '@/domain/services/AIService'`

### Error Handling
- **NEVER** use generic `Error` class or `throw new Error()`
- **ALWAYS** use custom error classes extending `BaseError` from `@/domain/errors/BaseError`
- Custom errors are located in `back/src/domain/errors/`
- Create specific error classes for different domains (e.g., `AiServiceError`, `AuthenticationError`)

### Entity and Repository Patterns
- **Entity Constructors**: For entities with many parameters, use named parameters via configuration objects (e.g., `CreateComponentParams`)
- **Entity Re-hydration**: Use static factory methods like `fromDatabase()` for creating entities from database records
- **Entity Meta Properties**: Entities and value objects can have a `_meta: EntityMetaProperties` property to store validation status and metadata. The repository checks `_meta.isReadyToSave()` before database operations. Call `entity.validate()` to mark as validated. This property is allowed in ESLint via the `no-underscore-dangle` rule configuration.
- **MongoDB Repositories**: Always create helper methods `componentToDocument()` and `documentToComponent()` to mutualize conversion logic between entities and database documents

### GraphQL Implementation

#### Schema-First Approach
- Schema files: `.graphql` files in `back/src/frameworks/web/graphql/types/`
- Resolvers: `back/src/frameworks/web/graphql/resolvers/`
- Auto-loading via `@graphql-tools/load-files`
- Frontend codegen watches backend schema changes

#### GraphQL Resolvers Best Practices
- **NEVER** call services directly inside GraphQL resolvers (Query/Mutation)
- **ALWAYS** create a corresponding use case for each query and mutation
- Resolvers should only resolve use cases, following clean architecture principles
- **Prefer getters over methods** in field resolvers - use `component.stack` instead of `component.getStack()` for better GraphQL auto-resolution
- See `user-resolver.ts` as an example of proper resolver implementation

## Database and Jobs
- **MongoDB** with Mongoose (requires replica set)
- **Redis** for BullMQ job queues
- **migrate-mongo** for database migrations
- Background jobs handled by separate worker process

## Authentication Flow
- Uses Stack Auth service
- JWT token verification in `VerifyAuthToken` use case
- GraphQL context loading middleware (`load-gql-context.ts`)
- Team-based access control for all component operations

## Key Backend Files
- `src/frameworks/container.ts` - Dependency injection setup with TSyringe
- `src/frameworks/web/app.ts` - Express app configuration
- `src/frameworks/database/mongoose.ts` - MongoDB connection setup
- `src/frameworks/web/middlewares/load-gql-context.ts` - GraphQL authentication middleware
- `src/use-cases/` - All business logic implementations

## Development Commands (from `back/` directory)
- `yarn start-web` - Start GraphQL web server (port 5100)
- `yarn start-worker` - Start background worker
- `yarn test` - Run test suite using Mocha
- `eslint` - Run ESLint for code quality
- `yarn run migrate-mongo create <migration-name>` - Create new migration
- `yarn run migrate-mongo up` - Run migrations
- `yarn run migrate-mongo down` - Rollback migrations

## Backend-Specific Code Quality
- **ALWAYS follow ALL ESLint rules** defined in `back/.eslintrc.json` (Airbnb base + TypeScript)
- Never use `any` type - always define proper TypeScript interfaces/types
- Use default exports for single-export files (classes, interfaces)
- All custom errors must extend BaseError
- Repository pattern with document conversion helpers
- Clean architecture separation between layers