import { avatarList } from '@/components/Gallery';
import { type Player } from '@/services/player/types';

import styles from './styles/CurrentAvatar.module.css';

interface Props {
  winner: Player;
}

export function CurrentAvatar({ winner }: Props): JSX.Element {
  return (
    <div className={styles.content}>
      <div className={styles.avatar}>{avatarList[winner.avatar]}</div>
    </div>
  );
}
