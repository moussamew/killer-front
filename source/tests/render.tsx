import { render, type RenderResult } from '@testing-library/react';
import { type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { Routes } from '@/app/routes';
import { QueryConfig } from '@/constants/config';
import { Locale } from '@/constants/enums';
import { translations } from '@/constants/languages';
import { ModalProvider } from '@/context/modal';

interface RenderParams {
  component?: ReactNode;
  route?: string;
}

export function renderWithProviders({
  component = <Routes />,
  route = '/',
}: RenderParams = {}): RenderResult {
  // eslint-disable-next-line no-console
  setLogger({ log: console.log, warn: console.warn, error: () => {} });

  window.history.pushState({}, '', route);

  const queryClient = new QueryClient(QueryConfig);

  return render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider
        locale={Locale.FRENCH}
        messages={translations[Locale.FRENCH]}
      >
        <ModalProvider>{component}</ModalProvider>
      </IntlProvider>
    </QueryClientProvider>,
  );
}
