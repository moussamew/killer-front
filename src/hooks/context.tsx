import { createContext, ReactNode, useMemo, useState } from 'react';
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

  const memoizedPlayerSession = useMemo(
    () => ({ playerSession, setPlayerSession }),
    [playerSession],
  );

  const { isLoading, data: currentSession } = useQuery(
    'playerSession',
    getPlayerSession,
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
