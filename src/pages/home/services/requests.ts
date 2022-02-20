import { Method, PLAYER_ENDPOINT, ROOM_ENDPOINT } from '../../../constants';
import { request } from '../../../helpers/apis';
import { RequestError } from '../../../helpers/types';
import { Player, Room } from '../../../types';

const createPlayer = async (
  playerName: string,
): Promise<Player & RequestError> => {
  const player = await request<Player>(PLAYER_ENDPOINT, {
    method: Method.POST,
    body: JSON.stringify({
      name: playerName,
    }),
  });

  return player;
};

const createRoom = async (): Promise<Room & RequestError> => {
  const room = await request<Room>(ROOM_ENDPOINT, {
    method: Method.POST,
  });

  return room;
};

export { createPlayer, createRoom };
