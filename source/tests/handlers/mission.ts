import { rest } from 'msw';

import { MISSION_ENDPOINT } from '@/constants/endpoints';

export const missionHandlers = [
  /**
   * Mock adding mission.
   */
  rest.post(MISSION_ENDPOINT, async (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ id: 0, content: 'New Mission' })),
  ),
  /**
   * Mock deleting mission.
   */
  rest.delete(`${MISSION_ENDPOINT}/:missionId`, async (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
