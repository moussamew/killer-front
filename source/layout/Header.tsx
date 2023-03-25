import { useContext } from 'react';

import Settings from '@/assets/icons/settings.svg';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';

import { SettingsModal } from './SettingsModal';
import styles from './styles/Header.module.css';

interface Props {
  playerName?: string;
}

function Header({ playerName }: Props): JSX.Element {
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation();

  const handleOpenSettings = (): void => {
    openModal(<SettingsModal playerName={playerName} />);
  };

  return (
    <header className={styles.header}>
      <p className={styles.text}>Killer Party</p>
      <div className={styles.settings}>
        {playerName && <p className={styles.text}>{playerName}</p>}
        <Settings
          title={t('tooltip.user.settings')}
          onClick={handleOpenSettings}
          className={styles.icon}
        />
      </div>
    </header>
  );
}

export default Header;
