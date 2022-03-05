import { rest } from 'msw';

import { ROOM_ENDPOINT } from 'constants/endpoints';

export const roomHandlers = [
  /**
   * Mock fetching players in a room.
   */
  rest.get(`${ROOM_ENDPOINT}/*/players`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([])),
  ),
];
