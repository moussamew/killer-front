import english from '@/locales/en-US.json';
import french from '@/locales/fr-FR.json';

import { Locale } from './enums';

export const translations = {
  [Locale.FRENCH]: french,
  [Locale.ENGLISH]: english,
};

export const languageToLocale: Record<string, Locale> = {
  '🇫🇷 Français': Locale.FRENCH,
  '🇬🇧 English': Locale.ENGLISH,
};

export const localeToLanguage: Record<Locale, string> = {
  [Locale.FRENCH]: '🇫🇷 Français',
  [Locale.ENGLISH]: '🇬🇧 English',
};
