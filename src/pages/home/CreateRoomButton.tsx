import { Fragment, useContext } from 'react';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { usePlayerSession } from '@/services/player/queries';
import { useCreateRoom } from '@/services/room/mutations';

import { CreateRoomModal } from './CreateRoomModal';

export function CreateRoomButton(): JSX.Element {
  const { openModal } = useContext(ModalContext);
  const { playerSession } = usePlayerSession();
  const { createRoom } = useCreateRoom();

  const handleCreateRoom = (): void => {
    if (!playerSession?.name) {
      return openModal(<CreateRoomModal />);
    }

    return createRoom.mutate();
  };

  return (
    <Fragment>
      <Button
        content={t('home.create_room')}
        buttonColor="bg-red-400"
        onClick={handleCreateRoom}
      />
      {createRoom.isError && (
        <ErrorMessage
          message={t('home.create_room_error')}
          closeMessage={createRoom.reset}
        />
      )}
    </Fragment>
  );
}
