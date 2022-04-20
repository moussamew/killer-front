import { useContext } from 'react';

import { Button } from '@/components';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';
import JoinRoomModal from '@/layout/modals/JoinRoomModal';

import { createPlayer } from './services/requests';

interface Props {
  inputPseudo: string;
  showInputErrorMessage: (errorMessage: string) => void;
}

const JoinRoom = ({
  inputPseudo,
  showInputErrorMessage,
}: Props): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);
  const { openModal } = useContext(ModalContext);

  const handleJoinRoom = (): Promise<void> | void => {
    if (!playerSession.name) {
      return createPlayer(inputPseudo)
        .then(refreshPlayerSession)
        .then(() => openModal(<JoinRoomModal />))
        .catch((error) => showInputErrorMessage(error.message));
    }

    return openModal(<JoinRoomModal />);
  };

  return (
    <Button
      buttonColor="bg-yellow-200"
      textColor="text-lightDark"
      onClick={handleJoinRoom}
    >
      {t('home.join_room')}
    </Button>
  );
};

export default JoinRoom;
