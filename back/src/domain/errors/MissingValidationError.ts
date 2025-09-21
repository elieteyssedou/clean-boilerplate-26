import BaseError, { BaseErrorParams } from '@/domain/errors/BaseError';

export default class MissingValidationError extends BaseError {
  constructor(params: BaseErrorParams = 'Object must be validated before performing this operation') {
    super({
      ...BaseError.paramsFromInput(params),
      statusCode: 422,
      shouldAlert: true,
      isServer: true,
    });
  }
}
