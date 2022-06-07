import { useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';

import { deleteRoom } from './services/requests';

const Title = tw.h2`
  mb-0
`;

export const RoomSettingsModal = (): JSX.Element => {
  const [roomCode, setRoomCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { closeModal } = useContext(ModalContext);

  const handleDeleteRoom = (): Promise<void> =>
    deleteRoom(roomCode)
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));

  return (
    <div>
      <Title>{t('room.room_settings')}</Title>
      <Input
        id="deleteRoom"
        label={t('room.delete_current_room')}
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        placeholder={t('room.delete_room_placeholder')}
        uppercase
      />
      <Button
        content={t('room.delete_the_room')}
        disabled={!roomCode}
        onClick={handleDeleteRoom}
      />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </div>
  );
};
