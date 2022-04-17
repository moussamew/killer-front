import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';

import CreatePlayer from './CreatePlayer';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

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

const Home = (): JSX.Element => {
  const [inputPseudo, setInputPseudo] = useState('');
  const [inputErrorMessage, setInputErrorMessage] = useState<string>();

  const { playerSession } = useContext(PlayerContext);

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
    <Content>
      <WelcomeImage className="m-auto" alt="welcome" src={Killerparty} />
      <h1>{t('home.title')}</h1>
      <Text>{t('home.game_resume')}</Text>
      {!playerSession.name && (
        <CreatePlayer
          inputPseudo={inputPseudo}
          setInputPseudo={setInputPseudo}
          inputPseudoRef={inputPseudoRef}
          inputErrorMessage={inputErrorMessage}
        />
      )}
      <CreateRoom
        inputPseudo={inputPseudo}
        inputPseudoRef={inputPseudoRef}
        showInputErrorMessage={showInputErrorMessage}
      />
      <JoinRoom
        inputPseudo={inputPseudo}
        showInputErrorMessage={showInputErrorMessage}
      />
    </Content>
  );
};

export default Home;
