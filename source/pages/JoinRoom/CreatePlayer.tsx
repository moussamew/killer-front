import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { useCreatePlayer } from '@/services/player/mutations';

interface Props {
  roomCode: string;
}

export function CreatePlayer({ roomCode }: Props): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { createPlayer } = useCreatePlayer();
  const navigate = useNavigate();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const handleJoinRoom = async (): Promise<void> => {
    await createPlayer.mutateAsync(pseudo.toUpperCase());
  };

  const handleCreateRoom = (): void => {
    navigate('/');
  };

  return (
    <div>
      <h1>{t('join_room.no_pseudo')}</h1>
      <p>{t('join_room.create_pseudo')}</p>
      <Input
        id="setPseudo"
        placeholder={t('common.create_pseudo_placeholder')}
        value={pseudo}
        onChange={handlePseudo}
      />
      <Button
        content={t('join_room.join_the_room', { roomCode })}
        onClick={handleJoinRoom}
      />
      <Button
        content={t('join_room.create_room')}
        onClick={handleCreateRoom}
        buttonColor="yellow"
        textColor="lightDark"
      />
    </div>
  );
}
