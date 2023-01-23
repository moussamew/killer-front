import { useQuery } from 'react-query';

import { getSessionRequest } from './requests';
import { SessionQuery } from './types';

export function useSession(): SessionQuery {
  const {
    data: session,
    refetch: refetchSession,
    isLoading,
  } = useQuery('session', getSessionRequest);

  return {
    session,
    refetchSession,
    isLoading,
  };
}
