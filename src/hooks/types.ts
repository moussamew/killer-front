import { Player } from '../types';

export type PlayerSession = Player;

export interface PlayerContextInterface {
  playerSession: PlayerSession;
  refreshPlayerSession: () => Promise<void>;
}
