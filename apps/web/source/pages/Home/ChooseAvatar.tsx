import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { Gallery, avatarList } from '@/components/Gallery';
import { useSession } from '@/services/player/queries';

import styles from './styles/ChooseAvatar.module.css';

export function ChooseAvatar(): JSX.Element {
  const { session } = useSession();
  const {
    state: { playerRoute },
  } = useLocation();

  const navigate = useNavigate();

  return (
    <FullScreenModal
      title="Choisir un avatar"
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
          onClick={() => navigate(`/${playerRoute}`)}
          customStyle={styles.button}
        >
          Sauvegarder cet avatar
        </Button>
      </>
    </FullScreenModal>
  );
}
