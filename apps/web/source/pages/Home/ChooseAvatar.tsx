import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { Gallery, avatarList } from '@/components/Gallery';
import { useSession } from '@/services/player/queries';
import { useCreateRoom } from '@/services/room/mutations';

import styles from './styles/ChooseAvatar.module.css';

export function ChooseAvatar(): JSX.Element {
  const { session } = useSession();
  const { state: playerId } = useLocation();
  const { createRoom } = useCreateRoom();

  const navigate = useNavigate();

  const handleCreateRoom = async (): Promise<void> => {
    const { id } = await createRoom.mutateAsync();

    navigate(`/room/${id}`);
  };

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
        <Gallery playerId={playerId} />
        <Button
          color="secondary"
          onClick={handleCreateRoom}
          customStyle={styles.button}
        >
          Sauvegarder cet avatar et créer la partie
        </Button>
      </>
    </FullScreenModal>
  );
}
