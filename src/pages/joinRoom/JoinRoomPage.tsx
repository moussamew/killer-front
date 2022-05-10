import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PlayerContext } from '@/hooks/context/player';
import { Layout } from '@/layout/Layout';
import { updatePlayer } from '@/layout/services/requests';

export const JoinRoomPage = (): JSX.Element => {
  const { roomCode } = useParams();
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (playerSession?.name && !playerSession?.roomCode) {
      updatePlayer({ roomCode })
        .then(refreshPlayerSession)
        .then(() => navigate(`/room/${roomCode}`));
    }
  }, [playerSession, roomCode, refreshPlayerSession, navigate]);

  return (
    <Layout hideSettings>
      <p>{roomCode}</p>
    </Layout>
  );
};
