import { ChangeEvent, Fragment, useState } from 'react';

import Add from '@/assets/icons/add.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { useCreateMission } from '@/services/mission/mutations';

export function CreateMission(): JSX.Element {
  const [mission, setMission] = useState('');
  const { createMission } = useCreateMission();

  /*   const addMission = async (): Promise<void> => {
    await createMission(newMission)
      .then(refetchPlayerMissions)
      .then(() => {
        setNewMission('');
      });
  }; */

  const handleMission = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setMission(target.value.toUpperCase());
  };

  const handleCreateMission = (): void => {
    createMission.mutate(mission, { onSuccess: () => setMission('') });
  };

  return (
    <Fragment>
      <Input
        id="createMission"
        value={mission}
        onChange={handleMission}
        label={t('room.create_mission')}
        placeholder={t('room.mission_input')}
      />
      <Button
        content={t('room.add_mission')}
        buttonColor="bg-red-400"
        disabled={!mission}
        onClick={handleCreateMission}
        icon={Add}
      />
    </Fragment>
  );
}
