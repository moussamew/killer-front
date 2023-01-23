import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';

import { Player, Session } from './types';

const { GET, POST, PATCH } = Method;

export function getSessionRequest(): Promise<Session> {
  return request({ url: SESSION_ENDPOINT, method: GET });
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
