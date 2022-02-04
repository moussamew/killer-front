import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Killerparty from '../../assets/images/killerparty.png';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { H1, H2 } from '../../components/Heading';
import Input from '../../components/Input';
import { PlayerContext } from '../../hooks/context';
import { t } from '../../translate/helpers';

import { createPlayer, createRoom } from './requests';
import {
  Actions,
  Content,
  ErrorMessage,
  PseudoRow,
  PseudoSection,
  Text,
  WelcomeImage,
} from './styles';

const Home = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPseudo, setCurrentPseudo] = useState('');

  const { playerSession, setPlayerSession } = useContext(PlayerContext);
  const inputRef = useRef<HTMLElement>(null);

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
        <H1>{t('home.title')}</H1>
        <Text>{t('home.game_resume')}</Text>

        {!playerSession?.name && (
          <PseudoSection>
            <H2>{t('home.player_not_found')}</H2>
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
