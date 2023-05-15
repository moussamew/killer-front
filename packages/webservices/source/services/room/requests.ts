import { ROOM_ENDPOINT } from '../../constants';
import { createRequest } from '../../utils/create-request';

import { type Room } from './types';

export function createRoomRequest(): Promise<Room> {
  return createRequest({ url: ROOM_ENDPOINT, method: 'POST' });
}

export function deleteRoomRequest(roomCode: string): Promise<void> {
  return createRequest({
    url: `${ROOM_ENDPOINT}/${roomCode}`,
    method: 'DELETE',
  });
}

export function getRoomRequest(roomCode: string): Promise<Room> {
  return createRequest({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: 'GET' });
}

export function startPartyRequest(roomCode: string): Promise<void> {
  return createRequest({
    url: `${ROOM_ENDPOINT}/${roomCode}`,
    method: 'PATCH',
    requestInit: {
      body: JSON.stringify({ status: 'IN_GAME' }),
    },
  });
}
