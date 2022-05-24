import { useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
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
      <Title>Room settings</Title>
      <Input
        id="deleteRoom"
        label="Delete current room"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        placeholder="Confirm by typing the room code"
        uppercase
      />
      <Button
        content="Delete the room"
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
