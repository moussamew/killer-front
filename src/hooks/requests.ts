import { Method, PLAYER_SESSION_ENDPOINT } from '../app/constants';
import { Player } from '../app/types';
import { request } from '../helpers/apis';
import { RequestError } from '../helpers/types';

const getPlayerSession = async (): Promise<Player & RequestError> => {
  const playerSession = await request<Player>(PLAYER_SESSION_ENDPOINT, {
    method: Method.GET,
  });

  return playerSession;
};

export { getPlayerSession };
