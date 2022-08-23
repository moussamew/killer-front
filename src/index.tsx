import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ModalProvider } from '@/hooks/context/modal';
import { PlayerProvider } from '@/hooks/context/player';

import { AppRoutes } from './routes';
import './assets/styles/app.css';

const container = document.getElementById('killerparty');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = createRoot(container!);

root.render(
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <PlayerProvider>
        <AppRoutes />
      </PlayerProvider>
    </ModalProvider>
  </QueryClientProvider>,
);
