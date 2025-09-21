import path, { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';

const dirname = path.resolve();

const typeDefs = loadFilesSync(join(dirname, 'src/frameworks/web/graphql/types'), {
  extensions: ['graphql'],
});

const resolvers = loadFilesSync(join(dirname, 'src/frameworks/web/graphql/resolvers'), {
  extensions: ['ts'],
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
