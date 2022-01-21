import { useContext } from 'react';

import { PlayerContext } from '../../hooks/context';

import { Navigation, Text } from './styles';

const Header = (): JSX.Element => {
  const { playerSession } = useContext(PlayerContext);

  return (
    <Navigation>
      <Text>KILLER PARTY</Text>
      {playerSession?.name && <Text>{playerSession?.name}</Text>}
    </Navigation>
  );
};

export default Header;
