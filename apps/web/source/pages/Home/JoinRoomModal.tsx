import { useTranslation } from '@killerparty/intl';
import { type ChangeEvent, useContext, useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { getRandomAvatar } from '@/constants/avatars';
import { ModalContext } from '@/context/modal';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

export function JoinRoomModal(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const { t } = useTranslation();
  const { closeModal } = useContext(ModalContext);
  const { session } = useSession();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const handleRoomCode = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setRoomCode(target.value.toUpperCase());
  };

  const handleJoinRoom = async (): Promise<void> => {
    if (session) {
      await updatePlayer.mutateAsync({ id: session?.id, room: roomCode });

      return closeModal();
    }

    const { id } = await createPlayer.mutateAsync({
      name: pseudo,
      avatar: getRandomAvatar(),
    });

    await updatePlayer.mutateAsync({ id, room: roomCode });

    return closeModal();
  };

  return (
    <>
      <h2>{t('home.join.room')}</h2>
      {!session?.name && (
        <Input
          id="pseudo"
          type="text"
          label={t('home.create.pseudo.label')}
          placeholder={t('home.create.pseudo.placeholder')}
          value={pseudo}
          onChange={handlePseudo}
        />
      )}
      <Input
        id="joinRoom"
        label={t('home.join.room.code.label')}
        placeholder={t('home.join.room.code.placeholder')}
        value={roomCode}
        onChange={handleRoomCode}
        uppercase
      />
      <Button color="secondary" disabled={!roomCode} onClick={handleJoinRoom}>
        {t('home.join.room.confirm.button')}
      </Button>
    </>
  );
}
