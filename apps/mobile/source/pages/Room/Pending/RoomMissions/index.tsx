import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { ScrollView, View } from 'react-native';

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
      <ScrollView>
        <View style={styles.container}>
          <LottieView
            source={require('../../../../assets/lotties/create-mission.json')}
            autoPlay
            style={styles.lottie}
            loop
          />
          <CreateMission />
        </View>
      </ScrollView>
    </RoomGuard>
  );
}
