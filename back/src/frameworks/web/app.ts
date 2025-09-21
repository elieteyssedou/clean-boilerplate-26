import { createYoga } from 'graphql-yoga';
import '@/frameworks/container';
import schema from '@/frameworks/web/graphql/schema';
import loadGqlContext from '@/frameworks/web/middlewares/load-gql-context';
import logger from '@/frameworks/utils/logger';
import customMaskError from '@/frameworks/web/middlewares/yoga-mask-error';

const yoga = createYoga({
  schema,
  context: loadGqlContext,
  maskedErrors: {
    maskError: customMaskError,
  },
  cors: {
    origin: ['http://localhost:5200'],
    credentials: true,
  },
  multipart: true,
  graphqlEndpoint: '/graphql',
  logging: {
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
  },
});

export default yoga;
