import { rest } from 'msw';

import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { noRoomSession } from '@/tests/mocks/sessions';

export const playerHandlers = [
  /**
   * Mock player session.
   */
  rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(noRoomSession)),
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
