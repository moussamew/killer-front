import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';

import { Player } from './types';

const { GET, POST, PATCH } = Method;

export function getPlayerSessionRequest(): Promise<Player> {
  return request({ url: PLAYER_SESSION_ENDPOINT, method: GET });
}

export async function createPlayerRequest({
  name,
  roomCode,
}: Partial<Player>): Promise<void> {
  await request({
    url: PLAYER_ENDPOINT,
    method: POST,
    requestInit: { body: JSON.stringify({ name, roomCode }) },
  });
}

export async function updatePlayerRequest(
  playerInfos: Partial<Player>,
): Promise<void> {
  await request({
    url: PLAYER_ENDPOINT,
    method: PATCH,
    requestInit: { body: JSON.stringify(playerInfos) },
  });
}

export function kickPlayerRequest({
  roomCode,
  id,
}: Pick<Player, 'roomCode' | 'id'>): Promise<void> {
  return request({
    url: `${ROOM_ENDPOINT}/${roomCode}/player/${id}/admin`,
    method: PATCH,
    requestInit: {
      body: JSON.stringify({ roomCode: null }),
    },
  });
}
