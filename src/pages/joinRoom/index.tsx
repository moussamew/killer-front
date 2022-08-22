import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import { RoomError } from '@/constants/errors';
import { PlayerContext } from '@/hooks/context/player';
import { Layout } from '@/layout/Layout';
import { updatePlayer } from '@/layout/services/requests';

import { CreatePlayer } from './CreatePlayer';
import { LeaveCurrentRoom } from './LeaveCurrentRoom';

const WelcomeImage = tw.img`
  m-auto
`;

const { NOT_FOUND, BAD_ROOMCODE } = RoomError;

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
     * Let the user join automatically the room if his name is already setted
     * and he is not already inside a room.
     *
     * Show not found page if:
     * - The room cannot be found.
     * - The name of the room is incorrect.
     */
    if (playerSession?.name && !playerSession?.roomCode) {
      updatePlayer({ roomCode })
        .then(refreshPlayerSession)
        .then(() => navigate(`/room/${roomCode}`))
        .catch((error) => {
          if ([NOT_FOUND, BAD_ROOMCODE].includes(error.errorCode)) {
            navigate(`/room/${roomCode}/error`, {
              state: error.message,
            });
          }
        });
    }
  }, [playerSession, roomCode, refreshPlayerSession, navigate]);

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      {!playerSession?.name && <CreatePlayer roomCode={roomCode!} />}
      {playerSession?.roomCode && <LeaveCurrentRoom />}
    </Layout>
  );
};
