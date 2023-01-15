import { useQuery } from 'react-query';

import {
  getRoomMissionsRequest,
  getRoomPlayersRequest,
  getRoomRequest,
} from './requests';
import { RoomQuery, RoomMissionsQuery, RoomPlayersQuery } from './types';

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

export function useRoom(roomCode: string): RoomQuery {
  const { data: room, refetch: refetchRoom } = useQuery('room', () =>
    getRoomRequest(roomCode),
  );

  return { room, refetchRoom };
}
