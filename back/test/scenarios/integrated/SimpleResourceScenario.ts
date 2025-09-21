import { container } from 'tsyringe';
import { randomUUID } from 'crypto';
import { times, get } from 'lodash-es';
import UserFactory from '@test/factories/UserFactory';
import TeamFactory from '@test/factories/TeamFactory';
import ExampleResourceFactory from '@test/factories/ExampleResourceFactory';
import ExampleResourceRepository, { ExampleResourceRepositoryToken } from '@/domain/repositories/ExampleResourceRepository';
import type { TeamId } from '@/domain/entities/Team';
import { createTestToken, registerTokenAuth } from '../ScenarioHelpers';
import type { ScenarioResult, ScenarioOverrides } from '../ScenarioTypes';

/**
 * SIMPLE_RESOURCES: Creates example resources and saves them to DB
 * Perfect for basic integration tests
 */
export default async function setupSimpleResourceScenario(overrides?: ScenarioOverrides): Promise<ScenarioResult> {
  const exampleResourceRepository = container.resolve<ExampleResourceRepository>(ExampleResourceRepositoryToken);

  // Create user and team using factories with overrides (ensure unique team ID)
  const user = UserFactory.createTestUser(overrides?.user);
  const team = TeamFactory.createTestTeam({
    id: `simple-team-${Date.now()}-${randomUUID().substring(0, 8)}` as TeamId,
    ...overrides?.team,
  });

  // Create test token and register team/user with MockAuthWebService (auto-reset by default)
  const testToken = createTestToken('simple');
  registerTokenAuth(testToken, team, user);

  // Determine counts (default: 2 resources)
  const resourceCount = get(overrides, 'resources.length', 2);

  // Create resources
  const resources = times(resourceCount, (index) => {
    const resource = ExampleResourceFactory.createTestResource({
      teamId: team.id,
      name: `Test Resource ${index + 1}`,
      description: `Description for test resource ${index + 1}`,
      content: `Content for test resource ${index + 1}`,
      tags: [`tag${index + 1}`, 'test'],
      ...get(overrides, `resources[${index}]`, {}),
    });
    return resource;
  });

  // Save all resources to DB
  await Promise.all(resources.map((resource) => exampleResourceRepository.create(resource)));

  return {
    testToken,
    resources,
    team,
    user,
  };
}
