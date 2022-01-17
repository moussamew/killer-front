import { Fragment } from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { H1 } from '../../components/Heading';
import { t } from '../../translate/helpers';

import CreateRoom from './CreateRoom';
import { Content, Text } from './styles';

const Home = (): JSX.Element => (
  <Fragment>
    <Header />
    <Content>
      <H1>{t('home.title')}</H1>
      <Text>{t('home.game_resume')}</Text>
      <CreateRoom />
      <Button buttonColor="bg-yellow-400">{t('home.join_room')}</Button>
    </Content>
  </Fragment>
);

export default Home;
