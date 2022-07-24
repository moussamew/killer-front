import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import { PlayerContext } from '@/hooks/context/player';
import { Layout } from '@/layout/Layout';
import { updatePlayer } from '@/layout/services/requests';

import { NotFoundPage } from '../notFound';

import { CreatePlayer } from './CreatePlayer';
import { LeaveCurrentRoom } from './LeaveCurrentRoom';

const WelcomeImage = tw.img`
  m-auto
`;

export const JoinRoomPage = (): JSX.Element => {
  const { roomCode } = useParams();

  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Let the user join automatically the room if:
     * He is already inside the same room that he want to join.
     */
    if (playerSession?.roomCode === roomCode) {
      navigate(`/room/${roomCode}`);
    }

    /**
     * Let the user join automatically the room if:
     * His name is already setted and he is not already inside a room.
     */
    if (playerSession?.name && !playerSession?.roomCode) {
      updatePlayer({ roomCode })
        .then(refreshPlayerSession)
        .then(() => navigate(`/room/${roomCode}`))
        .catch((error) => setErrorMessage(error.message));
    }
  }, [playerSession, roomCode, refreshPlayerSession, navigate]);

  /**
   * Show not found page if there is an error while trying to join the room.
   */
  if (errorMessage) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      {!playerSession?.name && (
        <CreatePlayer
          roomCode={roomCode!}
          refreshPlayerSession={refreshPlayerSession}
        />
      )}
      {playerSession?.roomCode && (
        <LeaveCurrentRoom
          playerRoomCode={playerSession?.roomCode}
          refreshPlayerSession={refreshPlayerSession}
        />
      )}
    </Layout>
  );
};
