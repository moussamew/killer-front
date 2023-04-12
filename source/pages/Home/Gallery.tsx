import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { chooseAvatar } from '@/components/Avatars';
import { onEnterKey } from '@/helpers/keys';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/Gallery.module.css';

export function Gallery(): JSX.Element {
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();
  const { t } = useTranslation();

  const handleAvatarClick = (avatar: string): void => {
    if (session) {
      updatePlayer.mutate(
        { id: session?.id, avatar },
        {
          onSuccess: () =>
            toast.success(t('layout.user.update.avatar.success.message')),
        },
      );
    }
  };

  return (
    <div className={styles.gallery}>
      {Object.entries(chooseAvatar).map(([name, avatar]) => (
        <div
          role="button"
          key={name}
          onClick={() => handleAvatarClick(name)}
          onKeyDown={({ key }) =>
            onEnterKey(key, () => handleAvatarClick(name))
          }
          tabIndex={0}
        >
          {avatar}
        </div>
      ))}
    </div>
  );
}
