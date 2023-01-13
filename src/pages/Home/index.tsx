import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

/* import Killerparty from '@/assets/images/killerparty.png'; */

import Island from '@/assets/imagesV2/Island.png';
import t from '@/helpers/translate';
import { Layout } from '@/layout/Layout';
import { usePlayerSession } from '@/services/player/queries';

import { CreateRoomButton } from './CreateRoomButton';
import { JoinRoomButton } from './JoinRoomButton';

const WelcomeImage = styled.img`
  filter: drop-shadow(0.5rem 0.5rem 1rem #0f172a);
`;

const Section = tw.section`
  flex items-center
`;

const Text = tw.p`
  my-2
`;

const Actions = tw.div`
  flex items-center
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
      {/*     <WelcomeImage alt="welcome" src={Killerparty} /> */}
      <Section>
        <div>
          <h1>{t('home.title')}</h1>

          <Text>{t('home.game_resume')}</Text>
          <Actions>
            <CreateRoomButton />
            {/*  <JoinRoomButton /> */}
          </Actions>
        </div>
        <WelcomeImage alt="island" src={Island} />
      </Section>
    </Layout>
  );
}
