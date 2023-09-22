import { useTranslation } from '@killerparty/intl';

import { useSession } from '@/services/player/queries';

import styles from './styles/TargetMission.module.css';

export function TargetMission(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();

  return (
    <div className={styles.content}>
      <div className={styles.mission}>
        <p>{t('room.target.mission')}</p>
        <p>
          <strong>{session?.assignedMission?.content}</strong>
        </p>
      </div>
    </div>
  );
}
