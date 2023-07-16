import { useTranslation } from '@killerparty/intl';
import { useSession } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text } from 'react-native';

import { type RootStackParamList } from '../../../app/routes';
import { CurrentAvatar } from '../../../components/CurrentAvatar';
import { PlayerList } from '../Pending/PlayerList';

import { ConfirmKillButton } from './ConfirmKillButton';
import styles from './styles/index.module.css';
import { TargetMission } from './TargetMission';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayingRoom'>;

export function PlayingRoomPage({ route }: Props): JSX.Element {
  const { roomCode } = route.params;
  const { t } = useTranslation();
  const { session } = useSession();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {t('room.target.to.kill', { pseudo: session?.target?.name })}
      </Text>
      <CurrentAvatar />
      <TargetMission />
      {session?.status === 'ALIVE' && <ConfirmKillButton />}
      <PlayerList roomCode={roomCode} />
    </ScrollView>
  );
}
