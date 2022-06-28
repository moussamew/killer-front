import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
} from '@/constants/endpoints';

export const hooksHandlers = [
  /**
   * Mock player session.
   */
  rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(null)),
  ),
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
