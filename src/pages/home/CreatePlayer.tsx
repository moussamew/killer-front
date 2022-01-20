import { useContext, useRef, useState } from 'react';

import { H3 } from '../../components/Heading';
import { UserContext } from '../../hooks/context';
import { t } from '../../translate/helpers';

import { createPlayer } from './requests';
import {
  ButtonText,
  ErrorMessage,
  PseudoButton,
  PseudoInput,
  PseudoRow,
  PseudoSection,
} from './styles';

const CreatePlayer = (): JSX.Element => {
  const [currentPseudo, setCurrentPseudo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setPseudo } = useContext(UserContext);

  const inputRef = useRef<HTMLElement>(null);

  const handleCreatePlayer = async (): Promise<void> => {
    const { error, message } = await createPlayer(currentPseudo);

    if (error && message) {
      setErrorMessage(message[0]);
      inputRef.current?.focus();
    } else {
      setPseudo(currentPseudo);
    }
  };

  return (
    <PseudoSection>
      <H3>{t('home.player_not_found')}</H3>

      <PseudoRow>
        <PseudoInput
          ref={inputRef}
          type="text"
          placeholder={t('home.create_pseudo_placeholder')}
          autoComplete="off"
          value={currentPseudo}
          onChange={(e): void => setCurrentPseudo(e.target.value)}
        />
        <PseudoButton onClick={handleCreatePlayer}>
          <ButtonText>{t('home.save_pseudo')}</ButtonText>
        </PseudoButton>
      </PseudoRow>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </PseudoSection>
  );
};

export default CreatePlayer;
