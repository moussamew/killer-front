import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import english from '../locales/en-US.json';
import french from '../locales/fr-FR.json';
import { Locale } from './constants';

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

export { setupIntl, useTranslation };
