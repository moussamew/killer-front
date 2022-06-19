import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  PLAYER_MISSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_MISSION_ENDPOINT,
} from '@/constants/endpoints';

export const pendingRoomHandlers = [
  /**
   * Mock fetching players in a room.
   */
  rest.get(`${ROOM_ENDPOINT}/:roomCode/players`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([])),
  ),
  /**
   * Mock fetching missions in room.
   */
  rest.get(ROOM_MISSION_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(0)),
  ),
  /**
   * Mock fetching missions for a player.
   */
  rest.get(PLAYER_MISSION_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([])),
  ),
  /**
   * Mock deleting mission.
   */
  rest.delete(`${MISSION_ENDPOINT}/:missionId`, async (_req, res, ctx) =>
    res(ctx.status(200)),
  ),
  /**
   * Mock adding mission.
   */
  rest.post(MISSION_ENDPOINT, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ id: 0, content: 'New Mission' })),
  ),
  /**
   * Mock kicking player.
   */
  rest.patch(
    `${ROOM_ENDPOINT}/:roomCode/player/:playerId/admin`,
    async (_req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock deleting room.
   */
  rest.delete(`${ROOM_ENDPOINT}/:roomCode`, async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];
