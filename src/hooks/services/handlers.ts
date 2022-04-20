import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';

export const hooksHandlers = [
  /**
   * Mock player session.
   */
  rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(null)),
  ),
];
