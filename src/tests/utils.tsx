import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{component}</ModalProvider>
    </QueryClientProvider>,
    options,
  );
};

export { renderWithProviders };
