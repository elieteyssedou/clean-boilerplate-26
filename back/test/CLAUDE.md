# Backend Testing CLAUDE.md

This file provides testing-specific guidance for the backend test infrastructure using Mocha, Chai, and Sinon.

## Testing Stack
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Sinon** - Mocking and stubbing
- Custom test setup with MongoDB and authentication mocking

## Test Structure (`back/test/`)

### Test Organization
- **`domain/`** - Domain entity and service tests
- **`frameworks/`** - Infrastructure layer tests (database, web, GraphQL)
- **`use-cases/`** - Business logic tests
- **`helpers/`** - Test utility functions
- **`mocks/`** - Mock implementations for external services
  - **`constants/`** - Centralized constants for mock responses and test assertions
- **`factories/`** - Test data factories for creating entities
- **`types/`** - TypeScript type definitions for tests

### Key Test Files
- **`setup.ts`** - Global test setup and configuration
- **`test-container.ts`** - Dependency injection for testing
- **`test-env-variables.ts`** - Test environment configuration
- **`chai.ts`** - Chai configuration with Sinon integration

## Authentication Helpers for Testing

### GraphQL Resolver Tests
Use `authenticatedRequest()` helper from `@test/helpers/auth-helpers`:
```typescript
import { authenticatedRequest } from '@test/helpers/auth-helpers';

const response = await authenticatedRequest(app, '{ me { id } }');
```

### Use Case Tests
Create `AuthenticatedContext` manually with User and Team entities:
```typescript
import AuthenticatedContext from '@/domain/types/AuthenticatedContext';

const authenticatedContext: AuthenticatedContext = {
  user: new User({ id: 'user123' as UserId, email: 'test@example.com' }),
  currentTeam: new Team({ id: 'team123' as TeamId, name: 'Test Team', displayName: 'Test Team Display' }),
};
```

### MockAuth Service Configuration

**Token Lifecycle:**
- `createAutoToken(options?)` - Creates token with default team/user
- `registerToken(token, team, user, options?)` - Register specific token with team/user context
- `autoReset: boolean` - Token expires after first use (default: `true`)

**Authentication Patterns:**
- `authenticatedRequest()` without customToken → auto-generated token for single test
- `authenticatedRequest(app, query, vars, customToken)` → reuses existing token for multi-request tests
- `registerTokenAuth(token, team, user)` → manual registration for persistent tokens

**Team Context:** Always include `currentTeam` in `AuthenticatedContext` for tests requiring team access

## Mock Services and Constants

### Available Mock Services
- **`MockAuthWebService`** - Mock implementation of authentication service
- **`MockAIService`** - Mock implementation of AI service for component generation
- All mock services implement their respective interfaces and use `@injectable()` decorator for TSyringe compatibility

### Mock Constants for Assertions
Located in `@test/mocks/constants/MockAIConstants.ts` - centralized constants for consistent test assertions:

```typescript
import { MOCK_COMPONENT_NAME } from '@test/mocks/constants/MockAIConstants';

// Use in test assertions instead of hardcoded strings
expect(component.name).to.equal(MOCK_COMPONENT_NAME);
```

**Available Constants:**
- `MOCK_COMPONENT_NAME` - Expected component name from AI generation
- `MOCK_COMPONENT_CODE` / `MOCK_COMPONENT_CODE_UPDATED` - Generated component code
- `MOCK_COMPONENT_DESCRIPTION` / `MOCK_COMPONENT_DESCRIPTION_UPDATED` - Component descriptions
- `MOCK_TECHNICAL_DOCUMENTATION` / `MOCK_TECHNICAL_DOCUMENTATION_UPDATED` - Technical docs
- `MOCK_GENERATION_METADATA` / `MOCK_GENERATION_METADATA_UPDATED` - AI generation metadata
- `MOCK_PRESET_PROPS_*` - Preset property objects for testing
- `MOCK_PRESET_NAME_*` - Preset names for assertions

### Benefits of Using Mock Constants
- **Consistency**: All tests use the same expected values
- **Maintainability**: Change mock responses in one place
- **Type Safety**: Prevents typos in test assertions
- **Readability**: Clear intent when using named constants vs magic strings

## Test Factories

### Entity Factories
- **`UserFactory.ts`** - Creates User entities with proper constructor patterns
- **`TeamFactory.ts`** - Creates Team entities with proper constructor patterns  
- **`ComponentFactory.ts`** - Creates Component entities for testing
- **`PresetFactory.ts`** - Creates Preset entities for component testing
- **`StackFactory.ts`** - Creates Stack configurations for component generation

### Factory Usage and Best Practices

**Always use factories instead of manually creating entities:**

```typescript
import { UserFactory } from '@test/factories/UserFactory';
import { TeamFactory } from '@test/factories/TeamFactory';
import { ComponentFactory } from '@test/factories/ComponentFactory';
import { StackFactory } from '@test/factories/StackFactory';

// ✅ Good - Use factories for consistent entity creation
const user = UserFactory.createTestUser({ email: 'test@example.com' });
const team = TeamFactory.createTestTeam({ name: 'Test Team' });
const component = ComponentFactory.createTestComponent({ 
  teamId: team.id,
  stack: StackFactory.createDefault() 
});

// ❌ Bad - Don't manually create entities
const user = new User({ id: 'user123', email: 'test@example.com' });
```

**Factory Benefits:**
- **Consistent Defaults**: All required fields populated with sensible defaults
- **Type Safety**: Proper TypeScript types and validation
- **Maintainability**: Changes to entity constructors only need updating in factories
- **Test Isolation**: Factories can generate unique IDs to prevent test conflicts

**Available Factory Methods:**
- `StackFactory.createDefault()` - Standard React + TypeScript + Tailwind stack
- `StackFactory.createJavaScript()` - JavaScript variant stack
- `StackFactory.createWithoutTailwind()` - Stack without Tailwind dependencies
- `ComponentFactory.createTestComponent()` - Component with mock AI-generated content
- `PresetFactory.createTestPreset()` - Preset with mock properties

## GraphQL Testing Helpers

### Response Validation
Located in `@test/helpers/graphql-test-helpers.ts`:
- **`expectGraphQLSuccess(response)`** - Validates successful GraphQL responses
- **`expectGraphQLError(response, errorMessage)`** - Validates error responses

### Type Safety
- **`@test/types/graphql-types.ts`** - Comprehensive GraphQL response type definitions
- All GraphQL test responses are properly typed to eliminate `any` usage

## Testing Patterns

### Repository Tests
- Test both `save()` and `get()` methods
- Verify complete data integrity and entity reconstruction
- Test team-based filtering and access control
- Use unique team IDs to prevent test interference

### Use Case Tests
- Create stubs for all dependencies in `beforeEach` block
- Use stub variables instead of direct method access (ESLint `@typescript-eslint/unbound-method` compliance)
- Test all business logic scenarios including error cases
- Verify exact repository save call parameters

### GraphQL Integration Tests
- Test complete GraphQL query/mutation flow
- Verify database persistence for mutations
- Test authentication and authorization
- Use `authenticatedRequest()` helper for authenticated operations

## ESLint Testing Rules
- **`no-underscore-dangle`** - Allows `_meta` property access for entity validation checks
- **`class-methods-use-this`** - Disabled for repository pattern classes
- **`@typescript-eslint/unbound-method`** - Requires using stub variables instead of direct method access

## Test Debugging

### Debug Test Issues
To see full trace output during tests:
1. Change `LOG_LEVEL` to `'trace'` in `back/test/test-env-variables.ts`
2. Run tests to see detailed logging
3. Switch back to `'silent'` when done

### Test Environment Features
- **Mocked AI Service** - Uses `MockAIService` for consistent test results with predefined responses
- **Mocked Authentication** - Uses `MockAuthWebService` with configurable responses  
- **Test Isolation** - Each test uses unique team IDs for proper isolation
- **Performance Optimization** - No database cleanup between tests (uses unique data instead)
- **Constants Integration** - Mock services use centralized constants from `@test/mocks/constants/`
- **Factory Integration** - All mock services leverage factories for consistent entity creation

## Testing Commands (from `back/` directory)
- `yarn test` - Run full test suite
- `yarn test --grep "pattern"` - Run specific tests matching pattern
- `npx mocha test/path/to/specific.test.ts` - Run single test file

## Test Quality Standards
- **ESLint Compliance**: Follow ALL ESLint rules defined in `back/.eslintrc.json` for test files
- **Integration Tests**: Component resolver integration tests verify both GraphQL API and database persistence
- **Unit Tests**: Comprehensive test coverage for all domain entities and use cases
- **Type Safety**: All tests use proper TypeScript types, no `any` usage allowed
- **Mocking Standards**: Use Sinon for all mocking, no direct method access in assertions
- **Test Isolation**: Each test should be completely independent with unique data

### Mock and Factory Standards
- **Use Mock Constants**: Always import and use constants from `@test/mocks/constants/` instead of hardcoded strings
- **Prefer Factories**: Use factory methods instead of manual entity construction for all test data
- **Mock Service Implementation**: All mock services must implement their respective interfaces properly
- **Centralized Mock Data**: Keep all mock response data centralized in constants files
- **Consistent Assertions**: Use mock constants in test assertions to ensure consistency across test suite

```typescript
// ✅ Good - Using mock constants and factories
import { MOCK_COMPONENT_NAME } from '@test/mocks/constants/MockAIConstants';
import { StackFactory } from '@test/factories/StackFactory';

expect(component.name).to.equal(MOCK_COMPONENT_NAME);
const stack = StackFactory.createDefault();

// ❌ Bad - Hardcoded values and manual construction
expect(component.name).to.equal('MockButton');
const stack = new Stack({ language: 'typescript', framework: { ... } });
```

## Test Scenarios

### Integrated Scenarios (`back/test/scenarios/integrated/`)
Create coherent, business-compliant datasets saved to database following proper domain relationships.

**Available Scenarios:**
- **`SIMPLE_SYSTEM`** - 1 system, 1 component (basic integration tests)
- **`MULTI_SYSTEM`** - Multiple systems with distributed components (complex filtering tests)

**Coherent Business Data:**
- User → Team → Systems → Components relationship maintained
- Uses factories with realistic data via faker
- Proper entity validation before database save
- Component distribution across systems follows business rules

**Usage Example:**
```typescript
import { setupIntegratedScenario } from '@test/scenarios/ScenarioResolver';
import { IntegratedScenario } from '@test/scenarios/ScenarioTypes';

const { testToken, systems, components } = await setupIntegratedScenario(
  IntegratedScenario.MULTI_SYSTEM
);
const response = await authenticatedRequest(app, query, variables, testToken);
```

**Benefits:** Reusable, maintainable, realistic business datasets with proper domain relationships