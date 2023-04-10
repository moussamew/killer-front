import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
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
      return openModal(<CreateRoomModal />);
    }

    return void createRoom.mutateAsync();
  };

  return (
    <Button color="primary" onClick={handleCreateRoom}>
      {t('home.create.room.button')}
    </Button>
  );
}
