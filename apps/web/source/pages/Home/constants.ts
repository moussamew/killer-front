import { type GameMode } from '@/constants/types';

export const GAME_MODES: GameMode[] = [
  {
    id: 0,
    value: 'game master',
    label: 'Mode « Maître de Jeu »',
  },
  {
    id: 1,
    value: 'player',
    label: 'Mode « Chacun pour Soi »',
  },
];
