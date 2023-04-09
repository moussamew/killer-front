import clsx from 'clsx';
import { t } from 'i18next';
import { type Dispatch, type SetStateAction } from 'react';

import Close from '@/assets/icons/close.svg';

import styles from './styles/Sidebar.module.css';
import { SwitchLanguage } from './SwitchLanguage';
import { UpdatePseudo } from './UpdatePseudo';

interface Props {
  playerName: string | undefined;
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({
  playerName,
  isSidebarOpen,
  setSidebarOpen,
}: Props): JSX.Element {
  return (
    <section
      className={clsx(styles.sidebar, {
        [styles.sidebarOpen]: isSidebarOpen,
      })}
    >
      {isSidebarOpen && (
        <>
          <div className={styles.sidebarHeader}>
            <h2>{t('layout.user.settings.title')}</h2>
            <Close
              title={t('tooltip.user.settings')}
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          {playerName && <UpdatePseudo />}
          <SwitchLanguage />
        </>
      )}
    </section>
  );
}
