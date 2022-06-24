import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType, PlayerStatus, RoomStatus } from '@/constants/enums';
import { isEmptyObject } from '@/helpers/objects';
import { PlayerContext } from '@/hooks/context/player';
import { RoomContext } from '@/hooks/context/room';
import { TargetContext } from '@/hooks/context/target';
import { usePrevious } from '@/hooks/usePrevious';

import { getRoom } from './services/requests';

interface Props {
  page: JSX.Element;
}

export const Room = ({ page }: Props): JSX.Element => {
  const { roomCode } = useParams();

  const location = useLocation();

  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);
  const { refreshRoomPlayers } = useContext(RoomContext);
  const { refreshTargetInfos } = useContext(TargetContext);

  const previousRoomCode = usePrevious(playerSession?.roomCode);

  const navigate = useNavigate();

  const { data: room } = useQuery(location.pathname, () => getRoom(roomCode!));

  /**
   * Listen to SSE events emits in the Room page.
   * Apply corresponding side-effects.
   */
  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`, {
      withCredentials: PROD_ENV,
    });

    roomEventSource.addEventListener(
      'message',
      (event): void | Promise<void> => {
        const { type, payload } = JSON.parse(event.data);

        if (type === MercureEventType.ROOM_IN_GAME) {
          return navigate(`/room/${roomCode}/playing`);
        }

        if (type === MercureEventType.ROOM_DELETED) {
          return refreshPlayerSession();
        }

        if (payload?.status === PlayerStatus.KILLED) {
          return refreshTargetInfos().then(refreshRoomPlayers);
        }

        return refreshRoomPlayers().then(refreshPlayerSession);
      },
    );

    return () => roomEventSource.close();
  }, [
    roomCode,
    navigate,
    refreshTargetInfos,
    refreshRoomPlayers,
    refreshPlayerSession,
  ]);

  /**
   * Redirect player to `join/room` route in two cases:
   * The player try to join the room without pseudo.
   * The player try to join the room when he is already inside another room.
   */
  useEffect(() => {
    if (
      isEmptyObject(playerSession) ||
      (!previousRoomCode && playerSession?.roomCode !== roomCode)
    ) {
      navigate(`/join/${roomCode}`);
    }
  }, [playerSession, previousRoomCode, roomCode, navigate]);

  /**
   * Redirect player to the correct route related to the room status.
   */
  useEffect(() => {
    if (room?.status === RoomStatus.PENDING) {
      navigate(`/room/${roomCode}/pending`);
    }

    if (room?.status === RoomStatus.IN_GAME) {
      navigate(`/room/${roomCode}/playing`);
    }
  }, [room, navigate, roomCode]);

  return page;
};
