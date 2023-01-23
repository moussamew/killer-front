import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import Killerparty from '@/assets/images/killerparty.png';
import t from '@/helpers/translate';
import { Layout } from '@/layout/Layout';
import { useSession } from '@/services/player/queries';

import { CreateRoomButton } from './CreateRoomButton';
import { JoinRoomButton } from './JoinRoomButton';

const WelcomeImage = tw.img`
  m-auto
`;

const Text = tw.p`
  my-2
`;

export function HomePage(): JSX.Element {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.room?.code) {
      navigate(`/room/${session.room.code}`);
    }
  }, [navigate, session?.room?.code]);

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      <h1>{t('home.title')}</h1>
      <Text>{t('home.game_resume')}</Text>
      <CreateRoomButton playerName={session?.name} />
      <JoinRoomButton />
    </Layout>
  );
}
