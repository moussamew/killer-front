import { setupServer } from 'msw/node';

import { hooksHandlers } from '@/hooks/services/handlers';
import { layoutHandlers } from '@/layout/services/handlers';
import { homeHandlers } from '@/pages/home/services/handlers';
import { roomPendingHandlers } from '@/pages/room/pending/services/handlers';

export const server = setupServer(
  ...hooksHandlers,
  ...homeHandlers,
  ...roomPendingHandlers,
  ...layoutHandlers,
);
