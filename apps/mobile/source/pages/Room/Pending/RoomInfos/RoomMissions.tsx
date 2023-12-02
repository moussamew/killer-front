import { type TranslationKey, useTranslation } from '@killerparty/intl';
import { useRoom } from '@killerparty/webservices';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

import { type StackNavigation } from '../../../../types/navigation';

import styles from './styles/RoomMissions.module.css';

interface Props {
  roomCode: string;
}

export function RoomMissions({ roomCode }: Props): JSX.Element | null {
  const { room } = useRoom(roomCode);
  const { t } = useTranslation();
  const { navigate } = useNavigation<StackNavigation>();

  const missions = room?.missions.length;

  return (
    <TouchableOpacity
      style={styles.missions}
      onPress={() =>
        navigate('PendingRoom', {
          screen: 'RoomMissions',
          params: {
            roomCode,
            routeName: 'PendingRoom',
          },
        })
      }
    >
      <Text style={styles.text}>
        {t('room.missions.count' as TranslationKey, { count: missions })}
      </Text>
    </TouchableOpacity>
  );
}
