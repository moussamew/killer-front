import { useTranslation } from '@killerparty/intl';
import { useCreatePlayer, useCreateRoom } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Button } from '../../components/Button';
import { CurrentAvatar } from '../../components/CurrentAvatar';
import { getRandomAvatar } from '../../helpers/avatars';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateRoom'>;

export function CreateRoomPage({ navigation }: Props): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const [avatar, setAvatar] = useState(getRandomAvatar());
  const { t } = useTranslation();
  const { createRoom } = useCreateRoom();
  const { createPlayer } = useCreatePlayer();

  const handleCreateRoom = async (): Promise<void> => {
    await createPlayer.mutateAsync(
      { name: pseudo, avatar },
      {
        onSuccess: () =>
          createRoom.mutate(undefined, {
            onSuccess: ({ id }) =>
              navigation.reset({
                routes: [{ name: 'PendingRoom', params: { roomCode: id } }],
              }),
          }),
      },
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
