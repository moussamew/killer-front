import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { isMobile } from '@/helpers/utils';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';
import { type Room } from '@/services/room/types';

import { roomStatusToRoute } from './constants';

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

      if (roomStatusRoute === 'pending' && !isMobile()) {
        navigate(`/room/${roomCode}/${roomStatusRoute}/v2`);
      } else {
        navigate(`/room/${roomCode}/${roomStatusRoute}`);
      }
    }
  }, [room, navigate, roomCode]);

  /**
   * Listen to SSE events emits in the Room page.
   * Apply corresponding side-effects.
   */
  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`, {
      withCredentials: PROD_ENV,
    });

    roomEventSource.addEventListener('message', (event) => {
      const roomInfos: Room = JSON.parse(event.data);

      const isPlayerInRoom = roomInfos.players.some(
        ({ id }) => id === session?.id,
      );

      if (isPlayerInRoom) {
        return refetchRoom().then(refetchSession);
      }

      return refetchSession();
    });

    return () => roomEventSource.close();
  }, [roomCode, session?.id, refetchSession, refetchRoom]);

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
        (session?.room?.id && session?.room?.id !== roomCode)
      ) {
        return navigate(`/join/${roomCode}`);
      }

      /**
       * Redirect player to home page if its roomCode is removed.
       */
      if (!session?.room?.id) {
        return navigate('/');
      }
    }

    return undefined;
  }, [isLoading, session, roomCode, navigate]);

  return <Outlet /> || null;
}
