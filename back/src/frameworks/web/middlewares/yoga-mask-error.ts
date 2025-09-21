import { maskError } from 'graphql-yoga';

import { GraphQLError } from 'graphql';
import logger from '@/frameworks/utils/logger';
import BaseError from '@/domain/errors/BaseError';

export default function customMaskError(
  error: unknown,
  message: string,
  isDev?: boolean,
) {
  if (error instanceof Error) {
    const originalError = error instanceof GraphQLError ? error.originalError : error;

    logger.debug(`Original Error: ${originalError?.message ?? error.message}`);
    logger.trace(originalError ?? error);

    if (originalError instanceof BaseError && !originalError.isServer) {
      const code = originalError instanceof BaseError ? originalError.code : 'GRAPHQL_ERROR';

      return new GraphQLError(
        originalError.message,
        {
          extensions: { code },
          originalError,
        },
      );
    }
  }

  logger.debug('Returning "Unexpected error." in order to mask error - either server error or not GraphQLError');
  return maskError(error, message, isDev);
}
