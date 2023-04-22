import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult } from '@testing-library/react';
import { type ReactNode } from 'react';

import { Routes } from '@/app/routes';
import { QueryConfig } from '@/constants/config';
import { ModalProvider } from '@/context/modal';
import { SidebarProvider } from '@/context/sidebar';

import '../app/i18n';

interface RenderParams {
  component?: ReactNode;
  route?: string;
}

export function renderWithProviders({
  component = <Routes />,
  route = '/',
}: RenderParams = {}): RenderResult {
  window.history.pushState({}, '', route);

  const queryClient = new QueryClient({
    ...QueryConfig,
    // eslint-disable-next-line no-console
    logger: { log: console.log, warn: console.warn, error: () => {} },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SidebarProvider>{component}</SidebarProvider>
      </ModalProvider>
    </QueryClientProvider>,
  );
}
