import {
  Method,
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '../../app/constants';
import { Player, Room } from '../../app/types';
import { request } from '../../helpers/apis';
import { RequestError } from '../../helpers/types';

const { GET, POST } = Method;

const getPlayerSession = async (): Promise<Player & RequestError> => {
  const playerSession = await request<Player>(PLAYER_SESSION_ENDPOINT, {
    method: GET,
  });

  return playerSession;
};

const createPlayer = async (
  playerName: string,
): Promise<Player & RequestError> => {
  const player = await request<Player>(PLAYER_ENDPOINT, {
    method: POST,
    body: JSON.stringify({
      name: playerName,
    }),
  });

  return player;
};

const createRoom = async (): Promise<Room & RequestError> => {
  const room = await request<Room>(ROOM_ENDPOINT, {
    method: POST,
  });

  return room;
};

export { getPlayerSession, createPlayer, createRoom };
