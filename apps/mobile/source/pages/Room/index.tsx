import { useTranslation } from '@killerparty/intl';
import { useSession } from '@killerparty/webservices';
import { Text, View, Image } from 'react-native';

import { ShareRoomLink } from './ShareRoomLink';
import styles from './styles/index.module.css';

export function PendingRoomPage(): JSX.Element | null {
  const { session } = useSession();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/images/island.png')} />
        <View style={styles.description}>
          <Text style={styles.title}>{t('room.welcome.title')}</Text>
          <Text style={styles.joinRoomCode}>
            {t('room.join.room.code', { roomCode: session?.room?.id })}
          </Text>
          <ShareRoomLink />
          {/* <ShareRoomLink />
          <StartPartyButton /> */}
        </View>
        <View style={styles.infos}>
          {/*  <RoomMissions />
          <CanStartParty /> */}
        </View>
      </View>
      <View style={styles.features}>
        {/* <PlayerMissions />
        <PlayerList /> */}
      </View>
    </View>
  );
}
