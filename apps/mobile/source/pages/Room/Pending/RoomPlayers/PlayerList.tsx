import { useRoom, useSession, useUpdatePlayer } from '@killerparty/webservices';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import Checked from '../../../../assets/icons/checked.svg';
import Delete from '../../../../assets/icons/delete.svg';
import { avatarsList } from '../../../../helpers/avatars';

import styles from './styles/PlayerList.module.css';

interface Props {
  roomCode: string;
}

export function PlayerList({ roomCode }: Props): JSX.Element {
  const { room } = useRoom(roomCode!);
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();

  useEffect(() => {
    room?.players.forEach((player, index) => {
      if (player.id === room.admin.id) {
        room.players.splice(index, 1);
        room.players.unshift(player);
      }
    });
  }, [room?.players, room?.admin.id]);

  const handleKickPlayer = (playerId: number): void => {
    updatePlayer.mutate({ id: playerId, room: null });
  };

  return (
    <View style={styles.content}>
      <LottieView
        source={require('../../../../assets/lotties/players.json')}
        autoPlay
        style={styles.lottie}
        loop
      />
      <Text style={styles.title}>Liste des joueurs de la partie</Text>
      <ScrollView style={styles.scrollContent} contentInset={{ bottom: 50 }}>
        {room?.players.map(({ id, name, avatar, hasAtLeastOneMission }) => (
          <TouchableOpacity
            disabled={session?.id === id || room.admin.id !== session?.id}
            key={name}
            onPress={() => {}}
          >
            <View style={styles.player}>
              {avatarsList({ height: 50, width: 50 })[avatar]}
              <Text>{name}</Text>
              <Checked
                style={[
                  styles.icon,
                  hasAtLeastOneMission && styles.playerReady,
                ]}
              />
            </View>
            {room.admin.id === session?.id && session?.name !== name && (
              <Delete
                style={styles.kickPlayer}
                onClick={() => handleKickPlayer(id)}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
