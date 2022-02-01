import { Fragment } from 'react';

import Header from '../../components/Header';

import Players from './Players';
import Profile from './Profile';
import { Content } from './styles';

const Room = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <Content>
        <Profile />
        <Players />
      </Content>
    </Fragment>
  );
};

export default Room;
