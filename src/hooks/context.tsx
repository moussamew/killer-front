import { createContext, ReactNode, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { getPlayerSession } from './requests';

interface Props {
  children: ReactNode;
}

interface Context {
  pseudo: string | null;
  setPseudo: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext({} as Context);

const UserProvider = ({ children }: Props): JSX.Element => {
  const [pseudo, setPseudo] = useState<string | null>(null);

  const memoizedPseudo = useMemo(() => ({ pseudo, setPseudo }), [pseudo]);

  const { isLoading, data: playerSession } = useQuery(
    'playerSession',
    getPlayerSession,
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!pseudo && playerSession?.name) {
    setPseudo(playerSession.name);
  }

  return (
    <UserContext.Provider value={memoizedPseudo}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
