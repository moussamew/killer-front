import { render, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { AppRoutes } from '@/app/routes';
import { Notification } from '@/components/Notification';
import { ModalProvider } from '@/hooks/context/modal';

interface RenderParams {
  component?: ReactNode;
  route?: string;
}

const renderWithProviders = ({
  component = <AppRoutes />,
  route = '/',
}: RenderParams = {}): RenderResult => {
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
  );
};

export { renderWithProviders };
