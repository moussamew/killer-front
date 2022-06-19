import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
} from '@/constants/endpoints';

export const playingRoomHandlers = [
  /**
   * Mock fetching player target.
   */
  rest.get(PLAYER_TARGET_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock fetching mission to do to its target.
   */
  rest.get(MISSION_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
