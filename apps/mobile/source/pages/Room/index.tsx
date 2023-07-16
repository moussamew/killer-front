import { useTranslation } from '@killerparty/intl';
import {
  ROOM_TOPIC,
  type Room,
  useRoom,
  useSession,
} from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import EventSource from 'react-native-sse';

import { type RootStackParamList } from '../../app/routes';

import { CanStartParty } from './CanStartParty';
import { CreateMission } from './CreateMission';
import { PlayerList } from './PlayerList';
import { PlayerMissions } from './PlayerMissions';
import { RoomMissions } from './RoomMissions';
import { ShareRoomLink } from './ShareRoomLink';
import { StartPartyButton } from './StartPartyButton';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'Room'>;

export function PendingRoomPage({ route }: Props): JSX.Element | null {
  const { t } = useTranslation();
  const { roomCode } = route.params;
  const { session, refetchSession } = useSession();
  const { refetchRoom } = useRoom(roomCode);

  /**
   * Listen to SSE events emits in the Room page.
   */
  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`);

    roomEventSource.addEventListener('message', (event) => {
      if (event.type === 'message' && event.data) {
        const roomInfos: Room = JSON.parse(event.data);

        const isPlayerInRoom = roomInfos.players.some(
          ({ id }) => id === session?.id,
        );

        if (isPlayerInRoom) {
          refetchRoom().then(refetchSession);
        } else {
          refetchSession();
        }
      }
    });

    return () => roomEventSource.close();
  }, [roomCode, session?.id, refetchSession, refetchRoom]);

  return (
    <ScrollView style={styles.container}>
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
        <StartPartyButton roomCode={roomCode} />
        <CanStartParty roomCode={roomCode} />
        <RoomMissions roomCode={roomCode} />
        <PlayerMissions />
        <CreateMission />
        <PlayerList roomCode={roomCode} />
      </View>
    </ScrollView>
  );
}
