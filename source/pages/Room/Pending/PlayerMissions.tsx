import { useTranslation } from 'react-i18next';

import Delete from '@/assets/icons/delete.svg';
import Idea from '@/assets/images/idea.png';
import { useDeleteMission } from '@/services/mission/mutations';
import { useSession } from '@/services/player/queries';

import { CreateMission } from './CreateMission';
import styles from './styles/PlayerMissions.module.css';

export function PlayerMissions(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();
  const { deleteMission } = useDeleteMission();

  const handleDeleteMission = (missionId: number) => (): void => {
    deleteMission.mutate(missionId);
  };

  return (
    <div className={styles.content}>
      <div className={styles.missions}>
        <img alt="missions" src={Idea} className={styles.image} />
        <div>
          <h2>{t('room.manage.missions')}</h2>
          <p>{t('room.missions.description')}</p>
        </div>
      </div>
      <div className={styles.cards}>
        {session?.authoredMissions.map(({ id, content }) => (
          <div key={`${id}-${content}`} className={styles.card}>
            <span>{content}</span>
            <Delete
              title={t('tooltip.delete.mission')}
              onClick={handleDeleteMission(id)}
              className={styles.deleteMission}
            />
          </div>
        ))}
      </div>
      <CreateMission />
    </div>
  );
}
