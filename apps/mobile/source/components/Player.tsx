import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

import Checked from '../assets/icons/checked.svg';
import Dead from '../assets/icons/dead.svg';
import { avatarsList } from '../helpers/avatars';
import { type StackNavigation } from '../types/navigation';

import styles from './styles/Player.module.css';

interface Props {
  player: {
    id: number;
    name: string;
    avatar: string;
    hasAtLeastOneMission: boolean;
    roomCode: string;
    status: string;
  };
}

export function Player({ player }: Props): JSX.Element {
  const { navigate } = useNavigation<StackNavigation>();

  return (
    <TouchableOpacity
      style={styles.player}
      onPress={() =>
        navigate('PendingRoom', {
          screen: 'RoomPlayers',
          params: {
            roomCode: player.roomCode,
            routeName: 'PendingRoom',
          },
        })
      }
    >
      {avatarsList({ height: 50, width: 50 })[player.avatar]}
      <Text>{player.name}</Text>
      {player.status === 'ALIVE' ? (
        <Checked
          style={[
            styles.icon,
            player.hasAtLeastOneMission && styles.playerReady,
          ]}
        />
      ) : (
        <Dead style={styles.playerReady} fill="red" />
      )}
    </TouchableOpacity>
  );
}
