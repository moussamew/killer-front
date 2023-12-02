import { useRoom, useSession } from '@killerparty/webservices';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import Checked from '../../../../assets/icons/checked.svg';
import Dead from '../../../../assets/icons/dead.svg';
import { avatarsList } from '../../../../helpers/avatars';
import { type StackNavigation } from '../../../../types/navigation';

import { ShareRoomLink } from './ShareRoomLink';
import styles from './styles/PlayerList.module.css';

interface Props {
  roomCode: string;
}

export function PlayerList({ roomCode }: Props): JSX.Element {
  const { room } = useRoom(roomCode!);
  const { session } = useSession();

  const { navigate } = useNavigation<StackNavigation>();

  useEffect(() => {
    room?.players.forEach((player, index) => {
      if (player.id === room.admin.id) {
        room.players.splice(index, 1);
        room.players.unshift(player);
      }
    });
  }, [room?.players, room?.admin.id]);

  const isPendingRoom = room?.status === 'PENDING';

  return (
    <View style={{ ...styles.content, marginTop: isPendingRoom ? 40 : 70 }}>
      {room?.status === 'PENDING' && <ShareRoomLink roomCode={roomCode} />}
      <LottieView
        source={require('../../../../assets/lotties/players.json')}
        autoPlay
        style={styles.lottie}
        loop
      />
      <Text style={styles.title}>Liste des joueurs</Text>
      <ScrollView style={styles.scrollContent} contentInset={{ bottom: 50 }}>
        {room?.players.map(
          ({ id, name, avatar, hasAtLeastOneMission, status }) => (
            <TouchableOpacity
              disabled={session?.id === id || room.admin.id !== session?.id}
              key={name}
              onPress={() =>
                navigate('PlayerModal', {
                  player: {
                    id,
                    name,
                    avatar,
                    hasAtLeastOneMission,
                    roomCode,
                    status,
                  },
                })
              }
            >
              <View style={styles.player}>
                {avatarsList({ height: 50, width: 50 })[avatar]}
                <Text>{name}</Text>
                {status === 'ALIVE' ? (
                  <Checked
                    style={[
                      styles.icon,
                      hasAtLeastOneMission && styles.playerReady,
                    ]}
                  />
                ) : (
                  <Dead style={styles.icon} fill="red" />
                )}
              </View>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </View>
  );
}
