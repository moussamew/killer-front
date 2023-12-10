import { http, HttpResponse, type HttpHandler } from 'msw';

import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { ErrorCode } from '@/constants/errors';
import { type Session } from '@/services/player/types';

export function getPlayerSession(session: Session | null): HttpHandler {
  return http.get(SESSION_ENDPOINT, () => HttpResponse.json(session));
}

export function createPlayer(): HttpHandler {
  return http.post(PLAYER_ENDPOINT, () => HttpResponse.json({}));
}

export function updatePlayer(playerId: string): HttpHandler {
  return http.patch(`${PLAYER_ENDPOINT}/${playerId}`, () => {
    const pageParams = new URLSearchParams(window.location.search);
    const scenario = pageParams.get('scenario');

    if (scenario === 'room-not-found') {
      return new HttpResponse('Room not found', { status: 404 });
    }

    if (scenario === 'pseudo-already-used') {
      return new HttpResponse(
        JSON.stringify({ detail: ErrorCode.ALREADY_EXIST }),
        { status: 400 },
      );
    }

    return HttpResponse.json({});
  });
}
