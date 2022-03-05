import { Method, ROOM_ENDPOINT } from '../../../constants';
import { request } from '../../../helpers/apis';
import { Player } from '../../../types';

const getPlayersInRoom = async (roomCode?: string): Promise<Player[]> => {
  const playersInRoom = await request<Player[]>(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    Method.GET,
  );

  return playersInRoom;
};

export { getPlayersInRoom };
