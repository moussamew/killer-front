import { ROOM_ENDPOINT, ROOM_MISSION_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/services/player/types';

import { Room } from './types';

const { POST, GET } = Method;

export async function createRoomRequest(): Promise<Room> {
  return request({ url: ROOM_ENDPOINT, method: POST });
}

export function getRoomPlayersRequest(roomCode: string): Promise<Player[]> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}/players`, method: GET });
}

export function getRoomMissionsRequest(): Promise<number> {
  return request({ url: ROOM_MISSION_ENDPOINT, method: GET });
}
