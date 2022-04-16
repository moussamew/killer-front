import { rest } from 'msw';

import { PLAYER_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';

export const homeHandlers = [
  /**
   * Mock player creation.
   */
  rest.post(PLAYER_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock room creation.
   */
  rest.post(ROOM_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
