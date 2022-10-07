import { PLAYER_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player, Room } from '@/types';

export function createPlayer({
  name,
  roomCode,
}: Partial<Player>): Promise<Player> {
  return request({
    url: PLAYER_ENDPOINT,
    method: Method.POST,
    requestInit: { body: JSON.stringify({ name, roomCode }) },
  });
}

export function createRoom(): Promise<Room> {
  return request({ url: ROOM_ENDPOINT, method: Method.POST });
}
