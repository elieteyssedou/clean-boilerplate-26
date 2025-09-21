import BaseError, { BaseErrorParams } from '@/domain/errors/BaseError';

class WorkerError extends BaseError {
  constructor(params: BaseErrorParams) {
    super({
      ...BaseError.paramsFromInput(params),
    });
  }
}

export default WorkerError;
