import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useUpdatePlayer } from '@/services/player/mutations';

interface Props {
  playerName: string;
  playerId: number;
}

export function KickPlayerModal({ playerName, playerId }: Props): JSX.Element {
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { closeModal } = useContext(ModalContext);

  const handleKickPlayer = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: playerId, room: null },
      { onSuccess: closeModal },
    );
  };

  return (
    <>
      <h2>{t('room.kick.players.title')}</h2>
      <p>{t('room.kick.players.warning', { playerName })}</p>
      <Button color="primary" onClick={handleKickPlayer}>
        {t('room.kick.players.confirm.button', { playerName })}
      </Button>
    </>
  );
}
