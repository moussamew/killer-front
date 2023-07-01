import { useTranslation } from '@killerparty/intl';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { CurrentAvatar } from './CurrentAvatar';
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
      <div className={styles.winner}>
        <h1>{t('room.winner.name', { playerName: room?.winner?.name })}</h1>
        {room?.winner && <CurrentAvatar winner={room.winner} />}
      </div>
      <Button color="primary" onClick={handleLeaveRoom}>
        {t('room.play.another.party.button')}
      </Button>
    </>
  );
}
