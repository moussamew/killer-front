import { type ChangeEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalContext } from '@/context/modal';
import { useCreatePlayer } from '@/services/player/mutations';
import { useCreateRoom } from '@/services/room/mutations';

export function CreateRoomModal(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { t } = useTranslation();
  const { createPlayer } = useCreatePlayer();
  const { createRoom } = useCreateRoom();
  const { closeModal } = useContext(ModalContext);

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const handleCreateRoom = async (): Promise<void> => {
    await createPlayer.mutateAsync(pseudo.toUpperCase(), {
      onSuccess: () => createRoom.mutate(undefined, { onSuccess: closeModal }),
    });
  };

  return (
    <>
      <h2>{t('home.create.room.button')}</h2>
      <Input
        id="pseudo"
        type="text"
        label={t('home.create.pseudo.label')}
        placeholder={t('home.create.pseudo.placeholder')}
        value={pseudo}
        onChange={handlePseudo}
      />
      <Button color="primary" disabled={!pseudo} onClick={handleCreateRoom}>
        {t('home.create.room.confirm.button')}
      </Button>
    </>
  );
}
