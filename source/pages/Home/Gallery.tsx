import { Fragment } from 'react';

import { chooseAvatar } from '@/components/Avatars';

import styles from './styles/Gallery.module.css';

export function Gallery(): JSX.Element {
  return (
    <div className={styles.gallery}>
      {Object.entries(chooseAvatar).map(([name, avatar]) => (
        <Fragment key={name}>{avatar}</Fragment>
      ))}
    </div>
  );
}
