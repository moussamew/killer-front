import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { PlayerStatus } from '@/services/player/constants';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

export function PlayerKilledModal(): JSX.Element {
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { closeModal } = useContext(ModalContext);
  const { session } = useSession();

  const handleKillPlayer = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: session?.id, status: PlayerStatus.KILLED },
      { onSuccess: closeModal },
    );
  };

  return (
    <>
      <h2>{t('room.player.killed.modal.title')}</h2>
      <p>{t('room.player.killed.modal.warning')}</p>
      <Button color="primary" onClick={handleKillPlayer}>
        {t('room.player.killed.modal.confirm.button')}
      </Button>
    </>
  );
}
