import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import { Layout } from '@/layout/Layout';
import { useUpdatePlayer } from '@/services/player/mutations';
import { usePlayerSession } from '@/services/player/queries';

import { CreatePlayer } from './CreatePlayer';
import { LeaveCurrentRoom } from './LeaveCurrentRoom';

const WelcomeImage = tw.img`
  m-auto
`;

export function JoinRoomPage(): JSX.Element {
  const { roomCode } = useParams();

  const { playerSession } = usePlayerSession();
  const { updatePlayer } = useUpdatePlayer();

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
      updatePlayer.mutate(
        { roomCode },
        {
          onSuccess: () => navigate(`/room/${roomCode}`),
          onError: (error) => {
            if (error instanceof Error) {
              navigate(`/room/${roomCode}/error`, {
                state: error.message,
              });
            }
          },
        },
      );
    }
  }, [playerSession, updatePlayer, roomCode, navigate]);

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      {!playerSession?.name && <CreatePlayer roomCode={roomCode!} />}
      {playerSession?.roomCode && <LeaveCurrentRoom />}
    </Layout>
  );
}
