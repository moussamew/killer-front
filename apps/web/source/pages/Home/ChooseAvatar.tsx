import { useTranslation } from '@killerparty/intl';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { Gallery, avatarList } from '@/components/Gallery';
import { useSession } from '@/services/player/queries';

import styles from './styles/ChooseAvatar.module.css';

export function ChooseAvatar(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();
  const { state: route } = useLocation();
  const navigate = useNavigate();

  return (
    <FullScreenModal
      title={t('home.create.avatar.title')}
      onClose={() => navigate('/')}
      hideBackButton={false}
    >
      <>
        <div className={styles.avatar}>
          {session?.avatar && avatarList[session.avatar]}
        </div>
        <Gallery />
        <Button
          color="secondary"
          onClick={() => navigate(`/${route}`)}
          customStyle={styles.button}
        >
          {t('action.next.button')}
        </Button>
      </>
    </FullScreenModal>
  );
}
