import { ChangeEvent, Fragment, useContext, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { usePlayerSession } from '@/services/player/queries';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0
`;

export function JoinRoomModal(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const { closeModal } = useContext(ModalContext);
  const { player } = usePlayerSession();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const handleRoomCode = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setRoomCode(target.value.toUpperCase());
  };

  const handleJoinRoom = async (): Promise<void> => {
    if (!player) {
      await createPlayer.mutateAsync(pseudo.toUpperCase(), {
        onSuccess: ({ id }) =>
          updatePlayer.mutateAsync(
            { id, room: roomCode },
            { onSuccess: closeModal },
          ),
      });
    } else {
      updatePlayer.mutateAsync(
        { id: player?.id, room: roomCode },
        { onSuccess: closeModal },
      );
    }
  };

  return (
    <Fragment>
      <HeadContent>
        <Title>{t('home.join_room')}</Title>
      </HeadContent>
      {!player?.name && (
        <Input
          id="pseudo"
          type="text"
          label={t('common.create_pseudo_label')}
          placeholder={t('common.create_pseudo_placeholder')}
          value={pseudo}
          onChange={handlePseudo}
        />
      )}
      <Input
        id="joinRoom"
        label={t('home.room_code_label')}
        placeholder={t('home.room_code_placeholder')}
        value={roomCode}
        onChange={handleRoomCode}
        uppercase
      />
      <Button
        content={t('home.join_room_modal_button')}
        disabled={!roomCode}
        onClick={handleJoinRoom}
      />
    </Fragment>
  );
}
