import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { H1 } from '../../components/Heading';
import { t } from '../../translate/helpers';

import CreatePlayer from './CreatePlayer';
import { createRoom, getPlayerSession } from './requests';
import { Content, Text } from './styles';

const Home = (): JSX.Element => {
  const [playerInput, showPlayerInput] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handlePlayerSession = async (): Promise<void> => {
      const { error, roomCode } = await getPlayerSession();

      if (error) showPlayerInput(true);

      if (roomCode) navigate(`/room/${roomCode}`);
    };

    handlePlayerSession();
  }, [navigate]);

  const handleCreateRoom = async (): Promise<void> => {
    const { code: roomCode } = await createRoom();

    if (roomCode) navigate(`/room/${roomCode}`);
  };

  return (
    <Fragment>
      <Header />
      <Content>
        <H1>{t('home.title')}</H1>
        <Text>{t('home.game_resume')}</Text>

        {playerInput && <CreatePlayer showPlayerInput={showPlayerInput} />}

        <Button disabled={playerInput} buttonColor="bg-yellow-400">
          {t('home.join_room')}
        </Button>
        <Button
          disabled={playerInput}
          buttonColor="bg-amber-800"
          onClick={handleCreateRoom}
        >
          {t('home.create_room')}
        </Button>
      </Content>
    </Fragment>
  );
};

export default Home;
