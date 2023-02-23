import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Killerparty from '@/assets/images/killerparty.png';
import { Loader } from '@/components/Loader';
import { RoomErrorCode } from '@/constants/errors';
import { RequestError } from '@/helpers/errors';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import { CreatePlayer } from './CreatePlayer';
import { LeaveCurrentRoom } from './LeaveCurrentRoom';

const { NOT_FOUND, BAD_ROOMCODE } = RoomErrorCode;

export function JoinRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();

  const navigate = useNavigate();

  const { mutate: updatePlayerMutate, isLoading } = updatePlayer;

  useEffect(() => {
    /**
     * Let the player join automatically the room if
     * the player is already inside the same room that he want to join.
     */
    if (session?.room?.code === roomCode) {
      navigate(`/room/${roomCode}`);
    }

    /**
     * Let the player join automatically the room if the player name is already setted
     * and the player is not already inside a room.
     */
    if (session?.name && !session?.room?.code) {
      updatePlayerMutate(
        { id: session.id, room: roomCode },
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
  }, [session, updatePlayerMutate, roomCode, navigate]);

  /**
   * Returns loading spinner while the player is currently added to the room;
   */
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <img alt="welcome" src={Killerparty} />
      {!session?.name && <CreatePlayer />}
      {session?.room?.code && <LeaveCurrentRoom />}
    </>
  );
}
