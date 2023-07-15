import { useTranslation } from '@killerparty/intl';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Image } from 'react-native';

import { type RootStackParamList } from '../../app/routes';

import { CanStartParty } from './CanStartParty';
import { RoomMissions } from './RoomMissions';
import { ShareRoomLink } from './ShareRoomLink';
import { StartPartyButton } from './StartPartyButton';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'Room'>;

export function PendingRoomPage({ route }: Props): JSX.Element | null {
  const { t } = useTranslation();

  const { roomCode } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/island.png')}
          style={styles.image}
        />
        <Text style={styles.title}>{t('room.welcome.title')}</Text>
        <Text style={styles.joinRoomCode}>
          {t('room.join.room.code', { roomCode })}
        </Text>
        <ShareRoomLink />
        <StartPartyButton />
        <RoomMissions roomCode={roomCode} />
        <CanStartParty roomCode={roomCode} />
      </View>
      <View style={styles.features}>
        {/* <PlayerMissions />
        <PlayerList /> */}
      </View>
    </View>
  );
}
