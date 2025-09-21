import { randomUUID } from 'crypto';
import { container } from 'tsyringe';
import type MockAuthWebService from '@test/mocks/MockAuthWebService';
import { AuthWebServiceToken } from '@/domain/services/AuthWebService';
import type AuthWebService from '@/domain/services/AuthWebService';
import type Team from '@/domain/entities/Team';
import type User from '@/domain/entities/User';

/**
 * Creates a unique test token that can be used with MockAuthWebService
 */
export function createTestToken(scenarioName: string): string {
  const timestamp = Date.now();
  const random = randomUUID().substring(0, 8);

  return `${scenarioName}-${timestamp}-${random}`;
}

/**
 * Registers a team and user with MockAuthWebService for a specific token
 * This allows scenarios to control what team/user the token maps to
 */
export function registerTokenAuth(
  token: string,
  team: Team,
  user: User,
  options: { autoReset?: boolean } = { autoReset: false },
): void {
  const authService = container.resolve<AuthWebService>(AuthWebServiceToken) as MockAuthWebService;
  authService.registerToken(token, team, user, options);
}
