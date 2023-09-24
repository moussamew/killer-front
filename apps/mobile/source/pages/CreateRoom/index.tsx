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
  const [avatar, setAvatar] = useState(getRandomAvatar());
  const { t } = useTranslation();
  const { createRoom } = useCreateRoom();
  const { createPlayer } = useCreatePlayer();

  const handleCreateRoom = async (): Promise<void> => {
    await createPlayer.mutateAsync(
      { name: pseudo, avatar },
      { onSuccess: () => createRoom.mutate() },
    );
  };

  return (
    <View style={styles.view}>
      <CurrentAvatar updateAvatarCallback={setAvatar} avatar={avatar} />
      <View style={styles.content}>
        <Text style={styles.label}>{t('home.create.pseudo.label')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPseudo}
          placeholder={t('home.create.pseudo.placeholder')}
          value={pseudo}
          clearButtonMode="always"
          enterKeyHint="done"
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
