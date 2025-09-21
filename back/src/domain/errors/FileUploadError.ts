import BaseError from '@/domain/errors/BaseError';

export default class FileUploadError extends BaseError {
  constructor(message: string) {
    super({
      message,
      statusCode: 400,
      code: 'FILE_UPLOAD_ERROR',
      isServer: false,
      shouldAlert: false,
    });
  }
}
