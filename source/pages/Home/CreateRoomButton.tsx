import { useContext } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useCreateRoom } from '@/services/room/mutations';

import { CreateRoomModal } from './CreateRoomModal';

interface Props {
  playerName?: string;
}

export function CreateRoomButton({ playerName }: Props): JSX.Element {
  const { t } = useTranslation();
  const { openModal } = useContext(ModalContext);
  const { createRoom } = useCreateRoom();

  const handleCreateRoom = async (): Promise<void> => {
    if (!playerName) {
      openModal(<CreateRoomModal />);
    } else {
      await createRoom.mutateAsync(undefined, {
        onError: () => {
          toast.error(t('home.create.room.error'));
        },
      });
    }
  };

  return (
    <Button color="primary" onClick={handleCreateRoom}>
      {t('home.create.room.button')}
    </Button>
  );
}
