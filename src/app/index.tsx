import { Fragment, useState } from 'react';

import Button from '../components/Button';
import Header from '../components/Header';
import { H1, H3 } from '../components/Heading';
import { t } from '../translate/helpers';

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
        <H1>{t('home.title')}</H1>
        <Text>{t('home.game_resume')}</Text>
        <PseudoSection>
          <H3>{t('home.player_not_found')}</H3>
          <Input
            type="text"
            placeholder={t('home.create_pseudo_placeholder')}
            autoComplete="off"
            value={currentPseudo}
            onChange={(e): void => setCurrentPseudo(e.target.value)}
          />
        </PseudoSection>

        <Button buttonColor="bg-amber-800" onClick={createRoom}>
          {t('home.create_room')}
          {currentPseudo && (
            <Fragment>
              {t('home.as')} <strong>{currentPseudo}</strong>
            </Fragment>
          )}
        </Button>
        <Button buttonColor="bg-yellow-400">{t('home.join_room')}</Button>
      </Content>
    </Fragment>
  );
};

export default Application;
