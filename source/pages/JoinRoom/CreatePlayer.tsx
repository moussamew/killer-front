import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';

import commonStyles from '../../assets/styles/common.module.css';

export function CreatePlayer(): JSX.Element {
  const { roomCode } = useParams();
  const [pseudo, setPseudo] = useState('');
  const { t } = useTranslation();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();
  const navigate = useNavigate();

  const handleJoinRoom = async (): Promise<void> => {
    await createPlayer.mutateAsync(pseudo.toUpperCase(), {
      onSuccess: ({ id }) =>
        updatePlayer.mutateAsync(
          { id, room: roomCode },
          { onSuccess: () => navigate(`/room/${roomCode}`) },
        ),
    });
  };

  return (
    <>
      <h1>{t('join.room.no.pseudo')}</h1>
      <p>{t('join.room.create.pseudo')}</p>
      <Input
        id="setPseudo"
        placeholder={t('home.create.pseudo.placeholder')}
        value={pseudo}
        onChange={({ target }) => setPseudo(target.value)}
      />
      <div className={commonStyles.actions}>
        <Button color="primary" onClick={handleJoinRoom}>
          {t('home.join.room.confirm.button')}
        </Button>
        <Button color="secondary" onClick={() => navigate('/')}>
          {t('home.create.room.confirm.button')}
        </Button>
      </div>
    </>
  );
}
