import { useTranslation } from '@killerparty/intl';
import { useCreateMission } from '@killerparty/webservices';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';

import { PlayerMissions } from './PlayerMissions';
import styles from './styles/CreateMission.module.css';

export function CreateMission(): JSX.Element {
  const [mission, setMission] = useState('');
  const { t } = useTranslation();
  const { createMission } = useCreateMission();

  const handleCreateMission = async (): Promise<void> => {
    await createMission.mutateAsync(mission);

    setMission('');
  };

  return (
    <View style={styles.content}>
      <PlayerMissions />
      <Input
        label="Ajouter une mission à la partie"
        value={mission}
        setValue={setMission}
      />
      <Button
        color="primary"
        disabled={!mission}
        onPress={handleCreateMission}
        text={t('room.create.new.mission.button')}
        isAsyncAction
      />
    </View>
  );
}
