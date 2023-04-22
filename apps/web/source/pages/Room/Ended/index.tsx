import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Winner from '@/assets/images/winner.png';
import { Button } from '@/components/Button';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import styles from './styles/index.module.css';

export function EndedRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { room } = useRoom(roomCode!);

  const handleLeaveRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: session?.id, room: null });
  };

  return (
    <>
      <div className={styles.infos}>
        <h1>{t('room.winner.name', { playerName: room?.winner?.name })}</h1>
        <p>{t('room.winner.congrats')}</p>
      </div>
      <img alt="notFound" src={Winner} className={styles.image} />
      <Button color="primary" onClick={handleLeaveRoom}>
        {t('room.play.another.party.button')}
      </Button>
    </>
  );
}
