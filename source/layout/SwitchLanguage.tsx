import { useTranslation } from 'react-i18next';

import { Dropdown } from '@/components/Dropdown';
import { languageToLocale, localeToLanguage } from '@/constants/languages';

import styles from './styles/SwitchLanguage.module.css';

export function SwitchLanguage(): JSX.Element {
  const { t, i18n } = useTranslation();

  const handleUpdateLanguage = (language: string): void => {
    i18n.changeLanguage(languageToLocale[language]);
    localStorage.setItem('locale', languageToLocale[language]);
  };

  return (
    <div className={styles.content}>
      <p>{t('layout.user.language.switch')}</p>
      <Dropdown
        items={Object.values(localeToLanguage)}
        onClick={handleUpdateLanguage}
        activeItem={localeToLanguage[i18n.language]}
      />
    </div>
  );
}
