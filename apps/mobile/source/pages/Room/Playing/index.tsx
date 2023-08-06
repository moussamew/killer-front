import { useTranslation } from '@killerparty/intl';
import {
  type Room,
  ROOM_TOPIC,
  useRoom,
  useSession,
} from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import EventSource from 'react-native-sse';

import { type RootStackParamList } from '../../../app/routes';
import { CurrentAvatar } from '../../../components/CurrentAvatar';
import { getRandomAvatar } from '../../../helpers/avatars';
import { PlayerList } from '../Pending/PlayerList';

import { ConfirmKillButton } from './ConfirmKillButton';
import styles from './styles/index.module.css';
import { TargetMission } from './TargetMission';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayingRoom'>;

export function PlayingRoomPage({ route }: Props): JSX.Element {
  const { roomCode } = route.params;
  const { t } = useTranslation();
  const [targetAvatar, setTargetAvatar] = useState(getRandomAvatar());
  const { session, refetchSession } = useSession();
  const { room, refetchRoom } = useRoom(roomCode);

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

  // Temporary useEffect to retrieve the avatar of the target because BE doesn't prove it yet.
  useEffect(() => {
    const target = room?.players.find(({ id }) => id === session?.target?.id);

    if (target?.avatar) {
      setTargetAvatar(target.avatar);
    }
  }, [room?.players, session?.target?.id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {t('room.target.to.kill', { pseudo: session?.target?.name })}
      </Text>
      <CurrentAvatar avatar={targetAvatar} />
      <TargetMission />
      {session?.status === 'ALIVE' && <ConfirmKillButton />}
      <PlayerList roomCode={roomCode} />
    </ScrollView>
  );
}
