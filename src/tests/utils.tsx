import { render, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { Notification } from '@/components/Notification';
import { ModalProvider } from '@/hooks/context/modal';

const renderWithRouter = (
  component: ReactNode,
  { route = '/ ' } = {},
): RenderResult => {
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

  // eslint-disable-next-line no-console
  setLogger({ log: console.log, warn: console.warn, error: () => {} });

  window.history.pushState({}, '', route);

  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{component}</ModalProvider>
      <Notification />
    </QueryClientProvider>,
    { wrapper: BrowserRouter },
  );
};

export { renderWithRouter };
