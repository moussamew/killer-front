import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import Killerparty from '@/assets/images/killerparty.png';
import t from '@/helpers/translate';
import { Layout } from '@/layout/Layout';
import { usePlayerSession } from '@/services/player/queries';

import { CreateRoomButton } from './CreateRoomButton';
import { JoinRoomButton } from './JoinRoomButton';

const WelcomeImage = tw.img`
  m-auto
`;

const Text = tw.p`
  my-2
`;

export function HomePage(): JSX.Element {
  const { playerSession } = usePlayerSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (playerSession?.roomCode) {
      navigate(`/room/${playerSession.roomCode}`);
    }
  }, [navigate, playerSession?.roomCode]);

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      <h1>{t('home.title')}</h1>
      <Text>{t('home.game_resume')}</Text>
      <CreateRoomButton />
      <JoinRoomButton />
    </Layout>
  );
}
