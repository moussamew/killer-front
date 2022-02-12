import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '../../constants';

export const hooksHandlers = [
  /**
   * Mock player session.
   */
  rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.json({}),
    ),
  ),
];
