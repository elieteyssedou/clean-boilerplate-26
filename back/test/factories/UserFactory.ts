import User, { HydrateUserParams, UserId } from '@/domain/entities/User';

export default class UserFactory {
  static createTestUser(overrides?: Partial<HydrateUserParams>): User {
    const params: HydrateUserParams = {
      id: overrides?.id ?? 'test-user-123' as UserId,
      name: overrides?.name ?? 'Test User',
    };
    return User.hydrate(params);
  }
}
