import { setupServer } from 'msw/node';

import { hooksHandlers } from '@/hooks/services/handlers';
import { layoutHandlers } from '@/layout/services/handlers';
import { homeHandlers } from '@/pages/home/services/handlers';
import { roomHandlers } from '@/pages/room/services/handlers';

export const server = setupServer(
  ...hooksHandlers,
  ...homeHandlers,
  ...roomHandlers,
  ...layoutHandlers,
);
