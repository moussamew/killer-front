import { useTranslation } from '@killerparty/intl';
import { useRoom, useSession } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';

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
  const { session } = useSession();
  const { room } = useRoom(roomCode);

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
