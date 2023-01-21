import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { playerWithoutRoom } from '@/tests/mocks/players';

export const playerHandlers = [
  /**
   * Mock player session.
   */
  rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(playerWithoutRoom)),
  ),
  /**
   * Mock player creation.
   */
  rest.post(PLAYER_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock update player.
   */
  rest.patch(`${PLAYER_ENDPOINT}/*`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
