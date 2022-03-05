import { Method, PLAYER_ENDPOINT, ROOM_ENDPOINT } from '../../../constants';
import { request } from '../../../helpers/apis';
import { Player, Room } from '../../../types';

const createPlayer = async (playerName: string): Promise<Player> => {
  const player = await request<Player>(PLAYER_ENDPOINT, Method.POST, {
    body: JSON.stringify({
      name: playerName,
    }),
  });

  return player;
};

const createRoom = async (): Promise<Room> => {
  const room = await request<Room>(ROOM_ENDPOINT, Method.POST);

  return room;
};

export { createPlayer, createRoom };
