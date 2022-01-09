import wordings from './en.json';

/**
 * Utility function that translates the application text.
 *
 * @param translationKey - The name of the translation key.
 * @returns The translated text, or the translation key, if the text cannot be found.
 */
const t = (translationKey: string): string => {
  const translations = translationKey.split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let phrase = wordings as any;

  for (let i = 0; i < translations.length; i += 1) {
    phrase = phrase[translations[i]];
  }

  return phrase || translationKey;
};

export { t };
