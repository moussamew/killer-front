import { useTranslation } from '@killerparty/intl';
import clsx from 'clsx';

import WIP from '@/assets/images/work-in-progress.png';
import { avatarList } from '@/components/Gallery';
import { type Room } from '@/services/room/types';

import styles from './styles/Ranking.module.css';

interface Props {
  room: Room | undefined;
}

export function Ranking({ room }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <h2>{t('room.ended.ranking.title')}</h2>
        <p>{t('room.ended.ranking.description')}</p>
      </div>
      {room?.players.map(({ name, avatar }) => (
        <div key={name} className={styles.item}>
          <div className={styles.player}>
            <div className={styles.avatarContent}>
              <div className={clsx(styles.avatar)}>{avatarList[avatar]}</div>
            </div>
            <h3>{name}</h3>
            <img alt="" role="presentation" src={WIP} className={styles.icon} />
          </div>
        </div>
      ))}
    </div>
  );
}
