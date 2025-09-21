import BaseError from '@/domain/errors/BaseError';

export default class UploadNotFoundError extends BaseError {
  constructor(message: string) {
    super({
      message,
      statusCode: 404,
      code: 'UPLOAD_NOT_FOUND',
      isServer: false,
      shouldAlert: false,
    });
  }
}
