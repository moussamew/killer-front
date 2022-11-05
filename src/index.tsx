import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Notifications } from '@/components/Notifications';
import { ModalProvider } from '@/hooks/context/modal';
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

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AppRoutes />
        <Notifications />
      </ModalProvider>
    </QueryClientProvider>
  );
}

render(<App />, NODE_APP);
