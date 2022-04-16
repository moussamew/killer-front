import { Dispatch, Fragment, RefObject, SetStateAction } from 'react';
import tw from 'tailwind-styled-components';

import { Input } from '@/components';
import t from '@/helpers/translate';

const Pseudo = tw.div`
  flex flex-row justify-center 
  items-center
`;

interface Props {
  inputPseudo: string;
  setInputPseudo: Dispatch<SetStateAction<string>>;
  inputPseudoRef: RefObject<HTMLInputElement>;
  inputErrorMessage?: string;
}

const CreatePlayer = ({
  inputPseudo,
  setInputPseudo,
  inputPseudoRef,
  inputErrorMessage,
}: Props): JSX.Element => (
  <Fragment>
    <h2>{t('home.player_not_found')}</h2>
    <Pseudo>
      <Input
        id="pseudo"
        ref={inputPseudoRef}
        type="text"
        placeholder={t('home.create_pseudo_placeholder')}
        value={inputPseudo}
        onChange={(e): void => setInputPseudo(e.target.value)}
        errorMessage={inputErrorMessage}
      />
    </Pseudo>
  </Fragment>
);

export default CreatePlayer;
