import { rest } from 'msw';

import { ROOM_ENDPOINT } from '@/constants/endpoints';

export const roomHandlers = [
  /**
   * Mock fetching room status.
   */
  rest.get(`${ROOM_ENDPOINT}/:roomCode`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
