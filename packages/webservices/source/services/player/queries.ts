import { useQuery } from '@tanstack/react-query';

import { context } from '../../provider';

import { getSessionRequest } from './requests';
import { type SessionQuery } from './types';

export function useSession(): SessionQuery {
  const {
    data: session,
    refetch: refetchSession,
    isLoading,
    fetchStatus,
  } = useQuery({
    context,
    queryKey: ['session'],
    queryFn: getSessionRequest,
  });

  return {
    session,
    refetchSession,
    isLoading: isLoading && fetchStatus !== 'idle',
  };
}
