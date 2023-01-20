import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { usePlayerSession } from '@/services/player/queries';
import { RoomStatus } from '@/services/room/constants';
import { useRoom } from '@/services/room/queries';

const { ROOM_IN_GAME, ROOM_DELETED, ROOM_UPDATED, PLAYER_UPDATED } =
  MercureEventType;
const { PENDING, IN_GAME, ENDED } = RoomStatus;

interface Props {
  children?: JSX.Element;
}

export function RoomPage({ children }: Props): JSX.Element | null {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const { isLoading, player, refetchPlayer } = usePlayerSession();
  const { room, refetchRoom } = useRoom(roomCode!);

  /**
   * Redirect player to the correct route related to the room status.
   */
  useEffect(() => {
    switch (room?.status) {
      case PENDING:
        navigate(`/room/${roomCode}/pending`);
        break;

      case IN_GAME:
        navigate(`/room/${roomCode}/playing`);
        break;

      case ENDED:
        navigate(`/room/${roomCode}/ended`);
        break;

      default:
        break;
    }
  }, [room, navigate, roomCode]);

  /**
   * Redirect player to the correct route by checking its session.
   */
  useEffect(() => {
    if (!isLoading) {
      /**
       * Redirect player to `join/room` route in two cases:
       */
      if (
        /* The player try to join the room without pseudo. */
        !player?.name ||
        /* The player try to join the room when he is already inside another room. */
        (player?.room?.code && player?.room?.code !== roomCode)
      ) {
        return navigate(`/join/${roomCode}`);
      }

      /**
       * Redirect player to home page if its roomCode is removed.
       */
      if (!player?.room?.code) {
        return navigate('/');
      }
    }

    return undefined;
  }, [isLoading, player, roomCode, navigate]);

  /**
   * Listen to SSE events emits in the Room page.
   * Apply corresponding side-effects.
   */
  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`, {
      withCredentials: PROD_ENV,
    });

    roomEventSource.addEventListener('message', (event) => {
      const { type } = JSON.parse(event.data);

      switch (type) {
        case ROOM_UPDATED:
          refetchRoom();
          break;

        case PLAYER_UPDATED:
          refetchRoom().then(refetchPlayer);
          break;

        /**
         * Should be removed to use the `ROOM_UPDATED` event.
         */
        case ROOM_IN_GAME:
          navigate(`/room/${roomCode}/playing`);
          break;

        /**
         * Should be removed to use the `ROOM_UPDATED` event.
         */
        case ROOM_DELETED:
          refetchPlayer();
          break;

        default:
          break;
      }
    });

    return () => roomEventSource.close();
  }, [roomCode, navigate, refetchPlayer, refetchRoom]);

  return children || null;
}
