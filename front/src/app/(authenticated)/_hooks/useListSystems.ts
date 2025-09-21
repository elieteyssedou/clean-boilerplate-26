import { useQuery } from '@apollo/client';
import { gql } from '@/__generated__';

const LIST_SYSTEMS = gql(`
  query ListSystems {
    systems {
      id
      name
      components {
        id
        name
        versions {
          number
        }
        createdAt
        updatedAt
      }
    }
  }
`);

export default function useListSystems() {
  const {
    data, loading, error, refetch,
  } = useQuery(LIST_SYSTEMS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  return {
    systems: data?.systems?.filter((system) => system != null) || [],
    loading,
    error,
    refetch,
  };
}