import { http, HttpResponse, type HttpHandler } from 'msw';

import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { type Player } from '@/services/player/types';
import { type Room } from '@/services/room/types';

export function createRoom(): HttpHandler {
  return http.post(ROOM_ENDPOINT, () => new Response(JSON.stringify({})));
}

export function deleteRoom(roomCode: string): HttpHandler {
  return http.delete(`${ROOM_ENDPOINT}/${roomCode}`, () =>
    HttpResponse.json({}),
  );
}

export function getPlayersRoom(
  roomCode: string,
  players: Player[] = [],
): HttpHandler {
  return http.get(`${ROOM_ENDPOINT}/${roomCode}/players`, () =>
    HttpResponse.json(players),
  );
}

export function getRoomSession(
  roomCode: string,
  roomSession?: Room,
): HttpHandler {
  return http.get(`${ROOM_ENDPOINT}/${roomCode}`, () => {
    const pageParams = new URLSearchParams(window.location.search);
    const scenario = pageParams.get('scenario');

    if (scenario === 'room-not-found') {
      return new HttpResponse('Room not found', { status: 404 });
    }

    return HttpResponse.json(roomSession);
  });
}

export function startParty(roomCode: string): HttpHandler {
  return http.patch(`${ROOM_ENDPOINT}/${roomCode}`, () =>
    HttpResponse.json({}),
  );
}
