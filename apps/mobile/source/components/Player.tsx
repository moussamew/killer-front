import { type Session } from '@killerparty/webservices';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

import Checked from '../assets/icons/checked.svg';
import { avatarsList } from '../helpers/avatars';
import { type StackNavigation } from '../types/navigation';

import styles from './styles/Player.module.css';

interface Props {
  session: Session;
}

export function Player({ session }: Props): JSX.Element {
  const { navigate } = useNavigation<StackNavigation>();

  return (
    <TouchableOpacity
      style={styles.player}
      onPress={() =>
        navigate('PendingRoom', {
          screen: 'RoomPlayers',
          params: {
            roomCode: session.room?.id,
            routeName: 'PendingRoom',
          },
        })
      }
    >
      {avatarsList({ height: 50, width: 50 })[session.avatar]}
      <Text>{session?.name}</Text>
      <Checked
        style={[
          styles.icon,
          session.authoredMissions.length && styles.playerReady,
        ]}
      />
    </TouchableOpacity>
  );
}
