import { Fragment, useContext, useState } from 'react';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';

import { CreateRoomModal } from './CreateRoomModal';
import { createRoom } from './services/requests';

export const CreateRoomButton = (): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);
  const { openModal } = useContext(ModalContext);

  const [roomErrorMessage, setRoomErrorMessage] = useState('');

  const handleCreateRoom = async (): Promise<void> => {
    if (!playerSession.name) {
      return openModal(<CreateRoomModal />);
    }

    return createRoom()
      .then(refreshPlayerSession)
      .catch(() => setRoomErrorMessage(t('home.create_room_error')));
  };

  return (
    <Fragment>
      <Button
        content={t('home.create_room')}
        buttonColor="bg-red-400"
        onClick={handleCreateRoom}
      />
      {roomErrorMessage && (
        <ErrorMessage
          message={roomErrorMessage}
          closeMessage={() => setRoomErrorMessage('')}
        />
      )}
    </Fragment>
  );
};
