import { PLAYER_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/types';

export function updatePlayer(playerInfos: Partial<Player>): Promise<Player> {
  return request({
    url: PLAYER_ENDPOINT,
    method: Method.PATCH,
    requestInit: { body: JSON.stringify(playerInfos) },
  });
}
