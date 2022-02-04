import { useState } from 'react';
import tw from 'tailwind-styled-components';

import Idea from '../../assets/images/idea.png';
import Button from '../../components/Button';
import { H2 } from '../../components/Heading';
import Input from '../../components/Input';
import { t } from '../../translate/helpers';

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
          <H2>{t('room.manage_missions')}</H2>
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
