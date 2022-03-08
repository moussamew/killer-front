import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';

import { Loader } from 'components';
import { isEmptyObject } from 'helpers/objects';
import { Player } from 'types';

import { getPlayerSession } from './services/requests';
import { PlayerContextInterface } from './types';

interface Props {
  children: ReactNode;
}

const PlayerContext = createContext({} as PlayerContextInterface);

const PlayerProvider = ({ children }: Props): JSX.Element => {
  const [playerSession, setPlayerSession] = useState<Player>({});

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
