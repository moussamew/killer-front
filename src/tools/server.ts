import { setupServer } from 'msw/node';

import { hooksHandlers } from '../hooks/services/handlers';
import { homeHandlers } from '../pages/home/services/handlers';

export const server = setupServer(...homeHandlers, ...hooksHandlers);
