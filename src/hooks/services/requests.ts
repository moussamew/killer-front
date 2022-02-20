import { Method, PLAYER_SESSION_ENDPOINT } from '../../constants';
import { request } from '../../helpers/apis';
import { RequestError } from '../../helpers/types';
import { Player } from '../../types';

const getPlayerSession = async (): Promise<Player & RequestError> => {
  const playerSession = await request<Player>(PLAYER_SESSION_ENDPOINT, {
    method: Method.GET,
  });

  return playerSession;
};

export { getPlayerSession };
