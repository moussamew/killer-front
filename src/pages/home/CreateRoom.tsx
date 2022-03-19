import {
  Dispatch,
  Fragment,
  RefObject,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorMessage } from 'assets/styles/shared';
import { Button } from 'components';
import t from 'helpers/translate';
import { PlayerContext } from 'hooks/context/player';

import { createPlayer, createRoom } from './services/requests';

interface Props {
  inputPseudo: string;
  inputPseudoRef: RefObject<HTMLInputElement>;
  showInputErrorMessage: (errorMessage: string) => void;
}

const CreateRoom = ({
  inputPseudo,
  inputPseudoRef,
  showInputErrorMessage,
}: Props): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);

  const [roomErrorMessage, setRoomErrorMessage] = useState('');

  const navigate = useNavigate();

  const showRoomErrorMessage = (errorMessage: string): void => {
    setRoomErrorMessage(errorMessage);
    inputPseudoRef.current?.focus();
  };

  const createNewRoom = (): Promise<void> =>
    createRoom()
      .then(async (newRoom) => {
        await refreshPlayerSession();
        navigate(`/room/${newRoom.code}`);
      })
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
      <Button buttonColor="bg-red-400" onClick={handleCreateRoom}>
        {t('home.create_room')}
      </Button>
      {roomErrorMessage && <ErrorMessage>{roomErrorMessage}</ErrorMessage>}
    </Fragment>
  );
};

export default CreateRoom;
