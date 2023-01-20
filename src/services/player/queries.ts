import { useQuery } from 'react-query';

import { getPlayerSessionRequest } from './requests';
import { PlayerSessionQuery } from './types';

export function usePlayerSession(): PlayerSessionQuery {
  const {
    data: player,
    refetch: refetchPlayer,
    isLoading,
  } = useQuery('playerSession', getPlayerSessionRequest);

  return {
    player,
    refetchPlayer,
    isLoading,
  };
}
