import { setupServer } from 'msw/node';

import { hooksHandlers } from '@/hooks/services/handlers';
import { layoutHandlers } from '@/layout/services/handlers';
import { homeHandlers } from '@/pages/home/services/handlers';
import { pendingRoomHandlers } from '@/pages/room/pending/services/handlers';
import { playingRoomHandlers } from '@/pages/room/playing/services/handlers';
import { roomHandlers } from '@/pages/room/services/handlers';

export const server = setupServer(
  ...hooksHandlers,
  ...homeHandlers,
  ...roomHandlers,
  ...pendingRoomHandlers,
  ...playingRoomHandlers,
  ...layoutHandlers,
);
