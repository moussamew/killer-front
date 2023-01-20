import { PlayerStatus } from '@/services/player/constants';
import { Player } from '@/services/player/types';

export const roomPlayerTrinity = {
  id: 28,
  name: 'TRINITY',
  status: PlayerStatus.ALIVE,
} satisfies Player;

export const roomPlayerNeo = {
  id: 29,
  name: 'NEO',
  status: PlayerStatus.ALIVE,
} satisfies Player;

export const roomPlayerMorpheus = {
  id: 30,
  name: 'MORPHEUS',
  status: PlayerStatus.ALIVE,
} satisfies Player;
