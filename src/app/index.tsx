import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Notification } from '@/components/Notification';
import { ModalProvider } from '@/hooks/context/modal';
import { WebViewDetector } from '@/layout/WebViewDetector';

import { AppRoutes } from './routes';

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
        <WebViewDetector>
          <AppRoutes />
        </WebViewDetector>
        <Notification />
      </ModalProvider>
    </QueryClientProvider>
  );
}

root.render(<App />);
