import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

export function LeaveCurrentRoom(): JSX.Element {
  const { roomCode } = useParams();
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();

  const navigate = useNavigate();

  const handleJoinNewRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: session?.id, room: roomCode });
  };

  return (
    <Fragment>
      <h1>
        {t('join_room.already_inside_room', {
          playerRoomCode: session?.room?.code,
        })}
      </h1>
      <p>{t('join_room.careful_before_join_room')}</p>
      <Button
        content={t('join_room.join_the_room')}
        onClick={handleJoinNewRoom}
      />
      <Button
        content={t('join_room.return_current_room')}
        onClick={() => navigate(`/room/${session?.room?.code}`)}
        buttonColor="yellow"
        textColor="lightDark"
      />
    </Fragment>
  );
}
