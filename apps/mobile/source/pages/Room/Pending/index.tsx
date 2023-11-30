import { useTranslation } from '@killerparty/intl';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, ScrollView } from 'react-native';

import KillerParty from '../../../assets/images/killerparty.svg';
import { RoomGuard } from '../../../components/RoomGuard';
import { type RootStackParamList } from '../../../types/navigation';

import { CanStartParty } from './CanStartParty';
import { CreateMission } from './CreateMission';
import { PlayerList } from './PlayerList';
import { PlayerMissions } from './PlayerMissions';
import { RoomMissions } from './RoomMissions';
import { ShareRoomLink } from './ShareRoomLink';
import { StartPartyButton } from './StartPartyButton';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'PendingRoom'>;

export function PendingRoomPage({ route }: Props): JSX.Element | null {
  const { t } = useTranslation();
  const {
    name: routeName,
    params: { roomCode },
  } = route;

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <KillerParty height={200} width={200} style={styles.image} />
          <Text style={styles.title}>{t('room.welcome.title')}</Text>
          <Text style={styles.joinRoomCode}>
            {t('room.join.room.code', { roomCode })}
          </Text>
          <ShareRoomLink roomCode={roomCode} />
          <StartPartyButton roomCode={roomCode} />
          <CanStartParty roomCode={roomCode} />
          <RoomMissions roomCode={roomCode} />
          <PlayerMissions />
          <CreateMission />
          <PlayerList roomCode={roomCode} />
        </View>
      </ScrollView>
    </RoomGuard>
  );
}
