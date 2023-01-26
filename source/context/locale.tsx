import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import { Locale } from '@/constants/enums';

interface LocaleContextInterface {
  locale: Locale;
  updateLocale: (locale: Locale) => void;
}

interface Props {
  children: JSX.Element;
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
}

const LocaleContext = createContext({} as LocaleContextInterface);

function LocaleProvider({ children, locale, setLocale }: Props): JSX.Element {
  const updateLocale = useCallback(
    (newLocale: Locale): void => {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
    },
    [setLocale],
  );

  const memoizedLanguage = useMemo(
    () => ({ locale, updateLocale }),
    [locale, updateLocale],
  );

  return (
    <LocaleContext.Provider value={memoizedLanguage}>
      {children}
    </LocaleContext.Provider>
  );
}

export { LocaleContext, LocaleProvider };
