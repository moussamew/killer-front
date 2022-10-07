import { useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';

import { deleteRoom } from './services/requests';

const Title = tw.h2`
  mb-0
`;

export const RoomSettingsModal = (): JSX.Element => {
  const { roomCode } = useParams();
  const [inputRoomCode, setInputRoomCode] = useState('');

  const handleDeleteRoom = async (): Promise<void> => deleteRoom(inputRoomCode);

  return (
    <div>
      <Title>{t('room.room_settings')}</Title>
      <Input
        id="deleteRoom"
        label={t('room.delete_current_room')}
        value={inputRoomCode}
        onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
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
};
