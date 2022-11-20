import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Notification } from '@/components/Notification';
import { ModalProvider } from '@/hooks/context/modal';
import { AppRoutes } from '@/routes';

import './assets/styles/app.css';

const NODE_APP = document.getElementById('killerparty');

const root = createRoot(NODE_APP!);

function App(): JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AppRoutes />
        <Notification />
      </ModalProvider>
    </QueryClientProvider>
  );
}

root.render(<App />);
