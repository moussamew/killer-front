import { render, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from '@/app/routes';
import { Notification } from '@/components/Notification';
import { ModalProvider } from '@/hooks/context/modal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const renderApplication = ({ route = '/' } = {}): RenderResult => {
  // eslint-disable-next-line no-console
  setLogger({ log: console.log, warn: console.warn, error: () => {} });

  window.history.pushState({}, '', route);

  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
      <Notification />
    </QueryClientProvider>,
  );
};

const renderComponent = (component: ReactNode): RenderResult => {
  // eslint-disable-next-line no-console
  setLogger({ log: console.log, warn: console.warn, error: () => {} });

  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{component}</ModalProvider>
      <Notification />
    </QueryClientProvider>,
    { wrapper: BrowserRouter },
  );
};

export { renderApplication, renderComponent };
