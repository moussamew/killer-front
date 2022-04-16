import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Player } from '@/types';

const getPlayerSession = async (): Promise<Player> => {
  const playerSession = await request<Player>(
    PLAYER_SESSION_ENDPOINT,
    Method.GET,
  );

  return playerSession;
};

export { getPlayerSession };
