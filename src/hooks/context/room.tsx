import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { Player } from '@/services/player/types';
import { getRoomPlayers } from '@/services/room/requests';

interface RoomContextInterface {
  roomPlayers: Player[];
  refreshRoomPlayers: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const RoomContext = createContext({} as RoomContextInterface);

function RoomProvider({ children }: Props): JSX.Element {
  const { roomCode } = useParams();

  const [roomPlayers, setRoomPlayers] = useState<Player[]>([]);

  const {
    isLoading,
    data: currentRoomPlayers,
    refetch: refetchRoomPlayers,
  } = useQuery('roomPlayers', () => getRoomPlayers(roomCode!));

  const refreshRoomPlayers = useCallback(async (): Promise<void> => {
    const { data: updatedRoomPlayers } = await refetchRoomPlayers();

    if (updatedRoomPlayers) {
      setRoomPlayers(updatedRoomPlayers);
    }
  }, [refetchRoomPlayers]);

  const memoizedRoom = useMemo(
    () => ({ roomPlayers, refreshRoomPlayers }),
    [roomPlayers, refreshRoomPlayers],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (currentRoomPlayers && roomPlayers.length !== currentRoomPlayers?.length) {
    setRoomPlayers(currentRoomPlayers);
  }

  return (
    <RoomContext.Provider value={memoizedRoom}>{children}</RoomContext.Provider>
  );
}

export { RoomContext, RoomProvider };
