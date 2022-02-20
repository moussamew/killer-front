import { Method, ROOM_ENDPOINT } from '../../constants';
import { request } from '../../helpers/apis';
import { RequestError } from '../../helpers/types';
import { Player } from '../../types';

const getPlayersInRoom = async (
  roomCode?: string,
): Promise<Player[] & RequestError> => {
  const playersInRoom = await request<Player[]>(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    {
      method: Method.GET,
    },
  );

  return playersInRoom;
};

export { getPlayersInRoom };
