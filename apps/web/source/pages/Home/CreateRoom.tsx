import { useTranslation } from '@killerparty/intl';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { useCreateRoom } from '@/services/room/mutations';

export function CreateRoom(): JSX.Element {
  const { createRoom } = useCreateRoom();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateRoom = async (): Promise<void> => {
    const { id } = await createRoom.mutateAsync();

    navigate(`/room/${id}/pending`);
  };

  return (
    <FullScreenModal
      title="Choisir un mode de jeu"
      onClose={() => navigate('/')}
      hideBackButton={false}
    >
      <Button color="primary" onClick={handleCreateRoom}>
        {t('home.create.room.confirm.button')}
      </Button>
    </FullScreenModal>
  );
}
