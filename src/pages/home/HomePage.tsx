import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';
import { Layout } from '@/layout/Layout';

import { CreateRoomButton } from './CreateRoomButton';
import { JoinRoomButton } from './JoinRoomButton';

const Content = tw.div`
  max-w-screen-lg m-auto
  inset-0 px-2
`;

const WelcomeImage = tw.img`
  m-auto
`;

const Text = tw.p`
  my-2
`;

export const HomePage = (): JSX.Element => {
  const { playerSession } = useContext(PlayerContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (playerSession.roomCode) {
      navigate(`/room/${playerSession.roomCode}`);
    }
  }, [navigate, playerSession.roomCode]);

  return (
    <Layout>
      <Content>
        <WelcomeImage alt="welcome" src={Killerparty} />
        <h1>{t('home.title')}</h1>
        <Text>{t('home.game_resume')}</Text>
        <CreateRoomButton />
        <JoinRoomButton />
      </Content>
    </Layout>
  );
};
