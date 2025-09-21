import BaseError, { BaseErrorParams } from '@/domain/errors/BaseError';

class NotFoundError extends BaseError {
  constructor(params: BaseErrorParams) {
    super({
      ...BaseError.paramsFromInput(params),
      statusCode: 404,
      shouldAlert: false,
      isServer: false,
    });
  }
}

export default NotFoundError;
