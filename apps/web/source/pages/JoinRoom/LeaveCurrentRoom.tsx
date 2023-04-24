import { useTranslation } from '@killerparty/intl';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import commonStyles from '../../assets/styles/common.module.css';

import styles from './styles/LeaveCurrentRoom.module.css';

export function LeaveCurrentRoom(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();

  const navigate = useNavigate();

  const handleJoinNewRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: session?.id, room: roomCode });
  };

  return (
    <>
      <h1>
        {t('join.room.already.inside.room', {
          roomCode: session?.room?.id,
        })}
      </h1>
      <p className={styles.text}>{t('join.room.warning')}</p>
      <div className={commonStyles.actions}>
        <Button color="primary" onClick={handleJoinNewRoom}>
          {t('join.room.confirm.button')}
        </Button>
        <Button
          color="secondary"
          onClick={() => navigate(`/room/${session?.room?.id}`)}
        >
          {t('join.room.return.button')}
        </Button>
      </div>
    </>
  );
}
