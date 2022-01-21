import { createContext, ReactNode, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Player } from '../app/types';

import { getPlayerSession } from './requests';

interface Props {
  children: ReactNode;
}

interface Context {
  playerSession: Player | null;
  setPlayerSession: React.Dispatch<React.SetStateAction<Player | null>>;
}

const PlayerContext = createContext({} as Context);

const PlayerProvider = ({ children }: Props): JSX.Element => {
  const [playerSession, setPlayerSession] = useState<Player | null>(null);

  const memoizedPlayerSession = useMemo(
    () => ({ playerSession, setPlayerSession }),
    [playerSession],
  );

  const { isLoading, data } = useQuery('playerSession', getPlayerSession);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!playerSession && data) {
    setPlayerSession(data);
  }

  return (
    <PlayerContext.Provider value={memoizedPlayerSession}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
