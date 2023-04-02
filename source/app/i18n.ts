import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { Locale } from '@/constants/enums';
import english from '@/locales/en-US.json';
import french from '@/locales/fr-FR.json';

i18next.use(initReactI18next).init({
  lng: localStorage.getItem('locale') || Locale.FRENCH,
  returnNull: false,
  resources: {
    [Locale.FRENCH]: {
      translation: french,
    },
    [Locale.ENGLISH]: {
      translation: english,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});
