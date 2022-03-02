import { Fragment, RefObject, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Button } from '../../components';
import t from '../../helpers/translate';
import { PlayerContext } from '../../hooks/context';

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

  const handleRoomCreation = async (): Promise<void> => {
    if (!playerSession.name) {
      const newPlayer = await createPlayer(inputPseudo);

      if (newPlayer.message) {
        return showErrorMessage(newPlayer.message[0]);
      }
    }

    const newRoom = await createRoom();

    if (newRoom.errorCode) {
      return showErrorMessage(t('home.create_room_error'));
    }

    await refreshPlayerSession();

    return navigate(`/room/${newRoom.code}`);
  };

  return (
    <Fragment>
      <Button buttonColor="bg-red-400" onClick={handleRoomCreation}>
        {t('home.create_room')}
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Fragment>
  );
};

export default CreateRoom;
