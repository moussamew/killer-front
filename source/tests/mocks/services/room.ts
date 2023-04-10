import { type RestHandler, rest } from 'msw';

import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { type Player } from '@/services/player/types';
import { type Room } from '@/services/room/types';

export function createRoom(): RestHandler {
  return rest.post(ROOM_ENDPOINT, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  );
}

export function deleteRoom(roomCode: string): RestHandler {
  return rest.delete(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  );
}

export function getPlayersRoom(
  roomCode: string,
  players: Player[] = [],
): RestHandler {
  return rest.get(`${ROOM_ENDPOINT}/${roomCode}/players`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(players)),
  );
}

export function getRoomSession(
  roomCode: string,
  roomSession?: Room,
): RestHandler {
  return rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(roomSession)),
  );
}

export function startParty(roomCode: string): RestHandler {
  return rest.patch(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
    res(ctx.status(200)),
  );
}
