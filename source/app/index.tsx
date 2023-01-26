import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Locale } from '@/constants/enums';
import { translations } from '@/constants/languages';
import { LocaleProvider } from '@/context/language';
import { ModalProvider } from '@/context/modal';

import { Routes } from './routes';

import '../assets/styles/app.css';

const NODE_APP = document.getElementById('killerparty');

const root = createRoot(NODE_APP!);

function App(): JSX.Element {
  const [locale, setLocale] = useState(
    (localStorage.getItem('locale') as Locale) || Locale.FRENCH,
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={locale} messages={translations[locale]}>
        <LocaleProvider locale={locale} setLocale={setLocale}>
          <ModalProvider>
            <Routes />
          </ModalProvider>
        </LocaleProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
}

root.render(<App />);
