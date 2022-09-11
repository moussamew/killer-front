import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ModalProvider } from '@/hooks/context/modal';
import { PlayerProvider } from '@/hooks/context/player';
import { AppRoutes } from '@/routes';

import './assets/styles/app.css';

const NODE_APP = document.getElementById('killerparty');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <PlayerProvider>
        <AppRoutes />
      </PlayerProvider>
    </ModalProvider>
  </QueryClientProvider>
);

render(<App />, NODE_APP);
