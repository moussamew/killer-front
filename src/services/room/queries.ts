import { useQuery } from 'react-query';

import { getRoomPlayersRequest } from './requests';
import { RoomPlayersQuery } from './types';

export function useRoomPlayers(roomCode: string): RoomPlayersQuery {
  const { data: roomPlayers, refetch: refetchRoomPlayers } = useQuery(
    'roomPlayers',
    () => getRoomPlayersRequest(roomCode),
  );

  return { roomPlayers, refetchRoomPlayers };
}
