import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';
import { Layout } from '@/layout/Layout';

import { CreateRoomButton } from './CreateRoomButton';
import { JoinRoomModal } from './JoinRoomModal';

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
  const [inputPseudo, setInputPseudo] = useState('');
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const { playerSession } = useContext(PlayerContext);
  const { openModal } = useContext(ModalContext);

  const inputPseudoRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (playerSession.roomCode) {
      navigate(`/room/${playerSession.roomCode}`);
    }
  }, [navigate, playerSession.roomCode]);

  const showInputErrorMessage = (message: string): void => {
    setInputErrorMessage(message);
    (inputPseudoRef.current as HTMLInputElement).focus();
  };

  return (
    <Layout>
      <Content>
        <WelcomeImage alt="welcome" src={Killerparty} />
        <h1>{t('home.title')}</h1>
        <Text>{t('home.game_resume')}</Text>
        <CreateRoomButton
          inputPseudo={inputPseudo}
          inputPseudoRef={inputPseudoRef}
          showInputErrorMessage={showInputErrorMessage}
        />
        <Button
          content={t('home.join_room')}
          buttonColor="bg-yellow-200"
          textColor="text-lightDark"
          onClick={() => openModal(<JoinRoomModal />)}
        />
      </Content>
    </Layout>
  );
};
