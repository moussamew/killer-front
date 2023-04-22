import { type RestHandler, rest } from 'msw';

import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { type Player } from '@/services/player/types';
import { type Room } from '@/services/room/types';

export function createRoom(): RestHandler {
  return rest.post(ROOM_ENDPOINT, (_, response, context) =>
    response(context.status(200), context.json({})),
  );
}

export function deleteRoom(roomCode: string): RestHandler {
  return rest.delete(`${ROOM_ENDPOINT}/${roomCode}`, (_, response, context) =>
    response(context.status(200), context.json({})),
  );
}

export function getPlayersRoom(
  roomCode: string,
  players: Player[] = [],
): RestHandler {
  return rest.get(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    (_, response, context) =>
      response(context.status(200), context.json(players)),
  );
}

export function getRoomSession(
  roomCode: string,
  roomSession?: Room,
): RestHandler {
  return rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, response, context) => {
    const pageParams = new URLSearchParams(window.location.search);
    const scenario = pageParams.get('scenario');

    if (scenario === 'room-not-found') {
      return response(context.status(404));
    }

    return response(context.status(200), context.json(roomSession));
  });
}

export function startParty(roomCode: string): RestHandler {
  return rest.patch(`${ROOM_ENDPOINT}/${roomCode}`, (_, response, context) =>
    response(context.status(200), context.json({})),
  );
}
