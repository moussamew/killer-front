import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';

import { Loader } from '../components';

import { getPlayerSession } from './services/requests';
import { PlayerContextInterface, PlayerSession } from './types';

interface Props {
  children: ReactNode;
}

const PlayerContext = createContext({} as PlayerContextInterface);

const PlayerProvider = ({ children }: Props): JSX.Element => {
  const [playerSession, setPlayerSession] = useState<PlayerSession>({});

  const {
    isLoading,
    data: currentSession,
    refetch,
  } = useQuery('playerSession', getPlayerSession);

  const refreshPlayerSession = useCallback(async (): Promise<void> => {
    const { data: updatedSession } = await refetch();

    if (updatedSession) {
      setPlayerSession(updatedSession);
    }
  }, [refetch]);

  const memoizedPlayerSession = useMemo(
    () => ({ playerSession, refreshPlayerSession }),
    [playerSession, refreshPlayerSession],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!playerSession.name && currentSession?.name) {
    setPlayerSession(currentSession);
  }

  return (
    <PlayerContext.Provider value={memoizedPlayerSession}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
