import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';

import { Player } from './types';

export function getPlayerSession(): Promise<Player> {
  return request({ url: PLAYER_SESSION_ENDPOINT, method: Method.GET });
}

export async function createPlayerQuery({
  name,
  roomCode,
}: Partial<Player>): Promise<void> {
  await request({
    url: PLAYER_ENDPOINT,
    method: Method.POST,
    requestInit: { body: JSON.stringify({ name, roomCode }) },
  });
}

export async function updatePlayerQuery(
  playerInfos: Partial<Player>,
): Promise<void> {
  await request({
    url: PLAYER_ENDPOINT,
    method: Method.PATCH,
    requestInit: { body: JSON.stringify(playerInfos) },
  });
}
