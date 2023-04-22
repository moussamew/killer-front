import clsx from 'clsx';

import Checked from '@/assets/icons/checked.svg';
import { chooseAvatar } from '@/components/Avatars';
import { onEnterKey } from '@/helpers/keys';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/Gallery.module.css';

export function Gallery(): JSX.Element {
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();

  const handleAvatarClick = (avatar: string): void => {
    if (session) {
      updatePlayer.mutate({ id: session?.id, avatar });
    }
  };

  return (
    <div className={styles.gallery}>
      {Object.entries(chooseAvatar).map(([name, avatar]) => (
        <div key={name} className={styles.content}>
          <div
            role="button"
            onClick={() => handleAvatarClick(name)}
            onKeyDown={({ key }) =>
              onEnterKey(key, () => handleAvatarClick(name))
            }
            tabIndex={0}
            className={clsx(styles.avatar, {
              [styles.selected]: session?.avatar === name,
            })}
          >
            {avatar}
          </div>
          {session?.avatar === name && <Checked className={styles.checked} />}
        </div>
      ))}
    </div>
  );
}
