import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { H1, H3 } from '../../components/Heading';
import { PlayerContext } from '../../hooks/context';
import { t } from '../../translate/helpers';

import { createPlayer, createRoom } from './requests';
import {
  Content,
  ErrorMessage,
  PseudoInput,
  PseudoRow,
  PseudoSection,
  Text,
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

        throw new Error(player.message[0]);
      }

      setPlayerSession(player);
    }

    const { code: roomCode, message: errorRoomMessage } = await createRoom();

    if (errorRoomMessage) {
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
        <H1>{t('home.title')}</H1>
        <Text>{t('home.game_resume')}</Text>

        {!playerSession?.name && (
          <PseudoSection>
            <H3>{t('home.player_not_found')}</H3>
            <PseudoRow>
              <PseudoInput
                ref={inputRef}
                type="text"
                placeholder={t('home.create_pseudo_placeholder')}
                autoComplete="off"
                value={currentPseudo}
                onChange={(e): void => setCurrentPseudo(e.target.value)}
              />
            </PseudoRow>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </PseudoSection>
        )}

        <Button disabled buttonColor="bg-yellow-400">
          {t('home.join_room')}
        </Button>
        <Button buttonColor="bg-amber-800" onClick={handleCreateRoom}>
          {t('home.create_room')}
        </Button>
      </Content>
    </Fragment>
  );
};

export default Home;
