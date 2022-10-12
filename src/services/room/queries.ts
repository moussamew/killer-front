import { useQuery } from 'react-query';

import {
  getRoomMissionsRequest,
  getRoomPlayersRequest,
  getRoomInfosRequest,
} from './requests';
import {
  RoomInfos,
  RoomInfosQuery,
  RoomMissionsQuery,
  RoomPlayersQuery,
} from './types';

export function useRoomPlayers(roomCode: string): RoomPlayersQuery {
  const { data: roomPlayers, refetch: refetchRoomPlayers } = useQuery(
    'roomPlayers',
    () => getRoomPlayersRequest(roomCode),
  );

  return { roomPlayers, refetchRoomPlayers };
}

export function useRoomMissions(): RoomMissionsQuery {
  const { data: roomMissions, refetch: refetchRoomMissions } = useQuery(
    'roomMissions',
    getRoomMissionsRequest,
  );

  return { roomMissions, refetchRoomMissions };
}

export function useRoomInfos({
  roomCode,
  pathname,
}: RoomInfos): RoomInfosQuery {
  const { data: roomInfos, refetch: refetchRoomInfos } = useQuery(
    pathname,
    () => getRoomInfosRequest(roomCode),
  );

  return { roomInfos, refetchRoomInfos };
}
