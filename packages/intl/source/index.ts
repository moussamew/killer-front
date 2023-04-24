import i18next, { t as i18nTranslate } from 'i18next';
import {
  initReactI18next,
  useTranslation as useI18nTranslation,
} from 'react-i18next';

import english from '../locales/en-US.json';
import french from '../locales/fr-FR.json';
import { Locale } from './constants';

export type TranslationKey = keyof typeof french | keyof typeof english;

/**
 * Setup the internationalization.
 * @param userLocale  - The user locale.
 */
function setupIntl(userLocale: string | null): void {
  i18next.use(initReactI18next).init({
    lng: userLocale || Locale.FRENCH,
    returnNull: false,
    resources: {
      [Locale.FRENCH]: { translation: french },
      [Locale.ENGLISH]: { translation: english },
    },
    interpolation: { escapeValue: false },
  });
}

function t(
  key: TranslationKey,
  interpolations: Record<string, unknown> = {}
): string {
  return i18nTranslate(key, interpolations);
}

function useTranslation() {
  const { t, ...i18nTranslation } = useI18nTranslation();

  const translate = (
    key: TranslationKey,
    interpolations: Record<string, unknown> = {}
  ) => {
    return t(key, interpolations);
  };

  return { ...i18nTranslation, t: translate };
}

export { setupIntl, useTranslation, t, Locale };
