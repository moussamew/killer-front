import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Room from '@/assets/icons/room.svg';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';
import { updatePlayer } from '@/layout/services/requests';

import { createPlayer } from './services/requests';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0 ml-0.5
`;

const Icon = tw.img`
  h-3 md:h-4
`;

export const JoinRoomModal = (): JSX.Element | null => {
  const [inputPseudo, setInputPseudo] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);
  const { closeModal } = useContext(ModalContext);

  const handleJoinRoom = async (): Promise<void> => {
    if (!playerSession.name) {
      return createPlayer({ name: inputPseudo, roomCode })
        .then(refreshPlayerSession)
        .then(closeModal)
        .catch((error) => setErrorMessage(error.message));
    }

    return updatePlayer({ roomCode })
      .then(refreshPlayerSession)
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <Fragment>
      <HeadContent>
        <Icon alt="roomIcon" src={Room} />
        <Title>{t('home.join_room')}</Title>
      </HeadContent>
      {!playerSession.name && (
        <Input
          id="pseudo"
          type="text"
          label={t('common.create_pseudo_label')}
          placeholder={t('common.create_pseudo_placeholder')}
          value={inputPseudo}
          onChange={({ target }) => setInputPseudo(target.value.toUpperCase())}
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
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </Fragment>
  );
};
