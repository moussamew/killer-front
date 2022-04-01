import { rest } from 'msw';

import { PLAYER_ENDPOINT } from 'constants/endpoints';

export const layoutHandlers = [
  /**
   * Mock update player.
   */
  rest.put(PLAYER_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
