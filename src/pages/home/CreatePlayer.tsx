import { useState } from 'react';

import { H3 } from '../../components/Heading';
import { t } from '../../translate/helpers';

import { createPlayer } from './requests';
import { PseudoButton, PseudoInput, PseudoRow, PseudoSection } from './styles';

interface Props {
  showPlayerInput: (status: boolean) => void;
}

const CreatePlayer = ({ showPlayerInput }: Props): JSX.Element => {
  const [currentPseudo, setCurrentPseudo] = useState('');

  const handleCreatePlayer = async (): Promise<void> => {
    const newPlayer = await createPlayer(currentPseudo);

    if (!newPlayer.error) {
      showPlayerInput(false);
    }
  };

  return (
    <PseudoSection>
      <H3>{t('home.player_not_found')}</H3>
      <PseudoRow>
        <PseudoInput
          type="text"
          placeholder={t('home.create_pseudo_placeholder')}
          autoComplete="off"
          value={currentPseudo}
          onChange={(e): void => setCurrentPseudo(e.target.value)}
        />
        <PseudoButton onClick={handleCreatePlayer}>✔️</PseudoButton>
      </PseudoRow>
    </PseudoSection>
  );
};

export default CreatePlayer;
