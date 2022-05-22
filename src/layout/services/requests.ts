import { PLAYER_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/types';

const updatePlayer = async (playerInfos: Partial<Player>): Promise<Player> => {
  const playerInfosUpdated = await request<Player>(
    PLAYER_ENDPOINT,
    Method.PATCH,
    { body: JSON.stringify(playerInfos) },
  );

  return playerInfosUpdated;
};

export { updatePlayer };
