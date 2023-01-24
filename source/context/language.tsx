import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import { Locale } from '@/constants/enums';

interface LanguageContextInterface {
  language: string;
  updateLanguage: (locale: Locale) => void;
}

interface Props {
  children: JSX.Element;
  language: Locale;
  setLanguage: Dispatch<SetStateAction<Locale>>;
}

const LanguageContext = createContext({} as LanguageContextInterface);

function LanguageProvider({
  children,
  language,
  setLanguage,
}: Props): JSX.Element {
  const updateLanguage = useCallback(
    (locale: Locale): void => {
      localStorage.setItem('locale', locale);
      setLanguage(locale);
    },
    [setLanguage],
  );

  const memoizedLanguage = useMemo(
    () => ({ language, updateLanguage }),
    [language, updateLanguage],
  );

  return (
    <LanguageContext.Provider value={memoizedLanguage}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProvider };
