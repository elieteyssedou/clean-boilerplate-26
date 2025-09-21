import BaseError, { BaseErrorParams } from '@/domain/errors/BaseError';

export default class TeamRequiredError extends BaseError {
  constructor(params: BaseErrorParams = 'User must have a selected team to perform this action') {
    super({
      ...BaseError.paramsFromInput(params),
      statusCode: 403,
      shouldAlert: false,
      isServer: false,
    });
  }
}
