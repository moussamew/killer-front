import { useQuery } from '@tanstack/react-query';

import { getSessionRequest } from './requests';
import { type SessionQuery } from './types';

export function useSession(): SessionQuery {
  const isSessionEnabled = Boolean(localStorage.getItem('token'));

  const {
    data: session,
    refetch: refetchSession,
    isInitialLoading,
    isLoading,
  } = useQuery({
    queryKey: ['session'],
    queryFn: getSessionRequest,
    enabled: isSessionEnabled,
  });

  return {
    session,
    refetchSession,
    isLoading: isSessionEnabled ? isLoading : isInitialLoading,
  };
}
