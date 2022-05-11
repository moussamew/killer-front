import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import { PlayerContext } from '@/hooks/context/player';
import { Layout } from '@/layout/Layout';
import { updatePlayer } from '@/layout/services/requests';

import { CreatePlayer } from './CreatePlayer';
import { LeaveCurrentRoom } from './LeaveCurrentRoom';

const Content = tw.div`
  max-w-screen-lg m-auto
  inset-0 px-2
`;

const WelcomeImage = tw.img`
  m-auto
`;

export const JoinRoomPage = (): JSX.Element => {
  const { roomCode } = useParams();

  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);

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
        .then(() => navigate(`/room/${roomCode}`));
    }
  }, [playerSession, roomCode, refreshPlayerSession, navigate]);

  return (
    <Layout hideSettings>
      <Content>
        <WelcomeImage alt="welcome" src={Killerparty} />
        {!playerSession?.name && (
          <CreatePlayer
            roomCode={roomCode}
            refreshPlayerSession={refreshPlayerSession}
          />
        )}
        {playerSession?.roomCode && (
          <LeaveCurrentRoom
            playerRoomCode={playerSession?.roomCode}
            refreshPlayerSession={refreshPlayerSession}
          />
        )}
      </Content>
    </Layout>
  );
};
