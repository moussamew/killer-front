import { Fragment, useState } from 'react';

import { PLAYER_API_URL } from '../../app/constants';
import Button from '../../components/Button';
import { H3 } from '../../components/Heading';
import { t } from '../../translate/helpers';

import { Input, PseudoSection } from './styles';

const CreateRoom = (): JSX.Element => {
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
    </Fragment>
  );
};

export default CreateRoom;
