import { Fragment } from 'react';

import Button from '../components/Button';
import Header from '../components/Header';
import { H1 } from '../components/Heading';

import { Content, Text } from './styles';

const Application = (): JSX.Element => (
  <Fragment>
    <Header />
    <Content>
      <H1>The right way to kill your friends..</H1>
      <Text>
        An evening with friends... How about adding a little atmosphere by
        making all these nice people kill each other? Killer Party is a simple
        party game that can be played throughout an evening or a meal.
      </Text>
      <Button buttonColor="bg-brown">CREATE NEW ROOM</Button>
      <Button buttonColor="bg-yellow">JOIN A ROOM</Button>
    </Content>
  </Fragment>
);

export default Application;
