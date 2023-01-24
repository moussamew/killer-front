import { PrimitiveType, useIntl } from 'react-intl';

import { translations } from '@/constants/languages';

type TranslationKey = keyof (typeof translations)[keyof typeof translations];

export interface UseTranslate {
  t: (
    key: TranslationKey,
    interpolations?: Record<string, PrimitiveType>,
  ) => string;
}

export function useTranslate(): UseTranslate {
  const { formatMessage } = useIntl();

  const t = (
    key: TranslationKey,
    interpolations?: Record<string, PrimitiveType>,
  ): string => {
    return formatMessage({ id: key }, interpolations);
  };

  return { t };
}
