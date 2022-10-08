import { useQuery } from 'react-query';

import { getPlayerSession } from './requests';
import { PlayerSessionQuery } from './types';

export function usePlayerSession(): PlayerSessionQuery {
  const { data: playerSession, refetch: refetchPlayerSession } = useQuery(
    'playerSession',
    getPlayerSession,
  );

  return { playerSession, refetchPlayerSession };
}
