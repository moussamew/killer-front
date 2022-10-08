import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { isEmptyObject } from '@/helpers/utils';
import { TargetContext } from '@/hooks/context/target';
import { usePrevious } from '@/hooks/usePrevious';
import { usePlayerSession } from '@/services/player/queries';
import { RoomStatus } from '@/services/room/constants';
import { useRoomPlayers } from '@/services/room/queries';

import { getRoom } from './services/requests';

const {
  ROOM_IN_GAME,
  ROOM_DELETED,
  ROOM_UPDATED,
  PLAYER_KILLED,
  PLAYER_UPDATED,
} = MercureEventType;
const { PENDING, IN_GAME, ENDED } = RoomStatus;

interface Props {
  page: JSX.Element;
}

export const RoomPage = ({ page }: Props): JSX.Element => {
  const { roomCode } = useParams();

  const location = useLocation();

  const { playerSession, refetchPlayerSession } = usePlayerSession();
  const { refetchRoomPlayers } = useRoomPlayers(roomCode!);
  const { refreshTargetInfos } = useContext(TargetContext);

  const previousRoomCode = usePrevious(playerSession?.roomCode);

  const navigate = useNavigate();

  const { data: room, refetch: refetchRoomStatus } = useQuery(
    location.pathname,
    () => getRoom(roomCode!),
  );

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
    /**
     * Redirect player to `join/room` route in two cases:
     * The player try to join the room without pseudo.
     * The player try to join the room when he is already inside another room.
     */
    if (
      (playerSession && isEmptyObject(playerSession)) ||
      (!previousRoomCode && playerSession?.roomCode !== roomCode)
    ) {
      navigate(`/join/${roomCode}`);
    }

    /**
     * Redirect player to home page if its roomCode is removed.
     */
    if (previousRoomCode && !playerSession?.roomCode) {
      navigate('/');
    }
  }, [playerSession, previousRoomCode, roomCode, navigate]);

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
          refetchRoomStatus();
          break;

        case ROOM_DELETED:
          refetchPlayerSession();
          break;

        case PLAYER_KILLED:
          refreshTargetInfos().then(refetchRoomPlayers);
          break;

        case PLAYER_UPDATED:
          refetchRoomPlayers();
          break;

        /**
         * Should be removed to use only ROOM_UPDATED event.
         */
        case ROOM_IN_GAME:
          navigate(`/room/${roomCode}/playing`);
          break;

        default:
          break;
      }
    });

    return () => roomEventSource.close();
  }, [
    roomCode,
    navigate,
    refreshTargetInfos,
    refetchPlayerSession,
    refetchRoomStatus,
    refetchRoomPlayers,
  ]);

  return page;
};
