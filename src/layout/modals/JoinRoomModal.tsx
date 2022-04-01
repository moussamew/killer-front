import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Room from 'assets/icons/room.svg';
import { Button, Input } from 'components';
import t from 'helpers/translate';
import { ModalContext } from 'hooks/context/modal';
import { PlayerContext } from 'hooks/context/player';
import { createPlayer } from 'pages/home/services/requests';

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
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);
  const { closeModal } = useContext(ModalContext);
  const [roomCode, setRoomCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleJoinRoom = (): Promise<void> =>
    createPlayer(playerSession.name, roomCode)
      .then(refreshPlayerSession)
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));

  return (
    <Fragment>
      <HeadContent>
        <Icon alt="roomIcon" src={Room} />
        <Title>{t('join.modal_title')}</Title>
      </HeadContent>
      <Input
        id="joinRoom"
        placeholder={t('join.modal_placeholder')}
        value={roomCode}
        onChange={({ target }): void => setRoomCode(target.value)}
        errorMessage={errorMessage}
      />
      <Button disabled={!roomCode} onClick={handleJoinRoom}>
        {t('join.room')}
      </Button>
    </Fragment>
  );
};

export default JoinRoomModal;
