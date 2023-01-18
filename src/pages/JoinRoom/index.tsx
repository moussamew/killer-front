import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import Killerparty from '@/assets/images/killerparty.png';
import { RoomErrorCode } from '@/constants/errors';
import { RequestError } from '@/helpers/errors';
import { Layout } from '@/layout/Layout';
import { useUpdatePlayer } from '@/services/player/mutations';
import { usePlayerSession } from '@/services/player/queries';

import { CreatePlayer } from './CreatePlayer';
import { LeaveCurrentRoom } from './LeaveCurrentRoom';

const WelcomeImage = tw.img`
  m-auto
`;

const { NOT_FOUND, BAD_ROOMCODE } = RoomErrorCode;

export function JoinRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { playerSession } = usePlayerSession();
  const {
    updatePlayer: { mutate: updatePlayerMutate },
  } = useUpdatePlayer();

  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Let the user join automatically the room if
     * the user is already inside the same room that he want to join.
     */
    if (playerSession?.room?.code === roomCode) {
      navigate(`/room/${roomCode}`);
    }

    /**
     * Let the user join automatically the room if the user name is already setted
     * and the user is not already inside a room.
     *
     * Show not found page if:
     * - The room cannot be found.
     * - The name of the room is incorrect.
     */
    if (playerSession?.name && !playerSession?.room?.code) {
      updatePlayerMutate(
        { id: playerSession.id, room: roomCode },
        {
          onError: (error) => {
            if (error instanceof RequestError) {
              if ([NOT_FOUND, BAD_ROOMCODE].includes(error.errorCode)) {
                navigate(`/room/${roomCode}/error`, {
                  state: error.message,
                });
              }
            }
          },
        },
      );
    }
  }, [playerSession, updatePlayerMutate, roomCode, navigate]);

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      {!playerSession?.name && <CreatePlayer roomCode={roomCode!} />}
      {playerSession?.room?.code && <LeaveCurrentRoom />}
    </Layout>
  );
}
