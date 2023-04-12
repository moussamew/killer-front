import { AVATARS } from '@/constants/avatars';

import styles from './styles/Gallery.module.css';

export function Gallery(): JSX.Element {
  return (
    <div className={styles.gallery}>
      {Object.values(AVATARS).map((avatar) => avatar)}
    </div>
  );
}
