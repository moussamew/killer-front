import { Fragment, ReactNode, useContext } from 'react';
import tw from 'tailwind-styled-components';

import t from '../helpers/translate';
import { PlayerContext } from '../hooks/context';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const HeaderText = tw.p`
  font-bold text-black uppercase
`;

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const { playerSession } = useContext(PlayerContext);

  return (
    <Fragment>
      <Navigation>
        <HeaderText>{t('header.project_name')}</HeaderText>
        {playerSession?.name && <HeaderText>{playerSession.name}</HeaderText>}
      </Navigation>
      {children}
    </Fragment>
  );
};

export default Layout;
