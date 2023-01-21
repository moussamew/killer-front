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
  const { player } = usePlayerSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (player?.room?.code) {
      navigate(`/room/${player.room.code}`);
    }
  }, [navigate, player?.room?.code]);

  return (
    <Layout>
      <WelcomeImage alt="welcome" src={Killerparty} />
      <h1>{t('home.title')}</h1>
      <Text>{t('home.game_resume')}</Text>
      <CreateRoomButton playerName={player?.name} />
      <JoinRoomButton />
    </Layout>
  );
}
