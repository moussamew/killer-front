import { useTranslation } from '@killerparty/intl';
import {
  useCreatePlayer,
  useSession,
  useUpdatePlayer,
} from '@killerparty/webservices';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Button } from '../../components/Button';
import { CurrentAvatar } from '../../components/CurrentAvatar';
import { getRandomAvatar } from '../../helpers/avatars';

import styles from './styles/index.module.css';

export function JoinRoomPage(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const [avatar, setAvatar] = useState(getRandomAvatar());
  const [roomCode, setRoomCode] = useState('');
  const { t } = useTranslation();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();

  const handleJoinRoom = (): void => {
    if (session) {
      updatePlayer.mutate({
        id: session?.id,
        room: roomCode,
        name: pseudo,
        avatar,
      });
    } else {
      createPlayer.mutate(
        { name: pseudo, avatar },
        { onSuccess: ({ id }) => updatePlayer.mutate({ id, room: roomCode }) },
      );
    }
  };

  return (
    <View style={styles.view}>
      <CurrentAvatar updateAvatarCallback={setAvatar} avatar={avatar} />
      <View style={styles.inputContent}>
        <Text style={styles.label}>{t('home.create.pseudo.label')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPseudo}
          placeholder={t('home.create.pseudo.placeholder')}
          value={pseudo}
        />
      </View>
      <View style={styles.inputContent}>
        <Text style={styles.label}>{t('home.join.room.code.label')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setRoomCode}
          placeholder={t('home.join.room.code.placeholder')}
          value={roomCode}
        />
      </View>
      <Button
        color="primary"
        onPress={handleJoinRoom}
        text={t('home.join.room.confirm.button')}
      />
    </View>
  );
}
