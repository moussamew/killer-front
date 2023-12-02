import { useTranslation } from '@killerparty/intl';
import { useCreateMission } from '@killerparty/webservices';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Button } from '../../../../components/Button';

import styles from './styles/CreateMission.module.css';

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
    <View>
      <Text style={styles.label}>{t('room.create.new.mission.label')}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMission}
        placeholder={t('room.mission.placeholder')}
        value={mission}
        clearButtonMode="always"
        enterKeyHint="done"
      />
      <Button
        color="secondary"
        onPress={handleCreateMission}
        text={t('room.create.new.mission.button')}
      />
    </View>
  );
}
