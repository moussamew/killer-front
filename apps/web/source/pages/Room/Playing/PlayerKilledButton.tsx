import { useTranslation } from '@killerparty/intl';
import { useContext } from 'react';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';

import { PlayerKilledModal } from './PlayerKilledModal';
import styles from './styles/PlayerKilledButton.module.css';

export function PlayerKilledButton(): JSX.Element {
  const { t } = useTranslation();
  const { openModal } = useContext(ModalContext);

  const handleOpenModal = (): void => {
    openModal(<PlayerKilledModal />);
  };

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <h2 className={styles.title}>{t('room.killed.message')}</h2>
        <p>{t('room.killed.notify')}</p>
      </div>
      <Button color="secondary" onClick={handleOpenModal}>
        {t('room.killed.button')}
      </Button>
    </div>
  );
}
