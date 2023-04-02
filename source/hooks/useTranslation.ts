import { type PrimitiveType, useIntl } from 'react-intl';

import { type translations } from '@/constants/languages';

export type TranslationKey =
  keyof (typeof translations)[keyof typeof translations];

interface UseTranslation {
  t: (
    key: TranslationKey,
    interpolations?: Record<string, PrimitiveType>,
  ) => string;
}

// TODO: Use this hook as a wrapper for useTranslation from i18next
function useTranslation(): UseTranslation {
  const { formatMessage } = useIntl();

  const t = (
    key: TranslationKey,
    interpolations?: Record<string, PrimitiveType>,
  ): string => {
    return formatMessage({ id: key }, interpolations);
  };

  return { t };
}
