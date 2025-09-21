'use client';

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const ACCESS_TOKEN_HEADER = 'x-access-token';

declare module '@apollo/client' {
  export interface DefaultContext {
    accessToken?: string | null;
  }
}

// have a function to create a client for you
function makeClient() {
  const uploadLink = createUploadLink({
    uri: 'http://localhost:5100/graphql',
    fetchOptions: { cache: 'no-store' },
  });

  const authLink = setContext(async (_, { headers, accessToken }) => ({
    headers: {
      ...headers,
      ...(accessToken ? { [ACCESS_TOKEN_HEADER]: accessToken } : {}),
    },
  }));
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(uploadLink),
  });
}

export default function ApolloProviderWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
