import { injectable } from 'tsyringe';
import { randomUUID } from 'crypto';
import TeamFactory from '@test/factories/TeamFactory';
import UserFactory from '@test/factories/UserFactory';
import AuthWebService from '@/domain/services/AuthWebService';
import AuthenticationError from '@/domain/errors/AuthenticationError';
import User, { UserId } from '@/domain/entities/User';
import Team, { TeamId } from '@/domain/entities/Team';
import type AuthenticatedContext from '@/domain/types/AuthenticatedContext';

interface TokenRegistration {
  team: Team;
  user?: User;
  autoReset: boolean;
  used: boolean;
}

@injectable()
export default class MockAuthWebService implements AuthWebService {
  private testUser: User;

  private teamCache = new Map<string, TokenRegistration>();

  constructor(customUser?: User) {
    this.testUser = customUser ?? UserFactory.createTestUser();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyToken(_authToken: string): Promise<UserId> {
    // Return a test user ID without making any remote calls
    return Promise.resolve(this.testUser.getUserInfo().id);
  }

  verifyAndGetUserInfo(authToken: string): Promise<AuthenticatedContext> {
    const registration = this.teamCache.get(authToken);

    if (!registration) {
      throw new AuthenticationError(`Token '${authToken}' not registered. Use registerToken() or createAutoToken() first.`);
    }

    // Handle auto-reset if configured
    if (registration.autoReset && !registration.used) {
      registration.used = true;
      // Auto-reset after this call
      setTimeout(() => this.resetToken(authToken), 0);
    }

    return Promise.resolve({
      user: registration.user ?? this.testUser,
      currentTeam: registration.team,
    });
  }

  /**
   * Register a specific team for a test token (for scenario integration)
   * This allows scenarios to create data with known team IDs
   */
  registerToken(
    authToken: string,
    team: Team,
    user?: User,
    options: { autoReset?: boolean } = {},
  ): void {
    this.teamCache.set(authToken, {
      team,
      user,
      autoReset: options.autoReset ?? true,
      used: false,
    });
  }

  /**
   * Create and register a token with default team/user (for simple tests)
   * Returns the token that can be used with authenticatedRequest
   */
  createAutoToken(options: { autoReset?: boolean } = {}): string {
    const token = `auto-${Date.now()}-${randomUUID().substring(0, 8)}`;
    const team = TeamFactory.createTestTeam({
      id: randomUUID() as TeamId,
      name: `Auto Team ${token.slice(0, 12)}`,
    });

    this.registerToken(token, team, this.testUser, options);
    return token;
  }

  /**
   * Reset a specific token (remove from cache)
   */
  resetToken(authToken: string): void {
    this.teamCache.delete(authToken);
  }

  /**
   * Reset all tokens (clear entire cache)
   */
  resetAllTokens(): void {
    this.teamCache.clear();
  }

  /**
   * @deprecated Use registerToken() instead
   */
  registerTeamForToken(authToken: string, team: Team, user?: User): void {
    this.registerToken(authToken, team, user);
  }
}
