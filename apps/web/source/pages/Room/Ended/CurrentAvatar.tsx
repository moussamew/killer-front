import { avatarList } from '@/components/Gallery';
import { getRandomAvatar } from '@/constants/avatars';

import styles from './styles/CurrentAvatar.module.css';

interface Props {
  avatar?: string;
}

export function CurrentAvatar({ avatar }: Props): JSX.Element {
  return (
    <div className={styles.content}>
      <div className={styles.avatar}>
        {avatarList[avatar ?? getRandomAvatar()]}
      </div>
    </div>
  );
}
