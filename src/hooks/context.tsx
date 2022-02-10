import { render, RenderResult } from '@testing-library/react';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Player } from '../app/types';
import { Loader } from '../components';

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
    return <Loader />;
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

/**
 * Helper that render your component with the Player Context.
 * Used this only for unit testing purpose.
 */
const renderWithPlayerContext = (
  component: ReactNode,
  playerSession: Player | null = null,
): RenderResult =>
  render(
    <PlayerContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ playerSession, setPlayerSession: (): void => {} }}
    >
      {component}
    </PlayerContext.Provider>,
  );

export { PlayerContext, PlayerProvider, renderWithPlayerContext };
