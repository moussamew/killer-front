import { useTranslation } from '@killerparty/intl';
import { useParams } from 'react-router-dom';

import Island from '@/assets/images/island.png';
import { PlayerStatus } from '@/services/player/constants';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { CanStartParty } from './CanStartParty';
import { PlayerList } from './PlayerList';
import { PlayerMissions } from './PlayerMissions';
import { RoomMissions } from './RoomMissions';
import { ShareRoomLink } from './ShareRoomLink';
import { StartPartyButton } from './StartPartyButton';
import styles from './styles/index.module.css';

export function PendingRoomPage(): JSX.Element | null {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { session } = useSession();

  const { t } = useTranslation();

  const canAddMissionsToRoom =
    !room?.isGameMastered ||
    (room?.isGameMastered && session?.status === PlayerStatus.SPECTATING);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.description}>
          <h1>{t('room.welcome.title')}</h1>
          <p>{t('room.join.room.code', { roomCode })}</p>
          <ShareRoomLink />
          <StartPartyButton />
        </div>
        <div className={styles.infos}>
          <RoomMissions />
          <CanStartParty />
        </div>
      </div>
      <div className={styles.features}>
        {canAddMissionsToRoom && <PlayerMissions />}
        <PlayerList />
      </div>
    </>
  );
}
