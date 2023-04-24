import { useTranslation } from '@killerparty/intl';
import { useContext } from 'react';

import Menu from '@/assets/icons/menu.svg';
import { SidebarContext } from '@/context/sidebar';

import styles from './styles/Header.module.css';

function Header(): JSX.Element {
  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
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
    </div>
  );
}

export default Header;
