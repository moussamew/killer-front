import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

import FreeForAll from '@/assets/lotties/free-for-all.json';
import GameMaster from '@/assets/lotties/game-master.json';
import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { useCreateRoom } from '@/services/room/mutations';

import styles from './styles/CreateRoom.module.css';

export function CreateRoom(): JSX.Element {
  const { createRoom } = useCreateRoom();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateRoom = async ({
    isGameMastered = false,
  }): Promise<void> => {
    const { id } = await createRoom.mutateAsync({ isGameMastered });

    navigate(`/room/${id}/pending`);
  };

  return (
    <FullScreenModal
      title={t('home.create.room.choose.mode')}
      onClose={() => navigate('/')}
      hideBackButton={false}
    >
      <div className={styles.content}>
        <div className={styles.mode}>
          <div className={styles.description}>
            <h1>{t('create.room.game.master.mode.title')}</h1>
            <p>{t('create.room.game.master.mode.description')}</p>
            <Button
              color="primary"
              onClick={() => handleCreateRoom({ isGameMastered: true })}
            >
              {t('create.room.game.master.mode.confirm.button')}
            </Button>
          </div>
          <Lottie className={styles.lottie} animationData={GameMaster} />
        </div>
        <div className={styles.freeForAllMode}>
          <Lottie className={styles.lottie} animationData={FreeForAll} />
          <div className={styles.description}>
            <h1>{t('create.room.free.for.all.mode.title')}</h1>
            <p>{t('create.room.free.for.all.mode.description')}</p>
            <Button
              color="secondary"
              onClick={() => handleCreateRoom({ isGameMastered: false })}
            >
              {t('create.room.free.for.all.mode.confirm.button')}
            </Button>
          </div>
        </div>
      </div>
    </FullScreenModal>
  );
}
