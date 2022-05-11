import { Dispatch, Fragment, RefObject, SetStateAction } from 'react';
import tw from 'tailwind-styled-components';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';

const Pseudo = tw.div`
  flex flex-col justify-center 
`;

interface Props {
  inputPseudo: string;
  setInputPseudo: Dispatch<SetStateAction<string>>;
  inputPseudoRef: RefObject<HTMLInputElement>;
  setInputErrorMessage: Dispatch<SetStateAction<string>>;
  inputErrorMessage?: string;
}

export const CreatePlayerInput = ({
  inputPseudo,
  setInputPseudo,
  inputPseudoRef,
  inputErrorMessage,
  setInputErrorMessage,
}: Props): JSX.Element => (
  <Fragment>
    <h2>{t('home.player_not_found')}</h2>
    <Pseudo>
      <Input
        id="pseudo"
        ref={inputPseudoRef}
        type="text"
        placeholder={t('generic.create_pseudo_placeholder')}
        value={inputPseudo}
        onChange={(e): void => setInputPseudo(e.target.value.toUpperCase())}
        uppercase
      />
      {inputErrorMessage && (
        <ErrorMessage
          errorMessage={inputErrorMessage}
          closeMessage={() => setInputErrorMessage('')}
        />
      )}
    </Pseudo>
  </Fragment>
);
