import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { H1 } from '../../components/Heading';
import { UserContext } from '../../hooks/context';
import { t } from '../../translate/helpers';

import CreatePlayer from './CreatePlayer';
import { createRoom } from './requests';
import { Content, Text } from './styles';

const Home = (): JSX.Element => {
  const { pseudo } = useContext(UserContext);

  const navigate = useNavigate();

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
        {!pseudo && <CreatePlayer />}
        <Button disabled={!pseudo} buttonColor="bg-yellow-400">
          {t('home.join_room')}
        </Button>
        <Button
          disabled={!pseudo}
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
