import User, { UserId } from '@/domain/entities/User';

export const UserRepositoryToken = 'UserRepository';

export default interface UserRepository {
  get(userId: UserId): Promise<User>;
}
