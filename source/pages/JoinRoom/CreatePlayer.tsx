import { type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useTranslation } from '@/hooks/useTranslation';
import { useCreatePlayer } from '@/services/player/mutations';

export function CreatePlayer(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { t } = useTranslation();
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
    <>
      <h1>{t('join.room.no.pseudo')}</h1>
      <p>{t('join.room.create.pseudo')}</p>
      <Input
        id="setPseudo"
        placeholder={t('home.create.pseudo.placeholder')}
        value={pseudo}
        onChange={handlePseudo}
      />
      <Button
        content={t('home.join.room.confirm.button')}
        onClick={handleJoinRoom}
      />
      <Button
        content={t('home.create.room.confirm.button')}
        onClick={handleCreateRoom}
        buttonColor="yellow"
        textColor="lightDark"
      />
    </>
  );
}
