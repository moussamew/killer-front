import { useTranslation } from '@killerparty/intl';
import { useCreatePlayer, useCreateRoom } from '@killerparty/webservices';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Button } from '../../components/Button';
import { CurrentAvatar } from '../../components/CurrentAvatar';
import { getRandomAvatar } from '../../helpers/avatars';

import styles from './styles/index.module.css';

export function CreateRoomPage(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { t } = useTranslation();
  const { createRoom } = useCreateRoom();
  const { createPlayer } = useCreatePlayer();

  const handleCreateRoom = async (): Promise<void> => {
    await createPlayer.mutateAsync(
      { name: pseudo, avatar: getRandomAvatar() },
      { onSuccess: () => createRoom.mutate() },
    );
  };

  return (
    <View style={styles.view}>
      <CurrentAvatar />
      <View style={styles.content}>
        <Text style={styles.label}>{t('home.create.pseudo.label')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPseudo}
          placeholder={t('home.create.pseudo.placeholder')}
          value={pseudo}
        />
      </View>
      <Button
        color="primary"
        onPress={handleCreateRoom}
        text={t('home.create.room.confirm.button')}
      />
    </View>
  );
}
