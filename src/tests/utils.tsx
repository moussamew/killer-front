import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { ModalProvider } from '@/hooks/context/modal';

const renderWithProviders = (
  component: ReactNode,
  options?: RenderOptions,
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

  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{component}</ModalProvider>
      <Toaster />
    </QueryClientProvider>,
    options,
  );
};

export { renderWithProviders };
