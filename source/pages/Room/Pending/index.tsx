import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Island from '@/assets/images/island.png';
import { useRoom } from '@/services/room/queries';

import { CanStartParty } from './CanStartParty';
import { PlayerList } from './PlayerList';
import { PlayerMissions } from './PlayerMissions';
import { ShareRoomLink } from './ShareRoomLink';
import { StartPartyButton } from './StartPartyButton';
import styles from './styles/index.module.css';

export function PendingRoomPage(): JSX.Element | null {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { room } = useRoom(roomCode!);

  const missions = room?.missions.length;

  return (
    <>
      <div className={styles.content}>
        <img alt="island" src={Island} className={styles.image} />
        <div className={styles.description}>
          <h1>{t('room.welcome.title')}</h1>
          <p>{t('room.join.room.code', { roomCode })}</p>
          {Boolean(missions) && <p>{t('room.missions.count', { missions })}</p>}
          <ShareRoomLink />
          <StartPartyButton />
        </div>
        <CanStartParty />
      </div>
      <div className={styles.features}>
        <PlayerMissions />
        <PlayerList />
      </div>
    </>
  );
}
