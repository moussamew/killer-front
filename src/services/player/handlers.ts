import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { playerSessionWithoutRoom } from '@/tests/mocks/playerSession';

export const playerHandlers = [
  /**
   * Mock player session.
   */
  rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(playerSessionWithoutRoom)),
  ),
  /**
   * Mock player creation.
   */
  rest.post(PLAYER_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock update player.
   */
  rest.patch(`${PLAYER_ENDPOINT}/*`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
