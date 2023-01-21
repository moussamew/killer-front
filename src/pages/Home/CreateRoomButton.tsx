import { useContext } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/Button';
import { errorStyle } from '@/constants/styles';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { useCreateRoom } from '@/services/room/mutations';

import { CreateRoomModal } from './CreateRoomModal';

interface Props {
  playerName?: string;
}

export function CreateRoomButton({ playerName }: Props): JSX.Element {
  const { openModal } = useContext(ModalContext);
  const { createRoom } = useCreateRoom();

  const handleCreateRoom = async (): Promise<void> => {
    if (!playerName) {
      openModal(<CreateRoomModal />);
    } else {
      await createRoom.mutateAsync(undefined, {
        onError: () => {
          toast.error(t('home.create_room_error'), errorStyle);
        },
      });
    }
  };

  return (
    <Button
      content={t('home.create_room')}
      buttonColor="red"
      onClick={handleCreateRoom}
    />
  );
}
