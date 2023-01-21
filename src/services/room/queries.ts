import { useQuery } from 'react-query';

import { getRoomRequest } from './requests';
import { RoomQuery } from './types';

export function useRoom(roomCode: string): RoomQuery {
  const { data: room, refetch: refetchRoom } = useQuery('room', () =>
    getRoomRequest(roomCode),
  );

  return { room, refetchRoom };
}
