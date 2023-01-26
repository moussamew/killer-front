import { ChangeEvent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useDeleteRoom } from '@/services/room/mutations';

const Title = tw.h2`
  mb-0
`;

export function RoomSettingsModal(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
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
      <Title>{t('room.settings')}</Title>
      <Input
        id="deleteRoom"
        label={t('room.delete.current.room')}
        value={inputRoomCode}
        onChange={handleInputRoomCode}
        placeholder={t('room.delete.current.room.placeholder')}
        uppercase
      />
      <Button
        content={t('room.delete.current.room.confirm.button')}
        disabled={inputRoomCode !== roomCode}
        onClick={handleDeleteRoom}
      />
    </div>
  );
}
