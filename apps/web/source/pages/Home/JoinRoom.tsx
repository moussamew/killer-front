import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import JoinRoomLottie from '@/assets/lotties/join-room.json';
import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { Input } from '@/components/Input';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/JoinRoom.module.css';

export function JoinRoom(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [roomCode, setRoomCode] = useState('');

  const { updatePlayer } = useUpdatePlayer();
  const { session, refetchSession } = useSession();

  const handleRoomCode = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setRoomCode(target.value.toUpperCase());
  };

  const handleJoinRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: session?.id, room: roomCode });

    // Refetch session to update the player infos.
    await refetchSession();

    navigate(`/room/${roomCode}/pending`);
  };

  return (
    <FullScreenModal
      title={t('home.join.room')}
      onClose={() => navigate('/')}
      hideBackButton={false}
    >
      <div>
        <Lottie className={styles.lottie} animationData={JoinRoomLottie} />
        <div className={styles.selectRoomCode}>
          <Input
            id="joinRoom"
            label={t('home.join.room.code.label')}
            placeholder={t('home.join.room.code.placeholder')}
            value={roomCode}
            onChange={handleRoomCode}
          />
          <Button color="primary" onClick={handleJoinRoom}>
            {t('home.join.room.confirm.button')}
          </Button>
        </div>
      </div>
    </FullScreenModal>
  );
}
