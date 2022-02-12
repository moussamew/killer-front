import { Dispatch, SetStateAction } from 'react';

import { Player } from '../app/types';

export type PlayerSession = Player | Record<string, never>;

export interface PlayerContextInterface {
  playerSession: PlayerSession;
  setPlayerSession: Dispatch<SetStateAction<PlayerSession>>;
}
