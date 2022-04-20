import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/types';

const getPlayersInRoom = async (roomCode?: string): Promise<Player[]> => {
  const playersInRoom = await request<Player[]>(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    Method.GET,
  );

  return playersInRoom;
};

export { getPlayersInRoom };
