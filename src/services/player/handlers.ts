import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';

import { PlayerRole, PlayerStatus } from './constants';

export const playerHandlers = [
  /**
   * Mock player session.
   */
  rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: 135,
        name: 'Le Mérovingien',
        roomCode: null,
        targetId: null,
        missionId: null,
        role: PlayerRole.ADMIN,
        status: PlayerStatus.ALIVE,
      }),
    ),
  ),
  /**
   * Mock player creation.
   */
  rest.post(PLAYER_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock update player.
   */
  rest.patch(PLAYER_ENDPOINT, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  /**
   * Mock kicking player.
   */
  rest.patch(
    `${ROOM_ENDPOINT}/:roomCode/player/:playerId/admin`,
    (_req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
];
