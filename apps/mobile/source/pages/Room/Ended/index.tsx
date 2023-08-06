import { useTranslation } from '@killerparty/intl';
import { useSession, useUpdatePlayer } from '@killerparty/webservices';
import { View } from 'react-native';

import { Button } from '../../../components/Button';

import styles from './styles/index.module.css';

export function EndedRoomPage(): JSX.Element {
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { t } = useTranslation();

  const handleLeaveRoom = (): void => {
    updatePlayer.mutate({ id: session?.id, room: null });
  };

  return (
    <View style={styles.container}>
      <Button
        color="secondary"
        onPress={handleLeaveRoom}
        text={t('room.play.another.party.button')}
      />
    </View>
  );
}
