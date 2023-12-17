import clsx from 'clsx';

import Checked from '@/assets/icons/checked.svg';
import Avenger from '@/assets/images/avatars/avenger.svg';
import Beach from '@/assets/images/avatars/beach.svg';
import Captain from '@/assets/images/avatars/captain.svg';
import Football from '@/assets/images/avatars/football.svg';
import Gladiator from '@/assets/images/avatars/gladiator.svg';
import Jedi from '@/assets/images/avatars/jedi.svg';
import Milk from '@/assets/images/avatars/milk.svg';
import Pirate from '@/assets/images/avatars/pirate.svg';
import Samurai from '@/assets/images/avatars/samurai.svg';
import Surf from '@/assets/images/avatars/surf.svg';
import { onEnterKey } from '@/helpers/keys';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/Gallery.module.css';

export const avatarList: Record<string, JSX.Element> = {
  avenger: <Avenger />,
  beach: <Beach />,
  captain: <Captain />,
  football: <Football />,
  gladiator: <Gladiator />,
  jedi: <Jedi />,
  milk: <Milk />,
  pirate: <Pirate />,
  samurai: <Samurai />,
  surf: <Surf />,
};

interface Props {
  playerId?: number;
}

export function Gallery({ playerId }: Props): JSX.Element {
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();

  const handleAvatarClick = (avatar: string): void => {
    if (session || playerId) {
      updatePlayer.mutate({ id: playerId ?? session?.id, avatar });
    }
  };

  return (
    <div className={styles.gallery}>
      {Object.entries(avatarList).map(([name, avatar]) => (
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
