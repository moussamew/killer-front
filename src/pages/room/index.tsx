import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { RoomStatus } from '@/constants/enums';
import { isEmptyObject } from '@/helpers/objects';
import { PlayerContext } from '@/hooks/context/player';
import { usePrevious } from '@/hooks/usePrevious';

import { getRoom } from './services/requests';

interface Props {
  page: JSX.Element;
}

export const RoomPage = ({ page }: Props): JSX.Element => {
  const { roomCode } = useParams();

  const location = useLocation();

  const { playerSession } = useContext(PlayerContext);

  const previousRoomCode = usePrevious(playerSession?.roomCode);

  const navigate = useNavigate();

  const { data: room } = useQuery(location.pathname, () => getRoom(roomCode!));

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
