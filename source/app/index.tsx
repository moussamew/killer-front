import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { QueryConfig } from '@/constants/config';
import { ModalProvider } from '@/context/modal';

import { Routes } from './routes';

/** Base CSS Files */
import '@/assets/styles/preflight.module.css';
import '@/assets/styles/app.module.css';
import '@/assets/styles/fonts.module.css';
import '@/assets/styles/variables.module.css';
import '@/assets/styles/animations.module.css';

/** Internationalization */
import './i18n';

const NODE_APP = document.getElementById('app');

const root = createRoot(NODE_APP!);

function App(): JSX.Element {
  const queryClient = new QueryClient(QueryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </QueryClientProvider>
  );
}

root.render(<App />);
