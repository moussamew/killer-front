import { Fragment, useState } from 'react';

import Button from '../components/Button';
import Header from '../components/Header';
import { H1, H3 } from '../components/Heading';

import { PLAYER_API_URL } from './constants';
import { Content, Text, PseudoSection, Input } from './styles';

const Application = (): JSX.Element => {
  const [currentPseudo, setCurrentPseudo] = useState('');

  const createRoom = async (): Promise<void> => {
    await fetch(PLAYER_API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: currentPseudo,
      }),
    });
  };

  return (
    <Fragment>
      <Header />
      <Content>
        <H1>The right way to kill your friends..</H1>
        <Text>
          An evening with friends... How about adding a little atmosphere by
          making all these nice people kill each other? Killer Party is a simple
          party game that can be played throughout an evening or a meal.
        </Text>

        <PseudoSection>
          <H3>Ooops. It appears that you did not have a pseudo yet...</H3>
          <Input
            type="text"
            placeholder="Please create your Pseudo before creating your room.."
            autoComplete="off"
            value={currentPseudo}
            onChange={(e): void => setCurrentPseudo(e.target.value)}
          />
        </PseudoSection>

        <Button buttonColor="bg-brown" onClick={createRoom}>
          Create new room&nbsp;
          {currentPseudo && (
            <Fragment>
              as <strong>{currentPseudo}</strong>
            </Fragment>
          )}
        </Button>
        <Button buttonColor="bg-yellow">JOIN A ROOM</Button>
      </Content>
    </Fragment>
  );
};

export default Application;
