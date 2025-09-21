import { inject, injectable } from 'tsyringe';
import AuthWebService, { AuthWebServiceToken } from '@/domain/services/AuthWebService';
import type AuthenticatedContext from '@/domain/types/AuthenticatedContext';

interface VerifyAuthTokenRequest {
  authToken: string;
}

@injectable()
export default class VerifyAuthTokenUseCase {
  constructor(
    @inject(AuthWebServiceToken) private authWebService: AuthWebService,
  ) {}

  async execute(request: VerifyAuthTokenRequest): Promise<AuthenticatedContext> {
    const userInfo = await this.authWebService.verifyAndGetUserInfo(request.authToken);

    return userInfo;
  }
}
