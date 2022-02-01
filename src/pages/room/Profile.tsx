import { ChangeEvent, useState } from 'react';

import Card from '../../components/Card';
import { H3 } from '../../components/Heading';
import Input from '../../components/Input';

const Profile = (): JSX.Element => {
  const [currentPseudo, setCurrentPseudo] = useState('');

  const handleSetCurrentPseudo = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setCurrentPseudo(event.target.value);
  };

  return (
    <Card>
      <H3>Profile informations</H3>
      <Input
        id="updatePseudo"
        value={currentPseudo}
        onChange={handleSetCurrentPseudo}
        label="Update Pseudo"
      />
      <Input
        id="updatePasscode"
        value={currentPseudo}
        onChange={handleSetCurrentPseudo}
        label="Update Passcode"
      />
    </Card>
  );
};

export default Profile;
