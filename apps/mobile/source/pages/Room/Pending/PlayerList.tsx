import { useTranslation } from '@killerparty/intl';
import { useRoom, useSession, useUpdatePlayer } from '@killerparty/webservices';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

import Checked from '../../../assets/icons/checked.svg';
import Delete from '../../../assets/icons/delete.svg';
import { Button } from '../../../components/Button';
import { avatarsList } from '../../../helpers/avatars';

import styles from './styles/PlayerList.module.css';

interface Props {
  roomCode: string;
}

export function PlayerList({ roomCode }: Props): JSX.Element {
  const { room } = useRoom(roomCode!);
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();
  const { t } = useTranslation();

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

  const handleLeaveRoom = (): void => {
    updatePlayer.mutate({ id: session?.id, room: null });
  };

  return (
    <View style={styles.content}>
      {room?.players.map(({ id, name, avatar, hasAtLeastOneMission }) => (
        <View key={name} style={styles.item}>
          <View style={styles.player}>
            <View style={styles.avatarContent}>
              <View
                style={[
                  styles.avatar,
                  session?.id === id && styles.currentPlayer,
                  session?.id !== id && styles.otherPlayer,
                  room.admin.id === id && styles.adminPlayer,
                ]}
              >
                {avatarsList({ height: 50, width: 50 })[avatar]}
              </View>
            </View>
            <Text>{name}</Text>
            <Checked
              style={[styles.icon, hasAtLeastOneMission && styles.playerReady]}
            />
          </View>
          {room.admin.id === session?.id && session?.name !== name && (
            <Delete
              style={styles.kickPlayer}
              title={t('tooltip.kick.player', { playerName: name })}
              onClick={() => handleKickPlayer(id)}
            />
          )}
        </View>
      ))}
      <Button
        color="primary"
        onPress={handleLeaveRoom}
        text={t('room.leave.current.room')}
      />
    </View>
  );
}
