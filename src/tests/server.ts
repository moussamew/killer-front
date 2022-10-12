import { setupServer } from 'msw/node';

import { missionHandlers } from '@/services/mission/handlers';
import { playerHandlers } from '@/services/player/handlers';
import { roomHandlers } from '@/services/room/handlers';

export const server = setupServer(
  ...missionHandlers,
  ...playerHandlers,
  ...roomHandlers,
);
