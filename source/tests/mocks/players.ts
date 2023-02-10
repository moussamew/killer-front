import { PlayerStatus } from '@/services/player/constants';
import { type Player } from '@/services/player/types';

export const fakePlayerOne: Player = {
  id: 1,
  name: 'TRINITY',
  status: PlayerStatus.ALIVE,
};

export const fakePlayerTwo: Player = {
  id: 2,
  name: 'MORPHEUS',
  status: PlayerStatus.ALIVE,
};

export const fakePlayerThree: Player = {
  id: 3,
  name: 'NEO',
  status: PlayerStatus.ALIVE,
};
