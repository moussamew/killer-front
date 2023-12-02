import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { RoomGuard } from '../../../../components/RoomGuard';
import { type RootStackParamList } from '../../../../types/navigation';

import { CreateMission } from './CreateMission';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomMissions'>;

export function RoomMissions({ route }: Props): JSX.Element {
  const {
    params: { roomCode, routeName },
  } = route;

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <View style={styles.container}>
        <LottieView
          source={require('../../../../assets/lotties/choose-pseudo.json')}
          autoPlay
          style={styles.lottie}
          loop
        />
        <CreateMission />
      </View>
    </RoomGuard>
  );
}
