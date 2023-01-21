import translations from '@/translations/en.json';

type Translations = typeof translations;

/**
 * Utility function that translates the application text.
 *
 * @param translationKey - The name of the translation key.
 * @param interpolations - Dynamic texts replaced by their placeholder inside the translations.
 * @returns The translated text, or the translation key, if the text cannot be found.
 */
function translate<
  A extends keyof Translations,
  B extends Exclude<keyof Translations[A], symbol>,
>(
  translationKey: `${A}.${B}`,
  interpolations?: Record<string, unknown>,
): Translations[A][B];
function translate<A extends keyof Translations>(
  translationKey: A,
  interpolations?: Record<string, unknown>,
): Translations[A];
function translate(
  translationKey: string,
  interpolations?: Record<string, unknown>,
): string {
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
}

export { translate as t };
