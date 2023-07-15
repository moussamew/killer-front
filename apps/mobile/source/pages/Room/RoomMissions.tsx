import { type TranslationKey, useTranslation } from '@killerparty/intl';
import { useRoom } from '@killerparty/webservices';
import { Text, View } from 'react-native';

import styles from './styles/RoomMissions.module.css';

interface Props {
  roomCode: string;
}

export function RoomMissions({ roomCode }: Props): JSX.Element {
  const { room } = useRoom(roomCode);
  const { t } = useTranslation();

  const missions = room?.missions.length;

  return (
    <View style={styles.missions}>
      <Text>
        {t('room.missions.count' as TranslationKey, { count: missions })}
      </Text>
    </View>
  );
}
