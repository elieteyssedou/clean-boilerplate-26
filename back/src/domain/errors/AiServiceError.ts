import BaseError, { BaseErrorParams } from '@/domain/errors/BaseError';

class AiServiceError extends BaseError {
  constructor(params: BaseErrorParams) {
    super({
      ...BaseError.paramsFromInput(params),
      statusCode: 500,
      shouldAlert: true,
    });
  }
}

export default AiServiceError;
