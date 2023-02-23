import { useContext } from 'react';

import { Dropdown } from '@/components/Dropdown';
import { languageToLocale, localeToLanguage } from '@/constants/languages';
import { LocaleContext } from '@/context/locale';
import { useTranslation } from '@/hooks/useTranslation';

import styles from './styles/SwitchLanguage.module.css';

export function SwitchLanguage(): JSX.Element {
  const { t } = useTranslation();
  const { locale, updateLocale } = useContext(LocaleContext);

  const handleUpdateLocale = (language: string): void => {
    updateLocale(languageToLocale[language]);
  };

  return (
    <div className={styles.content}>
      <p>{t('layout.user.language.switch')}</p>
      <Dropdown
        items={Object.values(localeToLanguage)}
        onClick={handleUpdateLocale}
        activeItem={localeToLanguage[locale]}
      />
    </div>
  );
}
