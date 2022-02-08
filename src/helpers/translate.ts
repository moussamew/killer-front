import translations from '../translations/en.json';

/**
 * Utility function that translates the application text.
 *
 * @param translationKey - The name of the translation key.
 * @param interpolations - Dynamic texts replaced by their placeholder inside the translations.
 * @returns The translated text, or the translation key, if the text cannot be found.
 */
const t = (
  translationKey: string,
  interpolations?: Record<string, unknown>,
): string => {
  const translationPath = translationKey.split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let phrase = translations as any;

  for (let i = 0; i < translationPath.length; i += 1) {
    phrase = phrase[translationPath[i]];
  }

  if (interpolations) {
    Object.keys(interpolations).forEach((key) => {
      phrase = phrase?.replace(`{${key}}`, interpolations[key]);
    });
  }

  return phrase || translationKey;
};

export default t;
