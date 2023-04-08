import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from '@/assets/icons/menu.svg';
import { SidebarContext } from '@/context/sidebar';

import styles from './styles/Header.module.css';

function Header(): JSX.Element {
  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <p className={styles.text}>Killer Party</p>
      <div className={styles.settings}>
        {!isSidebarOpen && (
          <Menu
            title={t('tooltip.user.settings')}
            onClick={() => setSidebarOpen(true)}
            className={styles.icon}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
