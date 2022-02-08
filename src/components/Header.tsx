import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import t from '../helpers/translate';
import { PlayerContext } from '../hooks/context';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const HeaderText = tw.p`
  font-bold text-black uppercase
`;

const Header = (): JSX.Element => {
  const { playerSession } = useContext(PlayerContext);

  return (
    <Navigation>
      <HeaderText>{t('header.project_name')}</HeaderText>
      {playerSession?.name && <HeaderText>{playerSession?.name}</HeaderText>}
    </Navigation>
  );
};

export default Header;
