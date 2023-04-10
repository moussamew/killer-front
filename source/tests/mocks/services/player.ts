import { type RestHandler, rest } from 'msw';

import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { type Session } from '@/services/player/types';

export function getPlayerSession(session: Session): RestHandler {
  return rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(session)),
  );
}

export function createPlayer(): RestHandler {
  return rest.post(PLAYER_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  );
}

export function updatePlayer(playerId: string): RestHandler {
  return rest.patch(`${PLAYER_ENDPOINT}/${playerId}`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  );
}
