import { useContext } from 'react';

import { UserContext } from '../../hooks/context';

import { Navigation, Text } from './styles';

const Header = (): JSX.Element => {
  const { pseudo } = useContext(UserContext);

  return (
    <Navigation>
      <Text>KILLER PARTY</Text>
      {pseudo && <Text>{pseudo}</Text>}
    </Navigation>
  );
};

export default Header;
