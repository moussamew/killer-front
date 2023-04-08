import clsx from 'clsx';
import { t } from 'i18next';

import styles from './styles/Sidebar.module.css';
import { SwitchLanguage } from './SwitchLanguage';
import { UpdatePseudo } from './UpdatePseudo';

interface Props {
  playerName: string | undefined;
  isSidebarOpen: boolean;
}

export function Sidebar({ playerName, isSidebarOpen }: Props): JSX.Element {
  return (
    <section
      className={clsx(styles.sidebar, {
        [styles.sidebarOpen]: isSidebarOpen,
      })}
    >
      <h2>{t('layout.user.settings.title')}</h2>
      {playerName && <UpdatePseudo />}
      <SwitchLanguage />
    </section>
  );
}
