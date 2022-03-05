import { Fragment, RefObject, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Button } from '../../components';
import t from '../../helpers/translate';
import { PlayerContext } from '../../hooks/context';
import { Player, Room } from '../../types';

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

  const { refetch: queryCreatePlayer } = useQuery<Player, Error>(
    'createPlayer',
    () => createPlayer(inputPseudo),
    {
      enabled: false,
    },
  );

  const { refetch: queryCreateRoom } = useQuery<Room, Error>(
    'createRoom',
    createRoom,
    {
      enabled: false,
    },
  );

  const showErrorMessage = (message: string): void => {
    setErrorMessage(message);
    inputPseudoRef.current?.focus();
  };

  const handleRoomCreation = async (): Promise<void> => {
    if (!playerSession.name) {
      const { error: errorPlayer } = await queryCreatePlayer();

      if (errorPlayer) {
        return showErrorMessage(errorPlayer.message);
      }
    }

    const { error: errorRoom, data: newRoom } = await queryCreateRoom();

    if (errorRoom || !newRoom) {
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
