import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useUpdatePlayer } from '@/services/player/mutations';
import { type Session } from '@/services/player/types';

import commonStyles from '../../assets/styles/common.module.css';

interface Props {
  session: Session | undefined;
}

export function UpdatePlayerPseudo({ session }: Props): JSX.Element {
  const { roomCode } = useParams();
  const [pseudo, setPseudo] = useState('');
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const navigate = useNavigate();

  const handleJoinRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: session?.id, room: roomCode, name: pseudo },
      { onSuccess: () => navigate(`/room/${roomCode}`) },
    );
  };

  return (
    <>
      <h1>{t('join.room.pseudo.already.used')}</h1>
      <p>{t('join.room.create.another.pseudo')}</p>
      <Input
        id="setPseudo"
        placeholder={t('join.room.create.new.pseudo.placeholder')}
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
