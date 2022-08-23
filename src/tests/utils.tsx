import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ModalProvider } from '@/hooks/context/modal';
import { PlayerProvider } from '@/hooks/context/player';
import { RoomProvider } from '@/hooks/context/room';
import { TargetProvider } from '@/hooks/context/target';

interface Props {
  children: ReactElement;
}

export const Providers = ({ children }: Props): JSX.Element => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <ModalProvider>
          <RoomProvider>
            <TargetProvider>{children}</TargetProvider>
          </RoomProvider>
        </ModalProvider>
      </PlayerProvider>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: Providers, ...options });
