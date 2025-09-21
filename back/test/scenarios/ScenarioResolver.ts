import { IntegratedScenario, type ScenarioResult, type ScenarioOverrides } from './ScenarioTypes';
import setupSimpleResourceScenario from './integrated/SimpleResourceScenario';

/**
 * Helper function to resolve and execute scenarios based on enum
 * Scenarios create entities and save them to database for real integration testing
 */
export default async function setupIntegratedScenario(
  scenario: IntegratedScenario,
  overrides?: ScenarioOverrides,
): Promise<ScenarioResult> {
  switch (scenario) {
    case IntegratedScenario.SIMPLE_RESOURCES:
      return setupSimpleResourceScenario(overrides);
    case IntegratedScenario.MULTI_RESOURCES:
      // For now, just use simple resources scenario for both
      return setupSimpleResourceScenario(overrides);
    default:
      throw new Error(`Unknown integrated scenario: ${String(scenario)}`);
  }
}

export { setupIntegratedScenario };
