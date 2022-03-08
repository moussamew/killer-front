import { useState } from 'react';
import tw from 'tailwind-styled-components';

import Idea from 'assets/images/idea.png';
import { Input, Button } from 'components';
import t from 'helpers/translate';

const Section = tw.div`
  flex flex-row items-center 
  mb-2
`;

const Image = tw.img`
  h-7 mr-1
`;

const Spacer = tw.div`
  my-1
`;

const Missions = (): JSX.Element | null => {
  const [mission, createMission] = useState('');

  return (
    <div>
      <Section>
        <Image alt="missions" src={Idea} />
        <div>
          <h2>{t('room.manage_missions')}</h2>
          <p>{t('room.missions_description')}</p>
        </div>
      </Section>
      <hr />
      <div>
        <Input
          id="createMission"
          value={mission}
          onChange={(e): void => createMission(e.target.value)}
          label={t('room.create_mission')}
          placeholder={t('room.mission_input')}
        />
        <Spacer />
        <Button buttonColor="bg-red-400">{t('room.add_mission')}</Button>
      </div>
    </div>
  );
};

export default Missions;
