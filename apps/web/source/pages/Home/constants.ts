export interface Mode {
  id: number;
  value: string;
  label: string;
}

export const modes: Mode[] = [
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
