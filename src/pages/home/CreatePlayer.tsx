import { Dispatch, RefObject, SetStateAction } from 'react';
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
  inputPseudo: string;
  setInputPseudo: Dispatch<SetStateAction<string>>;
  inputPseudoRef: RefObject<HTMLInputElement>;
}

const CreatePlayer = ({
  inputPseudo,
  setInputPseudo,
  inputPseudoRef,
}: Props): JSX.Element => (
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
      />
    </Pseudo>
  </Content>
);

export default CreatePlayer;
