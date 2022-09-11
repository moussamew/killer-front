import isEqual from 'fast-deep-equal';
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';

import { Loader } from '@/components/Loader';
import { isEmptyObject } from '@/helpers/utils';
import { Player } from '@/types';

import { getPlayerSession } from '../services/requests';

interface PlayerContextInterface {
  playerSession: Partial<Player>;
  refreshPlayerSession: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const PlayerContext = createContext({} as PlayerContextInterface);

const PlayerProvider = ({ children }: Props): JSX.Element => {
  const [playerSession, setPlayerSession] = useState<Partial<Player>>({});

  const {
    isLoading,
    data: currentSession,
    refetch: refetchPlayerSession,
  } = useQuery('playerSession', getPlayerSession);

  const refreshPlayerSession = useCallback(async (): Promise<void> => {
    const { data: updatedSession } = await refetchPlayerSession();

    if (updatedSession && !isEqual(currentSession, updatedSession)) {
      setPlayerSession(updatedSession);
    }
  }, [refetchPlayerSession, currentSession]);

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
