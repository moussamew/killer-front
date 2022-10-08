import { useQuery } from 'react-query';

import { getRoomPlayers } from './requests';
import { RoomPlayersQuery } from './types';

export function useRoomPlayers(roomCode: string): RoomPlayersQuery {
  const { data: roomPlayers, refetch: refetchRoomPlayers } = useQuery(
    'roomPlayers',
    () => getRoomPlayers(roomCode),
  );

  return { roomPlayers, refetchRoomPlayers };
}
