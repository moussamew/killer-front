import { Player } from '../types';

export interface PlayerContextInterface {
  playerSession: Player;
  refreshPlayerSession: () => Promise<void>;
}
