import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

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
          roomCode: session?.room?.code,
        })}
      </h1>
      <p>{t('join.room.warning')}</p>
      <Button
        content={t('join.room.confirm.button')}
        onClick={handleJoinNewRoom}
      />
      <Button
        content={t('join.room.return.button')}
        onClick={() => navigate(`/room/${session?.room?.code}`)}
        buttonColor="yellow"
        textColor="lightDark"
      />
    </>
  );
}
