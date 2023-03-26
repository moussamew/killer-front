import { useNavigate, useParams } from 'react-router-dom';

import Winner from '@/assets/images/winner.png';
import { Button } from '@/components/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { PlayerStatus } from '@/services/player/constants';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import styles from './styles/index.module.css';

export function EndedRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { room } = useRoom(roomCode!);
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const navigate = useNavigate();

  const handleLeaveRoom = async (): Promise<void> => {
    updatePlayer.mutate(
      { id: session?.id, room: null },
      { onSuccess: () => navigate('/') },
    );
  };

  const lastManStanding = room?.players?.find(
    ({ status }) => status === PlayerStatus.ALIVE,
  );

  return (
    <>
      <div className={styles.infos}>
        <h1>{t('room.winner.name', { playerName: lastManStanding?.name })}</h1>
        <p>{t('room.winner.congrats')}</p>
      </div>
      <img alt="notFound" src={Winner} className={styles.image} />
      <Button color="primary" onClick={handleLeaveRoom}>
        {t('room.play.another.party.button')}
      </Button>
    </>
  );
}
