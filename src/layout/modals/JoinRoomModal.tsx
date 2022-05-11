import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Room from '@/assets/icons/room.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Message } from '@/components/Message';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';
import { updatePlayer } from '@/layout/services/requests';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0 ml-0.5
`;

const Icon = tw.img`
  h-3 md:h-4
`;

const JoinRoomModal = (): JSX.Element | null => {
  const { refreshPlayerSession } = useContext(PlayerContext);
  const { closeModal } = useContext(ModalContext);
  const [roomCode, setRoomCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleJoinRoom = (): Promise<void> =>
    updatePlayer({ roomCode })
      .then(refreshPlayerSession)
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));

  return (
    <Fragment>
      <HeadContent>
        <Icon alt="roomIcon" src={Room} />
        <Title>{t('modals.joinRoom.title')}</Title>
      </HeadContent>
      <Input
        id="joinRoom"
        placeholder={t('modals.joinRoom.placeholder')}
        value={roomCode}
        onChange={({ target }) => setRoomCode(target.value.toUpperCase())}
        uppercase
      />
      {errorMessage && (
        <Message
          errorMessage={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
      <Button
        content={t('modals.joinRoom.button')}
        disabled={!roomCode}
        onClick={handleJoinRoom}
      />
    </Fragment>
  );
};

export default JoinRoomModal;
