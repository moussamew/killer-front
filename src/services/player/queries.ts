import { useQuery } from 'react-query';

import { getPlayerSessionRequest } from './requests';
import { PlayerSessionQuery } from './types';

export function usePlayerSession(): PlayerSessionQuery {
  const {
    data: playerSession,
    refetch: refetchPlayerSession,
    isLoading: isPlayerSessionLoading,
  } = useQuery('playerSession', getPlayerSessionRequest);

  return { playerSession, refetchPlayerSession, isPlayerSessionLoading };
}
