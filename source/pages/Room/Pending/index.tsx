import { useParams } from 'react-router-dom';

import Island from '@/assets/images/island.png';
import { useTranslation } from '@/hooks/useTranslation';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { PlayerList } from './PlayerList';
import { PlayerMissions } from './PlayerMissions';
import { RoomMissions } from './RoomMissions';
import { ShareRoomLink } from './ShareRoomLink';
import { StartPartyButton } from './StartPartyButton';
import styles from './styles/index.module.css';

export function PendingRoomPage(): JSX.Element | null {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { session } = useSession();
  const { room } = useRoom(roomCode!);

  return (
    <>
      <div className={styles.content}>
        <img alt="island" src={Island} className={styles.image} />
        <div className={styles.description}>
          <h1>{t('room.welcome.title')}</h1>
          <p>{t('room.join.room.code', { roomCode })}</p>
          <RoomMissions />
          <ShareRoomLink />
          {session?.id === room?.admin.id && <StartPartyButton />}
        </div>
      </div>
      <div className={styles.features}>
        <PlayerMissions />
        <PlayerList />
      </div>
    </>
  );
}
