import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ModalProvider } from '@/hooks/context/modal';

import { Routes } from './routes';

import '../assets/styles/app.css';

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
        <Routes />
      </ModalProvider>
    </QueryClientProvider>
  );
}

root.render(<App />);
