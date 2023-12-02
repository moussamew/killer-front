import { useTranslation } from '@killerparty/intl';
import { useCreateRoom, useUpdatePlayer } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '../../components/Button';
import { CurrentAvatar } from '../../components/CurrentAvatar';
import { Header } from '../../components/Header';
import { getRandomAvatar } from '../../helpers/avatars';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseAvatar'>;

export function ChooseAvatar({ navigation, route }: Props): JSX.Element {
  const [avatar, setAvatar] = useState(getRandomAvatar());
  const { updatePlayer } = useUpdatePlayer();
  const { createRoom } = useCreateRoom();
  const { t } = useTranslation();

  const { playerId, shouldCreateRoom } = route.params;

  const handleNextPage = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: playerId, avatar });

    if (shouldCreateRoom) {
      const { id } = await createRoom.mutateAsync();

      return navigation.reset({
        routes: [{ name: 'PendingRoom', params: { roomCode: id } }],
      });
    }

    return navigation.navigate('ChooseRoom', { playerId });
  };

  return (
    <View style={styles.content}>
      <Header shouldHandlePreviousPage title="Choisir un avatar" />
      <View style={styles.view}>
        <CurrentAvatar updateAvatarCallback={setAvatar} avatar={avatar} />
        <Button
          color="primary"
          onPress={handleNextPage}
          text={
            shouldCreateRoom ? t('home.create.room.confirm.button') : 'Suivant'
          }
          isAsyncAction
        />
      </View>
    </View>
  );
}
