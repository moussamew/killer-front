import { Method, ROOM_ENDPOINT } from '../../app/constants';
import { Player } from '../../app/types';
import { request } from '../../helpers/apis';
import { RequestError } from '../../helpers/types';

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
