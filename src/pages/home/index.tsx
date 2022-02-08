import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '../../assets/images/killerparty.png';
import { Button, Header, Input } from '../../components';
import t from '../../helpers/translate';
import { PlayerContext } from '../../hooks/context';

import { createPlayer, createRoom } from './requests';

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

const PseudoSection = tw.section`
  mt-2 mb-1
`;

const PseudoRow = tw.div`
  mt-2 flex flex-row 
  justify-center items-center
`;

const ErrorMessage = tw.p`
  normal-case bg-red-200 text-red-500 
  p-1 mt-1 rounded-md text-2xl font-bold
`;

const Actions = tw.div`
  mt-1
`;

const Home = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPseudo, setCurrentPseudo] = useState('');

  const { playerSession, setPlayerSession } = useContext(PlayerContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (playerSession?.roomCode) {
      navigate(`/room/${playerSession.roomCode}`);
    }
  }, [navigate, playerSession?.roomCode]);

  const handleCreateRoom = async (): Promise<void> => {
    if (!playerSession?.name) {
      const player = await createPlayer(currentPseudo);

      if (player.error && player.message) {
        setErrorMessage(player.message[0]);
        inputRef.current?.focus();

        return;
      }

      setPlayerSession(player);
    }

    const { code: roomCode, error } = await createRoom();

    if (error) {
      setErrorMessage(t('home.create_room_error'));
      inputRef.current?.focus();
    }

    if (roomCode) {
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <Fragment>
      <Header />
      <Content>
        <WelcomeImage className="m-auto" alt="welcome" src={Killerparty} />
        <h1>{t('home.title')}</h1>
        <Text>{t('home.game_resume')}</Text>

        {!playerSession?.name && (
          <PseudoSection>
            <h2>{t('home.player_not_found')}</h2>
            <PseudoRow>
              <Input
                id="createPseudo"
                ref={inputRef}
                type="text"
                placeholder={t('home.create_pseudo_placeholder')}
                value={currentPseudo}
                onChange={(e): void => setCurrentPseudo(e.target.value)}
              />
            </PseudoRow>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </PseudoSection>
        )}

        <Actions className="mt-1">
          <Button buttonColor="bg-red-400" onClick={handleCreateRoom}>
            {t('home.create_room')}
          </Button>
          <Button
            disabled
            buttonColor="bg-yellow-200"
            textColor="text-lightDark"
          >
            {t('home.join_room')}
          </Button>
        </Actions>
      </Content>
    </Fragment>
  );
};

export default Home;
