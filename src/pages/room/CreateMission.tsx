import { useState } from 'react';
import { QueryObserverResult } from 'react-query';

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

        if (errorMessage) {
          setErrorMessage('');
        }
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <div>
      <Input
        id="createMission"
        value={newMission}
        onChange={(e) => setNewMission(e.target.value)}
        label={t('room.create_mission')}
        placeholder={t('room.mission_input')}
        errorMessage={errorMessage}
      />
      <Button
        buttonColor="bg-red-400"
        disabled={!newMission}
        onClick={addMission}
      >
        {t('room.add_mission')}
      </Button>
    </div>
  );
};

export default CreateMission;
