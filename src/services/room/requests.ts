import { ROOM_ENDPOINT, ROOM_MISSION_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/services/player/types';

import { RoomStatus } from './constants';
import { Room } from './types';

const { POST, GET, DELETE, PATCH } = Method;

export function createRoomRequest(): Promise<Room> {
  return request({ url: ROOM_ENDPOINT, method: POST });
}

export function deleteRoomRequest(roomCode: string): Promise<void> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: DELETE });
}

export function getRoomPlayersRequest(roomCode: string): Promise<Player[]> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}/players`, method: GET });
}

export function getRoomMissionsRequest(): Promise<number> {
  return request({ url: ROOM_MISSION_ENDPOINT, method: GET });
}

export function getRoomInfosRequest(roomCode: string): Promise<Room> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: GET });
}

export function startPartyRequest(roomCode: string): Promise<void> {
  return request({
    url: `${ROOM_ENDPOINT}/${roomCode}`,
    method: PATCH,
    requestInit: {
      body: JSON.stringify({ status: RoomStatus.IN_GAME }),
    },
  });
}
