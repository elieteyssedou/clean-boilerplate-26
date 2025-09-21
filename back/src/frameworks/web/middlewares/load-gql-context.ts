import { YogaInitialContext } from 'graphql-yoga';
import { container } from 'tsyringe';
import { GraphQLError } from 'graphql';
import VerifyAuthTokenUseCase from '@/use-cases/authentication/VerifyAuthToken';
import logger from '@/frameworks/utils/logger';

const ACCESS_TOKEN_HEADER = 'x-access-token';

async function loadGqlContext(context: YogaInitialContext) {
  try {
    const { request } = context;
    const authToken = request.headers.get(ACCESS_TOKEN_HEADER);

    const authenticatedContext = await container
      .resolve(VerifyAuthTokenUseCase)
      .execute({ authToken: authToken! });
    return { ...authenticatedContext };
  } catch (e) {
    logger.debug(e);
    throw new GraphQLError('Access denied', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
        http: { status: 401 },
      },
    });
  }
}

export default loadGqlContext;
