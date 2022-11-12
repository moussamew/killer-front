import { ChangeEvent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { useDeleteRoom } from '@/services/room/mutations';

const Title = tw.h2`
  mb-0
`;

export function RoomSettingsModal(): JSX.Element {
  const { roomCode } = useParams();
  const { closeModal } = useContext(ModalContext);
  const [inputRoomCode, setInputRoomCode] = useState('');
  const { deleteRoom } = useDeleteRoom();

  const handleInputRoomCode = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    setInputRoomCode(target.value.toUpperCase());
  };

  const handleDeleteRoom = async (): Promise<void> => {
    await deleteRoom.mutateAsync(inputRoomCode, { onSuccess: closeModal });
  };

  return (
    <div>
      <Title>{t('room.room_settings')}</Title>
      <Input
        id="deleteRoom"
        label={t('room.delete_current_room')}
        value={inputRoomCode}
        onChange={handleInputRoomCode}
        placeholder={t('room.delete_room_placeholder')}
        uppercase
      />
      <Button
        content={t('room.delete_the_room')}
        disabled={inputRoomCode !== roomCode}
        onClick={handleDeleteRoom}
      />
    </div>
  );
}
