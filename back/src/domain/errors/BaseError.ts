import { isString, snakeCase } from 'lodash-es';

interface BaseErrorObjectParams {
  /** The name of the error, used to identify the error type. */
  name?: string;
  /** The error message, explains what happened. */
  message: string;
  /** The HTTP status code associated with this error. */
  statusCode?: number;
  /** A code to identify the error (in the Front app for example). */
  code?: string;
  /** Defines if developers should be alerted when this error occur. */
  shouldAlert?: boolean;
  /** Defines if this error must remain on the Server side or
   * if it can be transmitted to the Front App */
  isServer?: boolean;
  /** Optionnal way to pass data along an error to explain the error context. */
  context?: object;
}

export type BaseErrorParams = string | BaseErrorObjectParams;
class BaseError extends Error {
  public statusCode: BaseErrorObjectParams['statusCode'];

  public code?: BaseErrorObjectParams['code'];

  public shouldAlert: BaseErrorObjectParams['shouldAlert'];

  public isServer: BaseErrorObjectParams['isServer'];

  public context?: BaseErrorObjectParams['context'];

  constructor({
    name,
    message,
    statusCode = 500,
    code,
    shouldAlert,
    isServer = true,
    context,
  }: BaseErrorObjectParams) {
    super(message);

    this.name = name ?? this.constructor.name;
    this.statusCode = statusCode;
    this.code = code ?? snakeCase(this.constructor.name).toUpperCase();
    this.shouldAlert = shouldAlert ?? isServer;
    this.isServer = isServer;
    this.context = context;

    // Fixing the prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static paramsFromInput(params: BaseErrorParams): BaseErrorObjectParams {
    return isString(params) ? { message: params } : params;
  }
}

export default BaseError;
