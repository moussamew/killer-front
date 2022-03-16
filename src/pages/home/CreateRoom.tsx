import { Fragment, RefObject, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Button } from 'components';
import t from 'helpers/translate';
import { PlayerContext } from 'hooks/context';

import { createPlayer, createRoom } from './services/requests';

interface Props {
  inputPseudo: string;
  inputPseudoRef: RefObject<HTMLInputElement>;
}

const ErrorMessage = tw.p`
  normal-case bg-red-200 text-red-500 
  p-1 my-1 rounded-md text-2xl font-bold
`;

const CreateRoom = ({ inputPseudo, inputPseudoRef }: Props): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const showErrorMessage = (message: string): void => {
    setErrorMessage(message);
    inputPseudoRef.current?.focus();
  };

  const handleRoomCreation = (): Promise<void> =>
    createRoom()
      .then(async (newRoom) => {
        await refreshPlayerSession();
        navigate(`/room/${newRoom.code}`);
      })
      .catch(() => showErrorMessage(t('home.create_room_error')));

  const createNewRoom = async (): Promise<void> => {
    if (!playerSession.name) {
      return createPlayer(inputPseudo)
        .then(handleRoomCreation)
        .catch((error) => showErrorMessage(error.message));
    }

    return handleRoomCreation();
  };

  return (
    <Fragment>
      <Button buttonColor="bg-red-400" onClick={createNewRoom}>
        {t('home.create_room')}
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Fragment>
  );
};

export default CreateRoom;
