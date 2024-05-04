import { type GameMode } from './types';

const { VITE_API_URL, VITE_FRONT_URL, VITE_MERCURE_URL, PROD } = import.meta
  .env;

export const PROD_ENV = PROD;
export const API_URL = VITE_API_URL;
export const FRONT_URL = VITE_FRONT_URL;
export const MERCURE_URL = VITE_MERCURE_URL;

export const modes: GameMode[] = [
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
