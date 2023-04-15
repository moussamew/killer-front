import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useCreateMission } from '@/services/mission/mutations';

export function CreateMission(): JSX.Element {
  const [mission, setMission] = useState('');
  const { t } = useTranslation();
  const { createMission } = useCreateMission();

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
        onChange={({ target }) => setMission(target.value)}
        label={t('room.create.new.mission.label')}
        placeholder={t('room.mission.placeholder')}
      />
      <Button color="secondary" onClick={handleCreateMission}>
        {t('room.create.new.mission.button')}
      </Button>
    </>
  );
}
