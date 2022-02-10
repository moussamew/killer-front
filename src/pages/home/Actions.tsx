import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Button } from '../../components';
import t from '../../helpers/translate';
import { PlayerContext } from '../../hooks/context';

import { createPlayer, createRoom } from './requests';

const Content = tw.div`
  mt-1
`;

interface Props {
  inputPseudo: string;
  setErrorMessage: (errorMessage: string) => void;
}

const Actions = ({ inputPseudo, setErrorMessage }: Props): JSX.Element => {
  const { playerSession, setPlayerSession } = useContext(PlayerContext);

  const navigate = useNavigate();

  const handleRoomCreation = async (): Promise<void> => {
    if (!playerSession?.name) {
      const player = await createPlayer(inputPseudo);

      if (player.message) {
        setErrorMessage(player.message[0]);
      }

      if (!player.error) {
        setPlayerSession(player);
      }
    }

    const { code, error } = await createRoom();

    if (error) {
      setErrorMessage(t('home.create_room_error'));
    }

    if (code) {
      navigate(`/room/${code}`);
    }
  };

  return (
    <Content>
      <Button buttonColor="bg-red-400" onClick={handleRoomCreation}>
        {t('home.create_room')}
      </Button>
      <Button disabled buttonColor="bg-yellow-200" textColor="text-lightDark">
        {t('home.join_room')}
      </Button>
    </Content>
  );
};

export default Actions;
