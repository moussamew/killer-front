import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const handlePlayerSession = async (): Promise<void> => {
      const { name, roomCode } = await getPlayerSession();

      if (name) {
        setPseudo(name);
      }

      if (roomCode) {
        navigate(`/room/${roomCode}`);
      }
    };

    handlePlayerSession();
  }, [navigate]);

  const value = useMemo(() => ({ pseudo, setPseudo }), [pseudo]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
