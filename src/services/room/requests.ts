import { ROOM_ENDPOINT, ROOM_MISSION_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/services/player/types';

const { POST, GET } = Method;

export async function createRoomRequest(): Promise<void> {
  await request({ url: ROOM_ENDPOINT, method: POST });
}

export function getRoomPlayers(roomCode: string): Promise<Player[]> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}/players`, method: GET });
}

export function getRoomMissions(): Promise<number> {
  return request({ url: ROOM_MISSION_ENDPOINT, method: GET });
}
