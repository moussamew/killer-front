import { ChangeEvent, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Room from '@/assets/icons/room.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { useCreatePlayer } from '@/services/player/mutations';
import { useCreateRoom } from '@/services/room/mutations';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0 ml-0.5
`;

const Icon = tw.img`
  h-3 md:h-4
`;

export function CreateRoomModal(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { createPlayer } = useCreatePlayer();
  const { createRoom } = useCreateRoom();
  const { closeModal } = useContext(ModalContext);

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const handleCreateRoom = (): void => {
    createPlayer.mutate(
      { name: pseudo },
      {
        onSuccess: () =>
          createRoom.mutate(undefined, { onSuccess: closeModal }),
      },
    );
  };

  return (
    <div>
      <HeadContent>
        <Icon alt="roomIcon" src={Room} />
        <Title>{t('home.create_room')}</Title>
      </HeadContent>
      <Input
        id="pseudo"
        type="text"
        label={t('common.create_pseudo_label')}
        placeholder={t('common.create_pseudo_placeholder')}
        value={pseudo}
        onChange={handlePseudo}
        uppercase
      />
      <Button
        content={t('home.create_room_modal_button')}
        disabled={!pseudo}
        onClick={handleCreateRoom}
      />
    </div>
  );
}
