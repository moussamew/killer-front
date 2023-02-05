import { type ChangeEvent, useContext, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useCreatePlayer } from '@/services/player/mutations';
import { useCreateRoom } from '@/services/room/mutations';

import styles from './styles/CreateRoomModal.module.css';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0
`;

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
      <HeadContent>
        <Title>{t('home.create.room.button')}</Title>
      </HeadContent>
      <Input
        id="pseudo"
        type="text"
        label={t('home.create.pseudo.label')}
        placeholder={t('home.create.pseudo.placeholder')}
        value={pseudo}
        onChange={handlePseudo}
      />
      <Button
        color="primary"
        disabled={!pseudo}
        onClick={handleCreateRoom}
        customStyle={styles.button}
      >
        {t('home.create.room.confirm.button')}
      </Button>
    </>
  );
}
