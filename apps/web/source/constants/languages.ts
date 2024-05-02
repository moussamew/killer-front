import { Locale } from '@killerparty/intl';

export const languageToLocale: Record<string, string> = {
  Français: Locale.FRENCH,
  English: Locale.ENGLISH,
};

export const localeToLanguage: Record<string, string> = {
  [Locale.FRENCH]: 'Français',
  [Locale.ENGLISH]: 'English',
};
