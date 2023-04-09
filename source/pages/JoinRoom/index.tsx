import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import Killerparty from '@/assets/images/killerparty.png';
import { Loader } from '@/components/Loader';
import { ErrorCode } from '@/constants/errors';
import { useUpdatePlayer } from '@/services/player/mutations';
import { type SessionQuery } from '@/services/player/types';

import { CreatePlayer } from './CreatePlayer';
import { LeaveCurrentRoom } from './LeaveCurrentRoom';
import { UpdatePlayerPseudo } from './UpdatePlayerPseudo';

const { ROOM_NOT_FOUND, ALREADY_EXIST } = ErrorCode;

export function JoinRoomPage(): JSX.Element {
  const [isPlayerAlreadyExists, setPlayerAlreadyExists] = useState(false);
  const { roomCode } = useParams();
  const { session } = useOutletContext<SessionQuery>();
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
          onError: ({ errorCode, message }) => {
            if (errorCode === ROOM_NOT_FOUND) {
              navigate(`/room/${roomCode}/error`, {
                state: message,
              });
            }

            if (errorCode === ALREADY_EXIST) {
              setPlayerAlreadyExists(true);
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
      {isPlayerAlreadyExists && <UpdatePlayerPseudo session={session} />}
      {session?.room?.code && <LeaveCurrentRoom />}
    </>
  );
}
