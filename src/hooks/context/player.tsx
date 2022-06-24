import {
  createContext,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';

import { Loader } from '@/components/Loader';
import { isEmptyObject } from '@/helpers/objects';
import { Player } from '@/types';

import { getPlayerSession } from '../services/requests';

interface PlayerContextInterface {
  playerSession: Partial<Player>;
  refreshPlayerSession: () => Promise<void>;
}

const PlayerContext = createContext({} as PlayerContextInterface);

const PlayerProvider: FunctionComponent = ({ children }) => {
  const [playerSession, setPlayerSession] = useState<Partial<Player>>({});

  const {
    isLoading,
    data: currentSession,
    refetch: queryPlayerSession,
  } = useQuery('playerSession', getPlayerSession);

  const refreshPlayerSession = useCallback(async (): Promise<void> => {
    const { data: updatedSession } = await queryPlayerSession();

    if (updatedSession) {
      setPlayerSession(updatedSession);
    }
  }, [queryPlayerSession]);

  const memoizedPlayerSession = useMemo(
    () => ({ playerSession, refreshPlayerSession }),
    [playerSession, refreshPlayerSession],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isEmptyObject(playerSession) && currentSession) {
    setPlayerSession(currentSession);
  }

  return (
    <PlayerContext.Provider value={memoizedPlayerSession}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
