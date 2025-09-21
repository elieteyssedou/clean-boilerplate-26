import type AuthWebService from '@/domain/services/AuthWebService';

interface LoadAuthenticatedContextRequest {
  authToken: string;
}

export default class LoadAuthenticatedContextUseCase {
  constructor(private authWebService: AuthWebService) {}

  async execute(request: LoadAuthenticatedContextRequest): Promise<void> {
    await this.authWebService.verifyToken(request.authToken);
  }
}
