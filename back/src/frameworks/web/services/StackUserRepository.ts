import User, { UserId } from '@/domain/entities/User';
import NotFoundError from '@/domain/errors/NotFoundError';
import UserRepository from '@/domain/repositories/UserRepository';

export default class StackUserRepository implements UserRepository {
  private readonly baseUrl: string;

  private readonly headers: Record<string, string>;

  constructor() {
    this.baseUrl = 'https://api.stack-auth.com/api/v1/users';
    this.headers = {
      'X-Stack-Access-Type': 'server',
      'X-Stack-Project-Id': process.env.STACK_AUTH_PROJECT_ID,
      'X-Stack-Secret-Server-Key': process.env.STACK_AUTH_SECRET_SERVER_KEY,
    };
  }

  async get(userId: UserId): Promise<User> {
    const url = `${this.baseUrl}/${userId}`;
    const options = { method: 'GET', headers: this.headers };

    const response = await fetch(url, options);

    if (!response.ok) throw new NotFoundError('Failed to get user');

    const data = await response.json() as { name: string };

    return User.hydrate({ id: userId, name: data.name });
  }
}
