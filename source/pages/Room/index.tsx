import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { roomStatusToRoute } from './constants';

const { ROOM_UPDATED } = MercureEventType;

export function RoomPage(): JSX.Element | null {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const { isLoading, session, refetchSession } = useSession();
  const { room, refetchRoom } = useRoom(roomCode!);

  /**
   * Redirect player to the correct route related to the room status.
   */
  useEffect(() => {
    if (room?.status) {
      const roomStatusRoute = roomStatusToRoute[room.status];

      navigate(`/room/${roomCode}/${roomStatusRoute}`);
    }
  }, [room, navigate, roomCode]);

  /**
   * Listen to SSE events emits in the Room page.
   * Apply corresponding side-effects.
   */
  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`);

    roomEventSource.addEventListener('message', (event) => {
      if (event.data) {
        const eventMessage = JSON.parse(event.data);

        if (eventMessage?.type === ROOM_UPDATED) {
          refetchRoom().then(refetchSession);
        }
      }
    });

    return () => roomEventSource.close();
  }, [roomCode, navigate, refetchSession, refetchRoom]);

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
        !session?.name ||
        /* The player try to join the room when he is already inside another room. */
        (session?.room?.code && session?.room?.code !== roomCode)
      ) {
        return navigate(`/join/${roomCode}`);
      }

      /**
       * Redirect player to home page if its roomCode is removed.
       */
      if (!session?.room?.code) {
        return navigate('/');
      }
    }

    return undefined;
  }, [isLoading, session, roomCode, navigate]);

  return <Outlet /> || null;
}
