import { Method, PLAYER_ENDPOINT, ROOM_ENDPOINT } from '../../app/constants';
import { Player, Room } from '../../app/types';
import { request } from '../../helpers/apis';

const createPlayer = async (playerName: string): Promise<Player> => {
  const player = await request<Player>(PLAYER_ENDPOINT, {
    method: Method.POST,
    body: JSON.stringify({
      name: playerName,
    }),
  });

  return player;
};

const createRoom = async (): Promise<Room> => {
  const room = await request<Room>(ROOM_ENDPOINT, {
    method: Method.POST,
  });

  return room;
};

export { createPlayer, createRoom };
