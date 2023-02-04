import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import Killerparty from '@/assets/images/killerparty.png';
import { useTranslation } from '@/hooks/useTranslation';
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session } = useSession();

  useEffect(() => {
    if (session?.room?.code) {
      navigate(`/room/${session.room.code}`);
    }
  }, [navigate, session?.room?.code]);

  return (
    <>
      <WelcomeImage alt="welcome" src={Killerparty} />
      <h1>{t('home.title')}</h1>
      <Text>{t('home.description')}</Text>
      <CreateRoomButton playerName={session?.name} />
      <JoinRoomButton />
    </>
  );
}
