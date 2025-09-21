import { inject, injectable } from 'tsyringe';
import UserRepository, { UserRepositoryToken } from '@/domain/repositories/UserRepository';
import User, { UserId } from '@/domain/entities/User';

interface GetMeRequest {
  userId: UserId;
}

@injectable()
export default class GetMeUseCase {
  constructor(
    @inject(UserRepositoryToken) private userRepository: UserRepository,
  ) {}

  async execute(request: GetMeRequest): Promise<User> {
    const user = await this.userRepository.get(request.userId);

    return user;
  }
}
