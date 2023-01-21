import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import Killerparty from '@/assets/images/killerparty.png';
import { Loader } from '@/components/Loader';
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
  const { player } = usePlayerSession();
  const { updatePlayer } = useUpdatePlayer();

  const navigate = useNavigate();

  const { mutate: updatePlayerMutate, isLoading } = updatePlayer;

  useEffect(() => {
    /**
     * Let the player join automatically the room if
     * the player is already inside the same room that he want to join.
     */
    if (player?.room?.code === roomCode) {
      navigate(`/room/${roomCode}`);
    }

    /**
     * Let the player join automatically the room if the player name is already setted
     * and the player is not already inside a room.
     */
    if (player?.name && !player?.room?.code) {
      updatePlayerMutate(
        { id: player.id, room: roomCode },
        {
          onError: (error) => {
            if (error instanceof RequestError) {
              /**
               * Show not found page if:
               * - The room cannot be found.
               * - The name of the room is incorrect.
               */
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
  }, [player, updatePlayerMutate, roomCode, navigate]);

  /**
   * Returns loading spinner while the player is currently added to the room;
   */
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      {!player?.name && <CreatePlayer roomCode={roomCode!} />}
      {player?.room?.code && <LeaveCurrentRoom />}
    </Layout>
  );
}
