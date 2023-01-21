import { setupServer } from 'msw/node';

import { missionHandlers } from './handlers/mission';
import { playerHandlers } from './handlers/player';
import { roomHandlers } from './handlers/room';

export const server = setupServer(
  ...missionHandlers,
  ...playerHandlers,
  ...roomHandlers,
);
