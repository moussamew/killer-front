import { type ChangeEvent, useState } from 'react';

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useTranslation } from '@/hooks/useTranslation';
import { useCreateMission } from '@/services/mission/mutations';

export function CreateMission(): JSX.Element {
  const [mission, setMission] = useState('');
  const { t } = useTranslation();
  const { createMission } = useCreateMission();

  const handleMission = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setMission(target.value);
  };

  const handleCreateMission = async (): Promise<void> => {
    await createMission.mutateAsync(mission, {
      onSuccess: () => setMission(''),
    });
  };

  return (
    <>
      <Input
        id="createMission"
        value={mission}
        onChange={handleMission}
        label={t('room.create.new.mission.label')}
        placeholder={t('room.mission.placeholder')}
      />
      <Button
        content={t('room.create.new.mission.button')}
        buttonColor="red"
        disabled={!mission}
        onClick={handleCreateMission}
        icon={<AddIcon />}
      />
    </>
  );
}
