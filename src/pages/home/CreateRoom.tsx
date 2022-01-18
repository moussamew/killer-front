import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { H3 } from '../../components/Heading';
import { t } from '../../translate/helpers';

import { createPlayer, createRoom } from './requests';
import { Input, PseudoSection } from './styles';

const CreateRoom = (): JSX.Element => {
  const [currentPseudo, setCurrentPseudo] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async (): Promise<void> => {
    await createPlayer(currentPseudo);

    const { code } = await createRoom();

    navigate(`/room/${code}`);
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
      <Button buttonColor="bg-amber-800" onClick={handleCreateRoom}>
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
