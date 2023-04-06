import { useQuery } from 'react-query';

import { getSessionRequest } from './requests';
import { type SessionQuery } from './types';

export function useSession(): SessionQuery {
  const {
    data: session,
    refetch: refetchSession,
    isLoading,
  } = useQuery('session', getSessionRequest, {
    enabled: Boolean(localStorage.getItem('token')),
  });

  return {
    session,
    refetchSession,
    isLoading,
  };
}
