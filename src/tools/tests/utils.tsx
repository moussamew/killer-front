import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { PlayerProvider } from 'hooks/context';

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
      <PlayerProvider>{component}</PlayerProvider>
    </QueryClientProvider>,
    options,
  );
};

export { renderWithProviders };
