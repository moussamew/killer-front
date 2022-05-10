import { Fragment, RefObject, useContext, useState } from 'react';

import { Button } from '@/components/Button';
import { Message } from '@/components/Message';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';

import { createPlayer, createRoom } from './services/requests';

interface Props {
  inputPseudo: string;
  inputPseudoRef: RefObject<HTMLInputElement>;
  showInputErrorMessage: (errorMessage: string) => void;
}

export const CreateRoomButton = ({
  inputPseudo,
  inputPseudoRef,
  showInputErrorMessage,
}: Props): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);

  const [roomErrorMessage, setRoomErrorMessage] = useState('');

  const showRoomErrorMessage = (errorMessage: string): void => {
    setRoomErrorMessage(errorMessage);
    (inputPseudoRef.current as HTMLInputElement).focus();
  };

  const createNewRoom = (): Promise<void> =>
    createRoom()
      .then(refreshPlayerSession)
      .catch(() => showRoomErrorMessage(t('home.create_room_error')));

  const handleCreateRoom = async (): Promise<void> => {
    if (!playerSession.name) {
      return createPlayer(inputPseudo)
        .then(createNewRoom)
        .catch((error) => showInputErrorMessage(error.message));
    }

    return createNewRoom();
  };

  return (
    <Fragment>
      <Button
        content={t('home.create_room')}
        buttonColor="bg-red-400"
        onClick={handleCreateRoom}
      />
      {roomErrorMessage && <Message errorMessage={roomErrorMessage} />}
    </Fragment>
  );
};
