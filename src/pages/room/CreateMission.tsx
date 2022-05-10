import { Fragment, useState } from 'react';
import { QueryObserverResult } from 'react-query';

import Add from '@/assets/icons/add.svg';
import { Button, Input } from '@/components';
import t from '@/helpers/translate';
import { Mission } from '@/types';

import { createMission } from './services/requests';

interface Props {
  refetchPlayerMissions: () => Promise<QueryObserverResult<Mission[], unknown>>;
}

const CreateMission = ({ refetchPlayerMissions }: Props): JSX.Element => {
  const [newMission, setNewMission] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const addMission = async (): Promise<void> => {
    await createMission(newMission)
      .then(() => refetchPlayerMissions())
      .then(() => {
        setNewMission('');
        setErrorMessage('');
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <Fragment>
      <Input
        id="createMission"
        value={newMission}
        onChange={(e) => setNewMission(e.target.value)}
        label={t('room.create_mission')}
        placeholder={t('room.mission_input')}
        errorMessage={errorMessage}
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
};

export default CreateMission;
