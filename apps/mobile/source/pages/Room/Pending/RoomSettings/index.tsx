import { useTranslation } from '@killerparty/intl';
import { useSession, useUpdatePlayer } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { Button } from '../../../../components/Button';
import { RoomGuard } from '../../../../components/RoomGuard';
import { type RootStackParamList } from '../../../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomSettings'>;

export function RoomSettings({ route }: Props): JSX.Element {
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { t } = useTranslation();

  const {
    params: { roomCode, routeName },
  } = route;

  const handleLeaveRoom = (): void => {
    updatePlayer.mutate({ id: session?.id, room: null });
  };

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <View style={styles.content}>
        <LottieView
          source={require('../../../../assets/lotties/settings.json')}
          autoPlay
          style={styles.lottie}
          loop
        />
        <Button
          color="primary"
          onPress={handleLeaveRoom}
          text={t('room.leave.current.room')}
          isAsyncAction
        />
      </View>
    </RoomGuard>
  );
}
