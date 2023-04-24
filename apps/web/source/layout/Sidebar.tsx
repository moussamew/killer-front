import { useTranslation } from '@killerparty/intl';
import clsx from 'clsx';
import { type Dispatch, type SetStateAction } from 'react';

import Close from '@/assets/icons/close.svg';
import { type Session } from '@/services/player/types';

import styles from './styles/Sidebar.module.css';
import { SwitchLanguage } from './SwitchLanguage';
import { UpdateAvatar } from './UpdateAvatar';
import { UpdatePseudo } from './UpdatePseudo';

interface Props {
  session: Session | undefined;
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({
  session,
  isSidebarOpen,
  setSidebarOpen,
}: Props): JSX.Element {
  const { t } = useTranslation();

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
          {session?.name && <UpdatePseudo />}
          <SwitchLanguage />
          {session?.avatar && <UpdateAvatar />}
        </>
      )}
    </section>
  );
}
