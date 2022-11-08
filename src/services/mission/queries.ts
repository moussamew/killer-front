import { useQuery } from 'react-query';

import { getTargetInfosRequest, getPlayerMissionsRequest } from './requests';
import { PlayerMissionsQuery, TargetInfosQuery } from './types';

export function useTargetInfos(): TargetInfosQuery {
  const { data: targetInfos, refetch: refetchTargetInfos } = useQuery(
    'targetInfos',
    getTargetInfosRequest,
  );

  return { targetInfos, refetchTargetInfos };
}

export function usePlayerMissions(roomCode: string): PlayerMissionsQuery {
  const { data: playerMissions } = useQuery(
    ['playerMissions', roomCode],
    getPlayerMissionsRequest,
  );

  return { playerMissions };
}
