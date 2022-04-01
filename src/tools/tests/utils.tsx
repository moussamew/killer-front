import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ModalProvider } from 'hooks/context/modal';
import { PlayerProvider } from 'hooks/context/player';

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
      <PlayerProvider>
        <ModalProvider>{component}</ModalProvider>
      </PlayerProvider>
    </QueryClientProvider>,
    options,
  );
};

export { renderWithProviders };
