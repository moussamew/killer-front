import { PlayerStatus } from '@/services/player/constants';
import { type Player } from '@/services/player/types';

export const fakePlayerOne = {
  id: 1,
  name: 'TRINITY',
  status: PlayerStatus.ALIVE,
} satisfies Player;

export const fakePlayerTwo = {
  id: 2,
  name: 'MORPHEUS',
  status: PlayerStatus.ALIVE,
} satisfies Player;

export const fakePlayerThree = {
  id: 3,
  name: 'NEO',
  status: PlayerStatus.ALIVE,
} satisfies Player;
