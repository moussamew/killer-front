import { useTranslation } from '@killerparty/intl';
import { useSession } from '@killerparty/webservices';
import { Text, View } from 'react-native';
/* import { useParams } from 'react-router-dom'; */

/* import Island from '@/assets/images/island.png'; */

import styles from './styles/index.module.css';

export function PendingRoomPage(): JSX.Element | null {
  const { session } = useSession();
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.content}>
        {/*         <img alt="island" src={Island} className={styles.image} /> */}
        <View style={styles.description}>
          <Text>{t('room.welcome.title')}</Text>
          <Text>
            {t('room.join.room.code', { roomCode: session?.room?.id })}
          </Text>

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
    </>
  );
}
