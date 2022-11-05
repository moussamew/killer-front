import { render } from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

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
        <Toaster position="top-center" />
      </ModalProvider>
    </QueryClientProvider>
  );
}

render(<App />, NODE_APP);
