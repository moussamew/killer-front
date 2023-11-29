import { useTranslation } from '@killerparty/intl';
import { useCreatePlayer, useUpdatePlayer } from '@killerparty/webservices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Button } from '../../components/Button';
import { CurrentAvatar } from '../../components/CurrentAvatar';
import { getRandomAvatar } from '../../helpers/avatars';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'JoinRoom'>;

export function JoinRoomPage({ navigation }: Props): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const [avatar, setAvatar] = useState(getRandomAvatar());
  const [roomCode, setRoomCode] = useState('');
  const { t } = useTranslation();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();

  const handleJoinRoom = async (): Promise<void> => {
    const { id } = await createPlayer.mutateAsync({ name: pseudo, avatar });

    await updatePlayer.mutateAsync({ id, room: roomCode });

    navigation.reset({
      routes: [{ name: 'PendingRoom', params: { roomCode } }],
    });
  };

  return (
    <View style={styles.view}>
      <CurrentAvatar updateAvatarCallback={setAvatar} avatar={avatar} />
      <View style={styles.inputContent}>
        <View>
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
        <View>
          <Text style={styles.label}>{t('home.join.room.code.label')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRoomCode}
            placeholder={t('home.join.room.code.placeholder')}
            value={roomCode}
            clearButtonMode="always"
            enterKeyHint="done"
          />
        </View>
      </View>
      <Button
        color="primary"
        onPress={handleJoinRoom}
        text={t('home.join.room.confirm.button')}
      />
      <Button
        color="secondary"
        onPress={() => AsyncStorage.clear()}
        text="Clear storage"
      />
    </View>
  );
}
