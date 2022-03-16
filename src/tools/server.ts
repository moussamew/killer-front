import { setupServer } from 'msw/node';

import { hooksHandlers } from 'hooks/services/handlers';
import { homeHandlers } from 'pages/home/services/handlers';
import { layoutHandlers } from 'pages/layout/services/handlers';
import { roomHandlers } from 'pages/room/services/handlers';

export const server = setupServer(
  ...hooksHandlers,
  ...homeHandlers,
  ...roomHandlers,
  ...layoutHandlers,
);
