'use client';

import { useApolloClient } from '@apollo/client';
import { Spinner } from '@heroui/react';
import { useUser } from '@stackframe/stack';
import { useEffect, useState } from 'react';

// from https://github.com/apollographql/apollo-client-nextjs/issues/103#issuecomment-1790941212
export default function ApolloProviderUpdateAuth({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccessToken() {
      let newUserAccessToken = null;

      if (user) {
        try {
          const { accessToken } = await user.getAuthJson();
          newUserAccessToken = accessToken;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch access token:', error);
        }
      }

      setUserAccessToken(newUserAccessToken);
    }

    fetchAccessToken();
  }, [user]);

  const apolloClient = useApolloClient();

  apolloClient.defaultContext.accessToken = userAccessToken;

  if (!userAccessToken) {
    return (
      <div className="w-full h-svh flex items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  return children;
}
