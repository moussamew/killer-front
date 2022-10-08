import { Fragment, useState } from 'react';
import tw from 'tailwind-styled-components';

import Room from '@/assets/icons/room.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { usePlayerSession } from '@/services/player/queries';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0 ml-0.5
`;

const Icon = tw.img`
  h-3 md:h-4
`;

export function JoinRoomModal(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const { playerSession } = usePlayerSession();
  const { updatePlayerMutation } = useUpdatePlayer();
  const { createPlayerMutation } = useCreatePlayer();

  const handleJoinRoom = (): void => {
    if (!playerSession?.name) {
      return createPlayerMutation.mutate({ name: pseudo, roomCode });
    }

    return updatePlayerMutation.mutate({ roomCode });
  };

  return (
    <Fragment>
      <HeadContent>
        <Icon alt="roomIcon" src={Room} />
        <Title>{t('home.join_room')}</Title>
      </HeadContent>
      {!playerSession?.name && (
        <Input
          id="pseudo"
          type="text"
          label={t('common.create_pseudo_label')}
          placeholder={t('common.create_pseudo_placeholder')}
          value={pseudo}
          onChange={({ target }) => setPseudo(target.value.toUpperCase())}
          uppercase
        />
      )}
      <Input
        id="joinRoom"
        label={t('home.room_code_label')}
        placeholder={t('home.room_code_placeholder')}
        value={roomCode}
        onChange={({ target }) => setRoomCode(target.value.toUpperCase())}
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
