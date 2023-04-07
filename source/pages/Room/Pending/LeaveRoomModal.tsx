import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/LeaveRoomModal.module.css';

export function LeaveRoomModal(): JSX.Element {
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { closeModal } = useContext(ModalContext);

  const handleLeaveRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: session?.id, room: null },
      {
        onSuccess: () => {
          toast.success(t('room.leave.confirmed.message'));
          closeModal();
        },
      },
    );
  };

  return (
    <div className={styles.content}>
      <h2>{t('room.leave.title')}</h2>
      <p>{t('room.leave.warning')}</p>
      <Button color="primary" onClick={handleLeaveRoom}>
        {t('room.leave.confirm.button')}
      </Button>
    </div>
  );
}
