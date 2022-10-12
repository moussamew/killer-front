import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
} from '@/constants/endpoints';

export const missionHandlers = [
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
  /**
   * Mock fetching missions for a player.
   */
  rest.get(PLAYER_MISSION_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([])),
  ),
  /**
   * Mock adding mission.
   */
  rest.post(MISSION_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ id: 0, content: 'New Mission' })),
  ),
  /**
   * Mock deleting mission.
   */
  rest.delete(`${MISSION_ENDPOINT}/:missionId`, async (_req, res, ctx) =>
    res(ctx.status(200)),
  ),
];
