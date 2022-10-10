import { Fragment, useState } from 'react';
import { QueryObserverResult } from 'react-query';

import Add from '@/assets/icons/add.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { Mission } from '@/services/mission/types';

import { createMission } from './services/requests';

interface Props {
  refetchPlayerMissions: () => Promise<QueryObserverResult<Mission[], unknown>>;
}

export function CreateMission({ refetchPlayerMissions }: Props): JSX.Element {
  const [newMission, setNewMission] = useState('');

  const addMission = async (): Promise<void> => {
    await createMission(newMission)
      .then(refetchPlayerMissions)
      .then(() => {
        setNewMission('');
      });
  };

  return (
    <Fragment>
      <Input
        id="createMission"
        value={newMission}
        onChange={(e) => setNewMission(e.target.value)}
        label={t('room.create_mission')}
        placeholder={t('room.mission_input')}
      />
      <Button
        content={t('room.add_mission')}
        buttonColor="bg-red-400"
        disabled={!newMission}
        onClick={addMission}
        icon={Add}
      />
    </Fragment>
  );
}
