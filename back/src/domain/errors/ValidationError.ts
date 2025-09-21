import BaseError from '@/domain/errors/BaseError';

export interface FieldError {
  field: string;
  message: string;
}

export default class ValidationError extends BaseError {
  public readonly fieldErrors: FieldError[];

  constructor(fieldErrors: FieldError[]) {
    const message = fieldErrors.length === 1
      ? fieldErrors[0].message
      : `Validation failed for ${fieldErrors.length} fields`;

    super({ message, statusCode: 400 });
    this.fieldErrors = fieldErrors;
  }

  public hasFieldError(field: string): boolean {
    return this.fieldErrors.some((error) => error.field === field);
  }

  public getFieldError(field: string): string | undefined {
    return this.fieldErrors.find((error) => error.field === field)?.message;
  }
}
