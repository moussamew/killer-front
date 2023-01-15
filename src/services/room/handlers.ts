import { rest } from 'msw';

import { ROOM_ENDPOINT } from '@/constants/endpoints';

export const roomHandlers = [
  /**
   * Mock room creation.
   */
  rest.post(ROOM_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock deleting room.
   */
  rest.delete(`${ROOM_ENDPOINT}/:roomCode`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock fetching players in a room.
   */
  rest.get(`${ROOM_ENDPOINT}/:roomCode/players`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([])),
  ),
  /**
   * Mock fetching room status.
   */
  rest.get(`${ROOM_ENDPOINT}/:roomCode`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock starting party.
   */
  rest.patch(`${ROOM_ENDPOINT}/:roomCode`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
