import { type RestHandler, rest } from 'msw';

import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { ErrorCode } from '@/constants/errors';
import { type Session } from '@/services/player/types';

export function getPlayerSession(session: Session | null): RestHandler {
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
  return rest.patch(
    `${PLAYER_ENDPOINT}/${playerId}`,
    (_, response, context) => {
      const pageParams = new URLSearchParams(window.location.search);
      const scenario = pageParams.get('scenario');

      if (scenario === 'room-not-found') {
        return response(context.status(404));
      }

      if (scenario === 'pseudo-already-used') {
        return response(
          context.status(400),
          context.json({ detail: ErrorCode.ALREADY_EXIST }),
        );
      }

      return response(context.status(200), context.json({}));
    },
  );
}
