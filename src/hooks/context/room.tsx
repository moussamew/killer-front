import {
  createContext,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { getRoomPlayers } from '@/pages/room/pending/services/requests';
import { Player } from '@/types';

interface RoomContextInterface {
  roomPlayers: Player[];
  refreshRoomPlayers: () => Promise<void>;
}

const RoomContext = createContext({} as RoomContextInterface);

const RoomProvider: FunctionComponent = ({ children }) => {
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
};

export { RoomContext, RoomProvider };
