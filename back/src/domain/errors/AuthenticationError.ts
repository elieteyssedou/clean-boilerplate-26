import BaseError, { BaseErrorParams } from '@/domain/errors/BaseError';

class AuthenticationError extends BaseError {
  constructor(params: BaseErrorParams) {
    super({
      ...BaseError.paramsFromInput(params),
      statusCode: 401,
      shouldAlert: false,
      isServer: false,
    });
  }
}

export default AuthenticationError;
