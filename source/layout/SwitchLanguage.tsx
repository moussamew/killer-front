import { useContext } from 'react';
import tw from 'twin.macro';

import { DropdownList } from '@/components/DropdownList';
import { languageToLocale, localeToLanguage } from '@/constants/languages';
import { LocaleContext } from '@/context/locale';
import { useTranslation } from '@/hooks/useTranslation';

const Action = tw.div`
  flex flex-col justify-between
  cursor-pointer
`;

const Text = tw.p`
  font-medium
`;

export function SwitchLanguage(): JSX.Element {
  const { t } = useTranslation();
  const { locale, updateLocale } = useContext(LocaleContext);

  const handleUpdateLocale = (language: string): void => {
    updateLocale(languageToLocale[language]);
  };

  return (
    <Action>
      <Text>{t('layout.user.language.switch')}</Text>
      <DropdownList
        currentItem={localeToLanguage[locale]}
        itemList={Object.values(localeToLanguage)}
        actionOnClick={handleUpdateLocale}
      />
    </Action>
  );
}
