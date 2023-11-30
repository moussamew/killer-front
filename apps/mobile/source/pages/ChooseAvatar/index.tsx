import { useTranslation } from '@killerparty/intl';
import { useUpdatePlayer } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

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

  const handleJoinRoom = async (): Promise<void> => {
    const { playerId } = route.params;

    await updatePlayer.mutateAsync({ id: playerId, avatar });

    navigation.navigate('ChooseRoom', { playerId });
  };

  return (
    <>
      <Header shouldHandlePreviousPage title="Choisir un avatar" />
      <View style={styles.view}>
        <CurrentAvatar updateAvatarCallback={setAvatar} avatar={avatar} />
        <Button color="secondary" onPress={handleJoinRoom} text="Suivant" />
      </View>
    </>
  );
}
