import { useContext } from 'react';

import Knife from '@/assets/images/knife.png';
import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';

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
      <img alt="killed" src={Knife} className={styles.image} />
      <h2>{t('room.killed.message')}</h2>
      <p>{t('room.killed.notify')}</p>
      <Button color="primary" onClick={handleOpenModal}>
        {t('room.killed.button')}
      </Button>
    </div>
  );
}
