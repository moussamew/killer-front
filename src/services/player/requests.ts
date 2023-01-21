import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';

import { Player, PlayerSession } from './types';

const { GET, POST, PATCH } = Method;

export function getPlayerSessionRequest(): Promise<PlayerSession> {
  return request({ url: PLAYER_SESSION_ENDPOINT, method: GET });
}

export async function createPlayerRequest(name: string): Promise<Player> {
  return request({
    url: PLAYER_ENDPOINT,
    method: POST,
    requestInit: { body: JSON.stringify({ name }) },
  });
}

export async function updatePlayerRequest(
  player: Partial<Player>,
): Promise<void> {
  await request({
    url: `${PLAYER_ENDPOINT}/${player.id}`,
    method: PATCH,
    requestInit: { body: JSON.stringify(player) },
  });
}
