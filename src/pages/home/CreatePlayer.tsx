import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import tw from 'tailwind-styled-components';

import { Input } from '../../components';
import t from '../../helpers/translate';

const Content = tw.section`
  mt-2 mb-1
`;

const Pseudo = tw.div`
  mt-2 flex flex-row 
  justify-center items-center
`;

interface Props {
  errorMessage: string;
  inputPseudo: string;
  setInputPseudo: Dispatch<SetStateAction<string>>;
  inputPseudoRef: RefObject<HTMLInputElement>;
}

const CreatePlayer = ({
  errorMessage,
  inputPseudo,
  setInputPseudo,
  inputPseudoRef,
}: Props): JSX.Element => {
  useEffect(() => {
    inputPseudoRef.current?.focus();
  }, [inputPseudoRef]);

  return (
    <Content>
      <h2>{t('home.player_not_found')}</h2>
      <Pseudo>
        <Input
          id="pseudo"
          ref={inputPseudoRef}
          type="text"
          placeholder={t('home.create_pseudo_placeholder')}
          value={inputPseudo}
          onChange={(e): void => setInputPseudo(e.target.value)}
          errorMessage={errorMessage}
        />
      </Pseudo>
    </Content>
  );
};

export default CreatePlayer;
