import { Trans, useTranslation } from 'react-i18next';

import Glasses from '@/assets/images/glasses.png';
import { PlayerStatus } from '@/services/player/constants';
import { useSession } from '@/services/player/queries';

import styles from './styles/Status.module.css';

export function Status(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();

  return (
    <div className={styles.content}>
      <img alt="party" src={Glasses} className={styles.image} />
      {session?.status === PlayerStatus.KILLED ? (
        <>
          <h2>{t('room.player.killed.title')}</h2>
          <p>{t('room.player.killed.resume')}</p>
        </>
      ) : (
        <>
          <h2 className={styles.title}>{t('room.target.title')}</h2>
          <div className={styles.target}>
            <p>
              <Trans
                t={t}
                i18nKey={t('room.target.to.kill', {
                  pseudo: session?.target?.name,
                })}
              />
            </p>
          </div>
          <div className={styles.mission}>
            <p>{t('room.target.mission')}</p>
            <p>
              <strong>{session?.assignedMission?.content}</strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
