import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Checked from '@/assets/icons/checked.svg';
import Unchecked from '@/assets/icons/unchecked.svg';
import { useRoom } from '@/services/room/queries';

import styles from './styles/CanStartParty.module.css';

export function CanStartParty(): JSX.Element {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { t } = useTranslation();

  const allPlayersHasProposedMission = room?.players.every(
    ({ hasAtLeastOneMission }) => hasAtLeastOneMission,
  );

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{t('room.start.party.conditions')}</h3>
      <div
        className={clsx(styles.condition, {
          [styles.checked]: room?.hasEnoughPlayers,
        })}
      >
        {room?.hasEnoughPlayers ? (
          <Checked className={styles.icon} />
        ) : (
          <Unchecked className={styles.icon} />
        )}
        <p>{t('room.start.party.three.players.condition')}</p>
      </div>
      <div
        className={clsx(styles.condition, {
          [styles.checked]: room?.hasEnoughMissions,
        })}
      >
        {room?.hasEnoughMissions ? (
          <Checked className={styles.icon} />
        ) : (
          <Unchecked className={styles.icon} />
        )}
        <p>{t('room.start.party.same.missions.as.players.condition')}</p>
      </div>
      <div
        className={clsx(styles.condition, {
          [styles.checked]: allPlayersHasProposedMission,
        })}
      >
        {allPlayersHasProposedMission ? (
          <Checked className={styles.icon} />
        ) : (
          <Unchecked className={styles.icon} />
        )}
        <p>{t('room.start.party.each.player.has.mission.condition')}</p>
      </div>
    </div>
  );
}
